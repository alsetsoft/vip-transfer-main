"use client"

import { useTranslation } from "@/lib/language-context"
import { useBooking } from "@/lib/booking-context"
import { MoviLogo } from "@/components/logo"

const ALL_ROUTES = [
  // Warsaw
  { label: "Warsaw → Budapest",  from: "Warsaw",   to: "Budapest" },
  { label: "Warsaw → Gdańsk",    from: "Warsaw",   to: "Gdańsk" },
  { label: "Warsaw → Kraków",    from: "Warsaw",   to: "Kraków" },
  { label: "Warsaw → Berlin",    from: "Warsaw",   to: "Berlin" },
  { label: "Warsaw → Bratislava",from: "Warsaw",   to: "Bratislava" },
  { label: "Warsaw → Vilnius",   from: "Warsaw",   to: "Vilnius" },
  { label: "Warsaw → Zurich",    from: "Warsaw",   to: "Zürich" },
  { label: "Warsaw → Vienna",    from: "Warsaw",   to: "Vienna" },
  { label: "Warsaw → Prague",    from: "Warsaw",   to: "Prague" },
  { label: "Warsaw → Wrocław",   from: "Warsaw",   to: "Wrocław" },
  { label: "Warsaw → Poznań",    from: "Warsaw",   to: "Poznań" },
  // Kraków
  { label: "Kraków → Wrocław",   from: "Kraków",   to: "Wrocław" },
  { label: "Kraków → Vienna",    from: "Kraków",   to: "Vienna" },
  { label: "Kraków → Budapest",  from: "Kraków",   to: "Budapest" },
  { label: "Kraków → Prague",    from: "Kraków",   to: "Prague" },
  { label: "Kraków → Gdańsk",    from: "Kraków",   to: "Gdańsk" },
  { label: "Kraków → Zurich",    from: "Kraków",   to: "Zürich" },
  { label: "Kraków → Zakopane",  from: "Kraków",   to: "Zakopane" },
  { label: "Kraków → Katowice",  from: "Kraków",   to: "Katowice" },
  { label: "Kraków → Rzeszów",   from: "Kraków",   to: "Rzeszów" },
  { label: "Kraków → Warsaw",    from: "Kraków",   to: "Warsaw" },
  // Gdańsk
  { label: "Gdańsk → Berlin",    from: "Gdańsk",   to: "Berlin" },
  { label: "Gdańsk → Poznań",    from: "Gdańsk",   to: "Poznań" },
  { label: "Gdańsk → Warsaw",    from: "Gdańsk",   to: "Warsaw" },
  { label: "Gdańsk → Kraków",    from: "Gdańsk",   to: "Kraków" },
  // Wrocław & others
  { label: "Wrocław → Berlin",   from: "Wrocław",  to: "Berlin" },
  { label: "Wrocław → Dresden",  from: "Wrocław",  to: "Dresden" },
  { label: "Wrocław → Poznań",   from: "Wrocław",  to: "Poznań" },
  { label: "Poznań → Berlin",    from: "Poznań",   to: "Berlin" },
  { label: "Katowice → Vienna",  from: "Katowice", to: "Vienna" },
  { label: "Łódź → Warsaw",      from: "Łódź",     to: "Warsaw" },
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
  const { setChauffeur, setMode } = useBooking()

  const handleRouteClick = (from: string, to: string) => {
    setMode("chauffeur")
    setChauffeur({ originCity: from, destinationCity: to })
    const el = document.getElementById("booking")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    } else {
      window.location.href = `/?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}#booking`
    }
  }

  const serviceLinks = [
    { label: t.footer.internationalTransfer, href: "/#services" },
    { label: t.footer.airportPickup,         href: "/#services" },
    { label: t.footer.businessTravel,        href: "/#services" },
    { label: t.footer.eventTransport,        href: "/#services" },
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
            <h3 className="mb-4 text-[10px] font-light tracking-[0.3em] text-hint uppercase">
              {t.footer.servicesTitle}
            </h3>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm font-light text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick nav */}
          <div>
            <h3 className="mb-4 text-[10px] font-light tracking-[0.3em] text-hint uppercase">
              {t.footer.navigation}
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="/" className="text-sm font-light text-muted-foreground transition-colors hover:text-foreground">
                  {t.footer.home}
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
            <h3 className="mb-4 text-[10px] font-light tracking-[0.3em] text-hint uppercase">
              {t.footer.contact}
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="text-sm font-light text-muted-foreground">
                <a href="tel:+4930123456789" className="transition-colors hover:text-foreground">
                  +49 30 1234 5678
                </a>
              </li>
              <li className="text-sm font-light text-muted-foreground">
                <a href="mailto:reservations@movitransfer.eu" className="transition-colors hover:text-foreground">
                  reservations@movitransfer.eu
                </a>
              </li>
              <li className="text-sm font-light text-muted-foreground">
                {t.footer.location}
              </li>
            </ul>
          </div>
        </div>

        {/* All Routes section */}
        <div className="py-10">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-[10px] font-light tracking-[0.3em] text-hint uppercase shrink-0">
              {t.footer.popularRoutes}
            </h3>
            <span className="h-px flex-1 bg-border/20" />
            <a
              href="/routes"
              className="text-[10px] font-light tracking-[0.25em] text-hint uppercase transition-colors hover:text-silver/70 shrink-0"
            >
              {t.footer.viewAll} &rarr;
            </a>
          </div>

          {/* Route columns — 1 col mobile, 2 cols sm, 3 cols lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0">
            {routeCols.map((col, colIdx) => (
              <ul key={colIdx} className="flex flex-col">
                {col.map((route) => (
                  <li key={route.label} className="border-b border-border/10 last:border-b-0">
                    <button
                      type="button"
                      onClick={() => handleRouteClick(route.from, route.to)}
                      className="flex w-full items-center justify-between py-2.5 text-sm font-light text-muted-foreground transition-colors hover:text-foreground group cursor-pointer"
                    >
                      <span>{route.label}</span>
                      <span className="text-border/30 group-hover:text-silver/50 transition-colors text-xs">&rarr;</span>
                    </button>
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
