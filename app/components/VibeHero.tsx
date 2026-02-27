"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Wand2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function VibeHero() {
  return (
    <section className="pt-20 pb-32 px-4 overflow-hidden relative">
      <div className="absolute top-20 right-[-10%] w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 z-0"></div>
      <div className="absolute bottom-0 left-[-5%] w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-50 z-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-xs font-bold uppercase tracking-wider mb-8">
          <Wand2 className="w-3 h-3" /> Era Programowania Intencyjnego
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
          Vibe Coding: Programuj <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Szybkością Myśli</span>
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Zapomnij o mozolnym klepaniu kodu. Witamy w świecie, gdzie Twoim głównym narzędziem jest język naturalny, a AI zajmuje się implementacją.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/co-to-jest-vibe-coding"
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 group"
          >
            Zacznij tutaj <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
             href="/praca"
             className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center"
          >
            Praca w AI
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
