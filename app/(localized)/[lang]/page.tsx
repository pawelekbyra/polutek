import React from 'react';
import Script from 'next/script';
import Link from 'next/link';
import { InvestigativeArticle } from '@/app/components/InvestigativeArticle';
import { getDictionary } from './dictionaries';
import { Metadata } from 'next';
import { locales, Locale } from '@/app/i18n-config';

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const t = await getDictionary(params.lang as any);

  const localeMap: Record<string, string> = {
    pl: 'pl_PL',
    en: 'en_US',
    es: 'es_ES',
    de: 'de_DE',
    fr: 'fr_FR',
    cs: 'cs_CZ',
  };

  return {
    title: t.metadata.title,
    description: t.metadata.description,
    openGraph: {
      title: t.metadata.title,
      description: t.metadata.description,
      images: [
        {
          url: 'https://www.nasza-gazetka.pl/okladka.jpg',
          width: 1536,
          height: 804,
          alt: t.metadata.ogAlt,
        },
      ],
      locale: localeMap[params.lang] || 'en_US',
      type: 'article',
    },
  };
}

export default async function Page({ params: { lang } }: { params: { lang: Locale } }) {
  const t = await getDictionary(lang);

  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "url": `https://www.nasza-gazetka.pl/${lang}/`,
    "headline": t.metadata.title,
    "description": t.metadata.description,
    "image": ["https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/kordys-aresztowanie-cover-photo.png"],
    "datePublished": "2026-03-14",
    "dateModified": "2026-03-14",
    "author": [{
      "@type": "Person",
      "name": t.article.signatureName,
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
          <div className="w-full flex flex-col items-center pt-12 pb-4 bg-white relative z-10">
            {/* Language Switcher */}
            <div className="absolute top-4 right-6 flex gap-2 font-mono text-[10px] font-black">
              {locales.map((l) => (
                <Link
                  key={l}
                  href={`/${l}/`}
                  className={`btn btn-xs btn-outline border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-primary/20 hover:text-black transition-colors ${lang === l ? 'bg-primary' : 'bg-base-100'}`}
                >
                  {l.toUpperCase()}
                </Link>
              ))}
            </div>

            {/* Top Badge Structure */}
            <div className="flex flex-col items-center mb-4">
              <div className="badge border-[2px] border-black px-2 md:px-5 py-3 h-auto bg-base-100 mb-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-none">
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
              <h1 className="text-black w-full mb-4 font-body font-black text-2xl md:text-5xl uppercase tracking-tighter leading-tight">
                {t.metadata.title}
              </h1>


              {/* Lead Paragraph */}
              <div className="max-w-3xl mx-auto mb-12">
                <p className="text-sm md:text-xl text-[#000000] leading-snug italic font-serif font-bold px-4">
                  {t.header.lead}
                </p>
              </div>
            </div>
          </div>

          {/* Main Article Content */}
          <InvestigativeArticle lang={lang as any} />

        </div>
      </main>
    </>
  );
}
