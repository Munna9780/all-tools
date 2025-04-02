"use client"

import type React from "react"

import { useState } from "react"
import { PlusCircle, Trash2, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

type NewsletterSection = {
  title: string
  content: string
  image: string
}

type NewsletterData = {
  title: string
  subtitle: string
  headerImage: string
  companyName: string
  companyLogo: string
  date: string
  greeting: string
  mainContent: string
  sections: NewsletterSection[]
  callToAction: {
    text: string
    url: string
  }
  footerText: string
  socialLinks: {
    facebook: string
    twitter: string
    instagram: string
    linkedin: string
  }
}

export function NewsletterForm({
  data,
  onFormChange,
}: {
  data: NewsletterData
  onFormChange: (data: Partial<NewsletterData>) => void
}) {
  const { toast } = useToast()
  const [sections, setSections] = useState<NewsletterSection[]>(data.sections)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name.startsWith("socialLinks.")) {
      const socialNetwork = name.split(".")[1]
      onFormChange({
        socialLinks: {
          ...data.socialLinks,
          [socialNetwork]: value,
        },
      })
    } else if (name.startsWith("callToAction.")) {
      const ctaField = name.split(".")[1]
      onFormChange({
        callToAction: {
          ...data.callToAction,
          [ctaField]: value,
        },
      })
    } else {
      onFormChange({ [name]: value })
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, imageType: string) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Image must be less than 5MB",
          variant: "destructive",
        })
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        onFormChange({ [imageType]: result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSectionChange = (index: number, field: keyof NewsletterSection, value: string) => {
    const updatedSections = [...sections]
    updatedSections[index] = {
      ...updatedSections[index],
      [field]: value,
    }
    setSections(updatedSections)
    onFormChange({ sections: updatedSections })
  }

  const handleSectionImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Image must be less than 5MB",
          variant: "destructive",
        })
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        handleSectionChange(index, "image", result)
      }
      reader.readAsDataURL(file)
    }
  }

  const addSection = () => {
    const newSections = [
      ...sections,
      {
        title: "New Section",
        content: "Add your content here.",
        image: "",
      },
    ]
    setSections(newSections)
    onFormChange({ sections: newSections })
  }

  const removeSection = (index: number) => {
    const newSections = sections.filter((_, i) => i !== index)
    setSections(newSections)
    onFormChange({ sections: newSections })
  }

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Header Information</h3>

        <div className="grid gap-2">
          <Label htmlFor="title">Newsletter Title</Label>
          <Input
            id="title"
            name="title"
            value={data.title}
            onChange={handleInputChange}
            placeholder="Monthly Newsletter"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input
            id="subtitle"
            name="subtitle"
            value={data.subtitle}
            onChange={handleInputChange}
            placeholder="Stay updated with our latest news"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="headerImage">Header Image</Label>
          <div className="flex items-center gap-4">
            {data.headerImage && (
              <div className="h-16 w-32 rounded-md border flex items-center justify-center overflow-hidden">
                <img src={data.headerImage || "/placeholder.svg"} alt="Header" className="h-full w-full object-cover" />
              </div>
            )}
            <Input
              id="headerImage"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "headerImage")}
              className="hidden"
            />
            <Button variant="outline" size="sm" onClick={() => document.getElementById("headerImage")?.click()}>
              <Upload className="mr-2 h-4 w-4" /> Upload Header Image
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Company Information</h3>

        <div className="grid gap-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            name="companyName"
            value={data.companyName}
            onChange={handleInputChange}
            placeholder="Your Company"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="companyLogo">Company Logo</Label>
          <div className="flex items-center gap-4">
            {data.companyLogo && (
              <div className="h-16 w-16 rounded-md border flex items-center justify-center overflow-hidden">
                <img src={data.companyLogo || "/placeholder.svg"} alt="Logo" className="h-full w-full object-contain" />
              </div>
            )}
            <Input
              id="companyLogo"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "companyLogo")}
              className="hidden"
            />
            <Button variant="outline" size="sm" onClick={() => document.getElementById("companyLogo")?.click()}>
              <Upload className="mr-2 h-4 w-4" /> Upload Logo
            </Button>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="date">Newsletter Date</Label>
          <Input id="date" name="date" value={data.date} onChange={handleInputChange} placeholder="June 2024" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Content</h3>

        <div className="grid gap-2">
          <Label htmlFor="greeting">Greeting</Label>
          <Input
            id="greeting"
            name="greeting"
            value={data.greeting}
            onChange={handleInputChange}
            placeholder="Hello subscribers,"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="mainContent">Main Content</Label>
          <Textarea
            id="mainContent"
            name="mainContent"
            value={data.mainContent}
            onChange={handleInputChange}
            placeholder="Welcome to our monthly newsletter!"
            rows={4}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Sections</h3>
          <Button variant="outline" size="sm" onClick={addSection}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Section
          </Button>
        </div>

        {sections.map((section, index) => (
          <div key={index} className="border rounded-md p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Section {index + 1}</h4>
              <Button variant="ghost" size="sm" onClick={() => removeSection(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-2">
              <Label htmlFor={`section-title-${index}`}>Section Title</Label>
              <Input
                id={`section-title-${index}`}
                value={section.title}
                onChange={(e) => handleSectionChange(index, "title", e.target.value)}
                placeholder="Section Title"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor={`section-content-${index}`}>Section Content</Label>
              <Textarea
                id={`section-content-${index}`}
                value={section.content}
                onChange={(e) => handleSectionChange(index, "content", e.target.value)}
                placeholder="Section content goes here..."
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor={`section-image-${index}`}>Section Image</Label>
              <div className="flex items-center gap-4">
                {section.image && (
                  <div className="h-16 w-32 rounded-md border flex items-center justify-center overflow-hidden">
                    <img
                      src={section.image || "/placeholder.svg"}
                      alt={`Section ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <Input
                  id={`section-image-${index}`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleSectionImageUpload(e, index)}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById(`section-image-${index}`)?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" /> Upload Image
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Call to Action</h3>

        <div className="grid gap-2">
          <Label htmlFor="cta-text">Button Text</Label>
          <Input
            id="cta-text"
            name="callToAction.text"
            value={data.callToAction.text}
            onChange={handleInputChange}
            placeholder="Visit Our Website"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="cta-url">Button URL</Label>
          <Input
            id="cta-url"
            name="callToAction.url"
            value={data.callToAction.url}
            onChange={handleInputChange}
            placeholder="https://example.com"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Footer</h3>

        <div className="grid gap-2">
          <Label htmlFor="footerText">Footer Text</Label>
          <Textarea
            id="footerText"
            name="footerText"
            value={data.footerText}
            onChange={handleInputChange}
            placeholder="Thank you for subscribing to our newsletter."
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label>Social Media Links</Label>

          <div className="grid gap-2">
            <Label htmlFor="facebook" className="text-sm">
              Facebook
            </Label>
            <Input
              id="facebook"
              name="socialLinks.facebook"
              value={data.socialLinks.facebook}
              onChange={handleInputChange}
              placeholder="https://facebook.com/yourcompany"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="twitter" className="text-sm">
              Twitter
            </Label>
            <Input
              id="twitter"
              name="socialLinks.twitter"
              value={data.socialLinks.twitter}
              onChange={handleInputChange}
              placeholder="https://twitter.com/yourcompany"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="instagram" className="text-sm">
              Instagram
            </Label>
            <Input
              id="instagram"
              name="socialLinks.instagram"
              value={data.socialLinks.instagram}
              onChange={handleInputChange}
              placeholder="https://instagram.com/yourcompany"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="linkedin" className="text-sm">
              LinkedIn
            </Label>
            <Input
              id="linkedin"
              name="socialLinks.linkedin"
              value={data.socialLinks.linkedin}
              onChange={handleInputChange}
              placeholder="https://linkedin.com/company/yourcompany"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

