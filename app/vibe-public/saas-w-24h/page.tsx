import { Clock, Rocket, DollarSign } from 'lucide-react';

export default function SaaSPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Case Study: Jak zbudowałem i wdrożyłem SaaS w 24 godziny używając Vibe Codingu</h1>
      <div className="prose prose-slate prose-lg max-w-none">
        <p className="lead text-xl text-slate-600 mb-8">
          To nie jest clickbait. Dzięki nowym narzędziom AI, droga od pomysłu do działającego biznesu skróciła się z miesięcy do godzin.
        </p>

        <div className="grid md:grid-cols-3 gap-6 my-12">
          <div className="bg-blue-50 p-6 rounded-xl text-center">
            <Clock className="w-10 h-10 mx-auto text-blue-600 mb-4" />
            <div className="text-2xl font-bold">24h</div>
            <div className="text-sm text-slate-500 uppercase">Czas produkcji</div>
          </div>
          <div className="bg-indigo-50 p-6 rounded-xl text-center">
            <Rocket className="w-10 h-10 mx-auto text-indigo-600 mb-4" />
            <div className="text-2xl font-bold">1 Osoba</div>
            <div className="text-sm text-slate-500 uppercase">Zespół</div>
          </div>
          <div className="bg-emerald-50 p-6 rounded-xl text-center">
            <DollarSign className="w-10 h-10 mx-auto text-emerald-600 mb-4" />
            <div className="text-2xl font-bold">0 PLN</div>
            <div className="text-sm text-slate-500 uppercase">Koszt infrastruktury</div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mt-12 mb-6">Harmonogram prac:</h2>

        <h3 className="text-2xl font-bold mt-8 mb-4">0-4h: Definicja i Landing Page</h3>
        <p>
          Używając <strong>v0.dev</strong> wygenerowałem kompletny interfejs użytkownika w 15 minut. Resztę czasu spędziłem na dopracowaniu copywritingu z pomocą Claude 3.5 Sonnet.
        </p>

        <h3 className="text-2xl font-bold mt-8 mb-4">4-12h: Backend i Logika</h3>
        <p>
          Otworzyłem projekt w <strong>Cursorze</strong>. Za pomocą funkcji "Composer" wydałem polecenie: "Stwórz integrację ze Stripe dla płatności i bazę danych Supabase dla profili użytkowników". AI napisało 90% kodu, ja tylko połączyłem klucze API.
        </p>

        <h3 className="text-2xl font-bold mt-8 mb-4">12-20h: Debugowanie i Testy</h3>
        <p>
          To był moment na "vibe". Powiedziałem AI: "Sprawdź wszystkie edge-case'y, dodaj obsługę błędów i upewnij się, że responsywność na iPhone jest idealna". Cursor przeskanował cały projekt i wprowadził poprawki.
        </p>

        <h3 className="text-2xl font-bold mt-8 mb-4">20-24h: Deployment</h3>
        <p>
          Jedno kliknięcie w Vercel i aplikacja była online. Gotowa do przyjmowania płatności.
        </p>

        <h2 className="text-3xl font-bold mt-16 mb-6">Wniosek</h2>
        <p>
          Vibe coding to demokratyzacja przedsiębiorczości. Nie musisz już mieć 50 tys. PLN na start. Musisz mieć laptopa, pomysł i umiejętność współpracy z AI.
        </p>
      </div>
    </section>
  );
}
