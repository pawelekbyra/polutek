import SchemaMarkup from '@/app/components/SchemaMarkup';
import { Brain, Sparkles, Zap } from 'lucide-react';

export const metadata = {
  title: "Psychologia Vibe Codingu: Jak AI zmienia nasze myślenie | Polutek.pl",
  description: "Dlaczego programowanie intencyjne redukuje stres i pozwala na większą kreatywność. Analiza kognitywna.",
};

export default function PsychPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <SchemaMarkup
        type="Article"
        headline={metadata.title}
        description={metadata.description}
        author="Detektyw Polutek"
        datePublished="2025-02-21"
      />
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Psychologia Vibe Codingu</h1>
      <div className="prose prose-slate prose-lg max-w-none">
        <p className="lead text-xl text-slate-600 mb-12">
          Programowanie od zawsze było kojarzone z frustracją, debugowaniem i poczuciem przytłoczenia. Vibe coding odwraca te proporcje.
        </p>

        <h2 className="text-3xl font-bold mt-12 mb-6">Stan Flow bez barier</h2>
        <p>
          W tradycyjnym kodowaniu stan <strong>Flow</strong> jest często przerywany przez błędy składniowe lub konieczność szukania dokumentacji. AI przejmuje te &quot;kognitywne tarcia&quot;, pozwalając programiście pozostać na poziomie problemu biznesowego.
        </p>

        <div className="grid md:grid-cols-2 gap-8 my-12">
           <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 shadow-sm">
             <Brain className="w-10 h-10 text-blue-600 mb-4" />
             <h4 className="font-bold mb-2">Redukcja Cognitive Load</h4>
             <p className="text-sm">Nie musisz pamiętać każdego API. Twój mózg ma więcej miejsca na architekturę i logikę.</p>
           </div>
           <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 shadow-sm">
             <Sparkles className="w-10 h-10 text-emerald-600 mb-4" />
             <h4 className="font-bold mb-2">Poczucie Sprawstwa</h4>
             <p className="text-sm">Dostarczanie działającego kodu w sekundy daje natychmiastową nagrodę dopaminową.</p>
           </div>
        </div>

        <h2 className="text-3xl font-bold mt-16 mb-6">Ryzyko: Utrata umiejętności?</h2>
        <p>
          Psycholodzy ostrzegają przed nadmiernym poleganiem na AI (automation bias). Kluczem jest bycie &quot;aktywnym pilotem&quot; – zrozumienie tego, co AI wygenerowało, nawet jeśli sami byśmy tego nie napisali tak szybko.
        </p>
      </div>
    </section>
  );
}
