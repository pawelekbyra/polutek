import { MetadataRoute } from 'next'
import { headers } from 'next/headers'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const host = headersList.get('host') || '';

  if (host.includes('eliksir-wiedzmina.pl')) {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
      },
      sitemap: 'https://www.eliksir-wiedzmina.pl/sitemap.xml',
    }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `https://${host}/sitemap.xml`,
  }
}
