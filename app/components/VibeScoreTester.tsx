"use client";

import React, { useState } from 'react';
import { ShieldCheck, Target, Zap, AlertTriangle, Search, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VibeScoreTester() {
  const [content, setContent] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [analysis, setAnalysis] = useState<string[]>([]);

  const testVibe = () => {
    if (!content.trim()) return;

    let currentScore = 0;
    const tips: string[] = [];

    // Analyze Vibe Quality
    if (content.length > 50) { currentScore += 20; } else { tips.push("Podaj więcej kontekstu projektu."); }
    if (content.toLowerCase().includes('proszę') || content.toLowerCase().includes('zrób')) { currentScore += 10; }
    if (content.includes('@')) { currentScore += 30; tips.push("Świetnie! Używasz symboli kontekstu."); } else { tips.push("Brakuje symboli @ (np. @Codebase, @Files) - to obniża precyzję AI."); }
    if (content.toLowerCase().includes('użyj') && (content.toLowerCase().includes('shadcn') || content.toLowerCase().includes('tailwind'))) { currentScore += 20; tips.push("Precyzyjne wskazanie stacku technologicznego podbija wynik."); }
    if (content.toLowerCase().includes('testy') || content.toLowerCase().includes('bezpieczeństwo')) { currentScore += 20; tips.push("Myślenie o jakości i bezpieczeństwie to cecha seniora."); }

    setScore(Math.min(currentScore, 100));
    setAnalysis(tips);
  };

  return (
    <div className="max-w-4xl mx-auto my-20 p-8 md:p-12 bg-white rounded-[3rem] border border-slate-200 shadow-2xl overflow-hidden">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex-grow">
          <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
             <Activity className="w-8 h-8 text-indigo-600" /> Tester Vibe Score
          </h2>
          <p className="text-slate-500 mb-8">Wklej swój prompt lub opis projektu, aby sprawdzić, jak dobrze &quot;rozumie&quot; go AI i jak zoptymalizować go pod Vibe Coding.</p>

          <textarea
            className="w-full h-48 p-6 bg-slate-50 rounded-3xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 focus:outline-none transition-all text-slate-700 font-medium placeholder-slate-400 mb-6"
            placeholder="Np. Stwórz dashboard w React, użyj shadcn/ui i połącz go z @API.ts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            onClick={testVibe}
            className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" /> Analizuj Vibe
          </button>
        </div>

        <AnimatePresence>
          {score !== null && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="md:w-80 flex flex-col gap-6"
            >
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center relative overflow-hidden">
                 <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Twój Wynik</div>
                 <div className={`text-6xl font-black ${score > 70 ? 'text-emerald-500' : 'text-amber-500'}`}>{score}%</div>
                 <div className="mt-4 h-2 bg-slate-200 rounded-full">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      className={`h-full rounded-full ${score > 70 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                    />
                 </div>
              </div>

              <div className="space-y-4">
                 <h4 className="font-bold text-slate-900 flex items-center gap-2">
                   <Target className="w-4 h-4 text-blue-600" /> Analiza i rady:
                 </h4>
                 <div className="space-y-3">
                    {analysis.map((tip, i) => (
                      <div key={i} className="flex gap-3 text-xs font-medium text-slate-600 leading-relaxed">
                         {tip.includes('Brakuje') ? <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" /> : <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />}
                         {tip}
                      </div>
                    ))}
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
