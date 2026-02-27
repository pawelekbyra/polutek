import SchemaMarkup from '@/app/components/SchemaMarkup';
import { DollarSign, Briefcase, Rocket, Globe } from 'lucide-react';

export const metadata = {
  title: "Jak zarabiać na Vibe Codingu w 2025 roku? | Polutek.pl",
  description: "Przewodnik po monetyzacji umiejętności programowania intencyjnego. Freelance, SaaS i automatyzacja procesów.",
};

export default function EarnPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <SchemaMarkup
        type="Article"
        headline={metadata.title}
        description={metadata.description}
        author="Detektyw Polutek"
        datePublished="2025-02-21"
      />
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Jak zarabiać na Vibe Codingu?</h1>
      <div className="prose prose-slate prose-lg max-w-none">
        <p className="lead text-xl text-slate-600 mb-12">
          Umiejętność szybkiego dostarczania oprogramowania to najbardziej pożądany towar na rynku 2025 roku. Oto 3 konkretne ścieżki monetyzacji.
        </p>

        <div className="space-y-8">
           <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex gap-6 items-start">
              <div className="bg-green-50 p-4 rounded-2xl text-green-600"><DollarSign className="w-8 h-8" /></div>
              <div>
                 <h3 className="text-2xl font-bold">1. AI Freelance</h3>
                 <p className="text-slate-600">Dostarczaj projekty klientom 5x szybciej niż konkurencja. Rozliczaj się za wartość (Fixed Price), a nie za godziny pracy.</p>
              </div>
           </div>
           <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex gap-6 items-start">
              <div className="bg-blue-50 p-4 rounded-2xl text-blue-600"><Rocket className="w-8 h-8" /></div>
              <div>
                 <h3 className="text-2xl font-bold">2. Solopreneur SaaS</h3>
                 <p className="text-slate-600">Buduj własne mikro-narzędzia, które rozwiązują specyficzne problemy niszowe. Z AI jesteś w stanie samemu dbać o produkt.</p>
              </div>
           </div>
           <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex gap-6 items-start">
              <div className="bg-purple-50 p-4 rounded-2xl text-purple-600"><Briefcase className="w-8 h-8" /></div>
              <div>
                 <h3 className="text-2xl font-bold">3. Konsultant Vibe Codingu</h3>
                 <p className="text-slate-600">Pomagaj firmom wdrażać Cursora i AI Workflows. Edukacja zespołów deweloperskich to obecnie ogromny rynek.</p>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
