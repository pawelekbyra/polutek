import { glossaryTerms } from '@/lib/vibe-data';
import SchemaMarkup from '@/app/components/SchemaMarkup';
import { Search, Book, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: "Słownik Vibe Codingu: Najważniejsze pojęcia AI 2025 | Polutek.pl",
  description: "Zrozum język nowej ery programowania. Przewodnik po 500+ pojęciach AI i programowania intencyjnego.",
};

export default function GlossaryPage() {
  return (
    <main className="bg-slate-50 min-h-screen">
      <SchemaMarkup
        type="Article"
        headline={metadata.title}
        description={metadata.description}
        author="Detektyw Polutek"
        datePublished="2025-02-27"
      />
      <section className="bg-slate-900 py-24 px-4 text-center text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[120px] opacity-20" />
         <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight relative z-10">Słownik Pojęć</h1>
         <p className="text-xl text-slate-400 max-w-2xl mx-auto relative z-10 leading-relaxed">
            Od <span className="text-blue-400 font-bold">Agentic Workflow</span> po <span className="text-blue-400 font-bold">Zero-Shot Coding</span>. Wszystko, co musisz wiedzieć, by dowozić software 10x szybciej.
         </p>
      </section>

      <div className="max-w-6xl mx-auto py-20 px-4">
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {glossaryTerms.map((item) => (
              <Link
                key={item.slug}
                href={`/slownik/${item.slug}`}
                className="group bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                   <div className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{item.category}</div>
                   <Sparkles className="w-4 h-4 text-slate-200 group-hover:text-yellow-400 transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{item.term}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">{item.definition}</p>
                <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                  Czytaj więcej <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
         </div>
      </div>

      <section className="max-w-4xl mx-auto pb-32 px-4">
         <div className="bg-blue-600 p-10 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-blue-200">
            <div>
               <h2 className="text-2xl font-bold mb-2">Budujemy największą bazę wiedzy</h2>
               <p className="text-blue-100 opacity-80 mb-0">Brakuje jakiegoś hasła? Nasz słownik rośnie codziennie dzięki społeczności.</p>
            </div>
            <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors whitespace-nowrap shadow-lg">
               Zaproponuj hasło
            </button>
         </div>
      </section>
    </main>
  );
}
