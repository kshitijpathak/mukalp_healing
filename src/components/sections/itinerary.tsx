import { CalendarDays, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PdfViewer } from "@/components/pdf-viewer"
import { siteConfig } from "@/lib/site-config"

export function Itinerary() {
  const { itinerary } = siteConfig

  return (
    <section id="itinerary" className="bg-primary/5 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CalendarDays className="h-7 w-7" />
          </div>

          <p className="mb-3 text-sm font-medium uppercase tracking-[0.15em] text-primary">
            {itinerary.title}
          </p>

          <h2 className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            {itinerary.subtitle}
          </h2>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {itinerary.description}
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-md">
          <PdfViewer
            src={itinerary.pdfPath}
            title="Mukalp Healing retreat itinerary PDF"
          />
        </div>

        {/* Open PDF */}
        <div className="mt-6 text-center">
          <Button asChild variant="outline" className="rounded-full">
            <a
              href={itinerary.pdfPath}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Open Itinerary PDF in New Tab
            </a>
          </Button>
        </div>

      </div>
    </section>
  )
}