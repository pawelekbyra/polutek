"use client";

import React from 'react';
import { Newspaper, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const news = [
  {
    date: "27 Lut 2025",
    title: "DeepSeek-V3 bije rekordy popularności w Polsce",
    desc: "Nowy model z Chin staje się głównym wyborem dla deweloperów szukających oszczędności przy zachowaniu logiki Claude 3.5.",
    cat: "Modele"
  },
  {
    date: "26 Lut 2025",
    title: "Cursor wprowadza natywne wsparcie dla Agentic Workflows",
    desc: "Najnowsza aktualizacja edytora pozwala agentom AI na samodzielne uruchamianie testów i naprawę błędów bez promptu.",
    cat: "Narzędzia"
  },
  {
    date: "25 Lut 2025",
    title: "Andrej Karpathy ogłasza kurs 'Vibe Coding Mastery'",
    desc: "Były szef AI w Tesli zapowiada program edukacyjny skupiony wyłącznie na programowaniu intencyjnym.",
    cat: "Edukacja"
  }
];

export default function VibeNewsroom() {
  return (
    <div className="max-w-6xl mx-auto py-20 px-4">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-4xl font-black text-slate-900 flex items-center gap-3">
          <Newspaper className="w-10 h-10 text-blue-600" /> Vibe Newsroom
        </h2>
        <div className="hidden md:flex gap-2">
           <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1 uppercase tracking-widest animate-pulse">
             <TrendingUp className="w-3 h-3" /> Live Updates
           </span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {news.map((item, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
             <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold text-slate-400">{item.date}</span>
                <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{item.cat}</span>
             </div>
             <h3 className="text-xl font-bold mb-4 group-hover:text-blue-600 transition-colors">{item.title}</h3>
             <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3">{item.desc}</p>
             <button className="flex items-center gap-2 text-blue-600 font-bold text-xs group-hover:gap-3 transition-all uppercase tracking-widest">
               Czytaj newsa <ArrowRight className="w-4 h-4" />
             </button>
          </div>
        ))}
      </div>
    </div>
  );
}
