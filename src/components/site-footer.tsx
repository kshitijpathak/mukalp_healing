import { ExternalLink } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

export function SiteFooter() {
  const { brand, finalCta, nav } = siteConfig

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Logo and brand */}
          <div className="flex flex-col items-center gap-3 md:items-start">
            <div className="flex items-center gap-2.5">
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="h-16 w-16 rounded-md object-contain"
              />
              <span className="font-serif text-lg font-semibold tracking-tight">
                {brand.name}
              </span>
            </div>
            <a
              href={finalCta.tealfeedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {finalCta.tealfeedLabel}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Quick links */}
          <nav className="flex flex-col items-center gap-3 md:items-end">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Explore
            </p>
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

        {/* Copyright */}
        <div className="mt-8 border-t border-border pt-6">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
