import { Inter, Playfair_Display, EB_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import type { Viewport } from 'next';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const garamond = EB_Garamond({ subsets: ["latin"], variable: "--font-garamond" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${inter.variable} ${playfair.variable} ${garamond.variable}`}>
      <body className="antialiased font-serif bg-[#FDFBF7]">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
