"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { translations, type Locale } from "./translations"

type TranslationData = (typeof translations)["en"]

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: TranslationData
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en")

  useEffect(() => {
    const saved = localStorage.getItem("gvt-lang") as Locale | null
    const validLocales: Locale[] = ["en", "pl"]
    if (saved && validLocales.includes(saved)) {
      setLocaleState(saved)
    } else {
      // Default to English and clear any stale/hidden language preference
      setLocaleState("en")
      localStorage.setItem("gvt-lang", "en")
    }
  }, [])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem("gvt-lang", newLocale)
  }, [])

  const t = translations[locale]

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useTranslation must be used within LanguageProvider")
  return ctx
}
