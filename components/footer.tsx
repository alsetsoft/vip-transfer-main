"use client"

import { useTranslation } from "@/lib/language-context"
import { MoviLogo } from "@/components/logo"

const ALL_ROUTES = [
  // Warsaw
  { label: "Warsaw → Budapest",  href: "/routes" },
  { label: "Warsaw → Gdańsk",    href: "/routes" },
  { label: "Warsaw → Kraków",    href: "/routes" },
  { label: "Warsaw → Berlin",    href: "/routes" },
  { label: "Warsaw → Bratislava",href: "/routes" },
  { label: "Warsaw → Vilnius",   href: "/routes" },
  { label: "Warsaw → Zurich",    href: "/routes" },
  { label: "Warsaw → Vienna",    href: "/routes" },
  { label: "Warsaw → Prague",    href: "/routes" },
  { label: "Warsaw → Wrocław",   href: "/routes" },
  { label: "Warsaw → Poznań",    href: "/routes" },
  // Kraków
  { label: "Kraków → Wrocław",   href: "/routes" },
  { label: "Kraków → Vienna",    href: "/routes" },
  { label: "Kraków → Budapest",  href: "/routes" },
  { label: "Kraków → Prague",    href: "/routes" },
  { label: "Kraków → Gdańsk",    href: "/routes" },
  { label: "Kraków → Zurich",    href: "/routes" },
  { label: "Kraków → Zakopane",  href: "/routes" },
  { label: "Kraków → Katowice",  href: "/routes" },
  { label: "Kraków → Rzeszów",   href: "/routes" },
  { label: "Kraków → Warsaw",    href: "/routes" },
  // Gdańsk
  { label: "Gdańsk → Berlin",    href: "/routes" },
  { label: "Gdańsk → Poznań",    href: "/routes" },
  { label: "Gdańsk → Warsaw",    href: "/routes" },
  { label: "Gdańsk → Kraków",    href: "/routes" },
  // Wrocław & others
  { label: "Wrocław → Berlin",   href: "/routes" },
  { label: "Wrocław → Dresden",  href: "/routes" },
  { label: "Wrocław → Poznań",   href: "/routes" },
  { label: "Poznań → Berlin",    href: "/routes" },
  { label: "Katowice → Vienna",  href: "/routes" },
  { label: "Łódź → Warsaw",      href: "/routes" },
]

// Split routes into 3 columns for desktop
const COL_SIZE = Math.ceil(ALL_ROUTES.length / 3)
const routeCols = [
  ALL_ROUTES.slice(0, COL_SIZE),
  ALL_ROUTES.slice(COL_SIZE, COL_SIZE * 2),
  ALL_ROUTES.slice(COL_SIZE * 2),
]

export function Footer() {
  const { t } = useTranslation()

  const serviceLinks = [
    t.footer.internationalTransfer,
    t.footer.airportPickup,
    t.footer.businessTravel,
    t.footer.eventTransport,
  ]

  return (
    <footer className="border-t border-border/30 bg-card/20 py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">

        {/* Top grid: brand + services + contact */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 pb-12 border-b border-border/20">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <MoviLogo size={32} />
            </div>
            <p className="text-xs font-light leading-relaxed text-muted-foreground max-w-xs">
              {t.footer.brandDesc}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-[10px] font-light tracking-[0.3em] text-silver/50 uppercase">
              {t.footer.servicesTitle}
            </h3>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#services"
                    className="text-sm font-light text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick nav */}
          <div>
            <h3 className="mb-4 text-[10px] font-light tracking-[0.3em] text-silver/50 uppercase">
              Navigation
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="/" className="text-sm font-light text-muted-foreground transition-colors hover:text-foreground">
                  Home
                </a>
              </li>
              <li>
                <a href="/routes" className="text-sm font-light text-muted-foreground transition-colors hover:text-foreground">
                  {t.nav.routes}
                </a>
              </li>
              <li>
                <a href="/fleet" className="text-sm font-light text-muted-foreground transition-colors hover:text-foreground">
                  {t.nav.fleetNav}
                </a>
              </li>
              <li>
                <a href="/#booking" className="text-sm font-light text-muted-foreground transition-colors hover:text-foreground">
                  {t.nav.bookNow}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-[10px] font-light tracking-[0.3em] text-silver/50 uppercase">
              {t.footer.contact}
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="text-sm font-light text-muted-foreground">
                <a href="tel:+380671234567" className="transition-colors hover:text-foreground">
                  +380 067 1234 567
                </a>
              </li>
              <li className="text-sm font-light text-muted-foreground">
                reservations@movitransfer.eu
              </li>
              <li className="text-sm font-light text-muted-foreground">
                Warsaw, Poland
              </li>
            </ul>
          </div>
        </div>

        {/* All Routes section */}
        <div className="py-10">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-[10px] font-light tracking-[0.3em] text-silver/50 uppercase shrink-0">
              {t.footer.popularRoutes}
            </h3>
            <span className="h-px flex-1 bg-border/20" />
            <a
              href="/routes"
              className="text-[10px] font-light tracking-[0.25em] text-silver/40 uppercase transition-colors hover:text-silver/70 shrink-0"
            >
              View All &rarr;
            </a>
          </div>

          {/* Route columns — 1 col mobile, 2 cols sm, 3 cols lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0">
            {routeCols.map((col, colIdx) => (
              <ul key={colIdx} className="flex flex-col">
                {col.map((route) => (
                  <li key={route.label} className="border-b border-border/10 last:border-b-0">
                    <a
                      href={route.href}
                      className="flex items-center justify-between py-2.5 text-sm font-light text-muted-foreground transition-colors hover:text-foreground group"
                    >
                      <span>{route.label}</span>
                      <span className="text-border/30 group-hover:text-silver/50 transition-colors text-xs">&rarr;</span>
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/20 pt-8 sm:flex-row">
          <p className="text-[11px] font-light tracking-wider text-muted-foreground/50">
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            <a
              href="/polityka-prywatnosci"
              className="text-[11px] font-light tracking-wider text-muted-foreground/50 transition-colors hover:text-muted-foreground"
            >
              {t.footer.privacy}
            </a>
            <a
              href="/regulamin"
              className="text-[11px] font-light tracking-wider text-muted-foreground/50 transition-colors hover:text-muted-foreground"
            >
              {t.footer.terms}
            </a>
            <a
              href="/polityka-cookies"
              className="text-[11px] font-light tracking-wider text-muted-foreground/50 transition-colors hover:text-muted-foreground"
            >
              {t.footer.cookies}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
