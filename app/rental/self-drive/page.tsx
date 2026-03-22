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
                  Freedom on Your Terms
                </span>
              </div>

              <h1 className="mb-6 text-3xl font-extralight leading-[1.08] tracking-tight text-foreground text-balance sm:text-4xl md:text-5xl lg:text-6xl">
                Open Road,
                <br />
                <span className="text-silver">Your Rules.</span>
              </h1>

              <p className="mb-8 max-w-md text-sm font-light leading-relaxed text-muted-foreground sm:text-base">
                Premium Mercedes-Benz vehicles at your disposal. No driver, no schedule — just you, the road, and total freedom to explore Europe at your own pace.
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
                  src="/images/highway.jpg"
                  alt="Open European highway at sunrise — self-drive freedom"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
                <div className="absolute bottom-4 left-5 border border-white/20 bg-black/40 px-4 py-2 backdrop-blur-sm">
                  <span className="text-[10px] font-light tracking-[0.3em] text-white/80 uppercase">Self-Drive</span>
                </div>
              </div>
            </div>

            {/* Right — Booking form */}
            <div className="lg:sticky lg:top-28">
              <SelfDriveForm />
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
