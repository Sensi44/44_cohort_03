const ACTUAL_CACHE_NAME = 'cache-v1';

const urlsToCache = [
  '/',
  '/sign-up',
  '/sign-in',
  '/forum',
  '/leader-bord',
  '/profile',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(ACTUAL_CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .catch((err) => {
        throw err;
      }),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    // Пытаемся найти ответ на такой запрос в кеше
    caches.match(event.request).then((response) => {
      console.log('Fetch v6');

      console.log('Ищем запрос: ', event.request);
      console.log('Для event: ', event);
      // Если ответ найден, выдаём его
      console.log('Найденный ответ: ', response);
      if (response) {
        console.log('Возвращаем найденный ответ и выходим');
        return response;
      }

      const fetchRequest = event.request.clone();
      // В противном случае делаем запрос на сервер
      return (
        fetch(fetchRequest)
          // Можно задавать дополнительные параметры запроса, если ответ вернулся некорректный.
          .then((response) => {
            // Если что-то пошло не так, выдаём в основной поток результат, но не кладём его в кеш
            if (
              !response ||
              response.status !== 200 ||
              response.type !== 'basic'
            ) {
              return response;
            }

            const responseToCache = response.clone();
            // Получаем доступ к кешу по CACHE_NAME
            caches.open(ACTUAL_CACHE_NAME).then((cache) => {
              // Записываем в кеш ответ, используя в качестве ключа запрос
              cache.put(event.request, responseToCache);
            });
            // Отдаём в основной поток ответ
            return response;
          })
      );
    }),
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => {
            return name !== ACTUAL_CACHE_NAME;
          })
          .map((name) => caches.delete(name)),
      );
    }),
  );
});
