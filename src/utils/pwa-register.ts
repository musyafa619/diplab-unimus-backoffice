/**
 * PWA Service Worker Registration
 * Handles manual registration and provides PWA lifecycle hooks
 */

export type PWALifecycleEvent = {
  type: 'installed' | 'updated' | 'activated' | 'offline' | 'online';
  sw?: ServiceWorkerRegistration;
};

type PWALifecycleCallback = (event: PWALifecycleEvent) => void;

const lifecycleCallbacks: PWALifecycleCallback[] = [];

export function onPWALifecycle(callback: PWALifecycleCallback) {
  lifecycleCallbacks.push(callback);
}

function notifyLifecycleEvent(event: PWALifecycleEvent) {
  lifecycleCallbacks.forEach((cb) => {
    try {
      cb(event);
    } catch (err) {
      console.error('Error in PWA lifecycle callback:', err);
    }
  });
}

export async function registerPWA() {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service Workers are not supported in this browser');
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js?v=' + Date.now(), {
      scope: '/',
    });

    console.log('Service Worker registered:', registration);
    notifyLifecycleEvent({ type: 'installed', sw: registration });

    // Listen for updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            notifyLifecycleEvent({ type: 'updated', sw: registration });
          }
        });
      }
    });
  } catch (err) {
    console.error('Service Worker registration failed:', err);
  }

  // Listen for online/offline events
  window.addEventListener('online', () => {
    notifyLifecycleEvent({ type: 'online' });
  });

  window.addEventListener('offline', () => {
    notifyLifecycleEvent({ type: 'offline' });
  });
}
