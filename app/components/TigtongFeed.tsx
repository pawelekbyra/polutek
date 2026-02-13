"use client";

import React, { useRef, useState } from 'react';
import { ChevronDown, Share2, Heart, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
}

const ARTICLES: Article[] = [
  {
    id: 'elixir',
    title: "Eliksir Wiedźmina. Mroczna tajemnica twórców CD Projekt",
    excerpt: "Ayahuasca, policyjne naloty i tragedia, o której nikt się miał nie dowiedzieć. W cieniu głośnego procesu dziennikarskie śledztwo ujawnia, jak twórcy gry 'Wiedźmin' finansowali szamańskie podziemie.",
    image: "https://images.unsplash.com/photo-1550565118-3a14e8d0386f?auto=format&fit=crop&q=80&w=1200",
    category: "ŚLEDZTWO",
    author: "Paweł Perfect"
  },
  {
    id: 'stypulkowska',
    title: "PROKURATOR PONAD PRAWEM. Jak szefowa jednostki fabrykowała proces",
    excerpt: "Antydatowane pisma, ukrywane dowody niewinności i forsowanie więzienia dla człowieka, którego sądy uznały za niepoczytalnego. Ujawniamy kulisy sprawy, która właśnie runęła w Sądzie Okręgowym w Świdnicy.",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800",
    category: "WYMIAR SPRAWIEDLIWOŚCI",
    author: "Paweł Perfect"
  },
  {
    id: 'chmurka',
    title: "OGRABIONY ZE SPADKU I SKAZANY ZA UPOMINANIE SIĘ O PRAWDĘ",
    excerpt: "Zginęły dokumenty i testament. Kiedy Paweł Perfect zgłosił kradzież, prokuratura umorzyła sprawę. Kiedy zaczął domagać się zwrotu, system zrobił z niego stalkera. Dziś składa wniosek o wznowienie śledztwa.",
    image: "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?auto=format&fit=crop&q=80&w=800",
    category: "INTERWENCJA",
    author: "Paweł Perfect"
  }
];

export default function TigtongFeed() {
  const router = useRouter();
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleReadMore = (id: string) => {
    // Navigate to home with query param if implemented, or just force unlock via password for now.
    // Since we don't have query param logic on home yet, we'll just go to home.
    // Ideally we would pass state, but for static export simplicity:
    router.push('/');
  };

  return (
    <div className="h-screen w-full bg-black text-white overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar">
      {ARTICLES.map((article) => (
        <div
          key={article.id}
          className="h-screen w-full snap-start relative flex items-center justify-center bg-stone-900"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
             <img
               src={article.image}
               alt={article.title}
               className="w-full h-full object-cover opacity-60"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
          </div>

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-10 pb-24 md:pb-12 flex flex-col items-start gap-4 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 uppercase tracking-wider rounded-sm">
                {article.category}
              </span>
              <span className="text-xs text-stone-300 font-mono">
                {new Date().toLocaleDateString('pl-PL')}
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-bold leading-tight drop-shadow-md">
              {article.title}
            </h1>

            <p className="text-stone-200 text-sm md:text-base line-clamp-3 drop-shadow-sm font-light leading-relaxed">
              {article.excerpt}
            </p>

            <div className="flex items-center gap-3 mt-2">
               <div className="w-8 h-8 rounded-full bg-stone-700 overflow-hidden border border-stone-500">
                 {/* Placeholder Avatar */}
                 <div className="w-full h-full bg-stone-600 flex items-center justify-center text-xs">PP</div>
               </div>
               <span className="text-sm font-bold text-stone-300">@{article.author.replace(' ', '').toLowerCase()}</span>
            </div>
          </div>

          {/* Right Sidebar Actions */}
          <div className="absolute right-4 bottom-24 flex flex-col gap-6 items-center z-20">
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={(e) => toggleLike(article.id, e)}
                className={`p-3 rounded-full bg-black/40 backdrop-blur-sm transition-transform active:scale-90 ${liked[article.id] ? 'text-red-500' : 'text-white'}`}
              >
                <Heart className={`w-8 h-8 ${liked[article.id] ? 'fill-current' : ''}`} />
              </button>
              <span className="text-xs font-bold drop-shadow-md">{liked[article.id] ? '1.2k' : '1.2k'}</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <button className="p-3 rounded-full bg-black/40 backdrop-blur-sm text-white transition-transform active:scale-90 hover:bg-black/60">
                <MessageCircle className="w-8 h-8" />
              </button>
              <span className="text-xs font-bold drop-shadow-md">342</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <button className="p-3 rounded-full bg-black/40 backdrop-blur-sm text-white transition-transform active:scale-90 hover:bg-black/60">
                <Share2 className="w-8 h-8" />
              </button>
              <span className="text-xs font-bold drop-shadow-md">Udostępnij</span>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce text-white/50 z-20">
            <ChevronDown className="w-6 h-6" />
          </div>

          {/* Click Area to Read More (invisible overlay or just bottom part) */}
          <div
            className="absolute inset-0 z-0 cursor-pointer"
            onClick={() => handleReadMore(article.id)}
            title="Kliknij, aby przeczytać artykuł"
          />
        </div>
      ))}
    </div>
  );
}
