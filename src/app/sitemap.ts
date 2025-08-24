import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://sysvisionz.com',
      lastModified: new Date(),
    },
    {
      url: 'https://sysvisionz.com/services',
      lastModified: new Date(),
    }
  ]
}
