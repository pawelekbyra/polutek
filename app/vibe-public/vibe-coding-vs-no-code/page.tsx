import { MousePointer2, Keyboard, Zap } from 'lucide-react';

export default function NoCodePage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Vibe Coding vs No-Code: Dlaczego to nie to samo?</h1>
      <div className="prose prose-slate prose-lg max-w-none">
        <p className="lead text-xl text-slate-600 mb-8">
          Narzędzia no-code obiecywały rewolucję, ale Vibe Coding dostarcza coś znacznie potężniejszego: pełną kontrolę programisty przy prędkości no-code.
        </p>

        <h2 className="text-3xl font-bold mt-12 mb-6">No-Code: Złota klatka</h2>
        <p>
          Narzędzia takie jak Bubble czy Webflow są świetne, dopóki mieścisz się w ich ramach. Kiedy potrzebujesz customowej logiki, której autorzy narzędzia nie przewidzieli, zaczynają się schody. Jesteś ograniczony do tego, co pozwala Ci &quot;wyklikać&quot; interfejs.
        </p>

        <h2 className="text-3xl font-bold mt-16 mb-6">Vibe Coding: Kod bez limitów</h2>
        <p>
          W Vibe Codingu wynikiem jest <strong>prawdziwy kod</strong>. Możesz go w każdej chwili przejąć, zmodyfikować ręcznie, przenieść na inny serwer lub rozszerzyć o dowolną bibliotekę.
        </p>

        <div className="grid md:grid-cols-2 gap-8 my-12">
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h3 className="font-bold flex items-center gap-2 mb-3">
               <MousePointer2 className="w-5 h-5 text-blue-500" /> No-Code
            </h3>
            <ul className="text-sm space-y-2">
              <li>- Przeciąganie klocków</li>
              <li>- Zamknięty ekosystem</li>
              <li>- Problem ze skalowaniem</li>
              <li>- Trudne w utrzymaniu przez devów</li>
            </ul>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="font-bold flex items-center gap-2 mb-3">
               <Keyboard className="w-5 h-5 text-blue-600" /> Vibe Coding
            </h3>
            <ul className="text-sm space-y-2">
              <li>- Pisanie językiem naturalnym</li>
              <li>- Otwarty kod (Next.js, Python, itd.)</li>
              <li>- Nielimitowane możliwości</li>
              <li>- Standardowy workflow (Git, CI/CD)</li>
            </ul>
          </div>
        </div>

        <h2 className="text-3xl font-bold mt-16 mb-6">Podsumowanie</h2>
        <p>
          Vibe coding to &quot;low-code na sterydach&quot;. Daje szybkość budowania wizualnego, ale zachowuje elastyczność i moc tradycyjnego programowania. To najlepszy z obu światów.
        </p>
      </div>
    </section>
  );
}
