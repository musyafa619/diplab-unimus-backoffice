// src/pwa-register.ts
// Simple PWA service worker registration for VitePWA

export function registerSW() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        // eslint-disable-next-line no-console
        console.error('Service worker registration failed:', err);
      });
    });
  }
}
