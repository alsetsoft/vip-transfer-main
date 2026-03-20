import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminDashboardClient } from "./client"

export default async function AdminPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/admin/login")

  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false })

  return <AdminDashboardClient bookings={bookings ?? []} userEmail={user.email ?? ""} />
}
