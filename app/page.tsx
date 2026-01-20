import React from 'react';
import { Scale, FileText, Search, AlertCircle, User, Mail } from 'lucide-react';

// --- KOMPONENTY STYLU "NAJS" ---

// 1. Stylizowane "Akta Sprawy" do prezentacji dowodów
const CaseFile = ({ title, children, type = 'evidence' }: { title: string, children: React.ReactNode, type?: 'evidence' | 'transcript' }) => (
  <div className="my-12 border border-stone-300 bg-white shadow-sm rounded-sm overflow-hidden break-inside-avoid">
    <div className="bg-stone-100 border-b border-stone-200 px-4 py-2 flex items-center gap-2 text-xs font-mono text-stone-500 uppercase tracking-wider">
      {type === 'evidence' ? <FileText className="w-4 h-4" /> : <Search className="w-4 h-4" />}
      <span>{title}</span>
    </div>
    <div className="p-6 font-mono text-sm md:text-base leading-relaxed text-stone-800 bg-[url('https://www.transparenttextures.com/patterns/subtle-paper.png')]">
      {children}
    </div>
  </div>
);

// 2. Notatka Prawna do definicji (np. Dohoda)
const LegalNote = ({ term, children }: { term: string, children: React.ReactNode }) => (
  <div className="my-10 flex gap-4 p-5 bg-blue-50/50 border-l-4 border-blue-900/80 rounded-r-lg">
    <Scale className="w-6 h-6 text-blue-900/80 shrink-0 mt-1" />
    <div>
      <strong className="block font-serif text-blue-900 text-lg mb-2">{term}</strong>
      <div className="text-stone-700 text-sm leading-relaxed">{children}</div>
    </div>
  </div>
);

// 3. Ramka Wideo
const EvidenceVideo = ({ src, title, caption }: { src: string, title: string, caption: string }) => (
  <figure className="my-12">
    <div className="aspect-w-16 aspect-h-9 bg-black rounded-sm shadow-lg overflow-hidden relative group">
      <iframe
        src={src}
        title={title}
        className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
    <figcaption className="mt-3 text-sm text-stone-500 font-sans border-l-2 border-stone-300 pl-3">
      <span className="font-bold text-stone-900 uppercase text-xs mr-2">Materiał Wideo:</span>
      {caption}
    </figcaption>
  </figure>
);

// --- GŁÓWNY KOMPONENT STRONY ---

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1a1a1a] selection:bg-yellow-200/50 font-serif">
      
      {/* HEADER REPORTAŻU */}
      <header className="pt-20 pb-12 px-4 border-b border-stone-200">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block mb-6 px-3 py-1 border border-stone-900 text-[10px] font-sans font-bold tracking-[0.2em] uppercase">
            Śledztwo Dziennikarskie
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8 text-stone-900">
            Dwa światy Wiedźmina: <br/>
            <span className="text-stone-500 italic font-medium text-3xl md:text-5xl block mt-4">
              Mroczna tajemnica ayahuaski i milionerów z CD Projekt
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-stone-700 leading-relaxed italic border-y border-stone-200 py-8 my-8">
            W cieniu głośnego procesu &bdquo;szamanów&rdquo; z polskiego establishmentu, dziennikarskie śledztwo ujawnia sieć powiązań prowadzącą do twórców globalnego hitu – gry &bdquo;Wiedźmin&rdquo;.
          </p>

          {/* BYLINE AUTORA */}
          <div className="flex flex-col items-center justify-center gap-2 mt-8 font-sans text-stone-500 text-sm">
            <div className="flex items-center gap-2 mb-1">
              <User className="w-4 h-4" />
              <span className="font-bold text-stone-900 uppercase tracking-wider">Detektyw Polutek</span>
              <span className="text-stone-400">|</span>
              <span>Dziennikarz Śledczy</span>
            </div>
            <a href="mailto:detektyw.polutek@protonmail.com" className="flex items-center gap-2 hover:text-blue-700 transition-colors">
              <Mail className="w-3 h-3" />
              detektyw.polutek@protonmail.com
            </a>
          </div>
        </div>
      </header>

      {/* TREŚĆ ARTYKUŁU */}
      <article className="max-w-2xl mx-auto px-4 py-12">
        
        <div className="prose prose-stone prose-lg max-w-none prose-headings:font-sans prose-headings:font-bold prose-a:text-blue-800 hover:prose-a:text-blue-900 prose-blockquote:not-italic">
          
          <p className="first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-stone-900 leading-relaxed">
            Większość Polaków kojarzy sprawę polskich &bdquo;szamanów&rdquo; ayahuaski z głośnym aresztowaniem małżeństwa Kordysów w 2020 roku. Media pokazywały policyjne nagrania z nalotu, pisały o sekcie. Dla przeciętnego obserwatora sprawa wydawała się zamknięta: policja złapała &bdquo;szamana&rdquo; Kordysa i jego żonę, sąd wymierzył surowy wyroki 8,5 roku i 5 lat więzienia, a finałem było spektakularne ułaskawienie przez czeskiego prezydenta po dwóch latach odsiadki. Kurtyna opadła, temat ucichł. Ale czy to na pewno koniec tej historii?
          </p>

          <p>
            Analiza akt sądowych prowadzi do zdumiewających wniosków. W cieniu tego głośnego procesu toczył się drugi – cichy i błyskawiczny. Tropy prowadzą do posiadłości, której właścicielem okazał się miliarder – <strong>Michał Kiciński</strong>. W Janovie równolegle funkcjonował inny ayahuaskowy ośrodek, w którym – podobnie jak u Kordysów – odbywały się nielegalne ceremonie z użyciem psychodelików. 
          </p>

          <div className="my-10 p-6 bg-stone-100 border-l-2 border-stone-400 italic text-stone-800 font-medium">
            Podczas gdy Kordysowie trafili na czołówki gazet i do celi, bliźniacza sprawa, w którą uwikłane jest nazwisko jednego z najbogatszych Polaków, zakończyła się na dyskretnym wyroku w zawieszeniu, o którym nikt nawet w mediach się nie zająknął.
          </div>

          <CaseFile title="Uzasadnienie Wyroku (Sygn. 30 T 5/2021)">
            <p className="mb-4">W uzasadnieniu wyroku Jarosława Kordysa pojawia się postać świadka Bartosza B.:</p>
            <p className="pl-4 border-l-2 border-stone-300 italic mb-2">
              &bdquo;Świadek B. odnośnie osoby oskarżonego [Jarosława Kordysa] oświadczył, że zna się z nim ok. 8 lat, a poznali się w Holandii&rdquo;.
            </p>
            <p className="pl-4 border-l-2 border-stone-300 italic">
               &bdquo;Świadek B. potwierdził, że i on sam w przeszłości prowadził warsztaty&rdquo;, a obecnie sam &bdquo;jest przedmiotem dochodzenia policji w Krnowie właśnie z powodu ceremonii&rdquo;.
            </p>
          </CaseFile>

          <p>
            Akta ujawniają również skalę zarzutów wobec Bartosza B.: był podejrzany o przestępstwo niedozwolonej produkcji i obrotu środkami odurzającymi, m.in. w związku ze sprowadzeniem przesyłki z &bdquo;4,5 kg DMT&rdquo; w 2014 roku oraz innej z meskaliną i DMT w 2018 roku.
          </p>

          <p>Intrygujący fragment dotyczy własności &bdquo;bazy&rdquo;:</p>

          <CaseFile title="Ustalenia własnościowe">
            <p className="italic">
              &quot;Świadek [Bartosz B.] potwierdził, że w Janowie jest właścicielem jednej dziesiątej nieruchomości&rdquo;.
            </p>
            <p className="mt-4 font-bold not-italic text-stone-900">
               Do kogo należała reszta? Sąd wskazuje wprost: <br/>
               &bdquo;...w odniesieniu do nieruchomości będących współwłasnością Bartosza B. i Michala D. K.&rdquo;.
            </p>
          </CaseFile>

          <p>
            W Czechach księgi wieczyste są jawne i dostępne online. Wystarczy wejść na stronę Katastru Nieruchomości, wyszukać działkę w Janovie i pobrać jej historię (obręb: Janov u Krnova [656976], działka nr st. 281, LV 127).
          </p>

          <p>
            Pobrany dokument nie pozostawia wątpliwości: w latach 2012–2023 współwłaścicielami nieruchomości byli <strong>Bartosz Badowski (1/10)</strong> oraz <strong>Michał Dawid Kiciński (9/10)</strong>. Drugie imię – Dawid – idealnie wypełnia lukę w zanonimizowanym sądowym skrócie. Wspólnikiem w &bdquo;bazie&rdquo; był twórca Wiedźmina.
          </p>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Telefon, który pogrążył imperium</h2>

          <p>
            Przełom w sprawie organizatorów ceremonii w 2020 roku nastąpił dzięki policyjnej technice operacyjnej. Telefon Kordysa był na stałym podsłuchu. 24 sierpnia 2020 roku doszło do nerwowej wymiany zdań. Kordys bał się, że tragedia, o której huczało w kuluarach, może zniszczyć ich imperium.
          </p>

          <CaseFile title="Transkrypcja podsłuchu (Rekonstrukcja Sądu)" type="transcript">
            <p>
              &bdquo;Oskarżony J. K. omawia z B., że dotarła do niego informacja, że w obiekcie w Janovie miała <span className="bg-red-100 text-red-900 font-bold px-1">zmarła jakaś kobieta</span>&rdquo;.
            </p>
            <p className="mt-4">
              W rozmowie pojawia się wątek szantażysty. Kordys pyta wprost: <br/>
              <span className="font-bold text-stone-900">&bdquo;W jakim zagrożeniu jest nasza praca?&rdquo;</span>
            </p>
          </CaseFile>

          <p>Odpowiedź znajduje się w aktach sprawy i nie pozostawia złudzeń co do intencji rozmówców.</p>

          <div className="my-8 pl-6 border-l-4 border-stone-900 font-serif italic text-xl text-stone-800">
             &bdquo;Z ich rozmowy wynika, że nie zajmowali się samym faktem śmierci, lecz raczej obawą, aby to nie przyciągnęło uwagi policji. Śmierć człowieka była dla nich jedynie psuciem interesów.&rdquo;
          </div>

          <p>
            Cynizm tej konwersacji sięga zenitu chwilę później. Gdy tylko ustalili strategię uciszenia plotek, natychmiast przeszli do logistyki dostaw narkotyku. Sąd odnotowuje, że zaraz po dywagacjach o śmierci, rozmówcy wracają do interesów, &bdquo;ekscytując się nagraniem od dostawcy, który siedzi w dżungli i gotuje&rdquo;.
          </p>

          <p>
            Zaledwie dwa dni po tym telefonie, 26.08.2020 czescy policjanci weszli do posiadłości Badowskiego (i Kicińskiego). Efekty? Zabezpieczono 2 kg substancji z DMT. Wśród 15 zatrzymanych obywateli Polski byli weterani ceremonii i przyjaciele Badowskiego: <strong>Krzysztof Stefanek i Lena Drzewińska</strong>.
          </p>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Cena wolności i zdrady</h2>

          <p>
            Kiedy policja weszła do Janova, Jarosław Kordys wciąż czuł się bezpiecznie. Nie wiedział, że zegar zaczął odliczać czas. Siedem tygodni później, 15 października 2020, funkcjonariusze zapukali do jego drzwi.
          </p>

          <EvidenceVideo 
            src="https://www.youtube.com/embed/h52n25BjzH4" 
            title="Aresztowanie Kordysa"
            caption="Policyjne nagranie z aresztowania małżeństwa Kordysów (2020)"
          />

          <p>
            Co wydarzyło się w ciągu tych niespełna dwóch miesięcy? Odpowiedź kryje się w jednym terminie prawnym:
          </p>

          <LegalNote term="Dohoda o vině a trestu">
             Czeska instytucja prawna (ugoda o winie i karze), pozwalająca oskarżonemu na dobrowolne poddanie się karze w zamian za łagodniejszy wyrok, bez przeprowadzania pełnego postępowania dowodowego i przesłuchiwania świadków.
          </LegalNote>

          <p>
            Bartosz Badowski, wspólnik Kicińskiego, postanowił &bdquo;kupić&rdquo; sobie wolność. Ugoda pozwoliła na zamknięcie jego teczki bez wywoływania świadków, co uchroniło jego cichego wspólnika przed wstrząsem. Cena wolności Badowskiego okazała się jednak wysoka dla Kordysa – zeznania Badowskiego stały się dla prokuratury bezcennym dowodem.
          </p>

          <CaseFile title="Wyrok skazujący (Sygn. 66 T 146/2021)" type="evidence">
             <p className="mb-2"><strong>Oskarżony:</strong> Bartosz Badowski</p>
             <p className="mb-2"><strong>Czyn:</strong> Zbrodnia niedozwolonej produkcji i obrotu środkami odurzającymi.</p>
             <p className="mb-4"><strong>Ustalenia:</strong> Organizacja co najmniej 441 ceremonii, udostępnianie ayahuaski i marihuany.</p>
             <p className="bg-stone-200 p-2 font-bold text-stone-800 text-center">WYROK: W ZAWIESZENIU</p>
          </CaseFile>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Cisza po burzy i nowy porządek</h2>

          <p>
            Choć Badowski zaprzestał działalności, posiadłość w Janovie nie opustoszała – zamieszkali z nim Krzysztof Stefanek i Magdalena Drzewińska. Ich obecność u boku &apos;Badiego&apos;, mimo wiedzy o mrocznych kulisach śmierci w ośrodku, dowodzi, że w pełni akceptowali reguły tej gry.
          </p>
          
          <p>
            W cieniu pozostaje rola Michała Kicińskiego. Twórca Wiedźmina stał się w mediach ambasadorem ayahuaski, opowiadając o swojej przemianie i &bdquo;nowej rzeczywistości&rdquo;. Budowa infrastruktury dla &bdquo;duchowych poszukiwań&rdquo; (jak ośrodek Oddechowo) stała się jego strategią życiową.
          </p>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Wezwanie na policję i &quot;zadośćuczynienie&quot;</h2>

          <p>
            Jesienią 2023 roku Kiciński odebrał wezwanie na policję w sprawie Janova. Zrozumiał, że ktoś złożył zawiadomienie. Jego reakcja była natychmiastowa:
          </p>

          <CaseFile title="Wiadomość prywatna">
            <p className="italic">
              &bdquo;(...) Tak mogę zapłacić za swój błąd z Badim. Podaj mi Fundacje (...) i wpłacę tam dobrowolnie kwotę darowizny, w ramach Przeprosin wszechświatowi, za moją młodzieńczą naiwność i brak przenikliwości.&rdquo;
            </p>
          </CaseFile>

          <p>
            11 października 2023 roku miliarder zeznał na policji, że nie ma wiedzy o tym, co działo się na jego farmie i odmówił odpowiedzi na pytania o swój udział w ceremoniach.
          </p>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Darowizna, czyli gorący kartofel</h2>

          <p>
            Zaledwie 12 dni po kłopotliwym przesłuchaniu, Kiciński wykonał telefon do Krzysztofa Stefanka z propozycją oddania majątku wartego miliony w darowiźnie.
          </p>

          <EvidenceVideo 
            src="https://www.youtube.com/embed/4Xujw-krjxs" 
            title="Wypowiedź Stefanka"
            caption="Krzysztof Stefanek opowiada o 'cudownym' otrzymaniu darowizny (2025)"
          />

          <p>
            Stefanek przedstawia to jako cudowny zbieg okoliczności. Jednak kalendarz wydarzeń (wezwanie na policję -> przesłuchanie -> darowizna) sugeruje nerwowy pośpiech w pozbywaniu się &bdquo;gorącego kartofla&rdquo;. Obdarowani – Stefanek i Drzewińska – doskonale znali historię tego miejsca. Przyjmując darowiznę, przejmowali nie tylko ziemię, ale i milczenie.
          </p>

          <p>
            Majątek, który mógł podlegać przepadkowi, został bezpiecznie zaparkowany w stowarzyszeniu "Natury Zew". Prawda o śmierci została przykryta warstwą ziemi w ogrodzie permakulturowym.
          </p>

          <div className="mt-8 flex items-start gap-4 bg-red-50 p-4 border border-red-100 rounded text-sm text-stone-700">
             <AlertCircle className="w-5 h-5 text-red-800 shrink-0 mt-0.5" />
             <div>
               <strong>Śledztwo trwa:</strong> W maju 2024 roku Prokuratura Rejonowa w Częstochowie ruszyło śledztwo (3013-1.Ds.15.2024), mające wyjaśnić okoliczności śmierci Ilony Lewandowskiej.
             </div>
          </div>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Bliźniaczy ośrodek i drugi miliarder</h2>

          <p>
             W miejscowości Nýdek funkcjonował kolejny, bliźniaczy ośrodek, gdzie ceremonie prowadził Piotr &bdquo;Bonawentura&rdquo; Tracz. Dowody z archiwum internetu i ksiąg wieczystych są jednoznaczne.
          </p>

          <p>
            Właścicielem tej &apos;szamańskiej świątyni&apos; w latach 2016-2021 był drugi z założycieli CD Projekt, <strong>Marcin Iwiński</strong>. Gdy aresztowano Kordysa, Iwiński nagle sprzedał posiadłość... samemu Bonawenturze. Czy niszowy szaman miał środki na zakup luksusowej willi? Czy była to kolejna &bdquo;ucieczka do przodu&rdquo;?
          </p>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Sprawiedliwość na sprzedaż?</h2>

          <p>
            Historia Janova i Nýdka to opowieść o dwóch równoległych światach. W jednym siedzą &bdquo;szamani&rdquo;, w drugim – na szczytach list Forbesa – trwają ludzie, którzy tę infrastrukturę sfinansowali. Choć miliony z cyfrowej rozrywki pozwoliły na budowę azylów w górach, nie zdołały kupić spokoju sumienia wobec śmierci. Czy sprawiedliwość jest tylko iluzją i kwestią zasobności portfela?
          </p>
        </div>

        {/* STOPKA ŹRÓDŁOWA */}
        <footer className="mt-24 pt-12 border-t-2 border-stone-200 font-sans">
          <h3 className="text-xl font-bold text-stone-900 mb-8 uppercase tracking-widest flex items-center gap-2">
            <Search className="w-5 h-5" /> Dokumenty Źródłowe
          </h3>
          
          <div className="grid gap-4 text-sm text-stone-600">
            <div className="p-4 bg-white border border-stone-200 hover:border-blue-300 transition-colors shadow-sm">
              <h4 className="font-bold text-stone-900 mb-1">Wyrok Bartosza B. (Sygn. 66 T 146/2021)</h4>
              <p className="mb-2">Sąd Rejonowy w Bruntalu.</p>
              <a href="https://infosoud.justice.cz/InfoSoud/file/29Si25_2022/1" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-bold">
                🔗 Pobierz PDF (Ministerstwo Sprawiedliwości)
              </a>
            </div>

            <div className="p-4 bg-white border border-stone-200 hover:border-blue-300 transition-colors shadow-sm">
              <h4 className="font-bold text-stone-900 mb-1">Sprawa karna Jarosława Kordysa (Sygn. 30 T 5/2020)</h4>
              <p className="mb-2">Sąd Wojewódzki w Ostrawie.</p>
              <a href="https://infosoud.justice.cz/InfoSoud/public/search.jsp" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-bold">
                🔗 Sprawdź w Rejestrze InfoSoud
              </a>
            </div>

            <div className="p-4 bg-white border border-stone-200 hover:border-blue-300 transition-colors shadow-sm">
              <h4 className="font-bold text-stone-900 mb-1">Księgi Wieczyste (ČÚZK)</h4>
              <p className="mb-2">Działka Janov (656976, nr 281) & Nýdek (708186, nr 506).</p>
              <a href="https://nahlizenidokn.cuzk.cz/" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-bold">
                🔗 Weryfikuj online
              </a>
            </div>
          </div>
        </footer>
      </article>
    </main>
  );
}
