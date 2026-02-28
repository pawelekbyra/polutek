import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "@/components/Providers";
import { UserProvider } from '@/context/UserContext';
import "../globals.css";
import type { Viewport } from 'next';

const inter = Inter({ subsets: ["latin"] });

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
      <body className="antialiased font-serif">
        <UserProvider>
          {children}
        </UserProvider>
        <Analytics />
      </body>
    </html>
  );
}
