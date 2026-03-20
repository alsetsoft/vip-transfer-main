"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { FleetCarousel } from "@/components/fleet-carousel"

export function RentalFleet() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>()

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
            className="text-[10px] font-light tracking-[0.25em] text-silver/50 uppercase transition-colors hover:text-foreground"
          >
            Start Booking &rarr;
          </a>
        </div>

        {/* Fleet categories strip */}
        <div className={`mb-10 grid grid-cols-2 gap-px bg-border/20 sm:grid-cols-5 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {[
            { label: "Comfort",  pax: "1–4" },
            { label: "Business", pax: "1–4" },
            { label: "Premium",  pax: "1–7" },
          ].map(cat => (
            <div key={cat.label} className="flex flex-col gap-1 bg-background px-5 py-4">
              <span className="text-xs font-light tracking-wide text-foreground">{cat.label}</span>
              <span className="text-[10px] font-light text-muted-foreground">{cat.pax} pax</span>
            </div>
          ))}
        </div>

        {/* Carousel */}
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <FleetCarousel />
        </div>

      </div>
    </section>
  )
}
