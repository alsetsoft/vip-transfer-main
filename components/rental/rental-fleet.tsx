"use client"

import { useState } from "react"
import Image from "next/image"
import { Users, ChevronRight } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useTranslation } from "@/lib/language-context"

type Category = "comfort" | "business" | "premium"

interface Car {
  name: string
  pax: string
  image: string
  highlight: string
  category: Category
}

const FLEET: Car[] = [
  // Comfort
  { name: "Volkswagen Passat B8",          pax: "1–4", image: "/images/cars/passat-b8.png",       highlight: "Reliable comfort for long-distance European routes", category: "comfort" },
  { name: "Skoda Superb Laurin & Klement", pax: "1–4", image: "/images/cars/skoda-superb.png",    highlight: "Executive sedan with generous legroom",              category: "comfort" },
  { name: "Mercedes-Benz Vito",            pax: "1–7", image: "/images/cars/mercedes-vito.png",   highlight: "Spacious van for groups & families",                 category: "comfort" },
  // Business
  { name: "Audi A6 S Line",               pax: "1–4", image: "/images/cars/audi-a6.png",         highlight: "Dynamic business sedan with sport styling",          category: "business" },
  { name: "Mercedes-Benz E-Class",         pax: "1–4", image: "/images/cars/mercedes-eclass.png", highlight: "Elegant & agile business travel",                    category: "business" },
  { name: "BMW 5 Series",                  pax: "1–4", image: "/images/cars/bmw-5.png",           highlight: "Premium driving dynamics & luxury",                  category: "business" },
  { name: "Mercedes-Benz GLB",             pax: "1–5", image: "/images/cars/mercedes-glb.png",    highlight: "Compact SUV with versatile seating",                 category: "business" },
  // Premium
  { name: "Mercedes-Benz V-Class",         pax: "1–7", image: "/images/cars/mercedes-vclass.png", highlight: "VIP group transport with captain seats",             category: "premium" },
  { name: "Audi A8 S Line",               pax: "1–3", image: "/images/cars/audia8lsline.png",         highlight: "Flagship luxury with rear executive lounge",         category: "premium" },
  { name: "Mercedes-Benz Sprinter",        pax: "1–8", image: "/images/cars/mercedes-sprinter.png", highlight: "Recliner seats for ultimate long-haul comfort",   category: "premium" },
  { name: "Mercedes-Benz S-Class",         pax: "1–3", image: "/images/cars/mercedes-sclass.png", highlight: "The pinnacle of executive comfort",                  category: "premium" },
]

export function RentalFleet() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>()
  const { t } = useTranslation()
  const [active, setActive] = useState<Category>("comfort")
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const categories: { id: Category; label: string; desc: string }[] = [
    { id: "comfort",  label: t.form.comfort,  desc: "1–7 pax" },
    { id: "business", label: t.form.business, desc: "1–5 pax" },
    { id: "premium",  label: t.form.premium,  desc: "1–8 pax" },
  ]

  const filtered = FLEET.filter(c => c.category === active)

  return (
    <section id="fleet" ref={ref} className="relative border-b border-border/30 py-20 lg:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <div className={`mb-12 flex items-center gap-4 lg:mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="h-px w-12 bg-silver/40" />
          <span className="text-[11px] font-light tracking-[0.4em] text-silver uppercase">Our Fleet</span>
          <span className="h-px flex-1 bg-border/20" />
          <a
            href="#booking"
            className="text-[10px] font-light tracking-[0.25em] text-hint uppercase transition-colors hover:text-foreground"
          >
            Start Booking &rarr;
          </a>
        </div>

        {/* Category Tabs */}
        <div className={`mb-10 flex gap-0 border border-border/30 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => { setActive(cat.id); setHoveredIndex(null) }}
              className={`flex flex-1 flex-col items-center gap-1 py-4 text-center transition-all duration-300 border-r border-border/30 last:border-r-0 ${
                active === cat.id
                  ? "bg-foreground text-background"
                  : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-foreground/5"
              }`}
            >
              <span className="text-xs font-light tracking-[0.2em] uppercase sm:text-sm">{cat.label}</span>
              <span className={`text-[10px] font-light ${active === cat.id ? "text-background/60" : "text-muted-foreground/50"}`}>{cat.desc}</span>
            </button>
          ))}
        </div>

        {/* Car Grid with Images */}
        <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5 transition-all duration-700 delay-300 ${
          filtered.length <= 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
        } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {filtered.map((car, i) => (
            <div
              key={car.name}
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
                    hoveredIndex === i ? "scale-105 brightness-75" : "scale-100 brightness-[0.6]"
                  }`}
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />

                {/* Pax badge on image */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 border border-white/20 bg-black/40 px-2.5 py-1 backdrop-blur-sm">
                  <Users className="h-3 w-3 text-white/70" />
                  <span className="text-[10px] font-light tracking-wider text-white/70">{car.pax}</span>
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div>
                  <h3 className="text-sm font-light tracking-wide text-foreground sm:text-base">
                    {car.name}
                  </h3>
                  <p className="mt-1.5 text-[11px] font-light leading-relaxed text-muted-foreground">
                    {car.highlight}
                  </p>
                </div>

                {/* Book CTA */}
                <a
                  href="#booking"
                  className="mt-auto flex items-center gap-1 pt-3 border-t border-border/20 text-[10px] font-light tracking-[0.2em] text-hint uppercase transition-colors duration-300 group-hover:text-foreground"
                >
                  Book this car <ChevronRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className={`mt-8 text-center text-[10px] font-light tracking-wider text-muted-foreground/50 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          {active === "premium" ? "Sprinter equipped with recliner seats" : "All vehicles include Wi-Fi, climate control & USB charging"}
        </p>

      </div>
    </section>
  )
}
