import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Facilitators } from "@/components/sections/facilitators"
import { Content } from "@/components/sections/content"
import { FinalCta } from "@/components/sections/final-cta"
import { BlogPage } from "@/components/blog-page"

function App() {
  const isBlogPage = window.location.pathname.replace(/\/$/, "") === "/blog"

  return (
    <div className="min-h-svh bg-background">
      <SiteHeader />
      {isBlogPage ? (
        <BlogPage />
      ) : (
        <main>
          <Hero />
          <About />
          <Facilitators />
          <Content />
          <FinalCta />
        </main>
      )}
      <SiteFooter />
    </div>
  )
}

export default App
