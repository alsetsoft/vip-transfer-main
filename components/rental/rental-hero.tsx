"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { ArrowDown } from "lucide-react"
import { UniversalBookingForm } from "@/components/universal-booking-form"

export function RentalHero() {
  const copyRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const els = [copyRef.current, formRef.current]
    els.forEach((el, i) => {
      if (!el) return
      el.style.opacity = "0"
      el.style.transform = "translateY(28px)"
      setTimeout(() => {
        el.style.transition = "opacity 0.9s ease, transform 0.9s ease"
        el.style.opacity = "1"
        el.style.transform = "translateY(0)"
      }, 250 + i * 220)
    })
  }, [])

  return (
    <section className="relative min-h-[100svh] overflow-hidden" id="top">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-sedan.jpg"
          alt="Luxury rental car on open road"
          fill
          sizes="100vw"
          className="object-cover"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-background/68" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid min-h-[100svh] items-center gap-12 py-28 lg:grid-cols-[1fr_500px] lg:gap-20 lg:py-40">

          {/* Left — copy */}
          <div ref={copyRef} className="flex flex-col">
            <div className="mb-6 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-silver/60" />
              <span className="text-[10px] font-light tracking-[0.4em] text-silver uppercase">
                Car Rental &amp; Transfers
              </span>
            </div>

            <h1 className="mb-6 text-[2.4rem] font-extralight leading-[1.07] tracking-tight text-foreground text-balance sm:text-5xl md:text-6xl lg:text-7xl">
              Premium Rentals
              <br />
              <span className="font-light text-silver">Across Europe</span>
            </h1>

            <p className="mb-8 max-w-sm text-sm font-light leading-relaxed text-muted-foreground sm:max-w-lg sm:text-base">
              Self-drive freedom or chauffeured comfort — choose the experience that suits your journey. Fixed prices, new-model fleet, zero hidden fees.
            </p>

            {/* Quick trust pills */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {["Fixed price", "Free cancellation", "24 / 7 support", "Full insurance"].map(s => (
                <span key={s} className="flex items-center gap-2 text-xs font-light text-muted-foreground/60">
                  <span className="h-px w-3 bg-silver/40" />
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Right — master booking form */}
          <div
            ref={formRef}
            id="booking"
            className="w-full border border-border/30 bg-background/85 backdrop-blur-md p-6 sm:p-8"
          >
            <p className="mb-6 text-[9px] font-light tracking-[0.4em] text-silver/50 uppercase">
              Book your vehicle
            </p>
            <UniversalBookingForm />
          </div>

        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <a href="#modes" aria-label="Scroll down">
          <ArrowDown className="h-5 w-5 text-silver/50" />
        </a>
      </div>
    </section>
  )
}
