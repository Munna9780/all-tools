import type { Metadata } from "next"
import NewsletterGeneratorClientPage from "./NewsletterGeneratorClientPage"

export const metadata: Metadata = {
  title: "Free Newsletter Generator - Create Professional Newsletters | InvoiceFreeTool",
  description:
    "Create professional newsletters for free with our easy-to-use newsletter generator. Choose from templates, customize content, and export to PDF or HTML.",
  keywords:
    "free newsletter generator, email newsletter creator, newsletter template, newsletter maker, HTML newsletter",
}

export default function NewsletterGeneratorPage() {
  return <NewsletterGeneratorClientPage />
}

