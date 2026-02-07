"use client";

import React from 'react';
import Link from 'next/link';
import { ARTICLES } from '@/lib/data';
import { ChevronRight, Search, FileText, Newspaper } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-serif selection:bg-amber-100 selection:text-amber-900">
      {/* Top Header/Masthead */}
      <header className="border-b-4 border-double border-stone-900 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none mb-2">
              Wiadomości
            </h1>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-stone-500 font-bold">
              Dziennikarstwo Śledcze // Archiwum Niezależne
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2 border-t md:border-t-0 md:border-l border-stone-300 pt-4 md:pt-0 md:pl-8">
            <div className="text-xs font-mono font-bold uppercase tracking-widest bg-amber-700 text-stone-50 px-3 py-1">
              Top Secret
            </div>
            <div className="text-[10px] font-mono text-stone-400">
              {new Date().toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* NewsFeed Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[800px]">

          {/* Main Hero Card (2x2) */}
          <Link
            href={`/artykuly/${ARTICLES[0].slug}`}
            className="md:col-span-2 md:row-span-2 group relative overflow-hidden bg-white border-2 border-stone-900 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] hover:shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] transition-all flex flex-col"
          >
            <div className="relative h-full overflow-hidden">
              <img
                src={ARTICLES[0].image}
                alt={ARTICLES[0].title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-transparent transition-colors" />
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-amber-700 text-stone-50 text-[10px] font-mono font-bold px-2 py-1 uppercase tracking-widest">
                  {ARTICLES[0].category}
                </span>
              </div>
            </div>
            <div className="p-8 bg-white relative">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4 group-hover:text-amber-800 transition-colors">
                {ARTICLES[0].title}
              </h2>
              <p className="text-stone-600 text-lg leading-relaxed mb-6 line-clamp-3">
                {ARTICLES[0].excerpt}
              </p>
              <div className="flex items-center text-stone-900 font-bold uppercase text-xs tracking-widest">
                Czytaj Pełne Akta <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Secondary Card (2x1) */}
          <Link
            href={`/artykuly/${ARTICLES[1].slug}`}
            className="md:col-span-2 md:row-span-1 group relative overflow-hidden bg-white border-2 border-stone-900 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] hover:shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] transition-all flex flex-col md:flex-row"
          >
            <div className="w-full md:w-1/2 overflow-hidden relative border-b-2 md:border-b-0 md:border-r-2 border-stone-900">
              <img
                src={ARTICLES[1].image}
                alt={ARTICLES[1].title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-stone-900 text-stone-50 text-[10px] font-mono font-bold px-2 py-1 uppercase tracking-widest">
                  {ARTICLES[1].category}
                </span>
              </div>
            </div>
            <div className="p-6 md:w-1/2 flex flex-col justify-center">
              <h3 className="text-xl font-bold leading-tight mb-3 group-hover:text-amber-800 transition-colors">
                {ARTICLES[1].title}
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed mb-4 line-clamp-2">
                {ARTICLES[1].excerpt}
              </p>
              <div className="flex items-center text-stone-900 font-bold uppercase text-[10px] tracking-widest">
                Szczegóły <ChevronRight size={14} className="ml-1" />
              </div>
            </div>
          </Link>

          {/* Tertiary Card (2x1) */}
          <Link
            href={`/artykuly/${ARTICLES[2].slug}`}
            className="md:col-span-2 md:row-span-1 group relative overflow-hidden bg-white border-2 border-stone-900 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] hover:shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] transition-all flex flex-col md:flex-row-reverse"
          >
             <div className="w-full md:w-1/2 overflow-hidden relative border-b-2 md:border-b-0 md:border-l-2 border-stone-900">
              <img
                src={ARTICLES[2].image}
                alt={ARTICLES[2].title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-stone-900 text-stone-50 text-[10px] font-mono font-bold px-2 py-1 uppercase tracking-widest">
                  {ARTICLES[2].category}
                </span>
              </div>
            </div>
            <div className="p-6 md:w-1/2 flex flex-col justify-center">
              <h3 className="text-xl font-bold leading-tight mb-3 group-hover:text-amber-800 transition-colors">
                {ARTICLES[2].title}
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed mb-4 line-clamp-2">
                {ARTICLES[2].excerpt}
              </p>
              <div className="flex items-center text-stone-900 font-bold uppercase text-[10px] tracking-widest">
                Szczegóły <ChevronRight size={14} className="ml-1" />
              </div>
            </div>
          </Link>

        </div>

        {/* Investigative Tools / Footer Info */}
        <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 border-t-2 border-stone-300 pt-12">
          <div className="flex flex-col items-center text-center p-6 border border-stone-200 bg-stone-100/50 rounded-sm">
            <Search className="w-8 h-8 text-stone-400 mb-4" />
            <h4 className="font-bold uppercase tracking-widest text-sm mb-2">Weryfikacja</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Każdy artykuł oparty jest na jawnych aktach sądowych i dokumentacji urzędowej dostępnej w publicznych rejestrach.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 border border-stone-200 bg-stone-100/50 rounded-sm">
            <FileText className="w-8 h-8 text-stone-400 mb-4" />
            <h4 className="font-bold uppercase tracking-widest text-sm mb-2">Transparentność</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Publikujemy sygnatury akt, aby umożliwić niezależne sprawdzenie faktów przez każdego czytelnika.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 border border-stone-200 bg-stone-100/50 rounded-sm">
            <Newspaper className="w-8 h-8 text-stone-400 mb-4" />
            <h4 className="font-bold uppercase tracking-widest text-sm mb-2">Niezależność</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Projekt finansowany z prywatnych środków, odporny na cenzurę dzięki technologii Web3 i IPFS.
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-stone-900 text-stone-400 py-12 px-6 font-mono text-center">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] mb-4">Wiadomości Śledcze // 2024-2026</p>
          <div className="flex justify-center gap-6 text-[10px] mb-8">
            <span className="hover:text-stone-50 cursor-pointer">POLITYKA PRYWATNOŚCI</span>
            <span className="hover:text-stone-50 cursor-pointer">REDAKCJA</span>
            <span className="hover:text-stone-50 cursor-pointer">KONTAKT SECURE</span>
          </div>
          <p className="text-[9px] opacity-30">
            SYSTEM IDENTYFIKACJI: 0x71C941...A2B4 // ARCHIWUM ZASZYFROWANE
          </p>
        </div>
      </footer>
    </div>
  );
}
