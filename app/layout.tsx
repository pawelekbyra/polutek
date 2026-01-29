import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <head>
        {/* ZMIANA 1: Główny tytuł w karcie przeglądarki */}
        <title>Eliksir Wiedźmina</title>
        
        <meta name="description" content="W cieniu głośnego procesu „szamanów”, śledztwo ujawnia sieć powiązań prowadzącą do twórców gry „Wiedźmin”." />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        {/* ZMIANA 2: Tytuł dla Facebooka/LinkedIn */}
        <meta property="og:title" content="Eliksir Wiedźmina" />
        <meta property="og:description" content="W cieniu głośnego procesu „szamanów”, śledztwo ujawnia sieć powiązań prowadzącą do twórców gry „Wiedźmin”." />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        {/* ZMIANA 3: Tytuł dla Twittera/X */}
        <meta property="twitter:title" content="Eliksir Wiedźmina" />
        <meta property="twitter:description" content="W cieniu głośnego procesu „szamanów”, śledztwo ujawnia sieć powiązań prowadzącą do twórców gry „Wiedźmin”." />

        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </head>
      <body className={`antialiased ${inter.className}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
