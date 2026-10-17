// Bump this version whenever a bundled file changes. Updates wait for open sessions to close.
const PREFIX = 'rhetoric-offline-';
const CACHE = PREFIX + 'v1';
const ASSETS = [
  './index.html','./style.css','./app.js','./theme.js','./pwa.js',
  './content.js','./model.js','./arrangement.js','./studies.js',
  './public-speeches.js','./additional-speeches.js','./caesar-gaul.js',
  './alexander-opis.js','./conclusions.js','./emotion-guidance.js','./study-emotions.js',
  './manifest.webmanifest','./icons/icon-180.png','./icons/icon-192.png','./icons/icon-512.png'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) {
      if (key.startsWith(PREFIX) && key !== CACHE) await caches.delete(key);
    }
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    if (request.mode === 'navigate') return await cache.match('./index.html') || fetch(request);
    return await cache.match(request, {ignoreSearch:true}) || fetch(request);
  })());
});
