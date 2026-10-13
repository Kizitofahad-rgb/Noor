// Noor Progressive Web App Service Worker (v2 - Offline Sanctuary Edition)
const STATIC_CACHE = 'noor-static-v2';
const DYNAMIC_CACHE = 'noor-dynamic-v2';
const QURAN_CACHE = 'noor-quran-v2';
const LIBRARY_CACHE = 'noor-library-v2';
const AUDIO_CACHE = 'noor-audio-v2';
const FONTS_CACHE = 'noor-fonts-v2';

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/pwa-maskable-512x512.png',
  '/apple-touch-icon.png',
];

// Install: precache the core app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate: clean up outdated caches and claim clients immediately
self.addEventListener('activate', (event) => {
  const currentCaches = [
    STATIC_CACHE,
    DYNAMIC_CACHE,
    QURAN_CACHE,
    LIBRARY_CACHE,
    AUDIO_CACHE,
    FONTS_CACHE,
  ];
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!currentCaches.includes(cacheName)) {
              console.log('[ServiceWorker] Removing stale cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event: smart caching strategies tailored for offline Quran & Library access
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
          return fetch(request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                cache.put(request, networkResponse.clone());
              }
              return networkResponse;
            })
            .catch(() => cached);
        });
      })
    );
    return;
  }

  // 2. Quran Content API Caching (Both local proxy /api/quran/* and public api.alquran.cloud)
  // Ensures any previously viewed Surah remains 100% accessible when offline
  if (url.pathname.includes('/api/quran') || url.origin.includes('api.alquran.cloud')) {
    event.respondWith(
      caches.open(QURAN_CACHE).then(async (cache) => {
        const cachedResponse = await cache.match(request);

        // Try network first to keep data fresh, but fallback seamlessly to cached version if offline
        const networkFetch = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => {
            // Network failed (offline) -> Return previously cached surah data
            return cachedResponse;
          });

        // If we have a cached version and network is slow or offline, return cache immediately
        return cachedResponse || networkFetch;
      })
    );
    return;
  }

  // 3. Library API Caching (/api/library)
  if (url.pathname.includes('/api/library')) {
    event.respondWith(
      caches.open(LIBRARY_CACHE).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        const networkFetch = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || networkFetch;
      })
    );
    return;
  }

  // 4. Quran Audio Files (EveryAyah and MP3Quran servers)
  // Caches listened verses and surahs for offline peaceful recitation
  if (
    url.origin.includes('mp3quran.net') ||
    url.origin.includes('everyayah.com') ||
    url.pathname.endsWith('.mp3')
  ) {
    event.respondWith(
      caches.open(AUDIO_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;

        try {
          const response = await fetch(request);
          // Opaque responses from external CDNs can be cached
          if (response && (response.status === 200 || response.type === 'opaque')) {
            cache.put(request, response.clone());
          }
          return response;
        } catch {
          return cached;
        }
      })
    );
    return;
  }

  // 5. Navigation Requests (HTML / App Shell): Network first with instant cached fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(STATIC_CACHE).then((cache) => {
              cache.put('/', networkResponse.clone());
              cache.put('/index.html', networkResponse.clone());
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

  // 6. Static assets (JS chunks, CSS stylesheets, SVGs, Images, manifest, etc.)
  event.respondWith(
    caches.match(request).then((cached) => {
      // For Vite hashed assets (/assets/*), cache is immutable and safe to return immediately
      if (cached) {
        // Background refresh only for non-hashed assets
        if (!url.pathname.startsWith('/assets/')) {
          fetch(request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                caches.open(DYNAMIC_CACHE).then((cache) => {
                  cache.put(request, networkResponse);
                });
              }
            })
            .catch(() => {});
        }
        return cached;
      }

      return fetch(request)
        .then((networkResponse) => {
          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            networkResponse.type === 'opaque'
          ) {
            return networkResponse;
          }

          const responseToCache = networkResponse.clone();
          const targetCache = url.pathname.startsWith('/assets/') ? STATIC_CACHE : DYNAMIC_CACHE;
          caches.open(targetCache).then((cache) => {
            cache.put(request, responseToCache);
          });

          return networkResponse;
        })
        .catch(() => {
          // If image fetch fails offline, return generic fallback icon if available
          if (request.destination === 'image') {
            return caches.match('/icon.svg');
          }
        });
    })
  );
});

// ============================================================================
// 7. PUSH NOTIFICATIONS & NATIVE PHONE LOCK SCREEN ALERTS
// ============================================================================

// Push Event: triggers when server sends a native push alert to the phone
self.addEventListener('push', (event) => {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      data = { title: 'Noor · Sacred Reminder', body: event.data.text() };
    }
  }

  const title = data.title || 'Noor · Sacred Reminder';
  const options = {
    body: data.body || 'A blessed moment of remembrance awaits you in Noor.',
    icon: data.icon || '/pwa-192x192.png',
    badge: '/icon.svg',
    image: data.image || undefined,
    tag: data.tag || 'noor-devotional-notification',
    renotify: true,
    vibrate: [150, 75, 150],
    data: {
      url: data.url || '/',
      timestamp: Date.now(),
      category: data.category || 'general',
    },
    actions: [
      { action: 'open', title: 'Open Noor 📖' },
      { action: 'dismiss', title: 'Dismiss' },
    ],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Notification Click Event: handles tap on phone banner or action buttons
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'dismiss') {
    return;
  }

  const targetPath = event.notification.data?.url || '/';
  const fullTargetUrl = new URL(targetPath, self.location.origin).href;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Focus existing window if open
      for (const client of clientList) {
        if (client.url.startsWith(self.location.origin) && 'focus' in client) {
          if ('navigate' in client) {
            client.navigate(fullTargetUrl);
          }
          return client.focus();
        }
      }
      // Otherwise open a new window
      if (clients.openWindow) {
        return clients.openWindow(fullTargetUrl);
      }
    })
  );
});
