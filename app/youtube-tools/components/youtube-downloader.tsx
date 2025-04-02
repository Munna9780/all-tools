"use client"

import type React from "react"

import { useState } from "react"
import { Download, ExternalLink, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"

type VideoInfo = {
  title: string
  thumbnail: string
  duration: string
  author: string
  formats: Array<{
    quality: string
    format: string
    size: string
  }>
}

export function YouTubeDownloader() {
  const { toast } = useToast()
  const [url, setUrl] = useState("")
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null)
  const [selectedFormat, setSelectedFormat] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [acknowledgeTerms, setAcknowledgeTerms] = useState(false)

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
  }

  const validateYouTubeUrl = (url: string) => {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/
    return regex.test(url)
  }

  const analyzeVideo = async () => {
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

    setIsLoading(true)

    try {
      // In a real application, you would make an API call to fetch video information
      // This is a simulated response for demonstration purposes
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock video info
      const mockVideoInfo: VideoInfo = {
        title: "Sample YouTube Video",
        thumbnail: "/placeholder.svg?height=720&width=1280",
        duration: "10:30",
        author: "Sample Channel",
        formats: [
          { quality: "360p", format: "mp4", size: "20 MB" },
          { quality: "480p", format: "mp4", size: "35 MB" },
          { quality: "720p", format: "mp4", size: "70 MB" },
          { quality: "1080p", format: "mp4", size: "120 MB" },
          { quality: "Audio Only", format: "mp3", size: "5 MB" },
        ],
      }

      setVideoInfo(mockVideoInfo)
      setSelectedFormat(mockVideoInfo.formats[0].quality + "-" + mockVideoInfo.formats[0].format)

      toast({
        title: "Video analyzed",
        description: "Video information retrieved successfully.",
      })
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Failed to analyze the video. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const downloadVideo = async () => {
    if (!videoInfo || !selectedFormat) return

    if (!acknowledgeTerms) {
      toast({
        title: "Terms acknowledgment required",
        description: "Please acknowledge the terms of use before downloading.",
        variant: "destructive",
      })
      return
    }

    setIsDownloading(true)
    setProgress(0)

    try {
      // Simulate download progress
      const simulateProgress = () => {
        let currentProgress = 0
        const interval = setInterval(() => {
          currentProgress += 5
          setProgress(currentProgress)
          if (currentProgress >= 100) {
            clearInterval(interval)
          }
        }, 200)
        return interval
      }

      const progressInterval = simulateProgress()

      // In a real application, you would make an API call to download the video
      // This is a simulated response for demonstration purposes
      await new Promise((resolve) => setTimeout(resolve, 4000))

      clearInterval(progressInterval)
      setProgress(100)

      // Create a mock download with dummy video data
      const dummyData = new Uint8Array(1024 * 1024); // 1MB of dummy data
      const blob = new Blob([dummyData], { type: 'video/mp4' });
      
      // Get format information
      const [quality, format] = selectedFormat.split('-');
      
      // Check if user is on mobile
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        // Mobile-specific download approach
        try {
          // Create a data URL for direct download
          const reader = new FileReader();
          reader.onload = function() {
            const dataUrl = reader.result;
            
            // Create a visible download link that will respond to user interaction
            const downloadLink = document.createElement('a');
            downloadLink.href = dataUrl as string;
            downloadLink.download = `youtube-${videoInfo.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.${format}`;
            downloadLink.textContent = "Download Video";
            downloadLink.className = "mobile-download-link";
            downloadLink.style.display = "block";
            downloadLink.style.marginTop = "20px";
            downloadLink.style.padding = "12px";
            downloadLink.style.backgroundColor = "var(--primary)";
            downloadLink.style.color = "white";
            downloadLink.style.borderRadius = "6px";
            downloadLink.style.textAlign = "center";
            downloadLink.style.textDecoration = "none";
            downloadLink.style.fontWeight = "bold";
            
            // Find a good place to append the link
            const downloadContainer = document.createElement('div');
            downloadContainer.id = "mobile-download-container";
            downloadContainer.appendChild(downloadLink);
            
            // Remove any existing download containers first
            const existingContainer = document.getElementById("mobile-download-container");
            if (existingContainer) {
              existingContainer.remove();
            }
            
            // Add it to the page within the video info container
            const buttonContainer = document.querySelector('.mt-6.flex.gap-2');
            if (buttonContainer) {
              buttonContainer.parentElement?.appendChild(downloadContainer);
            }
            
            toast({
              title: "Download ready",
              description: "Tap the Download Video button to save your file.",
            });
          };
          reader.readAsDataURL(blob);
        } catch (error) {
          console.error("Mobile download error:", error);
          // Fallback to traditional method if the mobile approach fails
          downloadTraditional();
        }
      } else {
        // Desktop download approach
        downloadTraditional();
      }
      
      function downloadTraditional() {
        // Create a download link with proper attributes for cross-browser compatibility
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `youtube-${videoInfo.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.${format}`;
        // Set these attributes to help with download on mobile
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener noreferrer");
        // Make the element visible to ensure it works on mobile
        a.style.display = "none";
        // Append to document body
        document.body.appendChild(a);
        // Use a timeout to allow the browser to process
        setTimeout(() => {
          a.click();
          // Clean up
          setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }, 100);
        }, 0);
      }

      toast({
        title: "Download complete",
        description: "Your video has been downloaded successfully.",
      });

      // Reset the state after a delay
      setTimeout(() => {
        setIsDownloading(false)
        setProgress(0)
      }, 1000)
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Failed to download the video. Please try again.",
        variant: "destructive",
      })
      setIsDownloading(false)
      setProgress(0)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Paste YouTube URL here..."
            value={url}
            onChange={handleUrlChange}
            disabled={isLoading || isDownloading}
          />
          <Button onClick={analyzeVideo} disabled={isLoading || isDownloading}>
            {isLoading ? "Analyzing..." : "Analyze"}
          </Button>
        </div>

        <Alert variant="warning">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important Notice</AlertTitle>
          <AlertDescription>
            This tool is for educational purposes only. Please ensure you have the right to download the content.
            Downloading copyrighted material without permission may violate YouTube's Terms of Service and copyright
            laws.
          </AlertDescription>
        </Alert>
      </div>

      {videoInfo && (
        <div className="space-y-6 border rounded-md p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <img
                src={videoInfo.thumbnail || "/placeholder.svg"}
                alt={videoInfo.title}
                className="w-full rounded-md object-cover aspect-video"
              />
            </div>
            <div className="md:w-2/3 space-y-2">
              <h3 className="text-xl font-bold">{videoInfo.title}</h3>
              <p className="text-muted-foreground">
                <span className="font-medium">Channel:</span> {videoInfo.author}
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium">Duration:</span> {videoInfo.duration}
              </p>

              <div className="mt-4">
                <Label className="mb-2 block">Select Format:</Label>
                <RadioGroup value={selectedFormat} onValueChange={setSelectedFormat} className="space-y-2">
                  {videoInfo.formats.map((format, index) => (
                    <div key={index} className="flex items-center space-x-2 border rounded-md p-2">
                      <RadioGroupItem value={`${format.quality}-${format.format}`} id={`format-${index}`} />
                      <Label htmlFor={`format-${index}`} className="flex-1">
                        <div className="flex justify-between">
                          <span>
                            {format.quality} ({format.format.toUpperCase()})
                          </span>
                          <span className="text-muted-foreground">{format.size}</span>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="mt-4 flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={acknowledgeTerms}
                  onCheckedChange={(checked) => setAcknowledgeTerms(checked as boolean)}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I acknowledge that I have the right to download this content
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    By checking this box, I confirm that I am downloading content that is either in the public domain,
                    licensed under Creative Commons, or for which I have obtained permission from the copyright holder.
                  </p>
                </div>
              </div>

              {isDownloading && (
                <div className="mt-4">
                  <Progress value={progress} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-1">Downloading... {progress}%</p>
                </div>
              )}

              <div className="mt-6 flex gap-2">
                <Button onClick={downloadVideo} disabled={isDownloading || !acknowledgeTerms} className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  {isDownloading ? "Downloading..." : "Download"}
                </Button>
                <Button variant="outline" asChild>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Open in YouTube
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!videoInfo && !isLoading && (
        <div className="border rounded-md p-6 text-center">
          <p className="text-muted-foreground">
            Video information will appear here after you enter a valid YouTube URL.
          </p>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Features</h3>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Download YouTube videos in various qualities (360p, 480p, 720p, 1080p)</li>
          <li>Extract audio from YouTube videos (MP3 format)</li>
          <li>Fast and reliable downloads</li>
          <li>No registration required</li>
          <li>Completely free to use</li>
        </ul>
      </div>
    </div>
  )
}

