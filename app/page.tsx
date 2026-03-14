"use client";

import React from 'react';
import Script from 'next/script';
import { InvestigativeArticle } from './components/InvestigativeArticle';
import { useLanguage } from './components/LanguageContext';

export default function Page() {
  const { t, locale, setLocale } = useLanguage();

  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "url": "https://www.nasza-gazetka.pl",
    "headline": "Afera CD Projekt: Kiciński, Ayahuasca i Mroczne Śledztwo",
    "description": "Śmierć podczas ceremonii z Ayahuascą, zacieranie śladów i szokujące kulisy świata twórców CD Projekt.",
    "image": ["https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/kordys-aresztowanie-cover-photo.png"],
    "datePublished": "2026-03-14",
    "dateModified": "2026-03-14",
    "author": [{
      "@type": "Person",
      "name": t.article.signatureName,
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
          <div className="w-full flex flex-col items-center pt-12 pb-4 bg-white relative z-10">
            {/* Language Switcher */}
            <div className="absolute top-4 right-6 flex gap-2 font-mono text-[10px] font-black">
              <button
                onClick={() => setLocale('pl')}
                className={`px-2 py-1 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors ${locale === 'pl' ? 'bg-[#e8d154]' : 'bg-white hover:bg-gray-100'}`}
              >
                PL
              </button>
              <button
                onClick={() => setLocale('en')}
                className={`px-2 py-1 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors ${locale === 'en' ? 'bg-[#e8d154]' : 'bg-white hover:bg-gray-100'}`}
              >
                EN
              </button>
            </div>

            {/* Top Badge Structure */}
            <div className="flex flex-col items-center mb-4">
              <div className="border-[2px] border-black px-2 md:px-5 py-1.5 bg-white mb-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <span className="text-[10px] md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.3em] leading-none block text-center">
                  {t.header.investigation}
                </span>
              </div>
              <div className="flex items-center gap-3 w-full px-2">
                <div className="h-px flex-grow bg-black/20"></div>
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.5em] leading-none block text-center text-black/40">
                  {t.header.independentMedia}
                </span>
                <div className="h-px flex-grow bg-black/20"></div>
              </div>
            </div>

            <div className="w-full text-center flex flex-col items-center px-4 md:px-6 box-border">
              {/* Main Title SEO */}
              <h1 className="text-black w-full mb-6 font-body font-black text-2xl md:text-5xl uppercase tracking-tighter leading-tight border-b-2 border-black pb-4">
                Afera CD Projekt: Kiciński, Ayahuasca i Mroczne Śledztwo
              </h1>

              {/* Aesthetic Title */}
              <h2 className="text-black w-full mb-8 opacity-60">
                <span className="block text-3xl md:text-5xl font-body font-black leading-[0.8] tracking-tighter uppercase">
                  Eliksir
                </span>
                <span className="block text-3xl md:text-5xl font-body font-black leading-[0.8] tracking-tighter uppercase">
                  Wiedźmina
                </span>
              </h2>

              {/* Subtitle Bar */}
              <div className="w-full border-y-[1px] border-black py-2.5 mb-8">
                <p className="text-[13px] md:text-base text-black font-bold uppercase tracking-[0.2em] md:tracking-[0.5em] leading-tight md:leading-none not-italic flex flex-col md:block gap-2 md:gap-0">
                  <span className="block md:inline">{t.header.subtitlePart1}</span>
                  <span className="hidden md:inline"> </span>
                  <span className="block md:inline">{t.header.subtitlePart2}</span>
                </p>
              </div>

              {/* Lead Paragraph */}
              <div className="max-w-2xl mx-auto mb-16">
                <p className="text-sm md:text-2xl text-[#000000] leading-snug italic font-serif font-bold px-4">
                  {t.header.lead}
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
