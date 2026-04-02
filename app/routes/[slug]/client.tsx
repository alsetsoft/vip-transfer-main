"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  MapPin, Clock, Route, ChevronDown, ChevronRight,
  ArrowRight, Shield, Wifi, Users, Briefcase, Car, Star,
} from "lucide-react"
import { useTranslation } from "@/lib/language-context"
import { useBooking } from "@/lib/booking-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { UniversalBookingForm } from "@/components/universal-booking-form"
import type { RouteData, FLEET_VEHICLES as FleetType } from "@/lib/routes-data"

type Locale = "en" | "pl"

function t<T extends Record<string, string>>(obj: T, locale: string): string {
  return (obj as Record<string, string>)[locale === "pl" ? "pl" : "en"] ?? (obj as Record<string, string>)["en"]
}

/* ─── Advantage Icons ────────────────────────────────────────── */
const ADV_ICONS = [Shield, Users, Car, Clock, Star, ChevronRight]

/* ─── Client page ────────────────────────────────────────────── */
export function RoutePageClient({
  route,
  relatedRoutes,
  fleet,
}: {
  route: RouteData
  relatedRoutes: RouteData[]
  fleet: typeof FleetType
}) {
  const { locale } = useTranslation()
  const { t: ui } = useTranslation()
  const loc = locale as Locale
  const { setMode, setChauffeur } = useBooking()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const from = t(route.from, loc)
  const to = t(route.to, loc)
  const duration = t(route.duration, loc)
  const description = t(route.description, loc)
  const advantages = loc === "pl" ? route.advantages.pl : route.advantages.en
  const faqs = route.faq.map(f => ({
    q: t(f.q, loc),
    a: t(f.a, loc),
  }))

  const handleBook = () => {
    setMode("chauffeur")
    setChauffeur({ originCity: route.from.en, destinationCity: route.to.en })
    document.getElementById("route-booking")?.scrollIntoView({ behavior: "smooth" })
  }

  const labels = {
    en: {
      bookNow: "Book This Transfer",
      distance: "Distance",
      travelTime: "Travel time",
      routeDesc: "Route Overview",
      advantages: "Why Choose Movi Transfer",
      fleet: "Available Fleet",
      fleetDesc: "Every vehicle in our fleet is late-model, fully insured, and equipped with Wi-Fi, climate control, and refreshments.",
      otherRoutes: "Other Popular Routes",
      faq: "Frequently Asked Questions",
      pax: "pax",
      luggage: "bags",
      viewRoute: "View route",
      bookTransfer: "Book Your Transfer",
      breadHome: "Home",
      breadRoutes: "Routes",
    },
    pl: {
      bookNow: "Zarezerwuj ten transfer",
      distance: "Dystans",
      travelTime: "Czas podróży",
      routeDesc: "Opis trasy",
      advantages: "Dlaczego Movi Transfer",
      fleet: "Dostępna flota",
      fleetDesc: "Każdy pojazd w naszej flocie jest z ostatnich roczników, w pełni ubezpieczony i wyposażony w Wi-Fi, klimatyzację i napoje.",
      otherRoutes: "Inne popularne trasy",
      faq: "Najczęściej zadawane pytania",
      pax: "os.",
      luggage: "walizki",
      viewRoute: "Zobacz trasę",
      bookTransfer: "Zarezerwuj transfer",
      breadHome: "Strona główna",
      breadRoutes: "Trasy",
    },
  }
  const l = labels[loc] ?? labels.en

  const classLabels: Record<string, string> = {
    comfort: "Comfort",
    business: "Business",
    premium: "Premium",
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ═══ 1. HERO ═══════════════════════════════════════════ */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <Image
          src={route.heroImage}
          alt={`${from} → ${to}`}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 pt-32 sm:px-6 lg:px-12">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-[11px] font-light tracking-wider text-silver/60">
            <Link href="/" className="hover:text-foreground transition-colors">{l.breadHome}</Link>
            <span>/</span>
            <Link href="/routes" className="hover:text-foreground transition-colors">{l.breadRoutes}</Link>
            <span>/</span>
            <span className="text-foreground">{from} → {to}</span>
          </nav>

          {/* Route badge */}
          <div className="mb-4 inline-flex items-center gap-2 border border-border/30 bg-background/60 backdrop-blur-md px-4 py-2">
            <span className="text-[10px] font-light tracking-[0.3em] text-silver uppercase">{route.fromCountry}</span>
            <ArrowRight className="h-3 w-3 text-silver/50" />
            <span className="text-[10px] font-light tracking-[0.3em] text-silver uppercase">{route.toCountry}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-extralight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {from} <span className="text-silver">→</span> {to}
          </h1>

          {/* Stats row */}
          <div className="mt-6 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <Route className="h-4 w-4 text-silver/60" />
              <span className="text-sm font-light text-muted-foreground">{l.distance}: <strong className="text-foreground font-normal">{route.distanceKm} km</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-silver/60" />
              <span className="text-sm font-light text-muted-foreground">{l.travelTime}: <strong className="text-foreground font-normal">{duration}</strong></span>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleBook}
            className="mt-8 inline-flex items-center gap-3 border border-foreground bg-foreground px-8 py-4 text-xs font-light tracking-[0.25em] text-background uppercase transition-all duration-300 hover:bg-transparent hover:text-foreground"
          >
            <MapPin className="h-3.5 w-3.5" />
            {l.bookNow}
          </button>
        </div>
      </section>

      {/* ═══ 2. ROUTE DESCRIPTION ══════════════════════════════ */}
      <section className="py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-12 bg-silver/40" />
                <span className="text-[11px] font-light tracking-[0.4em] text-silver uppercase">{l.routeDesc}</span>
              </div>
              <h2 className="text-3xl font-extralight tracking-tight text-foreground md:text-4xl">
                {from} → {to}
              </h2>
              <p className="mt-2 text-sm font-light text-muted-foreground">
                {route.distanceKm} km · {duration}
              </p>
            </div>
            <div>
              <p className="text-base font-light leading-relaxed text-muted-foreground lg:text-lg">
                {description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 3. ADVANTAGES ═════════════════════════════════════ */}
      <section className="py-12 lg:py-20 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-10">
            <span className="h-px w-12 bg-silver/40" />
            <span className="text-[11px] font-light tracking-[0.4em] text-silver uppercase">{l.advantages}</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {advantages.map((adv, i) => {
              const Icon = ADV_ICONS[i % ADV_ICONS.length]
              return (
                <div
                  key={i}
                  className="flex items-start gap-4 border border-border/20 bg-background/50 p-6 transition-colors hover:border-border/40"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-border/30">
                    <Icon className="h-4 w-4 text-silver/60" />
                  </div>
                  <p className="text-sm font-light leading-relaxed text-muted-foreground">{adv}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ 4. FLEET ══════════════════════════════════════════ */}
      <section className="py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-3">
            <span className="h-px w-12 bg-silver/40" />
            <span className="text-[11px] font-light tracking-[0.4em] text-silver uppercase">{l.fleet}</span>
          </div>
          <p className="mb-10 max-w-xl text-sm font-light text-muted-foreground">{l.fleetDesc}</p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fleet.map(car => (
              <Link
                key={car.id}
                href={`/fleet/${car.id}`}
                className="group border border-border/20 bg-card/20 transition-all hover:border-border/40"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-background">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 text-[9px] font-light tracking-[0.3em] text-silver/60 uppercase border border-border/30 px-2.5 py-1 bg-background/80 backdrop-blur-sm">
                    {classLabels[car.classKey]}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-sm font-light tracking-wide text-foreground">{car.name}</h3>
                  <div className="mt-2 flex items-center gap-4 text-[11px] font-light text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Users className="h-3 w-3" /> {car.pax} {l.pax}</span>
                    <span className="flex items-center gap-1.5"><Briefcase className="h-3 w-3" /> {car.luggage} {l.luggage}</span>
                    <span className="flex items-center gap-1.5"><Wifi className="h-3 w-3" /> Wi-Fi</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. OTHER ROUTES ═══════════════════════════════════ */}
      {relatedRoutes.length > 0 && (
        <section className="py-12 lg:py-20 bg-card/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
            <div className="flex items-center gap-4 mb-10">
              <span className="h-px w-12 bg-silver/40" />
              <span className="text-[11px] font-light tracking-[0.4em] text-silver uppercase">{l.otherRoutes}</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {relatedRoutes.slice(0, 6).map(r => {
                const rFrom = t(r.from, loc)
                const rTo = t(r.to, loc)
                return (
                  <Link
                    key={r.slug}
                    href={`/routes/${r.slug}`}
                    className="group flex items-center justify-between border border-border/20 bg-background/50 px-6 py-5 transition-all hover:border-border/40"
                  >
                    <div>
                      <h3 className="text-sm font-light text-foreground">
                        {rFrom} → {rTo}
                      </h3>
                      <p className="mt-1 text-[11px] font-light text-muted-foreground">
                        {r.distanceKm} km · {t(r.duration, loc)}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-border/40 transition-colors group-hover:text-silver" />
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══ 6. FAQ ════════════════════════════════════════════ */}
      <section className="py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
            {/* Left */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-12 bg-silver/40" />
                <span className="text-[11px] font-light tracking-[0.4em] text-silver uppercase">{l.faq}</span>
              </div>
              <h2 className="text-3xl font-extralight tracking-tight text-foreground md:text-4xl">
                {from} → {to}
              </h2>
            </div>

            {/* Right — Accordion */}
            <div className="flex flex-col">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-border/30 first:border-t first:border-border/30">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="group flex w-full items-center justify-between py-6 text-left"
                    aria-expanded={openFaq === i}
                  >
                    <span className={`flex items-center gap-4 text-sm font-light tracking-wide transition-colors ${openFaq === i ? "text-foreground" : "text-muted-foreground"} group-hover:text-foreground`}>
                      <span className="text-[10px] font-light text-faint tabular-nums w-5">{String(i + 1).padStart(2, "0")}</span>
                      {faq.q}
                    </span>
                    <ChevronDown className={`h-4 w-4 shrink-0 text-hint transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`grid transition-all duration-300 ease-in-out ${openFaq === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <p className="pb-6 pl-9 text-sm font-light leading-relaxed text-muted-foreground">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 7. BOOKING FORM ═══════════════════════════════════ */}
      <section id="route-booking" className="py-12 lg:py-20 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-12 bg-silver/40" />
                <span className="text-[11px] font-light tracking-[0.4em] text-silver uppercase">{l.bookTransfer}</span>
              </div>
              <h2 className="text-3xl font-extralight tracking-tight text-foreground md:text-4xl">
                {from} <span className="text-silver">→</span> {to}
              </h2>
              <p className="mt-4 text-sm font-light text-muted-foreground">
                {route.distanceKm} km · {duration}
              </p>
              <div className="mt-8 flex flex-col gap-3 border-t border-border/40 pt-6">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-light tracking-[0.3em] text-hint uppercase w-20">{ui.booking.phone}</span>
                  <a href="tel:+4930123456789" className="text-sm font-light text-foreground hover:text-silver transition-colors">+49 30 1234 5678</a>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-light tracking-[0.3em] text-hint uppercase w-20">Email</span>
                  <a href="mailto:reservations@movitransfer.eu" className="text-sm font-light text-foreground hover:text-silver transition-colors">reservations@movitransfer.eu</a>
                </div>
              </div>
            </div>
            <div>
              <UniversalBookingForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
