export const siteConfig = {
  brand: {
    name: "Mukalp Healing",
    tagline: "Wellness Retreat",
    logo: "/Namita_Logos_2.png",
  },

  nav: [
    { label: "Retreat", href: "#retreat" },
    { label: "Itinerary", href: "#itinerary" },
  ],

  hero: {
    headline: "Your Retreat Journey",
    subheadline:
      "Explore the complete day-by-day itinerary for the upcoming Mukalp Healing wellness retreat.",
    primaryCta: { label: "View Full Itinerary", href: "#itinerary" },
    secondaryCta: { label: "Enquire on WhatsApp", href: "https://wa.me/919828546300" },
  },

  retreat: {
    title: "The Retreat",
    name: "Mukalp Healing Wellness Retreat",
    description:
      "A guided wellness journey designed to help you slow down, reconnect with nature, and restore inner balance. Below is the full itinerary for every day of the retreat.",
    location: "Himalayan Foothills, Uttarakhand",
    dates: "Coming Soon",
    image: "/retreat-location.webp",
    imageAlt: "Mountain retreat lodge surrounded by pine forest and terraced gardens",
    tealfeedLabel: "Learn More About Mukalp Healing",
    tealfeedUrl: "https://mukalphealing.tealfeed.in/",
  },

  itinerary: {
    title: "Trip Itinerary",
    subtitle: "Explore the Full Retreat Itinerary",
    description:
      "Browse the complete day-by-day schedule in the retreat PDF below, or open it in a new tab for a larger view.",
    pdfPath: "/Wellness_Retreat.pdf",
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
