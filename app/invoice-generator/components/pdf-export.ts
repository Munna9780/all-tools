import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import { handleError } from "@/lib/error-handler"

interface OnCloneParams {
  document: Document;
  element: HTMLElement;
}

export async function exportToPDF(
  element: HTMLElement | null,
  filename: string,
  onStart?: () => void,
  onComplete?: () => void,
  onError?: (error: unknown) => void,
): Promise<boolean | void> {
  if (!element) {
    const error = new Error("Element not found")
    onError?.(error)
    handleError(error, { title: "Export Failed" })
    return false
  }

  try {
    onStart?.()

    // Clone the element to avoid modifying the original
    const clone = element.cloneNode(true) as HTMLElement
    
    // Set proper dimensions for A4 paper
    clone.style.width = "210mm"
    clone.style.minHeight = "297mm"
    clone.style.padding = "20mm"
    clone.style.backgroundColor = "white"
    clone.style.position = "absolute"
    clone.style.left = "-9999px"
    clone.style.top = "-9999px"
    clone.style.margin = "0"
    clone.style.boxShadow = "none"
    clone.style.border = "none"
    clone.style.borderRadius = "0"

    // Add to document, render, then remove
    document.body.appendChild(clone)

    // Wait for images to load
    await Promise.all(
      Array.from(clone.getElementsByTagName("img")).map(
        (img) =>
          new Promise<boolean>((resolve, reject) => {
            if (img.complete) resolve(true)
            img.onload = () => resolve(true)
            img.onerror = reject
          })
      )
    )

    const canvas = await html2canvas(clone, {
      scale: 3, // Increased for better quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      onclone: ({ document, element }: OnCloneParams) => {
        // Ensure proper styling for print
        element.style.margin = "0"
        element.style.boxShadow = "none"
        element.style.borderRadius = "0"
        element.style.transform = "none"
        
        // Fix font rendering
        const style = document.createElement('style')
        style.textContent = `
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        `
        document.head.appendChild(style)
      },
    })

    document.body.removeChild(clone)

    const imgData = canvas.toDataURL("image/png", 1.0)
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    })

    const imgWidth = 210 // A4 width in mm
    const pageHeight = 297 // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    // Handle multi-page if content is longer than A4
    let heightLeft = imgHeight
    let position = 0

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    pdf.save(filename)

    onComplete?.()
    return true
  } catch (error) {
    onError?.(error)
    handleError(error, {
      title: "PDF Export Failed",
      fallbackMessage: "Failed to generate PDF. Please try again.",
    })
    return false
  }
}
