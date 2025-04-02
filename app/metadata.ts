import { Metadata } from "next"

export const defaultMetadata: Metadata = {
  title: "Free Online File Converter | Convert Images, Audio, Video, Documents & Archives",
  description: "Free online file converter tool. Convert images (JPG, PNG, WEBP), audio (MP3, WAV, OGG), video (MP4, WEBM, AVI), documents (PDF, DOCX, TXT) and archives (ZIP, RAR, 7Z) instantly. No registration required.",
  keywords: "file converter, online converter, image converter, audio converter, video converter, document converter, archive converter, free converter, convert files, file conversion, convert images, convert audio, convert video, convert documents, convert archives, JPG to PNG, MP3 to WAV, MP4 to WEBM, PDF to DOCX, ZIP to RAR",
  authors: [{ name: "Free Tools Platform" }],
  creator: "Free Tools Platform",
  publisher: "Free Tools Platform",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://freetoolsplatform.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://freetoolsplatform.com",
    siteName: "Free Tools Platform",
    title: "Free Online File Converter | Convert Images, Audio, Video, Documents & Archives",
    description: "Free online file converter tool. Convert images (JPG, PNG, WEBP), audio (MP3, WAV, OGG), video (MP4, WEBM, AVI), documents (PDF, DOCX, TXT) and archives (ZIP, RAR, 7Z) instantly. No registration required.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Free Online File Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online File Converter | Convert Images, Audio, Video, Documents & Archives",
    description: "Free online file converter tool. Convert images (JPG, PNG, WEBP), audio (MP3, WAV, OGG), video (MP4, WEBM, AVI), documents (PDF, DOCX, TXT) and archives (ZIP, RAR, 7Z) instantly. No registration required.",
    images: ["/og-image.jpg"],
    creator: "@freetoolsplatform",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
    yandex: "your-yandex-verification",
    bing: "your-bing-verification",
  },
  category: "technology",
  classification: "utilities",
  referrer: "origin-when-cross-origin",
  colorScheme: "light dark",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  applicationName: "Free Tools Platform",
  bookmarks: ["/file-converter", "/image-converter", "/audio-converter", "/video-converter", "/document-converter", "/archive-converter"],
  archives: ["/blog", "/news"],
  assets: ["/images", "/icons"],
  appLinks: {
    ios: {
      url: "https://apps.apple.com/app/your-app-id",
      app_store_id: "your-app-store-id",
    },
    android: {
      package: "com.freetoolsplatform.app",
      app_name: "Free Tools Platform",
      url: "https://play.google.com/store/apps/details?id=com.freetoolsplatform.app",
    },
  },
} 