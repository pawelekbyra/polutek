import { Code2, Zap, Layers } from 'lucide-react';

export default function ReactPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Vibe Coding w React: Jak budować nowoczesne UI z prędkością światła</h1>
      <div className="prose prose-slate prose-lg max-w-none">
        <p className="lead text-xl text-slate-600 mb-8">
          React to obecnie najlepszy ekosystem do Vibe Codingu. Dzięki modularności i ogromnej bazie komponentów, AI potrafi &quot;zrozumieć vibe&quot; frontendu niemal natychmiast.
        </p>

        <h2 className="text-3xl font-bold mt-12 mb-6">Dlaczego React + AI to Power Couple?</h2>
        <p>
          AI świetnie radzi sobie z komponentami funkcyjnymi. Możesz poprosić o &quot;komponent karty produktu z Tailwind CSS i szkieletem ładowania&quot;, a otrzymasz gotowy, czysty kod JSX, który wystarczy wkleić do projektu.
        </p>

        <h2 className="text-3xl font-bold mt-16 mb-6 flex items-center gap-3">
          <Layers className="text-blue-500" /> Najlepszy Stack:
        </h2>
        <ul className="space-y-4">
          <li><strong>Next.js (App Router):</strong> Standard dla nowoczesnych apek webowych. AI doskonale rozumie strukturę plików i Server Components.</li>
          <li><strong>Tailwind CSS:</strong> Najszybszy sposób na stylowanie. Prompty typu &quot;zrób to w stylu minimalistycznym apple-like&quot; działają cuda.</li>
          <li><strong>Shadcn/UI:</strong> Kolekcja komponentów, które AI uwielbia. Są łatwe do modyfikacji i dają profesjonalny efekt od razu.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-16 mb-6">Jak wibować w React?</h2>
        <p>
          Zamiast pisać hooki `useState` czy `useEffect` ręcznie, powiedz edytorowi: &quot;Dodaj obsługę wyszukiwania w czasie rzeczywistym do tej listy, użyj debouncing i pokaż spinner podczas ładowania danych&quot;. To jest Vibe Coding w praktyce.
        </p>

        <h2 className="text-3xl font-bold mt-16 mb-6">Podsumowanie</h2>
        <p>
          Vibe coding w React to nie tylko szybkość, to wyższa jakość. AI pilnuje dobrych praktyk, sugeruje optymalizacje wydajności i dba o to, by Twój kod był spójny.
        </p>
      </div>
    </section>
  );
}
