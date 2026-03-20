"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, Phone, Globe, ChevronDown, SteeringWheel, Car } from "lucide-react"
import { usePathname } from "next/navigation"
import { useTranslation } from "@/lib/language-context"
import { localeLabels, localeNames, type Locale } from "@/lib/translations"
import { MoviLogo } from "@/components/logo"

const locales: Locale[] = ["en", "pl"]

export function Navbar() {
  const { locale, setLocale, t } = useTranslation()
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isRentalOpen, setIsRentalOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)
  const rentalRef = useRef<HTMLDivElement>(null)

  // Resolve anchor links: on home page use bare #hash, elsewhere prefix with /
  const resolveHref = (href: string) => {
    if (href.startsWith("#")) return isHome ? href : `/${href}`
    return href
  }

  const navLinks = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.routes, href: "/routes" },
    { label: t.nav.fleetNav, href: "/fleet" },
    { label: t.nav.whyUs, href: "#trust" },
    { label: t.nav.bookNow, href: "#booking" },
  ]

  const rentalLinks = [
    { label: t.nav.rentalWithDriver, href: "/rental/with-driver", icon: "steering" as const },
    { label: t.nav.rentalSelfDrive,  href: "/rental/self-drive",  icon: "car" as const },
  ]

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setIsLangOpen(false)
      if (rentalRef.current && !rentalRef.current.contains(e.target as Node)) setIsRentalOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-12">
        {/* Logo */}
        <a href={isHome ? "#" : "/"} className="flex items-center group" aria-label="Movi Transfer — home">
          <MoviLogo size={34} />
        </a>

        {/* Desktop Links */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={resolveHref(link.href)}
              className="relative text-xs font-light tracking-[0.2em] text-muted-foreground uppercase transition-colors duration-300 hover:text-foreground after:absolute after:bottom-[-4px] after:left-0 after:h-px after:w-0 after:bg-silver after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}

          {/* Rental Dropdown */}
          <div ref={rentalRef} className="relative">
            <button
              onClick={() => setIsRentalOpen((o) => !o)}
              className="relative flex items-center gap-1 text-xs font-light tracking-[0.2em] text-muted-foreground uppercase transition-colors duration-300 hover:text-foreground after:absolute after:bottom-[-4px] after:left-0 after:h-px after:w-0 after:bg-silver after:transition-all after:duration-300 hover:after:w-full"
              aria-haspopup="true"
              aria-expanded={isRentalOpen}
            >
              {t.nav.rental}
              <ChevronDown
                className="h-3 w-3 shrink-0 transition-transform duration-200"
                style={{ transform: isRentalOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </button>

            <div
              className={`absolute left-0 top-full mt-3 min-w-[200px] border border-border/40 bg-background/95 backdrop-blur-md transition-all duration-200 ${
                isRentalOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              {rentalLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsRentalOpen(false)}
                  className="flex items-center gap-3 px-4 py-3.5 text-xs font-light tracking-[0.15em] text-muted-foreground uppercase transition-colors hover:bg-card hover:text-foreground border-b border-border/20 last:border-0"
                >
                  {item.icon === "steering" ? (
                    <SteeringWheel className="h-3.5 w-3.5 shrink-0" />
                  ) : (
                    <Car className="h-3.5 w-3.5 shrink-0" />
                  )}
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* CTA + Language + Phone */}
        <div className="hidden items-center gap-5 md:flex">
          {/* Language Switcher */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 text-xs font-light tracking-wider text-silver transition-colors hover:text-foreground"
              aria-label="Change language"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{localeLabels[locale]}</span>
            </button>

            {/* Dropdown */}
            <div
              className={`absolute right-0 top-full mt-3 min-w-[140px] border border-border/40 bg-background/95 backdrop-blur-md transition-all duration-200 ${
                isLangOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    setLocale(loc)
                    setIsLangOpen(false)
                  }}
                  className={`flex w-full items-center justify-between px-4 py-3 text-xs font-light tracking-wider transition-colors hover:bg-card ${
                    locale === loc
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <span>{localeNames[loc]}</span>
                  <span className="text-[10px] text-silver/50">{localeLabels[loc]}</span>
                </button>
              ))}
            </div>
          </div>

          <a
            href="tel:+4930123456789"
            className="flex items-center gap-2 text-xs font-light tracking-wider text-silver transition-colors hover:text-foreground"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>+49 30 1234 5678</span>
          </a>
          <a
            href={resolveHref("#booking")}
            className="border border-foreground/20 bg-foreground/5 px-6 py-2.5 text-xs font-light tracking-[0.2em] text-foreground uppercase backdrop-blur-sm transition-all duration-300 hover:border-foreground/40 hover:bg-foreground/10"
          >
            {t.nav.reserve}
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-500 md:hidden ${
          isMobileOpen ? "max-h-[600px] border-b border-border" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 bg-background/95 px-4 pb-6 backdrop-blur-md sm:px-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={resolveHref(link.href)}
              onClick={() => setIsMobileOpen(false)}
              className="py-3 text-sm font-light tracking-[0.15em] text-muted-foreground uppercase transition-colors hover:text-foreground border-b border-border/50 last:border-0"
            >
              {link.label}
            </a>
          ))}

          {/* Mobile Rental Links */}
          <div className="py-1 border-b border-border/50">
            <span className="block py-2 text-[10px] font-light tracking-[0.3em] text-silver/50 uppercase">
              {t.nav.rental}
            </span>
            {rentalLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className="flex items-center gap-3 py-2.5 text-sm font-light tracking-[0.12em] text-muted-foreground uppercase transition-colors hover:text-foreground pl-2"
              >
                {item.icon === "steering" ? (
                  <SteeringWheel className="h-3.5 w-3.5 shrink-0 text-silver/60" />
                ) : (
                  <Car className="h-3.5 w-3.5 shrink-0 text-silver/60" />
                )}
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Language Switcher */}
          <div className="mt-4 flex items-center gap-2 border-t border-border/50 pt-4">
            <Globe className="h-4 w-4 text-silver/60" />
            <div className="flex gap-1">
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    setLocale(loc)
                    setIsMobileOpen(false)
                  }}
                  className={`px-2.5 py-1.5 text-xs font-light tracking-wider transition-colors ${
                    locale === loc
                      ? "bg-foreground/10 text-foreground border border-border/50"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {localeLabels[loc]}
                </button>
              ))}
            </div>
          </div>

          <a
            href="tel:+4930123456789"
            className="mt-2 flex items-center gap-2 text-sm font-light text-silver"
          >
            <Phone className="h-4 w-4" />
            +49 30 1234 5678
          </a>
        </div>
      </div>
    </nav>
  )
}


export function Navbar() {
  const { locale, setLocale, t } = useTranslation()
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  // Resolve anchor links: on home page use bare #hash, elsewhere prefix with /
  const resolveHref = (href: string) => {
    if (href.startsWith("#")) return isHome ? href : `/${href}`
    return href
  }

  const navLinks = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.routes, href: "/routes" },
    { label: "Rental", href: "/rental" },
    { label: t.nav.fleetNav, href: "/fleet" },
    { label: t.nav.whyUs, href: "#trust" },
    { label: t.nav.bookNow, href: "#booking" },
  ]

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-12">
        {/* Logo */}
        <a href={isHome ? "#" : "/"} className="flex items-center group" aria-label="Movi Transfer — home">
          <MoviLogo size={34} />
        </a>

        {/* Desktop Links */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={resolveHref(link.href)}
              className="relative text-xs font-light tracking-[0.2em] text-muted-foreground uppercase transition-colors duration-300 hover:text-foreground after:absolute after:bottom-[-4px] after:left-0 after:h-px after:w-0 after:bg-silver after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA + Language + Phone */}
        <div className="hidden items-center gap-5 md:flex">
          {/* Language Switcher */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 text-xs font-light tracking-wider text-silver transition-colors hover:text-foreground"
              aria-label="Change language"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{localeLabels[locale]}</span>
            </button>

            {/* Dropdown */}
            <div
              className={`absolute right-0 top-full mt-3 min-w-[140px] border border-border/40 bg-background/95 backdrop-blur-md transition-all duration-200 ${
                isLangOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    setLocale(loc)
                    setIsLangOpen(false)
                  }}
                  className={`flex w-full items-center justify-between px-4 py-3 text-xs font-light tracking-wider transition-colors hover:bg-card ${
                    locale === loc
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <span>{localeNames[loc]}</span>
                  <span className="text-[10px] text-silver/50">{localeLabels[loc]}</span>
                </button>
              ))}
            </div>
          </div>

          <a
            href="tel:+380671234567"
            className="flex items-center gap-2 text-xs font-light tracking-wider text-silver transition-colors hover:text-foreground"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>+380 067 1234 567</span>
          </a>
          <a
            href={resolveHref("#booking")}
            className="border border-foreground/20 bg-foreground/5 px-6 py-2.5 text-xs font-light tracking-[0.2em] text-foreground uppercase backdrop-blur-sm transition-all duration-300 hover:border-foreground/40 hover:bg-foreground/10"
          >
            {t.nav.reserve}
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-500 md:hidden ${
          isMobileOpen ? "max-h-[500px] border-b border-border" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 bg-background/95 px-4 pb-6 backdrop-blur-md sm:px-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={resolveHref(link.href)}
              onClick={() => setIsMobileOpen(false)}
              className="py-3 text-sm font-light tracking-[0.15em] text-muted-foreground uppercase transition-colors hover:text-foreground border-b border-border/50 last:border-0"
            >
              {link.label}
            </a>
          ))}

          {/* Mobile Language Switcher */}
          <div className="mt-4 flex items-center gap-2 border-t border-border/50 pt-4">
            <Globe className="h-4 w-4 text-silver/60" />
            <div className="flex gap-1">
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    setLocale(loc)
                    setIsMobileOpen(false)
                  }}
                  className={`px-2.5 py-1.5 text-xs font-light tracking-wider transition-colors ${
                    locale === loc
                      ? "bg-foreground/10 text-foreground border border-border/50"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {localeLabels[loc]}
                </button>
              ))}
            </div>
          </div>

          <a
            href="tel:+380671234567"
            className="mt-2 flex items-center gap-2 text-sm font-light text-silver"
          >
            <Phone className="h-4 w-4" />
            +380 067 1234 567
          </a>
        </div>
      </div>
    </nav>
  )
}
