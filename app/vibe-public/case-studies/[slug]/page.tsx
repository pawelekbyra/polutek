import { caseStudies } from '@/lib/vibe-data';
import { notFound } from 'next/navigation';
import SchemaMarkup from '@/app/components/SchemaMarkup';
import { Rocket, Target, Zap, CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({
    slug: cs.slug,
  }));
}

export async function generateMetadata({ params }: any) {
  const cs = caseStudies.find(c => c.slug === params.slug);
  if (!cs) return {};
  return {
    title: `Case Study: ${cs.title} | Polutek.pl`,
    description: cs.summary,
  };
}

export default function CaseStudyPage({ params }: any) {
  const cs = caseStudies.find(c => c.slug === params.slug);
  if (!cs) notFound();

  return (
    <article className="max-w-4xl mx-auto px-4 py-20">
      <SchemaMarkup
        type="Article"
        headline={cs.title}
        description={cs.summary}
        author="Detektyw Polutek"
        datePublished="2025-02-27"
      />

      <Link href="/" className="text-blue-600 font-bold mb-8 inline-flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" /> Powrót do strony głównej
      </Link>

      <div className="mb-16">
         <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-bold text-xs uppercase mb-6">
            <Rocket className="w-3 h-3" /> Case Study
         </div>
         <h1 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">{cs.title}</h1>
         <div className="flex flex-wrap gap-3">
            {cs.stack.map(s => <span key={s} className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold text-slate-500">{s}</span>)}
         </div>
      </div>

      <div className="prose prose-slate prose-lg max-w-none">
         <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 m-0 text-slate-900"><Target className="w-6 h-6 text-red-500" /> Wyzwanie</h2>
            <p className="mb-0 text-slate-600">{cs.challenge}</p>
         </div>

         <div className="bg-blue-600 p-10 rounded-[3rem] text-white shadow-xl mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 m-0 text-white"><Zap className="w-6 h-6" /> Rozwiązanie (Vibe Coding)</h2>
            <p className="mb-0 opacity-90">{cs.solution}</p>
         </div>

         <div className="bg-emerald-50 p-10 rounded-[3rem] border border-emerald-100 mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 m-0 text-emerald-900"><CheckCircle2 className="w-6 h-6 text-emerald-500" /> Wynik</h2>
            <p className="mb-0 text-emerald-800 font-medium">{cs.result}</p>
         </div>
      </div>
    </article>
  );
}
