"use client"

import { useState, useRef, useEffect } from "react"
import {
  Check, ChevronDown, ChevronLeft, ChevronRight,
  Plus, Minus, Send, Car, Users,
} from "lucide-react"
import { useBooking, type PaymentType, type VehicleClass } from "@/lib/booking-context"
import { submitBooking } from "@/app/actions/booking"

/* ─── Constants ──────────────────────────────────────────── */
const COUNTRIES: { name: string; flag: string; code: string }[] = [
  { name: "Ukraine",        flag: "🇺🇦", code: "UA" },
  { name: "Poland",         flag: "🇵🇱", code: "PL" },
  { name: "Germany",        flag: "🇩🇪", code: "DE" },
  { name: "Czech Republic", flag: "🇨🇿", code: "CZ" },
  { name: "Austria",        flag: "🇦🇹", code: "AT" },
  { name: "Hungary",        flag: "🇭🇺", code: "HU" },
  { name: "Slovakia",       flag: "🇸🇰", code: "SK" },
  { name: "Lithuania",      flag: "🇱🇹", code: "LT" },
  { name: "Netherlands",    flag: "🇳🇱", code: "NL" },
  { name: "Belgium",        flag: "🇧🇪", code: "BE" },
  { name: "France",         flag: "🇫🇷", code: "FR" },
  { name: "Switzerland",    flag: "🇨🇭", code: "CH" },
]

const MONTHS = ["January","February","March","April","May","June",
                 "July","August","September","October","November","December"]
const DAYS   = ["Mo","Tu","We","Th","Fr","Sa","Su"]

const CYRILLIC_RE = /[\u0400-\u04FF]/
const EMAIL_RE    = /^[^\u0400-\u04FF\s@]+@[^\u0400-\u04FF\s@]+\.[^\u0400-\u04FF\s@]{2,}$/

const PAYMENT_OPTIONS: { id: PaymentType; label: string; sub: string }[] = [
  { id: "cash100", label: "Cash with Driver", sub: "100% after arrival" },
  { id: "split50", label: "50 / 50 Payment",  sub: "50% before, 50% after" },
  { id: "card",    label: "Card Payment",      sub: "Paid in advance" },
]

const VEHICLE_OPTIONS: { id: VehicleClass; label: string; seats: string; models: string }[] = [
  { id: "comfort",  label: "Comfort",  seats: "1–4", models: "VW Passat B8 · Skoda SuperB L&K · Mercedes Vito" },
  { id: "business", label: "Business", seats: "1–4", models: "Audi A6 S Line · Mercedes E-Class · BMW 5 · Mercedes GLB" },
  { id: "premium",  label: "Premium",  seats: "1–7", models: "Mercedes V-Class · Audi A8 · Mercedes Sprinter · Mercedes S-Class" },
]

/* ─── Floating Input ─────────────────────────────────────── */
function FloatInput({
  id, label, type = "text", placeholder, required, value, onChange,
}: {
  id: string; label: string; type?: string; placeholder?: string
  required?: boolean; value: string; onChange: (v: string) => void
}) {
  const safeValue = value ?? ""
  const [focused, setFocused] = useState(false)
  const active = focused || safeValue.length > 0
  const [touched, setTouched] = useState(false)

  const emailError = type === "email" && touched && safeValue.length > 0
    ? CYRILLIC_RE.test(safeValue)
      ? "Cannot contain Cyrillic characters."
      : !EMAIL_RE.test(safeValue)
      ? "Please enter a valid email address."
      : null
    : null

  return (
    <div className="relative flex flex-col">
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-0 select-none font-light transition-all duration-300 ${
          active ? "top-0 text-[9px] tracking-[0.35em] text-[oklch(0.75_0_0/0.5)] uppercase"
                 : "top-4 text-sm tracking-wide text-[oklch(0.5_0_0)]"
        }`}
      >
        {label}
      </label>
      <input
        id={id}
        type={type === "email" ? "text" : type}
        required={required}
        value={safeValue}
        autoComplete="off"
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => { setFocused(false); setTouched(true) }}
        placeholder={active ? (placeholder ?? "") : ""}
        className="mt-5 border-b bg-transparent pb-3 text-sm font-light text-foreground outline-none transition-colors duration-300 placeholder:text-[oklch(0.4_0_0)]"
        style={{ borderBottomColor: emailError ? "oklch(0.55 0.2 25)" : focused ? "oklch(0.75 0 0 / 0.7)" : "oklch(0.22 0 0)" }}
      />
      <span
        className="absolute bottom-0 left-0 h-px transition-all duration-500 ease-out"
        style={{ width: focused ? "100%" : "0%", background: emailError ? "oklch(0.55 0.2 25)" : "oklch(0.75 0 0 / 0.6)" }}
      />
      {emailError && <p className="mt-1.5 text-[11px] font-light text-red-400/80">{emailError}</p>}
    </div>
  )
}

/* ─── Floating Select ─────────────────────────────────────── */
function FloatSelect({
  id, label, options, required, value, onChange,
}: {
  id: string; label: string
  options: { name: string; flag: string; code: string }[]
  required?: boolean; value: string; onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const selected = options.find(o => o.name === value)
  const active = open || value.length > 0

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener("mousedown", h)
    return () => document.removeEventListener("mousedown", h)
  }, [])

  return (
    <div ref={ref} className="relative flex flex-col">
      <label
        htmlFor={id}
        className={`select-none font-light transition-all duration-300 ${
          active ? "text-[9px] tracking-[0.35em] text-[oklch(0.75_0_0/0.5)] uppercase mb-2"
                 : "text-sm tracking-wide text-[oklch(0.5_0_0)] mb-0 mt-4"
        }`}
      >
        {label}
      </label>
      <button
        id={id}
        type="button"
        aria-required={required}
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-between border-b bg-transparent pb-3 text-sm font-light outline-none text-left transition-colors duration-300"
        style={{ borderBottomColor: open ? "oklch(0.75 0 0 / 0.7)" : "oklch(0.22 0 0)" }}
      >
        {selected ? (
          <span className="flex items-center gap-2.5 text-foreground">
            <span className="text-base leading-none">{selected.flag}</span>
            <span>{selected.name}</span>
          </span>
        ) : (
          <span className="text-[oklch(0.4_0_0)]">Select country</span>
        )}
        <ChevronDown className="h-3.5 w-3.5 shrink-0 text-[oklch(0.5_0_0)] transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
      </button>
      <span className="absolute bottom-0 left-0 h-px transition-all duration-500 ease-out"
        style={{ width: open ? "100%" : "0%", background: "oklch(0.75 0 0 / 0.6)" }} />
      {open && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 border border-[oklch(0.2_0_0)] bg-[oklch(0.09_0_0)] shadow-2xl">
          {options.map(opt => (
            <button key={opt.code} type="button"
              onClick={() => { onChange(opt.name); setOpen(false) }}
              className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-light transition-colors hover:bg-white/5 ${value === opt.name ? "bg-white/5 text-foreground" : "text-[oklch(0.65_0_0)]"}`}
            >
              <span className="text-base leading-none">{opt.flag}</span>
              <span className="flex-1">{opt.name}</span>
              <span className="text-[9px] tracking-[0.2em] text-[oklch(0.4_0_0)] uppercase">{opt.code}</span>
              {value === opt.name && <Check className="h-3 w-3 text-[oklch(0.75_0_0)]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Floating Date Picker ────────────────────────────────── */
function FloatDate({ id, label, required, value, onChange }: {
  id: string; label: string; required?: boolean; value: string; onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [viewDate, setViewDate] = useState(() => {
    const d = value ? new Date(value) : new Date()
    return new Date(d.getFullYear(), d.getMonth(), 1)
  })
  const ref = useRef<HTMLDivElement>(null)
  const active = open || value.length > 0

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener("mousedown", h)
    return () => document.removeEventListener("mousedown", h)
  }, [])

  const today = new Date(); today.setHours(0,0,0,0)
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate()
  const firstDow = (new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay() + 6) % 7

  const selectDay = (day: number) => {
    const d = new Date(viewDate.getFullYear(), viewDate.getMonth(), day)
    onChange(`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`)
    setOpen(false)
  }

  const displayValue = value
    ? (() => { const d = new Date(value + "T00:00:00"); return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}` })()
    : ""

  return (
    <div ref={ref} className="relative flex flex-col">
      <label htmlFor={id}
        className={`select-none font-light transition-all duration-300 ${
          active ? "text-[9px] tracking-[0.35em] text-[oklch(0.75_0_0/0.5)] uppercase mb-2"
                 : "text-sm tracking-wide text-[oklch(0.5_0_0)] mb-0 mt-4"
        }`}
      >{label}</label>
      <button id={id} type="button" aria-required={required} onClick={() => setOpen(o => !o)}
        className="flex items-center justify-between border-b bg-transparent pb-3 text-sm font-light outline-none text-left transition-colors duration-300"
        style={{ borderBottomColor: open ? "oklch(0.75 0 0 / 0.7)" : "oklch(0.22 0 0)" }}
      >
        <span className={displayValue ? "text-foreground" : "text-[oklch(0.4_0_0)]"}>{displayValue || "DD / MM / YYYY"}</span>
        <ChevronDown className="h-3.5 w-3.5 text-[oklch(0.5_0_0)]" />
      </button>
      <span className="absolute bottom-0 left-0 h-px transition-all duration-500 ease-out"
        style={{ width: open ? "100%" : "0%", background: "oklch(0.75 0 0 / 0.6)" }} />
      {open && (
        <div className="absolute top-full left-0 z-50 mt-1 w-72 border border-[oklch(0.2_0_0)] bg-[oklch(0.1_0_0)] p-4 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <button type="button" onClick={() => setViewDate(d => new Date(d.getFullYear(), d.getMonth()-1, 1))}
              className="flex h-7 w-7 items-center justify-center text-[oklch(0.5_0_0)] hover:text-foreground transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-xs font-light tracking-[0.2em] text-foreground uppercase">
              {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
            </span>
            <button type="button" onClick={() => setViewDate(d => new Date(d.getFullYear(), d.getMonth()+1, 1))}
              className="flex h-7 w-7 items-center justify-center text-[oklch(0.5_0_0)] hover:text-foreground transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map(d => <div key={d} className="text-center text-[9px] tracking-wider text-[oklch(0.4_0_0)] uppercase py-1">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-y-1">
            {Array.from({ length: firstDow }).map((_, i) => <div key={`e-${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1
              const thisDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day)
              thisDate.setHours(0,0,0,0)
              const isPast = thisDate < today
              const sel = value === `${viewDate.getFullYear()}-${String(viewDate.getMonth()+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`
              return (
                <button key={day} type="button" disabled={isPast} onClick={() => !isPast && selectDay(day)}
                  className={`flex h-8 w-full items-center justify-center text-xs font-light transition-all duration-150 ${
                    sel ? "bg-foreground text-background"
                        : isPast ? "text-[oklch(0.3_0_0)] cursor-not-allowed"
                                 : "text-foreground/70 hover:bg-white/10 hover:text-foreground"
                  }`}>{day}</button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── Time Input ─────────────────────────────────────────── */
function TimeInput({ id, label, value, onChange }: {
  id: string; label: string; value: string; onChange: (v: string) => void
}) {
  const [focused, setFocused] = useState(false)
  const active = focused || value.length > 0
  return (
    <div className="relative flex flex-col">
      <label htmlFor={id}
        className={`pointer-events-none absolute left-0 select-none font-light transition-all duration-300 ${
          active ? "top-0 text-[9px] tracking-[0.35em] text-[oklch(0.75_0_0/0.5)] uppercase"
                 : "top-4 text-sm tracking-wide text-[oklch(0.5_0_0)]"
        }`}>{label}</label>
      <input id={id} type="time" value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        className="mt-5 border-b bg-transparent pb-3 text-sm font-light text-foreground outline-none transition-colors duration-300 [color-scheme:dark]"
        style={{ borderBottomColor: focused ? "oklch(0.75 0 0 / 0.7)" : "oklch(0.22 0 0)" }}
      />
      <span className="absolute bottom-0 left-0 h-px transition-all duration-500 ease-out"
        style={{ width: focused ? "100%" : "0%", background: "oklch(0.75 0 0 / 0.6)" }} />
    </div>
  )
}

/* ─── Passenger Stepper ───────────────────────────────────── */
function PassengerStepper({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[9px] font-light tracking-[0.35em] text-[oklch(0.75_0_0/0.5)] uppercase">Passengers</span>
      <div className="flex items-center justify-between border-b pb-3" style={{ borderBottomColor: "oklch(0.22 0 0)" }}>
        <span className="text-sm font-light text-foreground flex items-center gap-2">
          <Users className="h-3.5 w-3.5 text-[oklch(0.5_0_0)]" />
          {value} {value === 1 ? "Passenger" : "Passengers"}
        </span>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => onChange(Math.max(1, value - 1))} disabled={value <= 1}
            aria-label="Decrease" className="flex h-7 w-7 items-center justify-center border border-[oklch(0.2_0_0)] text-[oklch(0.5_0_0)] transition-all hover:border-[oklch(0.5_0_0)] hover:text-foreground disabled:opacity-20">
            <Minus className="h-3 w-3" />
          </button>
          <span className="w-4 text-center text-sm font-light tabular-nums">{value}</span>
          <button type="button" onClick={() => onChange(Math.min(15, value + 1))} disabled={value >= 15}
            aria-label="Increase" className="flex h-7 w-7 items-center justify-center border border-[oklch(0.2_0_0)] text-[oklch(0.5_0_0)] transition-all hover:border-[oklch(0.5_0_0)] hover:text-foreground disabled:opacity-20">
            <Plus className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Rental Duration Label ───────────────────────────────── */
function rentalDays(p: string, r: string): string | null {
  if (!p || !r) return null
  const diff = (new Date(r).getTime() - new Date(p).getTime()) / 86400000
  if (diff <= 0) return null
  return `${Math.round(diff)} day${Math.round(diff) !== 1 ? "s" : ""}`
}

/* ─── Universal Booking Form ─────────────────────────────── */
export function UniversalBookingForm({ className, compact = false }: { className?: string; compact?: boolean }) {
  const { mode, setMode, chauffeur, setChauffeur, rental, setRental } = useBooking()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const duration = rentalDays(rental.pickupDate, rental.returnDate)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (mode === "chauffeur") {
      const result = await submitBooking({
        source: "main_form",
        first_name: chauffeur.firstName,
        last_name: chauffeur.lastName,
        email: chauffeur.email,
        phone: chauffeur.phone,
        origin_city: chauffeur.originCity,
        origin_country: chauffeur.originCountry,
        destination_city: chauffeur.destinationCity,
        destination_country: chauffeur.destinationCountry,
        travel_date: chauffeur.travelDate,
        passengers: chauffeur.passengers,
        payment_type: chauffeur.paymentType,
        vehicle_class: chauffeur.vehicleClass,
        special_requests: chauffeur.specialRequests,
      })
      setLoading(false)
      if (result.success) { setSubmitted(true) } else { setError("Something went wrong. Please try again.") }
    } else {
      // Self-drive — log and show success (no Supabase table for rentals yet)
      await new Promise(r => setTimeout(r, 600))
      setLoading(false)
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className={`flex flex-col items-center justify-center gap-6 py-16 text-center ${className ?? ""}`}>
        <div className="flex h-14 w-14 items-center justify-center border border-[oklch(0.75_0_0/0.4)]">
          <Check className="h-6 w-6 text-foreground" />
        </div>
        <div>
          <p className="text-lg font-extralight tracking-wide text-foreground">Request received</p>
          <p className="mt-2 text-sm font-light text-[oklch(0.55_0_0)]">We will confirm your booking within 30 minutes.</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-0 ${className ?? ""}`}>

      {/* ── Mode Toggle ── */}
      <div className="flex mb-8 border border-[oklch(0.18_0_0)]">
        {([
          { id: "chauffeur" as const, icon: <Users className="h-3.5 w-3.5" />, label: "Car with Driver" },
          { id: "rental"   as const, icon: <Car   className="h-3.5 w-3.5" />, label: "Self-Drive Rental" },
        ] as const).map(opt => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setMode(opt.id)}
            className={`flex flex-1 items-center justify-center gap-2 py-3 text-xs font-light tracking-[0.2em] uppercase transition-all duration-300 ${
              mode === opt.id
                ? "bg-foreground text-background"
                : "text-[oklch(0.5_0_0)] hover:text-foreground"
            }`}
          >
            {opt.icon}
            {opt.label}
          </button>
        ))}
      </div>

      {/* ── MODE A: Car with Driver ── */}
      {mode === "chauffeur" && (
        <div className="flex flex-col gap-7">
          {/* Name row */}
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
            <FloatInput id="firstName" label="First Name" required value={chauffeur.firstName} onChange={v => setChauffeur({ firstName: v })} />
            <FloatInput id="lastName"  label="Last Name"  required value={chauffeur.lastName}  onChange={v => setChauffeur({ lastName: v })} />
          </div>

          {/* Contact row */}
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
            <FloatInput id="email" label="Email Address" type="email" required value={chauffeur.email} onChange={v => setChauffeur({ email: v })} />
            <FloatInput id="phone" label="Phone Number"  type="tel"   required value={chauffeur.phone} onChange={v => setChauffeur({ phone: v })} />
          </div>

          {/* Origin row: city + country */}
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
            <FloatInput id="originCity"    label="Origin City"    required value={chauffeur.originCity}    onChange={v => setChauffeur({ originCity: v })} />
            <FloatSelect id="originCountry" label="Origin Country" options={COUNTRIES} required value={chauffeur.originCountry} onChange={v => setChauffeur({ originCountry: v })} />
          </div>

          {/* Destination row: city + country */}
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
            <FloatInput id="destinationCity"    label="Destination City"    required value={chauffeur.destinationCity}    onChange={v => setChauffeur({ destinationCity: v })} />
            <FloatSelect id="destinationCountry" label="Destination Country" options={COUNTRIES} required value={chauffeur.destinationCountry} onChange={v => setChauffeur({ destinationCountry: v })} />
          </div>

          {/* Date + Passengers */}
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
            <FloatDate id="travelDate" label="Travel Date" required value={chauffeur.travelDate} onChange={v => setChauffeur({ travelDate: v })} />
            <PassengerStepper value={chauffeur.passengers} onChange={v => setChauffeur({ passengers: v })} />
          </div>

          {/* Payment method */}
          <div className="flex flex-col gap-3">
            <span className="text-[9px] font-light tracking-[0.35em] text-[oklch(0.75_0_0/0.5)] uppercase">Payment Method</span>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {PAYMENT_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setChauffeur({ paymentType: opt.id })}
                  className={`flex flex-col gap-1 border p-4 text-left transition-all duration-200 ${
                    chauffeur.paymentType === opt.id
                      ? "border-[oklch(0.75_0_0/0.5)] bg-white/5"
                      : "border-[oklch(0.18_0_0)] hover:border-[oklch(0.35_0_0)]"
                  }`}
                >
                  <span className="text-xs font-light text-foreground">{opt.label}</span>
                  <span className="text-[10px] font-light text-[oklch(0.5_0_0)]">{opt.sub}</span>
                  {chauffeur.paymentType === opt.id && (
                    <Check className="mt-1 h-3 w-3 text-[oklch(0.75_0_0)]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle class */}
          <div className="flex flex-col gap-3">
            <span className="text-[9px] font-light tracking-[0.35em] text-[oklch(0.75_0_0/0.5)] uppercase">Vehicle Class</span>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {VEHICLE_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setChauffeur({ vehicleClass: opt.id })}
                  className={`flex flex-col gap-1.5 border p-4 text-left transition-all duration-200 ${
                    chauffeur.vehicleClass === opt.id
                      ? "border-[oklch(0.75_0_0/0.5)] bg-white/5"
                      : "border-[oklch(0.18_0_0)] hover:border-[oklch(0.35_0_0)]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-light tracking-[0.15em] uppercase text-foreground">{opt.label}</span>
                    {chauffeur.vehicleClass === opt.id && (
                      <Check className="h-3 w-3 text-[oklch(0.75_0_0)]" />
                    )}
                  </div>
                  <span className="text-[10px] font-light text-[oklch(0.5_0_0)]">{opt.seats} pax</span>
                  <span className="text-[10px] font-light leading-relaxed text-[oklch(0.38_0_0)] mt-0.5">{opt.models}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Special requests */}
          <div className="relative flex flex-col">
            <label htmlFor="specialRequests"
              className={`select-none font-light transition-all duration-300 pointer-events-none ${
                chauffeur.specialRequests.length > 0
                  ? "text-[9px] tracking-[0.35em] text-[oklch(0.75_0_0/0.5)] uppercase mb-2"
                  : "text-sm tracking-wide text-[oklch(0.5_0_0)] mb-0 mt-4"
              }`}
            >Special Requests</label>
            <textarea
              id="specialRequests"
              rows={3}
              value={chauffeur.specialRequests}
              onChange={e => setChauffeur({ specialRequests: e.target.value })}
              placeholder={chauffeur.specialRequests.length > 0 ? "Child seat, specific route, accessibility needs…" : ""}
              className="resize-none border-b bg-transparent pb-3 text-sm font-light text-foreground outline-none placeholder:text-[oklch(0.35_0_0)]"
              style={{ borderBottomColor: "oklch(0.22 0 0)" }}
            />
          </div>
        </div>
      )}

      {/* ── MODE B: Self-Drive Rental ── */}
      {mode === "rental" && (
        <div className="flex flex-col gap-7">
          {/* City */}
          <FloatInput id="rentalCity" label="City / Location" required value={rental.city} onChange={v => setRental({ city: v })} />

          {/* Pickup row */}
          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-light tracking-[0.35em] text-[oklch(0.75_0_0/0.5)] uppercase">1 — Pick-up</span>
            <div className="grid grid-cols-2 gap-6 border border-[oklch(0.15_0_0)] p-4">
              <FloatDate id="pickupDate" label="Date" required value={rental.pickupDate} onChange={v => setRental({ pickupDate: v })} />
              <TimeInput id="pickupTime" label="Time" value={rental.pickupTime} onChange={v => setRental({ pickupTime: v })} />
            </div>
          </div>

          {/* Return row */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-light tracking-[0.35em] text-[oklch(0.75_0_0/0.5)] uppercase">2 — Return</span>
              {duration && (
                <span className="text-[10px] font-light tracking-[0.2em] text-[oklch(0.55_0_0)] uppercase">
                  Rental Duration: {duration}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-6 border border-[oklch(0.15_0_0)] p-4">
              <FloatDate id="returnDate" label="Date" required value={rental.returnDate} onChange={v => setRental({ returnDate: v })} />
              <TimeInput id="returnTime" label="Time" value={rental.returnTime} onChange={v => setRental({ returnTime: v })} />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex flex-col gap-3">
            {[
              { key: "sameLocation" as const, label: "Return car to the same location" },
              { key: "driverAge2669" as const, label: "Driver aged 26–69" },
            ].map(item => (
              <label key={item.key} className="flex cursor-pointer items-center gap-3 group">
                <span
                  onClick={() => setRental({ [item.key]: !rental[item.key] })}
                  className={`flex h-4 w-4 shrink-0 items-center justify-center border transition-all duration-200 cursor-pointer ${
                    rental[item.key] ? "border-[oklch(0.75_0_0/0.6)] bg-foreground" : "border-[oklch(0.25_0_0)] group-hover:border-[oklch(0.5_0_0)]"
                  }`}
                >
                  {rental[item.key] && <Check className="h-2.5 w-2.5 text-background" />}
                </span>
                <span
                  onClick={() => setRental({ [item.key]: !rental[item.key] })}
                  className="text-sm font-light text-[oklch(0.65_0_0)] group-hover:text-foreground transition-colors cursor-pointer"
                >
                  {item.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* ── Error ── */}
      {error && (
        <p className="mt-6 text-sm font-light text-red-400/80">{error}</p>
      )}

      {/* ── Submit ── */}
      <button
        type="submit"
        disabled={loading}
        className="mt-10 flex w-full items-center justify-center gap-3 bg-white px-8 py-4 text-xs font-light tracking-[0.25em] text-black uppercase transition-all duration-300 hover:bg-white/85 disabled:opacity-40"
      >
        {loading ? (
          <span className="h-4 w-4 animate-spin rounded-full border border-white/40 border-t-white" />
        ) : (
          <Send className="h-3.5 w-3.5" />
        )}
        {mode === "chauffeur" ? "Book Now" : "Search Availability"}
      </button>

    </form>
  )
}
