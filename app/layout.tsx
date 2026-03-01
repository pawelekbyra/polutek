import { Playfair_Display, Lora, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import type { Viewport } from 'next';

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif-header" });
const lora = Lora({ subsets: ["latin"], variable: "--font-serif-body" });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

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
    <html lang="pl" className={`${playfair.variable} ${lora.variable} ${inter.variable}`}>
      <body className="antialiased paper-texture font-serif-body bg-[#fdfbf7] selection:bg-stone-200">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
