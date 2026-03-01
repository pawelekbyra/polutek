import "./globals.css";
import type { Metadata, Viewport } from 'next';
import { EB_Garamond, Playfair_Display, UnifrakturMaguntia } from 'next/font/google';

const ebGaramond = EB_Garamond({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-serif',
});

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-display',
});

const unifraktur = UnifrakturMaguntia({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-masthead',
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
        url: 'https://yellow-elegant-porpoise-917.mypinata.cloud/ipfs/bafybeigjvxqqprplfpt4io3ciq6ut4x652p4mwetb3kscufj3uwj6z36tm/wezwanie/wezwanie_kicinski.png',
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
    <html lang="pl" className={`${ebGaramond.variable} ${playfair.variable} ${unifraktur.variable}`}>
      <body className={`antialiased font-serif bg-[#FDFBF7]`}>
        {children}
      </body>
    </html>
  );
}
