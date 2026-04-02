"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type BookingMode = "chauffeur" | "rental"

export type PaymentType = "cash100" | "split50" | "card"

export type VehicleClass = "comfort" | "business" | "premium"

export interface ChauffeurFields {
  firstName: string
  lastName: string
  phone: string
  originCity: string
  originCountry: string
  destinationCity: string
  destinationCountry: string
  travelDate: string
  passengers: number
  paymentType: PaymentType
  vehicleClass: VehicleClass
  specialRequests: string
}

export interface RentalFields {
  city: string
  pickupDate: string
  pickupTime: string
  returnDate: string
  returnTime: string
  sameLocation: boolean
  driverAge2669: boolean
}

interface BookingContextType {
  mode: BookingMode
  setMode: (m: BookingMode) => void
  chauffeur: ChauffeurFields
  setChauffeur: (fields: Partial<ChauffeurFields>) => void
  rental: RentalFields
  setRental: (fields: Partial<RentalFields>) => void
}

const defaultChauffeur: ChauffeurFields = {
  firstName: "",
  lastName: "",
  phone: "",
  originCity: "",
  originCountry: "",
  destinationCity: "",
  destinationCountry: "",
  travelDate: "",
  passengers: 1,
  paymentType: "cash100",
  vehicleClass: "comfort",
  specialRequests: "",
}

const defaultRental: RentalFields = {
  city: "",
  pickupDate: "",
  pickupTime: "10:30",
  returnDate: "",
  returnTime: "10:30",
  sameLocation: true,
  driverAge2669: true,
}

const BookingContext = createContext<BookingContextType | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<BookingMode>("chauffeur")
  const [chauffeur, setChauffeurState] = useState<ChauffeurFields>(defaultChauffeur)
  const [rental, setRentalState] = useState<RentalFields>(defaultRental)

  const setChauffeur = useCallback((fields: Partial<ChauffeurFields>) => {
    setChauffeurState(prev => ({ ...prev, ...fields }))
  }, [])

  const setRental = useCallback((fields: Partial<RentalFields>) => {
    setRentalState(prev => ({ ...prev, ...fields }))
  }, [])

  return (
    <BookingContext.Provider value={{ mode, setMode, chauffeur, setChauffeur, rental, setRental }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error("useBooking must be used within BookingProvider")
  return ctx
}
