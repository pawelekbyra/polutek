import VibeQuiz from '@/app/components/VibeQuiz';
import SchemaMarkup from '@/app/components/SchemaMarkup';

export const metadata = {
  title: "Quiz: Czy jesteś gotowy na Vibe Coding? | Polutek.pl",
  description: "Sprawdź swój Vibe Score. Dowiedz się, czy potrafisz efektywnie współpracować z AI jako programista i jak zwiększyć swoją produktywność 10x.",
};

export default function QuizPage() {
  return (
    <main className="bg-slate-50 min-h-screen">
      <SchemaMarkup
        type="Article"
        headline={metadata.title}
        description={metadata.description}
        author="Detektyw Polutek"
        datePublished="2025-02-27"
      />
      <section className="bg-indigo-700 py-24 px-4 text-center text-white">
         <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Test Gotowości AI</h1>
         <p className="text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
            Sprawdź, czy Twoje nawyki kodowania pochodzą z ery VS Code, czy już z ery agentycznego programowania.
         </p>
      </section>

      <VibeQuiz />

      <section className="max-w-4xl mx-auto pb-32 px-4 text-center">
         <p className="text-slate-400 font-medium">Wynik quizu pomoże Ci dobrać odpowiednie materiały w naszej bazy wiedzy.</p>
      </section>
    </main>
  );
}
