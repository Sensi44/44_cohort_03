const CACHE_NAME = 'game-cache-v1';

const urlsToCache = ['/'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .catch((err) => {
        throw err;
      }),
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event));
});

async function handleRequest(event) {
  if (navigator.onLine) {
    return await cacheData(event);
  } else {
    console.warn('Offline mode');
    return caches.match('/');
  }
}

async function cacheData(event) {
  const cachedResponse = await caches.match(event.request);

  if (cachedResponse) {
    return cachedResponse;
  }

  const response = await fetch(event.request);

  if (!response || response.status !== 200 || response.type !== 'basic') {
    return response;
  }

  const responseToCache = response.clone();
  const cache = await caches.open(CACHE_NAME);
  await cache.put(event.request, responseToCache);

  return response;
}
