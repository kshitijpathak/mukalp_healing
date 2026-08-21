import { ArrowDown, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site-config"

export function Hero() {
  const { hero } = siteConfig

  return (
    <section id="top" className="relative min-h-svh w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/hero-mountains.webp"
          alt="Misty mountain landscape at golden sunrise"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-svh max-w-5xl flex-col justify-center px-4 pt-16 pb-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-4 animate-fade-up text-sm font-medium uppercase tracking-[0.2em] text-white/80">
            {hero.eyebrow}
          </p>
          <h1 className="mb-6 animate-fade-up text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl" style={{ animationDelay: "0.1s" }}>
            {hero.headline}
          </h1>
          <p className="mb-8 max-w-xl animate-fade-up text-lg leading-relaxed text-white/85 sm:text-xl" style={{ animationDelay: "0.2s" }}>
            {hero.subheadline}
          </p>
          <div className="flex flex-col gap-3 animate-fade-up sm:flex-row sm:gap-4" style={{ animationDelay: "0.3s" }}>
            <Button asChild size="lg" className="rounded-full text-base">
              <a href={hero.primaryCta.href}>
                {hero.primaryCta.label}
                <ArrowDown className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/40 bg-white/10 text-base text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
            >
              <a href={hero.secondaryCta.href} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                {hero.secondaryCta.label}
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in" style={{ animationDelay: "0.6s" }}>
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/40 p-1.5">
          <div className="h-2 w-1 rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  )
}
