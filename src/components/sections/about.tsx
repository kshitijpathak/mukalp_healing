import { Palette, Sparkles, Brain } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

const iconMap = {
  "Art-Based Wellness": Palette,
  "Yoga & Meditation": Sparkles,
  "Rediscover Your Relationship with Self": Brain,
} as const

export function About() {
  const { about } = siteConfig
  return (
    <section id="about" className="py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <div className="order-2 overflow-hidden rounded-2xl border border-border shadow-sm md:order-1">
            <img
              src={about.image}
              alt={about.imageAlt}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="order-1 md:order-2">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.15em] text-primary">
              About
            </p>
            <h2 className="mb-5 text-3xl font-semibold tracking-tight sm:text-4xl">
              {about.title}
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              {about.description}
            </p>

            <div className="space-y-5">
              {about.pillars.map((pillar) => {
                const Icon = iconMap[pillar.title as keyof typeof iconMap] ?? Palette
                return (
                  <div key={pillar.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold">{pillar.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
