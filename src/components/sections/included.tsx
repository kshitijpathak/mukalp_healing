import { Activity, BookOpen, ClipboardList, FileText, HeartHandshake } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { siteConfig } from "@/lib/site-config"

const icons = {
  ebooks: BookOpen,
  handouts: FileText,
  worksheet: ClipboardList,
  tracker: Activity,
} as const

export function Included() {
  const { offer } = siteConfig

  return (
    <section
      id="included"
      aria-labelledby="included-title"
      className="scroll-mt-16 bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-primary">
            In every package
          </p>
          <h2 id="included-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            More than sessions: a toolkit for your inner Diwali
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <Reveal className="col-span-2 lg:col-span-4">
            <div className="flex items-center gap-4 rounded-2xl border border-gold/50 bg-gradient-to-r from-gold/20 via-cream to-saffron/15 p-5 sm:gap-5 sm:p-6">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-night text-gold">
                <HeartHandshake className="size-7" />
              </span>
              <div>
                <h3 className="text-xl font-semibold">Individual therapy sessions</h3>
                <p className="mt-1 text-muted-foreground">
                  {offer.sessionLength} each, one-to-one, at a pace that feels right for you.
                </p>
              </div>
            </div>
          </Reveal>

          {offer.inclusions.map((item, index) => {
            const Icon = icons[item.id as keyof typeof icons]
            return (
              <Reveal key={item.id} delay={(index + 1) * 80}>
                <div className="group h-full rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-lg">
                  <span className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="text-base font-semibold leading-snug sm:text-lg">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
