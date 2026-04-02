"use client"

import { Car, UserCheck, Clock } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const MODES = [
  {
    num: "01",
    Icon: Car,
    title: "Self-Drive",
    subtitle: "Freedom & Flexibility",
    description:
      "Take the wheel yourself. Our fleet of new-model vehicles comes with unlimited mileage, full Casco insurance, and zero hidden fees — pick up wherever suits you.",
    bullets: ["Unlimited mileage", "New-model fleet", "Full Casco insurance", "Flexible pickup points"],
  },
  {
    num: "02",
    Icon: UserCheck,
    title: "With Driver",
    subtitle: "Comfort & Reliability",
    description:
      "Door-to-door private transfers across Europe. Your professional chauffeur handles routing and waiting time.",
    bullets: ["Door-to-door pickup", "Border fast-track", "Fixed price, no surprises", "Comfort, Business & Premium"],
  },
  {
    num: "03",
    Icon: Clock,
    title: "Hourly Hire",
    subtitle: "Business & Events",
    description:
      "Book a chauffeur by the hour for city meetings, corporate events, or airport runs. Flexible scheduling with no fixed destination required.",
    bullets: ["From 2 hours minimum", "City & intercity", "Ideal for business", "On-demand availability"],
  },
]

export function RentalModeGrid() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>()
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <section id="modes" ref={ref} className="relative border-b border-border/30 py-20 lg:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <div className={`mb-14 flex flex-col gap-6 lg:mb-20 lg:flex-row lg:items-end lg:justify-between transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div>
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-12 bg-silver/40" />
              <span className="text-[11px] font-light tracking-[0.4em] text-silver uppercase">How You Travel</span>
            </div>
            <h2 className="text-4xl font-extralight leading-tight tracking-tight text-foreground text-balance md:text-5xl lg:text-6xl">
              Choose Your
              <br />
              <span className="text-silver">Travel Mode</span>
            </h2>
          </div>
          <p className="max-w-md text-sm font-light leading-relaxed text-muted-foreground lg:text-right">
            Whether you prefer the open road solo or the ease of a dedicated chauffeur, we have the right solution for every journey.
          </p>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 gap-px bg-border/20 md:grid-cols-3">
          {MODES.map((m, i) => (
            <div
              key={m.num}
              className={`group relative flex flex-col bg-background p-8 transition-all duration-700 hover:bg-card/60 lg:p-10 ${cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <span className="mb-8 select-none text-5xl font-extralight text-foreground/10">{m.num}</span>
              <div className="mb-6 flex h-12 w-12 items-center justify-center border border-border/40 transition-colors group-hover:border-silver/30">
                <m.Icon className="h-5 w-5 text-silver/60 transition-colors group-hover:text-silver" />
              </div>
              <p className="mb-1 text-[10px] font-light tracking-[0.3em] text-silver/50 uppercase">{m.subtitle}</p>
              <h3 className="mb-4 text-xl font-light tracking-wide text-foreground">{m.title}</h3>
              <p className="mb-6 text-sm font-light leading-relaxed text-muted-foreground">{m.description}</p>
              <ul className="mt-auto flex flex-col gap-2 border-t border-border/20 pt-6">
                {m.bullets.map(b => (
                  <li key={b} className="flex items-center gap-3 text-xs font-light text-muted-foreground/70">
                    <span className="h-px w-3 flex-shrink-0 bg-silver/40" />
                    {b}
                  </li>
                ))}
              </ul>
              <a
                href="#booking"
                className="mt-8 inline-flex items-center gap-2 text-xs font-light tracking-[0.2em] text-silver/50 uppercase transition-colors hover:text-foreground group-hover:text-silver/80"
              >
                <span className="h-px w-5 bg-current transition-all duration-300 group-hover:w-8" />
                Book Now
              </a>
              <div className="absolute bottom-0 left-0 h-px w-0 bg-silver/30 transition-all duration-700 group-hover:w-full" />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
