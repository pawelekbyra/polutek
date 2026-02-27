import Image from 'next/image';
import { ArrowRight, Rocket, MessageSquare, ShieldCheck, Wand2, Calculator, Map, Sparkles } from 'lucide-react';
import Link from 'next/link';
import VibeCalculator from '@/app/components/VibeCalculator';
import VibeHero from '@/app/components/VibeHero';
import VibeComparisonToggle from '@/app/components/VibeComparisonToggle';
import VibeScoreTester from '@/app/components/VibeScoreTester';
import SystemPromptGenerator from '@/app/components/SystemPromptGenerator';
import VibeNewsroom from '@/app/components/VibeNewsroom';
import LolekCommentary from '@/app/components/LolekCommentary';
import SchemaMarkup from '@/app/components/SchemaMarkup';

export default function VibeHome() {
  return (
    <main>
      <SchemaMarkup
        type="Article"
        headline="Polutek.pl - Kurs Vibe Codingu i Narzędzia AI dla Programistów"
        description="Największy polski portal o Vibe Codingu. Kursy, tutoriale i porównania narzędzi AI. Dowiedz się jak wejść w programowanie intencyjne w 2025 roku."
        author="Detektyw Polutek"
        datePublished="2025-03-04"
      />
      <VibeHero />
      <VibeComparisonToggle />

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

      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 text-center mb-12">
          <h2 className="text-4xl font-black mb-4 flex items-center justify-center gap-3">
            <Calculator className="w-10 h-10 text-blue-600" /> Ile możesz zaoszczędzić?
          </h2>
          <p className="text-xl text-slate-500">Sprawdź potencjał swojego workflow z asystą AI.</p>
        </div>
        <VibeCalculator />
      </section>

      <VibeScoreTester />
      <div className="max-w-6xl mx-auto px-4">
        <LolekCommentary
          quote="Ludzie myślą, że Vibe Coding to 'nicnierobienie'. Spróbujcie zdebugować agencki workflow bez zrozumienia architektury. Powodzenia, będziecie go potrzebować."
          context="Lolek o realiach pracy"
        />
      </div>
      <SystemPromptGenerator />
      <VibeNewsroom />

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

      {/* Semantic Topic Map */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-4xl font-black mb-6 flex items-center gap-3">
                <Map className="w-10 h-10 text-indigo-600" /> Mapa Tematów Vibe Codingu
              </h2>
              <p className="text-xl text-slate-500">
                Eksploruj ekosystem programowania intencyjnego poprzez nasze dedykowane klastry tematyczne.
              </p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 max-w-sm">
              <div className="flex items-center gap-3 text-indigo-700 font-bold mb-2">
                <Sparkles className="w-5 h-5" /> Nowa Era IT
              </div>
              <p className="text-sm text-indigo-900/70">W 2025 roku granica między pomysłem a realizacją przestaje istnieć. Witamy w erze AI Software Engineering.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <TopicCluster
              title="Niezbędnik Foundera"
              links={[
                { href: '/vibe-coding-dla-founderow', label: 'Budowanie MVP' },
                { href: '/przyszlosc-saas-2025', label: 'Przyszłość SaaS' },
                { href: '/zarabianie-na-vibe-codingu', label: 'Monetyzacja' },
                { href: '/saas-w-24h', label: 'SaaS w 24h Case Study' }
              ]}
            />
            <TopicCluster
              title="Deep Tech & Narzędzia"
              links={[
                { href: '/cursor-vs-vscode-copilot', label: 'Cursor vs Copilot' },
                { href: '/bolt-vs-lovable', label: 'Bolt vs Lovable' },
                { href: '/claude-35-sonnet-vs-gpt-o1', label: 'Claude vs GPT-o1' },
                { href: '/agentic-workflows-tutorial', label: 'Agentic Workflows' }
              ]}
            />
            <TopicCluster
              title="Bezpieczeństwo i Prawo"
              links={[
                { href: '/legalnosc-kodu-ai', label: 'Aspekty Prawne' },
                { href: '/security-audit-checklist', label: 'Security Checklist' },
                { href: '/bezpieczenstwo-kodu-ai', label: 'Ryzyka AI' },
                { href: '/vibe-coding-w-enterprise', label: 'Vibe w Korporacjach' }
              ]}
            />
            <TopicCluster
              title="Kariera i Edukacja"
              links={[
                { href: '/vibe-coding-dla-studentow', label: 'Studia w erze AI' },
                { href: '/przyszlosc-juniorow', label: 'Los Juniorów' },
                { href: '/praca', label: 'Praca w AI' },
                { href: '/scaling-vibe-teams', label: 'Zarządzanie Zespołem' }
              ]}
            />
            <TopicCluster
              title="Branżowe Case Studies"
              links={[
                { href: '/case-study-dashboard-mvp', label: 'Dashboard w 2h' },
                { href: '/case-study-chrome-extension-ai', label: 'Wtyczka Chrome AI' },
                { href: '/vibe-coding-w-medycynie', label: 'Healthcare & MedTech' },
                { href: '/vibe-coding-w-react', label: 'Frontend & React' }
              ]}
            />
            <TopicCluster
              title="Wiedza Teoretyczna"
              links={[
                { href: '/co-to-jest-vibe-coding', label: 'Manifest Vibe Coding' },
                { href: '/roadmap', label: 'Roadmapa 2025' },
                { href: '/slownik', label: 'Słownik Pojęć' },
                { href: '/quiz', label: 'Quiz Readiness' }
              ]}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function TopicCluster({ title, links }: { title: string, links: { href: string, label: string }[] }) {
  return (
    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:border-indigo-200 transition-colors group">
      <h3 className="text-xl font-bold mb-6 text-slate-900 group-hover:text-indigo-600 transition-colors">{title}</h3>
      <ul className="space-y-4">
        {links.map(link => (
          <li key={link.href}>
            <Link href={link.href} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-medium transition-colors text-sm">
              <ArrowRight className="w-4 h-4 text-indigo-400" /> {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface ArticleCardProps {
  href: string;
  title: string;
  desc: string;
  color: string;
  label: string;
  badge?: string;
}

function ArticleCard({ href, title, desc, color, label, badge }: ArticleCardProps) {
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
