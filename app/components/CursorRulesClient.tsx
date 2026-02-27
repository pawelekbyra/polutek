"use client";

import React, { useState } from 'react';
import { FileCode, Copy, Check, Info, Rocket, Server, Smartphone, Globe, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CursorRulesClient() {
  return (
    <div className="max-w-6xl mx-auto">
      <Link href="/" className="inline-flex items-center gap-2 text-blue-600 font-bold mb-12 hover:gap-3 transition-all">
        <ArrowLeft className="w-4 h-4" /> Powrót do strony głównej
      </Link>

      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-blue-100">
          <Rocket className="w-3 h-3" /> Tooling PRO
        </div>
        <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight">Biblioteka .cursorrules</h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Nie pozwól AI zgadywać. Narzuć swój styl pracy za pomocą sprawdzonych plików konfiguracyjnych.
        </p>
      </div>

      <div className="grid gap-12">
        <RuleCard
          title="Next.js & Tailwind (The Gold Standard)"
          icon={<Globe className="w-6 h-6 text-blue-600" />}
          content={`Zawsze używaj App Routera i Server Components.
Wszystkie komponenty UI muszą korzystać z shadcn/ui i Tailwind CSS.
Stosuj architekturę atomic components w folderze /components.
Zawsze typuj Props za pomocą interfejsów TypeScript.
Nie twórz osobnych plików .css - używaj wyłącznie klas narzędziowych Tailwind.`}
          description="Idealny dla nowoczesnych aplikacji webowych. Zapewnia spójność wizualną i techniczną."
        />

        <RuleCard
          title="Python & FastAPI (Backend focus)"
          icon={<Server className="w-6 h-6 text-emerald-600" />}
          content={`Używaj Pydantic v2 do walidacji danych.
Stosuj asynchroniczne endpointy (async def).
Zawsze dołączaj dokumentację docstring w formacie Google.
Każdy nowy endpoint musi mieć odpowiadający mu test w folderze /tests.
Zarządzaj zależnościami przez Poetry.`}
          description="Zoptymalizowany pod wydajne i dobrze udokumentowane API backendowe."
        />

        <RuleCard
          title="Mobile (React Native / Expo)"
          icon={<Smartphone className="w-6 h-6 text-purple-600" />}
          content={`Używaj wyłącznie komponentów funkcyjnych i hooków.
Stosuj NativeWind (Tailwind) do stylowania.
Każdy widok musi obsługiwać SafeAreaView.
Optymalizuj listy za pomocą FlashList zamiast FlatList.
Unikaj inline styles.`}
          description="Dla twórców aplikacji mobilnych, którzy chcą natywnego performance'u."
        />
      </div>

      <div className="mt-20 bg-slate-900 rounded-[3rem] p-12 text-white text-center">
        <Info className="w-12 h-12 text-blue-400 mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4">Jak używać tych reguł?</h2>
        <p className="text-slate-400 max-w-xl mx-auto leading-relaxed mb-0">
          Stwórz plik o nazwie <code className="text-blue-300 font-mono">.cursorrules</code> w głównym folderze swojego projektu i wklej do niego wybrany szablon. Cursor odczyta te instrukcje i będzie się do nich stosował przy każdym zadaniu.
        </p>
      </div>
    </div>
  );
}

function RuleCard({ title, icon, content, description }: any) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
      <div className="p-10 md:w-1/3 flex flex-col justify-between">
        <div>
          <div className="bg-slate-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border border-slate-100 shadow-inner">
            {icon}
          </div>
          <h3 className="text-2xl font-black mb-4 text-slate-900">{title}</h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-8">
            {description}
          </p>
        </div>
        <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
          <FileCode className="w-4 h-4" /> Config Template
        </div>
      </div>
      <div className="bg-slate-950 p-10 md:w-2/3 relative group">
        <pre className="text-blue-300 font-mono text-sm leading-relaxed whitespace-pre-wrap">
          {content}
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all backdrop-blur-md border border-white/10 flex items-center gap-2"
        >
          {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
          {copied && <span className="text-xs font-bold">Skopiowano!</span>}
        </button>
      </div>
    </div>
  );
}
