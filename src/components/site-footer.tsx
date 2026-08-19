import { ExternalLink } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

export function SiteFooter() {
  const { brand, finalCta } = siteConfig

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Logo and brand */}
          <div className="flex items-center gap-2.5">
            <img
              src={brand.logo}
              alt={`${brand.name} logo`}
              className="h-10 w-10 rounded-full object-contain"
            />
            <span className="font-serif text-lg font-semibold tracking-tight">
              {brand.name}
            </span>
          </div>

          {/* Tealfeed link */}
          <a
            href={finalCta.tealfeedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            {finalCta.tealfeedLabel}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          {/* Copyright */}
          <div className="border-t border-border pt-6 w-full">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
