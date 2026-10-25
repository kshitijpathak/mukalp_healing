import { useBooking } from "@/components/booking/booking-provider"
import { Diya } from "@/components/diwali/decor"
import { cn } from "@/lib/utils"

/** Always-visible Book Now pill: bottom-centre on phones, bottom-right on larger screens. */
export function FloatingBookButton() {
  const { openBooking, isOpen } = useBooking()

  return (
    <div
      className={cn(
        "fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 transition-all duration-300 sm:right-6",
        isOpen && "pointer-events-none translate-y-6 opacity-0"
      )}
    >
      <button
        type="button"
        onClick={() => openBooking()}
        aria-label="Book now: Diwali therapy package"
        className="group flex h-12 animate-pulse-ring items-center gap-2 rounded-full border border-gold/70 bg-gradient-to-r from-saffron to-gold py-1.5 pl-1.5 pr-5 text-night sm:h-13 sm:gap-2.5 sm:py-2 sm:pl-3 sm:pr-6 shadow-[0_8px_30px_oklch(0.2_0.05_215/0.45)] transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold/60"
      >
        <span className="flex size-9 items-center justify-center rounded-full bg-night sm:size-10">
          <Diya className="h-7 w-8" />
        </span>
        <span className="whitespace-nowrap text-left leading-tight">
          <span className="block text-base font-bold">Book Now</span>
          <span className="hidden text-[0.7rem] font-medium opacity-80 sm:block">Diwali offer · 5 slots</span>
        </span>
      </button>
    </div>
  )
}
