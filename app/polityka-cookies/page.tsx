import type { Metadata } from 'next'
import CookiesPageClient from './client'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    'Cookie Policy of Movi Transfer. Learn about the cookies we use, how they improve your experience, and how to manage your cookie preferences.',
  alternates: {
    canonical: 'https://movitransfer.eu/polityka-cookies',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function CookiesPage() {
  return <CookiesPageClient />
}
