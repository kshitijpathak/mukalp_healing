import { CalendarCheck, CreditCard, HandHeart, Library } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBooking } from "@/components/booking/booking-provider"
import { Reveal } from "@/components/reveal"
import { siteConfig } from "@/lib/site-config"

export function HowItWorks() {
  const { openBooking } = useBooking()
  const { offer } = siteConfig

  const steps = [
    {
      title: "Confirm your interest",
      description:
        "Tap Book Now and fill in a short form. You can choose the package for yourself or as a gift.",
      Icon: HandHeart,
    },
    {
      title: "Complete the booking",
      description:
        "Pay by scanning the QR code and upload your payment screenshot. We confirm your package once payment is received.",
      Icon: CreditCard,
    },
    {
      title: "Schedule your sessions",
      description: `We coordinate your first session and plan the remaining sessions within the ${offer.completionWeeks}-week period.`,
      Icon: CalendarCheck,
    },
    {
      title: "Receive your resources",
      description:
        "Your mental wellness e-books, handouts, self-care worksheet and wellness tracker are shared with you.",
      Icon: Library,
    },
  ]

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-title"
      className="scroll-mt-16 bg-background py-20 sm:py-28"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-primary">
            Simple and gentle
          </p>
          <h2 id="how-title" className="text-3xl font-semibold tracking-tight sm:text-5xl">
            How to book your package
          </h2>
        </Reveal>

        <ol className="relative mt-12 space-y-8">
          <span
            className="absolute bottom-4 left-6 top-4 w-px bg-gradient-to-b from-gold via-saffron/60 to-transparent"
            aria-hidden="true"
          />
          {steps.map(({ title, description, Icon }, index) => (
            <li key={title}>
              <Reveal delay={index * 100} className="relative flex gap-5">
                <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-cream text-night shadow-[0_0_18px_oklch(0.84_0.15_85/0.45)]">
                  <Icon className="size-5" />
                  <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-night text-[0.7rem] font-bold text-gold">
                    {index + 1}
                  </span>
                </span>
                <div className="pt-1">
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <p className="mt-1 leading-relaxed text-muted-foreground">{description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-12 text-center">
          <Button
            size="lg"
            className="h-12 rounded-full bg-gradient-to-r from-saffron to-gold px-9 text-base font-bold text-night hover:opacity-90"
            onClick={() => openBooking()}
          >
            Start my booking
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
