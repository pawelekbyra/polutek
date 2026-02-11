import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { headers } from "next/headers";
import { Providers } from "@/components/Providers";
import GlobalModals from "@/components/global/GlobalModals";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata() {
  const headersList = headers();
  const host = headersList.get('host') || '';
  const isSubdomain = host.startsWith('ai.');

  const title = isSubdomain ? "Protokół Architekta" : "Eliksir Wiedźmina";
  const description = isSubdomain
    ? "Metoda Zero Terminala. Wykorzystaj Cursor, Bolt i Supabase, by stać się Cyfrowym Architektem."
    : "W cieniu głośnego procesu „szamanów”, śledztwo ujawnia sieć powiązań prowadzącą do twórców gry „Wiedźmin”.";
  const robots = isSubdomain ? "index, follow" : "noindex, nofollow";

  return {
    title,
    description,
    robots,
    viewport: "width=device-width, initial-scale=1.0, viewport-fit=cover",
    openGraph: {
      title,
      description,
      type: isSubdomain ? "website" : "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

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
          <GlobalModals />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
