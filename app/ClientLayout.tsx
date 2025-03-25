"use client"

import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import Script from "next/script"

import { ThemeProvider } from "@/components/theme-provider"
import { ErrorBoundary } from "react-error-boundary"
import { Button } from "@/components/ui/button"

const inter = Inter({ subsets: ["latin"] })

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
      <p className="mb-4 text-muted-foreground">We apologize for the inconvenience. Please try again later.</p>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  )
}

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="canonical" href="https://inviocefreetool.com" />
        <meta name="google-site-verification" content="your-verification-code" />
      </head>
      <body className={inter.className}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </ErrorBoundary>
        <Script id="schema-org" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "InvoiceFreeTool",
              "url": "https://inviocefreetool.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://inviocefreetool.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "description": "Free online tools including invoice generator, file converter, YouTube tools, URL shortener, and newsletter generator. No registration required."
            }
          `}
        </Script>
      </body>
    </html>
  )
}

