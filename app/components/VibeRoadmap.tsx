"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, ArrowRight, Star } from 'lucide-react';

const steps = [
  {
    title: "Etap 1: Świadomość Intencji",
    desc: "Przestań myśleć o pętlach i typach. Zacznij myśleć o logice biznesowej i user flow.",
    items: ["Zrozumienie manifestu Karpathy'ego", "Instalacja Cursora", "Pierwszy prompt w Composerze"]
  },
  {
    title: "Etap 2: Zarządzanie Kontekstem",
    desc: "Opanowanie symboli @ i budowanie świadomości modelu o Twoim repozytorium.",
    items: ["Używanie @Files i @Codebase", "Tworzenie .cursorrules", "Iteracyjne debugowanie z modelem"]
  },
  {
    title: "Etap 3: Agentic Mastery",
    desc: "Delegowanie całych modułów do agentów autonomicznych.",
    items: ["Workflow z Windsurf i Replit Agent", "Automatyczne testy bezpieczeństwa", "Deploy w 5 minut (Vercel/Bolt)"]
  },
  {
    title: "Etap 4: Vibe Architect",
    desc: "Zarządzanie wieloma agentami i orkiestracja złożonych systemów.",
    items: ["Projektowanie architektury pod AI", "Zarządzanie długiem technicznym AI", "Skalowanie zespołów Vibe"]
  }
];

export default function VibeRoadmap() {
  return (
    <div className="py-20 max-w-5xl mx-auto px-4">
      <h2 className="text-4xl font-black mb-16 text-center text-slate-900">
        Twoja Ścieżka do <span className="text-blue-600">Vibe Mastera</span>
      </h2>

      <div className="relative">
        {/* Connection Line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-slate-100 hidden md:block" />

        <div className="space-y-16">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative flex flex-col md:flex-row gap-8 items-start"
            >
              {/* Step Number Badge */}
              <div className="absolute left-0 md:left-8 -translate-x-1/2 w-16 h-16 rounded-full bg-white border-4 border-blue-600 flex items-center justify-center z-10 shadow-xl">
                 <span className="text-xl font-black text-blue-600">{idx + 1}</span>
              </div>

              <div className="md:ml-24 flex-grow bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                   <h3 className="text-2xl font-bold text-slate-900">{step.title}</h3>
                   {idx === 3 && <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />}
                </div>
                <p className="text-slate-600 mb-8 text-lg">{step.desc}</p>

                <div className="grid sm:grid-cols-2 gap-4">
                   {step.items.map((item, i) => (
                     <div key={i} className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                       <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {item}
                     </div>
                   ))}
                </div>

                <button className="mt-8 flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all">
                  Rozpocznij ten etap <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
