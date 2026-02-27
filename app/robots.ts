import { MetadataRoute } from 'next'
import { headers } from 'next/headers'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  let host = headersList.get('host') || 'polutek.pl';
  // Canonical host for robots/sitemap
  if (host === 'vibecoding.polutek.pl' || host === 'www.vibecoding.polutek.pl') {
    host = 'polutek.pl';
  }
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${protocol}://${host}/sitemap.xml`,
  }
}
