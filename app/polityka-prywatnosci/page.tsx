import type { Metadata } from 'next'
import PrivacyPageClient from './client'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy of Movi Transfer. Learn how we collect, use, and protect your personal data when using our private chauffeur transfer services across Europe.',
  alternates: {
    canonical: 'https://movitransfer.eu/polityka-prywatnosci',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPage() {
  return <PrivacyPageClient />
}
