"use client"

import { useState } from "react"
import { MoviLogo } from "@/components/logo"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [focusedEmail, setFocusedEmail] = useState(false)
  const [focusedPassword, setFocusedPassword] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError("Invalid email or password.")
      setLoading(false)
      return
    }

    router.push("/admin")
    router.refresh()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[oklch(0.05_0_0)] px-4">
      {/* Background texture */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-silver/[0.02] blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo mark */}
        <div className="mb-10 flex flex-col items-center gap-3">
          <MoviLogo size={40} />
          <p className="text-[10px] font-light tracking-[0.25em] text-muted-foreground/30 uppercase mt-0.5">Admin Panel</p>
        </div>

        {/* Card */}
        <div className="border border-border/30 bg-[oklch(0.08_0_0)] p-8 backdrop-blur-xl">
          <h1 className="mb-1 text-xl font-extralight tracking-wide text-foreground">Sign In</h1>
          <p className="mb-8 text-sm font-light text-muted-foreground/50">Access the bookings dashboard</p>

          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            {/* Email */}
            <div className="relative flex flex-col">
              <label
                htmlFor="email"
                className={`select-none font-light transition-all duration-300 pointer-events-none ${
                  focusedEmail || email
                    ? "text-[9px] tracking-[0.35em] text-silver/60 uppercase mb-2"
                    : "text-sm tracking-wide text-muted-foreground/50 mb-0 mt-4"
                }`}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setFocusedEmail(true)}
                onBlur={() => setFocusedEmail(false)}
                className="border-b bg-transparent pb-3 text-sm font-light text-foreground outline-none transition-colors duration-300"
                style={{ borderBottomColor: focusedEmail ? "oklch(0.75 0 0 / 0.7)" : "oklch(0.22 0 0)" }}
              />
              <span
                className="absolute bottom-0 left-0 h-px transition-all duration-500"
                style={{ width: focusedEmail ? "100%" : "0%", background: "oklch(0.75 0 0 / 0.6)" }}
              />
            </div>

            {/* Password */}
            <div className="relative flex flex-col">
              <label
                htmlFor="password"
                className={`select-none font-light transition-all duration-300 pointer-events-none ${
                  focusedPassword || password
                    ? "text-[9px] tracking-[0.35em] text-silver/60 uppercase mb-2"
                    : "text-sm tracking-wide text-muted-foreground/50 mb-0 mt-4"
                }`}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setFocusedPassword(true)}
                onBlur={() => setFocusedPassword(false)}
                className="border-b bg-transparent pb-3 text-sm font-light text-foreground outline-none transition-colors duration-300"
                style={{ borderBottomColor: focusedPassword ? "oklch(0.75 0 0 / 0.7)" : "oklch(0.22 0 0)" }}
              />
              <span
                className="absolute bottom-0 left-0 h-px transition-all duration-500"
                style={{ width: focusedPassword ? "100%" : "0%", background: "oklch(0.75 0 0 / 0.6)" }}
              />
            </div>

            {error && (
              <p className="text-xs font-light text-red-400/80 tracking-wide -mt-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex items-center justify-center gap-2 border border-foreground bg-foreground py-4 text-xs font-light tracking-[0.3em] text-background uppercase transition-all duration-500 hover:bg-transparent hover:text-foreground disabled:opacity-60"
            >
              {loading ? (
                <><span className="h-3.5 w-3.5 animate-spin rounded-full border border-current border-t-transparent" /><span>Signing in...</span></>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-[10px] font-light text-muted-foreground/30 tracking-wider">
          Movi Transfer &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  )
}
