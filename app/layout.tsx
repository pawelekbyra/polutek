import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}>
      <head>
        <title>Wiadomości Śledcze | Archiwum Niezależne</title>
        <meta name="description" content="Niezależne śledztwa dziennikarskie, dokumentacja sądowa i ujawnianie mechanizmów bezprawia." />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </head>
      <body className="antialiased bg-stone-50 text-stone-900 font-serif">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
