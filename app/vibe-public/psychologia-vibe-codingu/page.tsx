import { Brain, Heart, Zap } from 'lucide-react';

export default function PsychologyPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Psychologia Vibe Codingu: Od walki ze składnią do wolności tworzenia</h1>
      <div className="prose prose-slate prose-lg max-w-none">
        <p className="lead text-xl text-slate-600 mb-8">
          Przejście na Vibe Coding to nie tylko zmiana edytora. To głęboka zmiana w sposobie myślenia o tym, co to znaczy "tworzyć".
        </p>

        <div className="flex flex-col md:flex-row gap-8 my-16">
          <div className="flex-1 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <Brain className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-4">Mniejszy Cognitive Load</h3>
            <p className="text-slate-600">Twój mózg nie musi już trzymać w pamięci nazw funkcji i średników. Masz więcej "RAM-u" na rozwiązywanie problemów biznesowych.</p>
          </div>
          <div className="flex-1 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <Heart className="w-12 h-12 text-red-600 mb-4" />
            <h3 className="text-xl font-bold mb-4">Stan Flow</h3>
            <p className="text-slate-600">Brak frustracji spowodowanej literówkami sprawia, że częściej wchodzisz w stan głębokiego skupienia na produkcie.</p>
          </div>
          <div className="flex-1 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <Zap className="w-12 h-12 text-yellow-600 mb-4" />
            <h3 className="text-xl font-bold mb-4">Natychmiastowa Gratyfikacja</h3>
            <p className="text-slate-600">Widzisz efekty swojej myśli w sekundach, co nakręca spiralę motywacji do dalszego budowania.</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mt-12 mb-6">Koniec z Imposter Syndrome?</h2>
        <p>
          Paradoksalnie, Vibe Coding może pomóc w walce z syndromem oszusta. Skoro narzędzie zajmuje się implementacją, Ty możesz skupić się na swojej unikalnej wartości: pomysłowości, empatii wobec użytkownika i wizji. Nie musisz już czuć się "gorszy", bo nie znasz algorytmu sortowania bąbelkowego na pamięć.
        </p>

        <h2 className="text-3xl font-bold mt-16 mb-6">Nowe wyzwania: Odpowiedzialność</h2>
        <p>
          Większa moc to większa odpowiedzialność. Psychologia Vibe Codingu wymaga od nas bycia bardziej krytycznym. Łatwo jest wpaść w pułapkę "skoro AI tak napisało, to jest dobrze". Dojrzały Vibe Coder to taki, który zachowuje dystans i zawsze weryfikuje propozycje maszyny.
        </p>

        <h2 className="text-3xl font-bold mt-16 mb-6">Podsumowanie</h2>
        <p>
          Zmieniając sposób programowania, zmieniamy samych siebie. Stajemy się projektantami rzeczywistości, a nie tylko wykonawcami poleceń. To fascynujący czas na bycie twórcą.
        </p>
      </div>
    </section>
  );
}
