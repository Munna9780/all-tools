"use client"

import type { ChangeEvent } from "react"
import { useState, useRef } from "react"
import { CalendarIcon, Upload } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export type InvoiceFormData = {
  logo?: string
  invoiceNumber: string
  invoiceDate: Date | undefined
  yourName: string
  yourAddress: string
  yourEmail: string
  yourPhone: string
  clientName: string
  clientAddress: string
  clientEmail: string
  clientPhone: string
  paymentTerms: string
  paymentMethod: string
  bankDetails: string
  items: Array<{
    description: string
    details: string
    quantity: number
    rate: number
    amount: number
  }>
  taxRate: number
  notes: string
}

const defaultItems = [
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
]

const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const validatePhone = (phone: string): boolean => {
  const re = /^[+]?[\d\s-()]{8,}$/
  return re.test(phone)
}

interface InvoiceFormProps {
  onFormChange: (data: InvoiceFormData) => void
}

export function InvoiceForm({ onFormChange }: InvoiceFormProps) {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [invoiceData, setInvoiceData] = useState<InvoiceFormData>({
    invoiceNumber: "INV-001",
    invoiceDate: new Date(),
    yourName: "",
    yourAddress: "",
    yourEmail: "",
    yourPhone: "",
    clientName: "",
    clientAddress: "",
    clientEmail: "",
    clientPhone: "",
    paymentTerms: "Due within 30 days",
    paymentMethod: "Bank Transfer",
    bankDetails: "",
    items: defaultItems,
    taxRate: 10,
    notes: "Thank you for your business!",
  })

  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!invoiceData.invoiceNumber.trim()) {
      newErrors.invoiceNumber = "Invoice number is required"
    }

    if (!invoiceData.invoiceDate) {
      newErrors.invoiceDate = "Invoice date is required"
    }

    if (!invoiceData.yourName.trim()) {
      newErrors.yourName = "Your name/business name is required"
    }

    if (invoiceData.yourEmail && !validateEmail(invoiceData.yourEmail)) {
      newErrors.yourEmail = "Invalid email format"
    }

    if (invoiceData.yourPhone && !validatePhone(invoiceData.yourPhone)) {
      newErrors.yourPhone = "Invalid phone number format"
    }

    if (invoiceData.clientEmail && !validateEmail(invoiceData.clientEmail)) {
      newErrors.clientEmail = "Invalid client email format"
    }

    if (invoiceData.clientPhone && !validatePhone(invoiceData.clientPhone)) {
      newErrors.clientPhone = "Invalid client phone number format"
    }

    if (!invoiceData.items.length) {
      newErrors.items = "At least one item is required"
    }

    if (invoiceData.taxRate < 0 || invoiceData.taxRate > 100) {
      newErrors.taxRate = "Tax rate must be between 0 and 100"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogoUpload = (): void => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        if (file.size > 5 * 1024 * 1024) {
          toast({
            title: "File too large",
            description: "Logo image must be less than 5MB",
            variant: "destructive",
          })
          return
        }

        // Check file type
        if (!file.type.startsWith('image/')) {
          toast({
            title: "Invalid file type",
            description: "Please upload an image file",
            variant: "destructive",
          })
          return
        }

        const reader = new FileReader()
        reader.onload = (event) => {
          const result = event.target?.result as string
          setLogoPreview(result)
          setInvoiceData((prev: InvoiceFormData) => {
            const updated = { ...prev, logo: result }
            if (validateForm()) {
              onFormChange(updated)
            }
            return updated
          })
        }
        reader.onerror = () => {
          toast({
            title: "Error reading file",
            description: "Please try again with a different file",
            variant: "destructive",
          })
        }
        reader.readAsDataURL(file)
      } catch (error) {
        toast({
          title: "Error uploading file",
          description: "Please try again",
          variant: "destructive",
        })
      }
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target
    setInvoiceData((prev: InvoiceFormData) => {
      const updated = { ...prev, [name]: value }
      if (validateForm()) {
        onFormChange(updated)
      }
      return updated
    })
  }

  const handleDateChange = (date: Date | undefined): void => {
    setInvoiceData((prev: InvoiceFormData) => {
      const updated = { ...prev, invoiceDate: date }
      if (validateForm()) {
        onFormChange(updated)
      }
      return updated
    })
  }

  return (
    <div className="space-y-6 py-4">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />

      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="logo">Your Logo</Label>
          <div className="flex items-center gap-4">
            <div
              className="h-16 w-16 rounded-md border flex items-center justify-center overflow-hidden"
              onClick={handleLogoUpload}
              style={{ cursor: "pointer" }}
            >
              {logoPreview ? (
                <img src={logoPreview || "/placeholder.svg"} alt="Logo" className="h-full w-full object-contain" />
              ) : (
                <Upload className="h-6 w-6 text-muted-foreground" />
              )}
            </div>
            <Button variant="outline" size="sm" onClick={handleLogoUpload}>
              Upload Logo
            </Button>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="invoiceNumber">Invoice Number</Label>
          <Input
            id="invoiceNumber"
            name="invoiceNumber"
            value={invoiceData.invoiceNumber}
            onChange={handleInputChange}
            placeholder="INV-001"
            className={errors.invoiceNumber ? "border-red-500" : ""}
          />
          {errors.invoiceNumber && <p className="text-sm text-red-500">{errors.invoiceNumber}</p>}
        </div>

        <div className="grid gap-2">
          <Label>Invoice Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !invoiceData.invoiceDate && "text-muted-foreground",
                  errors.invoiceDate && "border-red-500"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {invoiceData.invoiceDate ? format(invoiceData.invoiceDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={invoiceData.invoiceDate} onSelect={handleDateChange} initialFocus />
            </PopoverContent>
          </Popover>
          {errors.invoiceDate && <p className="text-sm text-red-500">{errors.invoiceDate}</p>}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Your Details</h3>
        <div className="grid gap-2">
          <Label htmlFor="yourName">Your Name/Business Name</Label>
          <Input
            id="yourName"
            name="yourName"
            value={invoiceData.yourName}
            onChange={handleInputChange}
            placeholder="Your Business Name"
            className={errors.yourName ? "border-red-500" : ""}
          />
          {errors.yourName && <p className="text-sm text-red-500">{errors.yourName}</p>}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="yourEmail">Your Email</Label>
          <Input
            id="yourEmail"
            name="yourEmail"
            type="email"
            value={invoiceData.yourEmail}
            onChange={handleInputChange}
            placeholder="your@email.com"
            className={errors.yourEmail ? "border-red-500" : ""}
          />
          {errors.yourEmail && <p className="text-sm text-red-500">{errors.yourEmail}</p>}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="yourPhone">Your Phone</Label>
          <Input
            id="yourPhone"
            name="yourPhone"
            value={invoiceData.yourPhone}
            onChange={handleInputChange}
            placeholder="+1 (555) 123-4567"
            className={errors.yourPhone ? "border-red-500" : ""}
          />
          {errors.yourPhone && <p className="text-sm text-red-500">{errors.yourPhone}</p>}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="yourAddress">Your Address</Label>
          <Textarea
            id="yourAddress"
            name="yourAddress"
            value={invoiceData.yourAddress}
            onChange={handleInputChange}
            placeholder="123 Business St, City, Country"
            className="min-h-[100px]"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Client Details</h3>
        <div className="grid gap-2">
          <Label htmlFor="clientName">Client Name/Business Name</Label>
          <Input
            id="clientName"
            name="clientName"
            value={invoiceData.clientName}
            onChange={handleInputChange}
            placeholder="Client Business Name"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="clientEmail">Client Email</Label>
          <Input
            id="clientEmail"
            name="clientEmail"
            type="email"
            value={invoiceData.clientEmail}
            onChange={handleInputChange}
            placeholder="client@email.com"
            className={errors.clientEmail ? "border-red-500" : ""}
          />
          {errors.clientEmail && <p className="text-sm text-red-500">{errors.clientEmail}</p>}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="clientPhone">Client Phone</Label>
          <Input
            id="clientPhone"
            name="clientPhone"
            value={invoiceData.clientPhone}
            onChange={handleInputChange}
            placeholder="+1 (555) 987-6543"
            className={errors.clientPhone ? "border-red-500" : ""}
          />
          {errors.clientPhone && <p className="text-sm text-red-500">{errors.clientPhone}</p>}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="clientAddress">Client Address</Label>
          <Textarea
            id="clientAddress"
            name="clientAddress"
            value={invoiceData.clientAddress}
            onChange={handleInputChange}
            placeholder="456 Client St, City, Country"
            className="min-h-[100px]"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Payment Details</h3>
        <div className="grid gap-2">
          <Label htmlFor="paymentTerms">Payment Terms</Label>
          <Input
            id="paymentTerms"
            name="paymentTerms"
            value={invoiceData.paymentTerms}
            onChange={handleInputChange}
            placeholder="Due within 30 days"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="paymentMethod">Payment Method</Label>
          <Input
            id="paymentMethod"
            name="paymentMethod"
            value={invoiceData.paymentMethod}
            onChange={handleInputChange}
            placeholder="Bank Transfer"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="bankDetails">Bank Details</Label>
          <Textarea
            id="bankDetails"
            name="bankDetails"
            value={invoiceData.bankDetails}
            onChange={handleInputChange}
            placeholder="Bank: Example Bank&#10;Account Name: Your Name&#10;Account Number: 123456789&#10;Sort Code: 12-34-56"
            className="min-h-[100px]"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          value={invoiceData.notes}
          onChange={handleInputChange}
          placeholder="Thank you for your business!"
          className="min-h-[100px]"
        />
      </div>
    </div>
  )
}
