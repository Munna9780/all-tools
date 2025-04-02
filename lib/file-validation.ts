import { toast } from "@/hooks/use-toast"

type FileValidationOptions = {
  maxSizeInMB?: number
  allowedTypes?: string[]
  allowedExtensions?: string[]
  showToast?: boolean
}

export function validateFile(
  file: File | null,
  options: FileValidationOptions = {},
): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: "No file selected" }
  }

  const { maxSizeInMB = 10, allowedTypes = [], allowedExtensions = [], showToast = true } = options

  // Check file size
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024
  if (file.size > maxSizeInBytes) {
    const error = `File too large. Maximum size is ${maxSizeInMB}MB.`
    if (showToast) {
      toast({
        title: "Invalid file",
        description: error,
        variant: "destructive",
      })
    }
    return { valid: false, error }
  }

  // Check file type and extension
  let isValidType = true

  if (allowedTypes.length > 0) {
    isValidType = allowedTypes.some((type) => {
      // Handle wildcard types like 'image/*'
      if (type.endsWith("/*")) {
        const mainType = type.split("/")[0]
        return file.type.startsWith(`${mainType}/`)
      }
      return file.type === type
    })
  }

  let isValidExtension = true

  if (allowedExtensions.length > 0) {
    const fileName = file.name.toLowerCase()
    isValidExtension = allowedExtensions.some((ext) => fileName.endsWith(ext.startsWith(".") ? ext : `.${ext}`))
  }

  // If both type and extension validations are active, file passes if it meets either criteria
  const isValid =
    (allowedTypes.length === 0 && allowedExtensions.length === 0) ||
    allowedTypes.length === 0 ||
    isValidType ||
    allowedExtensions.length === 0 ||
    isValidExtension

  if (!isValid) {
    const allowedTypesFormatted = allowedTypes.length > 0 ? allowedTypes.map((t) => t.replace("/*", "")).join(", ") : ""

    const allowedExtensionsFormatted =
      allowedExtensions.length > 0
        ? allowedExtensions
            .map((e) => (e.startsWith(".") ? e.substring(1) : e))
            .join(", ")
            .toUpperCase()
        : ""

    const supportedFormats = [
      allowedTypesFormatted && `types: ${allowedTypesFormatted}`,
      allowedExtensionsFormatted && `formats: ${allowedExtensionsFormatted}`,
    ]
      .filter(Boolean)
      .join(", ")

    const error = `Invalid file format. Supported ${supportedFormats}.`

    if (showToast) {
      toast({
        title: "Invalid file",
        description: error,
        variant: "destructive",
      })
    }

    return { valid: false, error }
  }

  return { valid: true }
}

