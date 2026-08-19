import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/sections/hero"
import { Retreat } from "@/components/sections/retreat"
import { Itinerary } from "@/components/sections/itinerary"
import { FinalCta } from "@/components/sections/final-cta"

function App() {
  return (
    <div className="min-h-svh bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <Retreat />
        <Itinerary />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
