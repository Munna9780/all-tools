"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText } from "lucide-react"

export function SiteHeader() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <FileText className="h-6 w-6" />
          <span className="font-bold">InvoiceFreeTool</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/invoice-generator"
            className={`text-sm font-medium hover:underline ${isActive("/invoice-generator") ? "text-primary" : ""}`}
          >
            Invoice Generator
          </Link>
          <Link
            href="/file-converter"
            className={`text-sm font-medium hover:underline ${isActive("/file-converter") ? "text-primary" : ""}`}
          >
            File Converter
          </Link>
          <Link
            href="/youtube-tools"
            className={`text-sm font-medium hover:underline ${isActive("/youtube-tools") ? "text-primary" : ""}`}
          >
            YouTube Tools
          </Link>
          <Link
            href="/url-shortener"
            className={`text-sm font-medium hover:underline ${isActive("/url-shortener") ? "text-primary" : ""}`}
          >
            URL Shortener
          </Link>
          <Link
            href="/newsletter-generator"
            className={`text-sm font-medium hover:underline ${isActive("/newsletter-generator") ? "text-primary" : ""}`}
          >
            Newsletter Generator
          </Link>
        </nav>
      </div>
    </header>
  )
}

