"use client"

import type React from "react"

import { useState, useRef } from "react"
import { FileUp, Download, Trash2, Image } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"

export function ImageConverter() {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [outputFormat, setOutputFormat] = useState("png")
  const [quality, setQuality] = useState(80)
  const [isConverting, setIsConverting] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      const validImageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/bmp",
        "image/tiff",
        "image/svg+xml",
      ]

      if (!validImageTypes.includes(selectedFile.type)) {
        toast({
          title: "Invalid file type",
          description: "Please select a valid image file (JPG, PNG, GIF, WEBP, BMP, TIFF, SVG).",
          variant: "destructive",
        })
        return
      }

      if (selectedFile.size > 10 * 1024 * 1024) {
        // 10MB limit
        toast({
          title: "File too large",
          description: "Please select a file smaller than 10MB.",
          variant: "destructive",
        })
        return
      }

      setFile(selectedFile)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleSelectFile = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveFile = () => {
    setFile(null)
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const convertImage = async () => {
    if (!file || !preview) return

    setIsConverting(true)
    setProgress(10)

    try {
      // Simulate conversion process with progress
      const simulateProgress = () => {
        let currentProgress = 10
        const interval = setInterval(() => {
          currentProgress += 10
          setProgress(currentProgress)
          if (currentProgress >= 90) {
            clearInterval(interval)
          }
        }, 200)
        return interval
      }

      const progressInterval = simulateProgress()

      // In a real application, you would use a server-side API or a more robust library
      // to convert the image to the selected format. This is a simplified example.

      // Create a canvas element to draw the image
      const img = new Image()
      img.crossOrigin = "anonymous"

      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
        img.src = preview
      })

      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      if (!ctx) {
        throw new Error("Could not get canvas context")
      }

      canvas.width = img.width
      canvas.height = img.height

      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0)

      // Convert the canvas to the selected format
      let mimeType = "image/png"
      switch (outputFormat) {
        case "jpg":
        case "jpeg":
          mimeType = "image/jpeg"
          break
        case "png":
          mimeType = "image/png"
          break
        case "webp":
          mimeType = "image/webp"
          break
        case "gif":
          mimeType = "image/gif"
          break
        default:
          mimeType = "image/png"
      }

      // Clear the progress interval
      clearInterval(progressInterval)
      setProgress(100)

      // Get the data URL of the canvas
      const dataURL = canvas.toDataURL(mimeType, quality / 100)

      // Create a download link
      // Check if user is on mobile
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        // Mobile-specific download approach
        try {
          // Create a visible download link that will respond to user interaction
          const downloadLink = document.createElement('a');
          downloadLink.href = dataURL;
          downloadLink.download = `converted-image.${outputFormat}`;
          downloadLink.textContent = "Download Image";
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
          
          // Add it to the page near the convert button
          const buttonParent = document.querySelector('.w-full.mt-6')?.parentElement;
          if (buttonParent) {
            buttonParent.appendChild(downloadContainer);
          }
          
          toast({
            title: "Conversion complete",
            description: "Tap the Download Image button to save your file.",
          });
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
        const a = document.createElement("a");
        a.href = dataURL;
        a.download = `converted-image.${outputFormat}`;
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
          }, 100);
        }, 0);
      }

      toast({
        title: "Conversion complete",
        description: `Your image has been converted to ${outputFormat.toUpperCase()}.`,
      });
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
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />

      {!file ? (
        <div
          className="border-2 border-dashed rounded-lg p-12 text-center hover:border-primary cursor-pointer transition-colors"
          onClick={handleSelectFile}
        >
          <FileUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Select Image File</h3>
          <p className="text-muted-foreground mb-4">Click to browse or drag and drop your image file here</p>
          <Button>Select Image File</Button>
        </div>
      ) : (
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 rounded overflow-hidden bg-muted flex items-center justify-center">
              {preview ? (
                <img src={preview || "/placeholder.svg"} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <Image className="h-8 w-8 text-primary" />
              )}
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
                <RadioGroupItem value="jpg" id="jpg" />
                <Label htmlFor="jpg">JPG</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="png" id="png" />
                <Label htmlFor="png">PNG</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="webp" id="webp" />
                <Label htmlFor="webp">WEBP</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="gif" id="gif" />
                <Label htmlFor="gif">GIF</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <Label>Quality: {quality}%</Label>
            </div>
            <Slider value={[quality]} min={10} max={100} step={1} onValueChange={(value) => setQuality(value[0])} />
          </div>

          <Button className="w-full mt-6" onClick={convertImage} disabled={isConverting}>
            {isConverting ? (
              "Converting..."
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" /> Convert Image
              </>
            )}
          </Button>
        </Card>
      )}

      <div className="text-sm text-muted-foreground">
        <p className="font-medium">Supported conversions:</p>
        <ul className="list-disc list-inside mt-1">
          <li>JPG to PNG, WEBP, GIF</li>
          <li>PNG to JPG, WEBP, GIF</li>
          <li>WEBP to JPG, PNG, GIF</li>
          <li>GIF to JPG, PNG, WEBP</li>
          <li>BMP to JPG, PNG, WEBP, GIF</li>
          <li>TIFF to JPG, PNG, WEBP, GIF</li>
          <li>SVG to JPG, PNG, WEBP, GIF</li>
        </ul>
      </div>
    </div>
  )
}

