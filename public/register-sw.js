// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful');
        
        // Request notification permission
        if ('Notification' in window) {
          Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
              console.log('Notification permission granted');
            }
          });
        }
        
        // Register for background sync
        if ('sync' in registration) {
          registration.sync.register('sync-conversions');
        }
      })
      .catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}

// Handle PWA installation
let deferredPrompt;
const installButton = document.getElementById('install-pwa');

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  // Show the install button
  if (installButton) {
    installButton.style.display = 'block';
  }
});

if (installButton) {
  installButton.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    // Clear the deferredPrompt variable
    deferredPrompt = null;
    // Hide the install button
    installButton.style.display = 'none';
  });
}

// Handle offline/online status
window.addEventListener('online', () => {
  document.body.classList.remove('offline');
  if (navigator.serviceWorker) {
    navigator.serviceWorker.ready.then(registration => {
      registration.sync.register('sync-conversions');
    });
  }
});

window.addEventListener('offline', () => {
  document.body.classList.add('offline');
});

// Check if the app is installed
window.matchMedia('(display-mode: standalone)').addListener((e) => {
  if (e.matches) {
    // App is installed
    if (installButton) {
      installButton.style.display = 'none';
    }
  }
}); 