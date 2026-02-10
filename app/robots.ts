import { MetadataRoute } from 'next'
import { headers } from 'next/headers'

export default function robots(): MetadataRoute.Robots {
  const headersList = headers()
  const host = headersList.get('host') || ''

  // Check if host is ai.polutek.pl or contains ai.
  const isAiSubdomain = host.includes('ai.')

  if (isAiSubdomain) {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
      },
      sitemap: 'https://ai.polutek.pl/sitemap.xml',
    }
  }

  // Default: disallow everything for the main domain
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
  }
}
