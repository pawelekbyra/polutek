import "../globals.css";
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
  title: "Nasza Gazetka - Śledztwa Dziennikarskie",
  description: "Wybierz język, aby przeczytać reportaż. Select language to read the investigative report.",
  icons: {
    icon: '/favicon.png',
  },
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${playfair.variable} ${ebGaramond.variable} ${unifraktur.variable} ${pirata.variable}`}>
      <body className="antialiased bg-[#0f0f0f]">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
