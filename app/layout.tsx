import "./globals.css";
import "plyr/dist/plyr.css";
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
        url: 'https://www.nasza-gazetka.pl/zdjeciehej.png',
        width: 1200,
        height: 630,
        alt: "Szamańskie ceremonie i miliarderzy - śledztwo",
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
      </body>
    </html>
  );
}
