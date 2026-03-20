"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useTranslation } from "@/lib/language-context"
import { FileCheck, Route, MessageSquare, Package, ArrowRight } from "lucide-react"

export function BorderCrossing() {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollReveal<HTMLElement>()

  const steps = [
    {
      icon: FileCheck,
      title: t.borderCrossing.step1Title,
      desc: t.borderCrossing.step1Desc,
    },
    {
      icon: Route,
      title: t.borderCrossing.step2Title,
      desc: t.borderCrossing.step2Desc,
    },
    {
      icon: MessageSquare,
      title: t.borderCrossing.step3Title,
      desc: t.borderCrossing.step3Desc,
    },
    {
      icon: Package,
      title: t.borderCrossing.step4Title,
      desc: t.borderCrossing.step4Desc,
    },
    {
      icon: ArrowRight,
      title: t.borderCrossing.step5Title,
      desc: t.borderCrossing.step5Desc,
    },
  ]

  const stats = [
    { value: t.borderCrossing.stat1, label: t.borderCrossing.stat1Label },
    { value: t.borderCrossing.stat2, label: t.borderCrossing.stat2Label },
    { value: t.borderCrossing.stat3, label: t.borderCrossing.stat3Label },
  ]

  return (
    <section ref={ref} className="relative py-20 lg:py-40 bg-background overflow-hidden">
      {/* Background accent line */}
      <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-border/40 to-transparent -translate-x-1/2 hidden lg:block" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div
          className={`mb-12 flex flex-col items-center text-center transition-all duration-1000 lg:mb-20 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-silver/40" />
            <span className="text-[11px] font-light tracking-[0.4em] text-silver uppercase">
              {t.borderCrossing.label}
            </span>
            <span className="h-px w-12 bg-silver/40" />
          </div>
          <h2 className="text-4xl font-extralight tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
            {t.borderCrossing.title1}
            <br />
            <span className="text-silver">{t.borderCrossing.title2}</span>
          </h2>
          <p className="mt-6 max-w-xl text-sm font-light leading-relaxed text-muted-foreground">
            {t.borderCrossing.description}
          </p>
        </div>

        {/* Stats Bar */}
        <div
          className={`mb-12 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-0 lg:mb-20 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-1 sm:px-12">
              {i > 0 && (
                <div className="hidden sm:block absolute h-12 w-px bg-border/40" style={{ left: 0 }} />
              )}
              <span className="text-3xl font-extralight text-foreground lg:text-4xl">
                {stat.value}
              </span>
              <span className="text-[10px] font-light tracking-[0.2em] text-silver/60 uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Stats dividers (separate for clean layout) */}
        <div className="hidden sm:flex justify-center mb-0 -mt-20">
          <div className="flex items-center">
            <div className="w-32" />
            <div className="h-12 w-px bg-border/30" />
            <div className="w-40" />
            <div className="h-12 w-px bg-border/30" />
            <div className="w-32" />
          </div>
        </div>

        {/* Steps - Alternating Timeline */}
        <div className="relative mt-8">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-silver/20 via-silver/10 to-transparent lg:left-1/2 lg:-translate-x-1/2" />

          <div className="flex flex-col gap-16 lg:gap-20">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0
              return (
                <div
                  key={i}
                  className={`relative flex flex-col lg:flex-row lg:items-start transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  } ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                  style={{ transitionDelay: `${500 + i * 150}ms` }}
                >
                  {/* Step Number Node */}
                  <div className="absolute left-6 -translate-x-1/2 flex h-12 w-12 items-center justify-center border border-silver/20 bg-background z-10 lg:left-1/2">
                    <span className="text-xs font-light tracking-wider text-silver">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content Card */}
                  <div
                    className={`ml-16 lg:ml-0 lg:w-[calc(50%-3rem)] ${
                      isLeft ? "lg:pr-0 lg:text-right" : "lg:pl-0 lg:text-left"
                    }`}
                  >
                    <div
                      className={`group border border-border/20 bg-card/40 p-8 backdrop-blur-sm transition-all duration-500 hover:border-silver/15 hover:bg-card/60 ${
                        isLeft ? "lg:ml-auto lg:mr-0" : "lg:mr-auto lg:ml-0"
                      } max-w-lg`}
                    >
                      <div
                        className={`mb-5 flex items-center gap-3 ${
                          isLeft ? "lg:justify-end" : "lg:justify-start"
                        }`}
                      >
                        {isLeft && (
                          <h3 className="text-base font-light tracking-wide text-foreground hidden lg:block">
                            {step.title}
                          </h3>
                        )}
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-border/30 transition-colors group-hover:border-silver/25">
                          <step.icon className="h-4.5 w-4.5 text-silver/60 transition-colors group-hover:text-silver" />
                        </div>
                        {(!isLeft || true) && (
                          <h3 className={`text-base font-light tracking-wide text-foreground ${isLeft ? "lg:hidden" : ""}`}>
                            {step.title}
                          </h3>
                        )}
                      </div>
                      <p className={`text-xs font-light leading-relaxed text-muted-foreground ${isLeft ? "lg:text-right" : "lg:text-left"}`}>
                        {step.desc}
                      </p>
                      {/* Accent corner */}
                      <div className={`absolute ${isLeft ? "right-0 top-0" : "left-0 top-0"} h-6 w-px bg-silver/0 transition-all duration-500 group-hover:bg-silver/15`} />
                      <div className={`absolute ${isLeft ? "right-0 top-0" : "left-0 top-0"} h-px w-6 bg-silver/0 transition-all duration-500 group-hover:bg-silver/15`} />
                    </div>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden lg:block lg:w-[calc(50%-3rem)]" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
