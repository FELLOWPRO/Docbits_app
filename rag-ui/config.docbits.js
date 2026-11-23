// Template for the DocBits build. scripts/write-docbits-config.mjs writes dist/config.js from
// this file, replacing the __PLACEHOLDER__ tokens with validated build settings.
window.__RUNTIME_CONFIG__ = {
  MAX_FILE_SIZE_MB: 50,
  MAX_SKILL_BUNDLE_SIZE_MB: 256,
  DEFAULT_LOCALE: 'en-US',
  DOCBITS_EMBED: true,
  // Optional fallback. The host normally sends api_base_url in a config message.
  API_BASE_URL: '__API_BASE_URL__',
  ALLOWED_API_HOSTS: '__ALLOWED_API_HOSTS__',
  ALLOWED_PARENT_ORIGINS: '__ALLOWED_PARENT_ORIGINS__',
  DOCBITS_PRODUCT_NAME: '__PRODUCT_NAME__',
};
