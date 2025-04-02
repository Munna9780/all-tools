"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export function NewsletterTemplates({
  selectedTemplate,
  onTemplateChange,
}: {
  selectedTemplate: string
  onTemplateChange: (template: string) => void
}) {
  const templates = [
    {
      id: "modern",
      name: "Modern",
      description: "Clean and modern design with a focus on readability",
    },
    {
      id: "classic",
      name: "Classic",
      description: "Traditional newsletter layout with a professional look",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Simple and minimalist design with plenty of white space",
    },
    {
      id: "bold",
      name: "Bold",
      description: "Eye-catching design with strong colors and typography",
    },
  ]

  return (
    <div className="space-y-6 py-4">
      <div className="grid grid-cols-2 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className={cn(
              "border rounded-md p-4 cursor-pointer hover:border-primary relative",
              selectedTemplate === template.id && "border-primary",
            )}
            onClick={() => onTemplateChange(template.id)}
          >
            <div className="aspect-[8.5/11] bg-muted rounded-sm mb-2"></div>
            <h3 className="font-medium">{template.name}</h3>
            <p className="text-sm text-muted-foreground">{template.description}</p>
            {selectedTemplate === template.id && (
              <div className="absolute top-2 right-2 h-5 w-5 bg-primary rounded-full flex items-center justify-center">
                <Check className="h-3 w-3 text-primary-foreground" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Template Features</h3>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Responsive design that works on all devices</li>
          <li>Customizable colors and typography</li>
          <li>Support for images and rich content</li>
          <li>Call-to-action buttons</li>
          <li>Social media integration</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Tips for Effective Newsletters</h3>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Keep your content concise and focused</li>
          <li>Use compelling subject lines</li>
          <li>Include high-quality images</li>
          <li>Personalize your greeting</li>
          <li>Include a clear call-to-action</li>
          <li>Maintain a consistent sending schedule</li>
        </ul>
      </div>
    </div>
  )
}

