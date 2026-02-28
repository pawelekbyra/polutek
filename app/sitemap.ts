export default async function sitemap() {
  const baseUrl = 'https://www.eliksir-wiedzmina.pl';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];
}
