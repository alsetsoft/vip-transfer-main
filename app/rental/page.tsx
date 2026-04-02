import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { Navbar } from "@/components/navbar"
import { RentalHero } from "@/components/rental/rental-hero"
import { RentalModeGrid } from "@/components/rental/rental-mode-grid"
import { RentalFleet } from "@/components/rental/rental-fleet"
import { RentalHowItWorks } from "@/components/rental/rental-how-it-works"
import { RentalBenefits } from "@/components/rental/rental-benefits"
import { RentalDestinations } from "@/components/rental/rental-destinations"
import { RentalFAQ } from "@/components/rental/rental-faq"

const Reviews = dynamic(() => import("@/components/reviews").then(m => ({ default: m.Reviews })))
const Footer = dynamic(() => import("@/components/footer").then(m => ({ default: m.Footer })))

export const metadata: Metadata = {
  title: "Car Rental & Transfers | Movi Transfer",
  description:
    "Premium car rental and private transfers across Europe. Self-drive, with driver, or hourly hire — Comfort, Business and Premium fleet available.",
}

export default function RentalPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <RentalHero />
      <RentalModeGrid />
      <RentalFleet />
      <RentalHowItWorks />
      <RentalBenefits />
      <Reviews />
      <RentalDestinations />
      <RentalFAQ />
      <Footer />
    </main>
  )
}
