'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowRight, Clock, Route as RouteIcon, ShieldCheck, Globe, Car, Info } from 'lucide-react'
import { useTranslation } from '@/lib/language-context'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { RouteDetailBlocks } from '@/components/route-detail-blocks'
import { UniversalBookingForm } from '@/components/universal-booking-form'

const ROUTES = [
  {
    id: 'zurich',
    cityKey: 'zurich' as const,
    countryKey: 'switzerland' as const,
    code: 'ZRH',
    image: '/images/city-zurich.jpg',
    distance: '1 080 km',
    duration: '~10–11 h',
    connections: ['Warsaw', 'Berlin', 'Vienna'],
    index: '01',
    border: 'Basel–Weil am Rhein',
    borderType: 'Road — Schengen Associated',
    highlights: ['Via Autobahn A5 & A3', 'Scenic Alpine approach', 'Comfort stops every 2–3 h'],
    slug: 'warsaw-zurich',
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
    slug: 'warsaw-berlin',
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
    slug: 'warsaw-prague',
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
    slug: 'warsaw-vienna',
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
    slug: 'warsaw-budapest',
  },
]

export default function RoutesPage() {
  const { t } = useTranslation()
  const router = useRouter()

  const handleRouteClick = (slug: string) => {
    router.push(`/routes/${slug}`)
  }

  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ── HERO: Split layout ─────────────────────────── */}
      <section className="relative min-h-[100svh] overflow-hidden">
        {/* Background — subtle texture */}
        <div className="absolute inset-0 bg-background" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, currentColor 0px, currentColor 1px, transparent 1px, transparent 80px), repeating-linear-gradient(90deg, currentColor 0px, currentColor 1px, transparent 1px, transparent 80px)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
          <div className="grid min-h-[100svh] items-center gap-8 pt-28 pb-16 lg:grid-cols-2 lg:gap-16 lg:pt-32 lg:pb-20">

            {/* Left — text content */}
            <div className="flex flex-col">
              <div className="mb-6 inline-flex items-center gap-3">
                <span className="h-px w-10 bg-silver" />
                <span className="text-[10px] font-light tracking-[0.4em] text-silver uppercase">
                  {t.routes.label}
                </span>
              </div>

              <h1 className="text-3xl font-extralight leading-[1.08] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                {t.routes.title1}
                <br />
                <span className="text-silver">{t.routes.title2}</span>
              </h1>

              <p className="mt-6 max-w-md text-base font-light leading-relaxed text-muted-foreground">
                {t.routes.description}
              </p>

              {/* Stats row */}
              <div className="mt-10 flex gap-8 border-t border-border/30 pt-8">
                <div>
                  <span className="text-3xl font-extralight text-foreground">{ROUTES.length}</span>
                  <p className="mt-1 text-[10px] font-light tracking-[0.25em] text-muted-foreground uppercase">{t.routes.title2}</p>
                </div>
                <div className="h-14 w-px bg-border/30" />
                <div>
                  <span className="text-3xl font-extralight text-foreground">6</span>
                  <p className="mt-1 text-[10px] font-light tracking-[0.25em] text-muted-foreground uppercase">{t.routesPage.countries}</p>
                </div>
                <div className="h-14 w-px bg-border/30" />
                <div>
                  <span className="text-3xl font-extralight text-foreground">24/7</span>
                  <p className="mt-1 text-[10px] font-light tracking-[0.25em] text-muted-foreground uppercase">{t.routesPage.support}</p>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#routes-list"
                  className="inline-flex items-center gap-3 bg-foreground px-8 py-4 text-xs font-light tracking-[0.25em] text-background uppercase transition-all duration-300 hover:opacity-90"
                >
                  {t.routes.label}
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <button
                  onClick={() => handleRouteClick('warsaw-berlin')}
                  className="inline-flex items-center gap-3 border border-border px-8 py-4 text-xs font-light tracking-[0.25em] text-foreground uppercase transition-all duration-300 hover:border-foreground/50"
                >
                  {t.routes.hub} — {t.routes.warsaw}
                </button>
              </div>
            </div>

            {/* Right — featured city image */}
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[3/4] lg:aspect-[4/5]">
                <Image
                  src="/images/city-warsaw.jpg"
                  alt="Warsaw"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                {/* Overlay badge */}
                <div className="absolute top-6 left-6 border border-white/20 bg-black/40 px-4 py-2 backdrop-blur-sm">
                  <span className="text-[10px] font-light tracking-[0.3em] text-white/80 uppercase">{t.routes.hub}</span>
                </div>

                {/* Bottom text on image */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <h2 className="text-4xl font-extralight tracking-tight text-white sm:text-5xl">
                    {t.routes.warsaw}
                  </h2>
                  <p className="mt-2 text-sm font-light text-white/60 tracking-widest uppercase">
                    {t.routes.poland} &mdash; WAW
                  </p>
                </div>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute -bottom-3 -right-3 h-24 w-24 border border-border/30 hidden lg:block" />
            </div>
          </div>
        </div>
      </section>

      {/* ── ROUTES LIST ────────────────────────────────── */}
      <section id="routes-list" className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">

        {/* Section label */}
        <div className="flex items-center gap-4 py-14 border-b border-border/20">
          <span className="text-[10px] font-light tracking-[0.4em] text-hint uppercase">
            {t.routes.title1}
          </span>
          <span className="h-px flex-1 bg-border/20" />
          <span className="text-[10px] font-light tracking-[0.4em] text-hint uppercase">
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
                  handleRouteClick(route.slug)
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
                  <span className={`w-10 shrink-0 text-right text-[11px] font-light transition-colors duration-300 ${isHovered ? 'text-silver/60' : 'text-muted-foreground'}`}>
                    {route.index}
                  </span>

                  {/* City name */}
                  <h2
                    className={`flex-1 text-left text-[clamp(2rem,6vw,4.5rem)] font-extralight leading-none tracking-tight transition-all duration-300 ${
                      isHovered ? 'text-foreground translate-x-1' : 'text-muted-foreground'
                    }`}
                  >
                    {city}
                  </h2>

                  {/* Stats — desktop */}
                  <div className="hidden sm:flex items-center gap-8">
                    <div className="flex items-center gap-2 text-xs font-light text-muted-foreground">
                      <RouteIcon className={`h-3.5 w-3.5 transition-colors duration-300 ${isHovered ? 'text-silver/60' : 'text-muted-foreground'}`} />
                      {route.distance}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-light text-muted-foreground">
                      <Clock className={`h-3.5 w-3.5 transition-colors duration-300 ${isHovered ? 'text-silver/60' : 'text-muted-foreground'}`} />
                      {route.duration}
                    </div>
                    <div className={`hidden lg:flex items-center gap-2 text-xs font-light transition-colors duration-300 ${isHovered ? 'text-silver/50' : 'text-muted-foreground'}`}>
                      <Globe className="h-3.5 w-3.5" />
                      {route.border}
                    </div>
                  </div>

                  {/* Country + code */}
                  <div className="hidden lg:flex flex-col items-end gap-0.5">
                    <span className={`text-[10px] font-light tracking-[0.3em] uppercase transition-colors duration-300 ${isHovered ? 'text-silver/60' : 'text-muted-foreground'}`}>
                      {route.code}
                    </span>
                    <span className={`text-xs font-light transition-colors duration-300 ${isHovered ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                      {country}
                    </span>
                  </div>

                  {/* Arrow */}
                  <div
                    className={`ml-2 shrink-0 flex h-9 w-9 items-center justify-center border transition-all duration-500 ${
                      isHovered
                        ? 'border-foreground bg-foreground text-background'
                        : 'border-border/30 text-muted-foreground rotate-45'
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
        Uses Warsaw → Berlin as the representative "featured route" since Warsaw
        is the hub city shown in the hero. Each route's origin/destination and
        distance is pulled from the ROUTES array for the first destination.
      */}
      <RouteDetailBlocks
        origin="Warsaw"
        destination="Berlin"
        distanceKm={570}
      />

      {/* ── WHAT TO EXPECT CARDS ───────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8 lg:px-16">
        <div className="flex items-center gap-4 mb-12">
          <span className="text-[10px] font-light tracking-[0.4em] text-hint uppercase shrink-0">
            {t.routesPage.whatToExpect}
          </span>
          <span className="h-px flex-1 bg-border/20" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Car className="h-5 w-5" />,
              title: t.routesPage.expect1Title,
              desc: t.routesPage.expect1Desc,
            },
            {
              icon: <ShieldCheck className="h-5 w-5" />,
              title: t.routesPage.expect2Title,
              desc: t.routesPage.expect2Desc,
            },
            {
              icon: <Globe className="h-5 w-5" />,
              title: t.routesPage.expect3Title,
              desc: t.routesPage.expect3Desc,
            },
            {
              icon: <Info className="h-5 w-5" />,
              title: t.routesPage.expect4Title,
              desc: t.routesPage.expect4Desc,
            },
          ].map((item) => (
            <div key={item.title} className="border border-border/20 p-6 flex flex-col gap-4 group hover:border-border/40 transition-colors duration-300">
              <div className="text-hint group-hover:text-soft transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="text-sm font-light tracking-wide text-foreground">{item.title}</h3>
              <p className="text-xs font-light leading-relaxed text-muted-foreground">{item.desc}</p>
            </div>
          ))}
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
              <p className="mb-3 text-[10px] font-light tracking-[0.4em] text-hint uppercase">
                {t.routesPage.customRoutes}
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
          <span className="text-[10px] font-light tracking-[0.4em] text-hint uppercase shrink-0">{t.routesPage.bookYourTransfer}</span>
          <span className="h-px flex-1 bg-border/20" />
        </div>
        <div className="max-w-2xl">
          <UniversalBookingForm />
        </div>
      </section>

      <Footer />

    </div>
  )
}
