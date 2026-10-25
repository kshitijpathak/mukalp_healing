import { useState } from "react"
import { CalendarClock, Check, Gift, Heart, Sparkles as SparklesIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBooking } from "@/components/booking/booking-provider"
import { Diya, Rangoli, SlotDiyas } from "@/components/diwali/decor"
import { Reveal } from "@/components/reveal"
import type { BookingMode } from "@/lib/booking"
import {
  formatINR,
  perSession,
  savings,
  siteConfig,
  type OfferPackage,
} from "@/lib/site-config"
import { cn } from "@/lib/utils"

export function Offer() {
  const { openBooking } = useBooking()
  const [mode, setMode] = useState<BookingMode>("self")
  const { offer } = siteConfig

  return (
    <section
      id="offer"
      aria-labelledby="offer-title"
      className="relative scroll-mt-16 overflow-hidden bg-cream py-20 sm:py-28"
    >
      <Rangoli className="pointer-events-none absolute -right-32 -top-32 size-80 animate-spin-slow opacity-20" />
      <Rangoli className="pointer-events-none absolute -bottom-40 -left-32 size-96 animate-spin-slow opacity-15 [animation-direction:reverse]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-primary">
            <Diya className="h-5 w-6" />
            Special Diwali pricing
          </p>
          <h2 id="offer-title" className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Choose your package
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Individual therapy sessions of {offer.sessionLength}, plus a small toolkit to carry the
            reflection into everyday life. Regular price is {formatINR(offer.regularSessionPrice)} per
            session.
          </p>
        </Reveal>

        {/* For me / gift */}
        <Reveal delay={100} className="mx-auto mt-8 max-w-sm">
          <div
            role="radiogroup"
            aria-label="Who is the package for"
            className="grid grid-cols-2 gap-1.5 rounded-full border border-border bg-background p-1.5 shadow-sm"
          >
            {(
              [
                { id: "self", label: "For myself", Icon: Heart },
                { id: "gift", label: "As a gift", Icon: Gift },
              ] as { id: BookingMode; label: string; Icon: typeof Heart }[]
            ).map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={mode === id}
                onClick={() => setMode(id)}
                className={cn(
                  "flex h-11 items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all",
                  mode === id
                    ? "bg-gradient-to-r from-saffron to-gold text-night shadow"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="size-4" />
                {label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2 md:items-stretch">
          {offer.packages.map((pkg, index) => (
            <Reveal key={pkg.id} delay={index * 120} className="h-full">
              <PackageCard
                pkg={pkg}
                featured={pkg.id === "five"}
                mode={mode}
                onBook={() => openBooking({ packageId: pkg.id, mode })}
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={150} className="mt-10 flex flex-col items-center gap-5 text-center">
          <SlotDiyas total={offer.slotsTotal} left={offer.slotsLeft} tone="light" />
          <p className="flex max-w-md items-start justify-center gap-2 text-sm text-muted-foreground">
            <CalendarClock className="mt-0.5 size-4 shrink-0 text-primary" />
            All sessions must be completed within {offer.completionWeeks} weeks of the first session.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function PackageCard({
  pkg,
  featured,
  mode,
  onBook,
}: {
  pkg: OfferPackage
  featured: boolean
  mode: BookingMode
  onBook: () => void
}) {
  const { offer } = siteConfig
  const extras = offer.inclusions.map((item) => item.title)

  return (
    <article
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-3xl border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8",
        featured
          ? "border-gold shadow-[0_0_0_1px_var(--gold),0_18px_50px_-18px_oklch(0.74_0.17_55/0.55)]"
          : "border-border"
      )}
    >
      {featured && (
        <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-saffron to-gold px-3 py-1 text-xs font-bold text-night">
          <SparklesIcon className="size-3.5" />
          {pkg.badge}
        </span>
      )}

      <p className="text-sm font-semibold uppercase tracking-wider text-primary">{pkg.shortName}</p>
      <h3 className="mt-1 text-2xl font-semibold tracking-tight">{pkg.name}</h3>

      <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-serif text-5xl font-semibold tracking-tight">{formatINR(pkg.offerPrice)}</span>
        <span className="text-xl text-muted-foreground line-through">{formatINR(pkg.regularPrice)}</span>
      </div>
      <p className="mt-2 flex flex-wrap items-center gap-2 text-sm">
        <span className="rounded-full bg-primary/10 px-2.5 py-1 font-semibold text-primary">
          {pkg.discountPercent}% off
        </span>
        <span className="font-medium">You save {formatINR(savings(pkg))}!</span>
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        That's {formatINR(perSession(pkg))} per session instead of {formatINR(offer.regularSessionPrice)}.
      </p>

      <ul className="mt-6 flex-1 space-y-3 border-t border-border pt-6 text-[0.95rem]">
        <li className="flex gap-3 font-medium">
          <Check className="mt-0.5 size-5 shrink-0 text-saffron" />
          {pkg.sessions} individual therapy sessions ({offer.sessionLength} each)
        </li>
        {extras.map((item) => (
          <li key={item} className="flex gap-3 text-muted-foreground">
            <Check className="mt-0.5 size-5 shrink-0 text-primary" />
            {item}
          </li>
        ))}
      </ul>

      <Button
        size="lg"
        className={cn(
          "mt-7 h-12 w-full rounded-full text-base font-bold",
          featured
            ? "bg-gradient-to-r from-saffron to-gold text-night hover:opacity-90"
            : "bg-primary text-primary-foreground"
        )}
        onClick={onBook}
      >
        {mode === "gift" ? <Gift className="size-5" /> : <Heart className="size-5" />}
        {mode === "gift" ? `Gift ${pkg.shortName}` : `Book ${pkg.shortName}`}
      </Button>
    </article>
  )
}
