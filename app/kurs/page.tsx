'use client';

import React, { useState, useEffect } from 'react';
import {
  Terminal,
  Database,
  Cpu,
  Zap,
  Rocket,
  ChevronRight,
  Code2,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Lock,
  CheckCircle2,
  Layers,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Metadata is handled by the layout or generateMetadata in a server component.
// Since this is 'use client', we can't export metadata from here.
// However, the layout.tsx already has generateMetadata that handles SEO based on subdomain.
// I will ensure layout.tsx is updated if needed, but for now I'll focus on the content.

const PasswordGate = ({ onSuccess }: { onSuccess: () => void }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === 'kurs') {
      onSuccess();
      localStorage.setItem('kurs_unlocked', 'true');
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-neutral-900 border border-white/10 p-8 rounded-3xl shadow-2xl"
      >
        <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
          <Lock className="w-8 h-8 text-green-400" />
        </div>
        <h2 className="text-2xl font-bold text-white text-center mb-2">Protokół Zablokowany</h2>
        <p className="text-gray-400 text-center mb-8 text-sm">Podaj hasło dostępowe, aby odblokować Oficjalny Protokół Architekta 2026.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Hasło..."
              className={`w-full bg-black border ${error ? 'border-red-500' : 'border-white/10'} rounded-xl py-4 px-5 text-white placeholder:text-gray-600 focus:outline-none focus:border-green-500/50 transition-all`}
            />
            {error && <p className="text-red-500 text-xs mt-2 absolute">Nieprawidłowe hasło. Spróbuj ponownie.</p>}
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-green-500 hover:bg-green-400 text-black font-bold rounded-xl transition-all shadow-lg shadow-green-500/20"
          >
            ODBLOKUJ DOSTĘP
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const FazaCard = ({ title, description, step, icon: Icon }: any) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-neutral-900 border border-white/5 p-8 rounded-3xl hover:border-green-500/30 transition-all group"
  >
    <div className="flex items-start justify-between mb-6">
      <div className="w-12 h-12 bg-black border border-white/10 rounded-2xl flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-xs font-mono text-white/20 uppercase tracking-widest">Faza 0{step}</span>
    </div>
    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors">{title}</h3>
    <p className="text-gray-400 leading-relaxed text-sm">
      {description}
    </p>
  </motion.div>
);

export default function CoursePage() {
  const [unlocked, setUnlocked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('kurs_unlocked') === 'true') {
      setUnlocked(true);
    }
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return <div className="min-h-screen bg-neutral-950" />;

  if (!unlocked) {
    return <PasswordGate onSuccess={() => setUnlocked(true)} />;
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-100 font-sans selection:bg-green-500 selection:text-black selection:text-black overflow-x-hidden">

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-neutral-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold tracking-tighter text-xl">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-white">ARCHITEKT</span>
            <span className="text-white/20 font-light">/</span>
            <span className="text-green-400 font-mono text-sm">OS_2026</span>
          </div>
          <button className="hidden md:flex items-center gap-2 text-sm font-bold text-white/60 hover:text-white transition-colors">
            Moje Konto <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative pt-40 pb-32 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-900/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-mono tracking-widest mb-8 uppercase"
          >
            <Zap className="w-3 h-3" /> Oficjalny Protokół Architekta 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-8"
          >
            Przestań pisać kod. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-purple-500">
              Zacznij stawiać Systemy.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Zmień się z rzemieślnika w <strong>Dyrektora AI</strong>. Opanuj Metodę Zero Terminala i buduj dochodowe aplikacje SaaS w jeden weekend.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <button className="group relative px-10 py-5 bg-green-500 text-black font-black text-xl rounded-2xl overflow-hidden transition-all hover:scale-105 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
              <span className="relative z-10 flex items-center gap-2">
                ROZPOCZNIJ TRANSFORMACJĘ <ArrowRight className="w-6 h-6" />
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <div className="text-left">
              <div className="text-2xl font-bold text-white">97 PLN</div>
              <div className="text-xs text-green-500 font-mono uppercase tracking-widest">Dostęp Natychmiastowy</div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* --- THE PROBLEM --- */}
      <section className="py-24 border-y border-white/5 bg-neutral-900/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Dlaczego tradycyjne kursy nie działają?</h2>
          <div className="text-lg md:text-xl text-gray-400 space-y-8 leading-relaxed">
            <p>
              Bo uczą Cię układania cegieł (składni), gdy Ty chcesz zaprojektować wieżowiec.
              Większość kursów utknęła w 2015 roku, każąc Ci debugować przecinki w Pythonie.
            </p>
            <p className="bg-black/40 border border-white/10 p-8 rounded-3xl italic">
              &quot;W erze AI znajomość pętli <code className="text-green-400">for</code> to przeszłość. Liczy się <strong>Vibe Coding</strong> – umiejętność dyrygowania modelami językowymi tak, by budowały kompletne produkty pod Twoje dyktando.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* --- PROTOCOL (THE SOLUTION) --- */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black mb-6">Protokół: 4 Kroki do SaaS</h2>
            <p className="text-gray-500 text-lg">Od zera do działającego produktu na produkcji. Bez kompromisów.</p>
          </div>
          <div className="flex gap-2">
            <div className="w-12 h-1 h-green-500 rounded-full" />
            <div className="w-4 h-1 bg-white/10 rounded-full" />
            <div className="w-4 h-1 bg-white/10 rounded-full" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FazaCard
            step={1}
            title="Zero Terminala"
            description="Konfiguracja środowiska bez instalowania czegokolwiek. Cursor AI jako Twój główny inżynier. Uruchamiamy stack w chmurze w 30 sekund."
            icon={Terminal}
          />
          <FazaCard
            step={2}
            title="Złoty Prompt"
            description="Jak rozmawiać z AI, żeby generowało gotowe moduły, a nie fragmenty tekstu. Techniki Prompt Engineeringu dla Architektów."
            icon={Sparkles}
          />
          <FazaCard
            step={3}
            title="Skarbiec Danych"
            description="Większość apek AI to wydmuszki. My nauczymy Cię dawać im pamięć przez Supabase. Twoja aplikacja będzie pamiętać użytkowników."
            icon={Database}
          />
          <FazaCard
            step={4}
            title="Wielki Wybuch"
            description="Publikacja na Vercel jednym kliknięciem. Własna domena w 15 minut. Automatyzacja deployu i obsługa płatności Stripe."
            icon={Rocket}
          />
        </div>
      </section>

      {/* --- TECH STACK --- */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-mono text-gray-600 uppercase tracking-[0.3em] mb-12">Narzędzia Twojej Władzy</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            <div className="flex items-center gap-3 text-2xl font-bold"><Code2 className="w-8 h-8"/> Cursor</div>
            <div className="flex items-center gap-3 text-2xl font-bold"><Zap className="w-8 h-8"/> Bolt</div>
            <div className="flex items-center gap-3 text-2xl font-bold"><Layers className="w-8 h-8"/> Lovable</div>
            <div className="flex items-center gap-3 text-2xl font-bold"><Database className="w-8 h-8"/> Supabase</div>
            <div className="flex items-center gap-3 text-2xl font-bold"><Globe className="w-8 h-8"/> Vercel</div>
          </div>
        </div>
      </section>

      {/* --- ABOUT --- */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto bg-neutral-900 border border-white/10 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-500/10 blur-[80px] rounded-full" />
          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
            <div className="w-32 h-32 rounded-3xl bg-black border border-white/10 flex items-center justify-center shrink-0 shadow-2xl">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center font-black text-3xl text-black">P</div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">O Autorze</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                &quot;Stworzone przez praktyka, który buduje, a nie tylko uczy. Projekt Polutek to manifestacja nowego podejścia do technologii, gdzie bariera wejścia do świata software house&apos;ów przestaje istnieć.&quot;
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> 10+ Wdrożonych SaaS
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> Społeczność 5k+
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-white/5 bg-neutral-950 text-center">
        <p className="text-gray-600 text-sm font-mono tracking-widest uppercase">
          &copy; 2026 Polutek / Architekt Cyfrowy. Built with Vibe Coding.
        </p>
      </footer>
    </div>
  );
}
