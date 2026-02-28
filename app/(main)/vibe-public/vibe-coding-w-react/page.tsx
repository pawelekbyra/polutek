import SchemaMarkup from '@/app/components/SchemaMarkup';
import { Layout, Zap, Cpu } from 'lucide-react';

export const metadata = {
  title: "Vibe Coding w React & Next.js: Buduj UI 10x Szybciej | Polutek.pl",
  description: "Praktyczny przewodnik po tworzeniu nowoczesnych interfejsów w React z pomocą asystentów AI.",
};

export default function ReactPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <SchemaMarkup
        type="Article"
        headline={metadata.title}
        description={metadata.description}
        author="Detektyw Polutek"
        datePublished="2025-02-21"
      />
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Vibe Coding w React & Next.js</h1>
      <div className="prose prose-slate prose-lg max-w-none">
        <p className="lead text-xl text-slate-600 mb-8">
          React i Next.js to naturalne środowisko dla Vibe Codingu. Dzięki komponentowej strukturze, AI jest w stanie precyzyjnie generować i modyfikować fragmenty UI.
        </p>
        <h2 className="text-3xl font-bold mt-12 mb-6">Workflow: Od promptu do komponentu</h2>
        <p>
          Używając narzędzi takich jak <strong>v0.dev</strong> lub <strong>Cursor Composer</strong>, możesz stworzyć skomplikowany formularz lub dashboard w kilka sekund. Kluczem jest podawanie kontekstu bibliotek takich jak Tailwind CSS i shadcn/ui.
        </p>
        <div className="grid md:grid-cols-2 gap-8 my-10">
           <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
             <h4 className="font-bold mb-2 flex items-center gap-2 text-blue-600"><Zap className="w-5 h-5" /> Szybkość</h4>
             <p className="text-sm text-slate-600">Generowanie boilerplate&apos;u, hooków i typów w ułamku sekundy.</p>
           </div>
           <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
             <h4 className="font-bold mb-2 flex items-center gap-2 text-blue-600"><Layout className="w-5 h-5" /> Spójność</h4>
             <p className="text-sm text-slate-600">AI pilnuje, aby nowe komponenty pasowały do istniejącego Design Systemu.</p>
           </div>
        </div>
      </div>
    </section>
  );
}
