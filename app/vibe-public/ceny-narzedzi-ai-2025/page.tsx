import SchemaMarkup from '@/app/components/SchemaMarkup';
import { DollarSign, Check, X, Zap, Info, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: "Ceny Narzędzi AI 2025: Cursor, Windsurf, Bolt.new | Polutek.pl",
  description: "Zestawienie kosztów subskrypcji najpopularniejszych edytorów i generatorów AI. Sprawdź, co najbardziej się opłaca w 2025 roku.",
  keywords: "cursor cena, windsurf pricing, bolt.new cena, lovable subscription, narzędzia ai koszty, ile kosztuje cursor pro",
};

const pricingData = [
  {
    name: "Cursor",
    free: "2000 prompów (Hobby)",
    pro: "$20 / mies",
    features: [
      { text: "Claude 3.5 Sonnet", included: true },
      { text: "Composer (Multi-file)", included: true },
      { text: "Local Indexing (RAG)", included: true },
      { text: "Agentic Mode", included: true },
    ],
    bestFor: "Standard dla każdego"
  },
  {
    name: "Windsurf",
    free: "Limitowane Flow",
    pro: "$15 / mies",
    features: [
      { text: "Agentic Flow", included: true },
      { text: "Claude 3.5 / GPT-4o", included: true },
      { text: "Deep Context", included: true },
      { text: "Advanced Terminal AI", included: true },
    ],
    bestFor: "Power-userzy terminala"
  },
  {
    name: "Bolt.new",
    free: "1 projekt / mies",
    pro: "$20 / mies",
    features: [
      { text: "Fullstack App in Browser", included: true },
      { text: "Instant Deployment", included: true },
      { text: "Edit Code Online", included: true },
      { text: "GitHub Export", included: true },
    ],
    bestFor: "Rapid Prototyping"
  },
  {
    name: "Lovable",
    free: "50 edycji / mies",
    pro: "$20 / mies",
    features: [
      { text: "Visual App Builder", included: true },
      { text: "One-click DB Setup", included: true },
      { text: "Publishing & Hosting", included: true },
      { text: "Custom Domains", included: true },
    ],
    bestFor: "Solo-Founders & MVPs"
  }
];

export default function PricingComparisonPage() {
  return (
    <main className="bg-slate-50 min-h-screen py-20 px-4">
      <SchemaMarkup
        type="Article"
        headline={metadata.title}
        description={metadata.description}
        author="Detektyw Polutek"
        datePublished="2025-03-04"
      />

      <div className="max-w-6xl mx-auto">
        <Link href="/" className="text-blue-600 font-bold mb-12 inline-flex items-center gap-2 hover:gap-3 transition-all">
          <Zap className="w-4 h-4 rotate-180" /> Powrót do bazy wiedzy
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight">Ile kosztuje Vibe Coding?</h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Porównanie planów płatnych najpopularniejszych narzędzi AI. Sprawdź, gdzie Twoje dolary pracują najciężej.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {pricingData.map((tool) => (
            <div key={tool.name} className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm flex flex-col hover:shadow-xl transition-all group">
              <div className="mb-8">
                <h3 className="text-2xl font-black text-slate-900 mb-2">{tool.name}</h3>
                <div className="text-blue-600 font-bold text-sm bg-blue-50 px-3 py-1 rounded-full w-fit">
                  {tool.bestFor}
                </div>
              </div>

              <div className="mb-8">
                <div className="text-4xl font-black text-slate-900">{tool.pro}</div>
                <div className="text-slate-400 text-xs mt-1 uppercase font-bold tracking-widest">Plan Pro</div>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {tool.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    {f.text}
                  </div>
                ))}
              </div>

              <button className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-blue-600 transition-colors">
                Sprawdź {tool.name}
              </button>
            </div>
          ))}
        </div>

        <div className="bg-indigo-600 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Zap className="w-48 h-48" />
          </div>

          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Info className="w-8 h-8" /> Werdykt Polutka
              </h2>
              <p className="text-lg text-indigo-100 mb-6">
                Jeśli masz budżet na tylko jedną subskrypcję – wybierz **Cursor Pro**. To najbardziej uniwersalne narzędzie, które zastąpi Ci 90% pozostałych asystentów.
              </p>
              <div className="flex gap-4">
                <Link href="/porownania/cursor-vs-windsurf" className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors shadow-lg">
                  Cursor vs Windsurf
                </Link>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
               <h4 className="font-bold mb-4 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-emerald-400" /> Ukryty koszt: Tokeny</h4>
               <p className="text-sm text-indigo-100/80 leading-relaxed mb-0">
                  Pamiętaj, że w większości narzędzi po przekroczeniu limitu &quot;Fast Queries&quot; nadal możesz korzystać z AI, ale czas odpowiedzi będzie znacznie dłuższy (tzw. &quot;Slow Requests&quot;).
               </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
