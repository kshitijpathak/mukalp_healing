import { ExternalLink, MessageCircle } from "lucide-react"
import { siteConfig, whatsappLink } from "@/lib/site-config"

export function SiteFooter() {
  const { brand, links, nav } = siteConfig

  return (
    // Extra bottom padding keeps the floating Book Now button clear of the last lines.
    <footer className="border-t border-border bg-card pb-24 sm:pb-10">
      <div className="mx-auto max-w-5xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col items-center gap-3 md:items-start">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-[4.5rem] items-center justify-center overflow-hidden rounded-xl border border-border bg-white">
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="h-full w-full scale-[1.3] object-contain"
                />
              </span>
              <span className="font-serif text-lg font-semibold tracking-tight">{brand.name}</span>
            </div>
            <a
              href={links.tealfeedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {links.tealfeedLabel}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Chat with us on WhatsApp
            </a>
          </div>

          <nav className="flex flex-col items-center gap-3 md:items-end">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Explore</p>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        </div>

        <div className="mt-8 space-y-2 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>
            Therapy is not an emergency service. If you're in crisis, call Tele-MANAS at 14416 or your
            local emergency number.
          </p>
          <p>
            &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
