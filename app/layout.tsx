import "./globals.css";
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

export const metadata: Metadata = {
  title: "Michał Kiciński, Ayahuasca i szamani z Janowa. Śmierć uczestniczki ceremonii.",
  description: "Michał Kiciński i mroczne sekrety farmy w Czechach. Śmierć podczas ceremonii z ayahuascą, zacieranie śladów i szokujące kulisy świata twórcy CD Projektu.",
  metadataBase: new URL('https://www.nasza-gazetka.pl'),
  alternates: {
    canonical: 'https://www.nasza-gazetka.pl/',
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
  openGraph: {
    title: "Michał Kiciński, Ayahuasca i szamani z Janowa. Śmierć uczestniczki ceremonii.",
    description: "Michał Kiciński i mroczne sekrety farmy w Czechach. Śmierć podczas ceremonii z ayahuascą, zacieranie śladów i szokujące kulisy świata twórcy CD Projektu.",
    url: '/',
    siteName: 'Eliksir Wiedźmina',
    images: [
      {
        url: 'https://www.nasza-gazetka.pl/okladka.jpg',
        width: 1536,
        height: 804,
        alt: "Twórcy „Wiedźmina” i ich szamani. Śmierć uczestniczki ceremonii Ayahuasca.",
      },
    ],
    locale: 'pl_PL',
    type: 'article',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${playfair.variable} ${ebGaramond.variable} ${unifraktur.variable} ${pirata.variable}`}>
      <body className="antialiased text-black">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
