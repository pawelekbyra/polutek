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

  if (host === 'eliksir-wiedzmina.pl' || host === 'www.eliksir-wiedzmina.pl') {
    return {
      title: "Eliksir Wiedźmina: Mroczna tajemnica twórców CD Projekt",
      description: "Ayahuasca, policyjne naloty i tragedia, o której nie miał się nikt dowiedzieć. Poznaj mroczną historię twórców gry Wiedźmin.",
      robots: "index, follow",
      openGraph: {
        title: "Eliksir Wiedźmina: Mroczna tajemnica twórców CD Projekt",
        description: "Ayahuasca, policyjne naloty i tragedia, o której nie miał się nikt dowiedzieć. Poznaj mroczną historię twórców gry Wiedźmin.",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: "Eliksir Wiedźmina: Mroczna tajemnica twórców CD Projekt",
        description: "Ayahuasca, policyjne naloty i tragedia, o której nie miał się nikt dowiedzieć. Poznaj mroczną historię twórców gry Wiedźmin.",
      },
    };
  }

  if (host === 'ai.polutek.pl' || host === 'www.ai.polutek.pl') {
    return {
      title: "Vibe Coding: Przyszłość Programowania z AI | Andrej Karpathy",
      description: "Dowiedz się czym jest Vibe Coding, jak używać narzędzi Cursor i Claude oraz dlaczego Andrej Karpathy ogłosił koniec tradycyjnego programowania.",
      robots: "index, follow",
      keywords: "vibe coding, ai coding, cursor editor, claude 3.5 sonnet, andrej karpathy, programowanie ai, przyszłość it",
      openGraph: {
        title: "Vibe Coding: Przyszłość Programowania z AI",
        description: "Największy polski portal o Vibe Codingu. Narzędzia, tutoriale i manifest programowania intencyjnego.",
        type: "website",
      },
    };
  }

  return {
    title: "Detektyw Polutek - Agencja Śledcza",
    description: "Niezależne śledztwa dziennikarskie i analizy.",
    robots: "index, follow",
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
