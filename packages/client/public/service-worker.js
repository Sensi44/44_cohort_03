self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
  // Код для кеширования файлов
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating.');
  // Код для активации воркера
});

self.addEventListener('fetch', (event) => {
  console.log('Fetching:', event.request.url);
  // Код обработки сетевых запросов
});
