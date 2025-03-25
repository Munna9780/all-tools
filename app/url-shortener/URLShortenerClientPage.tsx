"use client"

import Link from "next/link"
import { ArrowLeft, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UrlForm } from "./components/url-form"
import { UrlStats } from "./components/url-stats"

export default function URLShortenerClientPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <FileText className="h-6 w-6" />
            <span className="font-bold">InvoiceFreeTool</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/invoice-generator" className="text-sm font-medium hover:underline">
              Invoice Generator
            </Link>
            <Link href="/file-converter" className="text-sm font-medium hover:underline">
              File Converter
            </Link>
            <Link href="/youtube-tools" className="text-sm font-medium hover:underline">
              YouTube Tools
            </Link>
            <Link href="/url-shortener" className="text-sm font-medium text-primary hover:underline">
              URL Shortener
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Home</span>
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">URL Shortener</h1>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
            <Card>
              <CardHeader>
                <CardTitle>Shorten Your URL</CardTitle>
                <CardDescription>Create a short, custom link for your long URL.</CardDescription>
              </CardHeader>
              <CardContent>
                <UrlForm />
              </CardContent>
            </Card>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>URL Statistics</CardTitle>
                  <CardDescription>Track the performance of your shortened URL.</CardDescription>
                </CardHeader>
                <CardContent>
                  <UrlStats />
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Benefits of URL Shortening</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Improved Sharing</h3>
                <p className="text-muted-foreground">
                  Short URLs are easier to share in emails, social media, and messaging apps.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Track Performance</h3>
                <p className="text-muted-foreground">
                  Monitor clicks and visitor information to measure the performance of your links.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Professional Look</h3>
                <p className="text-muted-foreground">
                  Custom short links look more professional and trustworthy to your audience.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">How to Use Our URL Shortener</h2>
            <ol className="space-y-4 list-decimal list-inside">
              <li className="pl-2">
                <span className="font-medium">Enter your long URL:</span> Paste the long URL you want to shorten in the
                input field.
              </li>
              <li className="pl-2">
                <span className="font-medium">Customize your link (optional):</span> Enable the custom path option to
                create a memorable short link.
              </li>
              <li className="pl-2">
                <span className="font-medium">Enable tracking (recommended):</span> Keep track of clicks and visitor
                information.
              </li>
              <li className="pl-2">
                <span className="font-medium">Set expiration (optional):</span> Choose when your link should expire.
              </li>
              <li className="pl-2">
                <span className="font-medium">Generate and share:</span> Click the "Shorten URL" button and copy your
                new short link.
              </li>
            </ol>
          </div>
        </div>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 InvoiceFreeTool. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="/about" className="text-sm font-medium hover:underline">
              About
            </Link>
            <Link href="/privacy" className="text-sm font-medium hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm font-medium hover:underline">
              Terms
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:underline">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

