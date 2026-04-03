import type { Metadata } from 'next'
import TermsPageClient from './client'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'Terms and Conditions of Movi Transfer private chauffeur service. Read about booking rules, cancellation policy, liability, and passenger rights.',
  alternates: {
    canonical: 'https://movitransfer.eu/regulamin',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsPage() {
  return <TermsPageClient />
}
