"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, Download } from "lucide-react"
import * as XLSX from "xlsx"
import { saveAs } from "file-saver"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InvoiceForm, type InvoiceFormData } from "./components/invoice-form"
import { InvoiceItems } from "./components/invoice-items"
import { InvoicePreview } from "./components/invoice-preview"
import { InvoiceSettings } from "./components/invoice-settings"
import { useToast } from "@/hooks/use-toast"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { exportToPDF } from "./components/pdf-export"
import { handleError } from "@/lib/error-handler"

export default function InvoiceGeneratorClientPage() {
  const { toast } = useToast()
  const [invoiceData, setInvoiceData] = useState<InvoiceFormData>({
    invoiceNumber: "INV-001",
    invoiceDate: new Date(),
    yourName: "Your Business Name",
    yourAddress: "123 Business St, City, Country",
    yourEmail: "your@email.com",
    yourPhone: "+1 (555) 123-4567",
    clientName: "Client Business Name",
    clientAddress: "456 Client St, City, Country",
    clientEmail: "client@email.com",
    clientPhone: "+1 (555) 987-6543",
    paymentTerms: "Due within 30 days",
    paymentMethod: "Bank Transfer",
    bankDetails: "Bank: Example Bank\nAccount Name: Your Name\nAccount Number: 123456789\nSort Code: 12-34-56",
    items: [
      {
        description: "Website Design",
        details: "Design and development of company website",
        quantity: 1,
        rate: 1200,
        amount: 1200,
      },
      {
        description: "Logo Design",
        details: "Company logo design",
        quantity: 1,
        rate: 400,
        amount: 400,
      },
    ],
    taxRate: 10,
    notes: "Thank you for your business!",
  })

  const [template, setTemplate] = useState("classic")
  const [isExporting, setIsExporting] = useState(false)
  const invoicePreviewRef = useRef<HTMLDivElement>(null)

  const handleFormChange = (data: InvoiceFormData) => {
    setInvoiceData((prev) => ({ ...prev, ...data }))
  }

  const handleItemsChange = (items: any[]) => {
    setInvoiceData((prev) => ({ ...prev, items }))
  }

  const handleTaxRateChange = (rate: number) => {
    setInvoiceData((prev) => ({ ...prev, taxRate: rate }))
  }

  const handleTemplateChange = (template: string) => {
    setTemplate(template)
  }

  const downloadPDF = async () => {
    setIsExporting(true)

    toast({
      title: "Preparing PDF",
      description: "Please wait while we generate your invoice...",
    })

    await exportToPDF(
      invoicePreviewRef.current,
      `Invoice-${invoiceData.invoiceNumber}.pdf`,
      () => setIsExporting(true),
      () => {
        setIsExporting(false)
        toast({
          title: "PDF Downloaded",
          description: "Your invoice has been downloaded successfully.",
        })
      },
      () => setIsExporting(false),
    )
  }

  const downloadExcel = async () => {
    try {
      setIsExporting(true)

      toast({
        title: "Preparing Excel",
        description: "Please wait while we generate your Excel file...",
      })

      // Create workbook and worksheet
      const wb = XLSX.utils.book_new()

      // Create invoice header data
      const headerData = [
        ["Invoice", invoiceData.invoiceNumber],
        ["Date", invoiceData.invoiceDate ? invoiceData.invoiceDate.toLocaleDateString() : ""],
        [""],
        ["From", invoiceData.yourName],
        ["", invoiceData.yourAddress],
        ["", invoiceData.yourEmail],
        ["", invoiceData.yourPhone],
        [""],
        ["Bill To", invoiceData.clientName],
        ["", invoiceData.clientAddress],
        ["", invoiceData.clientEmail],
        ["", invoiceData.clientPhone],
        [""],
      ]

      // Create items data
      const itemsHeader = ["Description", "Details", "Quantity", "Rate", "Amount"]
      const itemsData = invoiceData.items.map((item) => [
        item.description,
        item.details,
        item.quantity,
        item.rate,
        item.amount,
      ])

      // Calculate totals
      const subtotal = invoiceData.items.reduce((sum, item) => sum + item.amount, 0)
      const tax = subtotal * (invoiceData.taxRate / 100)
      const total = subtotal + tax

      // Add totals
      const totalsData = [
        ["", "", "", "Subtotal", subtotal],
        ["", "", "", `Tax (${invoiceData.taxRate}%)`, tax],
        ["", "", "", "Total", total],
      ]

      // Combine all data
      const allData = [
        ...headerData,
        itemsHeader,
        ...itemsData,
        [""],
        ...totalsData,
        [""],
        ["Payment Terms", invoiceData.paymentTerms],
        ["Payment Method", invoiceData.paymentMethod],
        ["Bank Details", invoiceData.bankDetails],
      ]

      // Create worksheet and add to workbook
      const ws = XLSX.utils.aoa_to_sheet(allData)
      XLSX.utils.book_append_sheet(wb, ws, "Invoice")

      // Generate Excel file
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" })
      const data = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      })
      saveAs(data, `Invoice-${invoiceData.invoiceNumber}.xlsx`)

      toast({
        title: "Excel Downloaded",
        description: "Your invoice has been downloaded as an Excel file.",
      })
    } catch (error) {
      handleError(error, {
        title: "Excel Export Failed",
        fallbackMessage: "Failed to generate Excel file. Please try again.",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const downloadWord = async () => {
    try {
      setIsExporting(true)

      toast({
        title: "Preparing Word Document",
        description: "Please wait while we generate your Word document...",
      })

      // This is a simplified version - in a real app, you'd use a server-side solution
      // or a more robust client-side library to generate proper DOCX files
      if (!invoicePreviewRef.current) {
        throw new Error("Invoice preview not found")
      }

      const htmlContent = invoicePreviewRef.current.outerHTML

      // Create a Blob with the HTML content
      const blob = new Blob([htmlContent], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      })
      saveAs(blob, `Invoice-${invoiceData.invoiceNumber}.docx`)

      toast({
        title: "Word Document Downloaded",
        description: "Your invoice has been downloaded as a Word document.",
      })
    } catch (error) {
      handleError(error, {
        title: "Word Export Failed",
        fallbackMessage: "Failed to generate Word document. Please try again.",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const saveAsDraft = () => {
    try {
      localStorage.setItem("invoice-draft", JSON.stringify(invoiceData))

      toast({
        title: "Draft Saved",
        description: "Your invoice has been saved as a draft.",
      })
    } catch (error) {
      handleError(error, {
        title: "Save Failed",
        fallbackMessage: "Failed to save draft. Please try again.",
      })
    }
  }

  const loadDraft = () => {
    try {
      const savedDraft = localStorage.getItem("invoice-draft")
      if (savedDraft) {
        const parsedDraft = JSON.parse(savedDraft)

        // Convert date string back to Date object
        if (parsedDraft.invoiceDate) {
          parsedDraft.invoiceDate = new Date(parsedDraft.invoiceDate)
        }

        setInvoiceData(parsedDraft)

        toast({
          title: "Draft Loaded",
          description: "Your saved invoice draft has been loaded.",
        })
      } else {
        toast({
          title: "No Draft Found",
          description: "No saved draft was found.",
          variant: "destructive",
        })
      }
    } catch (error) {
      handleError(error, {
        title: "Load Failed",
        fallbackMessage: "Failed to load draft. The saved data may be corrupted.",
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Home</span>
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Invoice Generator</h1>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Create Your Invoice</CardTitle>
                  <CardDescription>Fill in the details below to generate a professional invoice.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="details" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="details">Invoice Details</TabsTrigger>
                      <TabsTrigger value="items">Line Items</TabsTrigger>
                      <TabsTrigger value="settings">Settings</TabsTrigger>
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details">
                      <InvoiceForm onFormChange={handleFormChange} />
                    </TabsContent>
                    <TabsContent value="items">
                      <InvoiceItems
                        items={invoiceData.items}
                        taxRate={invoiceData.taxRate}
                        onItemsChange={handleItemsChange}
                        onTaxRateChange={handleTaxRateChange}
                      />
                    </TabsContent>
                    <TabsContent value="settings">
                      <InvoiceSettings onTemplateChange={handleTemplateChange} />
                    </TabsContent>
                    <TabsContent value="preview" className="lg:hidden">
                      <div className="py-4">
                        <div id="invoice-preview-mobile">
                          <InvoicePreview data={invoiceData} />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <div className="space-x-2">
                  <Button variant="outline" onClick={saveAsDraft} disabled={isExporting}>
                    Save as Draft
                  </Button>
                  <Button variant="outline" onClick={loadDraft} disabled={isExporting}>
                    Load Draft
                  </Button>
                </div>
                <div className="space-x-2">
                  <Button variant="outline" onClick={downloadWord} disabled={isExporting}>
                    <Download className="mr-2 h-4 w-4" /> Export as Word
                  </Button>
                  <Button variant="outline" onClick={downloadExcel} disabled={isExporting}>
                    <Download className="mr-2 h-4 w-4" /> Export as Excel
                  </Button>
                  <Button onClick={downloadPDF} disabled={isExporting}>
                    <Download className="mr-2 h-4 w-4" />
                    {isExporting ? "Generating..." : "Download PDF"}
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] lg:overflow-auto hidden lg:block">
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>See how your invoice will look.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div id="invoice-preview">
                    <InvoicePreview ref={invoicePreviewRef} data={invoiceData} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

