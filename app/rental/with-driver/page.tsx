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

      {/* Hero — Split layout */}
      <section className="relative min-h-[100svh] overflow-hidden">
        <div className="absolute inset-0 bg-background" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="grid min-h-[100svh] items-center gap-10 pt-28 pb-16 lg:grid-cols-2 lg:gap-16 lg:pt-32 lg:pb-20">

            {/* Left — copy + image */}
            <div className="flex flex-col">
              <div className="mb-6 inline-flex items-center gap-3">
                <span className="h-px w-10 bg-silver" />
                <span className="text-[10px] font-light tracking-[0.4em] text-silver uppercase">
                  Chauffeured Excellence
                </span>
              </div>

              <h1 className="mb-6 text-3xl font-extralight leading-[1.08] tracking-tight text-foreground text-balance sm:text-4xl md:text-5xl lg:text-6xl">
                Your Journey,
                <br />
                <span className="text-silver">Our Chauffeur.</span>
              </h1>

              <p className="mb-8 max-w-md text-sm font-light leading-relaxed text-muted-foreground sm:text-base">
                A dedicated, professional driver. A current-year Mercedes-Benz. Door-to-door comfort with zero effort on your part — across any European city or route.
              </p>

              <div className="flex flex-wrap gap-x-6 gap-y-2 mb-10">
                {FEATURES.map((f) => (
                  <span key={f} className="flex items-center gap-2 text-xs font-light text-muted-foreground">
                    <span className="h-px w-3 bg-silver" />
                    {f}
                  </span>
                ))}
              </div>

              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src="/images/about-chauffeur.jpg"
                  alt="Professional chauffeur standing beside a luxury Mercedes-Benz"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
                <div className="absolute bottom-4 left-5 border border-white/20 bg-black/40 px-4 py-2 backdrop-blur-sm">
                  <span className="text-[10px] font-light tracking-[0.3em] text-white/80 uppercase">With Driver</span>
                </div>
              </div>
            </div>

            {/* Right — Booking form */}
            <div className="lg:sticky lg:top-28">
              <WithDriverForm />
            </div>
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
