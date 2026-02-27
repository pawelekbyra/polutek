"use client";

import React, { useState } from 'react';
import { CheckCircle2, Circle, Trophy, Rocket, AlertCircle, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const checklistItems = [
  { id: 1, text: "Używasz Cursora lub Windsurfa jako głównego IDE", weight: 20 },
  { id: 2, text: "Twój projekt posiada poprawnie skonfigurowany plik .cursorrules", weight: 20 },
  { id: 3, text: "Dzielisz komponenty na małe, atomowe jednostki (max 100 linii)", weight: 15 },
  { id: 4, text: "Używasz @-symbols do podawania precyzyjnego kontekstu", weight: 15 },
  { id: 5, text: "Piszsz testy zanim pozwolisz AI napisać logikę (TDD)", weight: 10 },
  { id: 6, text: "Masz włączony linter i automatyczne sprawdzanie typów", weight: 10 },
  { id: 7, text: "Wiesz jak zdebugować kod, gdy AI wpadnie w pętlę błędów", weight: 10 },
];

export default function VibeChecklist() {
  const [checked, setChecked] = useState<number[]>([]);

  const toggle = (id: number) => {
    setChecked(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const score = checklistItems.reduce((acc, item) => {
    return acc + (checked.includes(item.id) ? item.weight : 0);
  }, 0);

  const getMessage = () => {
    if (score === 100) return "Legenda! Jesteś 10x Developerem nowej ery.";
    if (score >= 70) return "Świetnie! Płyniesz na fali Vibe Codingu.";
    if (score >= 40) return "Nieźle, ale AI mogłoby Ci pomagać znacznie bardziej.";
    return "Czas na naukę! Twoje workflow pochodzi z ubiegłej dekady.";
  };

  return (
    <div className="max-w-4xl mx-auto my-20 bg-white rounded-[3rem] p-8 md:p-16 border border-slate-200 shadow-2xl">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black mb-4 flex items-center justify-center gap-3">
          <ShieldCheck className="w-10 h-10 text-emerald-600" /> Vibe Readiness Checklist
        </h2>
        <p className="text-slate-500 text-lg">Sprawdź, czy Twój stack i nawyki są gotowe na pełną moc AI.</p>
      </div>

      <div className="grid md:grid-cols-5 gap-12 items-start">
        <div className="md:col-span-3 space-y-4">
          {checklistItems.map((item) => (
            <button
              key={item.id}
              onClick={() => toggle(item.id)}
              className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left ${
                checked.includes(item.id)
                ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-sm'
                : 'bg-slate-50 border-slate-100 text-slate-600 hover:border-slate-300'
              }`}
            >
              {checked.includes(item.id) ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              ) : (
                <Circle className="w-6 h-6 text-slate-300 shrink-0" />
              )}
              <span className="font-bold">{item.text}</span>
            </button>
          ))}
        </div>

        <div className="md:col-span-2 sticky top-24">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white text-center shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Trophy className="w-24 h-24" />
            </div>

            <div className="relative z-10">
              <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Vibe Readiness</div>
              <div className="text-7xl font-black mb-4">{score}%</div>

              <div className="h-3 bg-white/10 rounded-full mb-8 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-blue-500"
                />
              </div>

              <p className="font-bold text-lg leading-snug mb-0 min-h-[3rem]">
                {getMessage()}
              </p>
            </div>
          </div>

          <AnimatePresence>
            {score < 100 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-6 bg-blue-50 rounded-3xl border border-blue-100 flex gap-4 items-start"
              >
                <Rocket className="w-6 h-6 text-blue-600 shrink-0" />
                <p className="text-xs font-medium text-blue-900 leading-relaxed">
                  Brakuje Ci {100 - score} punktów do perfekcji. Sprawdź naszą <a href="/roadmap" className="underline font-black">Roadmapę 2025</a>, aby dowiedzieć się jak zoptymalizować swój workflow.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
