"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { LogOut, RefreshCw, Calendar, Users, MapPin, Phone, Mail, ChevronDown } from "lucide-react"
import { MoviLogo } from "@/components/logo"

type Booking = {
  id: string
  created_at: string
  source: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  origin_country?: string
  destination_country?: string
  travel_date?: string
  passengers: number
  route_city?: string
  route_country?: string
  route_code?: string
  direction?: string
  return_date?: string
  special_requests?: string
  status: string
}

const STATUS_OPTIONS = ["new", "contacted", "confirmed", "cancelled"]
const STATUS_COLORS: Record<string, string> = {
  new:       "bg-blue-500/10 text-blue-400 border-blue-500/20",
  contacted: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  confirmed: "bg-green-500/10 text-green-400 border-green-500/20",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
}

function StatusBadge({ id, current, onChange }: { id: string; current: string; onChange: (id: string, status: string) => void }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-1.5 border px-2.5 py-1 text-[10px] font-light tracking-[0.15em] uppercase transition-colors ${STATUS_COLORS[current] ?? STATUS_COLORS.new}`}
      >
        {current}
        <ChevronDown className="h-2.5 w-2.5 opacity-60" />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-20 mt-1 min-w-[110px] border border-border/40 bg-[oklch(0.1_0_0)] shadow-xl backdrop-blur-xl">
          {STATUS_OPTIONS.map(s => (
            <button
              key={s}
              onClick={() => { onChange(id, s); setOpen(false) }}
              className={`w-full px-3 py-2 text-left text-[10px] font-light tracking-[0.15em] uppercase transition-colors hover:bg-white/5 ${s === current ? "text-foreground" : "text-muted-foreground"}`}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function BookingCard({ booking, onStatusChange }: { booking: Booking; onStatusChange: (id: string, status: string) => void }) {
  const [expanded, setExpanded] = useState(false)
  const date = new Date(booking.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
  const isRoute = booking.source === "route_modal"

  return (
    <div className={`border border-border/30 bg-[oklch(0.08_0_0)] transition-colors hover:border-border/50 ${expanded ? "border-silver/20" : ""}`}>
      {/* Row header */}
      <div
        className="flex cursor-pointer items-start justify-between gap-4 px-5 py-4 sm:items-center"
        onClick={() => setExpanded(e => !e)}
      >
        <div className="flex flex-col gap-0.5 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-light text-foreground">
              {booking.first_name} {booking.last_name}
            </span>
            <span className={`shrink-0 border px-1.5 py-0.5 text-[9px] font-light tracking-[0.2em] uppercase ${isRoute ? "border-silver/20 text-silver/50" : "border-border/30 text-muted-foreground/40"}`}>
              {isRoute ? "Route" : "Main form"}
            </span>
          </div>
          <div className="flex items-center gap-3 flex-wrap mt-0.5">
            {isRoute ? (
              <span className="flex items-center gap-1 text-xs font-light text-muted-foreground/60">
                <MapPin className="h-3 w-3" />
                {booking.direction === "to" ? "To" : "From"} {booking.route_city}, {booking.route_code}
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs font-light text-muted-foreground/60">
                <MapPin className="h-3 w-3" />
                {booking.origin_country} → {booking.destination_country}
              </span>
            )}
            {booking.travel_date && (
              <span className="flex items-center gap-1 text-xs font-light text-muted-foreground/50">
                <Calendar className="h-3 w-3" />
                {booking.travel_date}
              </span>
            )}
            <span className="flex items-center gap-1 text-xs font-light text-muted-foreground/50">
              <Users className="h-3 w-3" />
              {booking.passengers}
            </span>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-3">
          <span className="text-[10px] font-light text-muted-foreground/30 hidden sm:block">{date}</span>
          <StatusBadge id={booking.id} current={booking.status} onChange={onStatusChange} />
          <ChevronDown className={`h-3.5 w-3.5 text-silver/30 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="border-t border-border/20 px-5 pb-5 pt-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-light tracking-[0.25em] text-silver/40 uppercase">Contact</span>
              <a href={`mailto:${booking.email}`} className="flex items-center gap-1.5 text-sm font-light text-foreground hover:text-silver transition-colors">
                <Mail className="h-3 w-3 text-silver/40" />{booking.email}
              </a>
              {booking.phone && (
                <a href={`tel:${booking.phone}`} className="flex items-center gap-1.5 text-xs font-light text-muted-foreground/60 hover:text-foreground transition-colors">
                  <Phone className="h-3 w-3 text-silver/40" />{booking.phone}
                </a>
              )}
            </div>

            {isRoute ? (
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-light tracking-[0.25em] text-silver/40 uppercase">Route</span>
                <span className="text-sm font-light text-foreground capitalize">{booking.direction} {booking.route_city}</span>
                <span className="text-xs font-light text-muted-foreground/60">{booking.route_country} · {booking.route_code}</span>
              </div>
            ) : (
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-light tracking-[0.25em] text-silver/40 uppercase">Route</span>
                <span className="text-sm font-light text-foreground">{booking.origin_country} → {booking.destination_country}</span>
              </div>
            )}

            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-light tracking-[0.25em] text-silver/40 uppercase">Dates</span>
              <span className="text-sm font-light text-foreground">{booking.travel_date || "—"}</span>
              {booking.return_date && <span className="text-xs font-light text-muted-foreground/60">Return: {booking.return_date}</span>}
            </div>

            {booking.special_requests && (
              <div className="flex flex-col gap-0.5 sm:col-span-2 lg:col-span-3">
                <span className="text-[9px] font-light tracking-[0.25em] text-silver/40 uppercase">Special Requests</span>
                <p className="text-sm font-light text-muted-foreground/80 leading-relaxed">{booking.special_requests}</p>
              </div>
            )}

            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-light tracking-[0.25em] text-silver/40 uppercase">Submitted</span>
              <span className="text-xs font-light text-muted-foreground/60">{date}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function AdminDashboardClient({ bookings: initial, userEmail }: { bookings: Booking[]; userEmail: string }) {
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>(initial)
  const [filter, setFilter] = useState<string>("all")
  const [search, setSearch] = useState("")
  const [refreshing, setRefreshing] = useState(false)

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    const supabase = createClient()
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false })
    if (data) setBookings(data)
    setRefreshing(false)
  }

  const handleStatusChange = async (id: string, status: string) => {
    const supabase = createClient()
    await supabase.from("bookings").update({ status }).eq("id", id)
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b))
  }

  const filtered = bookings.filter(b => {
    const matchFilter = filter === "all" || b.status === filter
    const q = search.toLowerCase()
    const matchSearch = !q ||
      `${b.first_name} ${b.last_name}`.toLowerCase().includes(q) ||
      b.email.toLowerCase().includes(q) ||
      (b.route_city ?? "").toLowerCase().includes(q) ||
      (b.origin_country ?? "").toLowerCase().includes(q) ||
      (b.destination_country ?? "").toLowerCase().includes(q)
    return matchFilter && matchSearch
  })

  const counts = {
    all: bookings.length,
    new: bookings.filter(b => b.status === "new").length,
    contacted: bookings.filter(b => b.status === "contacted").length,
    confirmed: bookings.filter(b => b.status === "confirmed").length,
    cancelled: bookings.filter(b => b.status === "cancelled").length,
  }

  return (
    <div className="min-h-screen bg-[oklch(0.05_0_0)]">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border/30 bg-[oklch(0.07_0_0)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-4">
            <MoviLogo size={28} compact />
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-[10px] font-light text-muted-foreground/40 sm:block">{userEmail}</span>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              aria-label="Refresh"
              className="flex h-8 w-8 items-center justify-center border border-border/30 text-muted-foreground/40 transition-colors hover:border-silver/30 hover:text-foreground disabled:opacity-40"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 border border-border/30 px-3 py-1.5 text-[10px] font-light tracking-[0.2em] text-muted-foreground/50 uppercase transition-colors hover:border-silver/30 hover:text-foreground"
            >
              <LogOut className="h-3 w-3" />
              <span className="hidden sm:block">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Stats row */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
          {(["all", "new", "contacted", "confirmed", "cancelled"] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`flex flex-col items-center gap-1 border py-4 px-3 transition-colors duration-200 ${
                filter === s
                  ? "border-silver/30 bg-[oklch(0.1_0_0)] text-foreground"
                  : "border-border/20 text-muted-foreground/40 hover:border-border/40 hover:text-muted-foreground"
              }`}
            >
              <span className="text-2xl font-extralight tabular-nums">{counts[s]}</span>
              <span className="text-[9px] font-light tracking-[0.2em] uppercase">{s}</span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="search"
            placeholder="Search by name, email, city, country..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border-b border-border/30 bg-transparent py-3 text-sm font-light text-foreground outline-none placeholder:text-muted-foreground/30 transition-colors focus:border-silver/40"
          />
        </div>

        {/* Bookings list */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
            <div className="flex h-12 w-12 items-center justify-center border border-border/30">
              <Calendar className="h-5 w-5 text-muted-foreground/30" />
            </div>
            <p className="text-[10px] font-light tracking-[0.3em] text-muted-foreground/40 uppercase">
              {search || filter !== "all" ? "No matching bookings" : "No bookings yet"}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.map(b => (
              <BookingCard key={b.id} booking={b} onStatusChange={handleStatusChange} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
