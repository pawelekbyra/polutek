export default function ComparisonPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Vibe Coding vs Prompt Engineering: Jaka jest różnica?</h1>
      <div className="prose prose-slate prose-lg max-w-none">
        <p>
          Wielu użytkowników myli te dwa pojęcia, uważając je za to samo. Choć oba korzystają z modeli AI, reprezentują zupełnie inny stopień zaawansowania i styl pracy.
        </p>

        <h2 className="text-3xl font-bold mt-12 mb-6">Prompt Engineering: Sztuka Zapytania</h2>
        <p>
          Prompt engineering to technika formułowania precyzyjnych instrukcji (promptów), aby wydobyć z modelu AI konkretną odpowiedź. Skupia się na:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Strukturze zapytania (Zero-shot, Few-shot prompting).</li>
          <li>Używaniu odpowiednich słów kluczowych i kontekstu.</li>
          <li>Optymalizacji wyjścia modelu (np. "odpowiedz tylko w formacie JSON").</li>
        </ul>
        <p className="mt-4">
          W kontekście programowania, prompt engineer kopiuje kawałek kodu do Chatu GPT, prosi o poprawkę, a potem kopiuje wynik z powrotem do edytora. Jest to proces manualny i często powolny.
        </p>

        <h2 className="text-3xl font-bold mt-16 mb-6">Vibe Coding: Programowanie Agentyczne</h2>
        <p>
          Vibe coding to ewolucja. Tutaj nie interesuje nas pojedynczy prompt, ale <strong>cały workflow</strong>. Vibe coder nie "rozmawia" z AI w osobnym oknie przeglądarki – on współpracuje z agentem bezpośrednio w kodzie.
        </p>
        <div className="bg-slate-100 p-6 rounded-xl border border-slate-200 my-8">
          <h3 className="font-bold mb-2">Główne różnice:</h3>
          <ul className="space-y-3">
            <li><strong>Kontekst:</strong> Vibe coding używa narzędzi (np. Cursor), które automatycznie przesyłają do AI strukturę Twojego projektu, typy danych i zależności. Nie musisz nic kopiować.</li>
            <li><strong>Iteracja:</strong> Poprawki dzieją się "na żywo". Jeśli "vibe" projektu się zmienia, agent AI dostosowuje wszystkie pliki naraz.</li>
            <li><strong>Cel:</strong> W prompt engineeringu celem jest dobra odpowiedź. W Vibe Codingu celem jest działający, przetestowany system.</li>
          </ul>
        </div>

        <h2 className="text-3xl font-bold mt-16 mb-6">Podsumowanie</h2>
        <p>
          Można powiedzieć, że prompt engineering to młotek, a Vibe Coding to cała zautomatyzowana linia produkcyjna. W 2025 roku bycie dobrym w promptowaniu to za mało – trzeba umieć "wibować" z agentami AI, aby tworzyć oprogramowanie z prędkością światła.
        </p>
      </div>
    </section>
  );
}
