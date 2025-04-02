import type { Metadata } from "next"
import URLShortenerClientPage from "./URLShortenerClientPage"

export const metadata: Metadata = {
  title: "Free URL Shortener - Create Custom Short Links with Tracking | InvoiceFreeTool",
  description: "Shorten long URLs, create custom links, and track click statistics for free. No registration required.",
  keywords: "URL shortener, link shortener, custom short links, URL tracking, click statistics",
}

export default function URLShortenerPage() {
  return <URLShortenerClientPage />
}

