"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { useTranslation } from "@/lib/language-context"

export function CookieBanner() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] border-t border-border/30 bg-card/95 backdrop-blur-md px-4 py-4 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="text-xs font-light leading-relaxed text-muted-foreground sm:text-sm">
          {t.cookieBanner.text}{" "}
          <a
            href="/polityka-cookies"
            className="underline underline-offset-2 transition-colors hover:text-foreground"
          >
            {t.cookieBanner.learnMore}
          </a>
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={accept}
            className="border border-foreground bg-foreground px-5 py-2 text-[11px] font-light tracking-[0.2em] text-background uppercase transition-all duration-300 hover:bg-transparent hover:text-foreground"
          >
            {t.cookieBanner.accept}
          </button>
          <button
            onClick={accept}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center text-muted-foreground/50 transition-colors hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
