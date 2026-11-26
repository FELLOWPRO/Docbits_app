// Template for the DocBits build. scripts/write-docbits-config.mjs writes dist/config.js from
// this file, replacing the __PLACEHOLDER__ tokens with validated build settings.
window.__RUNTIME_CONFIG__ = {
  MAX_FILE_SIZE_MB: 50,
  MAX_SKILL_BUNDLE_SIZE_MB: 256,
  DEFAULT_LOCALE: 'en-US',
  DOCBITS_EMBED: true,
  // Optional fallback. The host normally sends api_base_url in a config message.
  API_BASE_URL: '',
  ALLOWED_API_HOSTS: 'dev.api.docbits.com,stage.api.docbits.com,api.docbits.com,us.api.docbits.com,localhost,test.developer.fellowpro.com',
  ALLOWED_PARENT_ORIGINS: 'https://dev.docbits.com',
  DOCBITS_PRODUCT_NAME: 'DocBits RAG',
};
