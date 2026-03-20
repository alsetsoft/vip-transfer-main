import type { Metadata } from "next"
import dynamic from "next/dynamic"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { RentalFleet } from "@/components/rental/rental-fleet"
import { RentalBenefits } from "@/components/rental/rental-benefits"
import { RentalFAQ } from "@/components/rental/rental-faq"
import SelfDriveForm from "./_self-drive-form"

const Reviews = dynamic(() => import("@/components/reviews").then(m => ({ default: m.Reviews })))
const Footer = dynamic(() => import("@/components/footer").then(m => ({ default: m.Footer })))

export const metadata: Metadata = {
  title: "Self-Drive Car Rental | Elite Fleet Across Europe | Movi Transfer",
  description:
    "Rent a premium Mercedes-Benz without a driver. Unlimited freedom, full insurance, flexible pick-up across Europe. Reserve your self-drive today.",
}

const FEATURES = [
  "Current-year Mercedes-Benz",
  "Full insurance included",
  "Flexible pick-up locations",
  "Unlimited mileage options",
  "24/7 roadside assistance",
  "Free cancellation 24h prior",
]

export default function SelfDrivePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[100svh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/highway.jpg"
            alt="Open European highway at sunrise — self-drive freedom"
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
                  Freedom on Your Terms
                </span>
              </div>

              <h1 className="mb-6 text-[2.4rem] font-extralight leading-[1.07] tracking-tight text-foreground text-balance sm:text-5xl md:text-6xl lg:text-7xl">
                Open Road,
                <br />
                <span className="font-light text-silver">Your Rules.</span>
              </h1>

              <p className="mb-8 max-w-sm text-sm font-light leading-relaxed text-muted-foreground sm:max-w-lg sm:text-base">
                Premium Mercedes-Benz vehicles at your disposal. No driver, no schedule — just you, the road, and total freedom to explore Europe at your own pace.
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

            {/* Booking form — defaulted to self-drive mode */}
            <SelfDriveForm />
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
