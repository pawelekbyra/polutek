export default function FAQPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-12">Vibe Coding - Najczęstsze Pytania (FAQ)</h1>
      <p className="text-xl text-slate-600 mb-16">
        Wszystko, co musisz wiedzieć o trendzie, który redefiniuje branżę technologiczną w 2025 roku.
      </p>

      <div className="space-y-8">
        <FAQItem
          q="Czy Vibe Coding zastąpi programistów?"
          a="Krótka odpowiedź brzmi: nie, ale zmieni ich rolę. AI przejmuje rzemiosło (pisanie kodu), ale człowiek nadal musi zarządzać produktem, architekturą i bezpieczeństwem. Programiści, którzy opanują Vibe Coding, będą 10-20 razy bardziej efektywni."
        />
        <FAQItem
          q="Jakie narzędzia są najlepsze do Vibe Codingu w 2025 roku?"
          a="Obecnie złotym standardem jest edytor Cursor w połączeniu z modelem Claude 3.5 Sonnet. Do szybkich prototypów webowych świetnie sprawdzają się v0.dev, Lovable.dev oraz Bolt.new."
        />
        <FAQItem
          q="Czy muszę umieć programować, żeby być Vibe Coderem?"
          a="Podstawowa wiedza pomaga w weryfikacji błędów i rozumieniu struktury plików, ale bariera wejścia jest rekordowo niska. Możesz budować zaawansowane aplikacje, opisując je precyzyjnym językiem naturalnym."
        />
        <FAQItem
          q="Vibe coding a prompt engineering - jaka jest różnica?"
          a="Prompt engineering to technika pisania konkretnych zapytań do modeli. Vibe coding to cały styl pracy (workflow), gdzie prowadzisz dialog z kodem v edytorze, iterujesz na żywo i &apos;utrzymujesz klimat&apos; projektu, oddając żmudną implementację agentom AI."
        />
        <FAQItem
          q="Czy Andrej Karpathy to twórca vibe coding?"
          a="Karpathy spopularyzował ten termin i nadał mu konkretne znaczenie w lutym 2025 roku, pokazując na konkretnych przykładach, jak buduje skomplikowane systemy przy minimalnym udziale tradycyjnego pisania kodu."
        />
        <FAQItem
          q="Czy vibe coding nadaje się do projektów enterprise?"
          a="Tak, ale wymaga dodatkowych warstw weryfikacji. Narzędzia takie jak GitHub Copilot Workspace są projektowane specjalnie z myślą o dużych repozytoriach, gdzie AI pomaga w refaktoryzacji i implementacji nowych funkcjonalności zgodnie z istniejącymi wzorcami."
        />
        <FAQItem
          q="Jak zacząć naukę Vibe Codingu?"
          a="Najlepiej pobrać edytor Cursor, założyć konto na Anthropic (Claude API) i spróbować zbudować prostą aplikację (np. Todo listę lub kalkulator) używając wyłącznie czatu i funkcji Composer w Cursorze."
        />
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string, a: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
      <h3 className="text-xl font-bold mb-4 text-slate-900">{q}</h3>
      <p className="text-slate-600 leading-relaxed text-lg">{a}</p>
    </div>
  );
}
