"use client"

import { useState, useRef, useEffect } from "react"
import {
  Check, ChevronDown, ChevronLeft, ChevronRight,
  Plus, Minus, Send, Car, Users,
} from "lucide-react"
import { useBooking, type PaymentType, type VehicleClass } from "@/lib/booking-context"
import { useTranslation } from "@/lib/language-context"
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

const CITIES = [
  { name: "Warsaw", country: "PL" },
  { name: "Kyiv", country: "UA" },
  { name: "Berlin", country: "DE" },
  { name: "Prague", country: "CZ" },
  { name: "Vienna", country: "AT" },
  { name: "Budapest", country: "HU" },
  { name: "Kraków", country: "PL" },
  { name: "Lviv", country: "UA" },
  { name: "Wrocław", country: "PL" },
  { name: "Munich", country: "DE" },
  { name: "Bratislava", country: "SK" },
  { name: "Zürich", country: "CH" },
  { name: "Amsterdam", country: "NL" },
  { name: "Brussels", country: "BE" },
  { name: "Paris", country: "FR" },
  { name: "Hamburg", country: "DE" },
  { name: "Frankfurt", country: "DE" },
  { name: "Gdańsk", country: "PL" },
  { name: "Poznań", country: "PL" },
  { name: "Łódź", country: "PL" },
  { name: "Katowice", country: "PL" },
  { name: "Lublin", country: "PL" },
  { name: "Rzeszów", country: "PL" },
  { name: "Vilnius", country: "LT" },
  { name: "Odesa", country: "UA" },
  { name: "Dnipro", country: "UA" },
  { name: "Kharkiv", country: "UA" },
  { name: "Ternopil", country: "UA" },
  { name: "Ivano-Frankivsk", country: "UA" },
  { name: "Uzhhorod", country: "UA" },
]

const CYRILLIC_RE = /[\u0400-\u04FF]/
const EMAIL_RE    = /^[^\u0400-\u04FF\s@]+@[^\u0400-\u04FF\s@]+\.[^\u0400-\u04FF\s@]{2,}$/

/* ─── Floating Input ─────────────────────────────────────── */
function FloatInput({
  id, label, type = "text", placeholder, required, value, onChange,
}: {
  id: string; label: string; type?: string; placeholder?: string
  required?: boolean; value: string; onChange: (v: string) => void
}) {
  const { t } = useTranslation()
  const safeValue = value ?? ""
  const [focused, setFocused] = useState(false)
  const active = focused || safeValue.length > 0
  const [touched, setTouched] = useState(false)

  const emailError = type === "email" && touched && safeValue.length > 0
    ? CYRILLIC_RE.test(safeValue)
      ? t.form.noCyrillic
      : !EMAIL_RE.test(safeValue)
      ? t.form.invalidEmail
      : null
    : null

  return (
    <div className="relative flex flex-col">
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-0 select-none font-light transition-all duration-300 ${
          active ? "top-0 text-[9px] tracking-[0.35em] text-[oklch(0.75_0_0/0.5)] uppercase"
                 : "top-4 text-sm tracking-wide text-[var(--text-muted-input)]"
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
        className="mt-5 border-b bg-transparent pb-3 text-sm font-light text-foreground outline-none transition-colors duration-300 placeholder:text-[var(--text-dim)]"
        style={{ borderBottomColor: emailError ? "oklch(0.55 0.2 25)" : focused ? "var(--line-focus)" : "var(--line-dim)" }}
      />
      {emailError && <p className="mt-1.5 text-[11px] font-light text-red-400/80">{emailError}</p>}
    </div>
  )
}

/* ─── City Autocomplete Input ────────────────────────────── */
function FloatCityInput({
  id, label, required, value, onChange,
}: {
  id: string; label: string; required?: boolean; value: string; onChange: (v: string) => void
}) {
  const [focused, setFocused] = useState(false)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const safeValue = value ?? ""
  const active = focused || safeValue.length > 0

  const filtered = safeValue.length > 0
    ? CITIES.filter(c => c.name.toLowerCase().includes(safeValue.toLowerCase()))
    : CITIES

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener("mousedown", h)
    return () => document.removeEventListener("mousedown", h)
  }, [])

  return (
    <div ref={ref} className="relative flex flex-col">
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-0 select-none font-light transition-all duration-300 ${
          active ? "top-0 text-[9px] tracking-[0.35em] text-[oklch(0.75_0_0/0.5)] uppercase"
                 : "top-4 text-sm tracking-wide text-[var(--text-muted-input)]"
        }`}
      >
        {label}
      </label>
      <input
        id={id}
        type="text"
        required={required}
        value={safeValue}
        autoComplete="off"
        onChange={e => { onChange(e.target.value); setOpen(true) }}
        onFocus={() => { setFocused(true); setOpen(true) }}
        onBlur={() => setFocused(false)}
        className="mt-5 border-b bg-transparent pb-3 text-sm font-light text-foreground outline-none transition-colors duration-300 placeholder:text-[var(--text-dim)]"
        style={{ borderBottomColor: focused ? "var(--line-focus)" : "var(--line-dim)" }}
      />
      {open && filtered.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-48 overflow-y-auto border border-[var(--line-dim)] bg-[var(--surface-dropdown)] shadow-2xl">
          {filtered.map(city => (
            <button
              key={city.name}
              type="button"
              onMouseDown={e => e.preventDefault()}
              onClick={() => { onChange(city.name); setOpen(false) }}
              className={`flex w-full items-center justify-between px-4 py-2.5 text-sm font-light transition-colors hover:bg-[var(--surface-dropdown-hover)] ${
                safeValue === city.name ? "text-foreground" : "text-[oklch(0.6_0_0)]"
              }`}
            >
              <span>{city.name}</span>
              <span className="text-[10px] text-[var(--text-dim)]">{city.country}</span>
            </button>
          ))}
        </div>
      )}
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
  const { t } = useTranslation()
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
                 : "text-sm tracking-wide text-[var(--text-muted-input)] mb-0 mt-4"
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
        style={{ borderBottomColor: open ? "var(--line-focus)" : "var(--line-dim)" }}
      >
        {selected ? (
          <span className="flex items-center gap-2.5 text-foreground">
            <span className="text-base leading-none">{selected.flag}</span>
            <span>{selected.name}</span>
          </span>
        ) : (
          <span className="text-[var(--text-dim)]">{t.form.selectCountry}</span>
        )}
        <ChevronDown className="h-3.5 w-3.5 shrink-0 text-[var(--text-muted-input)] transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 border border-[var(--line-dim)] bg-[var(--surface-dropdown)] shadow-2xl">
          {options.map(opt => (
            <button key={opt.code} type="button"
              onClick={() => { onChange(opt.name); setOpen(false) }}
              className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-light transition-colors hover:bg-white/5 ${value === opt.name ? "bg-white/5 text-foreground" : "text-[oklch(0.65_0_0)]"}`}
            >
              <span className="text-base leading-none">{opt.flag}</span>
              <span className="flex-1">{opt.name}</span>
              <span className="text-[9px] tracking-[0.2em] text-[var(--text-dim)] uppercase">{opt.code}</span>
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
  const { t } = useTranslation()
  const MONTHS = t.form.months
  const DAYS = t.form.days

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
                 : "text-sm tracking-wide text-[var(--text-muted-input)] mb-0 mt-4"
        }`}
      >{label}</label>
      <button id={id} type="button" aria-required={required} onClick={() => setOpen(o => !o)}
        className="flex items-center justify-between border-b bg-transparent pb-3 text-sm font-light outline-none text-left transition-colors duration-300"
        style={{ borderBottomColor: open ? "var(--line-focus)" : "var(--line-dim)" }}
      >
        <span className={displayValue ? "text-foreground" : "text-[var(--text-dim)]"}>{displayValue || "DD / MM / YYYY"}</span>
        <ChevronDown className="h-3.5 w-3.5 text-[var(--text-muted-input)]" />
      </button>
      {open && (
        <div className="absolute top-full left-0 z-50 mt-1 w-72 border border-[var(--line-dim)] bg-[oklch(0.1_0_0)] p-4 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <button type="button" onClick={() => setViewDate(d => new Date(d.getFullYear(), d.getMonth()-1, 1))}
              className="flex h-7 w-7 items-center justify-center text-[var(--text-muted-input)] hover:text-foreground transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-xs font-light tracking-[0.2em] text-foreground uppercase">
              {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
            </span>
            <button type="button" onClick={() => setViewDate(d => new Date(d.getFullYear(), d.getMonth()+1, 1))}
              className="flex h-7 w-7 items-center justify-center text-[var(--text-muted-input)] hover:text-foreground transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map((d: string) => <div key={d} className="text-center text-[9px] tracking-wider text-[var(--text-dim)] uppercase py-1">{d}</div>)}
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
                 : "top-4 text-sm tracking-wide text-[var(--text-muted-input)]"
        }`}>{label}</label>
      <input id={id} type="time" value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        className="mt-5 border-b bg-transparent pb-3 text-sm font-light text-foreground outline-none transition-colors duration-300 [color-scheme:dark]"
        style={{ borderBottomColor: focused ? "var(--line-focus)" : "var(--line-dim)" }}
      />
    </div>
  )
}

/* ─── Passenger Stepper ───────────────────────────────────── */
function PassengerStepper({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[9px] font-light tracking-[0.35em] text-[oklch(0.75_0_0/0.5)] uppercase">{t.form.passengers}</span>
      <div className="flex items-center justify-between border-b pb-3" style={{ borderBottomColor: "var(--line-dim)" }}>
        <span className="text-sm font-light text-foreground flex items-center gap-2">
          <Users className="h-3.5 w-3.5 text-[var(--text-muted-input)]" />
          {value} {value === 1 ? t.form.passenger : t.form.passengers}
        </span>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => onChange(Math.max(1, value - 1))} disabled={value <= 1}
            aria-label="Decrease" className="flex h-7 w-7 items-center justify-center border border-[var(--line-dim)] text-[var(--text-muted-input)] transition-all hover:border-[var(--text-muted-input)] hover:text-foreground disabled:opacity-20">
            <Minus className="h-3 w-3" />
          </button>
          <span className="w-4 text-center text-sm font-light tabular-nums">{value}</span>
          <button type="button" onClick={() => onChange(Math.min(15, value + 1))} disabled={value >= 15}
            aria-label="Increase" className="flex h-7 w-7 items-center justify-center border border-[var(--line-dim)] text-[var(--text-muted-input)] transition-all hover:border-[var(--text-muted-input)] hover:text-foreground disabled:opacity-20">
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
export function UniversalBookingForm({ className, compact = false, lockedMode }: { className?: string; compact?: boolean; lockedMode?: "chauffeur" | "rental" }) {
  const { mode, setMode, chauffeur, setChauffeur, rental, setRental } = useBooking()
  const { t } = useTranslation()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const PAYMENT_OPTIONS: { id: PaymentType; label: string; sub: string }[] = [
    { id: "cash100", label: t.form.cashWithDriver, sub: t.form.cashDesc },
    { id: "split50", label: t.form.fiftyFifty,     sub: t.form.fiftyFiftyDesc },
    { id: "card",    label: t.form.cardPayment,     sub: t.form.cardDesc },
  ]

  const VEHICLE_OPTIONS: { id: VehicleClass; label: string; seats: string; models: string }[] = [
    { id: "comfort",  label: t.form.comfort,  seats: "1–7", models: "VW Passat B8 · Skoda Superb L&K · Mercedes-Benz Vito" },
    { id: "business", label: t.form.business, seats: "1–5", models: "Audi A6 S Line · Mercedes-Benz E-Class · BMW 5 Series · Mercedes-Benz GLB" },
    { id: "premium",  label: t.form.premium,  seats: "1–8", models: "Mercedes-Benz V-Class · Audi A8 S Line · Mercedes-Benz Sprinter · Mercedes-Benz S-Class" },
  ]

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
          <p className="text-lg font-extralight tracking-wide text-foreground">{t.form.requestReceived}</p>
          <p className="mt-2 text-sm font-light text-[oklch(0.55_0_0)]">{t.form.confirmBooking}</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-0 ${className ?? ""}`}>

      {/* ── Mode Toggle (hidden when locked to a single mode) ── */}
      {!lockedMode && (
        <div className="flex mb-8 border border-[oklch(0.18_0_0)]">
          {([
            { id: "chauffeur" as const, icon: <Users className="h-3.5 w-3.5" />, label: t.form.carWithDriver },
            { id: "rental"   as const, icon: <Car   className="h-3.5 w-3.5" />, label: t.form.selfDriveRental },
          ] as const).map(opt => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setMode(opt.id)}
              className={`flex flex-1 items-center justify-center gap-2 py-3 text-xs font-light tracking-[0.2em] uppercase transition-all duration-300 ${
                mode === opt.id
                  ? "bg-foreground text-background"
                  : "text-[var(--text-muted-input)] hover:text-foreground"
              }`}
            >
              {opt.icon}
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {/* ── MODE A: Car with Driver ── */}
      {mode === "chauffeur" && (
        <div className="flex flex-col gap-7">
          {/* Name row */}
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
            <FloatInput id="firstName" label={t.form.firstName} required value={chauffeur.firstName} onChange={v => setChauffeur({ firstName: v })} />
            <FloatInput id="lastName"  label={t.form.lastName}  required value={chauffeur.lastName}  onChange={v => setChauffeur({ lastName: v })} />
          </div>

          {/* Contact row */}
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
            <FloatInput id="email" label={t.form.emailAddress} type="email" required value={chauffeur.email} onChange={v => setChauffeur({ email: v })} />
            <FloatInput id="phone" label={t.form.phoneNumber}  type="tel"   required value={chauffeur.phone} onChange={v => setChauffeur({ phone: v })} />
          </div>

          {/* Origin row: city + country */}
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
            <FloatCityInput id="originCity"    label={t.form.originCity}    required value={chauffeur.originCity}    onChange={v => setChauffeur({ originCity: v })} />
            <FloatSelect id="originCountry" label={t.form.originCountry} options={COUNTRIES} required value={chauffeur.originCountry} onChange={v => setChauffeur({ originCountry: v })} />
          </div>

          {/* Destination row: city + country */}
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
            <FloatCityInput id="destinationCity"    label={t.form.destinationCity}    required value={chauffeur.destinationCity}    onChange={v => setChauffeur({ destinationCity: v })} />
            <FloatSelect id="destinationCountry" label={t.form.destinationCountry} options={COUNTRIES} required value={chauffeur.destinationCountry} onChange={v => setChauffeur({ destinationCountry: v })} />
          </div>

          {/* Date + Passengers */}
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
            <FloatDate id="travelDate" label={t.form.travelDate} required value={chauffeur.travelDate} onChange={v => setChauffeur({ travelDate: v })} />
            <PassengerStepper value={chauffeur.passengers} onChange={v => setChauffeur({ passengers: v })} />
          </div>

          {/* Payment method */}
          <div className="flex flex-col gap-3">
            <span className="text-[9px] font-light tracking-[0.35em] text-[oklch(0.75_0_0/0.5)] uppercase">{t.form.paymentMethod}</span>
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
                  <span className="text-[10px] font-light text-[var(--text-muted-input)]">{opt.sub}</span>
                  {chauffeur.paymentType === opt.id && (
                    <Check className="mt-1 h-3 w-3 text-[oklch(0.75_0_0)]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle class */}
          <div className="flex flex-col gap-3">
            <span className="text-[9px] font-light tracking-[0.35em] text-[oklch(0.75_0_0/0.5)] uppercase">{t.form.vehicleClass}</span>
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
                  <span className="text-[10px] font-light text-[var(--text-muted-input)]">{opt.seats} pax</span>
                  <span className="text-[10px] font-light leading-relaxed text-[oklch(0.38_0_0)] mt-0.5">{opt.models}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Special requests */}
          <div className="flex flex-col gap-2">
            <label htmlFor="specialRequests"
              className="text-[9px] font-light tracking-[0.35em] text-[oklch(0.75_0_0/0.5)] uppercase select-none"
            >{t.form.specialRequests}</label>
            <textarea
              id="specialRequests"
              rows={3}
              value={chauffeur.specialRequests}
              onChange={e => setChauffeur({ specialRequests: e.target.value })}
              placeholder={t.form.specialRequestsPlaceholder}
              className="resize-none border border-[var(--line-dim)] bg-[var(--surface-input)] px-4 py-3 text-sm font-light text-foreground outline-none placeholder:text-[var(--text-dim)] transition-colors focus:border-[var(--text-dim)]"
            />
          </div>
        </div>
      )}

      {/* ── MODE B: Self-Drive Rental ── */}
      {mode === "rental" && (
        <div className="flex flex-col gap-7">
          {/* City */}
          <FloatCityInput id="rentalCity" label={t.form.originCity} required value={rental.city} onChange={v => setRental({ city: v })} />

          {/* Pickup row */}
          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-light tracking-[0.35em] text-[oklch(0.75_0_0/0.5)] uppercase">{t.form.pickup}</span>
            <div className="grid grid-cols-2 gap-6 border border-[var(--line-dim)] p-4">
              <FloatDate id="pickupDate" label={t.form.date} required value={rental.pickupDate} onChange={v => setRental({ pickupDate: v })} />
              <TimeInput id="pickupTime" label={t.form.time} value={rental.pickupTime} onChange={v => setRental({ pickupTime: v })} />
            </div>
          </div>

          {/* Return row */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-light tracking-[0.35em] text-[oklch(0.75_0_0/0.5)] uppercase">{t.form.return}</span>
              {duration && (
                <span className="text-[10px] font-light tracking-[0.2em] text-[oklch(0.55_0_0)] uppercase">
                  {t.form.rentalDuration} {duration}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-6 border border-[var(--line-dim)] p-4">
              <FloatDate id="returnDate" label={t.form.date} required value={rental.returnDate} onChange={v => setRental({ returnDate: v })} />
              <TimeInput id="returnTime" label={t.form.time} value={rental.returnTime} onChange={v => setRental({ returnTime: v })} />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex flex-col gap-3">
            {[
              { key: "sameLocation" as const, label: t.form.returnSameLocation },
            ].map(item => (
              <label key={item.key} className="flex cursor-pointer items-center gap-3 group">
                <span
                  onClick={() => setRental({ [item.key]: !rental[item.key] })}
                  className={`flex h-4 w-4 shrink-0 items-center justify-center border transition-all duration-200 cursor-pointer ${
                    rental[item.key] ? "border-[oklch(0.75_0_0/0.6)] bg-foreground" : "border-[var(--line-dim)] group-hover:border-[var(--text-muted-input)]"
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
        className="mt-10 flex w-full items-center justify-center gap-3 px-8 py-4 text-xs font-light tracking-[0.25em] uppercase transition-all duration-300 hover:opacity-85 disabled:opacity-40"
        style={{ background: "var(--cta-bg)", color: "var(--cta-fg)" }}
      >
        {loading ? (
          <span className="h-4 w-4 animate-spin rounded-full border border-white/40 border-t-white" />
        ) : (
          <Send className="h-3.5 w-3.5" />
        )}
        {mode === "chauffeur" ? t.form.bookNow : t.form.searchAvailability}
      </button>

    </form>
  )
}
