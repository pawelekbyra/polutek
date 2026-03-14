import React from 'react';
import Script from 'next/script';
import { InvestigativeArticle } from '../components/InvestigativeArticle';
import { getDictionary } from '../../dictionaries/get-dictionary';
import { Metadata } from 'next';

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(lang);
  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      images: [
        {
          url: '/okladka.jpg',
          width: 1536,
          height: 804,
          alt: dict.metadata.og_alt,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  return [{ lang: 'pl' }, { lang: 'en' }];
}

export default async function Page({ params: { lang } }: { params: { lang: string } }) {
  const dict = await getDictionary(lang);

  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "url": `https://www.nasza-gazetka.pl/${lang}`,
    "headline": dict.metadata.schema_headline,
    "description": dict.metadata.schema_description,
    "image": ["https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/kordys-aresztowanie-cover-photo.png"],
    "datePublished": "2026-03-14",
    "dateModified": "2026-03-14",
    "author": [{
      "@type": "Person",
      "name": dict.common.journalist_name,
      "url": `mailto:${dict.common.journalist_email}`
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
            {/* Top Badge Structure */}
            <div className="flex flex-col items-center mb-4">
              <div className="border-[2px] border-black px-2 md:px-5 py-1.5 bg-white mb-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <span className="text-[10px] md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.3em] leading-none block text-center">
                  {dict.common.journalist_investigation}
                </span>
              </div>
              <div className="flex items-center gap-3 w-full px-2">
                <div className="h-px flex-grow bg-black/20"></div>
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.5em] leading-none block text-center text-black/40">
                  {dict.common.independent_media}
                </span>
                <div className="h-px flex-grow bg-black/20"></div>
              </div>
            </div>

            <div className="w-full text-center flex flex-col items-center px-4 md:px-6 box-border">
              {/* Main Title SEO */}
              <h1 className="text-black w-full mb-6 font-body font-black text-2xl md:text-5xl uppercase tracking-tighter leading-tight border-b-2 border-black pb-4">
                {dict.page.h1}
              </h1>

              {/* Aesthetic Title */}
              <h2 className="text-black w-full mb-8 opacity-60">
                <span className="block text-3xl md:text-5xl font-body font-black leading-[0.8] tracking-tighter uppercase">
                  {dict.page.h2_eliksir}
                </span>
                <span className="block text-3xl md:text-5xl font-body font-black leading-[0.8] tracking-tighter uppercase">
                  {dict.page.h2_wiedzmina}
                </span>
              </h2>

              {/* Subtitle Bar */}
              <div className="w-full border-y-[1px] border-black py-2.5 mb-8">
                <p className="text-[13px] md:text-base text-black font-bold uppercase tracking-[0.2em] md:tracking-[0.5em] leading-tight md:leading-none not-italic flex flex-col md:block gap-2 md:gap-0">
                  <span className="block md:inline">{dict.page.subtitle_top}</span>
                  <span className="hidden md:inline"> </span>
                  <span className="block md:inline">{dict.page.subtitle_bottom}</span>
                </p>
              </div>

              {/* Lead Paragraph */}
              <div className="max-w-2xl mx-auto mb-16">
                <p className="text-sm md:text-2xl text-[#000000] leading-snug italic font-serif font-bold px-4">
                  {dict.page.lead}
                </p>
              </div>
            </div>
          </div>

          {/* Main Article Content */}
          <InvestigativeArticle dict={dict} />

        </div>
      </main>
    </>
  );
}
