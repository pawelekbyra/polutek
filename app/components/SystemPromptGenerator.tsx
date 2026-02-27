"use client";

import React, { useState } from 'react';
import { Terminal, Copy, Check, Wand2, Sparkles, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SystemPromptGenerator() {
  const [stack, setStack] = useState('Next.js, Tailwind, TypeScript');
  const [style, setStyle] = useState('Zwięzły i modularny');
  const [copied, setCopied] = useState(false);

  const generated = `Jesteś ekspertem od ${stack}.
Twój styl pisania kodu to: ${style}.
Zawsze używaj komponentów funkcyjnych i Atomic Design.
Pisz komentarze w języku polskim.
Zanim napiszesz logikę, zaplanuj zmiany w punktach.
Nie twórz osobnych plików CSS, używaj wyłącznie Tailwind.
Jeśli plik przekracza 200 linii, zaproponuj refaktoryzację.`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto my-20 bg-slate-900 rounded-[3rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

      <div className="grid md:grid-cols-2 gap-12 relative z-10">
        <div>
           <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-600 p-2 rounded-lg"><Wand2 className="w-6 h-6 text-white" /></div>
              <h2 className="text-3xl font-black tracking-tight">Generator .cursorrules</h2>
           </div>
           <p className="text-slate-400 mb-8 leading-relaxed">Skonfiguruj systemowy &quot;vibe&quot; swojego projektu. Wklej wynik do pliku <code>.cursorrules</code> w głównym folderze projektu.</p>

           <div className="space-y-6">
              <div>
                 <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Główny Stack Technologiczny</label>
                 <input
                   type="text"
                   value={stack}
                   onChange={(e) => setStack(e.target.value)}
                   className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                 />
              </div>
              <div>
                 <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Preferowany Styl Kodu</label>
                 <select
                   value={style}
                   onChange={(e) => setStyle(e.target.value)}
                   className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all appearance-none"
                 >
                    <option>Zwięzły i modularny</option>
                    <option>Silnie typowany (Enterprise)</option>
                    <option>Prosty i czytelny dla juniorów</option>
                    <option>Z dużą ilością komentarzy</option>
                 </select>
              </div>
           </div>
        </div>

        <div className="relative group">
           <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
           <div className="relative bg-slate-950 rounded-2xl border border-slate-800 h-full flex flex-col">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
                 <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20" />
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">.cursorrules</span>
              </div>
              <div className="p-6 font-mono text-xs leading-relaxed text-blue-300 whitespace-pre-wrap flex-grow overflow-auto">
                 {generated}
              </div>
              <button
                onClick={copyToClipboard}
                className="m-4 flex items-center justify-center gap-2 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-blue-50 transition-colors"
              >
                {copied ? <><Check className="w-4 h-4" /> Skopiowano!</> : <><Copy className="w-4 h-4" /> Kopiuj reguły</>}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
