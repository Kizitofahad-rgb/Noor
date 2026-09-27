// Noor Progressive Web App Service Worker
const STATIC_CACHE = 'noor-static-v1';
const DYNAMIC_CACHE = 'noor-dynamic-v1';
const QURAN_CACHE = 'noor-quran-v1';
const FONTS_CACHE = 'noor-fonts-v1';

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/apple-touch-icon.png',
];

// Install: precache the core app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate: clean up outdated caches
self.addEventListener('activate', (event) => {
  const currentCaches = [STATIC_CACHE, DYNAMIC_CACHE, QURAN_CACHE, FONTS_CACHE];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!currentCaches.includes(cacheName)) {
            console.log('[ServiceWorker] Removing stale cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event: smart caching strategies
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Skip non-GET requests (e.g. POST, PUT, DELETE authentication or submission requests)
  if (request.method !== 'GET') {
    return;
  }

  // 1. Google Fonts Cache (Amiri, Cormorant Garamond, Plus Jakarta Sans, etc.)
  if (url.origin.includes('fonts.googleapis.com') || url.origin.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.open(FONTS_CACHE).then((cache) => {
        return cache.match(request).then((cached) => {
          if (cached) return cached;
          return fetch(request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => cached);
        });
      })
    );
    return;
  }

  // 2. AlQuran Cloud API Caching (Enables offline Quran recitation & deep dives for visited surahs)
  if (url.origin.includes('api.alquran.cloud')) {
    event.respondWith(
      caches.open(QURAN_CACHE).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          const fetchPromise = fetch(request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => {
            return cachedResponse;
          });

          // Return cached version immediately if available, while updating cache in background (Stale-While-Revalidate)
          return cachedResponse || fetchPromise;
        });
      })
    );
    return;
  }

  // 3. Navigation Requests (HTML / App Shell): Network first with instant cached fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          // Cache fresh copy of app shell
          if (networkResponse && networkResponse.status === 200) {
            caches.open(STATIC_CACHE).then((cache) => {
              cache.put('/', networkResponse.clone());
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          const rootCached = await caches.match('/');
          if (rootCached) return rootCached;
          return caches.match('/index.html');
        })
    );
    return;
  }

  // 4. Static assets (JS, CSS, SVGs, Images, manifest, etc.)
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        // Fetch in background to update cache (Stale-While-Revalidate)
        fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, networkResponse);
            });
          }
        }).catch(() => {/* ignore background update errors */});
        return cached;
      }

      return fetch(request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'opaque') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(DYNAMIC_CACHE).then((cache) => {
          cache.put(request, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
        // If image fetch fails, try to return generic fallback if cached
        if (request.destination === 'image') {
          return caches.match('/icon.svg');
        }
      });
    })
  );
});
