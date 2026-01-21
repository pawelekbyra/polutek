
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <title>Dwa światy Wiedźmina: Mroczna tajemnica ayahuaski i milionerów z CD Projekt</title>
        <meta name="description" content="W cieniu głośnego procesu „szamanów”, śledztwo ujawnia sieć powiązań prowadzącą do twórców gry „Wiedźmin”." />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://twoja-domena.pl/" />
        <meta property="og:title" content="Dwa światy Wiedźmina: Mroczna tajemnica ayahuaski i milionerów z CD Projekt" />
        <meta property="og:description" content="W cieniu głośnego procesu „szamanów”, śledztwo ujawnia sieć powiązań prowadzącą do twórców gry „Wiedźmin”." />
        <meta property="og:image" content="https://twoja-domena.pl/social-image.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://twoja-domena.pl/" />
        <meta property="twitter:title" content="Dwa światy Wiedźmina: Mroczna tajemnica ayahuaski i milionerów z CD Projekt" />
        <meta property="twitter:description" content="W cieniu głośnego procesu „szamanów”, śledztwo ujawnia sieć powiązań prowadzącą do twórców gry „Wiedźmin”." />
        <meta property="twitter:image" content="https://twoja-domena.pl/social-image.png" />

        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={cn("antialiased", inter.className)}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
