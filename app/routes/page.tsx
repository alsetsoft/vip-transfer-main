import type { Metadata } from 'next'
import RoutesPageClient from './client'

export const metadata: Metadata = {
  title: 'Private Transfer Routes Across Europe',
  description:
    'Explore all available private chauffeur transfer routes across Europe. Warsaw to Berlin, Vienna, Prague, Budapest, Zurich and more. Door-to-door Mercedes-Benz service.',
  keywords: [
    'private transfer routes Europe',
    'Warsaw Berlin transfer',
    'Warsaw Vienna private car',
    'Warsaw Prague chauffeur',
    'Warsaw Budapest transfer',
    'international private transfer',
    'trasy transferowe Europa',
    'prywatny transfer Warszawa Berlin',
  ],
  alternates: {
    canonical: 'https://movitransfer.eu/routes',
  },
  openGraph: {
    title: 'Private Transfer Routes Across Europe | Movi Transfer',
    description:
      'Explore all available private chauffeur transfer routes. Warsaw to Berlin, Vienna, Prague, Budapest and beyond.',
    url: 'https://movitransfer.eu/routes',
    type: 'website',
    siteName: 'Movi Transfer',
    images: [{ url: '/images/city-warsaw.jpg', width: 1200, height: 630, alt: 'Transfer routes across Europe — Movi Transfer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Private Transfer Routes Across Europe | Movi Transfer',
    description: 'All private chauffeur transfer routes. Warsaw to Berlin, Vienna, Prague, Budapest and beyond.',
    images: ['/images/city-warsaw.jpg'],
  },
}

export default function RoutesPage() {
  return <RoutesPageClient />
}
