import { useEffect, useRef, useState } from "react"
import {
  ArrowLeft,
  Check,
  Copy,
  Gift,
  Heart,
  ImagePlus,
  Loader2,
  MessageCircle,
  Smartphone,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Diya, Sparkles } from "@/components/diwali/decor"
import {
  MAX_MESSAGE_LENGTH,
  bookingWhatsAppUrl,
  submitBooking,
  validateDetails,
  validateProof,
  type BookingMode,
  type BookingValues,
  type FieldErrors,
  type SubmitResult,
} from "@/lib/booking"
import {
  formatINR,
  getPackage,
  savings,
  siteConfig,
  whatsappLink,
  type PackageId,
} from "@/lib/site-config"
import { cn } from "@/lib/utils"

export type BookingStep = "details" | "payment" | "done"

type FlowProps = {
  values: BookingValues
  onChange: (patch: Partial<BookingValues>) => void
  step: BookingStep
  onStepChange: (step: BookingStep) => void
  result: SubmitResult | null
  onResult: (result: SubmitResult) => void
  onClose: () => void
}

export function BookingFlow(props: FlowProps) {
  const { step } = props
  return (
    <div className="space-y-5 text-left">
      {step !== "done" && <Stepper step={step} />}
      {step === "details" && <DetailsStep {...props} />}
      {step === "payment" && <PaymentStep {...props} />}
      {step === "done" && <DoneStep {...props} />}
    </div>
  )
}

function Stepper({ step }: { step: BookingStep }) {
  const items = [
    { id: "details", label: "Your details" },
    { id: "payment", label: "Pay & confirm" },
  ] as const
  const activeIndex = step === "details" ? 0 : 1
  return (
    <ol className="flex items-center gap-2" aria-label="Booking progress">
      {items.map((item, index) => {
        const done = index < activeIndex
        const active = index === activeIndex
        return (
          <li key={item.id} className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                done || active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              )}
            >
              {done ? <Check className="size-3.5" /> : index + 1}
            </span>
            <span
              className={cn(
                "text-sm font-medium",
                active ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {item.label}
            </span>
            {index === 0 && <span className="h-px flex-1 bg-border" aria-hidden="true" />}
          </li>
        )
      })}
    </ol>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-destructive">
      {message}
    </p>
  )
}

function scrollToFirstError() {
  requestAnimationFrame(() => {
    document
      .querySelector<HTMLElement>('[aria-invalid="true"]')
      ?.scrollIntoView({ block: "center", behavior: "smooth" })
  })
}

/* ---------------------------------- Step 1 --------------------------------- */

function DetailsStep({ values, onChange, onStepChange }: FlowProps) {
  const [errors, setErrors] = useState<FieldErrors>({})
  const isGift = values.mode === "gift"

  const handleContinue = () => {
    const found = validateDetails(values)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      scrollToFirstError()
      return
    }
    onStepChange("payment")
  }

  const clear = (key: keyof BookingValues) =>
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev))

  return (
    <form
      className="space-y-5"
      noValidate
      onSubmit={(event) => {
        event.preventDefault()
        handleContinue()
      }}
    >
      {/* Package */}
      <fieldset>
        <legend className="mb-2 text-sm font-medium">Choose your package</legend>
        <div role="radiogroup" aria-label="Package" className="grid grid-cols-2 gap-3">
          {siteConfig.offer.packages.map((pkg) => {
            const selected = values.packageId === pkg.id
            return (
              <button
                key={pkg.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onChange({ packageId: pkg.id as PackageId })}
                className={cn(
                  "relative rounded-xl border-2 p-3 text-left transition-all",
                  selected
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border bg-card hover:border-primary/40"
                )}
              >
                {selected && (
                  <span className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="size-3" />
                  </span>
                )}
                <span className="block text-sm font-semibold">{pkg.shortName}</span>
                <span className="mt-1 flex items-baseline gap-1.5">
                  <span className="font-serif text-xl font-semibold">{formatINR(pkg.offerPrice)}</span>
                  <span className="text-xs text-muted-foreground line-through">
                    {formatINR(pkg.regularPrice)}
                  </span>
                </span>
                <span className="mt-1 block text-xs font-medium text-primary">
                  Save {formatINR(savings(pkg))} · {pkg.discountPercent}% off
                </span>
              </button>
            )
          })}
        </div>
      </fieldset>

      {/* Mode */}
      <fieldset>
        <legend className="mb-2 text-sm font-medium">Who is this for?</legend>
        <div role="radiogroup" aria-label="Who is this for" className="grid grid-cols-2 gap-2 rounded-xl bg-muted p-1">
          {(
            [
              { id: "self", label: "For myself", Icon: Heart },
              { id: "gift", label: "As a gift", Icon: Gift },
            ] as { id: BookingMode; label: string; Icon: typeof Heart }[]
          ).map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={values.mode === id}
              onClick={() => onChange({ mode: id })}
              className={cn(
                "flex h-10 items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all",
                values.mode === id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Your details */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="bk-name" className="mb-1.5">
            Your name
          </Label>
          <Input
            id="bk-name"
            value={values.name}
            autoComplete="name"
            placeholder="e.g. Aditi Sharma"
            className="h-11 text-base"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "bk-name-error" : undefined}
            onChange={(e) => {
              onChange({ name: e.target.value })
              clear("name")
            }}
          />
          <FieldError id="bk-name-error" message={errors.name} />
        </div>

        <div>
          <Label htmlFor="bk-phone" className="mb-1.5">
            WhatsApp number
          </Label>
          <Input
            id="bk-phone"
            type="tel"
            inputMode="tel"
            value={values.phone}
            autoComplete="tel"
            placeholder="e.g. 98765 43210"
            className="h-11 text-base"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "bk-phone-error" : undefined}
            onChange={(e) => {
              onChange({ phone: e.target.value })
              clear("phone")
            }}
          />
          <FieldError id="bk-phone-error" message={errors.phone} />
        </div>

        {isGift && (
          <div className="space-y-4 rounded-xl border border-gold/50 bg-gold/10 p-4">
            <p className="flex items-center gap-2 text-sm font-medium">
              <Gift className="size-4 text-saffron" />
              Gift details
            </p>
            <div>
              <Label htmlFor="bk-recipient" className="mb-1.5">
                Who are you gifting this to?
              </Label>
              <Input
                id="bk-recipient"
                value={values.recipientName}
                placeholder="Their name"
                className="h-11 bg-background text-base"
                aria-invalid={!!errors.recipientName}
                aria-describedby={errors.recipientName ? "bk-recipient-error" : undefined}
                onChange={(e) => {
                  onChange({ recipientName: e.target.value })
                  clear("recipientName")
                }}
              />
              <FieldError id="bk-recipient-error" message={errors.recipientName} />
            </div>
            <div>
              <Label htmlFor="bk-recipient-contact" className="mb-1.5">
                Their WhatsApp or email <span className="font-normal text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="bk-recipient-contact"
                value={values.recipientContact}
                placeholder="So we can send the digital gift card"
                className="h-11 bg-background text-base"
                onChange={(e) => onChange({ recipientContact: e.target.value })}
              />
            </div>
            <div>
              <div className="flex items-start gap-3">
                <Checkbox
                  id="bk-consent"
                  checked={values.consent}
                  aria-invalid={!!errors.consent}
                  className="mt-0.5"
                  onCheckedChange={(checked) => {
                    onChange({ consent: checked === true })
                    clear("consent")
                  }}
                />
                <Label htmlFor="bk-consent" className="text-sm font-normal leading-snug">
                  Therapy is a personal choice, so their consent matters. I'll make sure they're open
                  to receiving this gift.
                </Label>
              </div>
              <FieldError id="bk-consent-error" message={errors.consent} />
            </div>
          </div>
        )}

        <div>
          <Label htmlFor="bk-message" className="mb-1.5">
            {isGift ? "Special message for the gift card" : "Anything you'd like us to know?"}{" "}
            <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Textarea
            id="bk-message"
            rows={3}
            value={values.message}
            maxLength={MAX_MESSAGE_LENGTH}
            placeholder={
              isGift
                ? "A few warm words for them…"
                : "Preferred days or times, or anything that would help us…"
            }
            className="text-base"
            onChange={(e) => onChange({ message: e.target.value })}
          />
        </div>
      </div>

      <Button type="submit" size="lg" className="h-12 w-full rounded-full text-base">
        Continue to payment
      </Button>
    </form>
  )
}

/* ---------------------------------- Step 2 --------------------------------- */

function PaymentStep({ values, onChange, onStepChange, onResult }: FlowProps) {
  const pkg = getPackage(values.packageId)
  const { payment } = siteConfig
  const fileInput = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [proofError, setProofError] = useState<string | undefined>()
  const [submitting, setSubmitting] = useState(false)
  const [qrSrc, setQrSrc] = useState<string>(payment.qrImage)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!values.paymentProof) {
      setPreviewUrl(null)
      return
    }
    const url = URL.createObjectURL(values.paymentProof)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [values.paymentProof])

  const upiLink = payment.upiId
    ? `upi://pay?pa=${encodeURIComponent(payment.upiId)}&pn=${encodeURIComponent(
        payment.payeeName
      )}&am=${pkg.offerPrice}&cu=INR&tn=${encodeURIComponent(pkg.name)}`
    : null

  const copyUpi = async () => {
    try {
      await navigator.clipboard.writeText(payment.upiId)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard unavailable: the ID is still visible to copy by hand.
    }
  }

  const handleFile = (file: File | undefined) => {
    if (!file) return
    const error = validateProof(file)
    setProofError(error)
    if (!error) onChange({ paymentProof: file })
  }

  const handleSubmit = async () => {
    const error = validateProof(values.paymentProof)
    setProofError(error)
    if (error) return
    setSubmitting(true)
    const result = await submitBooking(values)
    setSubmitting(false)
    onResult(result)
    onStepChange("done")
  }

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-border bg-secondary/50 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Amount to pay
        </p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-serif text-3xl font-semibold">{formatINR(pkg.offerPrice)}</span>
          <span className="text-sm text-muted-foreground line-through">{formatINR(pkg.regularPrice)}</span>
          <span className="rounded-full bg-gold/30 px-2 py-0.5 text-xs font-semibold">
            You save {formatINR(savings(pkg))}
          </span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {pkg.name}
          {values.mode === "gift" && values.recipientName.trim()
            ? ` · gift for ${values.recipientName.trim()}`
            : ""}
        </p>
      </div>

      {/* Pay link */}
      {payment.payLink && (
        <div className="space-y-3 rounded-xl border-2 border-gold/60 bg-gold/10 p-4 text-center">
          <p className="text-sm font-medium">
            Click the link below to pay {formatINR(pkg.offerPrice)} to {payment.payeeName} using any UPI app.
          </p>
          <Button
            asChild
            size="lg"
            className="h-12 w-full rounded-full bg-gradient-to-r from-saffron to-gold text-base font-bold text-night hover:opacity-90"
          >
            <a href={payment.payLink} target="_blank" rel="noopener noreferrer">
              <Smartphone className="size-5" />
              Click here to pay {formatINR(pkg.offerPrice)}
            </a>
          </Button>
          <p className="text-xs text-muted-foreground">
            Please enter {formatINR(pkg.offerPrice)} as the amount. After paying, come back here and
            upload your payment screenshot.
          </p>
        </div>
      )}

      {/* QR */}
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="rounded-2xl border-2 border-gold/60 bg-white p-3 shadow-[0_0_30px_oklch(0.84_0.15_85/0.3)]">
          <img
            src={qrSrc}
            alt={`UPI QR code to pay ${formatINR(pkg.offerPrice)} to ${payment.payeeName}`}
            className="size-52 object-contain"
            onError={() => setQrSrc("/payment-qr-placeholder.svg")}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          {payment.payLink ? "Or scan this QR code" : "Scan with any UPI app"} and pay {formatINR(pkg.offerPrice)}.
        </p>

        {upiLink && (
          <div className="flex w-full flex-col gap-2">
            <Button asChild variant="outline" size="lg" className="h-11 w-full rounded-full">
              <a href={upiLink}>
                <Smartphone className="size-4" />
                Pay with your UPI app
              </a>
            </Button>
            <button
              type="button"
              onClick={copyUpi}
              className="inline-flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              UPI ID: <span className="font-medium text-foreground">{payment.upiId}</span>
              {copied ? <Check className="size-3.5 text-primary" /> : <Copy className="size-3.5" />}
            </button>
          </div>
        )}
        {!upiLink && (
          <p className="text-xs text-muted-foreground">
            Paying from this phone? Screenshot the QR, then choose it from your gallery inside your
            UPI app's scanner.
          </p>
        )}
      </div>

      {/* Upload */}
      <div>
        <Label htmlFor="bk-proof" className="mb-1.5">
          Upload your payment screenshot
        </Label>
        <input
          ref={fileInput}
          id="bk-proof"
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => {
            handleFile(e.target.files?.[0])
            e.target.value = ""
          }}
        />
        {previewUrl && values.paymentProof ? (
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
            <img src={previewUrl} alt="Your payment screenshot" className="size-16 rounded-lg object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{values.paymentProof.name}</p>
              <p className="text-xs text-muted-foreground">
                {(values.paymentProof.size / 1024 / 1024).toFixed(1)} MB
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Remove screenshot"
              onClick={() => onChange({ paymentProof: null })}
            >
              <X className="size-4" />
            </Button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            aria-invalid={!!proofError}
            className={cn(
              "flex h-28 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed text-sm text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground",
              proofError ? "border-destructive" : "border-border"
            )}
          >
            <ImagePlus className="size-6" />
            Tap to choose a screenshot
          </button>
        )}
        <FieldError id="bk-proof-error" message={proofError} />
      </div>

      <div className="space-y-2">
        <Button
          type="button"
          size="lg"
          className="h-12 w-full rounded-full text-base"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            "I've paid · Confirm booking"
          )}
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="w-full"
          onClick={() => onStepChange("details")}
          disabled={submitting}
        >
          <ArrowLeft className="size-4" />
          Edit my details
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Need help paying?{" "}
          <a
            href={whatsappLink("Hi! I need help booking the Diwali package.")}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Message us on WhatsApp
          </a>
        </p>
      </div>
    </div>
  )
}

/* ---------------------------------- Done ---------------------------------- */

function DoneStep({ values, result, onClose }: FlowProps) {
  const firstName = values.name.trim().split(/\s+/)[0] || "there"
  const sent = result?.status === "sent"
  const failed = result?.status === "whatsapp" && result.reason === "failed"

  return (
    <div className="relative space-y-5 overflow-hidden text-center">
      <Sparkles count={10} />
      <div className="relative flex justify-center pt-2">
        <Diya className="h-16 w-[4.5rem] animate-pop" />
      </div>

      {sent ? (
        <div className="relative space-y-2">
          <h3 className="text-2xl font-semibold">Thank you, {firstName}!</h3>
          <p className="text-muted-foreground">
            We've received your booking and payment screenshot. We'll confirm your package once your
            payment is verified.
          </p>
        </div>
      ) : (
        <div className="relative space-y-3">
          <h3 className="text-2xl font-semibold">Almost there, {firstName}!</h3>
          <p className="text-muted-foreground">
            {failed
              ? "We couldn't send your form just now, so let's finish on WhatsApp. "
              : "One last step: "}
            send your details to us on WhatsApp and attach your payment screenshot in the chat.
          </p>
          <Button asChild size="lg" className="h-12 w-full rounded-full text-base">
            <a href={bookingWhatsAppUrl(values)} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-4" />
              Send on WhatsApp
            </a>
          </Button>
        </div>
      )}

      <ul className="relative space-y-2 rounded-xl border border-border bg-secondary/50 p-4 text-left text-sm">
        <li className="flex gap-2">
          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
          We confirm your package once payment is received.
        </li>
        <li className="flex gap-2">
          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
          We coordinate your first session and plan the rest within {siteConfig.offer.completionWeeks}{" "}
          weeks.
        </li>
        <li className="flex gap-2">
          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
          You receive your e-books, handouts, self-care worksheet and wellness tracker.
        </li>
        {values.mode === "gift" && (
          <li className="flex gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
            We'll arrange a personalised digital gift card for {values.recipientName.trim() || "your recipient"}.
          </li>
        )}
      </ul>

      <Button type="button" variant="outline" className="relative w-full rounded-full" onClick={onClose}>
        Close
      </Button>
    </div>
  )
}
