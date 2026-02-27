"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Wand2, ArrowRight } from 'lucide-react';

export default function VibeComparisonToggle() {
  const [mode, setMode] = useState<'traditional' | 'vibe'>('vibe');

  return (
    <div className="max-w-4xl mx-auto my-32 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-black mb-6">Programowanie: Wczoraj vs Dzisiaj</h2>
        <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200">
           <button
             onClick={() => setMode('traditional')}
             className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${mode === 'traditional' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
           >
             <Terminal className="w-4 h-4" /> Tradycyjnie
           </button>
           <button
             onClick={() => setMode('vibe')}
             className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${mode === 'vibe' ? 'bg-blue-600 shadow-md text-white' : 'text-slate-500 hover:text-slate-700'}`}
           >
             <Wand2 className="w-4 h-4" /> Vibe Coding
           </button>
        </div>
      </div>

      <div className="relative bg-white rounded-[3rem] border border-slate-200 shadow-2xl overflow-hidden min-h-[400px]">
        <AnimatePresence mode="wait">
          {mode === 'traditional' ? (
            <motion.div
              key="traditional"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-12 grid md:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h3 className="text-3xl font-black mb-6 text-slate-900">Mozolna Implementacja</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold">✕</span>
                    <span className="text-slate-600">Pisanie składni linijka po linijce</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold">✕</span>
                    <span className="text-slate-600">Godziny spędzone na Stack Overflow</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold">✕</span>
                    <span className="text-slate-600">Walka z konfliktami wersji i typami</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold">✕</span>
                    <span className="text-slate-600">Debugowanie literówek przez pół nocy</span>
                  </li>
                </ul>
              </div>
              <div className="bg-slate-900 rounded-2xl p-6 font-mono text-sm text-blue-300 shadow-inner">
                <p className="opacity-50 mb-2">{`// 2 godziny później...`}</p>
                <p><span className="text-purple-400">function</span> <span className="text-yellow-400">handleSubmit</span>(e) &#123;</p>
                <p className="ml-4">e.<span className="text-yellow-400">preventDefault</span>();</p>
                <p className="ml-4"><span className="text-purple-400">const</span> formData = <span className="text-purple-400">new</span> <span className="text-emerald-400">FormData</span>(e.target);</p>
                <p className="ml-4 opacity-30">...</p>
                <p className="ml-4"><span className="text-blue-500">console</span>.<span className="text-yellow-400">log</span>(<span className="text-green-400">{`"Dlaczego to nie działa?"`}</span>);</p>
                <p>&#125;</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="vibe"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-12 grid md:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h3 className="text-3xl font-black mb-6 text-blue-600">Prędkość Myśli</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span className="text-slate-600">Opisywanie logiki językiem naturalnym</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span className="text-slate-600">AI zajmuje się nudną implementacją (boilerplate)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span className="text-slate-600">Automatyczne testy i poprawki</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span className="text-slate-600">Skupienie na User Experience i Biznesie</span>
                  </li>
                </ul>
              </div>
              <div className="bg-blue-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-white/20 group-hover:bg-white/40 transition-all duration-1000"></div>
                <p className="text-lg font-bold mb-4 flex items-center gap-2">
                   <Wand2 className="w-5 h-5" /> Twój Vibe:
                </p>
                <p className="text-xl font-medium leading-relaxed italic opacity-90">
                  {`"Dodaj walidację formularza, połącz go z API Stripe i wyślij maila z podziękowaniem do klienta."`}
                </p>
                <div className="mt-8 flex items-center gap-3 text-sm font-bold bg-white/10 p-3 rounded-lg">
                   <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                   AI: Zadanie wykonane w 12 sekund.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
