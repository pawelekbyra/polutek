import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { headers } from "next/headers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata() {
  const headersList = headers();
  const host = headersList.get('host') || '';
  const isSubdomain = host.includes('ai.');

  const title = isSubdomain
    ? "Kurs Architekt Cyfrowy | Vibe Coding & Budowa SaaS z AI"
    : "Eliksir Wiedźmina";

  const description = isSubdomain
    ? "Opanuj Metodę Zero Terminala. Zbuduj własną aplikację w weekend używając Cursor AI, Bolt i Supabase. Bez nauki składni."
    : "W cieniu głośnego procesu „szamanów”, śledztwo ujawnia sieć powiązań prowadzącą do twórców gry „Wiedźmin”.";

  const keywords = isSubdomain
    ? ["vibe coding", "kurs cursor ai", "jak zrobić aplikację ai", "programowanie dla nietechnicznych", "bolt.new tutorial", "supabase dla początkujących"]
    : [];

  const robots = isSubdomain ? "index, follow" : "noindex, nofollow";

  return {
    title,
    description,
    keywords,
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
