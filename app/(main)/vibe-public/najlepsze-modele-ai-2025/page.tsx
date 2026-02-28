import SchemaMarkup from '@/app/components/SchemaMarkup';
import { Cpu, Brain, Zap } from 'lucide-react';

export const metadata = {
  title: "Ranking Modeli AI do Programowania 2025 | Polutek.pl",
  description: "Claude 3.5 Sonnet vs GPT-4o vs DeepSeek V3. Sprawdź, który model najlepiej pisze kod i rozumie intencje w Vibe Codingu.",
};

export default function ModelsRankingPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <SchemaMarkup
        type="Article"
        headline={metadata.title}
        description={metadata.description}
        author="Detektyw Polutek"
        datePublished="2025-02-21"
      />
      <h1 className="text-4xl md:text-5xl font-bold mb-12">Ranking Modeli AI 2025</h1>

      <div className="space-y-16">
         <div className="relative p-10 bg-white border border-slate-100 rounded-[3rem] shadow-xl border-l-8 border-l-orange-500 overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10"><Brain className="w-32 h-32" /></div>
            <div className="relative z-10">
               <div className="text-orange-600 text-sm font-bold uppercase tracking-widest mb-2">#1 MIEJSCE</div>
               <h2 className="text-3xl font-black mb-4">Claude 3.5 Sonnet (Anthropic)</h2>
               <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                  Obecnie niekwestionowany król programowania. Claude najlepiej rozumie architekturę plików i rzadziej halucynuje w porównaniu do modeli od OpenAI. Jest domyślnym wyborem dla Cursora.
               </p>
               <div className="flex gap-4">
                  <div className="px-4 py-2 bg-slate-50 rounded-full text-xs font-bold">Zrozumienie Kontekstu: 10/10</div>
                  <div className="px-4 py-2 bg-slate-50 rounded-full text-xs font-bold">Prędkość: 8/10</div>
               </div>
            </div>
         </div>

         <div className="relative p-10 bg-white border border-slate-100 rounded-[3rem] shadow-xl border-l-8 border-l-blue-600 overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10"><Zap className="w-32 h-32" /></div>
            <div className="relative z-10">
               <div className="text-blue-600 text-sm font-bold uppercase tracking-widest mb-2">#2 MIEJSCE</div>
               <h2 className="text-3xl font-black mb-4">GPT-4o (OpenAI)</h2>
               <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                  Nadal bardzo wszechstronny i szybki. GPT-4o jest świetny do mniejszych skryptów i wyjaśniania pojęć teoretycznych, ale bywa &quot;leniwy&quot; przy generowaniu dużych bloków kodu.
               </p>
               <div className="flex gap-4">
                  <div className="px-4 py-2 bg-slate-50 rounded-full text-xs font-bold">Zrozumienie Kontekstu: 8/10</div>
                  <div className="px-4 py-2 bg-slate-50 rounded-full text-xs font-bold">Prędkość: 10/10</div>
               </div>
            </div>
         </div>

         <div className="relative p-10 bg-white border border-slate-100 rounded-[3rem] shadow-xl border-l-8 border-l-purple-600 overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10"><Cpu className="w-32 h-32" /></div>
            <div className="relative z-10">
               <div className="text-purple-600 text-sm font-bold uppercase tracking-widest mb-2">NAJLEPSZA CENA</div>
               <h2 className="text-3xl font-black mb-4">DeepSeek V3</h2>
               <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                  Fenomen z Chin, który dorównuje Claude w benchmarkach za ułamek jego ceny. Idealny wybór dla osób używających własnych API i budujących masowo z agentami.
               </p>
               <div className="flex gap-4">
                  <div className="px-4 py-2 bg-slate-50 rounded-full text-xs font-bold">Zrozumienie Kontekstu: 9/10</div>
                  <div className="px-4 py-2 bg-slate-50 rounded-full text-xs font-bold">Prędkość: 9/10</div>
               </div>
            </div>
         </div>
      </div>
    </section>
  );
}
