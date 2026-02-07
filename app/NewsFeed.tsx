"use client";

import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
}

const ARTICLES: Article[] = [
  {
    id: 'elixir',
    title: "Eliksir Wiedźmina. Mroczna tajemnica twórców CD Projekt",
    excerpt: "Ayahuasca, policyjne naloty i tragedia, o której nikt się miał nie dowiedzieć. W cieniu głośnego procesu dziennikarskie śledztwo ujawnia, jak twórcy gry 'Wiedźmin' finansowali szamańskie podziemie.",
    image: "https://images.unsplash.com/photo-1550565118-3a14e8d0386f?auto=format&fit=crop&q=80&w=1200",
    category: "ŚLEDZTWO"
  },
  {
    id: 'stypulkowska',
    title: "PROKURATOR PONAD PRAWEM. Jak szefowa jednostki fabrykowała proces",
    excerpt: "Antydatowane pisma, ukrywane dowody niewinności i forsowanie więzienia dla człowieka, którego sądy uznały za niepoczytalnego. Ujawniamy kulisy sprawy, która właśnie runęła w Sądzie Okręgowym w Świdnicy.",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800",
    category: "WYMIAR SPRAWIEDLIWOŚCI"
  },
  {
    id: 'chmurka',
    title: "OGRABIONY ZE SPADKU I SKAZANY ZA UPOMINANIE SIĘ O PRAWDĘ",
    excerpt: "Zginęły dokumenty i testament. Kiedy Paweł Perfect zgłosił kradzież, prokuratura umorzyła sprawę. Kiedy zaczął domagać się zwrotu, system zrobił z niego stalkera. Dziś składa wniosek o wznowienie śledztwa.",
    image: "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?auto=format&fit=crop&q=80&w=800",
    category: "INTERWENCJA"
  }
];

interface NewsFeedProps {
  onUnlock: (articleId: string) => void;
}

export default function NewsFeed({ onUnlock }: NewsFeedProps) {
  const [heroArticle, ...otherArticles] = ARTICLES;

  return (
    <div className="min-h-screen bg-stone-100 font-serif text-stone-900">
      {/* Header */}
      <header className="bg-stone-900 text-stone-50 py-4 px-6 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-widest text-lg uppercase">Wiadomości</span>
            <span className="text-stone-500 text-sm">|</span>
            <span className="text-stone-400 text-sm font-sans uppercase tracking-wider">Dziennikarstwo Śledcze</span>
          </div>
          <div className="text-xs font-mono text-stone-500">
            {new Date().toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">

        {/* Hero Section */}
        <section className="mb-16 group cursor-pointer" onClick={() => onUnlock(heroArticle.id)}>
          <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-sm shadow-xl">
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors z-10" />
            <img
              src={heroArticle.image}
              alt={heroArticle.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-20 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
              <span className="inline-block px-2 py-1 bg-yellow-500 text-stone-900 text-xs font-bold uppercase tracking-widest mb-3">
                {heroArticle.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-sm">
                {heroArticle.title}
              </h1>
              <p className="text-stone-200 text-lg md:text-xl max-w-3xl leading-relaxed drop-shadow-sm line-clamp-3 md:line-clamp-none">
                {heroArticle.excerpt}
              </p>
              <div className="mt-6 flex items-center text-yellow-400 font-sans text-sm font-bold uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                Czytaj dalej <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </div>
        </section>

        {/* Grid Section */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold uppercase tracking-wide border-b-2 border-stone-900 pb-1">Pozostałe Artykuły</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-sm shadow-sm hover:shadow-md transition-shadow cursor-pointer group flex flex-col h-full overflow-hidden"
                onClick={() => onUnlock(article.id)}
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-0 left-0 bg-stone-900/80 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                    {article.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-stone-900 mb-3 leading-snug group-hover:text-blue-900 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed mb-4 flex-grow line-clamp-4">
                    {article.excerpt}
                  </p>
                  <div className="pt-4 border-t border-stone-100 flex justify-between items-center mt-auto">
                    <span className="text-xs font-mono text-stone-400">Autor: Paweł Perfect</span>
                    <span className="text-blue-900 font-sans text-xs font-bold uppercase flex items-center group-hover:underline decoration-blue-300 decoration-2 underline-offset-4">
                      Więcej <ChevronRight className="w-3 h-3 ml-1" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

      </main>

      <footer className="bg-stone-900 text-stone-400 py-8 px-6 mt-12 font-sans text-sm text-center">
        <p>&copy; {new Date().getFullYear()} Wiadomości Śledcze. Wszelkie prawa zastrzeżone.</p>
        <p className="mt-2 text-xs text-stone-600 font-mono">Zasoby niezależne (IPFS/Web3)</p>
      </footer>
    </div>
  );
}
