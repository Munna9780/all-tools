import { NextResponse } from "next/server"

export const cacheConfig = {
  // Cache duration in seconds
  durations: {
    static: 60 * 60 * 24 * 7, // 1 week
    dynamic: 60 * 60, // 1 hour
    api: 60 * 5, // 5 minutes
  },
}

export function withCache(
  handler: Function,
  duration: number = cacheConfig.durations.dynamic
) {
  return async (request: Request) => {
    const response = await handler(request)
    
    // Add cache control headers
    const headers = new Headers(response.headers)
    headers.set(
      "Cache-Control",
      `public, s-maxage=${duration}, stale-while-revalidate=${duration * 0.5}`
    )
    
    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    })
  }
}

export function getCacheHeaders(duration: number = cacheConfig.durations.dynamic) {
  return {
    "Cache-Control": `public, s-maxage=${duration}, stale-while-revalidate=${
      duration * 0.5
    }`,
  }
}

// Cache middleware for API routes
export function cacheMiddleware(
  duration: number = cacheConfig.durations.api
) {
  return async (request: Request) => {
    const response = await fetch(request)
    const headers = new Headers(response.headers)
    
    headers.set(
      "Cache-Control",
      `public, s-maxage=${duration}, stale-while-revalidate=${duration * 0.5}`
    )
    
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    })
  }
}

// Cache configuration for static assets
export const staticCacheConfig = {
  "/images/*": {
    cache: "public",
    maxAge: cacheConfig.durations.static,
  },
  "/fonts/*": {
    cache: "public",
    maxAge: cacheConfig.durations.static,
  },
  "/icons/*": {
    cache: "public",
    maxAge: cacheConfig.durations.static,
  },
  "/css/*": {
    cache: "public",
    maxAge: cacheConfig.durations.static,
  },
  "/js/*": {
    cache: "public",
    maxAge: cacheConfig.durations.static,
  },
} 