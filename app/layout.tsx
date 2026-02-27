import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "@/components/Providers";
import "./globals.css";
import type { Viewport, Metadata } from 'next';
import { headers } from 'next/headers';

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get('host') || 'polutek.pl';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

  if (host === 'eliksir-wiedzmina.pl' || host === 'www.eliksir-wiedzmina.pl') {
    return {
      title: "Eliksir Wiedźmina: Mroczna tajemnica twórców CD Projekt",
      description: "Ayahuasca, policyjne naloty i tragedia, o której nie miał się nikt dowiedzieć. Poznaj mroczną historię twórców gry Wiedźmin.",
      metadataBase: new URL(`${protocol}://${host}`),
      alternates: {
        canonical: '/',
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
        },
      },
      openGraph: {
        title: "Eliksir Wiedźmina: Mroczna tajemnica twórców CD Projekt",
        description: "Ayahuasca, policyjne naloty i tragedia, o której nie miał się nikt dowiedzieć. Poznaj mroczną historię twórców gry Wiedźmin.",
        type: "article",
        url: `${protocol}://${host}`,
      },
      twitter: {
        card: "summary_large_image",
        title: "Eliksir Wiedźmina: Mroczna tajemnica twórców CD Projekt",
        description: "Ayahuasca, policyjne naloty i tragedia, o której nie miał się nikt dowiedzieć. Poznaj mroczną historię twórców gry Wiedźmin.",
      },
    };
  }

  if (host === 'polutek.pl' || host === 'www.polutek.pl' || host === 'vibecoding.polutek.pl' || host === 'www.vibecoding.polutek.pl' || host === 'localhost' || host === '127.0.0.1') {
    return {
      title: "Polutek.pl - Vibe Coding i Przyszłość Programowania z AI",
      description: "Największy polski portal o Vibe Codingu. Dowiedz się jak używać narzędzi Cursor i Claude oraz dlaczego Andrej Karpathy ogłosił nową erę IT.",
      metadataBase: new URL(`${protocol}://${host}`),
      alternates: {
        canonical: '/',
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
        },
      },
      keywords: "vibe coding, polutek, ai coding, cursor editor, claude 3.5 sonnet, andrej karpathy, programowanie ai, przyszłość it",
      openGraph: {
        title: "Polutek.pl - Vibe Coding i Przyszłość Programowania z AI",
        description: "Narzędzia, tutoriale i manifest programowania intencyjnego. Polutek.pl - Twoje centrum wiedzy o AI Software Engineering.",
        type: "website",
        url: `${protocol}://${host}`,
      },
    };
  }

  return {
    title: "Detektyw Polutek - Agencja Śledcza",
    description: "Niezależne śledztwa dziennikarskie i analizy.",
    metadataBase: new URL(`${protocol}://${host}`),
    robots: {
      index: true,
      follow: true,
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
