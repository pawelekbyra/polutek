import { comparisons } from '@/lib/vibe-data';
import SchemaMarkup from '@/app/components/SchemaMarkup';
import { Swords, ArrowRight, Zap, Brain } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: "Porównania Narzędzi i Modeli AI 2025 | Polutek.pl",
  description: "Bezpośrednie starcia Cursor vs VS Code, Claude vs GPT-o1 i innych. Sprawdź, co najlepiej sprawdzi się w Twoim workflow Vibe Codingu.",
};

export default function ComparisonsListPage() {
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
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10"><Swords className="w-32 h-32 rotate-12" /></div>
          <div className="absolute bottom-10 right-10"><Zap className="w-32 h-32 -rotate-12" /></div>
        </div>

        <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight relative z-10">Bitwa o Efektywność</h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto relative z-10 leading-relaxed">
          Zamiast czytać marketingowe obietnice, sprawdź realne porównania narzędzi w paradygmacie programowania intencyjnego.
        </p>
      </section>

      <div className="max-w-6xl mx-auto py-20 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {comparisons.map((comp) => (
            <Link
              key={comp.slug}
              href={`/porownania/${comp.slug}`}
              className="group bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm hover:shadow-2xl transition-all hover:-translate-y-1 overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Swords className="w-32 h-32" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 text-blue-600 font-bold uppercase tracking-widest text-xs mb-6 bg-blue-50 w-fit px-3 py-1 rounded-full">
                  <Brain className="w-3 h-3" /> Pojedynek 2025
                </div>

                <h2 className="text-3xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {comp.itemA} <span className="text-slate-300 mx-2 text-2xl font-light">vs</span> {comp.itemB}
                </h2>

                <p className="text-slate-500 mb-8 leading-relaxed line-clamp-2">
                  {comp.verdict}
                </p>

                <div className="flex items-center gap-2 text-blue-600 font-bold">
                  Sprawdź werdykt <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}

          {/* Static Comparison Cards for SEO and Variety */}
          <Link
            href="/porownania/cursor-vs-vscode-copilot"
            className="group bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm hover:shadow-2xl transition-all hover:-translate-y-1 overflow-hidden relative"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-indigo-600 font-bold uppercase tracking-widest text-xs mb-6 bg-indigo-50 w-fit px-3 py-1 rounded-full">
                <Zap className="w-3 h-3" /> Klasyk vs Nowość
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">
                Cursor <span className="text-slate-300 mx-2 text-2xl font-light">vs</span> VS Code + Copilot
              </h2>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Czy natywne AI w edytorze wygrywa z najpopularniejszym asystentem świata?
              </p>
              <div className="flex items-center gap-2 text-indigo-600 font-bold">
                Czytaj porównanie <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </Link>

          <Link
            href="/porownania/bolt-vs-lovable"
            className="group bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm hover:shadow-2xl transition-all hover:-translate-y-1 overflow-hidden relative"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-purple-600 font-bold uppercase tracking-widest text-xs mb-6 bg-purple-50 w-fit px-3 py-1 rounded-full">
                <Sparkles className="w-3 h-3" /> Fullstack AI
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-4 group-hover:text-purple-600 transition-colors">
                Bolt.new <span className="text-slate-300 mx-2 text-2xl font-light">vs</span> Lovable
              </h2>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Porównanie dwóch najgorętszych platform &quot;App-in-a-box&quot; 2025 roku.
              </p>
              <div className="flex items-center gap-2 text-purple-600 font-bold">
                Sprawdź możliwości <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </div>

      <section className="max-w-4xl mx-auto pb-32 px-4 text-center">
         <div className="bg-blue-600 p-12 rounded-[3rem] text-white shadow-2xl">
            <h2 className="text-3xl font-bold mb-6">Wybierz odpowiedni stack</h2>
            <p className="text-blue-100 mb-0 leading-relaxed">
              Nie ma jednego idealnego narzędzia dla każdego. Nasze porównania pomogą Ci zaoszczędzić tysiące złotych na błędnych subskrypcjach i setki godzin na złych workflowach.
            </p>
         </div>
      </section>
    </main>
  );
}

function Sparkles(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}
