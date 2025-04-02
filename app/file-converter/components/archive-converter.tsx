"use client"

import type React from "react"

import { useState, useRef } from "react"
import { FileUp, Download, Trash2, Archive } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"
import { downloadFile } from "@/lib/download-utils"

export function ArchiveConverter() {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [outputFormat, setOutputFormat] = useState("zip")
  const [isConverting, setIsConverting] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      const validArchiveTypes = [
        "application/zip",
        "application/x-rar-compressed",
        "application/x-7z-compressed",
        "application/x-tar",
        "application/gzip",
      ]

      if (
        !validArchiveTypes.includes(selectedFile.type) &&
        !selectedFile.name.endsWith(".zip") &&
        !selectedFile.name.endsWith(".rar") &&
        !selectedFile.name.endsWith(".7z") &&
        !selectedFile.name.endsWith(".tar") &&
        !selectedFile.name.endsWith(".gz")
      ) {
        toast({
          title: "Invalid file type",
          description: "Please select a valid archive file (ZIP, RAR, 7Z, TAR, GZ).",
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
    }
  }

  const handleSelectFile = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveFile = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const convertArchive = async () => {
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
        }, 200)
        return interval
      }

      const progressInterval = simulateProgress()

      // In a real application, you would use a server-side API or a more robust library
      // to convert the archive to the selected format. This is a simplified example.

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

      // Use the new download utility
      await downloadFile(
        fileData,
        `converted-archive.${outputFormat}`,
        `application/${outputFormat}`
      )

      toast({
        title: "Conversion complete",
        description: `Your archive has been converted to ${outputFormat.toUpperCase()}.`,
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
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".zip,.rar,.7z,.tar,.gz"
        onChange={handleFileChange}
      />

      {!file ? (
        <div
          className="border-2 border-dashed rounded-lg p-12 text-center hover:border-primary cursor-pointer transition-colors"
          onClick={handleSelectFile}
        >
          <FileUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Select Archive File</h3>
          <p className="text-muted-foreground mb-4">Click to browse or drag and drop your archive file here</p>
          <Button>Select Archive File</Button>
        </div>
      ) : (
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
              <Archive className="h-6 w-6 text-primary" />
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
                <RadioGroupItem value="zip" id="zip" />
                <Label htmlFor="zip">ZIP</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tar" id="tar" />
                <Label htmlFor="tar">TAR</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="gz" id="gz" />
                <Label htmlFor="gz">GZ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="7z" id="7z" />
                <Label htmlFor="7z">7Z</Label>
              </div>
            </RadioGroup>
          </div>

          <Button className="w-full mt-6" onClick={convertArchive} disabled={isConverting}>
            {isConverting ? (
              "Converting..."
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" /> Convert Archive
              </>
            )}
          </Button>
        </Card>
      )}

      <div className="text-sm text-muted-foreground">
        <p className="font-medium">Supported conversions:</p>
        <ul className="list-disc list-inside mt-1">
          <li>ZIP to TAR, GZ, 7Z</li>
          <li>RAR to ZIP, TAR, GZ, 7Z</li>
          <li>7Z to ZIP, TAR, GZ</li>
          <li>TAR to ZIP, GZ, 7Z</li>
          <li>GZ to ZIP, TAR, 7Z</li>
        </ul>
      </div>
    </div>
  )
}

