import { ExternalLink, Gift, HeartHandshake, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBooking } from "@/components/booking/booking-provider"
import { Diya, Sparkles } from "@/components/diwali/decor"
import {
  WHATSAPP_BOOK_TEXT,
  formatINR,
  getPackage,
  savings,
  siteConfig,
  whatsappLink,
} from "@/lib/site-config"

export function FinalCta() {
  const { openBooking } = useBooking()
  const five = getPackage("five")
  const { links } = siteConfig

  return (
    <section className="night-sky relative isolate overflow-hidden py-20 text-night-foreground sm:py-28">
      <Sparkles count={14} />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <Diya className="mx-auto mb-5 h-16 w-[4.5rem] animate-bob" />
        <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Light a diya for <span className="text-shimmer">your well-being</span> this Diwali
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-night-foreground/85">
          {five.sessions} therapy sessions for {formatINR(five.offerPrice)}. You save{" "}
          {formatINR(savings(five))}. Only {siteConfig.offer.slotsLeft} package slots available.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            className="h-13 w-full rounded-full bg-gradient-to-r from-saffron to-gold px-9 text-base font-bold text-night hover:opacity-90 sm:w-auto"
            onClick={() => openBooking({ mode: "self" })}
          >
            <HeartHandshake className="size-5" />
            Book Now
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-13 w-full rounded-full border-gold/50 bg-white/5 px-9 text-base text-night-foreground hover:bg-white/15 hover:text-white sm:w-auto"
            onClick={() => openBooking({ mode: "gift" })}
          >
            <Gift className="size-5" />
            Gift this package
          </Button>
        </div>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 text-sm sm:flex-row sm:gap-6">
          <a
            href={whatsappLink(WHATSAPP_BOOK_TEXT)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-night-foreground/85 underline-offset-4 hover:text-gold hover:underline"
          >
            <MessageCircle className="size-4" />
            Prefer to chat? Message us on WhatsApp
          </a>
          <a
            href={links.tealfeedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-night-foreground/85 underline-offset-4 hover:text-gold hover:underline"
          >
            <ExternalLink className="size-4" />
            {links.tealfeedLabel}
          </a>
        </div>
      </div>
    </section>
  )
}
