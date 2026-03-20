"use client"

import { useEffect, useRef, useState } from "react"
import { X, ChevronDown, MapPin, ArrowLeftRight } from "lucide-react"
import { useTranslation } from "@/lib/language-context"
import { submitBooking } from "@/app/actions/booking"

/* ─── Types ─────────────────────────────────────────────── */
export interface RouteModalData {
  city: string
  country: string
  code: string
  image: string
}

interface Props {
  route: RouteModalData | null
  onClose: () => void
}

/* ─── Floating Input ─────────────────────────────────────── */
function FloatInput({
  id, label, type = "text", placeholder, required, value, onChange,
}: {
  id: string; label: string; type?: string; placeholder?: string
  required?: boolean; value: string; onChange: (v: string) => void
}) {
  const [focused, setFocused] = useState(false)
  const active = focused || value.length > 0
  return (
    <div className="relative flex flex-col">
      <label
        htmlFor={id}
        className={`select-none font-light transition-all duration-300 ${
          active
            ? "text-[9px] tracking-[0.35em] text-silver/60 uppercase mb-1.5"
            : "text-sm tracking-wide text-muted-foreground/50 mb-0 mt-4 pointer-events-none"
        }`}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={focused ? placeholder : ""}
        className="border-b bg-transparent pb-2.5 text-sm font-light text-foreground outline-none transition-colors duration-300 placeholder:text-muted-foreground/30"
        style={{ borderBottomColor: focused ? "oklch(0.75 0 0 / 0.7)" : "oklch(0.22 0 0)" }}
      />
      <span
        className="absolute bottom-0 left-0 h-px transition-all duration-500 ease-out"
        style={{ width: focused ? "100%" : "0%", background: "oklch(0.75 0 0 / 0.6)" }}
      />
    </div>
  )
}

/* ─── Floating Date ──────────────────────────────────────── */
function FloatDate({
  id, label, required, value, onChange,
}: {
  id: string; label: string; required?: boolean; value: string; onChange: (v: string) => void
}) {
  const [focused, setFocused] = useState(false)
  const active = focused || value.length > 0
  return (
    <div className="relative flex flex-col">
      <label
        htmlFor={id}
        className={`select-none font-light transition-all duration-300 ${
          active
            ? "text-[9px] tracking-[0.35em] text-silver/60 uppercase mb-1.5"
            : "text-sm tracking-wide text-muted-foreground/50 mb-0 mt-4"
        }`}
      >
        {label}
      </label>
      <input
        id={id}
        type="date"
        required={required}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        min={new Date().toISOString().split("T")[0]}
        className="border-b bg-transparent pb-2.5 text-sm font-light text-foreground outline-none transition-colors duration-300 [color-scheme:dark]"
        style={{ borderBottomColor: focused ? "oklch(0.75 0 0 / 0.7)" : "oklch(0.22 0 0)" }}
      />
      <span
        className="absolute bottom-0 left-0 h-px transition-all duration-500 ease-out"
        style={{ width: focused ? "100%" : "0%", background: "oklch(0.75 0 0 / 0.6)" }}
      />
    </div>
  )
}

/* ─── Passengers Stepper ─────────────────────────────────── */
function PassengerStepper({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex flex-col gap-1.5 mt-4">
      <span className="text-[9px] font-light tracking-[0.35em] text-silver/60 uppercase">Passengers</span>
      <div className="flex items-center gap-4 border-b pb-2.5" style={{ borderBottomColor: "oklch(0.22 0 0)" }}>
        <button
          type="button"
          onClick={() => onChange(Math.max(1, value - 1))}
          className="flex h-7 w-7 items-center justify-center border border-border/40 text-silver/60 transition-colors hover:border-silver/60 hover:text-silver text-base font-light"
        >
          −
        </button>
        <span className="min-w-[1.5rem] text-center text-sm font-light text-foreground">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(7, value + 1))}
          className="flex h-7 w-7 items-center justify-center border border-border/40 text-silver/60 transition-colors hover:border-silver/60 hover:text-silver text-base font-light"
        >
          +
        </button>
        <span className="text-xs font-light text-muted-foreground/50">
          {value === 1 ? "person" : "people"}
        </span>
      </div>
    </div>
  )
}

/* ─── Modal ──────────────────────────────────────────────── */
export function RouteBookingModal({ route, onClose }: Props) {
  const { t } = useTranslation()
  const overlayRef = useRef<HTMLDivElement>(null)

  // Direction: "from" = travelling FROM this country, "to" = travelling TO this country
  const [direction, setDirection] = useState<"from" | "to">("to")
  const [city, setCity] = useState("")
  const [date, setDate] = useState("")
  const [returnDate, setReturnDate] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [passengers, setPassengers] = useState(1)
  const [paymentType, setPaymentType] = useState("cash100")
  const [vehicleClass, setVehicleClass] = useState("comfort")
  const [notes, setNotes] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Lock body scroll
  useEffect(() => {
    if (route) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [route])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  if (!route) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSubmitError(null)
    const result = await submitBooking({
      source: "route_modal",
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      passengers,
      route_city: city,
      route_country: route!.country,
      route_code: route!.code,
      direction,
      travel_date: date,
      return_date: returnDate,
      payment_type: paymentType,
      vehicle_class: vehicleClass,
      special_requests: notes,
    })
    setLoading(false)
    if (result.success) {
      setSubmitted(true)
    } else {
      setSubmitError("Something went wrong. Please try again.")
    }
  }

  const routeLabel = direction === "to"
    ? `To ${route.city}`
    : `From ${route.city}`

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
      onClick={e => { if (e.target === overlayRef.current) onClose() }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Panel */}
      <div className="relative z-10 w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto bg-[oklch(0.07_0_0)] border border-border/30 shadow-2xl animate-in slide-in-from-bottom-4 sm:slide-in-from-bottom-0 sm:fade-in duration-300">

        {/* Header */}
        <div className="sticky top-0 z-20 flex items-start justify-between border-b border-border/20 bg-[oklch(0.07_0_0)] px-6 py-5 sm:px-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="h-3 w-3 text-silver/50" />
              <span className="text-[10px] font-light tracking-[0.3em] text-silver/50 uppercase">
                {route.country} · {route.code}
              </span>
            </div>
            <h2 className="text-xl font-extralight tracking-wide text-foreground sm:text-2xl">
              {routeLabel}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="mt-0.5 flex h-9 w-9 items-center justify-center border border-border/30 text-muted-foreground/50 transition-colors hover:border-silver/40 hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {submitted ? (
          /* Success state */
          <div className="flex flex-col items-center justify-center gap-4 px-8 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center border border-silver/30">
              <svg className="h-6 w-6 text-silver" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <p className="text-[10px] font-light tracking-[0.35em] text-silver/60 uppercase">Request Sent</p>
            <h3 className="text-2xl font-extralight text-foreground">We'll be in touch shortly.</h3>
            <p className="max-w-xs text-sm font-light leading-relaxed text-muted-foreground">
              Your transfer enquiry to {route.city} has been received. Our concierge team will contact you within 2 hours.
            </p>
            <button
              onClick={onClose}
              className="mt-4 border border-border/40 px-8 py-3 text-xs font-light tracking-[0.25em] text-muted-foreground uppercase transition-colors hover:border-silver/50 hover:text-foreground"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 pb-8 pt-6 sm:px-8">

            {/* Direction Toggle */}
            <div className="mb-8">
              <p className="mb-3 text-[9px] font-light tracking-[0.35em] text-silver/50 uppercase">Direction</p>
              <div className="grid grid-cols-2 border border-border/30">
                <button
                  type="button"
                  onClick={() => setDirection("to")}
                  className={`flex items-center justify-center gap-2 py-3 text-xs font-light tracking-[0.2em] uppercase transition-colors duration-200 ${
                    direction === "to"
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <ArrowLeftRight className="h-3 w-3" />
                  To {route.city}
                </button>
                <button
                  type="button"
                  onClick={() => setDirection("from")}
                  className={`flex items-center justify-center gap-2 py-3 text-xs font-light tracking-[0.2em] uppercase transition-colors duration-200 border-l border-border/30 ${
                    direction === "from"
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <ArrowLeftRight className="h-3 w-3" />
                  From {route.city}
                </button>
              </div>
            </div>

            {/* Trip Details */}
            <div className="mb-8 border-b border-border/20 pb-8">
              <p className="mb-4 text-[9px] font-light tracking-[0.35em] text-silver/50 uppercase">Trip Details</p>
              <div className="grid gap-6 sm:grid-cols-2">
                <FloatInput
                  id="modal-city"
                  label={direction === "to" ? `City in ${route.country}` : "Departure City"}
                  placeholder="e.g. City center"
                  required
                  value={city}
                  onChange={setCity}
                />
                <PassengerStepper value={passengers} onChange={setPassengers} />
                <FloatDate id="modal-date" label="Departure Date" required value={date} onChange={setDate} />
                <FloatDate id="modal-return" label="Return Date (optional)" value={returnDate} onChange={setReturnDate} />
              </div>
            </div>

            {/* Contact Details */}
            <div className="mb-8 border-b border-border/20 pb-8">
              <p className="mb-4 text-[9px] font-light tracking-[0.35em] text-silver/50 uppercase">Contact Details</p>
              <div className="grid gap-6 sm:grid-cols-2">
                <FloatInput id="modal-first" label="First Name" required value={firstName} onChange={setFirstName} />
                <FloatInput id="modal-last" label="Last Name" required value={lastName} onChange={setLastName} />
                <FloatInput id="modal-email" label="Email" type="email" required value={email} onChange={setEmail} placeholder="name@example.com" />
                <FloatInput id="modal-phone" label="Phone" type="tel" value={phone} onChange={setPhone} placeholder="+380 067 1234 567" />
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-8 border-b border-border/20 pb-8">
              <p className="mb-5 text-[9px] font-light tracking-[0.35em] text-silver/50 uppercase">{t.booking.paymentType}</p>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { id: "cash100", label: t.booking.paymentCash100, desc: t.booking.paymentCash100Desc },
                  { id: "cash50",  label: t.booking.paymentCash50,  desc: t.booking.paymentCash50Desc  },
                  { id: "card",    label: t.booking.paymentCard,    desc: t.booking.paymentCardDesc    },
                ].map(option => {
                  const active = paymentType === option.id
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setPaymentType(option.id)}
                      className="relative flex flex-col items-start gap-1.5 px-4 py-4 text-left transition-all duration-300"
                      style={{
                        borderBottom: `1px solid ${active ? "oklch(0.75 0 0 / 0.7)" : "oklch(0.22 0 0)"}`,
                        background: active ? "oklch(0.14 0 0)" : "transparent",
                      }}
                    >
                      <span className="flex items-center gap-2.5 w-full">
                        <span
                          className="relative flex-shrink-0 h-3.5 w-3.5 rounded-full transition-all duration-300"
                          style={{
                            border: `1px solid ${active ? "oklch(0.75 0 0 / 0.8)" : "oklch(0.35 0 0)"}`,
                            background: active ? "oklch(0.75 0 0 / 0.15)" : "transparent",
                          }}
                        >
                          {active && <span className="absolute inset-[3px] rounded-full bg-foreground/80" />}
                        </span>
                        <span className="text-sm font-light tracking-wide transition-colors duration-300"
                          style={{ color: active ? "oklch(0.92 0 0)" : "oklch(0.55 0 0)" }}>
                          {option.label}
                        </span>
                      </span>
                      <span className="pl-[22px] text-[11px] font-light leading-relaxed transition-colors duration-300"
                        style={{ color: active ? "oklch(0.55 0 0)" : "oklch(0.38 0 0)" }}>
                        {option.desc}
                      </span>
                      <span className="absolute bottom-0 left-0 h-px transition-all duration-500 ease-out"
                        style={{ width: active ? "100%" : "0%", background: "oklch(0.75 0 0 / 0.5)" }} />
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Vehicle Class */}
            <div className="mb-8 border-b border-border/20 pb-8">
              <p className="mb-5 text-[9px] font-light tracking-[0.35em] text-silver/50 uppercase">{t.booking.vehicleClass}</p>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { id: "comfort",  label: t.booking.vehicleComfort,  models: "VW Passat B8 · Skoda SuperB · Mercedes Vito" },
                  { id: "business", label: t.booking.vehicleBusiness, models: "Audi A6 · Mercedes E-Class · BMW 5 · Mercedes GLB" },
                  { id: "premium",  label: t.booking.vehiclePremium,  models: "Mercedes V-Class · Audi A8 · Sprinter · S-Class" },
                ].map(option => {
                  const active = vehicleClass === option.id
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setVehicleClass(option.id)}
                      className="relative flex flex-col gap-2 px-4 py-4 text-left transition-all duration-300"
                      style={{
                        borderBottom: `1px solid ${active ? "oklch(0.75 0 0 / 0.7)" : "oklch(0.22 0 0)"}`,
                        background: active ? "oklch(0.14 0 0)" : "transparent",
                      }}
                    >
                      <span className="flex items-center gap-2.5">
                        <span
                          className="relative flex-shrink-0 h-3.5 w-3.5 rounded-full transition-all duration-300"
                          style={{
                            border: `1px solid ${active ? "oklch(0.75 0 0 / 0.8)" : "oklch(0.35 0 0)"}`,
                            background: active ? "oklch(0.75 0 0 / 0.15)" : "transparent",
                          }}
                        >
                          {active && <span className="absolute inset-[3px] rounded-full bg-foreground/80" />}
                        </span>
                        <span className="text-sm font-light tracking-wide transition-colors duration-300"
                          style={{ color: active ? "oklch(0.92 0 0)" : "oklch(0.55 0 0)" }}>
                          {option.label}
                        </span>
                      </span>
                      <span className="pl-6 text-[10px] font-light leading-relaxed transition-colors duration-300"
                        style={{ color: active ? "oklch(0.55 0 0)" : "oklch(0.38 0 0)" }}>
                        {option.models}
                      </span>
                      <span className="absolute bottom-0 left-0 h-px transition-all duration-500 ease-out"
                        style={{ width: active ? "100%" : "0%", background: "oklch(0.75 0 0 / 0.5)" }} />
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Notes */}
            <div className="mb-8">
              <div className="relative flex flex-col">
                <label
                  htmlFor="modal-notes"
                  className={`select-none font-light transition-all duration-300 ${
                    notes.length > 0
                      ? "text-[9px] tracking-[0.35em] text-silver/60 uppercase mb-1.5"
                      : "text-sm tracking-wide text-muted-foreground/50 mb-0 mt-4"
                  }`}
                >
                  Special Requests
                </label>
                <textarea
                  id="modal-notes"
                  rows={3}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder={notes.length > 0 ? "Any special requirements..." : ""}
                  className="resize-none border-b border-border/30 bg-transparent pb-2.5 text-sm font-light text-foreground outline-none transition-colors placeholder:text-muted-foreground/30 focus:border-silver/50"
                />
              </div>
            </div>

            {/* Submit */}
            {submitError && (
              <p className="mb-4 text-xs font-light text-red-400/80 tracking-wide">{submitError}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden border border-foreground bg-foreground py-4 text-xs font-light tracking-[0.3em] text-background uppercase transition-all duration-500 hover:bg-transparent hover:text-foreground disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <><span className="h-3.5 w-3.5 animate-spin rounded-full border border-current border-t-transparent" /><span>Sending...</span></>
              ) : (
                <span>Request Transfer</span>
              )}
            </button>

            <p className="mt-4 text-center text-[10px] font-light text-muted-foreground/40">
              Our concierge team responds within 2 hours.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
