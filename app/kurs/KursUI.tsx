'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import {
  Zap,
  ArrowRight,
  Terminal,
  Code2,
  Database,
  Rocket,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Cpu,
  Globe,
  Layers,
  Fingerprint,
  Box,
  Activity,
  Command,
  LucideIcon
} from 'lucide-react';
import {
  SiSupabase,
  SiVercel
} from 'react-icons/si';

interface ProtocolStepProps {
  title: string;
  description: string;
  icon: LucideIcon;
  stepNumber: number;
  isOpen: boolean;
  onClick: () => void;
}

// Accordion Item Component
const ProtocolStep = ({ title, description, icon: Icon, stepNumber, isOpen, onClick }: ProtocolStepProps) => {
  return (
    <div className={`border-b border-white/10 transition-all ${isOpen ? 'bg-white/[0.02]' : ''}`}>
      <button
        onClick={onClick}
        className="w-full py-8 px-6 flex items-center justify-between group"
      >
        <div className="flex items-center gap-6 text-left">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 ${isOpen ? 'bg-green-500 border-green-400 text-black shadow-[0_0_20px_rgba(34,197,94,0.5)]' : 'bg-neutral-900 border-white/10 text-green-500 group-hover:border-green-500/50'}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-green-500/60 uppercase tracking-[0.3em]">Faza 0{stepNumber}</span>
            <h3 className="text-2xl font-bold text-white tracking-tight">{title}</h3>
          </div>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-10 pt-2 pl-24 text-gray-400 leading-relaxed max-w-2xl text-lg">
              {description}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function KursUI() {
  const [openStep, setOpenStep] = useState(1);
  const setCommentsModal = useStore((state) => state.setCommentsModal);
  const setTippingModal = useStore((state) => state.setTippingModal);

  const steps = [
    {
      title: "Zero Terminala",
      description: "Konfiguracja środowiska bez instalowania czegokolwiek. Cursor AI jako Twój główny inżynier.",
      icon: Terminal,
    },
    {
      title: "Złoty Prompt",
      description: "Jak rozmawiać z AI, żeby generowało gotowe moduły, a nie fragmenty tekstu.",
      icon: Command,
    },
    {
      title: "Skarbiec Danych (Supabase)",
      description: "Większość apek AI to wydmuszki. My nauczymy Cię dawać im pamięć. Twoja aplikacja będzie pamiętać użytkowników.",
      icon: Database,
    },
    {
      title: "Wielki Wybuch (Deploy)",
      description: "Publikacja na Vercel jednym kliknięciem. Własna domena w 15 minut.",
      icon: Rocket,
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-100 font-sans selection:bg-green-500 selection:text-black overflow-x-hidden">
      {/* Aesthetic Background - Cyberpunk Atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-green-900/10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/5 bg-black/40 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 font-black tracking-tighter text-2xl">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">POLUTEK</span>
            <span className="text-green-500/50 font-light text-sm ml-2 tracking-[0.3em]">ARCHITEKT_OS</span>
          </div>

          <div className="hidden md:flex items-center gap-10 text-[10px] font-mono text-gray-500 uppercase tracking-[0.4em]">
            <a href="#problem" className="hover:text-green-400 transition-colors flex items-center gap-2"><Activity className="w-3 h-3" /> Problem</a>
            <a href="#protokol" className="hover:text-green-400 transition-colors flex items-center gap-2"><Box className="w-3 h-3" /> Protokół</a>
            <a href="#stack" className="hover:text-green-400 transition-colors flex items-center gap-2"><Cpu className="w-3 h-3" /> Stack</a>
          </div>

          <button className="px-6 py-2.5 bg-neutral-900 border border-white/10 text-green-500 text-xs font-bold rounded-full hover:bg-green-500 hover:text-black transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] uppercase tracking-widest">
            Zaloguj się
          </button>
        </div>
      </nav>

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="pt-40 pb-32 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-green-500/20 bg-green-500/5 text-green-400 text-[10px] font-mono mb-10 uppercase tracking-[0.3em]"
          >
            <Fingerprint className="w-4 h-4 animate-pulse" /> STATUS: PROTOKÓŁ_AKTYWNY_2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-10"
          >
            Przestań pisać kod.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-purple-500 filter drop-shadow-[0_0_30px_rgba(34,197,94,0.3)]">
              Zacznij stawiać Systemy.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto mb-16 leading-relaxed font-light"
          >
            Oficjalny <span className="text-white font-medium">Protokół Architekta 2026</span>. Zmień się z rzemieślnika w Dyrektora AI. Buduj w tempie myśli.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button className="group w-full sm:w-auto px-12 py-6 bg-green-500 text-black font-black rounded-2xl hover:bg-green-400 transition-all hover:scale-105 shadow-[0_0_50px_rgba(34,197,94,0.6)] flex items-center justify-center gap-4 text-xl overflow-hidden relative">
              <span className="relative z-10">Rozpocznij Transformację (Dostęp 97 PLN)</span>
              <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </motion.div>
        </section>

        {/* THE PROBLEM */}
        <section id="problem" className="py-32 px-6 border-y border-white/5 bg-black/20">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div>
                <div className="text-purple-500 font-mono text-xs mb-4 tracking-[0.3em] uppercase underline decoration-purple-500/30 underline-offset-8">Analiza Krytyczna</div>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight text-white">Dlaczego tradycyjne kursy nie działają?</h2>
                <p className="text-xl text-gray-400 leading-relaxed mb-8">
                  Bo uczą Cię układania cegieł (składni), gdy Ty chcesz zaprojektować wieżowiec. W erze AI znajomość pętli <code className="text-green-400 font-mono bg-green-400/10 px-2 py-0.5 rounded">for</code> to przeszłość.
                </p>
                <p className="text-2xl text-white font-bold italic border-l-4 border-green-500 pl-6 py-2">
                  Liczy się Vibe Coding.
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-green-500/10 blur-[100px] rounded-full" />
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  {[Terminal, Database, Code2, Rocket].map((Icon, i) => (
                     <div key={i} className="aspect-square rounded-3xl border border-white/10 bg-neutral-900/50 backdrop-blur-xl flex items-center justify-center group hover:border-green-500/50 transition-colors duration-500">
                        <Icon className={`w-10 h-10 ${i % 2 === 0 ? 'text-green-500' : 'text-purple-500'} opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500`} />
                     </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THE SOLUTION (PROTOCOL) */}
        <section id="protokol" className="py-32 px-6 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-green-500/50 to-transparent" />

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">4-ETAPOWY PROTOKÓŁ</h2>
              <p className="text-gray-500 font-mono uppercase tracking-[0.2em]">Od zera do wdrożonego systemu w jeden weekend.</p>
            </div>

            <div className="border border-white/10 rounded-[2.5rem] bg-black/40 backdrop-blur-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)]">
              {steps.map((step, idx) => (
                <ProtocolStep
                  key={idx}
                  stepNumber={idx + 1}
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                  isOpen={openStep === idx + 1}
                  onClick={() => setOpenStep(openStep === idx + 1 ? 0 : idx + 1)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* TECH STACK */}
        <section id="stack" className="py-32 px-6 bg-white/[0.01] border-y border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div className="flex flex-wrap gap-20 p-20 rotate-12 scale-150">
               {Array.from({ length: 20 }).map((_, i) => (
                 <Command key={i} className="w-20 h-20" />
               ))}
            </div>
          </div>

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <h2 className="text-xs font-mono text-green-500/50 uppercase tracking-[0.5em] mb-16">ARSENAŁ ARCHITEKTA</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-12 items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-1000">
               <div className="flex flex-col items-center gap-4 group">
                  <div className="p-6 rounded-2xl border border-white/5 bg-neutral-900 group-hover:border-green-500/30 transition-colors">
                    <Terminal className="w-10 h-10" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest">Cursor</span>
               </div>
               <div className="flex flex-col items-center gap-4 group">
                  <div className="p-6 rounded-2xl border border-white/5 bg-neutral-900 group-hover:border-green-500/30 transition-colors">
                    <Zap className="w-10 h-10 text-yellow-500" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest">Bolt</span>
               </div>
               <div className="flex flex-col items-center gap-4 group">
                  <div className="p-6 rounded-2xl border border-white/5 bg-neutral-900 group-hover:border-green-500/30 transition-colors">
                    <Layers className="w-10 h-10 text-purple-500" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest">Lovable</span>
               </div>
               <div className="flex flex-col items-center gap-4 group">
                  <div className="p-6 rounded-2xl border border-white/5 bg-neutral-900 group-hover:border-green-500/30 transition-colors">
                    <SiSupabase className="w-10 h-10 text-emerald-500" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest">Supabase</span>
               </div>
               <div className="flex flex-col items-center gap-4 group">
                  <div className="p-6 rounded-2xl border border-white/5 bg-neutral-900 group-hover:border-green-500/30 transition-colors">
                    <SiVercel className="w-10 h-10" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest">Vercel</span>
               </div>
            </div>
          </div>
        </section>

        {/* ABOUT AUTHOR */}
        <section className="py-40 px-6 relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.8 }}
              className="w-24 h-24 bg-gradient-to-tr from-green-500 via-emerald-400 to-purple-600 rounded-3xl mx-auto mb-12 p-[2px] shadow-[0_0_40px_rgba(34,197,94,0.3)]"
            >
               <div className="w-full h-full bg-neutral-950 rounded-[22px] flex items-center justify-center">
                  <Fingerprint className="w-10 h-10 text-white" />
               </div>
            </motion.div>
            <h2 className="text-xs font-mono text-gray-500 uppercase tracking-[0.4em] mb-6">Mastermind behind</h2>
            <p className="text-3xl md:text-4xl text-white font-black tracking-tight mb-8">
              &quot;Stworzone przez praktyka, który buduje, a nie tylko uczy. Projekt Polutek.&quot;
            </p>
            <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full border border-white/5 bg-white/5 text-gray-400 text-sm font-mono">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Encrypted Identity verified
            </div>
          </div>
        </section>

        {/* COMMUNITY & FEEDBACK (Global Components Showcase) */}
        <section className="py-32 px-6 bg-green-500/5 border-y border-green-500/10">
          <div className="max-w-4xl mx-auto text-center">
             <h2 className="text-3xl font-black mb-8">DOŁĄCZ DO DYSKUSJI</h2>
             <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
               Masz pytania dotyczące Protokołu? Chcesz podzielić się swoimi postępami? Skorzystaj z naszych globalnych modułów komunikacji.
             </p>
             <div className="flex flex-wrap justify-center gap-6">
                <button
                  onClick={() => setCommentsModal(true, 'ai-course-landing')}
                  className="px-8 py-4 bg-neutral-900 border border-white/10 rounded-xl hover:border-green-500/50 transition-all flex items-center gap-3 group"
                >
                  <Box className="w-5 h-5 text-green-500" />
                  <span>Otwórz Komentarze</span>
                </button>
                <button
                  onClick={() => setTippingModal(true, 'ai-course-landing')}
                  className="px-8 py-4 bg-neutral-900 border border-white/10 rounded-xl hover:border-green-500/50 transition-all flex items-center gap-3 group"
                >
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  <span>Wesprzyj Projekt</span>
                </button>
             </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-16 border-t border-white/5 bg-black/80 backdrop-blur-xl relative z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-gray-500 text-[10px] font-mono tracking-[0.2em] uppercase">
          <div className="flex items-center gap-4">
            <span className="text-white font-bold tracking-tighter text-lg">POLUTEK</span>
            <span className="opacity-30">/</span>
            <span>&copy; 2026 ARCHITEKT_OS</span>
          </div>
          <div className="flex items-center gap-10">
             <div className="flex items-center gap-2 hover:text-green-400 transition-colors cursor-pointer"><Globe className="w-4 h-4" /> Network</div>
             <div className="flex items-center gap-2 hover:text-green-400 transition-colors cursor-pointer"><Cpu className="w-4 h-4" /> Core</div>
             <div className="flex items-center gap-2 hover:text-green-400 transition-colors cursor-pointer"><Sparkles className="w-4 h-4" /> Visuals</div>
          </div>
          <div className="text-gray-600">
            SECURE CONNECTION ESTABLISHED
          </div>
        </div>
      </footer>
    </div>
  );
}
