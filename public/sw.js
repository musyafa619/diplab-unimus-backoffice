/* eslint-disable */
/**
 * Service Worker for PWA
 * Handles caching strategies and offline support
 */

const CACHE_PREFIX = 'diplab-backoffice';
const RUNTIME_CACHE = `${CACHE_PREFIX}-runtime`;
const PRECACHE_VERSION = 'v1';
const PRECACHE_NAME = `${CACHE_PREFIX}-precache-${PRECACHE_VERSION}`;

// Files to precache on install
const PRECACHE_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
];

self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(PRECACHE_NAME).then((cache) => {
      console.log('[SW] Precaching files');
      return cache.addAll(PRECACHE_FILES);
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheName.startsWith(CACHE_PREFIX)) {
            return undefined;
          }
          if (cacheName !== PRECACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
          return undefined;
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const { method, url } = request;

  // Skip non-GET requests
  if (method !== 'GET') {
    return;
  }

  // Skip API calls
  if (url.includes('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => response)
        .catch(() => {
          // Return offline response or cached response
          return new Response(
            JSON.stringify({ error: 'Offline' }),
            { status: 503, statusText: 'Service Unavailable' }
          );
        })
    );
    return;
  }

  // Cache-first strategy for static assets
  if (url.match(/\.(js|css|png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|eot)$/)) {
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) {
          return response;
        }
        return fetch(request).then((response) => {
          if (!response || response.status !== 200) {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseToCache);
          });
          return response;
        });
      })
    );
    return;
  }

  // Network-first strategy for HTML and API
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (!response || response.status !== 200) {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(RUNTIME_CACHE).then((cache) => {
          cache.put(request, responseToCache);
        });
        return response;
      })
      .catch(() => {
        return caches.match(request).then((response) => {
          if (response) {
            return response;
          }
          return new Response(
            '<!DOCTYPE html><html><body><h1>Offline</h1><p>This page is not available offline.</p></body></html>',
            { headers: { 'Content-Type': 'text/html' } }
          );
        });
      })
  );
});
