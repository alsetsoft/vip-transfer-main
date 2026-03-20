import type { Metadata } from "next"
import dynamic from "next/dynamic"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { RentalFleet } from "@/components/rental/rental-fleet"
import { RentalBenefits } from "@/components/rental/rental-benefits"
import { RentalFAQ } from "@/components/rental/rental-faq"
import WithDriverForm from "./_with-driver-form"

const Reviews = dynamic(() => import("@/components/reviews").then(m => ({ default: m.Reviews })))
const Footer = dynamic(() => import("@/components/footer").then(m => ({ default: m.Footer })))

export const metadata: Metadata = {
  title: "Rent with Driver | Premium Chauffeured Transfers | Movi Transfer",
  description:
    "Book a premium chauffeured transfer with a professional driver across Europe. Mercedes-Benz fleet, fixed pricing, door-to-door service — available 24/7.",
}

const FEATURES = [
  "Professional certified driver",
  "Fixed all-inclusive pricing",
  "Meet & greet included",
  "Wi-Fi & refreshments on board",
  "24/7 concierge support",
  "Free cancellation 24h prior",
]

export default function WithDriverPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[100svh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/about-chauffeur.jpg"
            alt="Professional chauffeur standing beside a luxury Mercedes-Benz"
            fill
            sizes="100vw"
            className="object-cover"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-background/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="grid min-h-[100svh] items-center gap-12 py-28 lg:grid-cols-[1fr_500px] lg:gap-20 lg:py-40">

            {/* Copy */}
            <div className="flex flex-col">
              <div className="mb-6 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-silver/60" />
                <span className="text-[10px] font-light tracking-[0.4em] text-silver uppercase">
                  Chauffeured Excellence
                </span>
              </div>

              <h1 className="mb-6 text-[2.4rem] font-extralight leading-[1.07] tracking-tight text-foreground text-balance sm:text-5xl md:text-6xl lg:text-7xl">
                Your Journey,
                <br />
                <span className="font-light text-silver">Our Chauffeur.</span>
              </h1>

              <p className="mb-8 max-w-sm text-sm font-light leading-relaxed text-muted-foreground sm:max-w-lg sm:text-base">
                A dedicated, professional driver. A current-year Mercedes-Benz. Door-to-door comfort with zero effort on your part — across any European city or route.
              </p>

              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {FEATURES.map((f) => (
                  <span key={f} className="flex items-center gap-2 text-xs font-light text-muted-foreground/60">
                    <span className="h-px w-3 bg-silver/40" />
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Booking form — defaulted to chauffeur mode */}
            <WithDriverForm />
          </div>
        </div>
      </section>

      <RentalFleet />
      <RentalBenefits />
      <Reviews />
      <RentalFAQ />
      <Footer />
    </main>
  )
}
