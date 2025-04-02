"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { YouTubeDownloader } from "./components/youtube-downloader"
import { YouTubeTranscriber } from "./components/youtube-transcriber"

export default function YouTubeToolsClientPage() {
  const [activeTab, setActiveTab] = useState("downloader")

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
            <Link href="/youtube-tools" className="text-sm font-medium text-primary hover:underline">
              YouTube Tools
            </Link>
            <Link href="/url-shortener" className="text-sm font-medium hover:underline">
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
            <h1 className="text-3xl font-bold">YouTube Tools</h1>
          </div>

          <Card className="mx-auto max-w-3xl">
            <CardHeader>
              <CardTitle>YouTube Tools</CardTitle>
              <CardDescription>Download videos or generate transcripts from YouTube videos.</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="downloader">Video Downloader</TabsTrigger>
                  <TabsTrigger value="transcriber">Transcriber</TabsTrigger>
                </TabsList>
                <TabsContent value="downloader" className="p-4">
                  <YouTubeDownloader />
                </TabsContent>
                <TabsContent value="transcriber" className="p-4">
                  <YouTubeTranscriber />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="mt-12 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">How to Use YouTube Tools</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-2">Video Downloader</h3>
                <ol className="space-y-2 list-decimal list-inside">
                  <li className="pl-2">Copy the URL of the YouTube video you want to download.</li>
                  <li className="pl-2">Paste the URL in the input field above and click "Analyze".</li>
                  <li className="pl-2">Select the desired format and quality for the download.</li>
                  <li className="pl-2">Acknowledge that you have the right to download the content.</li>
                  <li className="pl-2">Click the download button to save the video to your device.</li>
                </ol>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Transcriber</h3>
                <ol className="space-y-2 list-decimal list-inside">
                  <li className="pl-2">Copy the URL of the YouTube video you want to transcribe.</li>
                  <li className="pl-2">Paste the URL in the input field above and select the language.</li>
                  <li className="pl-2">Click "Generate" to create the transcript.</li>
                  <li className="pl-2">View the transcript with or without timestamps.</li>
                  <li className="pl-2">Copy the transcript or download it as a text file.</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Important Notice</h2>
            <div className="p-4 bg-muted rounded-md">
              <p className="mb-2">
                Please note that you should only download videos that you have the right to download. Respect copyright
                laws and the YouTube Terms of Service.
              </p>
              <p>
                This tool is intended for downloading videos that are either in the public domain, licensed under
                Creative Commons, or for which you have obtained permission from the copyright holder. We do not
                encourage or support copyright infringement.
              </p>
            </div>
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

