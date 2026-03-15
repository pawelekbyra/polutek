import "@/app/(localized)/globals.css";
import "plyr/dist/plyr.css";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from 'next';
import { Playfair_Display, EB_Garamond, UnifrakturMaguntia, Pirata_One } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-playfair',
});

const ebGaramond = EB_Garamond({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-garamond',
});

const unifraktur = UnifrakturMaguntia({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-unifraktur',
});

const pirata = Pirata_One({
  weight: '400',
  subsets: ['latin', 'latin-ext'],
  variable: '--font-pirata',
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  viewportFit: "cover",
};

export async function generateStaticParams() {
  return [{ lang: 'pl' }, { lang: 'en' }, { lang: 'es' }, { lang: 'de' }, { lang: 'fr' }];
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const baseUrl = 'https://www.nasza-gazetka.pl';

  return {
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${lang}/`,
      languages: {
        'pl': `${baseUrl}/pl/`,
        'en': `${baseUrl}/en/`,
        'es': `${baseUrl}/es/`,
        'de': `${baseUrl}/de/`,
        'fr': `${baseUrl}/fr/`,
      },
    },
    icons: {
      icon: '/favicon.png',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
      },
    },
  };
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <html lang={params.lang} className={`${playfair.variable} ${ebGaramond.variable} ${unifraktur.variable} ${pirata.variable}`}>
      <body className="antialiased text-black">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
