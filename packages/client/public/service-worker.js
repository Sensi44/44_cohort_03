self.addEventListener('install', (event) => {
  console.log('install');
  // Код для кеширования файлов
});

self.addEventListener('activate', (event) => {
  console.log('activate');
  // Код для активации воркера
});

self.addEventListener('fetch', (event) => {
  console.log('Fetching:', event.request.url);
  // Код обработки сетевых запросов
});
