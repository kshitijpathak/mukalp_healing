import { ExternalLink, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site-config"

export function Retreat() {
  const { retreat } = siteConfig

  return (
    <section id="retreat" className="py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.15em] text-primary">
          {retreat.title}
        </p>
        <h2 className="mb-5 text-3xl font-semibold tracking-tight sm:text-4xl">
          {retreat.name}
        </h2>
        <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
          {retreat.description}
        </p>

        <a
          href={retreat.tealfeedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          {retreat.tealfeedLabel}
          <ExternalLink className="h-4 w-4" />
        </a>

        <div className="mt-8">
          <Button asChild size="lg" className="rounded-full">
            <a href="#itinerary">
              View Full Itinerary
              <ArrowDown className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
