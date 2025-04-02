"use client"

import { useState } from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

type Template = "classic" | "modern" | "minimal"

export function InvoiceSettings({
  onTemplateChange,
}: {
  onTemplateChange: (template: Template) => void
}) {
  const [selectedTemplate, setSelectedTemplate] = useState<Template>("classic")

  const handleTemplateChange = (template: Template) => {
    setSelectedTemplate(template)
    onTemplateChange(template)
  }

  return (
    <div className="space-y-4 py-4">
      <div className="grid gap-2">
        <h3 className="text-lg font-medium">Invoice Template</h3>
        <div className="grid grid-cols-3 gap-4">
          <TemplateOption
            name="classic"
            label="Classic"
            selected={selectedTemplate === "classic"}
            onClick={() => handleTemplateChange("classic")}
          />
          <TemplateOption
            name="modern"
            label="Modern"
            selected={selectedTemplate === "modern"}
            onClick={() => handleTemplateChange("modern")}
          />
          <TemplateOption
            name="minimal"
            label="Minimal"
            selected={selectedTemplate === "minimal"}
            onClick={() => handleTemplateChange("minimal")}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <h3 className="text-lg font-medium">Paper Size</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-md p-2 cursor-pointer hover:border-primary flex items-center justify-center">
            <span>A4</span>
          </div>
          <div className="border rounded-md p-2 cursor-pointer hover:border-primary flex items-center justify-center">
            <span>US Letter</span>
          </div>
        </div>
      </div>

      <div className="grid gap-2">
        <h3 className="text-lg font-medium">Color Scheme</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="border rounded-md p-2 cursor-pointer hover:border-primary">
            <div className="h-8 bg-blue-500 rounded-sm"></div>
            <p className="text-center text-sm mt-1">Blue</p>
          </div>
          <div className="border rounded-md p-2 cursor-pointer hover:border-primary">
            <div className="h-8 bg-green-500 rounded-sm"></div>
            <p className="text-center text-sm mt-1">Green</p>
          </div>
          <div className="border rounded-md p-2 cursor-pointer hover:border-primary">
            <div className="h-8 bg-purple-500 rounded-sm"></div>
            <p className="text-center text-sm mt-1">Purple</p>
          </div>
          <div className="border rounded-md p-2 cursor-pointer hover:border-primary">
            <div className="h-8 bg-gray-800 rounded-sm"></div>
            <p className="text-center text-sm mt-1">Dark</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function TemplateOption({
  name,
  label,
  selected,
  onClick,
}: {
  name: string
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <div
      className={cn("border rounded-md p-2 cursor-pointer hover:border-primary relative", selected && "border-primary")}
      onClick={onClick}
    >
      <div className="aspect-[8.5/11] bg-muted rounded-sm"></div>
      <p className="text-center text-sm mt-1">{label}</p>
      {selected && (
        <div className="absolute top-2 right-2 h-5 w-5 bg-primary rounded-full flex items-center justify-center">
          <Check className="h-3 w-3 text-primary-foreground" />
        </div>
      )}
    </div>
  )
}

