"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useTranslation } from "@/lib/language-context"

export function RentalFAQ() {
  const { t } = useTranslation()

  const FAQS = [
    { q: t.rentalPage.faq1Q, a: t.rentalPage.faq1A },
    { q: t.rentalPage.faq2Q, a: t.rentalPage.faq2A },
    { q: t.rentalPage.faq3Q, a: t.rentalPage.faq3A },
    { q: t.rentalPage.faq4Q, a: t.rentalPage.faq4A },
    { q: t.rentalPage.faq5Q, a: t.rentalPage.faq5A },
  ]
  const { ref, isVisible } = useScrollReveal<HTMLElement>()
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" ref={ref} className="relative bg-card/30 py-20 lg:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-24">

          {/* Left */}
          <div className={`flex flex-col transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-12 bg-silver/40" />
              <span className="text-[11px] font-light tracking-[0.4em] text-silver uppercase">{t.rentalPage.faqLabel}</span>
            </div>
            <h2 className="mb-6 text-4xl font-extralight leading-tight tracking-tight text-foreground text-balance md:text-5xl">
              {t.rentalPage.faqHeadline1}
              <br />
              <span className="text-silver">{t.rentalPage.faqHeadline2}</span>
            </h2>
            <p className="text-sm font-light leading-relaxed text-muted-foreground">
              {t.rentalPage.faqDescription}
            </p>
            <a
              href="tel:+380671234567"
              className="mt-8 inline-flex items-center gap-3 text-sm font-light text-silver/60 transition-colors hover:text-foreground"
            >
              <span className="h-px w-6 bg-silver/40" />
              +380 067 1234 567
            </a>
          </div>

          {/* Right — accordion */}
          <div className={`flex flex-col divide-y divide-border/40 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {FAQS.map((faq, i) => (
              <div key={i} className="group">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-start justify-between gap-6 py-6 text-left"
                  aria-expanded={open === i}
                >
                  <span className="text-sm font-light leading-relaxed text-foreground/80 group-hover:text-foreground transition-colors">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`mt-0.5 h-4 w-4 flex-shrink-0 text-silver/40 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${open === i ? "max-h-48 pb-6" : "max-h-0"}`}
                >
                  <p className="text-sm font-light leading-relaxed text-muted-foreground">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
