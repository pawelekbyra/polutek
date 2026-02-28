import SchemaMarkup from '@/app/components/SchemaMarkup';
import LolekCommentary from '@/app/components/LolekCommentary';
import { Terminal, Cpu, Zap, Code2, ArrowRight, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: "Claude Code: Tutorial CLI od Anthropic. Czy zastąpi Cursora? | Polutek.pl",
  description: "Poznaj Claude Code - rewolucyjne narzędzie CLI do programowania agentycznego. Sprawdź jak zainstalować i czy warto porzucić dla niego edytor Cursor.",
  keywords: "claude code tutorial, claude cli, anthropic claude code, programowanie w terminalu ai, agentic coding cli, cursor vs claude code",
};

export default function ClaudeCodePage() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-20">
      <SchemaMarkup
        type="Article"
        headline={metadata.title}
        description={metadata.description}
        author="Detektyw Polutek"
        datePublished="2025-03-04"
      />

      <Link href="/" className="text-blue-600 font-bold mb-8 inline-flex items-center gap-2 hover:gap-3 transition-all">
        <ArrowRight className="w-4 h-4 rotate-180" /> Powrót do strony głównej
      </Link>

      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
          <Terminal className="w-3 h-3" /> Nowość Marzec 2025
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
          Claude Code: Programowanie Agentyczne w Twoim Terminalu
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed italic">
          &quot;Zapomnij o kopiowaniu kodu do chatu. Pozwól AI przejąć Twój terminal i budować systemy na Twoich oczach.&quot;
        </p>
      </div>

      <div className="prose prose-slate prose-lg max-w-none">
        <p>
          Anthropic właśnie rzucił rękawicę edytorom takim jak Cursor. **Claude Code** to agent AI działający bezpośrednio w wierszu poleceń (CLI). Nie jest to zwykły asystent – to inżynier, który ma uprawnienia do czytania plików, uruchamiania testów, a nawet wykonywania poleceń `git`.
        </p>

        <h2 className="text-3xl font-bold mt-12 mb-6">Jak to działa?</h2>
        <p>
          W przeciwieństwie do Cursora, który jest graficznym edytorem, Claude Code żyje tam, gdzie dzieje się magia – w terminalu. Po zainstalowaniu narzędzia, możesz wydać mu polecenie typu:
        </p>

        <div className="bg-slate-900 rounded-2xl p-6 my-8 font-mono text-blue-300 text-sm border border-slate-800 shadow-xl">
          <span className="text-slate-500">$</span> claude &quot;Dodaj walidację Zod do wszystkich moich API routes i napisz do nich testy w Vitest&quot;
        </div>

        <p>
          Model analizuje wtedy całe repozytorium, planuje zmiany i **samodzielnie je wprowadza**, pytając Cię o zgodę przed każdym zapisem.
        </p>

        <LolekCommentary
          quote="Wreszcie coś dla prawdziwych terminalowych twardzieli, a nie tylko dla fanów kolorowych buttonów w VS Code. Ale uważajcie – dając AI dostęp do wiersza poleceń, dajecie mu klucze do mieszkania. Sprawdźcie dwa razy, zanim klikniecie 'Y'."
          context="Lolek o bezpieczeństwie CLI"
        />

        <h2 className="text-3xl font-bold mt-16 mb-6">Kluczowe funkcje Claude Code</h2>
        <ul className="space-y-6">
          <li className="flex gap-4">
            <div className="bg-blue-50 p-3 rounded-xl h-fit"><Zap className="w-6 h-6 text-blue-600" /></div>
            <div>
              <span className="font-bold text-lg block">Głęboki Kontekst Projektu</span>
              <p className="text-slate-600">Automatycznie indeksuje Twoje repozytorium, rozumiejąc zależności między plikami bez ręcznego podawania @-symbols.</p>
            </div>
          </li>
          <li className="flex gap-4">
            <div className="bg-emerald-50 p-3 rounded-xl h-fit"><Code2 className="w-6 h-6 text-emerald-600" /></div>
            <div>
              <span className="font-bold text-lg block">Pętla Naprawcza</span>
              <p className="text-slate-600">Jeśli wygenerowany kod nie przechodzi testów, Claude Code widzi błędy w terminalu i sam próbuje je naprawić do skutku.</p>
            </div>
          </li>
          <li className="flex gap-4">
            <div className="bg-orange-50 p-3 rounded-xl h-fit"><Cpu className="w-6 h-6 text-orange-600" /></div>
            <div>
              <span className="font-bold text-lg block">Zarządzanie Gitem</span>
              <p className="text-slate-600">Potrafi sam robić commity z sensownymi opisami po wykonaniu zadania. Twój workflow staje się niemal w pełni autonomiczny.</p>
            </div>
          </li>
        </ul>

        <div className="bg-slate-50 border-2 border-slate-200 rounded-[2.5rem] p-10 my-16">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-red-500" /> Claude Code vs Cursor: Co wybrać?
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-black text-slate-900 mb-2 uppercase tracking-tight">Wybierz Claude Code, jeśli:</h4>
              <ul className="text-sm space-y-2 text-slate-600">
                <li>- Żyjesz w Vim/Neovim</li>
                <li>- Chcesz pełnej autonomii agenta</li>
                <li>- Pracujesz na serwerach zdalnych przez SSH</li>
              </ul>
            </div>
            <div className="border-l border-slate-200 pl-8">
              <h4 className="font-black text-slate-900 mb-2 uppercase tracking-tight">Zostań przy Cursorze, jeśli:</h4>
              <ul className="text-sm space-y-2 text-slate-600">
                <li>- Wolisz wizualne code review zmian</li>
                <li>- Korzystasz z bogatego ekosystemu VS Code</li>
                <li>- Budujesz głównie UI (Cursor lepiej radzi sobie z podglądem)</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mt-16 mb-6">Podsumowanie</h2>
        <p>
          Claude Code to kolejny krok w stronę &quot;Inżyniera AI&quot;. To już nie jest narzędzie do podpowiadania składni, ale partner, który wykonuje brudną robotę. W 2025 roku granica między pisaniem kodu a wydawaniem poleceń ostatecznie się zaciera.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Link
            href="/narzedzia-ai"
            className="flex-1 bg-slate-900 text-white text-center py-4 rounded-2xl font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
          >
            Zobacz inne narzędzia <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/porownania/cursor-vs-windsurf"
            className="flex-1 bg-blue-600 text-white text-center py-4 rounded-2xl font-bold hover:bg-blue-700 transition-colors"
          >
            Ranking Edytorów AI
          </Link>
        </div>
      </div>
    </article>
  );
}
