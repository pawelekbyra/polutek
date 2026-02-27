import SchemaMarkup from '@/app/components/SchemaMarkup';
import { ArrowRight, Terminal, Zap, Globe, Cpu } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: "Narzędzia Ery Vibe Coding 2025 | Polutek.pl",
  description: "Zestawienie najlepszych narzędzi do programowania z AI. Cursor, Claude, Lovable, Bolt i wiele innych.",
};

export default function ToolsPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <SchemaMarkup
        type="Article"
        headline={metadata.title}
        description={metadata.description}
        author="Detektyw Polutek"
        datePublished="2025-02-21"
      />
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">Narzędzia Ery Vibe Coding 2025</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        <ToolCard
          name="Cursor"
          desc="Obecnie najlepsze IDE do Vibe Codingu. Fork VS Code z natywnym AI (Composer)."
          tag="Złoty Standard"
          icon={<Terminal className="w-6 h-6" />}
        />
        <ToolCard
          name="Claude 3.5 Sonnet"
          desc="Model od Anthropic, który najlepiej rozumie strukturę kodu i rzadziej halucynuje."
          tag="Mózg"
          icon={<Cpu className="w-6 h-6" />}
          href="/claude-code-tutorial"
        />
        <ToolCard
          name="Lovable / Bolt.new"
          desc="Platformy &apos;full-stack in a box&apos;. Pozwalają na deploy aplikacji z jednego promptu."
          tag="Szybkość"
          icon={<Zap className="w-6 h-6" />}
          href="/porownania/bolt-vs-lovable"
        />
        <ToolCard
          name="v0.dev"
          desc="Narzędzie od Vercel do generowania komponentów UI w React i Tailwind CSS."
          tag="Frontend"
          icon={<Globe className="w-6 h-6" />}
        />
      </div>

      <div className="bg-white p-12 rounded-[3rem] border border-slate-200 shadow-xl">
         <h2 className="text-3xl font-bold mb-6">Jak zbudować swój stack?</h2>
         <div className="prose prose-slate max-w-none">
            <p>Dla profesjonalnego developera podstawa to <strong>Cursor + Claude 3.5 Sonnet</strong>. To połączenie daje największą kontrolę nad kodem produkcyjnym. Dla founderów szukających szybkości - <strong><Link href="/porownania/bolt-vs-lovable">Lovable lub Bolt.new</Link></strong> są bezkonkurencyjne.</p>
            <p>Jeśli wolisz pracę w terminalu, koniecznie sprawdź <strong><Link href="/claude-code-tutorial">Claude Code CLI</Link></strong>.</p>
         </div>
         <div className="mt-8">
            <Link href="/ceny-narzedzi-ai-2025" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline">
               Sprawdź aktualny cennik narzędzi 2025 <ArrowRight className="w-4 h-4" />
            </Link>
         </div>
      </div>
    </section>
  );
}

function ToolCard({ name, desc, tag, icon, href }: any) {
  const CardContent = (
    <>
      <div className="flex items-center justify-between mb-6">
         <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">{icon}</div>
         <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded-md">{tag}</span>
      </div>
      <h3 className="text-xl font-bold mb-4">{name}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-6">{desc}</p>
      <div className="flex items-center gap-2 text-sm font-bold text-blue-600 group-hover:gap-3 transition-all">
         Sprawdź <ArrowRight className="w-4 h-4" />
      </div>
    </>
  );

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
      {href ? <Link href={href}>{CardContent}</Link> : CardContent}
    </div>
  );
}
