'use client';

import React, { useState } from 'react';
import { Terminal, Database, Cpu, Zap, Lock, ChevronRight, Play, CheckCircle2, ArrowRight, KeyRound } from 'lucide-react';

const CourseLandingPage = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans selection:bg-green-500 selection:text-black">

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tighter flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            POLUTEK <span className="text-white/40 font-light">/ ARCHITEKT</span>
          </div>
          <button className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
            Logowanie <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-green-500/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-900/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-mono tracking-widest mb-8 uppercase">
            <Zap className="w-3 h-3" /> Metoda 2026: Zero Terminala
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
            Przestań pisać kod. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
              Zacznij stawiać systemy.
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Era &quot;klepania kodu&quot; się skończyła. Nadeszła era <strong>Architektów Cyfrowych</strong>.
            Naucz się zarządzać AI (Jules, Cursor), żeby zbudować i sprzedać własną aplikację SaaS w jeden weekend.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="group relative px-8 py-4 bg-white text-black font-bold rounded-lg overflow-hidden transition-all hover:scale-105"
            >
              <div className="absolute inset-0 bg-green-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative flex items-center gap-2">
                DOŁĄCZ DO PROTOKOŁU <ChevronRight className="w-5 h-5" />
              </span>
            </button>
            <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-lg font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
              <Play className="w-4 h-4 text-green-500" /> Zobacz Demo (60s)
            </button>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Dostęp natychmiastowy • Gwarancja &quot;Zero Bullsh*t&quot; • Dożywotnie aktualizacje
          </p>
        </div>
      </header>

      {/* --- PROBLEM / SOLUTION (MANIFEST) --- */}
      <section className="py-24 border-y border-white/5 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Dlaczego Twoje &quot;Hello World&quot; nikogo nie obchodzi?</h2>
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
              <p>
                Większość kursów uczy Cię składni języka z 2015 roku. Uczą Cię być murarzem, kiedy świat potrzebuje architektów.
              </p>
              <p>
                <strong>Vibe Coding</strong> to zmiana paradygmatu. Zamiast walczyć z przecinkami w Pythonie, uczysz się &quot;zaklęć&quot; (Prompt Engineering), które zmuszają maszyny do pisania kodu za Ciebie.
              </p>
              <ul className="space-y-3 mt-4">
                {[
                  "Zero konfiguracji środowiska (Zero Terminal)",
                  "Budowa pełnych aplikacji (Backend + Frontend)",
                  "Własność kodu (GitHub), a nie zamknięty ekosystem",
                  "Skupienie na produkcie i pieniądzach, nie na teorii"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white">
                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-[#0a0a0a] border border-white/10 rounded-xl p-6 font-mono text-sm leading-relaxed overflow-hidden">
              <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-gray-500">jules-ai — agent</span>
              </div>
              <div className="space-y-4">
                <div className="text-gray-500">{`// Ty (Architekt):`}</div>
                <div className="text-green-400">
                  {">"} Jules, stwórz klona Twittera. <br/>
                  {">"} Stack: Next.js + Supabase. <br/>
                  {">"} Styl: Cyberpunk. <br/>
                  {">"} Funkcje: Logowanie, Posty, Lajki.
                </div>
                <div className="text-gray-500 mt-4">{`// Jules (Twoja Maszyna):`}</div>
                <div className="text-purple-400">
                  {">"} Analizuję... <br/>
                  {">"} Generuję schemat bazy danych... [OK] <br/>
                  {">"} Tworzę komponenty UI... [OK] <br/>
                  {">"} Integruję autoryzację... [OK] <br/>
                  {">"} Aplikacja gotowa. Deploy na Vercel? (T/N)
                </div>
                <div className="animate-pulse text-white mt-2">_</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROGRAM (PROTOKÓŁ) --- */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Protokół: Od Zera do SaaS</h2>
          <p className="text-gray-400 mt-4">Nie dostaniesz 40 godzin nudnych wideo. Dostaniesz instrukcję bojową.</p>
        </div>

        <div className="grid gap-8">
          {[
            {
              title: "MODUŁ 0: RESET MINDSETU",
              desc: "Przestań myśleć jak uczeń. Zacznij myśleć jak CEO. Konfiguracja 'Cyfrowego Biurka' (Cursor + Bolt).",
              icon: <Terminal className="w-6 h-6 text-green-400" />
            },
            {
              title: "SPRINT 1: WIELKI WYBUCH",
              desc: "Twoja pierwsza aplikacja w 15 minut. Złoty Prompt, który stawia cały szkielet, zanim dopijesz kawę.",
              icon: <Zap className="w-6 h-6 text-yellow-400" />
            },
            {
              title: "SPRINT 2: SKARBIEC DANYCH",
              desc: "Integracja z Supabase. Twoja aplikacja zyskuje pamięć. Logowanie, bazy danych, 'zapamiętywanie' użytkownika.",
              icon: <Database className="w-6 h-6 text-purple-400" />
            },
            {
              title: "SPRINT 3: WIRUSOWOŚĆ & DEPLOY",
              desc: "Publikacja na Vercel. Podpinanie płatności (Stripe). Jak sprawić, żeby ludzie chcieli tego używać.",
              icon: <Cpu className="w-6 h-6 text-blue-400" />
            }
          ].map((mod, i) => (
            <div key={i} className="group flex flex-col md:flex-row gap-6 p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-green-500/30 transition-all hover:bg-white/[0.07]">
              <div className="w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                {mod.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
                  {mod.title}
                  {i === 0 && <span className="text-xs bg-green-900/50 text-green-400 px-2 py-0.5 rounded border border-green-500/20">DARMOWY WSTĘP</span>}
                </h3>
                <p className="text-gray-400 leading-relaxed">{mod.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- STACK SECTION --- */}
      <section className="py-20 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="text-center">
          <p className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-8">Narzędzia Twojej Władzy</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 hover:opacity-100 transition-opacity duration-500">
             {/* Tu normalnie wstawiłbyś loga SVG, używam tekstu dla uproszczenia kodu */}
             <span className="text-2xl font-bold text-white flex items-center gap-2"><Terminal className="w-6 h-6"/> Cursor</span>
             <span className="text-2xl font-bold text-white flex items-center gap-2"><Database className="w-6 h-6"/> Supabase</span>
             <span className="text-2xl font-bold text-white flex items-center gap-2"><Cpu className="w-6 h-6"/> Vercel</span>
             <span className="text-2xl font-bold text-white flex items-center gap-2"><Zap className="w-6 h-6"/> Lovable</span>
          </div>
        </div>
      </section>

      {/* --- PRICING CTA --- */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-green-500/5" />
        <div className="max-w-4xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-12 relative z-10 text-center shadow-2xl shadow-green-900/20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Zdobądź Protokół.</h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            To nie jest wydatek. To inwestycja w narzędzie, które pozwoli Ci budować aktywa cyfrowe. Cena jednej kolacji na mieście.
          </p>

          <div className="flex flex-col items-center gap-4">
            <div className="text-5xl font-bold text-white">97 PLN <span className="text-lg text-gray-500 font-normal line-through">297 PLN</span></div>
            <div className="text-green-400 text-sm font-medium animate-pulse">⚡ Oferta przedsprzedażowa (Beta)</div>

            <button className="w-full md:w-auto px-12 py-5 bg-green-500 hover:bg-green-400 text-black font-bold text-xl rounded-xl transition-all shadow-lg shadow-green-500/20 mt-4 flex items-center justify-center gap-3">
              <Lock className="w-5 h-5" /> KUPUJĘ DOSTĘP
            </button>
            <p className="text-xs text-gray-600 mt-4">
              Bezpieczna płatność przez Stripe. 30 dni gwarancji satysfakcji.
            </p>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-white/5 text-center text-gray-600 text-sm">
        <p>&copy; 2026 Polutek / Architekt Cyfrowy. Wszystkie prawa zastrzeżone.</p>
        <p className="mt-2">Built with Vibe Coding using Next.js & Tailwind.</p>
      </footer>
    </div>
  );
};

export default function CoursePage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'kurs') {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (isUnlocked) {
    return <CourseLandingPage />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-[#0d0d0d] border border-white/10 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
            <Lock className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Dostęp do Kursu</h1>
          <p className="text-gray-400 mt-2">Wprowadź hasło, aby odblokować Protokół.</p>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div className="relative">
            <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Hasło..."
              className={`w-full bg-white/5 border ${error ? 'border-red-500' : 'border-white/10'} rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all`}
              autoFocus
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">Nieprawidłowe hasło. Spróbuj ponownie.</p>}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-4 rounded-xl transition-all shadow-lg shadow-green-500/20"
          >
            Odblokuj
          </button>
        </form>
      </div>
    </div>
  );
}
