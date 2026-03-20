"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { MapPin, Zap, UserCheck } from "lucide-react"
import { FleetCarousel } from "./fleet-carousel"
import { useTranslation } from "@/lib/language-context"
import Image from "next/image"

export function Services() {
  const { t } = useTranslation()
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>()
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal<HTMLDivElement>()

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
      {/* Top: Section Header + Fleet Carousel */}
      <div className="relative py-16 lg:py-32">
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

          {/* Full-width Fleet Carousel */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <FleetCarousel />
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
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
