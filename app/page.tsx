import React from 'react';
import Script from 'next/script';
import { InvestigativeArticle } from './components/InvestigativeArticle';

export default function Page() {
  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "url": "https://www.nasza-gazetka.pl",
    "headline": "Twórcy „Wiedźmina” i ich szamani. Śmierć uczestniczki ceremonii.",
    "description": "Śmierć podczas ceremonii z Ayahuascą, zacieranie śladów i szokujące kulisy świata twórców CD Projekt.",
    "image": ["https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/kordys-aresztowanie-cover-photo.png"],
    "datePublished": "2024-03-03",
    "author": [{
      "@type": "Person",
      "name": "Wojciech Kurka",
      "url": "mailto:wojciech.kurka@protonmail.com"
    }]
  };

  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/hls.js@latest" strategy="afterInteractive" />
      <script
        type="application/ld+json"
        id="news-article-schema"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }}
      />

      <main className="min-h-screen bg-white text-[#000000] selection:bg-[#e8d154]/50 font-body flex flex-col items-center relative">
        <div className="w-full max-w-4xl bg-white flex flex-col items-center pb-0 border-x-4 border-black overflow-hidden relative shadow-2xl">

          {/* Header Section */}
          <div className="w-full flex flex-col items-center pt-10 pb-4 bg-white relative z-10">
            {/* Top Badge */}
            <div className="border-[3px] border-black px-4 py-1.5 mb-10 bg-white">
              <span className="text-[11px] font-black uppercase tracking-[0.15em] leading-tight block text-center">
                DZIENNIKARSKIE ŚLEDZTWO<br/>
                MEDIA NIEZALEŻNE
              </span>
            </div>

            <div className="w-full text-center flex flex-col items-center px-6 box-border">
              {/* Hero Image */}
              <div className="w-full max-w-[320px] mx-auto mb-8">
                <img
                  src="/zdjeciehej.png"
                  alt="Zdjecie śledcze"
                  className="w-full h-auto grayscale mix-blend-multiply"
                />
              </div>

              {/* Document Label */}
              <div className="mb-4">
                <span className="font-serif italic text-base text-black/90 tracking-tight">
                  Dokumentacja śledztwa — Eliksir Wiedźmina
                </span>
              </div>

              {/* Main Title */}
              <h1 className="text-black w-full mb-8">
                <span className="block text-7xl md:text-[8.5rem] font-body font-black leading-[0.75] tracking-tighter uppercase">
                  Eliksir
                </span>
                <span className="block text-7xl md:text-[8.5rem] font-body font-black leading-[0.75] tracking-tighter uppercase">
                  Wiedźmina
                </span>
              </h1>

              {/* Subtitle Bar */}
              <div className="w-full border-y-[3px] border-black py-2.5 mb-8">
                <p className="text-xs md:text-lg text-black font-black uppercase tracking-[0.3em] leading-none not-italic">
                  MROCZNA TAJEMNICA TWÓRCÓW CD PROJEKT
                </p>
              </div>

              {/* Lead Paragraph */}
              <div className="max-w-2xl mx-auto mb-12">
                <p className="text-lg md:text-xl text-[#000000] leading-snug italic font-serif font-bold px-4">
                  Ayahuasca, policyjne naloty i tragedia, o której nie miał się nikt dowiedzieć. Publicznie dostępne akta i rejestry ujawniają, jak twórcy gry „Wiedźmin” finansowali szamańskie podziemie.
                </p>
              </div>
            </div>
          </div>

          {/* Main Article Content */}
          <InvestigativeArticle />

        </div>
      </main>
    </>
  );
}
