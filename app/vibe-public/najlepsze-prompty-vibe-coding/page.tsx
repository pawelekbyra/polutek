import { Terminal, Copy, Sparkles } from 'lucide-react';

export default function PromptsPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Biblioteka Promptów dla Vibe Codera: Od MVP do Produkcji</h1>
      <div className="prose prose-slate prose-lg max-w-none">
        <p className="lead text-xl text-slate-600 mb-8">
          W Vibe Codingu nie chodzi o pisanie długich esejów, ale o precyzyjne nakierowanie AI na właściwy tor. Oto sprawdzone szablony.
        </p>

        <div className="space-y-12">
          <PromptCard
            title="Inicjalizacja Projektu"
            prompt="Zbuduj bazę aplikacji Next.js (App Router) z Tailwind CSS. Skonfiguruj podstawowy layout z nawigacją i stopką. Dodaj obsługę ciemnego motywu i zainstaluj bibliotekę lucide-react do ikon."
          />

          <PromptCard
            title="Budowa Komponentu UI"
            prompt="Stwórz nowoczesny, responsywny komponent galerii zdjęć, który pobiera dane z tablicy obiektów. Dodaj efekt hover, modal po kliknięciu w zdjęcie i animacje wejścia za pomocą framer-motion."
          />

          <PromptCard
            title="Refaktoryzacja i Czysty Kod"
            prompt="Przeanalizuj ten komponent. Podziel go na mniejsze pod-komponenty, usuń powtórzenia kodu i upewnij się, że wszystkie typy TypeScript są poprawnie zdefiniowane. Wyciągnij logikę biznesową do osobnego hooka."
          />

          <PromptCard
            title="Debugowanie Błędów"
            prompt="Ten komponent rzuca błąd [NAZWA_BŁĘDU] przy próbie wysłania formularza. Przeanalizuj przepływ danych w obsłudze zdarzeń, sprawdź walidację po stronie klienta i zaproponuj fix wraz z testem jednostkowym."
          />
        </div>

        <h2 className="text-3xl font-bold mt-16 mb-6">Zasada 80/20</h2>
        <p>
          Pamiętaj, że najlepsze prompty to takie, które dają AI 80% kontekstu, a zostawiają 20% miejsca na kreatywność. Zawsze określaj stack technologiczny i pożądany efekt końcowy.
        </p>
      </div>
    </section>
  );
}

function PromptCard({ title, prompt }: { title: string, prompt: string }) {
  return (
    <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
      <div className="px-6 py-4 bg-slate-800 flex justify-between items-center border-b border-slate-700">
        <h3 className="text-slate-100 font-bold flex items-center gap-2">
          <Terminal className="w-4 h-4 text-blue-400" /> {title}
        </h3>
        <button className="text-slate-400 hover:text-white transition-colors">
          <Copy className="w-4 h-4" />
        </button>
      </div>
      <div className="p-6">
        <code className="text-blue-300 text-sm leading-relaxed block whitespace-pre-wrap">
          {prompt}
        </code>
      </div>
    </div>
  );
}
