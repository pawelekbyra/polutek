import { comparisons } from '@/lib/vibe-data';
import { notFound } from 'next/navigation';
import SchemaMarkup from '@/app/components/SchemaMarkup';
import { Swords, CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  return comparisons.map((comp) => ({
    slug: comp.slug,
  }));
}

export async function generateMetadata({ params }: any) {
  const comp = comparisons.find(c => c.slug === params.slug);
  if (!comp) return {};
  return {
    title: `${comp.title}: Które narzędzie AI wybrać w 2025? | Polutek.pl`,
    description: `Bezpośrednie starcie ${comp.itemA} vs ${comp.itemB}. Sprawdź benchmarki, ceny i wyniki w Vibe Codingu.`,
  };
}

export default function ComparisonPage({ params }: any) {
  const comp = comparisons.find(c => c.slug === params.slug);
  if (!comp) notFound();

  return (
    <article className="max-w-4xl mx-auto px-4 py-20">
      <SchemaMarkup
        type="Article"
        headline={comp.title}
        description={`Porównanie ${comp.itemA} oraz ${comp.itemB} pod kątem programowania z AI.`}
        author="Detektyw Polutek"
        datePublished="2025-02-27"
      />

      <Link href="/" className="text-blue-600 font-bold mb-8 inline-flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" /> Powrót do bazy wiedzy
      </Link>

      <h1 className="text-4xl md:text-6xl font-black mb-12 tracking-tight">{comp.title}</h1>

      <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white mb-16 shadow-2xl">
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center">
               <div className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-4">OPCJA A</div>
               <div className="text-4xl font-black">{comp.itemA}</div>
            </div>
            <div className="flex justify-center text-slate-700">
               <Swords className="w-16 h-16" />
            </div>
            <div className="text-center">
               <div className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-4">OPCJA B</div>
               <div className="text-4xl font-black">{comp.itemB}</div>
            </div>
         </div>
      </div>

      <div className="space-y-8 mb-16">
         {comp.features.map((f, i) => (
           <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold mb-4">{f.name}</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                 <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: `${f.scoreA * 10}%` }} />
                 </div>
                 <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: `${f.scoreB * 10}%` }} />
                 </div>
              </div>
              <p className="text-slate-600 text-sm">{f.desc}</p>
           </div>
         ))}
      </div>

      <div className="bg-indigo-600 p-12 rounded-[3rem] text-white">
         <h2 className="text-3xl font-black mb-6">Ostateczny Werdykt</h2>
         <p className="text-xl font-medium mb-0 opacity-90 leading-relaxed italic">&quot;{comp.verdict}&quot;</p>
      </div>
    </article>
  );
}
