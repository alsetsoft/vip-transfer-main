"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { ArrowRight } from "lucide-react"

const DESTINATIONS = [
  { from: "Warsaw",  to: "Berlin",    km: "570 km",  time: "~6 h"  },
  { from: "Warsaw",  to: "Prague",    km: "680 km",  time: "~7 h"  },
  { from: "Krak\u00f3w",  to: "Vienna",    km: "460 km",  time: "~5 h"  },
  { from: "Krak\u00f3w",  to: "Budapest",  km: "380 km",  time: "~4.5 h"},
  { from: "Berlin",  to: "Amsterdam", km: "650 km",  time: "~7 h"  },
  { from: "Warsaw",  to: "Budapest",  km: "850 km",  time: "~9 h"  },
  { from: "Warsaw",  to: "Vienna",    km: "730 km",  time: "~7.5 h"},
  { from: "Krak\u00f3w",  to: "Bratislava",km: "420 km",  time: "~4.5 h"},
  { from: "Prague",  to: "Vienna",    km: "330 km",  time: "~3.5 h"},
  { from: "Prague",  to: "Berlin",    km: "355 km",  time: "~4 h"  },
]

export function RentalDestinations() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} className="relative border-b border-border/30 py-20 lg:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <div className={`mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div>
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-12 bg-silver/40" />
              <span className="text-[11px] font-light tracking-[0.4em] text-silver uppercase">Popular Routes</span>
            </div>
            <h2 className="text-4xl font-extralight tracking-tight text-foreground text-balance md:text-5xl">
              Where We
              <br />
              <span className="text-silver">Travel</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm font-light leading-relaxed text-muted-foreground lg:text-right">
            All routes include door-to-door service, border assistance, and a professional English-speaking driver.
          </p>
        </div>

        {/* Route grid */}
        <div className={`grid grid-cols-1 gap-px bg-border/20 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {DESTINATIONS.map((d, i) => (
            <a
              key={`${d.from}-${d.to}`}
              href="#booking"
              className="group flex items-center justify-between bg-background px-6 py-5 transition-all duration-300 hover:bg-card/60"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <span className="flex items-center gap-3 text-sm font-light text-foreground/80 group-hover:text-foreground">
                <span>{d.from}</span>
                <ArrowRight className="h-3.5 w-3.5 text-silver/40 transition-transform duration-300 group-hover:translate-x-1" />
                <span>{d.to}</span>
              </span>
              <span className="flex flex-col items-end gap-0.5">
                <span className="text-[10px] font-light text-muted-foreground/60">{d.km}</span>
                <span className="text-[10px] font-light text-muted-foreground/40">{d.time}</span>
              </span>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
