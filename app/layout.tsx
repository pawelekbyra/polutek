import "./globals.css";
import type { Metadata, Viewport } from 'next';
import { Playfair_Display, EB_Garamond, UnifrakturMaguntia } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-playfair',
});

const ebGaramond = EB_Garamond({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-eb-garamond',
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
  title: "Michał Kiciński, Ayahuasca i Tajemnicza Śmierć w Janovie",
  description: "Pełna dokumentacja śledztwa dziennikarskiego w sprawie ceremonii ayahuaski. Dowody, nagrania i treści wyroków.",
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
    title: "Michał Kiciński, Ayahuasca i Tajemnicza Śmierć w Janovie",
    description: "Pełna dokumentacja śledztwa dziennikarskiego: Michał Kiciński i mroczna tajemnica Janova.",
    url: '/',
    siteName: 'Eliksir Wiedźmina',
    images: [
      {
        url: 'https://www.eliksir-wiedzmina.pl/gallery/wyrok_kordysa/wezwanie/wezwanie_kicinski.png',
        width: 1200,
        height: 630,
        alt: "Wezwanie dla Michała Kicińskiego",
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
      <body className="antialiased bg-white text-ink">
        {children}
      </body>
    </html>
  );
}
