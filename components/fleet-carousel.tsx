"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Users, Luggage, Snowflake } from "lucide-react"
import { useTranslation } from "@/lib/language-context"

export function FleetCarousel() {
  const { t } = useTranslation()

  const fleet = [
    {
      image: "/images/fleet-sclass.jpg",
      title: "Mercedes-Benz S-Class",
      subtitle: t.fleet.sClassSub,
      passengers: 3,
      trunk: "530 L",
      airConditioning: t.fleet.climate4,
      highlight: t.fleet.sClassHighlight,
    },
    {
      image: "/images/fleet-eclass.jpg",
      title: "Mercedes-Benz E-Class",
      subtitle: t.fleet.eClassSub,
      passengers: 3,
      trunk: "540 L",
      airConditioning: t.fleet.climate3,
      highlight: t.fleet.eClassHighlight,
    },
    {
      image: "/images/fleet-gls.jpg",
      title: "Mercedes-Benz GLS",
      subtitle: t.fleet.glsSub,
      passengers: 4,
      trunk: "680 L",
      airConditioning: t.fleet.climate4,
      highlight: t.fleet.glsHighlight,
    },
    {
      image: "/images/fleet-vclass.jpg",
      title: "Mercedes-Benz V-Class",
      subtitle: t.fleet.vClassSub,
      passengers: 7,
      trunk: "1030 L",
      airConditioning: t.fleet.climate4,
      highlight: t.fleet.vClassHighlight,
    },
  ]

  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return
      setIsTransitioning(true)
      setCurrent(index)
      setTimeout(() => setIsTransitioning(false), 700)
    },
    [isTransitioning]
  )

  const next = useCallback(() => {
    goTo((current + 1) % fleet.length)
  }, [current, goTo, fleet.length])

  const prev = useCallback(() => {
    goTo((current - 1 + fleet.length) % fleet.length)
  }, [current, goTo, fleet.length])

  useEffect(() => {
    if (isPaused) return
    timerRef.current = setInterval(next, 5000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [next, isPaused])

  const car = fleet[current]

  return (
    <div
      className="relative flex flex-col"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Image Area */}
      <div className="relative w-full overflow-hidden bg-secondary/30" style={{ height: "clamp(220px, 50vw, 500px)" }}>
        {fleet.map((item, i) => (
          <div
            key={item.title}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              i === current
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="100vw"
              className="object-contain object-center p-4 sm:p-6"
              quality={85}
              priority={i === 0}
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />

        {/* Navigation Arrows — pushed to bottom corners, clear of image */}
        <button
          onClick={prev}
          aria-label="Previous car"
          className="absolute left-3 bottom-4 z-10 flex h-9 w-9 items-center justify-center border border-foreground/15 bg-background/60 backdrop-blur-md text-foreground/70 transition-all duration-300 hover:border-silver/50 hover:text-foreground hover:bg-background/80 sm:left-4 sm:bottom-5 sm:h-10 sm:w-10"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={next}
          aria-label="Next car"
          className="absolute right-3 bottom-4 z-10 flex h-9 w-9 items-center justify-center border border-foreground/15 bg-background/60 backdrop-blur-md text-foreground/70 transition-all duration-300 hover:border-silver/50 hover:text-foreground hover:bg-background/80 sm:right-4 sm:bottom-5 sm:h-10 sm:w-10"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Car Info Block — below image */}
      <div className="px-4 pt-4 pb-2 sm:px-6 md:px-8 lg:px-12">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            {/* Left: Title Block */}
            <div>
              <p
                className="text-[10px] font-light tracking-[0.25em] text-silver uppercase transition-all duration-500 sm:text-[11px] sm:tracking-[0.3em]"
                key={`sub-${current}`}
              >
                {car.subtitle}
              </p>
              <h3
                className="mt-1 text-lg font-light tracking-wide text-foreground transition-all duration-500 sm:text-xl md:text-2xl lg:text-3xl"
                key={`title-${current}`}
              >
                {car.title}
              </h3>
              <p className="mt-1 max-w-sm text-xs font-light text-foreground/60 transition-all duration-500 hidden sm:block lg:text-sm">
                {car.highlight}
              </p>
            </div>

            {/* Right: Specs Row */}
            <div className="flex items-center gap-4 sm:gap-6 border-t border-foreground/10 pt-3 lg:border-t-0 lg:border-l lg:border-foreground/10 lg:pt-0 lg:pl-8">
              <div className="flex flex-col gap-0.5 sm:gap-1">
                <div className="flex items-center gap-1.5">
                  <Users className="h-3 w-3 text-silver sm:h-3.5 sm:w-3.5" />
                  <span className="text-[9px] font-light tracking-[0.1em] text-silver/70 uppercase sm:text-[10px] sm:tracking-[0.15em]">
                    {t.fleet.seats}
                  </span>
                </div>
                <span className="text-xs font-light text-foreground/90 sm:text-sm lg:text-base">
                  {car.passengers}
                </span>
              </div>
              <div className="h-6 w-px bg-foreground/10 sm:h-8" />
              <div className="flex flex-col gap-0.5 sm:gap-1">
                <div className="flex items-center gap-1.5">
                  <Luggage className="h-3 w-3 text-silver sm:h-3.5 sm:w-3.5" />
                  <span className="text-[9px] font-light tracking-[0.1em] text-silver/70 uppercase sm:text-[10px] sm:tracking-[0.15em]">
                    {t.fleet.trunk}
                  </span>
                </div>
                <span className="text-xs font-light text-foreground/90 sm:text-sm lg:text-base">
                  {car.trunk}
                </span>
              </div>
              <div className="h-6 w-px bg-foreground/10 sm:h-8" />
              <div className="flex flex-col gap-0.5 sm:gap-1">
                <div className="flex items-center gap-1.5">
                  <Snowflake className="h-3 w-3 text-silver sm:h-3.5 sm:w-3.5" />
                  <span className="text-[9px] font-light tracking-[0.1em] text-silver/70 uppercase sm:text-[10px] sm:tracking-[0.15em]">
                    {t.fleet.climate}
                  </span>
                </div>
                <span className="text-xs font-light text-foreground/90 sm:text-sm lg:text-base">
                  {car.airConditioning}
                </span>
              </div>
            </div>
          </div>
        </div>

      {/* Dot Indicators + Progress */}
      <div className="flex items-center justify-center gap-3 pt-4 pb-1">
        {fleet.map((item, i) => (
          <button
            key={item.title}
            onClick={() => goTo(i)}
            aria-label={`View ${item.title}`}
            className="group relative flex h-6 items-center justify-center"
          >
            <span
              className={`block h-px transition-all duration-500 ${
                i === current
                  ? "w-8 bg-silver"
                  : "w-4 bg-foreground/20 group-hover:bg-foreground/40"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Slide Counter */}
      <div className="mt-3 flex justify-center">
        <span className="text-[10px] font-light tracking-[0.3em] text-muted-foreground">
          {String(current + 1).padStart(2, "0")} / {String(fleet.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  )
}
