"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Globe, Wrench, FileText, Shield } from "lucide-react"
import { useTranslation } from "@/lib/language-context"

export function Trust() {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollReveal<HTMLElement>()

  const features = [
    {
      icon: Globe,
      title: t.trust.feat1Title,
      description: t.trust.feat1Desc,
      stat: t.trust.feat1Stat,
      statLabel: t.trust.feat1StatLabel,
    },
    {
      icon: Wrench,
      title: t.trust.feat2Title,
      description: t.trust.feat2Desc,
      stat: t.trust.feat2Stat,
      statLabel: t.trust.feat2StatLabel,
    },
    {
      icon: FileText,
      title: t.trust.feat3Title,
      description: t.trust.feat3Desc,
      stat: t.trust.feat3Stat,
      statLabel: t.trust.feat3StatLabel,
    },
    {
      icon: Shield,
      title: t.trust.feat4Title,
      description: t.trust.feat4Desc,
      stat: t.trust.feat4Stat,
      statLabel: t.trust.feat4StatLabel,
    },
  ]

  return (
    <section id="trust" ref={ref} className="relative py-20 lg:py-40 bg-card/30">
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
              {t.trust.label}
            </span>
            <span className="h-px w-12 bg-silver/40" />
          </div>
          <h2 className="text-4xl font-extralight tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
            {t.trust.title1}
            <br />
            <span className="text-silver">{t.trust.title2}</span>
          </h2>
        </div>

        {/* Feature Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`group relative border border-border/30 bg-background/50 p-6 sm:p-8 backdrop-blur-sm transition-all duration-700 hover:border-silver/20 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${400 + i * 150}ms` }}
            >
              <div className="mb-8 flex h-14 w-14 items-center justify-center border border-border/40 transition-colors group-hover:border-silver/30">
                <feature.icon className="h-6 w-6 text-silver/70 transition-colors group-hover:text-silver" />
              </div>
              <div className="mb-6">
                <span className="text-3xl font-extralight text-foreground">
                  {feature.stat}
                </span>
                <span className="ml-2 text-[10px] font-light tracking-[0.3em] text-silver/50 uppercase">
                  {feature.statLabel}
                </span>
              </div>
              <h3 className="mb-3 text-sm font-light tracking-wide text-foreground">
                {feature.title}
              </h3>
              <p className="text-xs font-light leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
              <div className="absolute right-0 top-0 h-8 w-px bg-silver/0 transition-all duration-500 group-hover:bg-silver/20" />
              <div className="absolute right-0 top-0 h-px w-8 bg-silver/0 transition-all duration-500 group-hover:bg-silver/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
