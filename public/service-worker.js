self.addEventListener('fetch', function(event) {
  // ถ้าเป็น API ของเรา
  if (event.request.url.includes('/api/model')) {
    // ให้ fetch ตรง ๆ ไม่ cache
    event.respondWith(fetch(event.request));
  }
});
