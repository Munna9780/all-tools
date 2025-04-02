"use client"

import type React from "react"
import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type InvoiceItem = {
  description: string
  details: string
  quantity: number
  rate: number
  amount: number
}

export function InvoiceItems({
  items,
  taxRate,
  onItemsChange,
  onTaxRateChange,
}: {
  items: InvoiceItem[]
  taxRate: number
  onItemsChange: (items: InvoiceItem[]) => void
  onTaxRateChange: (rate: number) => void
}) {
  const handleAddItem = () => {
    const newItems = [
      ...items,
      {
        description: "",
        details: "",
        quantity: 1,
        rate: 0,
        amount: 0,
      },
    ]
    onItemsChange(newItems)
  }

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index)
    onItemsChange(newItems)
  }

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...items]

    if (field === "quantity" || field === "rate") {
      const numValue = typeof value === "string" ? Number.parseFloat(value) || 0 : value
      newItems[index][field] = numValue

      // Recalculate amount
      const quantity = newItems[index].quantity
      const rate = newItems[index].rate
      newItems[index].amount = quantity * rate
    } else {
      // @ts-ignore - We know this is a string field
      newItems[index][field] = value
    }

    onItemsChange(newItems)
  }

  const handleTaxRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value) || 0
    onTaxRateChange(value)
  }

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.amount, 0)
  }

  const calculateTax = () => {
    return calculateSubtotal() * (taxRate / 100)
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  return (
    <div className="space-y-4 py-4">
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="border rounded-md p-4">
            <div className="grid gap-4 mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`item-description-${index}`}>Description</Label>
                  <Input
                    id={`item-description-${index}`}
                    value={item.description}
                    onChange={(e) => handleItemChange(index, "description", e.target.value)}
                    placeholder="Item description"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`item-details-${index}`}>Details</Label>
                  <Input
                    id={`item-details-${index}`}
                    value={item.details}
                    onChange={(e) => handleItemChange(index, "details", e.target.value)}
                    placeholder="Additional details"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`item-quantity-${index}`}>Quantity</Label>
                  <Input
                    id={`item-quantity-${index}`}
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`item-rate-${index}`}>Rate</Label>
                  <Input
                    id={`item-rate-${index}`}
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.rate}
                    onChange={(e) => handleItemChange(index, "rate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`item-amount-${index}`}>Amount</Label>
                  <Input id={`item-amount-${index}`} value={item.amount.toFixed(2)} disabled />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={() => handleRemoveItem(index)} className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" /> Remove Item
              </Button>
            </div>
          </div>
        ))}
        <Button onClick={handleAddItem} className="w-full">
          <Plus className="mr-2 h-4 w-4" /> Add Item
        </Button>
      </div>

      <div className="border rounded-md p-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="tax-rate">Tax Rate (%)</Label>
            <div className="w-32">
              <Input
                id="tax-rate"
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={taxRate}
                onChange={handleTaxRateChange}
              />
            </div>
          </div>

          <div className="flex justify-between py-2 border-t">
            <span>Subtotal:</span>
            <span>${calculateSubtotal().toFixed(2)}</span>
          </div>

          <div className="flex justify-between py-2 border-t">
            <span>Tax ({taxRate}%):</span>
            <span>${calculateTax().toFixed(2)}</span>
          </div>

          <div className="flex justify-between py-2 border-t font-bold">
            <span>Total:</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

