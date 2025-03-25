import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center">
        <div className="container max-w-md py-24 text-center">
          <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
          <p className="text-muted-foreground mb-8">The page you are looking for doesn't exist or has been moved.</p>
          <Button asChild>
            <Link href="/">Return to home</Link>
          </Button>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

