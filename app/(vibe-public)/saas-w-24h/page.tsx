import SchemaMarkup from '@/app/components/SchemaMarkup';
import { Target, Zap, Rocket } from 'lucide-react';

export const metadata = {
  title: "SaaS w 24 godziny: Case Study Vibe Codingu | Polutek.pl",
  description: "Jak zbudować i wdrożyć działający produkt w jeden dzień używając Cursora i Lovable. Analiza procesu.",
};

export default function Saas24Page() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <SchemaMarkup
        type="Article"
        headline={metadata.title}
        description={metadata.description}
        author="Detektyw Polutek"
        datePublished="2025-02-21"
      />
      <h1 className="text-4xl md:text-5xl font-bold mb-8">SaaS w 24 godziny</h1>
      <div className="prose prose-slate prose-lg max-w-none">
        <p className="lead text-xl text-slate-600 mb-12">
          Budowa MVP w weekend to już historia. Z Vibe Codingiem standardem staje się budowa i wdrożenie w jeden dzień roboczy.
        </p>

        <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3 text-indigo-600">
          <Target className="w-8 h-8" /> Plan Dnia
        </h2>
        <div className="space-y-4">
           <div className="flex gap-4 items-start border-b border-slate-100 pb-4">
              <span className="font-black text-slate-200 text-3xl">09:00</span>
              <div>
                 <h4 className="font-bold">Definicja i UI (v0.dev)</h4>
                 <p className="text-sm">Generowanie mockupów i podstawowych komponentów React.</p>
              </div>
           </div>
           <div className="flex gap-4 items-start border-b border-slate-100 pb-4">
              <span className="font-black text-slate-200 text-3xl">12:00</span>
              <div>
                 <h4 className="font-bold">Logika i API (Cursor)</h4>
                 <p className="text-sm">Połączenie frontendu z bazą danych Supabase i logiką biznesową.</p>
              </div>
           </div>
           <div className="flex gap-4 items-start">
              <span className="font-black text-slate-200 text-3xl">17:00</span>
              <div>
                 <h4 className="font-bold">Deploy i Płatności (Vercel + Stripe)</h4>
                 <p className="text-sm">Wdrożenie na produkcję i podpięcie bramek płatniczych.</p>
              </div>
           </div>
        </div>

        <div className="mt-16 bg-blue-600 p-10 rounded-[3rem] text-white shadow-xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-20"><Rocket className="w-24 h-24" /></div>
           <h3 className="text-2xl font-bold mb-4 relative z-10">Wniosek z Case Study</h3>
           <p className="relative z-10 italic mb-0 text-lg">
              &quot;Szybkość iteracji to jedyna przewaga rynkowa, której nie można łatwo skopiować. Vibe coding daje Ci tę przewagę za darmo.&quot;
           </p>
        </div>
      </div>
    </section>
  );
}
