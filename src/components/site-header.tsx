import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { useBooking } from "@/components/booking/booking-provider"
import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"

function BrandMark({ className }: { className?: string }) {
  // The logo file has generous white margins, so it is cropped in a rounded tile.
  return (
    <span
      className={cn(
        "flex h-11 w-[4.5rem] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm",
        className
      )}
    >
      <img
        src={siteConfig.brand.logo}
        alt={`${siteConfig.brand.name} logo`}
        className="h-full w-full scale-[1.3] object-contain"
      />
    </span>
  )
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { openBooking } = useBooking()

  const isBlog = window.location.pathname.replace(/\/$/, "").startsWith("/blog")
  // The home page opens on a dark night-sky hero, so the bare header uses light text there.
  const onDark = !isBlog && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/90 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <a
          href="/#top"
          className={cn(
            "flex items-center gap-2.5 transition-colors",
            onDark ? "text-night-foreground" : "text-foreground"
          )}
        >
          <BrandMark />
          <span className="hidden font-serif text-lg font-semibold tracking-tight min-[400px]:block">
            Mukalp Healing Space
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors",
                onDark
                  ? "text-night-foreground/80 hover:text-gold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Button
            size="sm"
            className="rounded-full bg-gradient-to-r from-saffron to-gold font-semibold text-night hover:opacity-90"
            onClick={() => openBooking()}
          >
            Book Now
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn("md:hidden", onDark && "text-night-foreground hover:bg-white/10 hover:text-white")}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background p-0">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex h-full flex-col">
                <div className="flex h-16 items-center justify-between border-b border-border px-4">
                  <div className="flex items-center gap-2.5">
                    <BrandMark className="border border-border" />
                    <span className="font-serif text-base font-semibold">Mukalp Healing Space</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <nav className="flex flex-col gap-1 p-4">
                  {siteConfig.nav.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
                <div className="mt-auto space-y-3 p-4">
                  <Button
                    className="h-12 w-full rounded-full bg-gradient-to-r from-saffron to-gold text-base font-semibold text-night"
                    onClick={() => {
                      setOpen(false)
                      openBooking()
                    }}
                  >
                    Book the Diwali offer
                  </Button>
                  <Button asChild variant="outline" className="w-full rounded-full">
                    <a href={siteConfig.links.tealfeedUrl} target="_blank" rel="noopener noreferrer">
                      {siteConfig.links.tealfeedLabel}
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
