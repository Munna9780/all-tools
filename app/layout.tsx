import React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/app/globals.css"
import { ThemeProviderWrapper } from "@/components/theme-provider-wrapper"
import { Toaster } from "@/components/ui/toaster"
import { PWAInstall } from '@/components/pwa-install'
import { PerformanceOptimizations } from '@/components/performance-optimizations'
import { StructuredData } from '@/components/structured-data'

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: "Free Tools Platform - Online File Converter",
  description: "Convert files between different formats online. Free, fast, and secure file conversion for images, audio, video, documents, and archives.",
  keywords:
    "free invoice generator, file converter, YouTube downloader, URL shortener, free online tools, newsletter generator",
  authors: [{ name: "InvoiceFreeTool" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://invoicefreetool.com",
    title: "InvoiceFreeTool - Free Online Tools for Everyday Tasks",
    description:
      "Free online tools including invoice generator, file converter, YouTube tools, URL shortener, and newsletter generator. No registration required.",
    siteName: "InvoiceFreeTool",
  },
  twitter: {
    card: "summary_large_image",
    title: "InvoiceFreeTool - Free Online Tools for Everyday Tasks",
    description:
      "Free online tools including invoice generator, file converter, YouTube tools, URL shortener, and newsletter generator. No registration required.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://invoicefreetool.com",
  },
  generator: 'v0.dev',
  manifest: '/site.webmanifest',
  themeColor: '#000000',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'File Converter',
  },
  formatDetection: {
    telephone: false,
  },
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <meta name="google-site-verification" content="your-verification-code" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "InvoiceFreeTool",
              url: "https://invoicefreetool.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://invoicefreetool.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
              description:
                "Free online tools including invoice generator, file converter, YouTube tools, URL shortener, and newsletter generator. No registration required.",
            }),
          }}
        />
        <title>Free Tools Platform</title>
        <meta name="description" content="A collection of free and useful tools" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="File Converter" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="File Converter" />
      </head>
      <body>
        <ThemeProviderWrapper>
          <PerformanceOptimizations />
          <StructuredData />
          {children}
        </ThemeProviderWrapper>
        <Toaster />
        <PWAInstall />
        <script src="/register-sw.js" />
      </body>
    </html>
  )
}