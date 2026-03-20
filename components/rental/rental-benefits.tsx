"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Tag, Clock, RotateCcw, ShieldCheck } from "lucide-react"

const BENEFITS = [
  { Icon: Tag,        title: "Fixed Prices",       desc: "No surge pricing. The price you see is what you pay." },
  { Icon: Clock,      title: "24 / 7 Support",     desc: "Round-the-clock assistance on every booking." },
  { Icon: RotateCcw,  title: "Free Cancellation",  desc: "Cancel up to 24 h before departure at no cost." },
  { Icon: ShieldCheck,title: "Vetted Drivers",      desc: "All chauffeurs pass background checks and training." },
]

export function RentalBenefits() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} className="relative border-b border-border/30">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-px bg-border/20 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b, i) => (
            <div
              key={b.title}
              className={`group flex flex-col gap-4 bg-background px-8 py-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex h-10 w-10 items-center justify-center border border-border/40 transition-colors group-hover:border-silver/30">
                <b.Icon className="h-4 w-4 text-silver/60 transition-colors group-hover:text-silver" />
              </div>
              <div>
                <p className="mb-1 text-sm font-light tracking-wide text-foreground">{b.title}</p>
                <p className="text-xs font-light leading-relaxed text-muted-foreground">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
