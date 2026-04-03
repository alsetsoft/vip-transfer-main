'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Users, Briefcase, Star } from 'lucide-react'
import { useTranslation } from '@/lib/language-context'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

const CARS = [
  // Comfort
  { id: 'passat',   image: '/images/cars/passat-b8.png',       badge: null,      category: 'Comfort' },
  { id: 'superb',   image: '/images/cars/skoda-superb.png',    badge: null,      category: 'Comfort' },
  { id: 'vito',     image: '/images/cars/mercedes-vito.png',   badge: null,      category: 'Comfort' },
  // Business
  { id: 'a6',       image: '/images/cars/audi-a6.png',         badge: null,      category: 'Business' },
  { id: 'eclass',   image: '/images/cars/mercedes-eclass.png', badge: null,      category: 'Business' },
  { id: 'bmw5',     image: '/images/cars/bmw-5.png',           badge: null,      category: 'Business' },
  { id: 'glb',      image: '/images/cars/mercedes-glb.png',    badge: null,      category: 'Business' },
  // Premium
  { id: 'vclass',   image: '/images/cars/mercedes-vclass.png', badge: null,      category: 'Premium' },
  { id: 'a8',       image: '/images/cars/audia8lsline.png',         badge: null,      category: 'Premium' },
  { id: 'sprinter', image: '/images/cars/mercedes-sprinter.png', badge: null,    category: 'Premium' },
  { id: 'sclass',   image: '/images/cars/mercedes-sclass.png', badge: 'flagship', category: 'Premium' },
]

export default function FleetPageClient() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/20 pt-32 pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, oklch(0.75 0 0) 0px, oklch(0.75 0 0) 1px, transparent 1px, transparent 80px), repeating-linear-gradient(90deg, oklch(0.75 0 0) 0px, oklch(0.75 0 0) 1px, transparent 1px, transparent 80px)',
            }}
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <p className="mb-4 text-[10px] font-light tracking-[0.4em] text-hint uppercase">
            {t.fleet.label}
          </p>
          <h1 className="text-5xl font-light tracking-tight text-balance sm:text-6xl lg:text-7xl">
            {t.fleet.title1}{' '}
            <span className="text-subtle">{t.fleet.title2}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-muted-foreground">
            {t.fleet.description}
          </p>
        </div>
      </section>

      {/* Car Cards */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CARS.map((car) => {
            const carData = t.fleet.cars[car.id as keyof typeof t.fleet.cars]
            return (
              <Link
                key={car.id}
                href={`/fleet/${car.id}`}
                className="group relative flex flex-col overflow-hidden border border-border/30 bg-card/30 transition-all duration-500 hover:border-silver/20 hover:bg-card/60"
              >
                {/* Image — full bleed, taller */}
                <div className="relative h-64 w-full overflow-hidden sm:h-72">
                  <Image
                    src={car.image}
                    alt={carData.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover brightness-[0.75] contrast-[1.08] transition-all duration-700 group-hover:brightness-[0.92] group-hover:scale-[1.03]"
                  />
                  {/* Subtle bottom gradient for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Badge */}
                  {car.badge && (
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 border border-silver/30 bg-black/50 px-2.5 py-1 backdrop-blur-sm">
                      <Star className="h-2.5 w-2.5 text-soft" />
                      <span className="text-[9px] font-light tracking-[0.3em] text-silver uppercase">
                        Flagship
                      </span>
                    </div>
                  )}

                  {/* Class tag — bottom right */}
                  <div className="absolute bottom-4 right-4">
                    <span className="border border-white/15 bg-black/40 px-2.5 py-1 text-[9px] font-light tracking-[0.25em] text-white/60 uppercase backdrop-blur-sm">
                      {carData.class}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col px-6 py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-base font-light tracking-wide text-foreground">
                        {carData.name}
                      </h2>
                      <p className="mt-1.5 text-sm font-light leading-relaxed text-muted-foreground">
                        {carData.shortDesc}
                      </p>
                    </div>
                    <div className="mt-1 flex-shrink-0 flex h-8 w-8 items-center justify-center border border-border/30 text-muted-foreground transition-all duration-300 group-hover:border-silver/40 group-hover:text-silver">
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </div>

                  {/* Quick specs */}
                  <div className="mt-5 flex items-center gap-6 border-t border-border/20 pt-4">
                    <div className="flex items-center gap-2 text-xs font-light text-muted-foreground">
                      <Users className="h-3.5 w-3.5 text-hint" />
                      {carData.passengers}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-light text-muted-foreground">
                      <Briefcase className="h-3.5 w-3.5 text-hint" />
                      {carData.luggage}
                    </div>
                    <div className="ml-auto text-[10px] font-light tracking-[0.2em] text-hint uppercase">
                      {t.fleet.year} {carData.year}
                    </div>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 h-px w-0 bg-silver/30 transition-all duration-700 group-hover:w-full" />
              </Link>
            )
          })}
        </div>
      </section>

      <Footer />
    </div>
  )
}
