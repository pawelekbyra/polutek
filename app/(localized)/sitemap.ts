import { locales } from '@/app/i18n-config';

export default function sitemap() {
  const baseUrl = 'https://www.nasza-gazetka.pl';
  const routes = ['', 'prokuratura-rejonowa-w-walbrzychu'];

  const entries = locales.flatMap((lang) =>
    routes.map((route) => ({
      url: `${baseUrl}/${lang}/${route}${route ? '/' : ''}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1.0 : 0.8,
    }))
  );

  return entries;
}
