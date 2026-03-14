import React from 'react';
import { CaseFile, LegalNote, PullQuote } from './InvestigativeUI';

export const ProkuraturaArticle = () => {
  return (
    <article className="max-w-3xl mx-auto px-6 pt-4 pb-0 flex-grow w-full z-10 relative">
      <div
        className="prose prose-stone prose-lg max-w-none article-prose font-serif text-lg leading-relaxed"
        style={{ color: '#000000', opacity: 1, WebkitFontSmoothing: 'none' }}
      >
        <p className="drop-cap mt-0">
          Wałbrzych, miasto znane z tajemniczych podziemi i legend o złotym pociągu, stało się areną wydarzeń, które mogłyby posłużyć za scenariusz komedii kryminalnej, gdyby nie fakt, że uderzają w same fundamenty wymiaru sprawiedliwości. W samym sercu miasta, w budynku <strong className="font-black">Prokuratury Rejonowej</strong>, doszło do serii włamań, które obnażyły bezradność systemów zabezpieczeń.
        </p>

        <p className="mt-4">
          Wszystko zaczęło się od pozornie zwyczajnej, choć zuchwałej kradzieży. Nieznani sprawcy, wykorzystując brak nowoczesnego monitoringu, dostali się do archiwum prokuratury. Ich łupem nie padły jednak pieniądze ani cenny sprzęt elektroniczny. Złodzieje przyszli po coś znacznie cenniejszego – po papier.
        </p>

        <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">Znikające dowody</h2>

        <p className="mt-4">
          Z szaf pancernych, które okazały się pancerne tylko z nazwy, wyparowały akta kilku wielowątkowych śledztw gospodarczych. Prokuratorzy, którzy następnego dnia przyszli do pracy, zastali jedynie puste teczki i otwarte okno.
        </p>

        <CaseFile title="Raport z miejsca zdarzenia" type="evidence" source="Notatka służbowa policji">
          Stwierdzono naruszenie plomb zabezpieczających drzwi do archiwum głównego. Brak śladów użycia materiałów wybuchowych. Zamki zostały otwarte za pomocą tzw. "pasówki". Z szaf oznaczonych sygnaturami PR 123/2023 oraz PR 456/2023 wyjęto całą zawartość dokumentacji papierowej wraz z nośnikami elektronicznymi.
        </CaseFile>

        <p className="mt-4">
          Wybuchł skandal. Lokalne media huczały o nieudolności śledczych, a Prokuratura Okręgowa natychmiast wszczęła postępowanie wyjaśniające. Powołano specjalną grupę operacyjną, której zadaniem było odnalezienie sprawców i – co ważniejsze – odzyskanie skradzionych akt.
        </p>

        <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">Śledztwo o śledztwie</h2>

        <p className="mt-4">
          Nowe postępowanie, prowadzone pod ścisłym nadzorem, miało być dowodem na to, że system potrafi wyciągać wnioski. Akta nowej sprawy, dotyczącej włamania do prokuratury, stały się priorytetem. Przesłuchiwano strażników, analizowano połączenia telefoniczne, zbierano odciski palców.
        </p>

        <PullQuote
          quote="To był policzek wymierzony w twarz państwa. Nie spoczniemy, dopóki sprawcy nie staną przed sądem, a akta nie wrócą na swoje miejsce."
          author="Rzecznik Prasowy"
          source="Konferencja prasowa, wrzesień 2024 r."
        />

        <p className="mt-4">
          Przez kilka tygodni wydawało się, że przełom jest blisko. Śledczy zgromadzili pokaźny materiał dowodowy, w tym zeznania świadka incognito, który rzekomo widział uciekających sprawców. Wszystkie te cenne informacje trafiały do nowej, opasłej teczki oznaczonej sygnaturą <strong className="font-black">PR 999/2024 - Sprawa Kradzieży Akt</strong>.
        </p>

        <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">Deja Vu</h2>

        <p className="mt-4">
          Historia lubi się powtarzać, ale w Wałbrzychu powtórzyła się jako farsa. Dokładnie w rocznicę pierwszego włamania, sprawcy uderzyli ponownie. Tym razem nie szukali akt gospodarczych. Ich cel był jeden: akta sprawy dotyczącej ich własnego włamania.
        </p>

        <p className="mt-4">
          Włamywacze wykazali się nie lada poczuciem humoru lub skrajną bezczelnością. Nie tylko ukradli dokumentację śledztwa PR 999/2024, ale w pustej szafie zostawili kartkę z krótkim napisem: <span className="bg-[#e8d154]/80 px-1 font-black text-black box-decoration-clone">"Dziękujemy za zebranie dowodów. Bardzo nam pomogły."</span>
        </p>

        <CaseFile title="Protokół drugiego włamania" type="evidence" source="Archiwum Prokuratury Rejonowej">
          W toku oględzin stwierdzono brak teczek o sygnaturze PR 999/2024. Sprawcy dostali się do budynku tą samą drogą, co poprzednio. System alarmowy, który miał być zmodernizowany, wciąż znajdował się w fazie testów i nie zarejestrował zdarzenia.
        </CaseFile>

        <p className="mt-4 leading-tight">
          Sytuacja stała się absurdalna. Prokuratura w Wałbrzychu musiała teraz wszcząć trzecie śledztwo – w sprawie kradzieży akt dotyczących kradzieży akt.
          <br />
          <span className="bg-red-600 px-1 font-black text-white shadow-sm box-decoration-clone inline-block">
            Złodzieje skutecznie "wyczyścili" swoją kartotekę, używając do tego rąk samych prokuratorów.
          </span>
        </p>

        <LegalNote term="Recydywa archiwalna">
          Termin ukuty przez lokalnych prawników na określenie procederu wielokrotnego okradania tej samej instytucji z dokumentacji obciążającej sprawców.
        </LegalNote>

        <p className="mt-4">
          Do dziś nie ustalono, jak to możliwe, że budynek prokuratury był tak słabo zabezpieczony. Czy był to wynik zwykłego niedbalstwa, czy może celowe działanie kogoś z wewnątrz? Jedno jest pewne – w Wałbrzychu akta spraw mają niezwykłą tendencję do znikania właśnie wtedy, gdy stają się najbardziej niebezpieczne dla przestępców.
        </p>

        <div className="not-prose mt-12 mb-4 flex justify-end relative z-10">
          <div className="text-right border-r-4 border-black pr-4">
            <span className="block font-black text-black uppercase text-xl font-display tracking-widest leading-none">Marek Archiwista</span>
            <span className="block text-[10px] text-black/60 font-mono mt-1 uppercase tracking-tighter leading-tight">Reporter śledczy, niezależny obserwator</span>
            <span className="block text-[10px] text-black/40 font-mono mt-0.5 italic lowercase tracking-tight">marek.archiwista@protonmail.com</span>
          </div>
        </div>

        <div className="not-prose mt-16 mb-12 border-y-4 border-black py-8 bg-[#e8d154]/10 relative z-10">
          <h3 className="font-display font-black text-2xl uppercase tracking-widest text-black mb-8 flex items-center gap-2 px-4">
            <span>📂</span> Status Akt (Stan na 2024)
          </h3>

          <div className="grid gap-4 px-4">
            <div className="border-2 border-black bg-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div>
                <span className="block font-display text-black font-bold uppercase">Sprawa Gospodarcza PR 123/2023</span>
                <span className="block text-xs text-black/60 mt-1 font-mono">Status: Akta skradzione</span>
              </div>
              <span className="font-mono text-sm font-black bg-black text-white px-4 py-2 border border-black tracking-widest">
                BRAK DANYCH
              </span>
            </div>

            <div className="border-2 border-black bg-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div>
                <span className="block font-display text-black font-bold uppercase">Śledztwo w sprawie włamania PR 999/2024</span>
                <span className="block text-xs text-black/60 mt-1 font-mono">Status: Akta skradzione podczas włamania</span>
              </div>
              <span className="font-mono text-sm font-black bg-red-600 text-white border-2 border-black px-4 py-2 tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                LOST
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
