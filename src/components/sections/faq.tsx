import { ExternalLink } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Reveal } from "@/components/reveal"
import { formatINR, getPackage, siteConfig, whatsappLink } from "@/lib/site-config"

export function Faq() {
  const { offer, links } = siteConfig
  const three = getPackage("three")
  const five = getPackage("five")

  const items = [
    {
      q: "What's the difference between the 5-session and 3-session packages?",
      a: `The 5-session package is ${formatINR(five.offerPrice)} (${five.discountPercent}% off the regular ${formatINR(five.regularPrice)}). The 3-session package is ${formatINR(three.offerPrice)} (${three.discountPercent}% off the regular ${formatINR(three.regularPrice)}). Both include the same e-books, handouts, self-care worksheet and wellness tracker.`,
    },
    {
      q: "How long are the sessions, and how soon must I use them?",
      a: `Each session is ${offer.sessionLength}. All sessions in your package must be completed within ${offer.completionWeeks} weeks of your first session, and we'll help you plan the schedule.`,
    },
    {
      q: "Can I gift this package to someone?",
      a: "Yes. Choose “As a gift” when you book and we'll arrange a personalised digital gift card for them. Therapy is a personal choice, so the recipient's consent is essential. Please check that they'd welcome it.",
    },
    {
      q: "How do I pay, and when is my package confirmed?",
      a: "Scan the QR code in the booking form with any UPI app and upload your payment screenshot. We confirm your package once the payment is received.",
    },
    {
      q: "Is therapy an emergency service?",
      a: "No. If you or someone you know is in immediate danger or crisis, please contact your local emergency services, or call Tele-MANAS (the national mental health helpline) at 14416.",
    },
  ]

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="scroll-mt-16 bg-secondary/50 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-primary">Good to know</p>
          <h2 id="faq-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Questions, answered
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-10">
          <Accordion type="single" collapsible className="rounded-2xl border border-border bg-card px-5">
            {items.map((item, index) => (
              <AccordionItem key={item.q} value={`item-${index}`} className="last:border-b-0">
                <AccordionTrigger className="py-5 text-left text-base font-medium">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        <Reveal delay={150} className="mt-8 flex flex-col items-center gap-2 text-center text-sm text-muted-foreground">
          <p>
            Still have a question?{" "}
            <a
              href={whatsappLink("Hi! I have a question about the Diwali package.")}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Ask us on WhatsApp
            </a>
          </p>
          <a
            href={links.tealfeedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-primary underline-offset-4 hover:underline"
          >
            Explore Mukalp Healing on Tealfeed
            <ExternalLink className="size-3.5" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
