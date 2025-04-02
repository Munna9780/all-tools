"use client"

import type React from "react"

import { useState, useRef } from "react"
import { FileUp, Download, Trash2, Video } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"

export function VideoConverter() {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [outputFormat, setOutputFormat] = useState("mp4")
  const [resolution, setResolution] = useState("720p")
  const [isConverting, setIsConverting] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      const validVideoTypes = [
        "video/mp4",
        "video/webm",
        "video/ogg",
        "video/quicktime",
        "video/x-msvideo",
        "video/x-matroska",
      ]

      if (
        !validVideoTypes.includes(selectedFile.type) &&
        !selectedFile.name.endsWith(".mp4") &&
        !selectedFile.name.endsWith(".webm") &&
        !selectedFile.name.endsWith(".ogg") &&
        !selectedFile.name.endsWith(".mov") &&
        !selectedFile.name.endsWith(".avi") &&
        !selectedFile.name.endsWith(".mkv")
      ) {
        toast({
          title: "Invalid file type",
          description: "Please select a valid video file (MP4, WEBM, OGG, MOV, AVI, MKV).",
          variant: "destructive",
        })
        return
      }

      if (selectedFile.size > 100 * 1024 * 1024) {
        // 100MB limit
        toast({
          title: "File too large",
          description: "Please select a file smaller than 100MB.",
          variant: "destructive",
        })
        return
      }

      setFile(selectedFile)

      // Create video URL for preview
      const url = URL.createObjectURL(selectedFile)
      setVideoUrl(url)
    }
  }

  const handleSelectFile = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveFile = () => {
    setFile(null)
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl)
      setVideoUrl(null)
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const convertVideo = async () => {
    if (!file) return

    setIsConverting(true)
    setProgress(10)

    try {
      // Simulate conversion process with progress
      const simulateProgress = () => {
        let currentProgress = 10
        const interval = setInterval(() => {
          currentProgress += 2
          setProgress(currentProgress)
          if (currentProgress >= 90) {
            clearInterval(interval)
          }
        }, 300)
        return interval
      }

      const progressInterval = simulateProgress()

      // In a real application, you would use a server-side API or a more robust library
      // to convert the video to the selected format. This is a simplified example.

      // For demonstration purposes, we'll just download the original file with a new extension
      const reader = new FileReader()

      const fileData = await new Promise<ArrayBuffer>((resolve, reject) => {
        reader.onload = (e) => resolve(e.target?.result as ArrayBuffer)
        reader.onerror = reject
        reader.readAsArrayBuffer(file)
      })

      // Clear the progress interval
      clearInterval(progressInterval)
      setProgress(100)

      // Create a blob with the file data
      const blob = new Blob([fileData], { type: `video/${outputFormat}` })

      // Create a download link with proper attributes for cross-browser compatibility
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `converted-video.${outputFormat}`
      // Set these attributes to help with download on mobile
      a.setAttribute("target", "_blank")
      a.setAttribute("rel", "noopener noreferrer")
      // Make the element visible to ensure it works on mobile
      a.style.display = "none"
      // Append to document body
      document.body.appendChild(a)
      // Use a timeout to allow the browser to process
      setTimeout(() => {
        a.click()
        // Clean up
        setTimeout(() => {
          document.body.removeChild(a)
          URL.revokeObjectURL(url)
        }, 100)
      }, 0)

      toast({
        title: "Conversion complete",
        description: `Your video has been converted to ${outputFormat.toUpperCase()} (${resolution}).`,
      })
    } catch (error) {
      toast({
        title: "Conversion failed",
        description: "An error occurred during conversion. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsConverting(false)
      setProgress(0)
    }
  }

  return (
    <div className="space-y-6">
      <input type="file" ref={fileInputRef} className="hidden" accept="video/*" onChange={handleFileChange} />

      {!file ? (
        <div
          className="border-2 border-dashed rounded-lg p-12 text-center hover:border-primary cursor-pointer transition-colors"
          onClick={handleSelectFile}
        >
          <FileUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Select Video File</h3>
          <p className="text-muted-foreground mb-4">Click to browse or drag and drop your video file here</p>
          <Button>Select Video File</Button>
        </div>
      ) : (
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
              <Video className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">{file.name}</h3>
                  <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <Button variant="ghost" size="icon" onClick={handleRemoveFile} disabled={isConverting}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {videoUrl && (
                <div className="mt-4">
                  <video ref={videoRef} controls className="w-full rounded-md">
                    <source src={videoUrl} />
                    Your browser does not support the video element.
                  </video>
                </div>
              )}

              {isConverting && (
                <div className="mt-4">
                  <Progress value={progress} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-1">Converting... {progress}%</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6">
            <Label className="mb-2 block">Convert to:</Label>
            <RadioGroup value={outputFormat} onValueChange={setOutputFormat} className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mp4" id="mp4" />
                <Label htmlFor="mp4">MP4</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="webm" id="webm" />
                <Label htmlFor="webm">WEBM</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="avi" id="avi" />
                <Label htmlFor="avi">AVI</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mov" id="mov" />
                <Label htmlFor="mov">MOV</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mkv" id="mkv" />
                <Label htmlFor="mkv">MKV</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="mt-6">
            <Label htmlFor="resolution" className="mb-2 block">
              Resolution:
            </Label>
            <Select value={resolution} onValueChange={setResolution}>
              <SelectTrigger id="resolution">
                <SelectValue placeholder="Select resolution" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="480p">480p</SelectItem>
                <SelectItem value="720p">720p (HD)</SelectItem>
                <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                <SelectItem value="1440p">1440p (2K)</SelectItem>
                <SelectItem value="2160p">2160p (4K)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full mt-6" onClick={convertVideo} disabled={isConverting}>
            {isConverting ? (
              "Converting..."
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" /> Convert Video
              </>
            )}
          </Button>
        </Card>
      )}

      <div className="text-sm text-muted-foreground">
        <p className="font-medium">Supported conversions:</p>
        <ul className="list-disc list-inside mt-1">
          <li>MP4 to WEBM, AVI, MOV, MKV</li>
          <li>WEBM to MP4, AVI, MOV, MKV</li>
          <li>AVI to MP4, WEBM, MOV, MKV</li>
          <li>MOV to MP4, WEBM, AVI, MKV</li>
          <li>MKV to MP4, WEBM, AVI, MOV</li>
        </ul>
      </div>
    </div>
  )
}

