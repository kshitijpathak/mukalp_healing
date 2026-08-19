import { MessageCircle, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site-config"

export function FinalCta() {
  const { finalCta } = siteConfig

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-5 text-3xl font-semibold tracking-tight sm:text-4xl">
          {finalCta.title}
        </h2>
        <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
          {finalCta.description}
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Button asChild size="lg" className="rounded-full text-base">
            <a href={finalCta.primaryCta.href} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" />
              {finalCta.primaryCta.label}
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full text-base">
            <a href={finalCta.tealfeedUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              {finalCta.tealfeedLabel}
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
