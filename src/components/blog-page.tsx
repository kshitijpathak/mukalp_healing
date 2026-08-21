import { useState, useEffect } from "react"
import { ArrowLeft, ArrowRight, CalendarDays, Clock, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FinalCta } from "@/components/sections/final-cta"
import { blogPosts, type BlogPost } from "@/lib/blog-posts"

export function BlogPage() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [activeSlug])

  const activePost = blogPosts.find((post) => post.slug === activeSlug) ?? null

  if (activePost) {
    return <BlogArticle post={activePost} onBack={() => setActiveSlug(null)} />
  }

  return (
    <main id="top">
      <section className="flex min-h-[34rem] items-center border-b border-border/60 bg-secondary/30 pt-32 sm:pt-36">
        <div className="mx-auto w-full max-w-5xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Mukalp Healing · Journal
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Reflections for the journey inward
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              A quiet space for thoughts on wellbeing, creativity, and coming back to yourself.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {blogPosts.map((post) => (
              <button
                key={post.slug}
                type="button"
                onClick={() => setActiveSlug(post.slug)}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5 text-primary" />
                    <span>{post.date}</span>
                    <span className="text-border">·</span>
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="mb-3 text-2xl font-semibold leading-tight tracking-tight">
                    {post.title}
                  </h2>
                  <p className="mb-5 flex-1 text-sm leading-7 text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center text-sm font-medium text-primary">
                    Read reflection
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </main>
  )
}

function BlogArticle({ post, onBack }: { post: BlogPost; onBack: () => void }) {
  return (
    <main id="top">
      <section className="border-b border-border/60 bg-secondary/30 pt-32 sm:pt-36">
        <div className="mx-auto max-w-3xl px-4 pb-10 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            className="mb-6 -ml-2 text-muted-foreground hover:text-foreground"
            onClick={onBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            All reflections
          </Button>

          <p className="mb-3 text-sm font-medium uppercase tracking-[0.15em] text-primary">
            {post.category}
          </p>
          <h1 className="mb-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 text-primary" />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-primary" />
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      <article className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 overflow-hidden rounded-2xl border border-border shadow-sm">
            <img
              src={post.image}
              alt={post.imageAlt}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-6 text-base leading-8 text-muted-foreground sm:text-lg">
            {post.body.map((block, index) => (
              <div key={index}>
                {block.heading && (
                  <h2 className="mb-3 mt-8 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    {block.heading}
                  </h2>
                )}
                {block.text && <p>{block.text}</p>}
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-border bg-secondary/40 p-6 sm:p-8">
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.15em] text-primary">
              Take the next gentle step
            </p>
            <p className="mb-5 text-lg leading-relaxed text-foreground">
              You do not have to make the journey alone.
            </p>
            <Button asChild size="lg" className="rounded-full text-base">
              <a href="https://wa.me/919828546300" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                Talk to us
              </a>
            </Button>
          </div>
        </div>
      </article>
    </main>
  )
}
