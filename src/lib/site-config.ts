export type PackageId = "five" | "three"

export type OfferPackage = {
  id: PackageId
  name: string
  shortName: string
  sessions: number
  regularPrice: number
  offerPrice: number
  discountPercent: number
  badge?: string
}

const REGULAR_SESSION_PRICE = 2000

// Regular price = sessions x ₹2,000. Offer price applies the Diwali discount.
const fivePackage: OfferPackage = {
  id: "five",
  name: "5-Session Diwali Package",
  shortName: "5 sessions",
  sessions: 5,
  regularPrice: REGULAR_SESSION_PRICE * 5, // ₹10,000
  offerPrice: 8000, // 20% off
  discountPercent: 20,
  badge: "Best value",
}

const threePackage: OfferPackage = {
  id: "three",
  name: "3-Session Diwali Package",
  shortName: "3 sessions",
  sessions: 3,
  regularPrice: REGULAR_SESSION_PRICE * 3, // ₹6,000
  offerPrice: 5400, // 10% off
  discountPercent: 10,
}

export const siteConfig = {
  brand: {
    name: "Mukalp Healing Space",
    logo: "/Namita_Logos_2.png",
  },

  nav: [
    { label: "The Offer", href: "/#offer" },
    { label: "Meet Namita", href: "/#therapist" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "Blog", href: "/blog" },
  ],

  contact: {
    whatsappNumber: "919828546300",
  },

  links: {
    tealfeedUrl: "https://mukalphealing.tealfeed.in/",
    tealfeedLabel: "Visit Mukalp Healing on Tealfeed",
  },

  /**
   * Payment + booking submission settings.
   *
   * - upiId: optional. When set, mobile users also get a "Pay with UPI app"
   *   button and a copy-able UPI ID (they can't scan a QR on their own phone).
   * - bookingEndpoint: set VITE_BOOKING_ENDPOINT to a form backend that
   *   accepts a multipart POST (Formspree, Web3Forms, your own API...).
   *   When empty, the form finishes by sending the details to WhatsApp.
   */
  payment: {
    payeeName: "Mukalp Healing Space",
    upiId: "",
    // Tap-to-pay link shown as the primary payment option in the booking form.
    payLink: "https://upi.pe/namitadhariwal8@okhdfcbank?pn=Namita+Dhariwal",
  },
  bookingEndpoint: (import.meta.env.VITE_BOOKING_ENDPOINT as string | undefined) ?? "",

  offer: {
    title: "Make Space This Diwali",
    sessionLength: "50–60 minutes",
    completionWeeks: 7,
    regularSessionPrice: REGULAR_SESSION_PRICE,
    slotsTotal: 5,
    // Update this number as slots are taken: it drives the glowing diyas on the page.
    slotsLeft: 5,
    packages: [fivePackage, threePackage] as OfferPackage[],
    inclusions: [
      {
        id: "ebooks",
        title: "Mental wellness e-books",
        description: "Gentle reading to keep the reflection going between sessions.",
      },
      {
        id: "handouts",
        title: "Well-being handouts",
        description: "Complimentary, practical handouts you can return to any time.",
      },
      {
        id: "worksheet",
        title: "Self-care worksheet",
        description: "A guided page to map what you need and what you can put down.",
      },
      {
        id: "tracker",
        title: "Personal wellness tracker",
        description: "A simple way to notice your patterns and celebrate small shifts.",
      },
    ],
  },
} as const

export function getPackage(id: PackageId): OfferPackage {
  return id === "five" ? fivePackage : threePackage
}

export function savings(pkg: OfferPackage): number {
  return pkg.regularPrice - pkg.offerPrice
}

export function perSession(pkg: OfferPackage): number {
  return Math.round(pkg.offerPrice / pkg.sessions)
}

export function formatINR(amount: number): string {
  return `₹${new Intl.NumberFormat("en-IN").format(amount)}`
}

export function whatsappLink(text?: string): string {
  const base = `https://wa.me/${siteConfig.contact.whatsappNumber}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

export const WHATSAPP_BOOK_TEXT = "I'd like to book"
export const WHATSAPP_GIFT_TEXT = "I'd like to gift this package"

export type SiteConfig = typeof siteConfig
