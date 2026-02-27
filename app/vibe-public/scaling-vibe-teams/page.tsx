import { Users, LayoutGrid, Zap } from 'lucide-react';
import SchemaMarkup from '@/app/components/SchemaMarkup';

export const metadata = {
  title: "Scaling Vibe Teams: Jak zarządzać zespołem 10x developerów | Polutek.pl",
  description: "Zasady zarządzania w nowoczesnym software housie. Jak uniknąć chaosu w kodzie, gdy wszyscy używają AI.",
};

export default function TeamsPage() {
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
        <Users className="w-12 h-12 text-blue-700" /> Scaling Vibe Teams
      </h1>
      <div className="prose prose-slate prose-lg max-w-none">
        <p className="lead text-xl text-slate-600 mb-8">
          Praca w zespole, gdzie każdy produkuje 1000 linii kodu dziennie z pomocą AI, to wyzwanie dla architektury i code review.
        </p>

        <h2 className="text-3xl font-bold mt-12 mb-6 text-indigo-900">1. Standardy ponad wszystko</h2>
        <p>
          W Vibe Teams, <strong>.cursorrules</strong> to nowa konstytucja projektu. Każdy członek zespołu musi mieć zsynchronizowane zasady dla AI, aby kod był spójny.
        </p>

        <div className="bg-slate-50 border-l-8 border-slate-900 p-8 my-12 rounded-r-2xl">
           <h3 className="text-xl font-bold mb-4">Złote zasady skalowania:</h3>
           <ul className="space-y-4 font-medium">
             <li className="flex gap-2"><span>🚀</span> <strong>Small Components:</strong> AI najlepiej radzi sobie z małymi, izolowanymi modułami.</li>
             <li className="flex gap-2"><span>🔍</span> <strong>AI Code Review:</strong> Używaj osobnego agenta AI do sprawdzania PRów innych programistów.</li>
             <li className="flex gap-2"><span>🧪</span> <strong>Test-Driven Vibe:</strong> Pisz testy zanim pozwolisz AI napisać logikę biznesową.</li>
           </ul>
        </div>

        <h2 className="text-3xl font-bold mt-16 mb-6">Rola Team Leadera</h2>
        <p>
          W 2025 roku Team Leader staje się <strong>Reviewerem Intencji</strong>. Zamiast sprawdzać czy średnik jest na miejscu, sprawdza czy implementacja AI realizuje cel biznesowy bez długu technicznego.
        </p>
      </div>
    </section>
  );
}
