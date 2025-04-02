import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import { handleError } from "@/lib/error-handler"

export async function exportToPDF(
  element: HTMLElement | null,
  filename: string,
  onStart?: () => void,
  onComplete?: () => void,
  onError?: (error: unknown) => void,
) {
  if (!element) {
    const error = new Error("Element not found")
    onError?.(error)
    return handleError(error, { title: "Export Failed" })
  }

  try {
    onStart?.()

    // Clone the element to avoid modifying the original
    const clone = element.cloneNode(true) as HTMLElement
    clone.style.width = "210mm"
    clone.style.padding = "10mm"
    clone.style.backgroundColor = "white"
    clone.style.position = "absolute"
    clone.style.left = "-9999px"
    clone.style.top = "-9999px"

    // Add to document, render, then remove
    document.body.appendChild(clone)

    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      onclone: (document, element) => {
        // Additional styling for print
        element.style.margin = "0"
        element.style.boxShadow = "none"
      },
    })

    document.body.removeChild(clone)

    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    const imgWidth = 210
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
    pdf.save(filename)

    onComplete?.()
    return true
  } catch (error) {
    onError?.(error)
    return handleError(error, {
      title: "PDF Export Failed",
      fallbackMessage: "Failed to generate PDF. Please try again.",
    })
  }
}

