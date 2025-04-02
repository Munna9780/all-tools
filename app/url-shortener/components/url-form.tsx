"use client"

import { useState } from "react"
import { Copy, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export function UrlForm() {
  const { toast } = useToast()
  const [longUrl, setLongUrl] = useState("")
  const [customPath, setCustomPath] = useState("")
  const [enableCustomPath, setEnableCustomPath] = useState(false)
  const [enableTracking, setEnableTracking] = useState(true)
  const [enableExpiration, setEnableExpiration] = useState(false)
  const [expirationDate, setExpirationDate] = useState<Date>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null)

  const validateUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch (err) {
      return false
    }
  }

  const handleSubmit = async () => {
    if (!longUrl) {
      toast({
        title: "URL required",
        description: "Please enter a URL to shorten.",
        variant: "destructive",
      })
      return
    }

    if (!validateUrl(longUrl)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL including http:// or https://",
        variant: "destructive",
      })
      return
    }

    if (enableCustomPath && !customPath) {
      toast({
        title: "Custom path required",
        description: "Please enter a custom path or disable the custom path option.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // In a real application, you would make an API call to create the shortened URL
      // This is a simulated response for demonstration purposes
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Generate a random short code if custom path is not enabled
      const shortCode = enableCustomPath ? customPath : Math.random().toString(36).substring(2, 8)

      // Create the shortened URL
      const shortUrl = `short.url/${shortCode}`

      setShortenedUrl(shortUrl)

      toast({
        title: "URL shortened",
        description: "Your shortened URL has been created successfully.",
      })
    } catch (error) {
      toast({
        title: "Shortening failed",
        description: "Failed to shorten the URL. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const copyToClipboard = () => {
    if (!shortenedUrl) return

    navigator.clipboard.writeText(`https://${shortenedUrl}`)

    toast({
      title: "Copied to clipboard",
      description: "The shortened URL has been copied to your clipboard.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="long-url">Long URL</Label>
        <Input
          id="long-url"
          placeholder="https://example.com/very/long/url/that/needs/shortening"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="custom-path">Custom Path (Optional)</Label>
          <div className="flex items-center space-x-2">
            <Switch
              id="custom-path-switch"
              checked={enableCustomPath}
              onCheckedChange={setEnableCustomPath}
              disabled={isSubmitting}
            />
            <Label htmlFor="custom-path-switch" className="text-sm">
              Enable
            </Label>
          </div>
        </div>
        <div className="flex">
          <div className="bg-muted px-3 py-2 rounded-l-md border-y border-l">short.url/</div>
          <Input
            id="custom-path"
            className="rounded-l-none"
            placeholder="my-custom-link"
            value={customPath}
            onChange={(e) => setCustomPath(e.target.value)}
            disabled={!enableCustomPath || isSubmitting}
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="tracking">Enable Click Tracking</Label>
          <Switch id="tracking" checked={enableTracking} onCheckedChange={setEnableTracking} disabled={isSubmitting} />
        </div>
        <p className="text-sm text-muted-foreground">Track the number of clicks and basic visitor information.</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="expiration">Link Expiration</Label>
          <Switch
            id="expiration"
            checked={enableExpiration}
            onCheckedChange={setEnableExpiration}
            disabled={isSubmitting}
          />
        </div>
        <p className="text-sm text-muted-foreground">Set an expiration date for your shortened link.</p>

        {enableExpiration && (
          <div className="pt-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !expirationDate && "text-muted-foreground",
                  )}
                  disabled={isSubmitting}
                >
                  {expirationDate ? format(expirationDate, "PPP") : <span>Pick an expiration date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={expirationDate}
                  onSelect={setExpirationDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>

      <Button className="w-full" onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? "Shortening URL..." : "Shorten URL"}
      </Button>

      {shortenedUrl && (
        <Card className="mt-6">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label className="mb-2 block">Your Shortened URL</Label>
                <div className="flex">
                  <Input value={`https://${shortenedUrl}`} readOnly className="rounded-r-none" />
                  <Button variant="secondary" className="rounded-l-none" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy to clipboard</span>
                  </Button>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="mr-2 h-4 w-4" /> Copy
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href={`https://${shortenedUrl}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Open
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

