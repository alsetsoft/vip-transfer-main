import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CarDetailClient from './client'

const CAR_SEO: Record<string, { name: string; classLabel: string; image: string }> = {
  sclass:   { name: 'Mercedes-Benz S-Class',    classLabel: 'Premium',  image: '/images/cars/mercedes-sclass.png' },
  eclass:   { name: 'Mercedes-Benz E-Class',    classLabel: 'Business', image: '/images/cars/mercedes-eclass.png' },
  vclass:   { name: 'Mercedes-Benz V-Class',    classLabel: 'Premium',  image: '/images/cars/mercedes-vclass.png' },
  passat:   { name: 'Volkswagen Passat B8',      classLabel: 'Comfort',  image: '/images/cars/passat-b8.png' },
  superb:   { name: 'Škoda Superb',              classLabel: 'Comfort',  image: '/images/cars/skoda-superb.png' },
  vito:     { name: 'Mercedes-Benz Vito',        classLabel: 'Comfort',  image: '/images/cars/mercedes-vito.png' },
  a6:       { name: 'Audi A6 S Line',            classLabel: 'Business', image: '/images/cars/audi-a6.png' },
  bmw5:     { name: 'BMW 5 Series',              classLabel: 'Business', image: '/images/cars/bmw-5.png' },
  glb:      { name: 'Mercedes-Benz GLB',         classLabel: 'Business', image: '/images/cars/mercedes-glb.png' },
  a8:       { name: 'Audi A8 L S Line',          classLabel: 'Premium',  image: '/images/cars/audia8lsline.png' },
  sprinter: { name: 'Mercedes-Benz Sprinter VIP',classLabel: 'Premium',  image: '/images/cars/mercedes-sprinter.png' },
}

export async function generateStaticParams() {
  return Object.keys(CAR_SEO).map(id => ({ id }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params
  const car = CAR_SEO[id]
  if (!car) return {}

  const title = `${car.name} — ${car.classLabel} Class`
  const description = `${car.name} available for private chauffeur transfers across Europe. ${car.classLabel} class vehicle with premium amenities, professional driver, 24/7 concierge.`

  return {
    title,
    description,
    alternates: {
      canonical: `https://movitransfer.eu/fleet/${id}`,
    },
    openGraph: {
      title: `${title} | Movi Transfer`,
      description,
      url: `https://movitransfer.eu/fleet/${id}`,
      type: 'website',
      siteName: 'Movi Transfer',
      images: [{ url: car.image, width: 1200, height: 630, alt: `${car.name} — Movi Transfer fleet` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Movi Transfer`,
      description,
      images: [car.image],
    },
  }
}

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  if (!CAR_SEO[id]) notFound()

  const car = CAR_SEO[id]

  /* JSON-LD structured data */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: car.name,
    description: `${car.name} — ${car.classLabel} class vehicle for private transfers across Europe.`,
    image: `https://movitransfer.eu${car.image}`,
    brand: {
      '@type': 'Brand',
      name: car.name.split(' ')[0],
    },
    category: `${car.classLabel} Class Transfer Vehicle`,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Movi Transfer',
        url: 'https://movitransfer.eu',
      },
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://movitransfer.eu' },
      { '@type': 'ListItem', position: 2, name: 'Fleet', item: 'https://movitransfer.eu/fleet' },
      { '@type': 'ListItem', position: 3, name: car.name, item: `https://movitransfer.eu/fleet/${id}` },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <CarDetailClient id={id} />
    </>
  )
}
