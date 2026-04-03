import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/lib/language-context'
import { BookingProvider } from '@/lib/booking-context'
import { ThemeProvider } from '@/lib/theme-context'
import { CookieBanner } from '@/components/cookie-banner'
import './globals.css'

const _inter = Inter({ subsets: ["latin"], display: "swap", preload: true });

export const metadata: Metadata = {
  metadataBase: new URL('https://movitransfer.eu'),
  title: {
    default: 'Movi Transfer — Private Chauffeur Service Across Europe',
    template: '%s | Movi Transfer',
  },
  description: 'Private door-to-door chauffeur service across Europe. Mercedes-Benz fleet, 24/7 concierge support. Warsaw, Berlin, Vienna, Prague and beyond.',
  keywords: [
    'private chauffeur service Europe',
    'private transfer Poland Germany',
    'transfer Warsaw Berlin',
    'transfer Kraków Vienna',
    'door-to-door international transfer',
    'business class chauffeur service',
    'Mercedes-Benz private transfer Europe',
    'luxury private transport Europe',
    'international chauffeur service',
    '24/7 concierge transfer',
    'premium transfer service Europe',
    'private car service Poland',
  ],
  generator: 'v0.app',
  authors: [{ name: 'Movi Transfer', url: 'https://movitransfer.eu' }],
  creator: 'Movi Transfer',
  publisher: 'Movi Transfer',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['pl_PL'],
    title: 'Movi Transfer — Private Chauffeur Service Across Europe',
    description: 'Private door-to-door chauffeur service across Poland, Germany, Austria, Czech Republic and beyond. Mercedes-Benz fleet, 24/7 concierge.',
    siteName: 'Movi Transfer',
    url: 'https://movitransfer.eu',
    images: [{ url: '/images/hero-sedan.jpg', width: 1200, height: 630, alt: 'Movi Transfer — Private Mercedes-Benz chauffeur service across Europe' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Movi Transfer — Private Chauffeur Service Across Europe',
    description: 'Private door-to-door chauffeur across Poland, Germany, Austria and beyond. Mercedes fleet, 24/7 concierge.',
    images: ['/images/hero-sedan.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: {
    canonical: 'https://movitransfer.eu',
    languages: {
      'en': 'https://movitransfer.eu',
      'uk': 'https://movitransfer.eu',
      'pl': 'https://movitransfer.eu',
      'ru': 'https://movitransfer.eu',
      'x-default': 'https://movitransfer.eu',
    },
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  viewportFit: 'cover',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://movitransfer.eu/#organization',
      name: 'Movi Transfer',
      url: 'https://movitransfer.eu',
      logo: {
        '@type': 'ImageObject',
        url: 'https://movitransfer.eu/icon.svg',
      },
      sameAs: [],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+48301234567',
        contactType: 'customer service',
        areaServed: ['PL', 'DE', 'AT', 'CZ'],
        availableLanguage: ['English', 'Polish', 'German'],
      },
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://movitransfer.eu/#localbusiness',
      name: 'Movi Transfer',
      description: 'Private door-to-door chauffeur service across Europe. Mercedes-Benz fleet, 24/7 concierge support.',
      url: 'https://movitransfer.eu',
      telephone: '+48000000000',
      priceRange: '€€€',
      image: 'https://movitransfer.eu/images/hero-sedan.jpg',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'PL',
      },
      areaServed: [
        { '@type': 'Country', name: 'Poland' },
        { '@type': 'Country', name: 'Germany' },
        { '@type': 'Country', name: 'Austria' },
        { '@type': 'Country', name: 'Czech Republic' },
      ],
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://movitransfer.eu/#website',
      url: 'https://movitransfer.eu',
      name: 'Movi Transfer',
      publisher: { '@id': 'https://movitransfer.eu/#organization' },
      inLanguage: ['en', 'uk', 'pl', 'ru'],
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider>
          <LanguageProvider>
            <BookingProvider>
              {children}
              <CookieBanner />
            </BookingProvider>
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
