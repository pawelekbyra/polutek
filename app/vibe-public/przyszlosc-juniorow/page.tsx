import SchemaMarkup from '@/app/components/SchemaMarkup';
import { UserMinus, TrendingUp, GraduationCap } from 'lucide-react';
import LolekCommentary from '@/app/components/LolekCommentary';

export const metadata = {
  title: "Przyszłość Juniorów w Erze AI: Czy to koniec zawodu? | Polutek.pl",
  description: "Analiza rynku pracy dla początkujących programistów. Jak junior może przetrwać i wygrywać dzięki Vibe Codingowi.",
};

export default function JuniorPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <SchemaMarkup
        type="Article"
        headline={metadata.title}
        description={metadata.description}
        author="Detektyw Polutek"
        datePublished="2025-02-21"
      />
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Przyszłość Juniorów w Erze AI</h1>
      <div className="prose prose-slate prose-lg max-w-none">
        <p className="lead text-xl text-slate-600 mb-12">
          Pytanie nie brzmi: &quot;Czy AI zastąpi juniorów?&quot;. Pytanie brzmi: &quot;Którzy juniorzy przetrwają i jak szybko staną się seniorami?&quot;
        </p>

        <h2 className="text-3xl font-bold mt-12 mb-6">Śmierć &quot;Klepacza Kodu&quot;</h2>
        <p>
          Osoby, które postrzegają programowanie jako przepisanie makiety Figma na HTML i CSS, mają problem. AI robi to w 5 sekund. Rynek juniorów zmienia się z <strong>operacyjnego</strong> na <strong>koncepcyjny</strong>.
        </p>

        <LolekCommentary
          quote="Juniorzy, przestańcie płakać nad końcem Reacta. Zacznijcie płakać nad tym, że nadal nie rozumiecie jak działają bazy danych. AI wygeneruje wam Selecta, ale nie naprawi wam spierdzielonego schematu."
          context="Lolek o 'końcu' juniorów"
        />

        <div className="bg-slate-900 text-white p-10 rounded-3xl my-12 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-20"><UserMinus className="w-24 h-24" /></div>
           <h3 className="text-2xl font-bold mb-6 relative z-10 text-blue-400">Jak się wyróżnić w 2025?</h3>
           <ul className="space-y-4 relative z-10">
             <li className="flex gap-3">
               <TrendingUp className="w-6 h-6 text-emerald-400 shrink-0" />
               <span><strong>Dostarczaj produkty, nie feature&apos;y:</strong> Użyj AI, aby samemu zbudować 3 działające aplikacje w portfolio.</span>
             </li>
             <li className="flex gap-3">
               <GraduationCap className="w-6 h-6 text-emerald-400 shrink-0" />
               <span><strong>Zrozum fundamenty:</strong> Skup się na tym, *dlaczego* coś działa, a nie jak to zapisać. AI zajmie się zapisem.</span>
             </li>
           </ul>
        </div>

        <h2 className="text-3xl font-bold mt-16 mb-6">Wniosek</h2>
        <p>
          Vibe coding to dla juniora potężny lewar. Pozwala skrócić drogę do bycia Fullstackiem z lat do miesięcy. Warunkiem jest jednak posiadanie &quot;produktu&quot; w centrum uwagi zamiast &quot;składni&quot;.
        </p>
      </div>
    </section>
  );
}
