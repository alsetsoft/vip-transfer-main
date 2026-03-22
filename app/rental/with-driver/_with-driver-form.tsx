"use client"

import { useEffect } from "react"
import { useBooking } from "@/lib/booking-context"
import { UniversalBookingForm } from "@/components/universal-booking-form"

export default function WithDriverForm() {
  const { setMode } = useBooking()

  useEffect(() => {
    setMode("chauffeur")
  }, [setMode])

  return (
    <div
      id="booking"
      className="w-full border border-border/30 bg-background/85 backdrop-blur-md p-6 sm:p-8"
    >
      <p className="mb-6 text-[9px] font-light tracking-[0.4em] text-silver/50 uppercase">
        Book with Driver
      </p>
      <UniversalBookingForm lockedMode="chauffeur" />
    </div>
  )
}
