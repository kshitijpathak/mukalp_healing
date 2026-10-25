import { useState, type CSSProperties } from "react"
import { Sparkles as SparklesIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBooking } from "@/components/booking/booking-provider"
import { BreathingOrb, Diya } from "@/components/diwali/decor"
import { Reveal } from "@/components/reveal"
import { cn } from "@/lib/utils"

const burstDirections = [
  [-34, -30],
  [0, -42],
  [34, -30],
  [-44, 0],
  [44, 0],
  [-26, 24],
  [26, 24],
] as const

const burdens = [
  {
    id: "guilt",
    label: "Guilt",
    line: "Woh guilt jo hum jaane nahi dete.",
  },
  {
    id: "expectations",
    label: "Expectations",
    line: "Woh expectations jo hum khud par daalte rehte hain.",
  },
  {
    id: "patterns",
    label: "Patterns",
    line: "Woh patterns jo baar-baar humein wahi takleef dete hain.",
  },
  {
    id: "feelings",
    label: "Postponed feelings",
    line: "Aur woh feelings jinhe hum ‘baad mein dekhenge’ kehkar taal dete hain.",
  },
] as const

/**
 * "Diwali ki safai" for the inner world. Tapping a card lights its diya, as a
 * small ritual of letting go that mirrors the idea of making emotional space.
 */
export function ReleaseRitual() {
  const { openBooking } = useBooking()
  const [released, setReleased] = useState<Record<string, number>>({})
  const releasedCount = Object.values(released).filter((n) => n > 0).length
  const allReleased = releasedCount === burdens.length

  const toggle = (id: string) =>
    setReleased((previous) => {
      const current = previous[id] ?? 0
      // Positive values mean "lit"; the magnitude changes each time so the burst replays.
      return { ...previous, [id]: current > 0 ? -(current + 1) : Math.abs(current) + 1 }
    })

  return (
    <section
      id="space"
      aria-labelledby="space-title"
      className="relative scroll-mt-20 overflow-hidden bg-background py-20 sm:py-28"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-primary">
            Diwali ki safai, andar bhi
          </p>
          <h2 id="space-title" className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Diwali ki safai toh hum sab karte hain…
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-serif text-xl italic text-muted-foreground sm:text-2xl">
            par kabhi apne andar ki safai ke baare mein socha hai?
          </p>
        </Reveal>

        <Reveal delay={120} className="mx-auto mt-8 max-w-xl text-center text-lg leading-relaxed text-muted-foreground">
          <p>
            Har saal hum ghar se purani cheezein nikaalte hain, unnecessary samaan hataate hain, aur
            jagah banate hain kuch naye ke liye. <strong className="font-semibold text-foreground">Par apne emotions ka kya?</strong>
          </p>
        </Reveal>

        <Reveal delay={200} className="mt-10 flex flex-col items-center gap-3">
          <BreathingOrb />
          <p className="text-sm text-muted-foreground">Pause for a breath, then light a diya for what you'd like to set down.</p>
        </Reveal>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {burdens.map((burden, index) => {
            const lit = (released[burden.id] ?? 0) > 0
            const burstKey = Math.abs(released[burden.id] ?? 0)
            return (
              <li key={burden.id}>
                <Reveal delay={index * 90}>
                  <button
                    type="button"
                    aria-pressed={lit}
                    onClick={() => toggle(burden.id)}
                    className={cn(
                      "group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border p-4 text-left transition-all duration-500 active:scale-[0.98]",
                      lit
                        ? "border-gold bg-gradient-to-br from-gold/25 to-saffron/10 shadow-[0_0_28px_oklch(0.84_0.15_85/0.35)]"
                        : "border-border bg-card hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-md"
                    )}
                  >
                    <span className="relative flex size-14 shrink-0 items-end justify-center">
                      <Diya lit={lit} className="h-12 w-14" />
                      {lit &&
                        burstDirections.map(([x, y], i) => (
                          <span
                            key={`${burstKey}-${i}`}
                            className="pointer-events-none absolute left-1/2 top-3 size-1.5 animate-burst rounded-full bg-gold"
                            style={{ "--tx": `${x}px`, "--ty": `${y}px` } as CSSProperties}
                            aria-hidden="true"
                          />
                        ))}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-semibold uppercase tracking-wider text-primary">
                        {lit ? "Let go ✓" : burden.label}
                      </span>
                      <span
                        className={cn(
                          "mt-1 block text-[0.95rem] leading-snug transition-colors",
                          lit ? "text-foreground/70" : "text-foreground"
                        )}
                      >
                        {burden.line}
                      </span>
                    </span>
                  </button>
                </Reveal>
              </li>
            )
          })}
        </ul>

        <div className="mt-6 text-center" aria-live="polite">
          <div className="mx-auto h-1.5 max-w-xs overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-saffron to-gold transition-all duration-700"
              style={{ width: `${(releasedCount / burdens.length) * 100}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {allReleased
              ? "Four diyas lit. That felt lighter, didn't it?"
              : `${releasedCount} of ${burdens.length} diyas lit`}
          </p>
        </div>

        <Reveal className="mt-12 rounded-3xl border border-gold/40 bg-gradient-to-br from-cream to-gold/10 p-7 text-center shadow-sm sm:p-10">
          <SparklesIcon className="mx-auto mb-3 size-6 text-saffron" />
          <p className="font-serif text-2xl leading-snug sm:text-3xl">
            Maybe, this Diwali, it's time to make some emotional space for yourself, too.
          </p>
          <p className="mt-3 text-lg text-muted-foreground">
            Not everything needs to be carried into another year.
          </p>
          <Button
            size="lg"
            className={cn(
              "mt-6 h-12 rounded-full bg-gradient-to-r from-saffron to-gold px-8 text-base font-bold text-night hover:opacity-90",
              allReleased && "animate-pulse-ring"
            )}
            onClick={() => openBooking()}
          >
            Make space with therapy
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
