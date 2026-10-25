import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BookingProvider } from "@/components/booking/booking-provider"
import { FloatingBookButton } from "@/components/booking/floating-book-button"
import { Hero } from "@/components/sections/hero"
import { ReleaseRitual } from "@/components/sections/release-ritual"
import { Offer } from "@/components/sections/offer"
import { Included } from "@/components/sections/included"
import { Therapist } from "@/components/sections/therapist"
import { Gifting } from "@/components/sections/gifting"
import { HowItWorks } from "@/components/sections/how-it-works"
import { Faq } from "@/components/sections/faq"
import { FinalCta } from "@/components/sections/final-cta"
import { BlogPage } from "@/components/blog-page"

function App() {
  const isBlogPage = window.location.pathname.replace(/\/$/, "") === "/blog"

  return (
    <BookingProvider>
      <div className="min-h-svh bg-background">
        <SiteHeader />
        {isBlogPage ? (
          <BlogPage />
        ) : (
          <main>
            <Hero />
            <ReleaseRitual />
            <Offer />
            <Included />
            <Therapist />
            <Gifting />
            <HowItWorks />
            <Faq />
            <FinalCta />
          </main>
        )}
        <SiteFooter />
      </div>
      <FloatingBookButton />
    </BookingProvider>
  )
}

export default App
