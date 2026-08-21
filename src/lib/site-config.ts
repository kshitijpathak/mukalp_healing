export type ContentPiece = {
  id: string
  title: string
  description: string
  pdfPath: string
  icon: "itinerary" | "gallery" | "guide" | "packing"
}

export const siteConfig = {
  brand: {
    name: "Mukalp Healing",
    tagline: "Wellness Retreat",
    logo: "/Namita_Logos_2.png",
  },

  nav: [
    { label: "About", href: "/#about" },
    { label: "Content", href: "/#content" },
    { label: "Blog", href: "/blog" },
  ],

  hero: {
    eyebrow: "Mukalp Healing · Wellness Retreat",
    headline: "Create Your Way Back to Self",
    subheadline:
      "Discover art-based wellness in the Himalayan foothills, with guided art sessions, yoga, meditation, and spacious moments to reconnect with who you are.",
    primaryCta: { label: "Discover the Experience", href: "#about" },
    secondaryCta: { label: "Enquire on WhatsApp", href: "https://wa.me/919828546300" },
  },

  about: {
    title: "Healing Through Creative Expression",
    description:
      "Mukalp Healing brings art-based wellness into the retreat experience. Through guided art sessions, you are invited to explore what words cannot always express, rediscover your relationship with yourself, and make space for a more honest inner conversation. Yoga, meditation, breathwork, and time in nature gently support the process.",
    image: "/about-wellness.png",
    imageAlt: "A group creating a colorful shared artwork together",
    pillars: [
      {
        title: "Art-Based Wellness",
        description: "Guided creative sessions that turn color, shape, and movement into a language for self-discovery.",
      },
      {
        title: "Yoga & Meditation",
        description: "Grounding practices to reconnect with the body, settle the mind, and create space for reflection.",
      },
      {
        title: "Rediscover Your Relationship with Self",
        description: "A gentle invitation to listen inward, honour your story, and meet yourself with greater compassion.",
      },
    ],
  },

  content: {
    title: "Retreat Content",
    subtitle: "Explore the Full Journey",
    description:
      "Browse the day-by-day itinerary and revisit moments from previous retreats. Each section opens an inline preview, or you can open the full PDF in a new tab.",
    pieces: [
      {
        id: "itinerary",
        title: "Trip Itinerary",
        description:
          "The complete day-by-day schedule for the upcoming Mukalp Healing wellness retreat.",
        pdfPath: "/Wellness_Retreat.pdf",
        icon: "itinerary" as const,
      },
      {
        id: "previous",
        title: "A Glance at Previous Retreats",
        description:
          "A visual carousel of moments from past Mukalp Healing retreats in Kalga.",
        pdfPath: "/KALGA_carousel-compressed.pdf",
        icon: "gallery" as const,
      },
    ] satisfies ContentPiece[],
  },

  finalCta: {
    title: "Ready to Join the Retreat?",
    description:
      "Reach out to learn more or reserve your place. We are happy to answer any questions.",
    primaryCta: { label: "Enquire on WhatsApp", href: "https://wa.me/919828546300" },
    tealfeedLabel: "Visit Mukalp Healing Website",
    tealfeedUrl: "https://mukalphealing.tealfeed.in/",
  },
} as const;

export type SiteConfig = typeof siteConfig;
