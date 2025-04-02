import { toast } from "@/hooks/use-toast"

type ErrorOptions = {
  title?: string
  fallbackMessage?: string
  logToConsole?: boolean
  showToast?: boolean
}

export function handleError(error: unknown, options: ErrorOptions = {}) {
  const {
    title = "Error",
    fallbackMessage = "An unexpected error occurred",
    logToConsole = true,
    showToast = true,
  } = options

  // Extract error message
  let errorMessage = fallbackMessage
  if (error instanceof Error) {
    errorMessage = error.message
  } else if (typeof error === "string") {
    errorMessage = error
  } else if (error && typeof error === "object" && "message" in error && typeof error.message === "string") {
    errorMessage = error.message
  }

  // Log to console if needed
  if (logToConsole) {
    console.error("Error:", error)
  }

  // Show toast if needed
  if (showToast) {
    toast({
      title,
      description: errorMessage,
      variant: "destructive",
    })
  }

  return errorMessage
}

// Utility for async operations with proper error handling
export async function safeAsync<T>(
  asyncFn: () => Promise<T>,
  options: ErrorOptions & { onSuccess?: (data: T) => void } = {},
): Promise<T | null> {
  try {
    const result = await asyncFn()
    options.onSuccess?.(result)
    return result
  } catch (error) {
    handleError(error, options)
    return null
  }
}

