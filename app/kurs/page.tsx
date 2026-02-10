'use client';

import React, { useState } from 'react';
import {
  Terminal,
  Database,
  Cpu,
  Zap,
  Rocket,
  ChevronDown,
  ChevronUp,
  Code2,
  Globe,
  ShieldCheck,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StepItem = ({ title, description, icon: Icon, stepNumber, isOpen, onClick }: any) => {
  return (
    <div className={`border-b border-white/10 transition-all ${isOpen ? 'bg-white/[0.02]' : ''}`}>
      <button
        onClick={onClick}
        className="w-full py-6 px-4 flex items-center justify-between group"
      >
        <div className="flex items-center gap-4 text-left">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-all ${isOpen ? 'bg-green-500 border-green-400 text-black' : 'bg-black border-white/10 text-green-500 group-hover:border-green-500/50'}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono text-green-500/60 uppercase tracking-widest">Krok {stepNumber}</span>
            <h3 className="text-xl font-bold text-white">{title}</h3>
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
            <div className="px-4 pb-8 pt-2 pl-16 text-gray-400 leading-relaxed max-w-2xl">
              {description}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ProtocolPage() {
  const [openStep, setOpenStep] = useState(1);

  const steps = [
    {
      title: "Setup (Zero Terminal)",
      description: "Zapomnij o instalowaniu Pythona, Node.js czy Dockerów. W 2026 roku Twoim systemem operacyjnym jest przeglądarka i Cursor. Uruchamiamy środowisko w chmurze (Bolt.new), które jest gotowe do pracy w 3 sekundy. Zero błędów konfiguracji, 100% czasu na budowanie.",
      icon: Terminal,
    },
    {
      title: "The Prompt (Vibe Coding)",
      description: (
        <div className="space-y-4">
          <p>Przestań uczyć się składni. Naucz się logiki i kontekstu. Vibe Coding to umiejętność dyrygowania modelami AI tak, by rozumiały Twoją wizję produktu.</p>
          <div className="bg-black/50 border border-green-500/20 rounded-lg p-4 font-mono text-sm">
            <span className="text-green-500">Golden Prompt:</span>
            <p className="mt-2 text-gray-300">&quot;Jules, stwórz system subskrypcyjny SaaS używając Next.js i Stripe. Użyj architektury komponentowej, zaimplementuj middleware do ochrony tras i przygotuj schemat bazy danych dla użytkowników Premium.&quot;</p>
          </div>
        </div>
      ),
      icon: Code2,
    },
    {
      title: "Database (Memory)",
      description: "Twoja aplikacja potrzebuje mózgu. Supabase to Twój backend, który konfigurujesz w języku naturalnym. Tworzymy tabele, relacje i polityki bezpieczeństwa (RLS) bez pisania ani jednej linijki SQL. Twoje dane są bezpieczne, skalowalne i gotowe na tysiące użytkowników.",
      icon: Database,
    },
    {
      title: "Deployment (Launch)",
      description: "Zakończyliśmy erę skomplikowanych serwerów. Jedno kliknięcie i Twoja aplikacja ląduje na Vercel. Globalna sieć CDN, automatyczne certyfikaty SSL i podgląd każdej zmiany na żywo. Twój SaaS jest dostępny dla całego świata pod Twoją własną domeną.",
      icon: Rocket,
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 font-sans selection:bg-green-500 selection:text-black overflow-x-hidden">

      {/* --- BACKGROUND EFFECTS --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-green-900/10 blur-[100px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150" />
      </div>

      <nav className="relative z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold tracking-tighter text-xl">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>ARCHITEKT</span>
            <span className="text-white/20">/</span>
            <span className="text-white/40 font-light">PROTOKÓŁ</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-green-400 transition-colors">Metoda</a>
            <a href="#" className="hover:text-green-400 transition-colors">Narzędzia</a>
            <a href="#" className="hover:text-green-400 transition-colors">Case Study</a>
          </div>
          <button className="px-5 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-green-400 transition-all hover:scale-105">
            DARMOWY WSTĘP
          </button>
        </div>
      </nav>

      <main className="relative z-10">
        {/* --- HERO SECTION --- */}
        <section className="pt-24 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-mono mb-8 uppercase tracking-widest"
            >
              <Zap className="w-3 h-3" /> Metoda Zero Terminala 2026
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8"
            >
              Protokół Architekta: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-purple-500">
                Zbuduj własne SaaS w weekend bez pisania kodu.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              Era &quot;klepania kodu&quot; się skończyła. Wykorzystaj Cursor, Bolt i Supabase, by stać się <strong>Cyfrowym Architektem</strong> i stawiać systemy, które zarabiają.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button className="w-full sm:w-auto px-8 py-4 bg-green-500 text-black font-extrabold rounded-xl hover:bg-green-400 transition-all hover:scale-105 shadow-[0_0_20px_rgba(34,197,94,0.3)] flex items-center justify-center gap-2">
                URUCHOM PROTOKÓŁ <ArrowRight className="w-5 h-5" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-colors">
                ZOBACZ DEMO
              </button>
            </motion.div>
          </div>
        </section>

        {/* --- THE GUIDE --- */}
        <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Instrukcja Operacyjna</h2>
              <p className="text-gray-500">Cztery filary nowoczesnej architektury systemów AI.</p>
            </div>

            <div className="border border-white/10 rounded-2xl bg-black overflow-hidden shadow-2xl">
              {steps.map((step, idx) => (
                <StepItem
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

        {/* --- CTA SECTION --- */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-purple-500/20 blur-[100px] rounded-full opacity-50" />
            <div className="relative bg-black border border-white/10 rounded-[3rem] p-8 md:p-20 text-center overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Sparkles className="w-32 h-32 text-green-500" />
              </div>

              <h2 className="text-4xl md:text-6xl font-bold mb-8">Gotowy na Deep-Dive?</h2>
              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                Chcesz otrzymać pełną listę Złotych Promptów, gotowe schematy Supabase i dostęp do zamkniętej społeczności Architektów?
              </p>

              <div className="flex flex-col items-center gap-6">
                <div className="inline-flex items-baseline gap-2">
                  <span className="text-6xl font-black text-white">97 PLN</span>
                  <span className="text-gray-500 line-through">297 PLN</span>
                </div>

                <button className="group relative px-12 py-6 bg-white text-black font-black text-2xl rounded-2xl transition-all hover:scale-105 overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  <span className="relative z-10 flex items-center gap-3">
                    ODBIERZ PEŁNY DOSTĘP <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>

                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> 30-dniowa gwarancja satysfakcji
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-500 text-sm font-mono">
            &copy; 2026 ARCHITEKT PROTOKÓŁ / stealth_mode.exe
          </div>
          <div className="flex items-center gap-6 opacity-30">
             <Globe className="w-5 h-5" />
             <Cpu className="w-5 h-5" />
             <Sparkles className="w-5 h-5" />
          </div>
          <div className="text-gray-500 text-sm">
            Built for the AI Era
          </div>
        </div>
      </footer>
    </div>
  );
}
