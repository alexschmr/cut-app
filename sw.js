const CACHE = 'cut-app-v1';
const FILES = [
  './index.html',
  './manifest.json'
];

// Install: App cachen
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(FILES);
    })
  );
  self.skipWaiting();
});

// Activate: alten Cache löschen
self.addEventListener('activate', function(e) {
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

// Fetch: Cache first, dann Netzwerk
// API-Calls (anthropic.com) immer direkt ums Netzwerk
self.addEventListener('fetch', function(e) {
  if(e.request.url.includes('anthropic.com') ||
     e.request.url.includes('fonts.googleapis.com') ||
     e.request.url.includes('fonts.gstatic.com')) {
    // Netzwerk-first für externe Ressourcen
    e.respondWith(
      fetch(e.request).catch(function() {
        return new Response('', { status: 503 });
      })
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(function(cached) {
      if(cached) return cached;
      return fetch(e.request).then(function(response) {
        // Lokale Dateien cachen
        if(response.ok && e.request.url.startsWith(self.location.origin)) {
          var clone = response.clone();
          caches.open(CACHE).then(function(cache) {
            cache.put(e.request, clone);
          });
        }
        return response;
      });
    })
  );
});
