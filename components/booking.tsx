"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useTranslation } from "@/lib/language-context"
import { UniversalBookingForm } from "@/components/universal-booking-form"

export function Booking() {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollReveal<HTMLElement>()

  return (
    <section id="booking" ref={ref} className="relative py-20 lg:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-24">

          {/* Left — Copy */}
          <div className={`flex flex-col justify-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-silver/40" />
              <span className="text-[11px] font-light tracking-[0.4em] text-silver uppercase">{t.booking.label}</span>
            </div>
            <h2 className="text-4xl font-extralight tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
              {t.booking.title1}
              <br />
              <span className="text-silver">{t.booking.title2}</span>
            </h2>
            <p className="mt-8 max-w-md text-base font-light leading-relaxed text-muted-foreground">
              {t.booking.description}
            </p>
            <div className="mt-12 flex flex-col gap-4 border-t border-border/40 pt-8">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-light tracking-[0.3em] text-hint uppercase w-20">{t.booking.phone}</span>
                <a href="tel:+4930123456789" className="text-sm font-light text-foreground transition-colors hover:text-silver">+49 30 1234 5678</a>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-light tracking-[0.3em] text-hint uppercase w-20">{t.booking.email}</span>
                <a href="mailto:reservations@movitransfer.eu" className="text-sm font-light text-foreground transition-colors hover:text-silver">reservations@movitransfer.eu</a>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-light tracking-[0.3em] text-hint uppercase w-20">{t.booking.hours}</span>
                <span className="text-sm font-light text-foreground">{t.booking.availability}</span>
              </div>
            </div>
          </div>

          {/* Right — Universal Form */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <UniversalBookingForm />
          </div>

        </div>
      </div>
    </section>
  )
}
