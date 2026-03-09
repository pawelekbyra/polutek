import "./globals.css";
import "plyr/dist/plyr.css";
import type { Metadata, Viewport } from 'next';
import { Playfair_Display, EB_Garamond, UnifrakturMaguntia } from 'next/font/google';

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Szamańskie ceremonie i miliarderzy – Ujawniamy kulisy śledztwa",
  description: "Śledztwo w sprawie tajemniczych zgonów podczas szamańskich ceremonii z udziałem twórców gier i Michała Kicińskiego. Ujawniamy kulisy i pełną dokumentację.",
  metadataBase: new URL('https://www.eliksir-wiedzmina.pl'),
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
    title: "Szamańskie ceremonie i miliarderzy – Ujawniamy kulisy śledztwa",
    description: "Śledztwo w sprawie tajemniczych zgonów podczas szamańskich ceremonii z udziałem twórców gier i Michała Kicińskiego. Ujawniamy kulisy i pełną dokumentację.",
    url: '/',
    siteName: 'Eliksir Wiedźmina',
    images: [
      {
        url: 'https://www.eliksir-wiedzmina.pl/zdjeciehej.png',
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
    <html lang="pl" className={`${playfair.variable} ${ebGaramond.variable} ${unifraktur.variable}`}>
      <body className="antialiased text-black">
        {children}
      </body>
    </html>
  );
}
