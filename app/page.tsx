import Link from "next/link"
import { ArrowRight, FileText, FileType, Youtube, LinkIcon, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Free Online Tools for Everyday Tasks
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Boost your productivity with our collection of free, easy-to-use online tools. No sign-up required.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild>
                  <Link href="#tools">
                    Explore Tools <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="tools" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Free Tools</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  All tools are completely free to use, with no registration required.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="flex flex-col items-center justify-center">
                <CardHeader className="text-center">
                  <FileText className="h-12 w-12 mb-2 text-primary" />
                  <CardTitle>Invoice Generator</CardTitle>
                  <CardDescription>Create professional invoices in multiple formats</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p>Generate custom invoices with your logo, customize fields, and export to PDF, Word, or Excel.</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/invoice-generator">
                      Create Invoice <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="flex flex-col items-center justify-center">
                <CardHeader className="text-center">
                  <FileType className="h-12 w-12 mb-2 text-primary" />
                  <CardTitle>File Converter</CardTitle>
                  <CardDescription>Convert files between different formats</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p>
                    Convert PDFs, images, audio, video, documents and archives to different formats quickly and easily.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/file-converter">
                      Convert Files <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="flex flex-col items-center justify-center">
                <CardHeader className="text-center">
                  <Youtube className="h-12 w-12 mb-2 text-primary" />
                  <CardTitle>YouTube Tools</CardTitle>
                  <CardDescription>Download videos and generate transcripts</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p>
                    Download YouTube videos in various qualities and generate accurate transcripts with support for
                    multiple languages.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/youtube-tools">
                      YouTube Tools <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="flex flex-col items-center justify-center">
                <CardHeader className="text-center">
                  <LinkIcon className="h-12 w-12 mb-2 text-primary" />
                  <CardTitle>URL Shortener</CardTitle>
                  <CardDescription>Create short, custom links with tracking</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p>Shorten long URLs, create custom links, and track click statistics with detailed analytics.</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/url-shortener">
                      Shorten URL <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="flex flex-col items-center justify-center">
                <CardHeader className="text-center">
                  <Mail className="h-12 w-12 mb-2 text-primary" />
                  <CardTitle>Newsletter Generator</CardTitle>
                  <CardDescription>Create professional newsletters easily</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p>Generate custom newsletters with templates, customize content, and export to PDF or HTML.</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/newsletter-generator">
                      Create Newsletter <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose Our Tools?</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Our tools are designed with simplicity and efficiency in mind.
                </p>
              </div>
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M12 2v4" />
                      <path d="M12 18v4" />
                      <path d="m4.93 4.93 2.83 2.83" />
                      <path d="m16.24 16.24 2.83 2.83" />
                      <path d="M2 12h4" />
                      <path d="M18 12h4" />
                      <path d="m4.93 19.07 2.83-2.83" />
                      <path d="m16.24 7.76 2.83-2.83" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Fast & Reliable</h3>
                  <p className="text-muted-foreground">Our tools are optimized for speed and reliability.</p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Secure</h3>
                  <p className="text-muted-foreground">Your data never leaves your browser for most operations.</p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Free Forever</h3>
                  <p className="text-muted-foreground">All our tools are completely free to use, no hidden fees.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

