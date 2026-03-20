"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { useTranslation } from "@/lib/language-context"

export function FAQ() {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollReveal<HTMLElement>()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqs = [
    { question: t.faq.q1, answer: t.faq.a1 },
    { question: t.faq.q2, answer: t.faq.a2 },
    { question: t.faq.q3, answer: t.faq.a3 },
    { question: t.faq.q4, answer: t.faq.a4 },
    { question: t.faq.q5, answer: t.faq.a5 },
    { question: t.faq.q6, answer: t.faq.a6 },
    { question: t.faq.q7, answer: t.faq.a7 },
    { question: t.faq.q8, answer: t.faq.a8 },
    { question: t.faq.q9, answer: t.faq.a9 },
    { question: t.faq.q10, answer: t.faq.a10 },
  ]

  return (
    <section id="faq" ref={ref} className="relative py-20 lg:py-40 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
          {/* Left - Header */}
          <div
            className={`flex flex-col transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-silver/40" />
              <span className="text-[11px] font-light tracking-[0.4em] text-silver uppercase">
                {t.faq.label}
              </span>
            </div>
            <h2 className="text-4xl font-extralight tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
              {t.faq.title1}
              <br />
              {t.faq.title2}
              <br />
              <span className="text-silver">{t.faq.title3}</span>
            </h2>
            <p className="mt-8 max-w-sm text-base font-light leading-relaxed text-muted-foreground">
              {t.faq.description}
            </p>

            {/* Contact CTA */}
            <a
              href="#booking"
              className="group mt-10 inline-flex items-center gap-3 text-sm font-light text-silver transition-colors hover:text-foreground"
            >
              <span className="h-px w-8 bg-silver/40 transition-all duration-300 group-hover:w-12 group-hover:bg-foreground" />
              {t.faq.contactUs}
            </a>
          </div>

          {/* Right - Accordion */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex flex-col">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="border-b border-border/30 first:border-t first:border-border/30"
                >
                  <button
                    onClick={() => toggle(i)}
                    className="group flex w-full items-center justify-between py-6 text-left transition-colors"
                    aria-expanded={openIndex === i}
                  >
                    <span
                      className={`flex items-center gap-4 text-sm font-light tracking-wide transition-colors ${
                        openIndex === i ? "text-foreground" : "text-muted-foreground"
                      } group-hover:text-foreground`}
                    >
                      <span className="text-[10px] font-light text-silver/30 tabular-nums w-5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-silver/40 transition-transform duration-300 ${
                        openIndex === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      openIndex === i
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 pl-9 text-sm font-light leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
