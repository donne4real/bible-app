const CACHE_NAME = 'bible-in-african-languages-v13';

// App shell — cached on install
const SHELL_ASSETS = [
  '/manifest.json',
  '/icon.svg',
  '/icon-192.png',
  '/icon-512.png',
  '/icon-maskable.png',
];

// Pre-cache only the default translation (WEB) for fast first load.
// Other translations are cached on-demand when users select them.
// This reduces initial install from ~90MB to ~5MB.
const PRECACHE_BIBLE_FILES = [
  '/bibles/web.json',
];

// All Bible files for reference (cached on-demand, not pre-cached)
const ALL_BIBLE_FILES = [
  '/bibles/web.json',
  '/bibles/kjv.json',
  '/bibles/lsg.json',
  '/bibles/yor.json',
  '/bibles/ibo.json',
  '/bibles/hau.json',
  '/bibles/twi.json',
  '/bibles/pcm.json',
  '/bibles/afr.json',
  '/bibles/amh.json',
  '/bibles/swa.json',
  '/bibles/sna.json',
  '/bibles/nde.json',
  '/bibles/ewe.json',
  '/bibles/htc.json',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Cache shell immediately, then only the default Bible translation
      // Other translations are cached on-demand when users select them
      return cache.addAll(SHELL_ASSETS)
        .then(() => cache.addAll(PRECACHE_BIBLE_FILES))
        .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Network-first for HTML navigations, cache-first for static assets & Bible JSON
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Never intercept API calls (sync endpoints or remote Bible proxy) in Service Worker
  if (url.pathname.startsWith('/api/')) return;

  // HTML pages: network-first (always get latest index.html with new asset hashes)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Everything else (JS, CSS, fonts, Bible JSON): cache-first
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') return response;

        // Cache JS/CSS/font chunks and bundled Bible JSON files dynamically as they're loaded
        if (url.pathname.match(/\.(js|css|json|woff2?|ttf|svg|png|ico|webp)$/)) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }

        return response;
      }).catch(() => {
        // For all other requests (JS chunks, Bible JSON, fonts) try the cache
        return caches.match(event.request);
      });
    })
  );
});
