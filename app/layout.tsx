import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "@/components/Providers";
import "./globals.css";
import type { Viewport } from 'next';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Eliksir Wiedźmina",
  description: "W cieniu głośnego procesu „szamanów”, śledztwo ujawnia sieć powiązań prowadzącą do twórców gry „Wiedźmin”.",
  robots: "index, follow",
  openGraph: {
    title: "Eliksir Wiedźmina",
    description: "W cieniu głośnego procesu „szamanów”, śledztwo ujawnia sieć powiązań prowadzącą do twórców gry „Wiedźmin”.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eliksir Wiedźmina",
    description: "W cieniu głośnego procesu „szamanów”, śledztwo ujawnia sieć powiązań prowadzącą do twórców gry „Wiedźmin”.",
  },
};

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
    <html lang="pl">
      <body className={`antialiased ${inter.className}`}>
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
