"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const FAQS = [
  {
    q: "Is full insurance included in the rental price?",
    a: "Yes. All vehicles come with full Casco insurance and third-party liability coverage. There is no excess for standard damage unless caused by gross negligence.",
  },
  {
    q: "Are child seats available?",
    a: "Child seats and booster seats are available on request at no additional cost. Please mention the age and weight of the child when booking.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept cash (EUR, USD, UAH, PLN), Visa / Mastercard, and bank transfer. Payment can be made at pickup or in advance by invoice.",
  },
  {
    q: "Can I book a one-way trip with no return?",
    a: "Absolutely. All routes are available as one-way transfers. Simply select your origin and destination in the booking form and leave the return date blank.",
  },
  {
    q: "What happens if my flight is delayed?",
    a: "We monitor all flight arrivals in real time. Your driver will wait at no extra charge for up to 60 minutes after the actual landing time.",
  },
]

export function RentalFAQ() {
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
              <span className="text-[11px] font-light tracking-[0.4em] text-silver uppercase">FAQ</span>
            </div>
            <h2 className="mb-6 text-4xl font-extralight leading-tight tracking-tight text-foreground text-balance md:text-5xl">
              Common
              <br />
              <span className="text-silver">Questions</span>
            </h2>
            <p className="text-sm font-light leading-relaxed text-muted-foreground">
              Everything you need to know about renting or booking a transfer with Movi Transfer. Still have questions? Call us any time.
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
