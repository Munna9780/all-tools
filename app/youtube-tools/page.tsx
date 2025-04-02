import type { Metadata } from "next"
import YouTubeToolsClientPage from "./YouTubeToolsClientPage"

export const metadata: Metadata = {
  title: "Free YouTube Tools - Download Videos & Generate Transcripts | InvoiceFreeTool",
  description:
    "Download YouTube videos in various qualities and generate accurate transcripts for free. No registration required.",
  keywords:
    "YouTube downloader, YouTube video downloader, YouTube transcript generator, YouTube to MP3, YouTube to MP4",
}

export default function YouTubeToolsPage() {
  return <YouTubeToolsClientPage />
}

