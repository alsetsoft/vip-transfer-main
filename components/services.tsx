"use client"

import { useState } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { MapPin, Zap, UserCheck, Users } from "lucide-react"
import { useTranslation } from "@/lib/language-context"
import Image from "next/image"
import Link from "next/link"

type Category = "comfort" | "business" | "premium"

interface FleetCar {
  id: string
  name: string
  pax: string
  image: string
  category: Category
}

const FLEET_CARS: FleetCar[] = [
  // Comfort
  { id: "passat", name: "Volkswagen Passat B8", pax: "1–4", image: "/images/cars/passat-b8.png", category: "comfort" },
  { id: "superb", name: "Skoda Superb L&K", pax: "1–4", image: "/images/cars/skoda-superb.png", category: "comfort" },
  { id: "vito", name: "Mercedes-Benz Vito", pax: "1–7", image: "/images/cars/mercedes-vito.png", category: "comfort" },
  // Business
  { id: "a6", name: "Audi A6 S Line", pax: "1–4", image: "/images/cars/audi-a6.png", category: "business" },
  { id: "eclass", name: "Mercedes-Benz E-Class", pax: "1–4", image: "/images/cars/mercedes-eclass.png", category: "business" },
  { id: "bmw5", name: "BMW 5 Series", pax: "1–4", image: "/images/cars/bmw-5.png", category: "business" },
  { id: "glb", name: "Mercedes-Benz GLB", pax: "1–5", image: "/images/cars/mercedes-glb.png", category: "business" },
  // Premium
  { id: "vclass", name: "Mercedes-Benz V-Class", pax: "1–7", image: "/images/cars/mercedes-vclass.png", category: "premium" },
  { id: "a8", name: "Audi A8 S Line", pax: "1–3", image: "/images/cars/audia8lsline.png", category: "premium" },
  { id: "sprinter", name: "Mercedes-Benz Sprinter", pax: "1–8", image: "/images/cars/mercedes-sprinter.png", category: "premium" },
  { id: "sclass", name: "Mercedes-Benz S-Class", pax: "1–3", image: "/images/cars/mercedes-sclass.png", category: "premium" },
]

export function Services() {
  const { t } = useTranslation()
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>()
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal<HTMLDivElement>()
  const [activeCategory, setActiveCategory] = useState<Category>("comfort")
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const categories: { id: Category; label: string }[] = [
    { id: "comfort", label: t.form.comfort },
    { id: "business", label: t.form.business },
    { id: "premium", label: t.form.premium },
  ]

  const filteredCars = FLEET_CARS.filter(car => car.category === activeCategory)

  const services = [
    {
      num: "01",
      icon: MapPin,
      title: t.services.service1Title,
      subtitle: t.services.service1Subtitle,
      description: t.services.service1Desc,
      image: "/images/service-door-to-door.jpg",
    },
    {
      num: "02",
      icon: Zap,
      title: t.services.service2Title,
      subtitle: t.services.service2Subtitle,
      description: t.services.service2Desc,
      image: "/images/service-border.jpg",
    },
    {
      num: "03",
      icon: UserCheck,
      title: t.services.service3Title,
      subtitle: t.services.service3Subtitle,
      description: t.services.service3Desc,
      image: "/images/service-private.jpg",
    },
  ]

  return (
    <section id="services" ref={sectionRef} className="relative">
      {/* Top: Section Header + Fleet Grid */}
      <div className="relative py-12 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          {/* Header row */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-10 lg:mb-16">
            <div
              className={`transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-12 bg-silver/40" />
                <span className="text-[11px] font-light tracking-[0.4em] text-silver uppercase">
                  {t.services.label}
                </span>
              </div>
              <h2 className="text-4xl font-extralight leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
                {t.services.title1}
                <br />
                <span className="text-silver">{t.services.title2}</span>
              </h2>
            </div>
            <div
              className={`transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <p className="max-w-md text-sm font-light leading-relaxed text-muted-foreground lg:text-right">
                {t.services.description}
              </p>
            </div>
          </div>

          {/* Category Tabs */}
          <div
            className={`mb-10 flex gap-0 border border-border/30 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => { setActiveCategory(cat.id); setHoveredIndex(null) }}
                className={`flex flex-1 items-center justify-center py-4 text-center transition-all duration-300 border-r border-border/30 last:border-r-0 ${
                  activeCategory === cat.id
                    ? "bg-foreground text-background"
                    : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                <span className="text-xs font-light tracking-[0.2em] uppercase sm:text-sm">{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Fleet Grid */}
          <div
            className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5 transition-all duration-700 delay-400 ${
              filteredCars.length <= 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
            } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {filteredCars.map((car, i) => (
              <Link
                key={car.id}
                href={`/fleet/${car.id}`}
                className="group relative flex flex-col overflow-hidden border border-border/20 bg-card/30 transition-all duration-500 hover:border-border/40"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Image */}
                <div className="relative h-[200px] overflow-hidden bg-secondary/20 sm:h-[220px] lg:h-[240px]">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className={`object-cover object-center transition-all duration-700 ${
                      hoveredIndex === i ? "scale-105 brightness-100" : "scale-100 brightness-90"
                    }`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* Pax badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 border border-white/20 bg-black/40 px-2.5 py-1 backdrop-blur-sm">
                    <Users className="h-3 w-3 text-white/70" />
                    <span className="text-[10px] font-light tracking-wider text-white/70">{car.pax}</span>
                  </div>

                  {/* Car name on image */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-sm font-light tracking-wide text-white sm:text-base">
                      {car.name}
                    </h3>
                  </div>

                  {/* Hover overlay with "View details" */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                      hoveredIndex === i ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <span className="text-[11px] font-light tracking-[0.2em] text-white uppercase border border-white/25 bg-black/40 px-4 py-2 backdrop-blur-sm">
                      View details &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom: Service Cards Strip */}
      <div ref={cardsRef} className="border-t border-border/50">
        <div className="mx-auto max-w-7xl md:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 md:divide-y-0 md:divide-x divide-border/50">
            {services.map((service, i) => (
              <div
                key={service.num}
                className={`group relative flex flex-col overflow-hidden border-b border-border/50 last:border-b-0 md:border-b-0 transition-all duration-700 ${
                  cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Image — full bleed on mobile */}
                <div className="relative h-64 w-full overflow-hidden sm:h-72 lg:h-80">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                    className="object-cover brightness-[0.7] contrast-[1.08] transition-all duration-700 group-hover:brightness-[0.85] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <span className="absolute top-4 left-5 text-7xl font-extralight leading-none tracking-tight text-white/70 select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    {service.num}
                  </span>
                  <div className="absolute bottom-4 right-5 flex h-9 w-9 items-center justify-center border border-white/25 bg-black/35 backdrop-blur-md transition-colors duration-500 group-hover:border-silver/50">
                    <service.icon className="h-3.5 w-3.5 text-white/80" />
                  </div>
                </div>

                {/* Text content */}
                <div className="flex flex-col flex-1 px-6 py-8 md:px-8 lg:px-10">
                  <h3 className="text-xl font-semibold tracking-wide text-foreground mb-1">
                    {service.title}
                  </h3>
                  <p className="text-[11px] font-light tracking-[0.2em] text-silver uppercase mb-4">
                    {service.subtitle}
                  </p>
                  <p className="text-sm font-light leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 h-px w-0 bg-silver/30 transition-all duration-700 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
