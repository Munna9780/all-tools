"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PDFConverter } from "./components/pdf-converter"
import { ImageConverter } from "./components/image-converter"
import { AudioConverter } from "./components/audio-converter"
import { VideoConverter } from "./components/video-converter"
import { DocumentConverter } from "./components/document-converter"
import { ArchiveConverter } from "./components/archive-converter"

export default function FileConverterClientPage() {
  const [activeTab, setActiveTab] = useState("pdf")

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
            <Link href="/file-converter" className="text-sm font-medium text-primary hover:underline">
              File Converter
            </Link>
            <Link href="/youtube-tools" className="text-sm font-medium hover:underline">
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
            <h1 className="text-3xl font-bold">File Converter</h1>
          </div>

          <Card className="mx-auto max-w-3xl">
            <CardHeader>
              <CardTitle>Convert Your Files</CardTitle>
              <CardDescription>Select the type of conversion you want to perform.</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="pdf">PDF</TabsTrigger>
                  <TabsTrigger value="image">Image</TabsTrigger>
                  <TabsTrigger value="audio">Audio</TabsTrigger>
                  <TabsTrigger value="video">Video</TabsTrigger>
                  <TabsTrigger value="document">Document</TabsTrigger>
                  <TabsTrigger value="archive">Archive</TabsTrigger>
                </TabsList>
                <TabsContent value="pdf" className="p-4">
                  <PDFConverter />
                </TabsContent>
                <TabsContent value="image" className="p-4">
                  <ImageConverter />
                </TabsContent>
                <TabsContent value="audio" className="p-4">
                  <AudioConverter />
                </TabsContent>
                <TabsContent value="video" className="p-4">
                  <VideoConverter />
                </TabsContent>
                <TabsContent value="document" className="p-4">
                  <DocumentConverter />
                </TabsContent>
                <TabsContent value="archive" className="p-4">
                  <ArchiveConverter />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="mt-12 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">How to Convert Files</h2>
            <ol className="space-y-4 list-decimal list-inside">
              <li className="pl-2">
                <span className="font-medium">Select conversion type:</span> Choose the type of file you want to convert
                (PDF, Image, Audio, or Video).
              </li>
              <li className="pl-2">
                <span className="font-medium">Upload your file:</span> Click the button to select and upload the file
                you want to convert.
              </li>
              <li className="pl-2">
                <span className="font-medium">Choose output format:</span> Select the format you want to convert your
                file to.
              </li>
              <li className="pl-2">
                <span className="font-medium">Convert and download:</span> Click the convert button and download your
                converted file.
              </li>
            </ol>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Why Use Our File Converter?</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Free & Unlimited</h3>
                <p className="text-muted-foreground">
                  Our file converter is completely free to use with no hidden fees or limits.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Privacy Protected</h3>
                <p className="text-muted-foreground">
                  Your files are processed in your browser and are not uploaded to our servers.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">High Quality</h3>
                <p className="text-muted-foreground">
                  We maintain the highest possible quality during the conversion process.
                </p>
              </div>
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

