"use client"

import type React from "react"

import { useState } from "react"
import { Copy, Download, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export function YouTubeTranscriber() {
  const { toast } = useToast()
  const [url, setUrl] = useState("")
  const [language, setLanguage] = useState("en")
  const [isGenerating, setIsGenerating] = useState(false)
  const [transcript, setTranscript] = useState<string | null>(null)

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
  }

  const validateYouTubeUrl = (url: string) => {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/
    return regex.test(url)
  }

  const generateTranscript = async () => {
    if (!url) {
      toast({
        title: "URL required",
        description: "Please enter a YouTube URL.",
        variant: "destructive",
      })
      return
    }

    if (!validateYouTubeUrl(url)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid YouTube URL.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      // In a real application, you would make an API call to fetch the transcript
      // This is a simulated response for demonstration purposes
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock transcript
      const mockTranscript = `
[00:00:00] Hello and welcome to this video.
[00:00:05] Today we're going to talk about web development.
[00:00:10] Specifically, we'll cover HTML, CSS, and JavaScript.
[00:00:15] HTML is the backbone of any website.
[00:00:20] It provides the structure for your content.
[00:00:25] CSS is used for styling your website.
[00:00:30] It makes your website look good and responsive.
[00:00:35] JavaScript adds interactivity to your website.
[00:00:40] It allows users to interact with your content.
[00:00:45] Together, these three technologies form the foundation of web development.
[00:00:50] Thanks for watching this video.
[00:00:55] Don't forget to like and subscribe for more content.
      `.trim()

      setTranscript(mockTranscript)

      toast({
        title: "Transcript generated",
        description: "Transcript has been generated successfully.",
      })
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Failed to generate the transcript. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const copyTranscript = () => {
    if (!transcript) return

    navigator.clipboard.writeText(transcript)

    toast({
      title: "Copied to clipboard",
      description: "Transcript has been copied to your clipboard.",
    })
  }

  const downloadTranscript = () => {
    if (!transcript) return

    const blob = new Blob([transcript], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "transcript.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Download complete",
      description: "Transcript has been downloaded as a text file.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Paste YouTube URL here..."
            value={url}
            onChange={handleUrlChange}
            disabled={isGenerating}
          />
          <Button onClick={generateTranscript} disabled={isGenerating}>
            {isGenerating ? "Generating..." : "Generate"}
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="it">Italian</SelectItem>
                <SelectItem value="pt">Portuguese</SelectItem>
                <SelectItem value="ru">Russian</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
                <SelectItem value="zh">Chinese</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
                <SelectItem value="ar">Arabic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" asChild>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" /> Open in YouTube
            </a>
          </Button>
        </div>
      </div>

      {transcript ? (
        <div className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">Transcript</h3>
            <div className="space-x-2">
              <Button variant="outline" size="sm" onClick={copyTranscript}>
                <Copy className="mr-2 h-4 w-4" /> Copy
              </Button>
              <Button variant="outline" size="sm" onClick={downloadTranscript}>
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
            </div>
          </div>

          <Tabs defaultValue="timestamped">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="timestamped">With Timestamps</TabsTrigger>
              <TabsTrigger value="plain">Plain Text</TabsTrigger>
            </TabsList>
            <TabsContent value="timestamped" className="mt-4">
              <div className="border rounded-md p-4 max-h-96 overflow-y-auto whitespace-pre-line font-mono text-sm">
                {transcript}
              </div>
            </TabsContent>
            <TabsContent value="plain" className="mt-4">
              <div className="border rounded-md p-4 max-h-96 overflow-y-auto whitespace-pre-line font-mono text-sm">
                {transcript.replace(/\[\d{2}:\d{2}:\d{2}\] /g, "")}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className="border rounded-md p-6 text-center">
          <p className="text-muted-foreground">Transcript will appear here after you enter a valid YouTube URL.</p>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Features</h3>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Generate accurate transcripts from YouTube videos</li>
          <li>Support for multiple languages</li>
          <li>Download transcripts as text files</li>
          <li>Copy transcripts to clipboard</li>
          <li>View transcripts with or without timestamps</li>
          <li>No registration required</li>
          <li>Completely free to use</li>
        </ul>
      </div>
    </div>
  )
}

