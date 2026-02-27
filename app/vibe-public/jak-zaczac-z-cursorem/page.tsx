export default function CursorTutorial() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Jak zacząć z Cursorem? Kompletny poradnik dla Vibe Codera</h1>
      <div className="prose prose-slate prose-lg max-w-none">
        <p className="lead text-xl text-slate-600 mb-8">
          Edytor Cursor stał się symbolem rewolucji AI w programowaniu. Jeśli chcesz wejść w świat Vibe Codingu, to jest Twoje najważniejsze narzędzie.
        </p>

        <h2 className="text-3xl font-bold mt-12 mb-6">Krok 1: Instalacja i Import Ustawień</h2>
        <p>
          Cursor to fork VS Code, co oznacza, że możesz przenieść wszystkie swoje rozszerzenia, motywy i skróty klawiszowe jednym kliknięciem. Pobierz go z oficjalnej strony i zainstaluj jak każdy inny edytor.
        </p>

        <h2 className="text-3xl font-bold mt-16 mb-6">Krok 2: Poznaj &quot;Composer&quot; (Cmd+I / Ctrl+I)</h2>
        <p>
          To serce Cursora. Composer pozwala na edycję wielu plików jednocześnie. Możesz napisać: &quot;Dodaj system autoryzacji do mojej aplikacji&quot;, a on stworzy foldery, pliki route&apos;ów i zaktualizuje layout.
        </p>

        <h2 className="text-3xl font-bold mt-16 mb-6">Krok 3: Wybór Modelu (Claude 3.5 Sonnet)</h2>
        <p>
          W prawym dolnym rogu czatu Cursora możesz wybrać model. <strong>Zawsze wybieraj Claude 3.5 Sonnet</strong> dla zadań programistycznych. Jest szybszy, ma lepszy logic reasoning i rzadziej popełnia błędy niż GPT-4o.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-8 my-10 rounded-r-xl">
          <h3 className="font-bold text-blue-900 mb-2">Pro Tip: Indeksowanie Projektu</h3>
          <p className="text-blue-800">
            Upewnij się, że w ustawieniach Cursora masz włączone &quot;Codebase Indexing&quot;. Dzięki temu AI będzie &quot;widzieć&quot; cały Twój projekt i nie będzie zadawać pytań o rzeczy, które już napisałeś.
          </p>
        </div>

        <h2 className="text-3xl font-bold mt-16 mb-6">Krok 4: Pierwszy &quot;Vibe&quot;</h2>
        <p>
          Zacznij od prostego zadania. Otwórz pusty folder i powiedz Composerowi: &quot;Zbuduj mi stronę portfolio w Next.js z użyciem Tailwind CSS i ciemnym motywem. Dodaj sekcję o mnie i galerię projektów&quot;. Obserwuj jak kod tworzy się sam.
        </p>

        <h2 className="text-3xl font-bold mt-16 mb-6">Podsumowanie</h2>
        <p>
          Cursor to nie tylko edytor, to Twój partner w procesie twórczym. Im lepiej nauczysz się z nim współpracować, tym szybciej Twoje pomysły będą stawały się rzeczywistością.
        </p>
      </div>
    </section>
  );
}
