import { ExternalLink, HeartHandshake } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBooking } from "@/components/booking/booking-provider"
import { Diya, Rangoli, Sparkles } from "@/components/diwali/decor"
import { Reveal } from "@/components/reveal"
import { siteConfig } from "@/lib/site-config"

export function Therapist() {
  const { openBooking } = useBooking()

  return (
    <section
      id="therapist"
      aria-labelledby="therapist-title"
      className="relative scroll-mt-16 overflow-hidden bg-secondary/60 py-20 sm:py-28"
    >
      <Sparkles count={10} className="opacity-70" />
      <div className="relative mx-auto grid max-w-5xl items-center gap-12 px-4 sm:px-6 md:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <Reveal className="relative mx-auto w-full max-w-sm">
          <Rangoli className="absolute -left-10 -top-10 -z-10 size-56 animate-spin-slow opacity-60" />
          <div className="relative overflow-hidden rounded-[2rem] border-4 border-gold/70 bg-night shadow-[0_20px_60px_-20px_oklch(0.3_0.06_210/0.6)]">
            <img
              src="/images/about/namita-diwali.webp"
              alt="Namita Dhariwal, counselling psychologist, smiling with a waterfall behind her"
              width={900}
              height={974}
              className="aspect-[4/5] w-full object-cover object-[50%_20%]"
              loading="lazy"
            />
          </div>
          <Diya className="absolute -bottom-4 -right-4 h-14 w-16 animate-bob" />
        </Reveal>

        <Reveal delay={120}>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-primary">
            Meet your therapist
          </p>
          <h2 id="therapist-title" className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Namita Dhariwal
          </h2>
          <p className="mt-2 text-base font-medium text-primary">
            Counselling Psychologist &amp; Certified Art-Based Therapist
          </p>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Namita blends psychological insight with creative expression to help people reconnect with
            their inner world, navigate life’s challenges, and rediscover their strengths.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Her work is rooted in creating a safe space where healing, self-exploration, and personal
            growth can unfold naturally.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-12 rounded-full bg-gradient-to-r from-saffron to-gold px-7 text-base font-bold text-night hover:opacity-90"
              onClick={() => openBooking()}
            >
              <HeartHandshake className="size-5" />
              Book Now
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full px-7 text-base">
              <a href={siteConfig.links.tealfeedUrl} target="_blank" rel="noopener noreferrer">
                Know more on Tealfeed
                <ExternalLink className="size-4" />
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
