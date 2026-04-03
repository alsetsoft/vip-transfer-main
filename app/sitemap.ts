import type { MetadataRoute } from 'next'
import { getAllSlugs } from '@/lib/routes-data'

const FLEET_IDS = [
  'passat', 'superb', 'vito', 'a6', 'eclass', 'bmw5',
  'glb', 'vclass', 'a8', 'sprinter', 'sclass',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://movitransfer.eu'
  const lastModified = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: base,                             lastModified, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/routes`,                 lastModified, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/fleet`,                  lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/rental`,                 lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/rental/with-driver`,     lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/rental/self-drive`,      lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/regulamin`,              lastModified, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${base}/polityka-prywatnosci`,   lastModified, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${base}/polityka-cookies`,       lastModified, changeFrequency: 'yearly',  priority: 0.3 },
  ]

  const routePages: MetadataRoute.Sitemap = getAllSlugs().map(slug => ({
    url: `${base}/routes/${slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const fleetPages: MetadataRoute.Sitemap = FLEET_IDS.map(id => ({
    url: `${base}/fleet/${id}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...routePages, ...fleetPages]
}
