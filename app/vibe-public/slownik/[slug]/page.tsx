import { glossaryTerms } from '@/lib/vibe-data';
import { notFound } from 'next/navigation';
import SchemaMarkup from '@/app/components/SchemaMarkup';
import { ArrowLeft, Book, Tag, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  return glossaryTerms.map((term) => ({
    slug: term.slug,
  }));
}

export async function generateMetadata({ params }: any) {
  const term = glossaryTerms.find(t => t.slug === params.slug);
  if (!term) return {};

  return {
    title: `${term.term} - Definicja i Wyjaśnienie | Słownik Vibe Coding`,
    description: term.definition,
    keywords: `${term.term.toLowerCase()}, co to jest ${term.term.toLowerCase()}, definicja ${term.term.toLowerCase()}, vibe coding`,
  };
}

export default function GlossaryTermPage({ params }: any) {
  const term = glossaryTerms.find(t => t.slug === params.slug);

  if (!term) notFound();

  return (
    <article className="max-w-4xl mx-auto px-4 py-20">
      <SchemaMarkup
        type="Article"
        headline={`${term.term} - Słownik Vibe Coding`}
        description={term.definition}
        author="Detektyw Polutek"
        datePublished="2025-02-27"
      />

      <Link href="/slownik" className="inline-flex items-center gap-2 text-blue-600 font-bold mb-12 hover:gap-3 transition-all">
        <ArrowLeft className="w-4 h-4" /> Powrót do słownika
      </Link>

      <div className="bg-white rounded-[3rem] p-8 md:p-16 border border-slate-200 shadow-xl overflow-hidden relative">
         <div className="absolute top-0 right-0 p-8 opacity-5">
            <Book className="w-40 h-40" />
         </div>

         <div className="relative z-10">
            <div className="flex items-center gap-2 text-blue-600 font-bold uppercase tracking-widest text-xs mb-6 bg-blue-50 w-fit px-3 py-1 rounded-full border border-blue-100">
               <Tag className="w-3 h-3" /> {term.category}
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-8 text-slate-900 tracking-tight">{term.term}</h1>

            <p className="lead text-2xl text-slate-600 font-medium mb-12 leading-relaxed">
               {term.definition}
            </p>

            <div className="prose prose-slate prose-lg max-w-none mb-16">
               <h2 className="text-3xl font-bold mb-6">Głębokie wyjaśnienie</h2>
               <p className="text-slate-600 leading-relaxed">
                  {term.longDescription}
               </p>
            </div>

            {term.relatedTerms.length > 0 && (
              <div className="pt-12 border-t border-slate-100">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  Powiązane pojęcia:
                </h3>
                <div className="flex flex-wrap gap-3">
                   {term.relatedTerms.map(slug => {
                     const related = glossaryTerms.find(t => t.slug === slug);
                     if (!related) return null;
                     return (
                       <Link
                         key={slug}
                         href={`/slownik/${slug}`}
                         className="px-6 py-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-2xl text-slate-700 hover:text-blue-700 font-bold transition-all flex items-center gap-2"
                       >
                         {related.term} <ChevronRight className="w-4 h-4" />
                       </Link>
                     );
                   })}
                </div>
              </div>
            )}
         </div>
      </div>
    </article>
  );
}
