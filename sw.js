const staticCacheName = `cacheFundamentals-${new Date()}`;

const offlineFundamentals = [
    '/dist/css/estilo.css',
    '/dist/css/teste.css',
    '/dist/img/img-01.jpg',
    '/dist/img/img-02.jpg'
];
// Cache on install
this.addEventListener("install", event => {
    this.skipWaiting();
    event.waitUntil(
      caches.open(staticCacheName)
        .then(cache => {
          return cache.addAll(offlineFundamentals);
      })
    )
});
// // Clear cache on activate
this.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => (cacheName.startsWith('cacheFundamentals-')))
            .filter(cacheName => (cacheName !== staticCacheName))
            .map(cacheName => caches.delete(cacheName))
        );
      })
    );
});
// Serve from Cache
this.addEventListener("fetch", event => {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          return response || fetch(event.request);
        })
        .catch(() => {
        //   return caches.match('/offline/index.html');
        })
    )
});