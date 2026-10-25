import { Gift, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBooking } from "@/components/booking/booking-provider"
import { Diya, FloatingLanterns, Sparkles } from "@/components/diwali/decor"
import { Reveal } from "@/components/reveal"
import { WHATSAPP_GIFT_TEXT, whatsappLink } from "@/lib/site-config"

export function Gifting() {
  const { openBooking } = useBooking()

  return (
    <section
      id="gift"
      aria-labelledby="gift-title"
      className="night-sky relative isolate scroll-mt-16 overflow-hidden py-20 text-night-foreground sm:py-28"
    >
      <Sparkles count={16} />
      <FloatingLanterns count={5} />

      <div className="relative mx-auto grid max-w-5xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
        <Reveal className="text-center md:text-left">
          <p className="mb-3 flex items-center justify-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-gold md:justify-start">
            <Gift className="size-4" />
            A different kind of Diwali gift
          </p>
          <h2 id="gift-title" className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Someone you love may be carrying a little too much.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-night-foreground/85">
            Maybe you could gift them something different this Diwali: the space to pause, reflect, and
            work on themselves through therapy.
          </p>
          <p className="mt-4 rounded-2xl border border-gold/30 bg-white/5 p-4 text-left text-sm leading-relaxed text-night-foreground/85">
            <strong className="text-gold">Their choice comes first.</strong> Therapy is a personal
            choice, so the recipient's consent is essential. We'll arrange a personalised digital gift
            card for them.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
            <Button
              size="lg"
              className="h-12 rounded-full bg-gradient-to-r from-saffron to-gold px-8 text-base font-bold text-night hover:opacity-90"
              onClick={() => openBooking({ mode: "gift" })}
            >
              <Gift className="size-5" />
              Gift this package
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-gold/50 bg-white/5 px-8 text-base text-night-foreground hover:bg-white/15 hover:text-white"
            >
              <a href={whatsappLink(WHATSAPP_GIFT_TEXT)} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-5" />
                Ask on WhatsApp
              </a>
            </Button>
          </div>
        </Reveal>

        {/* Digital gift card preview */}
        <Reveal delay={150} className="mx-auto w-full max-w-sm">
          <div className="animate-bob">
            <div className="relative rotate-2 overflow-hidden rounded-3xl border border-gold/60 bg-gradient-to-br from-cream via-white to-gold/30 p-7 text-night shadow-[0_30px_80px_-20px_oklch(0.84_0.15_85/0.55)]">
              <div className="absolute -right-8 -top-8 size-32 rounded-full bg-saffron/25 blur-2xl" aria-hidden="true" />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    Digital gift card
                  </p>
                  <p className="mt-1 font-serif text-2xl font-semibold leading-tight">
                    Make Space
                    <br />
                    This Diwali
                  </p>
                </div>
                <Diya className="h-14 w-16" />
              </div>
              <p className="relative mt-6 font-serif text-lg italic leading-snug text-night/80">
                “A little room to pause, breathe and look after you.”
              </p>
              <div className="relative mt-6 flex items-end justify-between border-t border-night/15 pt-4 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-wider text-night/60">To</p>
                  <p className="font-medium">Someone you care about</p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-wider text-night/60">From</p>
                  <p className="font-medium">You</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
