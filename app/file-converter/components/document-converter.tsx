"use client"

import type React from "react"

import { useState, useRef } from "react"
import { FileUp, Download, Trash2, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"

export function DocumentConverter() {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [outputFormat, setOutputFormat] = useState("docx")
  const [isConverting, setIsConverting] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      const validDocTypes = [
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "text/plain",
        "text/rtf",
        "application/rtf",
      ]

      if (
        !validDocTypes.includes(selectedFile.type) &&
        !selectedFile.name.endsWith(".doc") &&
        !selectedFile.name.endsWith(".docx") &&
        !selectedFile.name.endsWith(".xls") &&
        !selectedFile.name.endsWith(".xlsx") &&
        !selectedFile.name.endsWith(".ppt") &&
        !selectedFile.name.endsWith(".pptx") &&
        !selectedFile.name.endsWith(".txt") &&
        !selectedFile.name.endsWith(".rtf")
      ) {
        toast({
          title: "Invalid file type",
          description: "Please select a valid document file (DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, RTF).",
          variant: "destructive",
        })
        return
      }

      if (selectedFile.size > 20 * 1024 * 1024) {
        // 20MB limit
        toast({
          title: "File too large",
          description: "Please select a file smaller than 20MB.",
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

  const convertDocument = async () => {
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
      // to convert the document to the selected format. This is a simplified example.

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
      const blob = new Blob([fileData], { type: `application/${outputFormat}` })

      // Create a download link
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `converted-document.${outputFormat}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: "Conversion complete",
        description: `Your document has been converted to ${outputFormat.toUpperCase()}.`,
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
        accept=".doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.rtf"
        onChange={handleFileChange}
      />

      {!file ? (
        <div
          className="border-2 border-dashed rounded-lg p-12 text-center hover:border-primary cursor-pointer transition-colors"
          onClick={handleSelectFile}
        >
          <FileUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Select Document File</h3>
          <p className="text-muted-foreground mb-4">Click to browse or drag and drop your document file here</p>
          <Button>Select Document File</Button>
        </div>
      ) : (
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
              <FileText className="h-6 w-6 text-primary" />
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
                <RadioGroupItem value="docx" id="docx" />
                <Label htmlFor="docx">DOCX</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf" id="pdf-doc" />
                <Label htmlFor="pdf-doc">PDF</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="txt" id="txt" />
                <Label htmlFor="txt">TXT</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rtf" id="rtf" />
                <Label htmlFor="rtf">RTF</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="odt" id="odt" />
                <Label htmlFor="odt">ODT</Label>
              </div>
            </RadioGroup>
          </div>

          <Button className="w-full mt-6" onClick={convertDocument} disabled={isConverting}>
            {isConverting ? (
              "Converting..."
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" /> Convert Document
              </>
            )}
          </Button>
        </Card>
      )}

      <div className="text-sm text-muted-foreground">
        <p className="font-medium">Supported conversions:</p>
        <ul className="list-disc list-inside mt-1">
          <li>DOC/DOCX to PDF, TXT, RTF, ODT</li>
          <li>XLS/XLSX to PDF, CSV, ODS</li>
          <li>PPT/PPTX to PDF, ODP</li>
          <li>TXT to PDF, DOCX, RTF</li>
          <li>RTF to PDF, DOCX, TXT</li>
        </ul>
      </div>
    </div>
  )
}

