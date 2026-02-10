import { MetadataRoute } from 'next'
import { headers } from 'next/headers'

export default function robots(): MetadataRoute.Robots {
  const headersList = headers()
  const host = headersList.get('host') || ''

  // Logic: Allow indexing only on ai.polutek.pl (or local ai. subdomains)
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

  // For any other host (main domain), disallow all
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
    sitemap: 'https://ai.polutek.pl/sitemap.xml',
  }
}
