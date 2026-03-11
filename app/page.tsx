import React from 'react';
import Script from 'next/script';
import { InvestigativeArticle } from './components/InvestigativeArticle';

export default function Page() {
  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "url": "https://www.nasza-gazetka.pl",
    "headline": "Michał Kiciński, Ayahuasca i szamani z Janowa. Śmierć uczestniczki ceremonii.",
    "description": "Pełna dokumentacja śledztwa: Michał Kiciński, Jarosław Kordys i prokurator Jolanta Świdnicka. Ayahuasca, Janów i tragiczna śmierć uczestniczki.",
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

          {/* Hero Section */}
          <div className="w-full min-h-[100dvh] flex flex-col">
            {/* Header Section */}
            <div className="w-full flex flex-col items-center pt-2 pb-1 bg-white relative z-10">
              <div className="flex items-center justify-center w-[calc(100%-2rem)] mx-auto gap-4 pt-4 pb-1">
                <div className="flex-grow h-0.5 bg-black"></div>
                <h2 className="text-4xl md:text-[5rem] font-black tracking-tighter text-black uppercase font-display leading-none whitespace-nowrap px-2">
                  NASZA GAZETKA
                </h2>
                <div className="flex-grow h-0.5 bg-black"></div>
              </div>
              <div className="w-[calc(100%-2rem)] mx-auto border-y-2 border-black py-0 flex items-center justify-center px-4 text-[10px] md:text-lg font-black uppercase tracking-[0.25em]">
                <span>Niezależne media</span>
              </div>
            </div>

            {/* Intro Content */}
            <div className="w-full flex-grow flex flex-col items-center justify-center text-center px-6 box-border relative z-10 py-2 md:py-4">
              <div className="w-full max-w-[120px] md:max-w-[200px] lg:max-w-[240px] mx-auto mb-2 md:mb-4">
                <img
                  src="/zdjeciehej.png"
                  alt="Dokumentacja śledztwa - Eliksir Wiedźmina"
                  className="w-full h-auto grayscale mix-blend-multiply"
                />
              </div>
              <h1 className="text-black w-full mb-1">
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-[6.5rem] font-body font-black leading-[0.8] tracking-tighter uppercase">
                  Eliksir
                </span>
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-[6.5rem] font-body font-black leading-[0.8] tracking-tighter uppercase">
                  Wiedźmina
                </span>
              </h1>
              <p className="block text-[9px] sm:text-xs md:text-sm lg:text-base text-black font-black uppercase tracking-[0.25em] mt-2 md:mt-4 border-y-2 border-black py-1 px-4 max-w-fit mx-auto">
                MROCZNA TAJEMNICA TWÓRCÓW CD PROJEKT
              </p>
              <div className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto mt-4 md:mt-6">
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#000000] leading-tight md:leading-snug italic font-serif font-bold px-4">
                  Ayahuasca, policyjne naloty i tragedia, o której nie miał się nikt dowiedzieć. Publicznie dostępne akta i rejestry ujawniają, jak twórcy gry „Wiedźmin” finansowali szamańskie podziemie.
                </p>
              </div>

              {/* Scroll Indicator */}
              <div className="mt-auto pt-4 md:pt-8 animate-bounce">
                <span className="text-xl md:text-2xl text-black">↓</span>
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
