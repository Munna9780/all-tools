const CACHE_NAME = "file-converter-v1"
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/css/styles.css",
  "/js/main.js",
  "/images/logo.png",
  "/images/hero-bg.jpg",
  "/fonts/your-main-font.woff2",
  "/favicon.ico",
  "/favicon-16x16.png",
  "/favicon-32x32.png",
  "/apple-touch-icon.png",
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
  "/site.webmanifest",
]

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS)
    })
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    })
  )
})

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse
      }

      return fetch(event.request).then((response) => {
        // Don't cache non-successful responses
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response
        }

        // Clone the response
        const responseToCache = response.clone()

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache)
        })

        return response
      })
    })
  )
})

// Background sync for offline file conversions
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-conversions") {
    event.waitUntil(syncConversions())
  }
})

// Push notifications for conversion completion
self.addEventListener("push", (event) => {
  const options = {
    body: event.data.text(),
    icon: "/images/logo.png",
    badge: "/images/badge.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "explore",
        title: "View Conversion",
      },
      {
        action: "close",
        title: "Close",
      },
    ],
  }

  event.waitUntil(
    self.registration.showNotification("File Conversion Complete", options)
  )
})

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  if (event.action === "explore") {
    event.waitUntil(
      clients.openWindow("/conversions")
    )
  }
})

// Helper function to sync conversions
async function syncConversions() {
  const db = await openDB()
  const conversions = await db.getAll("conversions")
  
  for (const conversion of conversions) {
    if (!conversion.synced) {
      try {
        await fetch("/api/conversions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(conversion),
        })
        
        conversion.synced = true
        await db.put("conversions", conversion)
      } catch (error) {
        console.error("Failed to sync conversion:", error)
      }
    }
  }
}

// IndexedDB setup
async function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("FileConverterDB", 1)
    
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result
      if (!db.objectStoreNames.contains("conversions")) {
        db.createObjectStore("conversions", { keyPath: "id" })
      }
    }
  })
} 