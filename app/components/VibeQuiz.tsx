"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronRight, RotateCcw, Brain, Rocket, ShieldCheck } from 'lucide-react';

const questions = [
  {
    q: "Jakie jest Twoje główne podejście do pisania kodu?",
    options: [
      { t: "Piszę każdą linię ręcznie, aby mieć pełną kontrolę.", score: 0 },
      { t: "Używam autouzupełniania Copilota dla standardowych funkcji.", score: 1 },
      { t: "Opisuję intencję modułu i pozwalam AI wygenerować strukturę.", score: 2 }
    ]
  },
  {
    q: "Jak zarządzasz kontekstem w edytorze?",
    options: [
      { t: "Wklejam fragmenty kodu do chatu w przeglądarce.", score: 0 },
      { t: "Otwieram odpowiednie pliki, by Copilot je 'widział'.", score: 1 },
      { t: "Używam symboli @ i plików .cursorrules dla spójności.", score: 2 }
    ]
  },
  {
    q: "Co robisz, gdy AI wygeneruje kod z błędem?",
    options: [
      { t: "Poprawiam błąd ręcznie, tracąc zaufanie do AI.", score: 0 },
      { t: "Próbuję napisać inny prompt od zera.", score: 1 },
      { t: "Wklejam błąd do chatu i proszę o iteracyjną poprawkę.", score: 2 }
    ]
  }
];

export default function VibeQuiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleOption = (s: number) => {
    setScore(score + s);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  const reset = () => {
    setCurrent(0);
    setScore(0);
    setFinished(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <div className="bg-white rounded-[3rem] p-8 md:p-16 border border-slate-200 shadow-2xl overflow-hidden relative">
        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.div
              key="q"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center gap-3 mb-8">
                 <div className="bg-blue-600 p-2 rounded-lg text-white font-bold text-xs">Pytanie {current + 1}/{questions.length}</div>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-12 tracking-tight">
                {questions[current].q}
              </h2>
              <div className="space-y-4">
                 {questions[current].options.map((opt, i) => (
                   <button
                     key={i}
                     onClick={() => handleOption(opt.score)}
                     className="w-full text-left p-6 bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 rounded-2xl transition-all flex items-center justify-between group"
                   >
                      <span className="font-bold text-slate-700 group-hover:text-blue-700">{opt.t}</span>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                   </button>
                 ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                 <Rocket className="w-10 h-10" />
              </div>
              <h2 className="text-4xl font-black mb-4">Twój Vibe Score: {Math.round((score / (questions.length * 2)) * 100)}%</h2>
              <p className="text-xl text-slate-500 mb-12">
                 {score >= 5 ? "Jesteś Vibe Masterem! Twoja produktywność z AI jest na poziomie 10x developera." : "Jesteś na dobrej drodze, ale nadal polegasz na starych nawykach. Sprawdź naszą roadmapę."}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-12">
                 <div className="p-6 bg-slate-50 rounded-2xl text-left border border-slate-100">
                    <h4 className="font-bold mb-2 flex items-center gap-2"><Brain className="w-4 h-4 text-blue-600" /> Co robić dalej?</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">Zaimplementuj plik .cursorrules w swoim projekcie, aby ujednolicić vibe asystenta.</p>
                 </div>
                 <div className="p-6 bg-slate-50 rounded-2xl text-left border border-slate-100">
                    <h4 className="font-bold mb-2 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-600" /> Następny poziom</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">Zacznij delegować całe zadania przez Composer (Cmd+I) zamiast prosić o pojedyncze linie.</p>
                 </div>
              </div>

              <button
                onClick={reset}
                className="flex items-center gap-2 mx-auto text-slate-400 font-bold hover:text-blue-600 transition-colors"
              >
                <RotateCcw className="w-4 h-4" /> Spróbuj jeszcze raz
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
