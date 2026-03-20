"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { SearchIcon, Car, CreditCard } from "lucide-react"

const STEPS = [
  {
    num: "01",
    Icon: SearchIcon,
    title: "Select Route & Dates",
    description:
      "Enter your origin city, destination, travel date, and number of passengers in the booking form.",
  },
  {
    num: "02",
    Icon: Car,
    title: "Choose Your Vehicle",
    description:
      "Pick the vehicle class that suits your needs — Comfort, Business, or Premium. See exact models and capacity.",
  },
  {
    num: "03",
    Icon: CreditCard,
    title: "Confirm & Pay Securely",
    description:
      "Choose your payment method — cash, card, or bank transfer. Receive instant confirmation to your email.",
  },
]

export function HowItWorks() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} className="relative py-16 lg:py-32 border-b border-border/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className={`mb-12 lg:mb-20 text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="mb-4 inline-flex items-center gap-4">
            <span className="h-px w-12 bg-silver/40" />
            <span className="text-[11px] font-light tracking-[0.4em] text-silver uppercase">How It Works</span>
            <span className="h-px w-12 bg-silver/40" />
          </div>
          <h2 className="text-4xl font-extralight tracking-tight text-foreground md:text-5xl text-balance">
            Book in <span className="text-silver">3 Simple Steps</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-px bg-border/20 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`group relative flex flex-col bg-background p-8 lg:p-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              <span className="mb-6 text-6xl font-extralight text-foreground/8 select-none tabular-nums">
                {step.num}
              </span>
              <div className="mb-6 flex h-11 w-11 items-center justify-center border border-border/40 transition-colors group-hover:border-silver/30">
                <step.Icon className="h-4.5 w-4.5 text-silver/60 transition-colors group-hover:text-silver" />
              </div>
              <h3 className="mb-3 text-base font-light tracking-wide text-foreground">{step.title}</h3>
              <p className="text-sm font-light leading-relaxed text-muted-foreground">{step.description}</p>
              {i < STEPS.length - 1 && (
                <div className="absolute right-0 top-1/2 hidden h-px w-px -translate-y-1/2 md:block">
                  <span className="absolute right-[-1px] top-0 h-px w-8 bg-border/30" />
                </div>
              )}
              <div className="absolute bottom-0 left-0 h-px w-0 bg-silver/25 transition-all duration-700 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
