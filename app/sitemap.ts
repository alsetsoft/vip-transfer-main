import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://grandvoyagetransfers.eu'
  const lastModified = new Date()

  return [
    { url: base,                             lastModified, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/fleet`,                  lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/routes`,                 lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/rental/with-driver`,     lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/rental/self-drive`,      lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/regulamin`,              lastModified, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${base}/polityka-prywatnosci`,   lastModified, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${base}/polityka-cookies`,       lastModified, changeFrequency: 'yearly',  priority: 0.3 },
  ]
}
