const CACHE_NAME = 'goran-friad-v3';
const ASSETS = [
    './',
    './index.html',
    './styles.css',
    './script.js',
    './portfolio.html',
    './iimage/1.png',
    './iimage/icon-192.png',
    './iimage/Certificate/11.jpg',
    './iimage/Certificate/22.jpg',
    './iimage/Certificate/33.png',
    './iimage/Certificate/44.png',
    './iimage/Certificate/55.png',
    './manifest.json'
];

// Install - cache assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
    self.skipWaiting();
});

// Activate - clean old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        )
    );
    self.clients.claim();
});

// Fetch - cache first, fallback to network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cached => {
            if (cached) return cached;
            return fetch(event.request).then(response => {
                if (response.ok && event.request.method === 'GET') {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                }
                return response;
            });
        }).catch(() => {
            if (event.request.mode === 'navigate') {
                return caches.match('./index.html');
            }
        })
    );
});
