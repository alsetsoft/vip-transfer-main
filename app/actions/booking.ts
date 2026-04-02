"use server"

import { createClient } from "@/lib/supabase/server"

export type BookingPayload = {
  source: "main_form" | "route_modal"
  first_name: string
  last_name: string
  email?: string
  phone?: string
  origin_city?: string
  origin_country?: string
  destination_city?: string
  destination_country?: string
  travel_date?: string
  passengers: number
  payment_type?: string
  vehicle_class?: string
  route_city?: string
  route_country?: string
  route_code?: string
  direction?: string
  return_date?: string
  special_requests?: string
}

export async function submitBooking(payload: BookingPayload) {
  const supabase = await createClient()

  const { error } = await supabase.from("bookings").insert([payload])

  if (error) {
    console.error("[v0] Supabase insert error:", error.message)
    return { success: false, error: error.message }
  }

  return { success: true }
}
