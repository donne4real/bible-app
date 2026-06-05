const CACHE_NAME = 'wordup-africa-bible-v4';

// App shell — cached on install
const SHELL_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg',
  '/icon-192.png',
  '/icon-512.png',
  '/icon-maskable.png',
];

// All bundled Bible translation files — pre-cached so the app works
// 100% offline immediately after the first install completes.
const BIBLE_FILES = [
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
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Cache shell immediately, then Bible files (large but critical)
      return cache.addAll(SHELL_ASSETS)
        .then(() => cache.addAll(BIBLE_FILES))
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

// Cache-first for all GET requests
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') return response;

        // Cache JS/CSS/font chunks dynamically as they're loaded
        const url = new URL(event.request.url);
        if (url.pathname.match(/\.(js|css|woff2?|ttf|svg|png|ico|webp)$/)) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }

        return response;
      }).catch(() => {
        // For page navigations fall back to the app shell
        if (event.request.mode === 'navigate') return caches.match('/index.html');
        // For all other requests (JS chunks, Bible JSON, fonts) try the cache
        return caches.match(event.request);
      });
    })
  );
});
