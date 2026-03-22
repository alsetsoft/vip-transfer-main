"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { ArrowDown } from "lucide-react"
import { useTranslation } from "@/lib/language-context"

export function Hero() {
  const { t } = useTranslation()
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const elements = [headlineRef.current, subRef.current, ctaRef.current]
    elements.forEach((el, i) => {
      if (el) {
        el.style.opacity = "0"
        el.style.transform = "translateY(30px)"
        setTimeout(() => {
          el.style.transition = "opacity 1s ease, transform 1s ease"
          el.style.opacity = "1"
          el.style.transform = "translateY(0)"
        }, 300 + i * 300)
      }
    })
  }, [])

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-sedan.jpg"
          alt="Luxury sedan on a dark highway at night"
          fill
          sizes="100vw"
          className="object-cover"
          priority
          quality={85}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6">
        {/* Tagline */}
        <div className="mb-4 inline-flex items-center gap-3 sm:mb-8">
          <span className="h-px w-6 bg-white/50 sm:w-8" />
          <span className="text-[10px] font-light tracking-[0.35em] text-white/70 uppercase sm:text-[11px] sm:tracking-[0.4em]">
            {t.hero.tagline}
          </span>
          <span className="h-px w-6 bg-white/50 sm:w-8" />
        </div>

        <h1
          ref={headlineRef}
          className="mb-5 text-[2.2rem] font-extralight leading-[1.08] tracking-tight text-white text-balance sm:mb-8 sm:text-5xl md:text-7xl lg:text-8xl"
        >
          {t.hero.headline1}
          <br />
          <span className="font-light text-white/70">{t.hero.headline2}</span>
          <br />
          {t.hero.headline3}
        </h1>

        {/* SEO: H1 keywords mirrored verbatim in body text for crawlers */}
        <p className="sr-only">
          Seamless International Mobility: Private Chauffeur Services — Movi Transfer offers premium, cross-border business-class transport between Ukraine and Europe. Experience flawless international travel with our dedicated chauffeur service, designed exclusively for individuals and small groups.
        </p>

        <p
          ref={subRef}
          className="mx-auto mb-8 max-w-sm text-sm font-light leading-relaxed text-white/60 sm:max-w-xl sm:text-base sm:mb-12 md:text-lg"
        >
          {t.hero.description}
        </p>

        <div ref={ctaRef} className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <a
            href="#booking"
            className="group relative w-full overflow-hidden border border-white bg-white px-8 py-4 text-xs font-light tracking-[0.25em] text-black uppercase transition-all duration-500 hover:bg-transparent hover:text-white sm:w-auto sm:px-10"
          >
            <span className="relative z-10">{t.hero.cta}</span>
          </a>
          <a
            href="#services"
            className="group w-full border border-white/30 px-8 py-4 text-xs font-light tracking-[0.25em] text-white/70 uppercase transition-all duration-500 hover:border-white/60 hover:text-white sm:w-auto sm:px-10"
          >
            {t.hero.explore}
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <a href="#services" aria-label="Scroll to services">
          <ArrowDown className="h-5 w-5 text-white/50" />
        </a>
      </div>

      {/* Decorative Side Lines */}
      <div className="absolute left-8 top-1/4 hidden h-32 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent lg:block" />
      <div className="absolute right-8 bottom-1/4 hidden h-32 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent lg:block" />
    </section>
  )
}
