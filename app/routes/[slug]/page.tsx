import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getRouteBySlug, getAllSlugs, ROUTES, FLEET_VEHICLES } from "@/lib/routes-data"
import { RoutePageClient } from "./client"

/* ─── Static generation for all route slugs ──────────────────── */
export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

/* ─── SEO Metadata (per-route) ──────────────────────────────── */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const route = getRouteBySlug(slug)
  if (!route) return {}

  const title = `Private Transfer ${route.from.en} → ${route.to.en} | Movi Transfer`
  const description = `Book a private chauffeur transfer from ${route.from.en} to ${route.to.en}. ${route.distanceKm} km, ${route.duration.en}. Door-to-door Mercedes-Benz service, fixed price, 24/7 availability.`

  return {
    title,
    description,
    keywords: [
      `private transfer ${route.from.en} ${route.to.en}`,
      `${route.from.en} to ${route.to.en} private car`,
      `chauffeur ${route.from.en} ${route.to.en}`,
      `taxi ${route.from.en} ${route.to.en}`,
      `transfer ${route.from.pl} ${route.to.pl}`,
      `prywatny transfer ${route.from.pl} ${route.to.pl}`,
      "door-to-door transfer",
      "Mercedes-Benz private transfer",
    ],
    alternates: {
      canonical: `https://movitransfer.eu/routes/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://movitransfer.eu/routes/${slug}`,
      type: "website",
      siteName: "Movi Transfer",
    },
  }
}

/* ─── Page (server component) ────────────────────────────────── */
export default async function RoutePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const route = getRouteBySlug(slug)
  if (!route) notFound()

  const related = route.relatedSlugs
    .map(s => ROUTES.find(r => r.slug === s))
    .filter(Boolean) as typeof ROUTES

  /* ── JSON-LD structured data (SEO + AEO + GEO) ─────────── */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    name: `Movi Transfer — ${route.from.en} → ${route.to.en}`,
    description: route.description.en,
    url: `https://movitransfer.eu/routes/${slug}`,
    provider: {
      "@type": "Organization",
      name: "Movi Transfer",
      url: "https://movitransfer.eu",
    },
    areaServed: [
      { "@type": "City", name: route.from.en },
      { "@type": "City", name: route.to.en },
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: "https://movitransfer.eu/#booking",
      servicePhone: "+49 30 1234 5678",
      availableLanguage: ["English", "Polish", "German"],
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      description: `Private door-to-door transfer from ${route.from.en} to ${route.to.en}, ${route.distanceKm} km, approximately ${route.duration.en}`,
    },
  }

  /* FAQ structured data for AEO */
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: route.faq.map(item => ({
      "@type": "Question",
      name: item.q.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a.en,
      },
    })),
  }

  /* BreadcrumbList for GEO */
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://movitransfer.eu" },
      { "@type": "ListItem", position: 2, name: "Routes", item: "https://movitransfer.eu/routes" },
      { "@type": "ListItem", position: 3, name: `${route.from.en} → ${route.to.en}`, item: `https://movitransfer.eu/routes/${slug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <RoutePageClient
        route={route}
        relatedRoutes={related}
        fleet={FLEET_VEHICLES}
      />
    </>
  )
}
