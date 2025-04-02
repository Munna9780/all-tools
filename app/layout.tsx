import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/app/globals.css"
import { ThemeProviderWrapper } from "@/components/theme-provider-wrapper"

const inter = Inter({ subsets: ["latin"] })

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
    url: "https://inviocefreetool.com",
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
    canonical: "https://inviocefreetool.com",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <meta name="google-site-verification" content="your-verification-code" />
      </head>
      <body className={inter.className}>
        <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "InvoiceFreeTool",
              url: "https://inviocefreetool.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://inviocefreetool.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
              description:
                "Free online tools including invoice generator, file converter, YouTube tools, URL shortener, and newsletter generator. No registration required.",
            }),
          }}
        />
      </body>
    </html>
  )
}



import './globals.css'