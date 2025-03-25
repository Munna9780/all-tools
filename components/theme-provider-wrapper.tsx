"use client"

import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { ErrorBoundary } from "react-error-boundary"
import { Button } from "@/components/ui/button"

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
      <p className="mb-4 text-muted-foreground">We apologize for the inconvenience. Please try again later.</p>
      <pre className="text-sm text-red-500 bg-gray-100 p-4 rounded mb-4 max-w-full overflow-auto">{error.message}</pre>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  )
}

export function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </ErrorBoundary>
  )
}

