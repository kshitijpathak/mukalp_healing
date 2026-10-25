import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"
import { X } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { BookingFlow, type BookingStep } from "@/components/booking/booking-flow"
import { emptyBooking, type BookingMode, type BookingValues, type SubmitResult } from "@/lib/booking"
import type { PackageId } from "@/lib/site-config"

type OpenOptions = { packageId?: PackageId; mode?: BookingMode }

type BookingContextValue = {
  openBooking: (options?: OpenOptions) => void
  isOpen: boolean
}

const BookingContext = createContext<BookingContextValue | null>(null)

export function useBooking(): BookingContextValue {
  const context = useContext(BookingContext)
  if (!context) throw new Error("useBooking must be used inside <BookingProvider>")
  return context
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState<BookingValues>(emptyBooking)
  const [step, setStep] = useState<BookingStep>("details")
  const [result, setResult] = useState<SubmitResult | null>(null)
  const isMobile = useIsMobile()

  const openBooking = useCallback(
    (options: OpenOptions = {}) => {
      const startFresh = step === "done"
      setValues((previous) => ({
        ...(startFresh ? emptyBooking : previous),
        ...(options.packageId ? { packageId: options.packageId } : {}),
        ...(options.mode ? { mode: options.mode } : {}),
      }))
      if (startFresh) {
        setResult(null)
        setStep("details")
      } else if (step === "payment" && (options.packageId || options.mode)) {
        // A different package or mode was chosen, so re-confirm the details first.
        setStep("details")
      }
      setOpen(true)
    },
    [step]
  )

  const patchValues = useCallback(
    (patch: Partial<BookingValues>) => setValues((previous) => ({ ...previous, ...patch })),
    []
  )

  const close = useCallback(() => setOpen(false), [])

  const contextValue = useMemo(() => ({ openBooking, isOpen: open }), [openBooking, open])

  const sent = result?.status === "sent"
  const title =
    step === "done" ? (sent ? "Booking received" : "One last step") : "Book your Diwali package"
  const description =
    step === "done"
      ? "Here's what happens next."
      : "It takes about a minute. Your slot is confirmed once payment is received."

  const flow = (
    <BookingFlow
      values={values}
      onChange={patchValues}
      step={step}
      onStepChange={setStep}
      result={result}
      onResult={setResult}
      onClose={close}
    />
  )

  return (
    <BookingContext.Provider value={contextValue}>
      {children}

      {isMobile ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[92svh]">
            <DrawerHeader className="relative pb-2">
              <DrawerTitle className="font-serif text-xl">{title}</DrawerTitle>
              <DrawerDescription>{description}</DrawerDescription>
              <DrawerClose
                aria-label="Close"
                className="absolute right-3 top-0 flex size-9 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
              >
                <X className="size-5" />
              </DrawerClose>
            </DrawerHeader>
            <div
              data-vaul-no-drag
              className="overflow-y-auto overscroll-contain px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2"
            >
              {flow}
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-h-[92svh] gap-5 overflow-y-auto sm:max-w-xl">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            {flow}
          </DialogContent>
        </Dialog>
      )}
    </BookingContext.Provider>
  )
}
