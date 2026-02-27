import { Bot, Workflow, Cpu } from 'lucide-react';
import SchemaMarkup from '@/app/components/SchemaMarkup';

export const metadata = {
  title: "Agentic Workflows: Tutorial Programowania Autonomicznego | Polutek.pl",
  description: "Jak zbudować system, w którym AI agenci współpracują ze sobą nad Twoim kodem. Tutorial krok po kroku.",
};

export default function AgenticPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <SchemaMarkup
        type="Article"
        headline={metadata.title}
        description={metadata.description}
        author="Detektyw Polutek"
        datePublished="2025-02-21"
      />
      <h1 className="text-4xl md:text-5xl font-bold mb-8 flex items-center gap-4">
        <Bot className="w-12 h-12 text-emerald-600" /> Agentic Workflows Tutorial
      </h1>
      <div className="prose prose-slate prose-lg max-w-none">
        <p className="lead text-xl text-slate-600 mb-8">
          Vibe coding ewoluuje w stronę <strong>Agentic Coding</strong>. To już nie jest tylko autouzupełnianie, to delegowanie całych zadań inżynieryjnych.
        </p>

        <h2 className="text-3xl font-bold mt-12 mb-6">Czym jest Agentic Flow?</h2>
        <p>
          W tradycyjnym workflow Ty prosisz, AI odpowiada. W workflow agentycznym, AI <strong>planuje, wykonuje, testuje i poprawia</strong> aż do osiągnięcia celu.
        </p>

        <div className="bg-emerald-50 p-8 rounded-2xl my-10 border border-emerald-100 shadow-inner">
           <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-emerald-900"><Workflow className="w-6 h-6" /> 3 Kroki do Automatyzacji:</h3>
           <ol className="space-y-4">
             <li><strong>1. Definicja Celi:</strong> &quot;Zaimplementuj system subskrypcji Stripe z obsługą webhooków&quot;.</li>
             <li><strong>2. Planowanie:</strong> Agent rozbija to na: schema bazy, UI, API routes, security.</li>
             <li><strong>3. Pętla wykonawcza:</strong> Agent pisze kod, uruchamia testy, jeśli failują - poprawia sam siebie.</li>
           </ol>
        </div>

        <h2 className="text-3xl font-bold mt-16 mb-6">Narzędzia do pracy agentycznej</h2>
        <p>
          Najlepsze efekty uzyskasz łącząc <strong>Cursor Composer</strong> z zewnętrznymi agentami typu <strong>Devin</strong> lub <strong>OpenDevin</strong>. Pozwalają one na wielogodzinną, autonomiczną pracę nad projektem.
        </p>
      </div>
    </section>
  );
}
