"use client"

import { forwardRef } from "react"
import { format } from "date-fns"
import type { InvoiceFormData } from "./invoice-form"

export const InvoicePreview = forwardRef<HTMLDivElement, { data: InvoiceFormData }>(({ data }, ref) => {
  const calculateSubtotal = () => {
    return data.items.reduce((sum, item) => sum + item.amount, 0)
  }

  const calculateTax = () => {
    return calculateSubtotal() * (data.taxRate / 100)
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  // Calculate due date (30 days from invoice date or as specified)
  const getDueDate = () => {
    if (!data.invoiceDate) return ""

    const dueDate = new Date(data.invoiceDate)
    dueDate.setDate(dueDate.getDate() + 30)
    return format(dueDate, "MMMM d, yyyy")
  }

  return (
    <div ref={ref} className="bg-white rounded-md border p-6 text-sm print:border-none print:p-0">
      <div className="flex justify-between mb-8">
        <div>
          {data.logo ? (
            <img src={data.logo || "/placeholder.svg"} alt="Logo" className="h-12 mb-2 object-contain" />
          ) : (
            <div className="h-12 w-32 bg-muted rounded-md mb-2"></div>
          )}
          <p className="font-bold">{data.yourName || "Your Business Name"}</p>
          <p>{data.yourAddress || "123 Business St, City, Country"}</p>
          <p>{data.yourEmail || "your@email.com"}</p>
          <p>{data.yourPhone || "+1 (555) 123-4567"}</p>
        </div>
        <div className="text-right">
          <h1 className="text-2xl font-bold mb-2">INVOICE</h1>
          <p>
            <span className="font-medium">Invoice Number:</span> {data.invoiceNumber}
          </p>
          <p>
            <span className="font-medium">Date:</span>{" "}
            {data.invoiceDate ? format(data.invoiceDate, "MMMM d, yyyy") : "March 24, 2024"}
          </p>
          <p>
            <span className="font-medium">Due Date:</span> {getDueDate()}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="font-bold mb-2">Bill To:</h2>
        <p>{data.clientName || "Client Business Name"}</p>
        <p>{data.clientAddress || "456 Client St, City, Country"}</p>
        <p>{data.clientEmail || "client@email.com"}</p>
        <p>{data.clientPhone || "+1 (555) 987-6543"}</p>
      </div>

      <table className="w-full mb-8">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Description</th>
            <th className="text-right py-2">Quantity</th>
            <th className="text-right py-2">Rate</th>
            <th className="text-right py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="py-2">
                {item.description}
                {item.details && <div className="text-xs text-muted-foreground">{item.details}</div>}
              </td>
              <td className="text-right py-2">{item.quantity}</td>
              <td className="text-right py-2">${item.rate.toFixed(2)}</td>
              <td className="text-right py-2">${item.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-b">
            <td colSpan={3} className="text-right py-2 font-medium">
              Subtotal:
            </td>
            <td className="text-right py-2">${calculateSubtotal().toFixed(2)}</td>
          </tr>
          <tr className="border-b">
            <td colSpan={3} className="text-right py-2 font-medium">
              Tax ({data.taxRate}%):
            </td>
            <td className="text-right py-2">${calculateTax().toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={3} className="text-right py-2 font-bold">
              Total:
            </td>
            <td className="text-right py-2 font-bold">${calculateTotal().toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

      <div className="mb-8">
        <h2 className="font-bold mb-2">Payment Details:</h2>
        <p>
          <span className="font-medium">Payment Terms:</span> {data.paymentTerms}
        </p>
        <p>
          <span className="font-medium">Payment Method:</span> {data.paymentMethod}
        </p>
        {data.bankDetails && <div className="whitespace-pre-line">{data.bankDetails}</div>}
      </div>

      {data.notes && (
        <div className="text-center text-muted-foreground">
          <p>{data.notes}</p>
        </div>
      )}
    </div>
  )
})

InvoicePreview.displayName = "InvoicePreview"

