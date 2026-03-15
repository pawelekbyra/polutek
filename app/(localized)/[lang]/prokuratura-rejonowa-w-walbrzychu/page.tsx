import React from 'react';
import { ProkuraturaArticle } from '@/app/components/ProkuraturaArticle';
import { Metadata } from 'next';
import { getDictionary } from '../dictionaries';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const t = await getDictionary(params.lang as any);
  return {
    title: t.prokuratura.title,
    description: t.prokuratura.description,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function Page({ params: { lang } }: { params: { lang: string } }) {
  const t = await getDictionary(lang as any);

  return (
    <main className="min-h-screen bg-white text-[#000000] selection:bg-[#e8d154]/50 font-body flex flex-col items-center relative">
      <div className="w-full max-w-4xl bg-white flex flex-col items-center pb-0 border-x-4 border-black overflow-hidden relative shadow-2xl">

        {/* Header Section */}
        <div className="w-full flex flex-col items-center pt-12 pb-4 bg-white relative z-10">
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
            {/* Main Title */}
            <h1 className="text-black w-full mb-8">
              <span className="block text-[14.5vw] sm:text-7xl md:text-[7.5rem] font-body font-black leading-[0.8] tracking-tighter uppercase">
                {t.prokuratura.headlinePart1}
              </span>
              <span className="block text-[14.5vw] sm:text-7xl md:text-[7.5rem] font-body font-black leading-[0.8] tracking-tighter uppercase">
                {t.prokuratura.headlinePart2}
              </span>
            </h1>

            {/* Subtitle Bar */}
            <div className="w-full border-y-[1px] border-black py-2.5 mb-8">
              <p className="text-[13px] md:text-base text-black font-bold uppercase tracking-[0.2em] md:tracking-[0.5em] leading-tight md:leading-none not-italic flex flex-col md:block gap-2 md:gap-0">
                <span className="block md:inline">{t.prokuratura.subtitlePart1}</span>
                <span className="hidden md:inline"> </span>
                <span className="block md:inline">{t.prokuratura.subtitlePart2}</span>
              </p>
            </div>

            {/* Lead Paragraph */}
            <div className="max-w-2xl mx-auto mb-16">
              <p className="text-sm md:text-2xl text-[#000000] leading-snug italic font-serif font-bold px-4">
                {t.prokuratura.lead}
              </p>
            </div>
          </div>
        </div>

        {/* Main Article Content */}
        <ProkuraturaArticle lang={lang as any} />

        <footer className="mt-8 pb-12 text-center w-full">
            <a href="https://www.nasza-gazetka.pl" className="inline-block font-serif text-base font-bold text-black/60 hover:text-black hover:bg-[#e8d154]/20 transition-all underline decoration-1 underline-offset-8 px-4 py-2 tracking-[0.2em]">
              WWW.NASZA-GAZETKA.PL
            </a>
         </footer>
      </div>
    </main>
  );
}
