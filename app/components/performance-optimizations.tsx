import { useEffect } from "react"
import Image from "next/image"

export function PerformanceOptimizations() {
  useEffect(() => {
    // Preload critical resources
    const preloadLinks = [
      { href: "/fonts/your-main-font.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { href: "/images/logo.png", as: "image" },
      { href: "/images/hero-bg.jpg", as: "image" },
    ]

    preloadLinks.forEach(({ href, as, type, crossOrigin }) => {
      const link = document.createElement("link")
      link.rel = "preload"
      link.href = href
      link.as = as
      if (type) link.type = type
      if (crossOrigin) link.crossOrigin = crossOrigin
      document.head.appendChild(link)
    })

    // Add resource hints
    const resourceHints = [
      { href: "https://fonts.googleapis.com", rel: "preconnect" },
      { href: "https://fonts.gstatic.com", rel: "preconnect", crossOrigin: "anonymous" },
      { href: "https://freetoolsplatform.com", rel: "dns-prefetch" },
    ]

    resourceHints.forEach(({ href, rel, crossOrigin }) => {
      const link = document.createElement("link")
      link.rel = rel
      link.href = href
      if (crossOrigin) link.crossOrigin = crossOrigin
      document.head.appendChild(link)
    })

    // Cleanup function
    return () => {
      const links = document.querySelectorAll("link[rel='preload'], link[rel='preconnect'], link[rel='dns-prefetch']")
      links.forEach(link => link.remove())
    }
  }, [])

  return null
}

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
}

export function OptimizedImage({ src, alt, width, height, priority = false }: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      quality={90}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSAyVC08MTY3LjIyOUFTRjo/Tj4yMkhiS0hHSUZJPVBVW0xLSUZJPVBVW0z/2wBDARUXFx4aHjshITtJQklJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="transition-opacity duration-300"
    />
  )
} 