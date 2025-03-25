import React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/app/globals.css"
import { ThemeProviderWrapper } from "@/components/theme-provider-wrapper"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: "InvoiceFreeTool - Free Online Tools for Everyday Tasks",
  description:
    "Free online tools including invoice generator, file converter, YouTube downloader, URL shortener. No registration required.",
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
  generator: 'v0.dev'
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
      </head>
      <body>
        <ThemeProviderWrapper>
          {children}
        </ThemeProviderWrapper>
        <Toaster />
      </body>
    </html>
  )
}