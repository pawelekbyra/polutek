import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"; // <--- 1. DODAJ IMPORT
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
        <title>Dwa światy Wiedźmina: Mroczna tajemnica ayahuaski i milionerów z CD Projekt</title>
        <meta name="description" content="W cieniu głośnego procesu „szamanów”, śledztwo ujawnia sieć powiązań prowadzącą do twórców gry „Wiedźmin”." />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Dwa światy Wiedźmina: Mroczna tajemnica ayahuaski i milionerów z CD Projekt" />
        <meta property="og:description" content="W cieniu głośnego procesu „szamanów”, śledztwo ujawnia sieć powiązań prowadzącą do twórców gry „Wiedźmin”." />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Dwa światy Wiedźmina: Mroczna tajemnica ayahuaski i milionerów z CD Projekt" />
        <meta property="twitter:description" content="W cieniu głośnego procesu „szamanów”, śledztwo ujawnia sieć powiązań prowadzącą do twórców gry „Wiedźmin”." />

        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </head>
      <body className={`antialiased ${inter.className}`}>
        {children}
        <Analytics /> {/* <--- 2. DODAJ KOMPONENT TUŻ PRZED ZAMKNIĘCIEM BODY */}
      </body>
    </html>
  );
}
