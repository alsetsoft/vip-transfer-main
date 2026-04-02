import dynamic from "next/dynamic"
import { StructuredData } from "@/components/structured-data"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Services } from "@/components/services"
import { Routes } from "@/components/routes"

const Trust = dynamic(() => import("@/components/trust").then(m => ({ default: m.Trust })))
const Reviews = dynamic(() => import("@/components/reviews").then(m => ({ default: m.Reviews })))
const FAQ = dynamic(() => import("@/components/faq").then(m => ({ default: m.FAQ })))
const Booking = dynamic(() => import("@/components/booking").then(m => ({ default: m.Booking })))
const Footer = dynamic(() => import("@/components/footer").then(m => ({ default: m.Footer })))

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <StructuredData />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Routes />
      <Trust />
      <Reviews />
      <FAQ />
      <Booking />
      <Footer />
    </main>
  )
}
