import React from 'react';
import Script from 'next/script';
import { InvestigativeArticle } from './components/InvestigativeArticle';

export default function Page() {
  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "url": "https://www.nasza-gazetka.pl",
    "headline": "Michał Kiciński, Ayahuasca i szamani z Janova. Śmierć uczestniczki ceremonii.",
    "description": "Pełna dokumentacja śledztwa: Michał Kiciński, Jarosław Kordys i prokurator Jolanta Świdnicka. Ayahuasca, Janów i tragiczna śmierć uczestniczki.",
    "image": ["https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/kordys-aresztowanie-cover-photo.png"],
    "datePublished": "2024-03-03",
    "author": [{
      "@type": "Person",
      "name": "Marlow",
      "url": "mailto:marlow@nasza-gazetka.pl"
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
          <div className="w-full flex flex-col items-center pt-2 pb-1 bg-white relative z-10">
            <div className="flex items-center justify-center w-[calc(100%-2rem)] mx-auto gap-4 pt-4 pb-1">
              <div className="flex-grow h-px bg-black"></div>
              <h2 className="text-4xl md:text-[5rem] font-black tracking-tighter text-black uppercase font-display leading-none whitespace-nowrap px-2">
                NASZA GAZETKA
              </h2>
              <div className="flex-grow h-px bg-black"></div>
            </div>
            <div className="w-[calc(100%-2rem)] mx-auto border-y border-black py-2 flex items-center justify-center px-4 text-[10px] md:text-lg font-black uppercase tracking-[0.25em]">
              <span>Niezależne media</span>
            </div>
          </div>

          <div className="w-full text-center flex flex-col items-center pt-6 pb-4 px-6 box-border relative z-10">
            <h1 className="text-black w-full mb-1">
              <span className="block text-5xl md:text-[8.5rem] font-display font-black leading-[0.85] tracking-tighter uppercase">
                Eliksir
              </span>
              <span className="block text-5xl md:text-[8.5rem] font-display font-black leading-[0.85] tracking-tighter uppercase">
                Wiedźmina
              </span>
            </h1>
            <p className="block text-xs md:text-xl text-black font-black italic uppercase tracking-[0.25em] mt-4 border-y-2 border-black py-1">
              MROCZNA TAJEMNICA TWÓRCÓW CD PROJEKT
            </p>
            <div className="max-w-3xl mx-auto mt-6">
              <p className="text-sm md:text-lg text-[#000000] leading-snug italic font-serif font-bold px-4">
                Ayahuasca, policyjne naloty i tragedia, o której nie miał się nikt dowiedzieć. Publicznie dostępne akta i rejestry ujawniają, jak twórcy gry „Wiedźmin” finansowali szamańskie podziemie.
              </p>
            </div>
          </div>

          {/* Main Article Content */}
          <InvestigativeArticle />

        </div>
      </main>
    </>
  );
}
