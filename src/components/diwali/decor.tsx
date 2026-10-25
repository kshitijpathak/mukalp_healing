import { cn } from "@/lib/utils"

/** A clay diya. When lit, the flame flickers and glows. */
export function Diya({ lit = true, className }: { lit?: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 64 56"
      className={cn(lit && "diya-glow", className)}
      aria-hidden="true"
      focusable="false"
    >
      {lit && (
        <g className="animate-flicker">
          <path
            d="M32 2c-3 8-10 12-10 20 0 6 4.5 9.5 10 9.5s10-3.5 10-9.5C42 14 35 10 32 2z"
            className="fill-saffron"
          />
          <path
            d="M32 11c-2 5-6 8-6 13 0 4 2.7 6.5 6 6.5s6-2.5 6-6.5c0-5-4-8-6-13z"
            className="fill-gold"
          />
          <path
            d="M32 19c-1 3-3 4.5-3 7 0 2 1.3 3.5 3 3.5s3-1.5 3-3.5c0-2.5-2-4-3-7z"
            fill="#fff7dc"
          />
        </g>
      )}
      <rect x="30.5" y="29" width="3" height="5" rx="1.5" fill={lit ? "#3a2418" : "#6b5444"} />
      <path
        d="M4 34c0-2 12-4 28-4s28 2 28 4c0 12-12 20-28 20S4 46 4 34z"
        className="fill-[oklch(0.5_0.13_45)]"
      />
      <path
        d="M4 34c0-2 12-4 28-4s28 2 28 4c0 1-12 3-28 3S4 35 4 34z"
        className="fill-[oklch(0.63_0.14_52)]"
      />
      <path
        d="M14 42c6 5 30 5 36 0"
        className="fill-none stroke-gold"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="32" cy="46.5" r="1.8" className="fill-gold" />
    </svg>
  )
}

/** Concentric rangoli mandala. Pair with `animate-spin-slow` for a slow turn. */
export function Rangoli({ className }: { className?: string }) {
  const petals = Array.from({ length: 12 })
  return (
    <svg viewBox="-100 -100 200 200" className={className} aria-hidden="true" focusable="false">
      <g className="fill-none stroke-gold">
        <circle r="97" strokeWidth="1" strokeDasharray="2 5" opacity="0.8" />
        <circle r="64" strokeWidth="1" opacity="0.6" />
      </g>
      {petals.map((_, i) => (
        <ellipse
          key={`o${i}`}
          cx="0"
          cy="-80"
          rx="9"
          ry="18"
          transform={`rotate(${i * 30})`}
          className={i % 2 ? "fill-saffron/75" : "fill-rose/65"}
        />
      ))}
      {petals.map((_, i) => (
        <ellipse
          key={`i${i}`}
          cx="0"
          cy="-47"
          rx="6"
          ry="14"
          transform={`rotate(${i * 30 + 15})`}
          className={i % 2 ? "fill-gold/80" : "fill-cream/70"}
        />
      ))}
      <circle r="22" className="fill-gold/85" />
      <circle r="13" className="fill-saffron" />
      <circle r="5" className="fill-rose" />
    </svg>
  )
}

function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path d="M12 0l2 9.2L24 12l-10 2.8L12 24l-2-9.2L0 12l10-2.8z" />
    </svg>
  )
}

/** Twinkling four-point sparkles scattered on a positioned parent. */
export function Sparkles({ count = 14, className }: { count?: number; className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => {
        const size = 8 + ((i * 7) % 12)
        return (
          <span
            key={i}
            className="absolute animate-twinkle"
            style={{
              left: `${(i * 37 + 11) % 97}%`,
              top: `${(i * 61 + 7) % 93}%`,
              width: size,
              height: size,
              animationDelay: `${((i * 0.37) % 3).toFixed(2)}s`,
              animationDuration: `${2.6 + ((i * 0.23) % 2)}s`,
            }}
          >
            <Star
              className={cn(
                "h-full w-full",
                i % 3 === 0 ? "fill-gold" : i % 3 === 1 ? "fill-saffron" : "fill-cream"
              )}
            />
          </span>
        )
      })}
    </div>
  )
}

/** Sky lanterns that drift upward. */
export function FloatingLanterns({ count = 7, className }: { count?: number; className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute bottom-[-8%] block animate-float-up"
          style={{
            left: `${(i * 19 + 6) % 92}%`,
            animationDuration: `${15 + ((i * 3) % 9)}s`,
            animationDelay: `-${(i * 2.7).toFixed(1)}s`,
          }}
        >
          <span
            className="block rounded-[45%_45%_38%_38%] bg-gradient-to-b from-gold to-saffron"
            style={{
              width: 12 + ((i * 5) % 9),
              height: 18 + ((i * 7) % 11),
              boxShadow: "0 0 18px 4px oklch(0.8 0.17 70 / 0.55)",
            }}
          />
        </span>
      ))}
    </div>
  )
}

/** A swinging marigold toran (garland) along the top edge. */
export function Toran({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-x-0 top-0 flex justify-between px-2", className)}
      aria-hidden="true"
    >
      {Array.from({ length: 16 }).map((_, i) => (
        <div
          key={i}
          className={cn("animate-swing flex-col items-center", i % 2 ? "hidden sm:flex" : "flex")}
          style={{ animationDelay: `-${(i * 0.45).toFixed(2)}s` }}
        >
          <span className="block w-px bg-gold/60" style={{ height: 14 + ((i * 9) % 26) }} />
          <span
            className={cn(
              "block size-3 rounded-full shadow-[0_0_8px_oklch(0.8_0.17_70/0.7)]",
              i % 3 === 0 ? "bg-saffron" : i % 3 === 1 ? "bg-gold" : "bg-rose"
            )}
          />
        </div>
      ))}
    </div>
  )
}

/** Soft breathing circle with the cue text swapping every half-cycle. */
export function BreathingOrb({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex size-28 items-center justify-center", className)}>
      <span className="absolute inset-0 animate-breathe rounded-full bg-gold/25 blur-md" aria-hidden="true" />
      <span
        className="absolute inset-3 animate-breathe rounded-full border border-gold/60 bg-gold/15"
        aria-hidden="true"
      />
      <span className="relative text-center text-xs font-medium leading-tight text-foreground">
        <span className="absolute inset-0 flex items-center justify-center animate-swap-in">
          Breathe in
        </span>
        <span className="absolute inset-0 flex items-center justify-center animate-swap-out">
          Breathe out
        </span>
        <span className="invisible">Breathe out</span>
      </span>
    </div>
  )
}

/** Row of diyas showing how many package slots remain. */
export function SlotDiyas({
  total,
  left,
  className,
  tone = "dark",
}: {
  total: number
  left: number
  className?: string
  tone?: "dark" | "light"
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex items-end gap-1" aria-hidden="true">
        {Array.from({ length: total }).map((_, i) => (
          <Diya key={i} lit={i < left} className="h-9 w-10" />
        ))}
      </div>
      <p className={cn("text-sm font-medium", tone === "dark" ? "text-night-foreground/90" : "text-foreground")}>
        Only {left} package {left === 1 ? "slot" : "slots"} available
      </p>
    </div>
  )
}
