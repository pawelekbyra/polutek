import VibeGlossary from '@/app/components/VibeGlossary';
import SchemaMarkup from '@/app/components/SchemaMarkup';

export const metadata = {
  title: "Słownik Vibe Codingu: Najważniejsze pojęcia AI 2025 | VibeCoding.pl",
  description: "Zrozum język nowej ery programowania. RAG, Composer, Agentic Workflow i inne pojęcia wyjaśnione prosto i przystępnie.",
};

export default function GlossaryPage() {
  return (
    <main className="bg-slate-50 min-h-screen">
      <SchemaMarkup
        type="Article"
        headline={metadata.title}
        description={metadata.description}
        author="Detektyw Polutek"
        datePublished="2025-02-21"
      />
      <section className="bg-slate-900 py-24 px-4 text-center text-white">
         <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Słownik Pojęć</h1>
         <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Vibe coding ma swój własny język. Tutaj znajdziesz definicje wszystkiego, co musisz wiedzieć, by sprawnie poruszać się w świecie AI Software Engineeringu.
         </p>
      </section>

      <VibeGlossary />

      <section className="max-w-4xl mx-auto pb-32 px-4">
         <div className="bg-blue-600 p-10 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
               <h2 className="text-2xl font-bold mb-2">Brakuje jakiegoś hasła?</h2>
               <p className="text-blue-100 opacity-80">Nasz słownik jest tworzony przez społeczność. Daj nam znać!</p>
            </div>
            <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors">
               Zaproponuj hasło
            </button>
         </div>
      </section>
    </main>
  );
}
