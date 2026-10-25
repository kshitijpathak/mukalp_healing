import { Gift, HeartHandshake, NotebookPen, Sparkle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBooking } from "@/components/booking/booking-provider"
import {
  Diya,
  FloatingLanterns,
  Rangoli,
  SlotDiyas,
  Sparkles,
  Toran,
} from "@/components/diwali/decor"
import { formatINR, getPackage, savings, siteConfig } from "@/lib/site-config"

export function Hero() {
  const { openBooking } = useBooking()
  const five = getPackage("five")
  const { offer } = siteConfig

  return (
    <section id="top" className="night-sky relative isolate overflow-hidden text-night-foreground">
      <Sparkles count={16} />
      <FloatingLanterns count={7} />
      <Toran />

      <div className="relative mx-auto grid max-w-5xl items-center gap-10 px-4 pb-24 pt-28 sm:px-6 sm:pt-32 md:grid-cols-[1.1fr_0.9fr] md:gap-8 md:pb-28 lg:px-8">
        {/* Copy */}
        <div className="text-center md:text-left">
          <p
            className="mb-4 inline-flex animate-fade-up items-center gap-2 whitespace-nowrap rounded-full border border-gold/40 bg-white/5 px-3 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-gold backdrop-blur-sm sm:px-4 sm:text-xs sm:tracking-[0.18em]"
          >
            <Sparkle className="size-3.5" />
            Diwali offer · Mukalp Healing Space
          </p>

          <h1
            className="animate-fade-up text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.1s" }}
          >
            Make <span className="text-shimmer">Space</span>
            <br />
            This Diwali
          </h1>

          <p
            className="mx-auto mt-5 max-w-md animate-fade-up text-lg leading-relaxed text-night-foreground/85 md:mx-0"
            style={{ animationDelay: "0.2s" }}
          >
            This Diwali, make space for your emotional well-being through therapy, self-reflection, and
            mindful self-care.
          </p>

          {/* Price */}
          <div
            className="mx-auto mt-6 flex max-w-md animate-fade-up flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-2xl border border-gold/30 bg-white/5 px-5 py-4 backdrop-blur-sm md:mx-0 md:justify-start"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="text-left">
              <p className="text-xs uppercase tracking-wider text-night-foreground/70">
                {five.sessions} therapy sessions
              </p>
              <p className="flex items-baseline gap-2">
                <span className="font-serif text-4xl font-semibold text-gold">
                  {formatINR(five.offerPrice)}
                </span>
                <span className="text-lg text-night-foreground/60 line-through">
                  {formatINR(five.regularPrice)}
                </span>
              </p>
            </div>
            <span className="rounded-full bg-gradient-to-r from-saffron to-gold px-3 py-1.5 text-sm font-bold text-night">
              Save {formatINR(savings(five))} · {five.discountPercent}% off
            </span>
          </div>

          {/* CTAs */}
          <div
            className="mt-7 flex animate-fade-up flex-col gap-3 sm:flex-row sm:justify-center md:justify-start"
            style={{ animationDelay: "0.4s" }}
          >
            <Button
              size="lg"
              className="h-13 rounded-full bg-gradient-to-r from-saffron to-gold px-8 text-base font-bold text-night hover:opacity-90"
              onClick={() => openBooking({ mode: "self" })}
            >
              <HeartHandshake className="size-5" />
              Book Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-13 rounded-full border-gold/50 bg-white/5 px-8 text-base text-night-foreground backdrop-blur-sm hover:bg-white/15 hover:text-white"
              onClick={() => openBooking({ mode: "gift" })}
            >
              <Gift className="size-5" />
              Gift this package
            </Button>
          </div>

          <SlotDiyas
            total={offer.slotsTotal}
            left={offer.slotsLeft}
            className="mt-7 hidden md:flex"
          />
        </div>

        {/* Namita */}
        <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-[22rem]">
          <Rangoli className="absolute -inset-10 -z-10 animate-spin-slow opacity-55" />
          <div className="absolute -inset-4 -z-10 animate-glow-breathe rounded-t-full bg-gold/25 blur-2xl" aria-hidden="true" />

          <div className="relative overflow-hidden rounded-t-[999px] rounded-b-3xl border-[5px] border-gold/80 bg-night shadow-[0_0_60px_oklch(0.84_0.15_85/0.35)]">
            <img
              src="/images/about/namita-diwali-sm.webp"
              srcSet="/images/about/namita-diwali-sm.webp 520w, /images/about/namita-diwali.webp 900w"
              sizes="(max-width: 640px) 304px, 352px"
              alt="Namita Dhariwal, counselling psychologist at Mukalp Healing Space, smiling beside a waterfall"
              width={520}
              height={562}
              className="aspect-[4/5] w-full object-cover object-[50%_18%]"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night/85 to-transparent" />
          </div>

          <Diya className="absolute -bottom-3 -left-5 h-12 w-14 animate-bob" />
          <Diya className="absolute -right-5 bottom-10 h-10 w-12 animate-bob [animation-delay:-2s]" />

          <div className="absolute inset-x-3 -bottom-6 rounded-2xl border border-gold/40 bg-night/90 px-4 py-3 text-center shadow-xl backdrop-blur-md">
            <p className="font-serif text-lg font-semibold leading-tight">Namita Dhariwal</p>
            <p className="mt-0.5 flex items-center justify-center gap-1.5 text-xs text-night-foreground/75">
              <NotebookPen className="size-3.5 text-gold" />
              Counselling Psychologist · Art-Based Therapist
            </p>
          </div>
        </div>

        {/* On phones the slot diyas sit under the photo so the photo appears sooner */}
        <SlotDiyas
          total={offer.slotsTotal}
          left={offer.slotsLeft}
          className="mt-4 justify-center md:hidden"
        />
      </div>

      {/* Curve into the next section */}
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-[-1px] h-8 w-full text-background sm:h-12"
        aria-hidden="true"
      >
        <path d="M0 60V28C240 -6 480 -6 720 20s480 24 720-8v48z" fill="currentColor" />
      </svg>
    </section>
  )
}
