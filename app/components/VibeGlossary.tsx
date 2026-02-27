"use client";

import React, { useState } from 'react';
import { Search, BookMarked, Tag } from 'lucide-react';

const terms = [
  { term: "Vibe Coding", cat: "Teoria", def: "Styl programowania, w którym człowiek zarządza intencją (vibe) projektu, a AI odpowiada za niskopoziomową implementację kodu." },
  { term: "Composer", cat: "Narzędzia", def: "Funkcja w edytorze Cursor pozwalająca AI na edycję wielu plików jednocześnie w celu realizacji złożonego zadania." },
  { term: "Agentic Workflow", cat: "Proces", def: "Workflow, w którym AI agent autonomicznie planuje kroki, wykonuje je, testuje wynik i wprowadza poprawki." },
  { term: ".cursorrules", cat: "Narzędzia", def: "Plik konfiguracyjny, w którym definiujesz globalne zasady, standardy i preferencje dla asystenta AI w Twoim projekcie." },
  { term: "RAG (Retrieval-Augmented Generation)", cat: "Technologia", def: "Technika pozwalająca AI na dostęp do zewnętrznych danych (np. Twojego kodu) w celu udzielenia bardziej precyzyjnej odpowiedzi." },
  { term: "Intentional Programming", cat: "Teoria", def: "Paradygmat skupiający się na opisie 'co' program ma robić, zamiast szczegółowego opisu 'jak' ma to robić." },
  { term: "Claude 3.5 Sonnet", cat: "Modele", def: "Obecnie najpotężniejszy model językowy od Anthropic, uznawany za złoty standard w programowaniu AI." },
  { term: "Context Window", cat: "Technologia", def: "Ilość informacji (tokenów), którą model AI jest w stanie 'pamiętać' i analizować w jednej sesji pracy." },
  { term: "Zero-Shot Coding", cat: "Proces", def: "Generowanie poprawnego i działającego kodu za pierwszym razem, bez konieczności wprowadzania poprawek w prompcie." },
  { term: "Hallucination", cat: "Ryzyko", def: "Sytuacja, w której model AI generuje kod lub informacje, które wyglądają poprawnie, ale są nieprawdziwe lub nie działają." }
];

export default function VibeGlossary() {
  const [query, setQuery] = useState('');

  const filtered = terms.filter(t =>
    t.term.toLowerCase().includes(query.toLowerCase()) ||
    t.def.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <div className="relative mb-12">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Szukaj pojęcia (np. Composer, RAG)..."
          className="w-full pl-12 pr-6 py-4 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 focus:outline-none transition-all text-lg shadow-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-6">
        {filtered.map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-blue-200 transition-colors">
            <div className="flex items-center justify-between mb-3">
               <h3 className="text-xl font-bold text-slate-900">{item.term}</h3>
               <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                 <Tag className="w-3 h-3" /> {item.cat}
               </span>
            </div>
            <p className="text-slate-600 leading-relaxed">{item.def}</p>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
             <BookMarked className="w-12 h-12 text-slate-300 mx-auto mb-4" />
             <p className="text-slate-500 font-medium">Nie znaleźliśmy takiego pojęcia. Spróbuj czegoś innego!</p>
          </div>
        )}
      </div>
    </div>
  );
}
