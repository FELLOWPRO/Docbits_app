/**
 * Service Worker for CDN Caching
 * Caches CDN resources with 7-day strategy for improved performance
 * Supports regional optimization (US/EU) and intelligent fallbacks
 * @typedef {Object} FetchEvent
 * @property {Request} request
 * @property {function(Promise<Response>): void} respondWith
 * @property {function(Promise): void} waitUntil
 */

const CACHE_NAME = 'cdn-cache-v1';
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
const FALLBACK_CACHE_NAME = 'cdn-fallback-v1';

// CDN domains to cache
const CDN_DOMAINS = [
  'cdn.jsdelivr.net',
  'cdnjs.cloudflare.com',
  'unpkg.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com'
];

// Critical resources that should always be cached
const CRITICAL_RESOURCES = [
  '/npm/lodash@4.17.21/lodash.min.js',
  '/npm/axios@1.7.2/dist/axios.min.js',
  '/ajax/libs/jquery/3.6.0/jquery.min.js',
  'icon?family=Material+Icons'
];

// Regional CDN preferences
const REGIONAL_CDNS = {
  US: {
    primary: 'cdn.jsdelivr.net',
    secondary: 'unpkg.com'
  },
  EU: {
    primary: 'cdnjs.cloudflare.com',
    secondary: 'unpkg.com'
  }
};

/**
 * Detect user region for optimal CDN selection
 * @returns {'US' | 'EU'} The detected region
 */
function detectRegion() {
  try {
    const lang = navigator.language || 'en-US';
    const isEU = /^(de|fr|es|it|nl|pl|pt|sv|da|fi|no|el|hu|cs|sk|sl|ro|bg|hr|lv|lt|et|mt)-|^en-GB/.test(lang);
    return isEU ? 'EU' : 'US';
  } catch (error) {
    return 'US'; // Default fallback
  }
}

/**
 * Check if URL is a CDN resource
 * @param {string} url - The URL to check
 * @returns {boolean} True if URL is from a CDN domain
 */
function isCDNResource(url) {
  return CDN_DOMAINS.some(domain => url.includes(domain));
}

/**
 * Check if resource is critical
 * @param {string} url - The URL to check
 * @returns {boolean} True if resource is critical
 */
function isCriticalResource(url) {
  return CRITICAL_RESOURCES.some(resource => url.includes(resource));
}

/**
 * Get cache key with regional optimization
 * @param {string} url - The URL to create cache key for
 * @param {string} region - The region (US/EU)
 * @returns {string} The cache key
 */
function getCacheKey(url, region) {
  const urlObj = new URL(url);
  return `${region}-${urlObj.hostname}${urlObj.pathname}${urlObj.search}`;
}

/**
 * Check if cached resource is still valid
 * @param {Response} cachedResponse - The cached response to check
 * @returns {boolean} True if cache is still valid
 */
function isCacheValid(cachedResponse) {
  if (!cachedResponse || !cachedResponse.headers) {
    return false;
  }

  const cachedTime = cachedResponse.headers.get('sw-cached-time');
  if (!cachedTime) {
    return false;
  }

  const now = Date.now();
  const cacheAge = now - parseInt(cachedTime, 10);
  return cacheAge < CACHE_DURATION;
}

/**
 * Create cached response with metadata
 * @param {Response} response - The response to cache
 * @param {string} cacheKey - The cache key
 * @returns {Promise<Response>} The cached response with metadata
 */
async function createCachedResponse(response, cacheKey) {
  const responseClone = response.clone();
  const headers = new Headers(responseClone.headers);
  
  // Add cache metadata
  headers.set('sw-cached-time', Date.now().toString());
  headers.set('sw-cache-key', cacheKey);
  headers.set('sw-cache-version', CACHE_NAME);
  
  return new Response(await responseClone.arrayBuffer(), {
    status: responseClone.status,
    statusText: responseClone.statusText,
    headers: headers
  });
}

/**
 * Handle CDN fetch with caching strategy
 * @param {FetchEvent} event - The fetch event
 * @param {string} region - The user region
 * @returns {Promise<Response>} The response from cache or network
 */
async function handleCDNFetch(event, region) {
  const url = /** @type {string} */ (event.request.url);
  const cacheKey = getCacheKey(url, region);
  
  try {
    // Try cache first
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(cacheKey);
    
    if (cachedResponse && isCacheValid(cachedResponse)) {
      // Cache hit - return cached version
      console.log(`SW Cache Hit: ${url}`);
      
      // Update cache in background if resource is critical
      if (isCriticalResource(url)) {
        event.waitUntil(updateCacheInBackground(url, cacheKey, cache));
      }
      
      return cachedResponse;
    }
    
    // Cache miss - fetch from network
    console.log(`SW Cache Miss: ${url}`);
    const request = event.request;
    return await fetchAndCache(request, cacheKey, cache, region);
    
  } catch (error) {
    console.error('SW CDN Cache Error:', error);
    
    // Try fallback cache
    const fallbackCache = await caches.open(FALLBACK_CACHE_NAME);
    const fallbackResponse = await fallbackCache.match(cacheKey);
    
    if (fallbackResponse) {
      console.log(`SW Fallback Cache Hit: ${url}`);
      return fallbackResponse;
    }
    
    // Last resort - direct network fetch
    const request = event.request;
    return fetch(request);
  }
}

/**
 * Fetch resource and cache it
 * @param {Request} request - The request to fetch
 * @param {string} cacheKey - The cache key
 * @param {Cache} cache - The cache instance
 * @param {string} region - The user region
 * @returns {Promise<Response>} The cached response
 */
async function fetchAndCache(request, cacheKey, cache, region) {
  try {
    const networkResponse = await fetch(request, {
      mode: 'cors',
      credentials: 'omit'
    });
    
    if (!networkResponse.ok) {
      throw new Error(`HTTP ${networkResponse.status}: ${networkResponse.statusText}`);
    }
    
    // Cache successful response
    const cachedResponse = await createCachedResponse(networkResponse, cacheKey);
    await cache.put(cacheKey, cachedResponse.clone());
    
    // Also store in fallback cache for critical resources
    if (isCriticalResource(/** @type {string} */ (request.url))) {
      const fallbackCache = await caches.open(FALLBACK_CACHE_NAME);
      await fallbackCache.put(cacheKey, cachedResponse.clone());
    }
    
    console.log(`SW Cached: ${/** @type {string} */ (request.url)} (region: ${region})`);
    return cachedResponse;
    
  } catch (error) {
    console.error(`SW Fetch Error for ${request.url}:`, error);
    throw error;
  }
}

/**
 * Update cache in background for critical resources
 * @param {string} url - The URL to update
 * @param {string} cacheKey - The cache key
 * @param {Cache} cache - The cache instance
 * @returns {Promise<void>}
 */
async function updateCacheInBackground(url, cacheKey, cache) {
  try {
    const response = await fetch(url, {
      mode: 'cors',
      credentials: 'omit'
    });
    
    if (response.ok) {
      const cachedResponse = await createCachedResponse(response, cacheKey);
      await cache.put(cacheKey, cachedResponse);
      console.log(`SW Background Update: ${url}`);
    }
  } catch (error) {
    console.error(`SW Background Update Error for ${url}:`, error);
  }
}

/**
 * Clean expired cache entries
 */
async function cleanExpiredCache() {
  try {
    const cache = await caches.open(CACHE_NAME);
    const keys = await cache.keys();
    const now = Date.now();
    
    for (const request of keys) {
      const response = await cache.match(request);
      if (response) {
        const cachedTime = response.headers.get('sw-cached-time');
        if (cachedTime) {
          const cacheAge = now - parseInt(cachedTime, 10);
          if (cacheAge > CACHE_DURATION) {
            await cache.delete(request);
            console.log(`SW Cache Expired: ${request.url}`);
          }
        }
      }
    }
  } catch (error) {
    console.error('SW Cache Cleanup Error:', error);
  }
}

/**
 * Preload critical CDN resources
 * @param {string} region - The user region
 * @returns {Promise<void>}
 */
async function preloadCriticalResources(region) {
  const cache = await caches.open(CACHE_NAME);
  const regionalCDN = REGIONAL_CDNS[region];
  
  const criticalUrls = [
    `https://${regionalCDN.primary}/npm/lodash@4.17.21/lodash.min.js`,
    `https://${regionalCDN.primary}/npm/axios@1.7.2/dist/axios.min.js`,
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
  ];
  
  for (const url of criticalUrls) {
    try {
      const cacheKey = getCacheKey(url, region);
      const cachedResponse = await cache.match(cacheKey);
      
      if (!cachedResponse || !isCacheValid(cachedResponse)) {
        console.log(`SW Preloading: ${url}`);
        const response = await fetch(url, { mode: 'cors', credentials: 'omit' });
        
        if (response.ok) {
          const cachedResponse = await createCachedResponse(response, cacheKey);
          await cache.put(cacheKey, cachedResponse);
        }
      }
    } catch (error) {
      console.error(`SW Preload Error for ${url}:`, error);
    }
  }
}

// Service Worker Event Listeners

self.addEventListener('install', (/** @type {ExtendableEvent} */ event) => {
  console.log('SW CDN Cache: Installing');
  
  event.waitUntil(
    (async () => {
      const region = detectRegion();
      await preloadCriticalResources(region);
      console.log(`SW CDN Cache: Preloaded critical resources for ${region} region`);
    })()
  );
  
  self.skipWaiting();
});

self.addEventListener('activate', (/** @type {ExtendableEvent} */ event) => {
  console.log('SW CDN Cache: Activating');
  
  event.waitUntil(
    (async () => {
      // Clean up old caches
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter(name => name.startsWith('cdn-cache-') && name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
      
      // Clean expired entries
      await cleanExpiredCache();
      
      console.log('SW CDN Cache: Activated and cleaned');
    })()
  );
  
  self.clients.claim();
});

self.addEventListener('fetch', (/** @type {FetchEvent} */ event) => {
  const url = /** @type {string} */ (event.request.url);
  
  // Only handle CDN resources
  if (!isCDNResource(url) || event.request.method !== 'GET') {
    return;
  }
  
  const region = detectRegion();
  event.respondWith(handleCDNFetch(event, region));
});

// Periodic cache cleanup
self.addEventListener('message', (/** @type {ExtendableMessageEvent} */ event) => {
  if (event.data && event.data.type === 'CLEANUP_CACHE') {
    event.waitUntil(cleanExpiredCache());
  }
  
  if (event.data && event.data.type === 'PRELOAD_CRITICAL') {
    const region = /** @type {string} */ (event.data.region || detectRegion());
    event.waitUntil(preloadCriticalResources(region));
  }
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CACHE_NAME,
    CACHE_DURATION,
    CDN_DOMAINS,
    CRITICAL_RESOURCES,
    REGIONAL_CDNS,
    detectRegion,
    isCDNResource,
    isCriticalResource,
    getCacheKey,
    isCacheValid
  };
}