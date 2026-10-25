import { formatINR, getPackage, siteConfig, whatsappLink, type PackageId } from "@/lib/site-config"

export type BookingMode = "self" | "gift"

export type BookingValues = {
  packageId: PackageId
  mode: BookingMode
  name: string
  phone: string
  recipientName: string
  recipientContact: string
  consent: boolean
  message: string
  paymentProof: File | null
}

export const emptyBooking: BookingValues = {
  packageId: "five",
  mode: "self",
  name: "",
  phone: "",
  recipientName: "",
  recipientContact: "",
  consent: false,
  message: "",
  paymentProof: null,
}

export type FieldErrors = Partial<Record<keyof BookingValues, string>>

export const MAX_MESSAGE_LENGTH = 500
export const MAX_PROOF_MB = 8

export function validateDetails(v: BookingValues): FieldErrors {
  const errors: FieldErrors = {}
  if (v.name.trim().length < 2) errors.name = "Please enter your name"
  const digits = v.phone.replace(/[\s()-]/g, "")
  if (!/^\+?\d{10,15}$/.test(digits)) errors.phone = "Enter a valid mobile number"
  if (v.mode === "gift") {
    if (v.recipientName.trim().length < 2) errors.recipientName = "Who is this gift for?"
    if (!v.consent) errors.consent = "Please confirm the recipient's consent"
  }
  if (v.message.length > MAX_MESSAGE_LENGTH) {
    errors.message = `Please keep this under ${MAX_MESSAGE_LENGTH} characters`
  }
  return errors
}

export function validateProof(file: File | null): string | undefined {
  if (!file) return "Please upload your payment screenshot"
  if (!file.type.startsWith("image/")) return "Please upload an image (JPG, PNG or WebP)"
  if (file.size > MAX_PROOF_MB * 1024 * 1024) return `That image is too large (max ${MAX_PROOF_MB} MB)`
  return undefined
}

export type SubmitResult =
  | { status: "sent" }
  | { status: "whatsapp"; reason: "no-endpoint" | "failed" }

/** Plain-text summary used as the pre-filled WhatsApp message. */
export function bookingWhatsAppText(v: BookingValues): string {
  const pkg = getPackage(v.packageId)
  const lines = [
    v.mode === "gift" ? "I'd like to gift this package" : "I'd like to book",
    "",
    `Package: ${pkg.name} (${formatINR(pkg.offerPrice)})`,
    `Name: ${v.name.trim()}`,
    `Phone: ${v.phone.trim()}`,
  ]
  if (v.mode === "gift") {
    lines.push(`Gift for: ${v.recipientName.trim()}`)
    if (v.recipientContact.trim()) lines.push(`Recipient contact: ${v.recipientContact.trim()}`)
    lines.push("I confirm the recipient is open to this gift.")
  }
  if (v.message.trim()) lines.push(`Message: ${v.message.trim()}`)
  lines.push("", "I've paid via the QR code. Payment screenshot attached.")
  return lines.join("\n")
}

export function bookingWhatsAppUrl(v: BookingValues): string {
  return whatsappLink(bookingWhatsAppText(v))
}

/**
 * Sends the booking to the configured endpoint (multipart, so the payment
 * screenshot travels with it). With no endpoint, or if the request fails, the
 * caller falls back to WhatsApp so the booking is never lost.
 */
export async function submitBooking(v: BookingValues): Promise<SubmitResult> {
  const endpoint = siteConfig.bookingEndpoint
  if (!endpoint) return { status: "whatsapp", reason: "no-endpoint" }

  const pkg = getPackage(v.packageId)
  const body = new FormData()
  body.append("source", "diwali-landing-page")
  body.append("package", pkg.name)
  body.append("amount_inr", String(pkg.offerPrice))
  body.append("booking_for", v.mode === "gift" ? "Gift" : "Self")
  body.append("name", v.name.trim())
  body.append("phone", v.phone.trim())
  if (v.mode === "gift") {
    body.append("recipient_name", v.recipientName.trim())
    body.append("recipient_contact", v.recipientContact.trim())
    body.append("recipient_consent_confirmed", "yes")
  }
  body.append("message", v.message.trim())
  if (v.paymentProof) body.append("payment_screenshot", v.paymentProof, v.paymentProof.name)

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body,
      headers: { Accept: "application/json" },
    })
    if (response.ok) return { status: "sent" }
  } catch {
    // Network or CORS failure: fall through to WhatsApp.
  }
  return { status: "whatsapp", reason: "failed" }
}
