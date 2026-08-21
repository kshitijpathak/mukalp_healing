import { useEffect, useRef, useState } from "react"
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist"
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url"

GlobalWorkerOptions.workerSrc = workerSrc

type PdfViewerProps = {
  src: string
  title: string
}

export function PdfViewer({ src, title }: PdfViewerProps) {
  const pagesRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")

  useEffect(() => {
    let cancelled = false
    let destroyLoadingTask: (() => Promise<void>) | null = null

    async function renderPdf() {
      try {
        const loadingTask = getDocument({ url: src })
        destroyLoadingTask = () => loadingTask.destroy()
        const pdfDocument = await loadingTask.promise
        const pages = pagesRef.current

        if (!pages || cancelled) return

        pages.replaceChildren()

        for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber += 1) {
          const page = await pdfDocument.getPage(pageNumber)
          const viewport = page.getViewport({ scale: 1.5 })
          const canvas = window.document.createElement("canvas")
          const context = canvas.getContext("2d")

          if (!context || cancelled) return

          canvas.setAttribute("aria-label", `${title}, page ${pageNumber}`)
          canvas.className = "mx-auto block h-auto w-full max-w-4xl rounded-lg bg-white shadow-sm"
          canvas.width = viewport.width
          canvas.height = viewport.height
          pages.appendChild(canvas)

          await page.render({ canvas, canvasContext: context, viewport }).promise
        }

        if (!cancelled) setStatus("ready")
      } catch {
        if (!cancelled) setStatus("error")
      }
    }

    renderPdf()

    return () => {
      cancelled = true
      void destroyLoadingTask?.()
    }
  }, [src, title])

  return (
    <div
      aria-busy={status === "loading"}
      aria-label={title}
      className="space-y-6 bg-muted/30 p-4 sm:p-8"
    >
      <div ref={pagesRef} className="space-y-6" />
      {status === "loading" && (
        <p className="py-16 text-center text-sm text-muted-foreground">
          Loading document…
        </p>
      )}
      {status === "error" && (
        <p className="py-16 text-center text-sm text-muted-foreground">
          This document could not be displayed. Use the button below to open the PDF.
        </p>
      )}
    </div>
  )
}
