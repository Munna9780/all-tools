"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, Download, FileText, Copy } from "lucide-react"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { NewsletterForm } from "./components/newsletter-form"
import { NewsletterPreview } from "./components/newsletter-preview"
import { NewsletterTemplates } from "./components/newsletter-templates"

export default function NewsletterGeneratorClientPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("content")
  const [selectedTemplate, setSelectedTemplate] = useState("modern")
  const previewRef = useRef<HTMLDivElement>(null)

  const [newsletterData, setNewsletterData] = useState({
    title: "Monthly Newsletter",
    subtitle: "Stay updated with our latest news and updates",
    headerImage: "",
    companyName: "Your Company",
    companyLogo: "",
    date: new Date().toLocaleDateString(),
    greeting: "Hello subscribers,",
    mainContent:
      "Welcome to our monthly newsletter! We're excited to share the latest updates and news with you. This month has been filled with exciting developments and we can't wait to tell you all about them.",
    sections: [
      {
        title: "Latest News",
        content:
          "We've launched our new website! Check it out and let us know what you think. We've also added new features to our product line.",
        image: "",
      },
      {
        title: "Upcoming Events",
        content:
          "Join us for our webinar on digital marketing strategies on June 15th. We'll be discussing the latest trends and how to implement them in your business.",
        image: "",
      },
      {
        title: "Featured Product",
        content:
          "Our new product is now available! It's designed to help you streamline your workflow and increase productivity.",
        image: "",
      },
    ],
    callToAction: {
      text: "Visit Our Website",
      url: "https://example.com",
    },
    footerText: "Thank you for subscribing to our newsletter. If you have any questions, please contact us.",
    socialLinks: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  })

  const handleFormChange = (data: any) => {
    setNewsletterData((prev) => ({ ...prev, ...data }))
  }

  const handleTemplateChange = (template: string) => {
    setSelectedTemplate(template)
  }

  const downloadPDF = async () => {
    if (!previewRef.current) return

    try {
      toast({
        title: "Preparing PDF",
        description: "Please wait while we generate your newsletter...",
      })

      const element = previewRef.current

      // Apply print-specific styles
      const originalStyle = element.style.cssText
      element.style.width = "210mm"
      element.style.padding = "10mm"
      element.style.backgroundColor = "white"

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
      })

      // Restore original styles
      element.style.cssText = originalStyle

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const imgWidth = 210
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
      pdf.save(`Newsletter-${new Date().toISOString().split("T")[0]}.pdf`)

      toast({
        title: "PDF Downloaded",
        description: "Your newsletter has been downloaded successfully.",
      })
    } catch (error) {
      console.error("PDF generation error:", error)
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      })
    }
  }

  const downloadHTML = () => {
    if (!previewRef.current) return

    try {
      const element = previewRef.current
      const htmlContent = element.outerHTML

      // Create a blob with the HTML content
      const blob = new Blob([htmlContent], { type: "text/html" })
      const url = URL.createObjectURL(blob)

      // Create a download link
      const a = document.createElement("a")
      a.href = url
      a.download = `Newsletter-${new Date().toISOString().split("T")[0]}.html`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: "HTML Downloaded",
        description: "Your newsletter has been downloaded as an HTML file.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate HTML. Please try again.",
        variant: "destructive",
      })
    }
  }

  const copyHTML = () => {
    if (!previewRef.current) return

    try {
      const element = previewRef.current
      const htmlContent = element.outerHTML

      navigator.clipboard.writeText(htmlContent)

      toast({
        title: "HTML Copied",
        description: "Your newsletter HTML has been copied to the clipboard.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy HTML. Please try again.",
        variant: "destructive",
      })
    }
  }

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
            <Link href="/youtube-tools" className="text-sm font-medium hover:underline">
              YouTube Tools
            </Link>
            <Link href="/url-shortener" className="text-sm font-medium hover:underline">
              URL Shortener
            </Link>
            <Link href="/newsletter-generator" className="text-sm font-medium text-primary hover:underline">
              Newsletter Generator
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
            <h1 className="text-3xl font-bold">Newsletter Generator</h1>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Create Your Newsletter</CardTitle>
                  <CardDescription>Fill in the details below to generate a professional newsletter.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="templates">Templates</TabsTrigger>
                      <TabsTrigger value="content">Content</TabsTrigger>
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>
                    <TabsContent value="templates">
                      <NewsletterTemplates
                        selectedTemplate={selectedTemplate}
                        onTemplateChange={handleTemplateChange}
                      />
                    </TabsContent>
                    <TabsContent value="content">
                      <NewsletterForm data={newsletterData} onFormChange={handleFormChange} />
                    </TabsContent>
                    <TabsContent value="preview" className="lg:hidden">
                      <div className="py-4">
                        <div id="newsletter-preview-mobile">
                          <NewsletterPreview data={newsletterData} template={selectedTemplate} />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <div className="space-x-2">
                  <Button variant="outline" onClick={copyHTML}>
                    <Copy className="mr-2 h-4 w-4" /> Copy HTML
                  </Button>
                  <Button variant="outline" onClick={downloadHTML}>
                    <Download className="mr-2 h-4 w-4" /> Export as HTML
                  </Button>
                </div>
                <Button onClick={downloadPDF}>
                  <Download className="mr-2 h-4 w-4" /> Download PDF
                </Button>
              </div>
            </div>

            <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] lg:overflow-auto hidden lg:block">
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>See how your newsletter will look.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div id="newsletter-preview" ref={previewRef}>
                    <NewsletterPreview data={newsletterData} template={selectedTemplate} />
                  </div>
                </CardContent>
              </Card>
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

