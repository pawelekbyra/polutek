import "./globals.css";
import "plyr/dist/plyr.css";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from 'next';
import { Playfair_Display, EB_Garamond, UnifrakturMaguntia, Pirata_One } from 'next/font/google';
import { LanguageProvider } from "./components/LanguageContext";

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
  title: "Afera, CD Projekt, Kiciński, Onet, Kordys: Ayahuasca i Mroczne Śledztwo",
  description: "Afera, CD Projekt, Kiciński, Onet, Kordys. Śmierć podczas ceremonii z Ayahuascą, zacieranie śladów i szokujące kulisy świata twórców CD Projekt.",
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
    title: "Afera, CD Projekt, Kiciński, Onet, Kordys: Ayahuasca i Mroczne Śledztwo",
    description: "Afera, CD Projekt, Kiciński, Onet, Kordys. Śmierć podczas ceremonii z Ayahuascą, zacieranie śladów i szokujące kulisy świata twórców CD Projekt.",
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
        <LanguageProvider>
          {children}
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
