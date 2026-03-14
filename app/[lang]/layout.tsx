import "../globals.css";
import "plyr/dist/plyr.css";
import { Analytics } from "@vercel/analytics/next";
import type { Viewport } from 'next';
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

export default function RootLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <html lang={lang} className={`${playfair.variable} ${ebGaramond.variable} ${unifraktur.variable} ${pirata.variable}`}>
      <head>
        <link rel="alternate" hrefLang="pl" href="https://www.nasza-gazetka.pl/pl" />
        <link rel="alternate" hrefLang="en" href="https://www.nasza-gazetka.pl/en" />
        <link rel="alternate" hrefLang="x-default" href="https://www.nasza-gazetka.pl/pl" />
      </head>
      <body className="antialiased text-black">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
