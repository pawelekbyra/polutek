import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "@/components/Providers";
import "./globals.css";
import type { Viewport, Metadata } from 'next';
import { headers } from 'next/headers';

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get('host');

  if (host === 'elixir-wiedzmina.pl') {
    return {
      title: "Mroczne kulisy polskiego biznesu: czeskie osady i niebezpieczne ceremonie",
      description: "Śledztwo ujawnia sekrety. Sprawdź, co naprawdę dzieje się podczas niebezpiecznych ceremonii w czeskich osadach i jakie tajemnice skrywają organizatorzy.",
      robots: "index, follow",
      openGraph: {
        title: "Mroczne kulisy polskiego biznesu: czeskie osady i niebezpieczne ceremonie",
        description: "Śledztwo ujawnia sekrety. Sprawdź, co naprawdę dzieje się podczas niebezpiecznych ceremonii w czeskich osadach i jakie tajemnice skrywają organizatorzy.",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: "Mroczne kulisy polskiego biznesu: czeskie osady i niebezpieczne ceremonie",
        description: "Śledztwo ujawnia sekrety. Sprawdź, co naprawdę dzieje się podczas niebezpiecznych ceremonii w czeskich osadach i jakie tajemnice skrywają organizatorzy.",
      },
    };
  }

  return {
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
}

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
