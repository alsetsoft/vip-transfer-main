'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Clock, Route as RouteIcon, ShieldCheck, Globe, Car, Info } from 'lucide-react'
import { useTranslation } from '@/lib/language-context'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { RouteBookingModal, type RouteModalData } from '@/components/route-booking-modal'
import { RouteDetailBlocks } from '@/components/route-detail-blocks'
import { UniversalBookingForm } from '@/components/universal-booking-form'

const ROUTES = [
  {
    id: 'kyiv',
    cityKey: 'kyiv' as const,
    countryKey: 'ukraine' as const,
    code: 'KBP',
    image: '/images/city-kyiv.jpg',
    distance: '780 km',
    duration: '~8–9 h',
    connections: ['Warsaw', 'Berlin', 'Prague'],
    index: '01',
    border: 'Medyka–Shehyni',
    borderType: 'Road — EU Schengen',
    highlights: ['Direct highway A4', 'No city traffic', 'Comfort stops every 2–3 h'],
  },
  {
    id: 'berlin',
    cityKey: 'berlin' as const,
    countryKey: 'germany' as const,
    code: 'BER',
    image: '/images/city-berlin.jpg',
    distance: '570 km',
    duration: '~5–6 h',
    connections: ['Warsaw', 'Prague', 'Vienna'],
    index: '02',
    border: 'Świecko–Frankfurt (Oder)',
    borderType: 'Road — EU Internal',
    highlights: ['Autobahn A2 direct', 'No border formalities', 'Express lane available'],
  },
  {
    id: 'prague',
    cityKey: 'prague' as const,
    countryKey: 'czech' as const,
    code: 'PRG',
    image: '/images/city-prague.jpg',
    distance: '630 km',
    duration: '~6–7 h',
    connections: ['Warsaw', 'Berlin', 'Vienna'],
    index: '03',
    border: 'Kudowa-Zdrój–Náchod',
    borderType: 'Road — EU Internal (Schengen)',
    highlights: ['Scenic Sudeten route', 'No border checks', 'Highway D11 from Hradec Králové'],
  },
  {
    id: 'vienna',
    cityKey: 'vienna' as const,
    countryKey: 'austria' as const,
    code: 'VIE',
    image: '/images/city-vienna.jpg',
    distance: '680 km',
    duration: '~6–7 h',
    connections: ['Warsaw', 'Prague', 'Budapest'],
    index: '04',
    border: 'Cieszyn–Český Těšín / Bratislava bypass',
    borderType: 'Road — EU Internal (Schengen)',
    highlights: ['A1 motorway via Bratislava', 'No border delays', 'Multiple comfort stops'],
  },
  {
    id: 'budapest',
    cityKey: 'budapest' as const,
    countryKey: 'hungary' as const,
    code: 'BUD',
    image: '/images/city-budapest.jpg',
    distance: '690 km',
    duration: '~7–8 h',
    connections: ['Warsaw', 'Vienna', 'Prague'],
    index: '05',
    border: 'Cieszyn–Český Těšín / Rajka',
    borderType: 'Road — EU Internal (Schengen)',
    highlights: ['Via Bratislava or Brno', 'No passport control', 'M1 motorway to Budapest'],
  },
]

const BORDER_CROSSINGS = [
  {
    name: 'Medyka–Shehyni',
    countries: 'Poland ↔ Ukraine',
    type: 'Road',
    hours: '24 / 7',
    lanes: 'Passenger cars, buses, VIP priority',
    note: 'Highest-capacity Ukraine–EU crossing. Our drivers use dedicated fast-track lanes.',
    flag: '🇵🇱↔🇺🇦',
    schengen: false,
  },
  {
    name: 'Dorohusk–Jagodyn',
    countries: 'Poland ↔ Ukraine',
    type: 'Road + Rail',
    hours: '24 / 7',
    lanes: 'Cars, heavy goods, rail',
    note: 'Alternative eastern corridor — lower traffic volume, often faster at peak times.',
    flag: '🇵🇱↔🇺🇦',
    schengen: false,
  },
  {
    name: 'Korczowa–Krakovets',
    countries: 'Poland ↔ Ukraine',
    type: 'Road',
    hours: '24 / 7',
    lanes: 'Passenger & freight',
    note: 'Key southern checkpoint on the A4 motorway axis — direct route from Kraków.',
    flag: '🇵🇱↔🇺🇦',
    schengen: false,
  },
  {
    name: 'Hrebenne–Rava-Ruska',
    countries: 'Poland ↔ Ukraine',
    type: 'Road',
    hours: '24 / 7',
    lanes: 'Passenger cars',
    note: 'Quieter crossing south of Zamość. Good alternative when Medyka has long queues.',
    flag: '🇵🇱↔🇺🇦',
    schengen: false,
  },
  {
    name: 'Świecko–Frankfurt (Oder)',
    countries: 'Poland ↔ Germany',
    type: 'Road (A2)',
    hours: '24 / 7',
    lanes: 'Schengen — no passport control',
    note: 'Main motorway crossing to Berlin. Zero border formalities for EU travellers.',
    flag: '🇵🇱↔🇩🇪',
    schengen: true,
  },
  {
    name: 'Kudowa-Zdrój–Náchod',
    countries: 'Poland ↔ Czech Republic',
    type: 'Road',
    hours: '24 / 7',
    lanes: 'Schengen — no passport control',
    note: 'Southern route through the Sudeten mountains toward Prague via D11.',
    flag: '🇵🇱↔🇨🇿',
    schengen: true,
  },
  {
    name: 'Cieszyn–Český Těšín',
    countries: 'Poland ↔ Czech Republic',
    type: 'Road',
    hours: '24 / 7',
    lanes: 'Schengen — no passport control',
    note: 'Gateway to Ostrava, Brno, Vienna, and Budapest via Bratislava.',
    flag: '🇵🇱↔🇨🇿',
    schengen: true,
  },
  {
    name: 'Rajka (via Slovakia)',
    countries: 'Slovakia ↔ Hungary',
    type: 'Road (M15)',
    hours: '24 / 7',
    lanes: 'Schengen — no passport control',
    note: 'Final crossing before Budapest. Part of the Warsaw–Vienna–Budapest corridor.',
    flag: '🇸🇰↔🇭🇺',
    schengen: true,
  },
]

export default function RoutesPage() {
  const { t } = useTranslation()
  const [hovered, setHovered] = useState<string | null>(null)
  const [selectedRoute, setSelectedRoute] = useState<RouteModalData | null>(null)

  const warsawRoute: RouteModalData = {
    city: t.routes.warsaw,
    country: t.routes.poland,
    code: 'WAW',
    image: '/images/city-warsaw.jpg',
    distance: t.routes.hub,
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ── HERO: Warsaw full-bleed ─────────────────────── */}
      <section className="relative h-[100svh] overflow-hidden">
        <Image
          src="/images/city-warsaw.jpg"
          alt="Warsaw"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-[0.40]"
        />
        {/* gradient: fade bottom to background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

        {/* top-left label */}
        <div className="absolute top-36 left-4 sm:left-8 lg:left-16">
          <p className="text-[10px] font-light tracking-[0.45em] text-silver/50 uppercase mb-2">
            {t.routes.label}
          </p>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-silver/30" />
            <span className="text-[10px] font-light tracking-[0.3em] text-silver/40 uppercase">
              {t.routes.hub} — WAW
            </span>
          </div>
        </div>

        {/* bottom-left: hero text */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-16 sm:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-[clamp(3.5rem,12vw,9rem)] font-extralight leading-[0.9] tracking-tight">
                {t.routes.warsaw}
              </h1>
              <p className="mt-4 text-sm font-light text-silver/50 tracking-widest uppercase">
                {t.routes.poland} &mdash; Central Hub
              </p>
            </div>
            <button
              onClick={() => setSelectedRoute(warsawRoute)}
              className="mb-1 self-end sm:self-auto flex items-center gap-3 border border-foreground/25 bg-foreground/10 px-6 py-3 text-xs font-light tracking-[0.25em] text-foreground/80 uppercase backdrop-blur-sm transition-all duration-300 hover:bg-foreground hover:text-background"
            >
              {t.nav.bookNow}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── ROUTES LIST ────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">

        {/* Section label */}
        <div className="flex items-center gap-4 py-14 border-b border-border/20">
          <span className="text-[10px] font-light tracking-[0.4em] text-silver/40 uppercase">
            {t.routes.title1}
          </span>
          <span className="h-px flex-1 bg-border/20" />
          <span className="text-[10px] font-light tracking-[0.4em] text-silver/40 uppercase">
            {ROUTES.length} {t.routes.title2 ?? 'Destinations'}
          </span>
        </div>

        {/* Route rows */}
        <div>
          {ROUTES.map((route) => {
            const city = t.routes[route.cityKey]
            const country = t.routes[route.countryKey]
            const isHovered = hovered === route.id

            return (
              <button
                key={route.id}
                className="group relative w-full border-b border-border/20 transition-colors duration-300 hover:border-border/40"
                onMouseEnter={() => setHovered(route.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() =>
                  setSelectedRoute({ city, country, code: route.code, image: route.image, distance: route.distance })
                }
                aria-label={`Book transfer to ${city}`}
              >
                {/* Background image — slides in on hover */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  aria-hidden="true"
                >
                  <Image
                    src={route.image}
                    alt={city}
                    fill
                    sizes="100vw"
                    className={`object-cover brightness-[0.18] transition-all duration-700 ease-in-out ${
                      isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                    }`}
                  />
                  {isHovered && (
                    <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/30 to-transparent" />
                  )}
                </div>

                {/* Row content */}
                <div className="relative flex items-center gap-4 py-8 sm:gap-8 sm:py-10">

                  {/* Index */}
                  <span className={`w-10 shrink-0 text-right text-[11px] font-light transition-colors duration-300 ${isHovered ? 'text-silver/60' : 'text-border/50'}`}>
                    {route.index}
                  </span>

                  {/* City name */}
                  <h2
                    className={`flex-1 text-left text-[clamp(2rem,6vw,4.5rem)] font-extralight leading-none tracking-tight transition-all duration-300 ${
                      isHovered ? 'text-foreground translate-x-1' : 'text-foreground/70'
                    }`}
                  >
                    {city}
                  </h2>

                  {/* Stats — desktop */}
                  <div className="hidden sm:flex items-center gap-8">
                    <div className="flex items-center gap-2 text-xs font-light text-muted-foreground/60">
                      <RouteIcon className={`h-3.5 w-3.5 transition-colors duration-300 ${isHovered ? 'text-silver/60' : 'text-border/50'}`} />
                      {route.distance}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-light text-muted-foreground/60">
                      <Clock className={`h-3.5 w-3.5 transition-colors duration-300 ${isHovered ? 'text-silver/60' : 'text-border/50'}`} />
                      {route.duration}
                    </div>
                    <div className={`hidden lg:flex items-center gap-2 text-xs font-light transition-colors duration-300 ${isHovered ? 'text-silver/50' : 'text-border/40'}`}>
                      <Globe className="h-3.5 w-3.5" />
                      {route.border}
                    </div>
                  </div>

                  {/* Country + code */}
                  <div className="hidden lg:flex flex-col items-end gap-0.5">
                    <span className={`text-[10px] font-light tracking-[0.3em] uppercase transition-colors duration-300 ${isHovered ? 'text-silver/60' : 'text-border/40'}`}>
                      {route.code}
                    </span>
                    <span className={`text-xs font-light transition-colors duration-300 ${isHovered ? 'text-muted-foreground' : 'text-border/40'}`}>
                      {country}
                    </span>
                  </div>

                  {/* Arrow */}
                  <div
                    className={`ml-2 shrink-0 flex h-9 w-9 items-center justify-center border transition-all duration-500 ${
                      isHovered
                        ? 'border-foreground bg-foreground text-background'
                        : 'border-border/30 text-border/40 rotate-45'
                    }`}
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* ── ROUTE DETAIL BLOCKS (comparison, benefits, FAQ) ── */}
      {/*
        Uses Warsaw → Kyiv as the representative "featured route" since Warsaw
        is the hub city shown in the hero. Each route's origin/destination and
        distance is pulled from the ROUTES array for the first destination.
      */}
      <RouteDetailBlocks
        origin="Warsaw"
        destination="Kyiv"
        distanceKm={780}
      />

      {/* ── WHAT TO EXPECT CARDS ───────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8 lg:px-16">
        <div className="flex items-center gap-4 mb-12">
          <span className="text-[10px] font-light tracking-[0.4em] text-silver/40 uppercase shrink-0">
            What to Expect
          </span>
          <span className="h-px flex-1 bg-border/20" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Car className="h-5 w-5" />,
              title: 'Door-to-Door Pickup',
              desc: 'Your chauffeur arrives at your exact address — home, office, hotel. No taxi ranks, no waiting at a station.',
            },
            {
              icon: <ShieldCheck className="h-5 w-5" />,
              title: 'Document Pre-Check',
              desc: 'We verify passports, visas, green cards, and customs documents before departure so there are zero surprises at the border.',
            },
            {
              icon: <Globe className="h-5 w-5" />,
              title: 'Border Fast-Track',
              desc: 'Our drivers know every crossing, every lane, and every officer protocol — minimising wait times for you.',
            },
            {
              icon: <Info className="h-5 w-5" />,
              title: 'Live ETA Updates',
              desc: 'You receive live WhatsApp / Telegram updates throughout the journey: departure, border, arrival, delays.',
            },
          ].map((item) => (
            <div key={item.title} className="border border-border/20 p-6 flex flex-col gap-4 group hover:border-border/40 transition-colors duration-300">
              <div className="text-silver/40 group-hover:text-silver/70 transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="text-sm font-light tracking-wide text-foreground/80">{item.title}</h3>
              <p className="text-xs font-light leading-relaxed text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BORDER CROSSINGS ───────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8 lg:px-16">
        <div className="flex items-center gap-4 mb-12">
          <span className="text-[10px] font-light tracking-[0.4em] text-silver/40 uppercase shrink-0">
            Border Checkpoints
          </span>
          <span className="h-px flex-1 bg-border/20" />
          <span className="text-[10px] font-light tracking-[0.4em] text-silver/30 uppercase shrink-0">
            {BORDER_CROSSINGS.length} crossings
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/10">
          {BORDER_CROSSINGS.map((bc) => (
            <div
              key={bc.name}
              className="bg-background p-6 sm:p-8 flex flex-col gap-3 group hover:bg-card/40 transition-colors duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-base font-light text-foreground/85 tracking-wide">{bc.name}</p>
                  <p className="text-[11px] font-light tracking-[0.2em] text-silver/40 uppercase mt-0.5">
                    {bc.countries}
                  </p>
                </div>
                <span
                  className={`shrink-0 mt-0.5 px-2 py-0.5 text-[9px] font-light tracking-[0.25em] uppercase border ${
                    bc.schengen
                      ? 'border-emerald-800/40 text-emerald-500/70'
                      : 'border-amber-800/40 text-amber-400/70'
                  }`}
                >
                  {bc.schengen ? 'Schengen' : 'Ext. Border'}
                </span>
              </div>

              {/* Meta row */}
              <div className="flex flex-wrap gap-x-6 gap-y-1">
                <span className="flex items-center gap-1.5 text-xs font-light text-muted-foreground/50">
                  <RouteIcon className="h-3 w-3" />
                  {bc.type}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-light text-muted-foreground/50">
                  <Clock className="h-3 w-3" />
                  {bc.hours}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-light text-muted-foreground/50">
                  <Car className="h-3 w-3" />
                  {bc.lanes}
                </span>
              </div>

              {/* Note */}
              <p className="text-xs font-light leading-relaxed text-muted-foreground/60 border-t border-border/10 pt-3">
                {bc.note}
              </p>
            </div>
          ))}
        </div>

        {/* Schengen legend */}
        <div className="mt-6 flex flex-wrap gap-6 text-[11px] font-light text-muted-foreground/40">
          <span className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-sm border border-emerald-800/40 bg-emerald-950/30" />
            Schengen Zone — no passport control
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-sm border border-amber-800/40 bg-amber-950/30" />
            External EU Border — passport &amp; customs required
          </span>
        </div>
      </section>

      {/* ── CUSTOM ROUTES BANNER ───────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-8 lg:px-16">
        <div className="relative overflow-hidden border border-border/25 p-8 sm:p-14">
          {/* subtle grid bg */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, oklch(0.75 0 0) 0px, oklch(0.75 0 0) 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, oklch(0.75 0 0) 0px, oklch(0.75 0 0) 1px, transparent 1px, transparent 60px)',
            }}
          />
          <div className="relative flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <p className="mb-3 text-[10px] font-light tracking-[0.4em] text-silver/40 uppercase">
                Custom Routes
              </p>
              <p className="text-base font-light leading-relaxed text-muted-foreground">
                {t.routes.note}
              </p>
            </div>
            <a
              href="/#booking"
              className="inline-flex shrink-0 items-center gap-3 border border-foreground bg-foreground px-8 py-4 text-xs font-light tracking-[0.25em] text-background uppercase transition-all duration-300 hover:bg-transparent hover:text-foreground"
            >
              {t.nav.bookNow}
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ── BOOKING FORM ─────────────────────────────────── */}
      <section id="booking" className="mx-auto max-w-7xl px-4 py-16 sm:px-8 lg:px-16">
        <div className="flex items-center gap-4 mb-12">
          <span className="text-[10px] font-light tracking-[0.4em] text-silver/40 uppercase shrink-0">Book Your Transfer</span>
          <span className="h-px flex-1 bg-border/20" />
        </div>
        <div className="max-w-2xl">
          <UniversalBookingForm />
        </div>
      </section>

      <Footer />

      <RouteBookingModal route={selectedRoute} onClose={() => setSelectedRoute(null)} />
    </div>
  )
}
