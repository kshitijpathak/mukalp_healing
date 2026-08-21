import { useEffect, useRef, useState } from "react"

const facilitators = [
  {
    name: "Namita Dhariwal",
    role: "Counselling Psychologist & Certified Art-Based Therapist",
    image: "/images/about/Namita_Dhariwal.JPG",
    imageAlt: "Namita Dhariwal beside a waterfall",
    description:
      "Namita blends psychological insight with creative expression to help people reconnect with their inner world, navigate life’s challenges, and rediscover their strengths. Her work is rooted in creating a safe space where healing, self-exploration, and personal growth can unfold naturally.",
  },
  {
    name: "Kshitij Pathak",
    role: "Certified Yoga Teacher & Mindfulness Coach",
    image: "/images/about/Kshitij_Pathak.jpeg",
    imageAlt: "Kshitij Pathak seated beside a lake",
    description:
      "An AI Engineer educated in London, Kshitij returned to India with a passion for bringing ancient Indian practices into modern life. Through yoga, mindfulness, and contemplative practices, he helps people cultivate greater awareness, balance, and a more grounded way of living.",
  },
] as const

export function Facilitators() {
  const facilitatorsRef = useRef<HTMLDivElement>(null)
  const [facilitatorsVisible, setFacilitatorsVisible] = useState(false)

  useEffect(() => {
    const element = facilitatorsRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFacilitatorsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      aria-labelledby="facilitators-title"
      className="bg-muted/20 py-24 sm:py-32"
    >
      <div ref={facilitatorsRef} className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.15em] text-primary">
            The People Behind the Practice
          </p>
          <h2
            id="facilitators-title"
            className="mb-5 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Know Your Facilitators
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Two different paths, brought together by one intention: helping you reconnect with yourself and create space for meaningful change.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {facilitators.map((facilitator, index) => (
            <article
              key={facilitator.name}
              className={`group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-lg ${
                facilitatorsVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              } ${index === 1 ? "delay-150" : ""}`}
            >
              <div className="relative aspect-[5/4] overflow-hidden bg-muted">
                <img
                  src={facilitator.image}
                  alt={facilitator.imageAlt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />
              </div>
              <div className="p-6 sm:p-7">
                <h3 className="text-2xl font-semibold tracking-tight">
                  {facilitator.name}
                </h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-primary">
                  {facilitator.role}
                </p>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {facilitator.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
