// Service Worker – immer aktuellste Version laden
const CACHE = 'cut-app-v9';

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(['./index.html', './manifest.json']);
    })
  );
  // Sofort aktivieren ohne auf alte Clients zu warten
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  // Alle alten Caches löschen
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE; })
            .map(function(k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  // API-Calls immer direkt ums Netzwerk – nie cachen
  if(e.request.url.includes('anthropic.com') ||
     e.request.url.includes('supabase.co') ||
     e.request.url.includes('workers.dev') ||
     e.request.url.includes('fonts.googleapis.com') ||
     e.request.url.includes('fonts.gstatic.com')) {
    e.respondWith(fetch(e.request));
    return;
  }

  // Für index.html: immer Netzwerk zuerst, Cache als Fallback
  if(e.request.url.includes('index.html') || e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then(function(response) {
          // Frische Version im Cache speichern
          var clone = response.clone();
          caches.open(CACHE).then(function(cache) { cache.put(e.request, clone); });
          return response;
        })
        .catch(function() {
          // Offline: Cache-Version nutzen
          return caches.match(e.request);
        })
    );
    return;
  }

  // Alles andere: Cache first
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      return cached || fetch(e.request);
    })
  );
});
