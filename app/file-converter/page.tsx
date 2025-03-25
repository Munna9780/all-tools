import type { Metadata } from "next"
import FileConverterClientPage from "./FileConverterClientPage"

export const metadata: Metadata = {
  title: "Free File Converter - Convert PDFs, Images, Audio & Video | InvoiceFreeTool",
  description:
    "Convert files between different formats for free. Support for PDF, images, audio, and video conversions with no registration required.",
  keywords: "file converter, PDF converter, image converter, audio converter, video converter, free file conversion",
}

export default function FileConverterPage() {
  return <FileConverterClientPage />
}

