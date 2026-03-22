"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { SearchIcon, Car, CreditCard } from "lucide-react"
import { useTranslation } from "@/lib/language-context"

export function RentalHowItWorks() {
  const { t } = useTranslation()

  const STEPS = [
    {
      num: "01",
      Icon: SearchIcon,
      title: t.rentalPage.step1Title,
      description: t.rentalPage.step1Desc,
    },
    {
      num: "02",
      Icon: Car,
      title: t.rentalPage.step2Title,
      description: t.rentalPage.step2Desc,
    },
    {
      num: "03",
      Icon: CreditCard,
      title: t.rentalPage.step3Title,
      description: t.rentalPage.step3Desc,
    },
  ]
  const { ref, isVisible } = useScrollReveal<HTMLElement>()

  return (
    <section id="how-it-works" ref={ref} className="relative border-b border-border/30 py-20 lg:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <div className={`mb-14 text-center transition-all duration-1000 lg:mb-20 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="mb-4 inline-flex items-center gap-4">
            <span className="h-px w-12 bg-silver/40" />
            <span className="text-[11px] font-light tracking-[0.4em] text-silver uppercase">{t.rentalPage.howItWorks}</span>
            <span className="h-px w-12 bg-silver/40" />
          </div>
          <h2 className="text-4xl font-extralight tracking-tight text-foreground text-balance md:text-5xl">
            {t.rentalPage.bookIn3Steps}
          </h2>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 gap-px bg-border/20 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`group relative flex flex-col bg-background p-8 transition-all duration-700 lg:p-12 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              <span className="mb-6 select-none tabular-nums text-6xl font-extralight text-foreground/8">{step.num}</span>
              <div className="mb-6 flex h-11 w-11 items-center justify-center border border-border/40 transition-colors group-hover:border-silver/30">
                <step.Icon className="h-4 w-4 text-silver/60 transition-colors group-hover:text-silver" />
              </div>
              <h3 className="mb-3 text-base font-light tracking-wide text-foreground">{step.title}</h3>
              <p className="text-sm font-light leading-relaxed text-muted-foreground">{step.description}</p>
              <div className="absolute bottom-0 left-0 h-px w-0 bg-silver/25 transition-all duration-700 group-hover:w-full" />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
