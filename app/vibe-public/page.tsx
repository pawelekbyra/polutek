import { ArrowRight, Rocket, MessageSquare, ShieldCheck, Wand2 } from 'lucide-react';
import Link from 'next/link';

export default function VibeHome() {
  return (
    <main>
      <section className="pt-20 pb-32 px-4 overflow-hidden relative">
        <div className="absolute top-20 right-[-10%] w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 z-0"></div>
        <div className="absolute bottom-0 left-[-5%] w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-50 z-0"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-xs font-bold uppercase tracking-wider mb-8">
            <Wand2 className="w-3 h-3" /> Era Programowania Intencyjnego
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            Vibe Coding: Programuj <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Szybkością Myśli</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Zapomnij o mozolnym klepaniu kodu. Witamy w świecie, gdzie Twoim głównym narzędziem jest język naturalny, a AI zajmuje się implementacją.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/vibe-public/co-to-jest-vibe-coding"
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 group"
            >
              Zacznij tutaj <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
               href="/vibe-public/narzedzia-ai"
               className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center"
            >
              Zobacz narzędzia
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats/Features */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center text-blue-600">
              <Rocket className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">10x Szybciej</h3>
            <p className="text-slate-500">Twórz prototypy i pełne aplikacje w ułamku czasu potrzebnego na tradycyjne programowanie.</p>
          </div>
          <div className="space-y-4">
            <div className="bg-indigo-50 w-12 h-12 rounded-lg flex items-center justify-center text-indigo-600">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Język Naturalny</h3>
            <p className="text-slate-500">Komunikuj się z IDE tak, jakbyś rozmawiał z doświadczonym seniorem, który nigdy nie śpi.</p>
          </div>
          <div className="space-y-4">
            <div className="bg-emerald-50 w-12 h-12 rounded-lg flex items-center justify-center text-emerald-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Skupienie na Logice</h3>
            <p className="text-slate-500">Przestań walczyć ze składnią i błędami typów. Skup się na architekturze i wartości biznesowej.</p>
          </div>
        </div>
      </section>

      {/* SEO Articles Preview */}
      <section className="py-24 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12">Najnowsze Artykuły</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
           <article className="group">
             <Link href="/vibe-public/co-to-jest-vibe-coding">
               <div className="aspect-video bg-slate-200 rounded-2xl mb-6 overflow-hidden">
                 <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold">
                    Vibe Coding?
                 </div>
               </div>
               <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">Czym właściwie jest Vibe Coding? Manifest nowej ery</h3>
               <p className="text-slate-600 leading-relaxed">
                 Odkryj dlaczego Andrej Karpathy uważa, że programowanie jakie znamy dobiega końca...
               </p>
             </Link>
           </article>
           <article className="group">
             <Link href="/vibe-public/andrej-karpathy">
               <div className="aspect-video bg-slate-200 rounded-2xl mb-6 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-4xl font-bold text-center p-4">
                    Karpathy Vision
                 </div>
               </div>
               <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">Wizja Andreja Karpathy'ego</h3>
               <p className="text-slate-600 leading-relaxed">
                 Dlaczego jeden z twórców OpenAI twierdzi, że nie będziemy już pisać kodu?
               </p>
             </Link>
           </article>
           <article className="group">
             <Link href="/vibe-public/narzedzia-ai">
               <div className="aspect-video bg-slate-200 rounded-2xl mb-6 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-white text-4xl font-bold">
                    Tools 2025
                 </div>
               </div>
               <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">Top 5 narzędzi do Vibe Codingu w 2025 roku</h3>
               <p className="text-slate-600 leading-relaxed">
                 Cursor, Claude 3.5 Sonnet, Bolt.new... sprawdzamy które narzędzia dają największą przewagę.
               </p>
             </Link>
           </article>
           <article className="group">
             <Link href="/vibe-public/jak-zaczac-z-cursorem">
               <div className="aspect-video bg-slate-200 rounded-2xl mb-6 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-4xl font-bold text-center p-4">
                    Cursor Tutorial
                 </div>
               </div>
               <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">Jak zacząć z Cursorem?</h3>
               <p className="text-slate-600 leading-relaxed">
                 Kompletny poradnik konfiguracji i pierwszych kroków w najpopularniejszym edytorze AI...
               </p>
             </Link>
           </article>
           <article className="group">
             <Link href="/vibe-public/vibe-coding-vs-prompt-engineering">
               <div className="aspect-video bg-slate-200 rounded-2xl mb-6 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-4xl font-bold text-center p-4">
                    Vibe vs Prompt
                 </div>
               </div>
               <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">Vibe Coding vs Prompt Engineering</h3>
               <p className="text-slate-600 leading-relaxed">
                 Jaka jest różnica między zwykłym pisaniem promptów a programowaniem intencyjnym?
               </p>
             </Link>
           </article>
        </div>
      </section>
    </main>
  );
}
