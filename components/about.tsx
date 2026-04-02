"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useTranslation } from "@/lib/language-context"
import Image from "next/image"

export function About() {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollReveal<HTMLElement>()
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal<HTMLDivElement>()

  const stats = [
    { value: t.about.stat1, label: t.about.stat1Label },
    { value: t.about.stat2, label: t.about.stat2Label },
    { value: t.about.stat3, label: t.about.stat3Label },
    { value: t.about.stat4, label: t.about.stat4Label },
  ]

  return (
    <section id="about" ref={ref} className="relative py-12 lg:py-24 overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Left - Image + accent */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[4/3] lg:aspect-[4/5]">
              <Image
                src="/images/about-chauffeur.jpg"
                alt="Professional chauffeur opening door of luxury Mercedes-Benz - Movi Transfer personal delivery service"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
            </div>

            {/* Floating accent line */}
            <div className="absolute -right-4 top-12 hidden h-32 w-px bg-gradient-to-b from-transparent via-silver/30 to-transparent lg:block" />
            <div className="absolute -bottom-4 left-12 hidden h-px w-32 bg-gradient-to-r from-transparent via-silver/30 to-transparent lg:block" />
          </div>

          {/* Right - Content */}
          <div
            className={`flex flex-col transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            {/* Label */}
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px w-12 bg-[var(--line-accent)]" />
              <span className="text-[11px] font-light tracking-[0.4em] text-silver uppercase">
                {t.about.label}
              </span>
            </div>

            {/* Heading - uses h2 as part of proper heading hierarchy */}
            <h2 className="text-4xl font-extralight tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
              {t.about.title1}
              <br />
              <span className="text-silver">{t.about.title2}</span>
            </h2>

            {/* Body text - SEO-optimized 200-word About Us copy */}
            <p className="mt-8 text-sm font-light leading-[1.8] text-muted-foreground md:text-base">
              {t.about.text}
            </p>

            {/* CTA */}
            <div className="mt-10">
              <a
                href="#booking"
                className="group inline-flex items-center gap-3 text-sm font-light text-silver transition-colors hover:text-foreground"
              >
                <span className="h-px w-8 bg-[var(--line-accent)] transition-all duration-300 group-hover:w-12 group-hover:bg-foreground" />
                {t.booking.label}
              </a>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div
          ref={statsRef}
          className={`mt-12 grid grid-cols-2 gap-px bg-border/20 lg:mt-20 lg:grid-cols-4 transition-all duration-1000 delay-400 ${
            statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1.5 bg-background py-7 px-4 text-center sm:py-10 sm:px-6"
            >
              <span className="text-2xl font-extralight tracking-tight text-foreground sm:text-3xl md:text-4xl">
                {stat.value}
              </span>
              <span className="text-[9px] font-light tracking-[0.2em] text-soft uppercase sm:text-[10px] sm:tracking-[0.25em]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
