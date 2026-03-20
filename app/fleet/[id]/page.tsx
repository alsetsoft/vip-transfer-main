'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Users, Briefcase, Calendar, Zap, Settings, Check } from 'lucide-react'
import { useTranslation } from '@/lib/language-context'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { use } from 'react'

const CAR_META: Record<string, { images: string[]; interior?: string }> = {
  sclass: {
    images: ['/images/fleet-sclass.jpg'],
    interior: '/images/fleet-sclass-interior.jpg',
  },
  eclass: {
    images: ['/images/fleet-eclass.jpg'],
    interior: '/images/fleet-sclass-interior.jpg',
  },
  vclass: {
    images: ['/images/fleet-vclass.jpg'],
    interior: '/images/fleet-vclass-interior.jpg',
  },
  gls: {
    images: ['/images/fleet-gls.jpg'],
    interior: '/images/fleet-sclass-interior.jpg',
  },
}

export default function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { t } = useTranslation()

  const meta = CAR_META[id]
  if (!meta) notFound()

  const carData = t.fleet.cars[id as keyof typeof t.fleet.cars]
  if (!carData) notFound()

  const specs = [
    { icon: Users, label: t.fleet.passengers, value: carData.passengers },
    { icon: Briefcase, label: t.fleet.luggage, value: carData.luggage },
    { icon: Zap, label: t.fleet.engine, value: carData.engine },
    { icon: Settings, label: t.fleet.transmission, value: carData.transmission },
    { icon: Calendar, label: t.fleet.year, value: carData.year },
    { icon: null, label: t.fleet.class, value: carData.class },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-24">
        {/* Back */}
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-12">
          <Link
            href="/fleet"
            className="inline-flex items-center gap-2 text-xs font-light tracking-[0.2em] text-muted-foreground uppercase transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {t.fleet.backToFleet}
          </Link>
        </div>

        {/* Hero images + info */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Images */}
            <div className="flex flex-col gap-3">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={meta.images[0]}
                  alt={carData.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-background/30" />
              </div>
              {meta.interior && (
                <div className="relative aspect-[16/8] overflow-hidden">
                  <Image
                    src={meta.interior}
                    alt={`${carData.name} interior`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-background/20" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <p className="text-[9px] font-light tracking-[0.4em] text-silver/50 uppercase mb-3">
                {t.fleet.label} / {carData.class}
              </p>
              <h1 className="text-4xl font-light tracking-tight sm:text-5xl">{carData.name}</h1>
              <p className="mt-6 text-base font-light leading-relaxed text-muted-foreground">
                {carData.description}
              </p>

              {/* Specs grid */}
              <div className="mt-8 grid grid-cols-2 gap-px bg-border/20">
                {specs.map((spec) => (
                  <div key={spec.label} className="bg-background p-4">
                    <p className="text-[9px] font-light tracking-[0.3em] text-silver/40 uppercase mb-1">
                      {spec.label}
                    </p>
                    <p className="text-sm font-light text-foreground">{spec.value}</p>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="mt-8">
                <p className="text-[10px] font-light tracking-[0.3em] text-silver/50 uppercase mb-4">
                  {t.fleet.features}
                </p>
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {carData.features.map((feature: string) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-silver/40" />
                      <span className="text-sm font-light text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="mt-10 border-t border-border/20 pt-8">
                <Link
                  href="/#booking"
                  className="inline-flex items-center gap-3 border border-foreground/20 bg-foreground px-8 py-4 text-xs font-light tracking-[0.25em] text-background uppercase transition-all duration-300 hover:bg-foreground/90"
                >
                  {t.fleet.bookThisCar}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Other cars */}
        <section className="border-t border-border/20 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
            <p className="text-[10px] font-light tracking-[0.35em] text-silver/50 uppercase mb-8">
              {t.fleet.label}
            </p>
            <div className="grid grid-cols-2 gap-px bg-border/20 sm:grid-cols-4">
              {Object.entries(CAR_META)
                .filter(([carId]) => carId !== id)
                .slice(0, 4)
                .map(([carId, carMeta]) => {
                  const other = t.fleet.cars[carId as keyof typeof t.fleet.cars]
                  return (
                    <Link
                      key={carId}
                      href={`/fleet/${carId}`}
                      className="group relative bg-background transition-colors hover:bg-card/60"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={carMeta.images[0]}
                          alt={other.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <p className="text-xs font-light text-foreground/90 truncate">{other.name}</p>
                          <p className="text-[9px] font-light text-silver/50 tracking-wider">{other.class}</p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
