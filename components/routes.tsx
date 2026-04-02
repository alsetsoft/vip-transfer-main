"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { ArrowUpRight, MapPin } from "lucide-react"
import Image from "next/image"
import { useTranslation } from "@/lib/language-context"
import { useBooking } from "@/lib/booking-context"
import { useState } from "react"

export function Routes() {
  const { t } = useTranslation()
  const { setChauffeur, setMode } = useBooking()
  const { ref, isVisible } = useScrollReveal<HTMLElement>()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const handleRouteClick = (city: string) => {
    setMode("chauffeur")
    setChauffeur({ destinationCity: city })
    const el = document.getElementById("booking")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  const routes = [
    { city: t.routes.warsaw, country: t.routes.poland, code: "WAW", distance: t.routes.hub, image: "/images/city-warsaw.jpg" },
    { city: t.routes.berlin, country: t.routes.germany, code: "BER", distance: "570 km", image: "/images/city-berlin.jpg" },
    { city: t.routes.prague, country: t.routes.czech, code: "PRG", distance: "630 km", image: "/images/city-prague.jpg" },
    { city: t.routes.zurich, country: t.routes.switzerland, code: "ZRH", distance: "840 km", image: "/images/city-zurich.jpg" },
    { city: t.routes.vienna, country: t.routes.austria, code: "VIE", distance: "680 km", image: "/images/city-vienna.jpg" },
    { city: t.routes.budapest, country: t.routes.hungary, code: "BUD", distance: "690 km", image: "/images/city-budapest.jpg" },
  ]

  return (
    <section id="routes" ref={ref} className="relative py-12 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div
          className={`mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-silver/40" />
            <span className="text-[11px] font-light tracking-[0.4em] text-silver uppercase">
              {t.routes.label}
            </span>
          </div>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="text-4xl font-extralight tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
              {t.routes.title1}
              <br />
              <span className="text-silver">{t.routes.title2}</span>
            </h2>
            <p className="max-w-md text-base font-light leading-relaxed text-muted-foreground lg:text-right">
              {t.routes.description}
            </p>
          </div>
        </div>

        {/* Featured Route - Large Card */}
          <div className="mb-10 transition-all duration-1000 delay-200 lg:mb-4 lg:transition-none"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "none" : "translateY(40px)", transition: "opacity 1s ease 0.2s, transform 1s ease 0.2s" }}
          >
            <div
              className="group relative h-[260px] overflow-hidden cursor-pointer sm:h-[340px] lg:h-[480px]"
            onMouseEnter={() => setHoveredIndex(0)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleRouteClick(routes[0].city)}
          >
            <Image
              src={routes[0].image}
              alt={`${routes[0].city}, ${routes[0].country}`}
              fill
              sizes="100vw"
              className={`object-cover transition-all duration-700 ${
                hoveredIndex === 0 ? "scale-105 brightness-90" : "scale-100 brightness-75"
              }`}
              priority
            />
            {/* Overlay content — always white text on dark image */}
              <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-8 lg:p-12">
              <div className="flex items-start justify-between">
                <span className="text-[11px] font-light tracking-[0.4em] text-white/50 uppercase">
                  {routes[0].code}
                </span>
                <div
                  className={`flex h-10 w-10 items-center justify-center border transition-all duration-500 ${
                    hoveredIndex === 0
                      ? "bg-white text-black border-white rotate-0"
                      : "border-white/20 text-white/50 rotate-45"
                  }`}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-3 w-3 text-white/40" />
                  <span className="text-xs font-light tracking-widest text-white/40 uppercase">
                    {routes[0].country}
                  </span>
                </div>
                <h3 className="text-3xl font-extralight tracking-wide text-white sm:text-5xl md:text-6xl lg:text-7xl">
                  {routes[0].city}
                </h3>
                <div className="mt-4 flex items-center gap-6">
                  <span className="text-sm font-light text-white/50">
                    {routes[0].distance}
                  </span>
                  <span className="h-px flex-1 max-w-24 bg-white/15" />
                  <span
                    className={`text-xs font-light tracking-widest text-white/40 uppercase transition-all duration-500 ${
                      hoveredIndex === 0 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                    }`}
                  >
                    {t.routes.hub}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Route Grid - 5 remaining cards */}
        <div className="grid gap-3 grid-cols-2 sm:gap-4 lg:grid-cols-5">
          {routes.slice(1).map((route, i) => (
            <div
              key={route.code}
              className={`group relative h-[180px] overflow-hidden cursor-pointer transition-all duration-700 sm:h-[260px] lg:h-[380px] ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${400 + i * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(i + 1)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleRouteClick(route.city)}
            >
              <Image
                src={route.image}
                alt={`${route.city}, ${route.country}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                loading="lazy"
                className={`object-cover transition-all duration-700 ${
                  hoveredIndex === i + 1 ? "scale-110 brightness-90" : "scale-100 brightness-75"
                }`}
              />
              {/* Overlay — always white text on dark image */}
              <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-5 lg:p-6">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-light tracking-[0.3em] text-white/40 uppercase">
                    {route.code}
                  </span>
                  <div
                    className={`flex h-8 w-8 items-center justify-center border transition-all duration-500 ${
                      hoveredIndex === i + 1
                        ? "bg-white text-black border-white rotate-0"
                        : "border-white/20 text-white/50 rotate-45"
                    }`}
                  >
                    <ArrowUpRight className="h-3 w-3" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <MapPin className="h-2.5 w-2.5 text-white/40" />
                    <span className="text-[10px] font-light tracking-widest text-white/40 uppercase">
                      {route.country}
                    </span>
                  </div>
                  <h3 className="text-xl font-extralight tracking-wide text-white transition-all duration-500 sm:text-2xl lg:text-3xl">
                    {route.city}
                  </h3>
                  <div
                    className={`mt-3 flex items-center gap-3 transition-all duration-500 ${
                      hoveredIndex === i + 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                    }`}
                  >
                    <span className="text-xs font-light text-white/50">{route.distance}</span>
                    <span className="h-px flex-1 bg-white/15" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <p
          className={`mt-12 text-center text-xs font-light tracking-wider text-muted-foreground/60 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {t.routes.note}
        </p>
      </div>

    </section>
  )
}
