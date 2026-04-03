import type { Metadata } from 'next'
import FleetPageClient from './client'

export const metadata: Metadata = {
  title: 'Premium Fleet — Mercedes-Benz & More',
  description:
    'Browse our premium fleet of Mercedes-Benz, Audi, and BMW vehicles. Comfort, Business and Premium class cars available for private transfers across Europe.',
  keywords: [
    'Mercedes-Benz private transfer fleet',
    'premium car fleet Europe',
    'Mercedes S-Class chauffeur',
    'Mercedes V-Class transfer',
    'Audi A8 private car',
    'BMW 5 Series transfer',
    'flota samochodów premium',
  ],
  alternates: {
    canonical: 'https://movitransfer.eu/fleet',
  },
  openGraph: {
    title: 'Premium Fleet — Mercedes-Benz & More | Movi Transfer',
    description:
      'Browse our premium fleet. Mercedes-Benz, Audi, BMW — Comfort, Business and Premium class for private transfers.',
    url: 'https://movitransfer.eu/fleet',
    type: 'website',
    siteName: 'Movi Transfer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premium Fleet | Movi Transfer',
    description: 'Mercedes-Benz, Audi, BMW — Comfort, Business and Premium class fleet for private European transfers.',
  },
}

export default function FleetPage() {
  return <FleetPageClient />
}
