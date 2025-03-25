import Link from "next/link"

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t py-6">
      <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {currentYear} InvoiceFreeTool. All rights reserved.
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
  )
}

