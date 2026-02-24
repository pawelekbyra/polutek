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
    <div className="min-h-screen bg-white font-serif text-stone-900">
      {/* Header */}
      <header className="bg-[#09090b] text-white py-6 px-8 shadow-2xl relative z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="font-black tracking-tighter text-2xl uppercase">POLUTEK NEWS</span>
            <div className="w-1 h-6 bg-violet-600 rounded-full mx-2" />
            <span className="text-gray-400 text-xs font-sans font-black uppercase tracking-[0.2em] hidden sm:inline">OS Intelligence</span>
          </div>
          <div className="text-[10px] font-black font-sans uppercase tracking-widest text-gray-500">
            {new Date().toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">

        {/* Hero Section */}
        <section className="mb-20 group cursor-pointer" onClick={() => onUnlock(heroArticle.id)}>
          <div className="relative h-[500px] md:h-[650px] w-full overflow-hidden rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] border border-gray-100">
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
          <div className="flex items-center gap-6 mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900">Archiwum Śledztw</h2>
            <div className="flex-1 h-1.5 bg-gray-50 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {otherArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] transition-all duration-500 cursor-pointer group flex flex-col h-full overflow-hidden border border-gray-50 active:scale-[0.98]"
                onClick={() => onUnlock(article.id)}
              >
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6 bg-violet-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                    {article.category}
                  </div>
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <h3 className="text-2xl font-black text-gray-900 mb-4 leading-tight tracking-tight group-hover:text-violet-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-500 font-medium text-base leading-relaxed mb-8 flex-grow line-clamp-4">
                    {article.excerpt}
                  </p>
                  <div className="pt-6 border-t border-gray-50 flex justify-between items-center mt-auto">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-violet-600 rounded-full" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Perfect Intel</span>
                    </div>
                    <span className="text-violet-600 font-sans text-xs font-black uppercase tracking-widest flex items-center group-hover:translate-x-1 transition-transform">
                      Czytaj <ChevronRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

      </main>

      <footer className="bg-[#09090b] text-gray-500 py-20 px-8 mt-20 font-sans text-sm text-center">
        <p>&copy; {new Date().getFullYear()} Wiadomości Śledcze. Wszelkie prawa zastrzeżone.</p>
        <p className="mt-2 text-xs text-stone-600 font-mono">Zasoby niezależne (IPFS/Web3)</p>
      </footer>
    </div>
  );
}
