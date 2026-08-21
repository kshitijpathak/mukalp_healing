import { CalendarDays, Images, BookOpen, Backpack, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PdfViewer } from "@/components/pdf-viewer"
import { siteConfig, type ContentPiece } from "@/lib/site-config"

const iconMap = {
  itinerary: CalendarDays,
  gallery: Images,
  guide: BookOpen,
  packing: Backpack,
} as const

export function Content() {
  const { content } = siteConfig

  return (
    <section id="content" className="py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.15em] text-primary">
            {content.title}
          </p>
          <h2 className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            {content.subtitle}
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {content.description}
          </p>
        </div>

        <Tabs defaultValue={content.pieces[0].id} className="w-full">
          {/* Tab list - scrollable on mobile */}
          <TabsList
            variant="line"
            className="mx-auto mb-8 flex w-full max-w-md justify-center overflow-x-auto"
          >
            {content.pieces.map((piece: ContentPiece) => {
              const Icon = iconMap[piece.icon]
              return (
                <TabsTrigger
                  key={piece.id}
                  value={piece.id}
                  className="flex-1 gap-2 whitespace-nowrap text-xs sm:text-sm"
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{piece.title}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          {/* Tab content */}
          {content.pieces.map((piece: ContentPiece) => {
            const Icon = iconMap[piece.icon]
            return (
              <TabsContent key={piece.id} value={piece.id}>
                <div className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{piece.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {piece.description}
                      </p>
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm" className="rounded-full shrink-0">
                    <a
                      href={piece.pdfPath}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open PDF
                    </a>
                  </Button>
                </div>

                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-md">
                  <PdfViewer
                    src={piece.pdfPath}
                    title={piece.title}
                  />
                </div>
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </section>
  )
}
