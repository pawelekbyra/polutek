import SchemaMarkup from '@/app/components/SchemaMarkup';
import { MessageSquareCode, Wand2, Lightbulb } from 'lucide-react';

export const metadata = {
  title: "Vibe Coding vs Prompt Engineering: Jaka jest różnica? | Polutek.pl",
  description: "Zrozum różnicę między prostym pisaniem promptów a zarządzaniem intencją projektu w IDE. Porównanie workflow.",
};

export default function vsPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <SchemaMarkup
        type="Article"
        headline={metadata.title}
        description={metadata.description}
        author="Detektyw Polutek"
        datePublished="2025-02-21"
      />
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Vibe Coding vs Prompt Engineering</h1>
      <div className="prose prose-slate prose-lg max-w-none">
        <p className="lead text-xl text-slate-600 mb-12">
          Wiele osób myli te dwa pojęcia, ale różnica między nimi to różnica między pisaniem listu a prowadzeniem orkiestry.
        </p>

        <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
          <MessageSquareCode className="w-8 h-8 text-slate-400" /> Prompt Engineering: Statyczna Instrukcja
        </h2>
        <p>
          Prompt engineering to umiejętność konstruowania zapytań (inputu), aby uzyskać pożądany wynik (output). Często odbywa się w odizolowanym oknie chatu. Skupia się na <strong>jednorazowej interakcji</strong>.
        </p>

        <h2 className="text-3xl font-bold mt-16 mb-6 flex items-center gap-3 text-blue-600">
          <Wand2 className="w-8 h-8" /> Vibe Coding: Dynamiczny Workflow
        </h2>
        <p>
          Vibe coding to styl pracy, w którym AI ma <strong>dostęp do całego kontekstu projektu</strong> (plików, terminala, błędów). Ty nie tylko promptujesz, Ty &quot;zarządzasz wibracją&quot; (kierunkiem) projektu, podczas gdy agent wykonuje tysiące mikrozmian w czasie rzeczywistym.
        </p>

        <div className="bg-indigo-50 p-10 rounded-[3rem] my-12 border border-indigo-100 flex gap-8 items-center">
           <div className="hidden sm:block bg-white p-4 rounded-2xl shadow-sm"><Lightbulb className="w-12 h-12 text-yellow-500" /></div>
           <div>
              <h3 className="text-xl font-bold mb-2">Kluczowa różnica:</h3>
              <p className="text-sm text-indigo-900/70 mb-0 leading-relaxed">
                 W Prompt Engineeringu wynikiem jest <strong>tekst</strong>. W Vibe Codingu wynikiem jest <strong>działające oprogramowanie</strong> wewnątrz Twojego repozytorium.
              </p>
           </div>
        </div>
      </div>
    </section>
  );
}
