import Image from 'next/image';
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
              href="/co-to-jest-vibe-coding"
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 group"
            >
              Zacznij tutaj <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
               href="/praca"
               className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center"
            >
              Praca w AI
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
        <h2 className="text-3xl font-bold mb-12 text-center">Centrum Wiedzy Vibe Coding</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
           <ArticleCard
              href="/praca"
              title="Zarabiaj na AI (Outlier)"
              desc="Zarabiaj w USD trenując modele językowe. Elastyczna praca zdalna dla każdego."
              color="from-blue-600 to-indigo-700"
              label="PRACA"
              badge="Hot"
           />
           <ArticleCard
              href="/zarabianie-na-vibe-codingu"
              title="Jak na tym zarabiać?"
              desc="Pomysły na biznes i monetyzację umiejętności pracy z AI w 2025 roku."
              color="from-yellow-400 to-amber-600"
              label="Biznes"
           />
           <ArticleCard
              href="/saas-w-24h"
              title="SaaS w 24 godziny"
              desc="Case study budowy i wdrożenia produktu w rekordowym czasie przez jedną osobę."
              color="from-indigo-500 to-cyan-500"
              label="Success Story"
           />
           <ArticleCard
              href="/najlepsze-prompty-vibe-coding"
              title="Biblioteka Promptów"
              desc="Gotowe szablony do Cursora, które przyspieszą Twoją pracę o 300%."
              color="from-slate-700 to-slate-900"
              label="Narzędzia"
           />
           <ArticleCard
              href="/co-to-jest-vibe-coding"
              title="Czym jest Vibe Coding? Manifest nowej ery"
              desc="Odkryj dlaczego Andrej Karpathy uważa, że programowanie jakie znamy dobiega końca..."
              color="from-blue-500 to-indigo-600"
              label="Edukacja"
           />
           <ArticleCard
              href="/andrej-karpathy"
              title="Wizja Andreja Karpathy&apos;ego"
              desc="Dlaczego jeden z twórców OpenAI twierdzi, że nie będziemy już pisać kodu?"
              color="from-purple-500 to-pink-600"
              label="Ludzie"
           />
           <ArticleCard
              href="/jak-zaczac-z-cursorem"
              title="Jak zacząć z Cursorem?"
              desc="Kompletny poradnik konfiguracji i pierwszych kroków w najlepszym edytorze AI."
              color="from-orange-400 to-red-500"
              label="Tutorial"
           />
           <ArticleCard
              href="/narzedzia-ai"
              title="Top 5 narzędzi 2025"
              desc="Cursor, Claude 3.5 Sonnet, Bolt.new... sprawdzamy liderów rynku AI Coding."
              color="from-slate-800 to-slate-900"
              label="Stack"
           />
           <ArticleCard
              href="/vibe-coding-w-enterprise"
              title="Vibe Coding w Enterprise"
              desc="Jak skalować programowanie intencyjne w dużych organizacjach i korporacjach."
              color="from-blue-700 to-indigo-900"
              label="Enterprise"
           />
           <ArticleCard
              href="/vibe-coding-w-react"
              title="Vibe Coding w React"
              desc="Jak budować nowoczesne UI 10x szybciej z Next.js i Tailwind CSS."
              color="from-blue-400 to-blue-600"
              label="Frontend"
           />
           <ArticleCard
              href="/najlepsze-modele-ai-2025"
              title="Ranking Modeli AI 2025"
              desc="Claude, GPT-4o czy DeepSeek? Sprawdzamy co wybrać do pisania kodu."
              color="from-orange-500 to-red-600"
              label="AI"
           />
           <ArticleCard
              href="/przyszlosc-juniorow"
              title="Przyszłość Juniorów"
              desc="Czy Vibe Coding to koniec kariery dla początkujących programistów?"
              color="from-amber-400 to-orange-500"
              label="Kariera"
           />
           <ArticleCard
              href="/bezpieczenstwo-kodu-ai"
              title="Bezpieczeństwo Kodu"
              desc="Na co uważać, gdy AI pisze za Ciebie kod? Poznaj kluczowe zagrożenia."
              color="from-red-500 to-rose-700"
              label="Security"
           />
           <ArticleCard
              href="/psychologia-vibe-codingu"
              title="Psychologia Tworzenia"
              desc="Jak programowanie intencyjne zmienia nasz proces myślowy i redukuje stres."
              color="from-teal-400 to-emerald-500"
              label="Psychologia"
           />
           <ArticleCard
              href="/vibe-coding-vs-no-code"
              title="Vibe vs No-Code"
              desc="Dlaczego programowanie intencyjne to lepsza przyszłość niż Bubble czy Webflow."
              color="from-slate-400 to-slate-600"
              label="Analiza"
           />
           <ArticleCard
              href="/vibe-coding-vs-prompt-engineering"
              title="Vibe vs Prompting"
              desc="Jaka jest różnica między zwykłym pisaniem promptów a programowaniem intencyjnym?"
              color="from-emerald-500 to-teal-600"
              label="Teoria"
           />
           <ArticleCard
              href="/vibe-coding-dla-founderow"
              title="Vibe Coding dla Founderów"
              desc="Jak budować MVP i walidować pomysły bez zespołu technicznego."
              color="from-indigo-600 to-blue-800"
              label="Biznes"
           />
           <ArticleCard
              href="/legalnosc-kodu-ai"
              title="Prawo a Kod z AI"
              desc="Kto posiada prawa autorskie do kodu wygenerowanego przez sztuczną inteligencję?"
              color="from-slate-500 to-slate-700"
              label="Legal"
           />
           <ArticleCard
              href="/deepseek-v3-vs-claude-35"
              title="DeepSeek V3 vs Claude 3.5"
              desc="Szczegółowe porównanie dwóch najpotężniejszych modeli do programowania."
              color="from-purple-600 to-indigo-600"
              label="Modele"
           />
           <ArticleCard
              href="/zaawansowany-cursor"
              title="Zaawansowany Cursor"
              desc="Opanuj .cursorrules, Composer i zaawansowany kontekst na poziomie PRO."
              color="from-blue-900 to-slate-900"
              label="Tutorial"
           />
        </div>
      </section>
    </main>
  );
}

function ArticleCard({ href, title, desc, color, label, badge }: any) {
  return (
    <article className="group">
      <Link href={href}>
        <div className="aspect-video bg-slate-200 rounded-2xl mb-6 overflow-hidden relative">
          <div className={`w-full h-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-3xl font-bold text-center p-4 transition-transform duration-500 group-hover:scale-110`}>
            {label}
          </div>
          {badge && (
            <div className="absolute top-2 right-2 bg-yellow-400 text-slate-900 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter animate-pulse">
               {badge}
            </div>
          )}
        </div>
        <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors leading-tight">{title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          {desc}
        </p>
      </Link>
    </article>
  );
}
