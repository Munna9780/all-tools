"use client"

import type React from "react"

import { useState, useRef } from "react"
import { FileUp, Download, Trash2, Music } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"

export function AudioConverter() {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [outputFormat, setOutputFormat] = useState("mp3")
  const [bitrate, setBitrate] = useState(192)
  const [isConverting, setIsConverting] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      const validAudioTypes = ["audio/mpeg", "audio/wav", "audio/ogg", "audio/flac", "audio/aac", "audio/mp4"]

      if (
        !validAudioTypes.includes(selectedFile.type) &&
        !selectedFile.name.endsWith(".mp3") &&
        !selectedFile.name.endsWith(".wav") &&
        !selectedFile.name.endsWith(".ogg") &&
        !selectedFile.name.endsWith(".flac") &&
        !selectedFile.name.endsWith(".aac") &&
        !selectedFile.name.endsWith(".m4a")
      ) {
        toast({
          title: "Invalid file type",
          description: "Please select a valid audio file (MP3, WAV, OGG, FLAC, AAC, M4A).",
          variant: "destructive",
        })
        return
      }

      if (selectedFile.size > 50 * 1024 * 1024) {
        // 50MB limit
        toast({
          title: "File too large",
          description: "Please select a file smaller than 50MB.",
          variant: "destructive",
        })
        return
      }

      setFile(selectedFile)

      // Create audio URL for preview
      const url = URL.createObjectURL(selectedFile)
      setAudioUrl(url)
    }
  }

  const handleSelectFile = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveFile = () => {
    setFile(null)
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
      setAudioUrl(null)
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const convertAudio = async () => {
    if (!file) return

    setIsConverting(true)
    setProgress(10)

    try {
      // Simulate conversion process with progress
      const simulateProgress = () => {
        let currentProgress = 10
        const interval = setInterval(() => {
          currentProgress += 5
          setProgress(currentProgress)
          if (currentProgress >= 90) {
            clearInterval(interval)
          }
        }, 300)
        return interval
      }

      const progressInterval = simulateProgress()

      // In a real application, you would use a server-side API or a more robust library
      // to convert the audio to the selected format. This is a simplified example.

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
      const blob = new Blob([fileData], { type: `audio/${outputFormat}` })

      // Create a download link
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `converted-audio.${outputFormat}`
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
        description: `Your audio has been converted to ${outputFormat.toUpperCase()}.`,
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
      <input type="file" ref={fileInputRef} className="hidden" accept="audio/*" onChange={handleFileChange} />

      {!file ? (
        <div
          className="border-2 border-dashed rounded-lg p-12 text-center hover:border-primary cursor-pointer transition-colors"
          onClick={handleSelectFile}
        >
          <FileUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Select Audio File</h3>
          <p className="text-muted-foreground mb-4">Click to browse or drag and drop your audio file here</p>
          <Button>Select Audio File</Button>
        </div>
      ) : (
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
              <Music className="h-6 w-6 text-primary" />
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

              {audioUrl && (
                <div className="mt-4">
                  <audio ref={audioRef} controls className="w-full">
                    <source src={audioUrl} />
                    Your browser does not support the audio element.
                  </audio>
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
                <RadioGroupItem value="mp3" id="mp3" />
                <Label htmlFor="mp3">MP3</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="wav" id="wav" />
                <Label htmlFor="wav">WAV</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ogg" id="ogg" />
                <Label htmlFor="ogg">OGG</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="flac" id="flac" />
                <Label htmlFor="flac">FLAC</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="aac" id="aac" />
                <Label htmlFor="aac">AAC</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="m4a" id="m4a" />
                <Label htmlFor="m4a">M4A</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <Label>Bitrate: {bitrate} kbps</Label>
            </div>
            <Slider value={[bitrate]} min={64} max={320} step={32} onValueChange={(value) => setBitrate(value[0])} />
          </div>

          <Button className="w-full mt-6" onClick={convertAudio} disabled={isConverting}>
            {isConverting ? (
              "Converting..."
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" /> Convert Audio
              </>
            )}
          </Button>
        </Card>
      )}

      <div className="text-sm text-muted-foreground">
        <p className="font-medium">Supported conversions:</p>
        <ul className="list-disc list-inside mt-1">
          <li>MP3 to WAV, OGG, FLAC, AAC, M4A</li>
          <li>WAV to MP3, OGG, FLAC, AAC, M4A</li>
          <li>OGG to MP3, WAV, FLAC, AAC, M4A</li>
          <li>FLAC to MP3, WAV, OGG, AAC, M4A</li>
          <li>AAC to MP3, WAV, OGG, FLAC, M4A</li>
          <li>M4A to MP3, WAV, OGG, FLAC, AAC</li>
        </ul>
      </div>
    </div>
  )
}

