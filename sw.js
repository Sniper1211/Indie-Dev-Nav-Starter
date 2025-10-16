const CACHE_VERSION = 'v1';
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const IMAGE_CACHE = `img-${CACHE_VERSION}`;

// 适配 GitHub Pages 仓库子路径：使用相对 sw.js 的绝对 URL
const STATIC_ASSETS = [
  new URL('./index.html', self.location).toString(),
  new URL('./css/styles.css', self.location).toString(),
  new URL('./js/main.js', self.location).toString(),
  new URL('./js/tools.js', self.location).toString()
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys
        .filter((k) => ![STATIC_CACHE, IMAGE_CACHE].includes(k))
        .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  // Cache-first for images (including cross-origin favicons)
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request)
          .then((response) => {
            const copy = response.clone();
            caches.open(IMAGE_CACHE).then((cache) => cache.put(request, copy));
            return response;
          })
          .catch(() => cached || Response.error());
      })
    );
    return;
  }

  // Network-first for HTML; Cache-first for static assets
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match('/index.html'))
    );
    return;
  }

  const url = new URL(request.url);
  const isStatic = STATIC_ASSETS.includes(request.url);
  if (isStatic) {
    event.respondWith(
      caches.match(request).then((cached) => {
        return cached || fetch(request).then((response) => {
          const copy = response.clone();
          caches.open(STATIC_CACHE).then((cache) => cache.put(request, copy));
          return response;
        });
      })
    );
  }
});