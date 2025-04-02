import type { Metadata } from "next"
import InvoiceGeneratorClientPage from "./InvoiceGeneratorClientPage"

export const metadata: Metadata = {
  title: "Free Invoice Generator - Create Professional Invoices | InvoiceFreeTool",
  description:
    "Create professional invoices for free with our easy-to-use invoice generator. Customize fields, add your logo, and export to PDF, Word, or Excel.",
  keywords: "free invoice generator, create invoice online, professional invoice template, invoice maker, PDF invoice",
}

export default function InvoiceGeneratorPage() {
  return <InvoiceGeneratorClientPage />
}

