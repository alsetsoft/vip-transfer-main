"use client"

import { useState } from "react"
import { ChevronDown, MapPin, Clock, Users, Briefcase, BadgeCheck, Car, Timer, MessageCircle, Baby } from "lucide-react"

interface RouteDetailBlocksProps {
  origin: string
  destination: string
  distanceKm: number
}

const VEHICLE_CLASSES = [
  {
    type: "Comfort",
    passengers: 4,
    luggage: "3 bags",
    times: (base: number) => `~${base}–${base + 1} h`,
    note: "VW Passat B8 · Skoda SuperB L&K · Mercedes Vito",
  },
  {
    type: "Business",
    passengers: 4,
    luggage: "4 bags",
    times: (base: number) => `~${base}–${base + 1} h`,
    note: "Audi A6 S Line · Mercedes E-Class · BMW 5 · Mercedes GLB",
  },
  {
    type: "Premium",
    passengers: 7,
    luggage: "7 bags",
    times: (base: number) => `~${base}–${base + 1} h`,
    note: "Mercedes V-Class · Audi A8 · Mercedes Sprinter · S-Class",
  },
]

const SERVICE_BENEFITS = [
  {
    icon: <MapPin className="h-5 w-5" />,
    title: "Door-to-Door",
    desc: (o: string, d: string) =>
      `Pickup at any address in ${o}, drop-off directly in ${d}. No detours, no transfers.`,
  },
  {
    icon: <Timer className="h-5 w-5" />,
    title: "Free Waiting Time",
    desc: () =>
      "60 minutes free waiting at airports, 15 minutes at all other addresses. No hidden fees for delays.",
  },
  {
    icon: <Car className="h-5 w-5" />,
    title: "Professional Drivers",
    desc: () =>
      "English-speaking, vetted, licensed chauffeurs with cross-border experience. Background-checked.",
  },
  {
    icon: <Baby className="h-5 w-5" />,
    title: "Child Seats",
    desc: () =>
      "Child and booster seats available on request at no extra charge. Please mention at booking.",
  },
]

const FAQS = (origin: string, destination: string, distanceKm: number) => [
  {
    q: `How far is it from ${origin} to ${destination}?`,
    a: `The distance from ${origin} to ${destination} is approximately ${distanceKm} km by road. The estimated transfer time depends on traffic and border conditions — we show a realistic range for each vehicle class above.`,
  },
  {
    q: "Can we stop for a break or coffee during the trip?",
    a: "Absolutely. Your driver will suggest comfort stops every 2–3 hours at motorway service areas. You can also request a stop at any time — just let your driver know.",
  },
  {
    q: "Is the price per person or per vehicle?",
    a: "All prices are per vehicle, not per person. A group of 2 or 4 pays the same fixed price — making private transfers more cost-effective than flights or trains for small groups.",
  },
  {
    q: `What happens if my flight to ${origin} is delayed?`,
    a: "We monitor your flight in real time. Your driver will adjust the pickup time automatically — no calls needed. The first 60 minutes of waiting at the airport are always free of charge.",
  },
]

export function RouteDetailBlocks({ origin, destination, distanceKm }: RouteDetailBlocksProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Estimate base travel hours from distance (~80 km/h average incl. stops)
  const baseHours = Math.round(distanceKm / 80)
  const faqs = FAQS(origin, destination, distanceKm)

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16 space-y-20 py-16">

      {/* ── BLOCK 1: Trip Overview & Comparison Table ──── */}
      <section>
        <div className="flex items-center gap-4 mb-10">
          <span className="text-[10px] font-light tracking-[0.4em] text-silver/40 uppercase shrink-0">
            Transfer Details
          </span>
          <span className="h-px flex-1 bg-border/20" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extralight tracking-tight text-foreground/85 mb-8 text-balance">
          {origin} to {destination} — Transfer Details
        </h2>

        {/* Fixed Price badge */}
        <div className="flex items-center gap-2 mb-8">
          <BadgeCheck className="h-4 w-4 text-emerald-500/70" />
          <span className="text-xs font-light tracking-[0.2em] text-emerald-500/70 uppercase">
            Fixed Price Guarantee — your fare never changes due to traffic or delays
          </span>
        </div>

        {/* Vehicle comparison table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse text-sm font-light">
            <thead>
              <tr className="border-b border-border/20">
                {["Vehicle Type", "Max Passengers", "Luggage", "Est. Travel Time", ""].map((h) => (
                  <th
                    key={h}
                    className="py-3 pr-8 text-left text-[10px] font-light tracking-[0.3em] text-silver/40 uppercase last:pr-0"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {VEHICLE_CLASSES.map((v, i) => (
                <tr
                  key={v.type}
                  className="border-b border-border/10 group hover:bg-card/30 transition-colors duration-200"
                >
                  <td className="py-5 pr-8">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-foreground/80 tracking-wide">{v.type}</span>
                      <span className="text-[11px] text-muted-foreground/50">{v.note}</span>
                    </div>
                  </td>
                  <td className="py-5 pr-8">
                    <span className="flex items-center gap-1.5 text-muted-foreground/70">
                      <Users className="h-3.5 w-3.5 text-border/50" />
                      up to {v.passengers}
                    </span>
                  </td>
                  <td className="py-5 pr-8">
                    <span className="flex items-center gap-1.5 text-muted-foreground/70">
                      <Briefcase className="h-3.5 w-3.5 text-border/50" />
                      {v.luggage}
                    </span>
                  </td>
                  <td className="py-5 pr-8">
                    <span className="flex items-center gap-1.5 text-muted-foreground/70">
                      <Clock className="h-3.5 w-3.5 text-border/50" />
                      {v.times(baseHours)}
                    </span>
                  </td>
                  <td className="py-5 text-right">
                    <a
                      href="/#booking"
                      className="text-[10px] font-light tracking-[0.25em] text-silver/40 uppercase hover:text-foreground/70 transition-colors duration-200 whitespace-nowrap"
                    >
                      Book &rarr;
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── BLOCK 2: Service Benefits ──────────────────── */}
      <section>
        <div className="flex items-center gap-4 mb-10">
          <span className="text-[10px] font-light tracking-[0.4em] text-silver/40 uppercase shrink-0">
            {"What's Included"}
          </span>
          <span className="h-px flex-1 bg-border/20" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/10">
          {SERVICE_BENEFITS.map((b) => (
            <div
              key={b.title}
              className="bg-background p-6 sm:p-8 flex flex-col gap-4 group hover:bg-card/30 transition-colors duration-300"
            >
              <div className="text-silver/35 group-hover:text-silver/60 transition-colors duration-300">
                {b.icon}
              </div>
              <h3 className="text-sm font-light tracking-wide text-foreground/80">{b.title}</h3>
              <p className="text-xs font-light leading-relaxed text-muted-foreground/60">
                {b.desc(origin, destination)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BLOCK 3: Route FAQ ─────────────────────────── */}
      <section>
        <div className="flex items-center gap-4 mb-10">
          <span className="text-[10px] font-light tracking-[0.4em] text-silver/40 uppercase shrink-0">
            Frequently Asked
          </span>
          <span className="h-px flex-1 bg-border/20" />
          <MessageCircle className="h-3.5 w-3.5 text-border/30 shrink-0" />
        </div>

        <div className="divide-y divide-border/15">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i
            return (
              <div key={i}>
                <button
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-sm font-light leading-relaxed transition-colors duration-200 ${
                      isOpen ? "text-foreground/90" : "text-foreground/60 group-hover:text-foreground/80"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-border/40 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-silver/50" : "group-hover:text-silver/40"
                    }`}
                  />
                </button>

                {/* Answer — animated reveal */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="pb-6 text-sm font-light leading-relaxed text-muted-foreground/60">
                    {faq.a}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

    </div>
  )
}
