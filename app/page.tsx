"use client";
import React, { useState } from 'react';
import { Scale, FileText, Search, AlertCircle, User, Mail, MapPin, Calendar, Globe, CassetteTape, X } from 'lucide-react';

// --- KOMPONENTY STYLU "NAJS" (LEKKI, ORYGINALNY) ---

const CaseFile = ({ title, children, type = 'evidence' }: { title: string, children: React.ReactNode, type?: 'evidence' | 'transcript' | 'email' }) => (
  <div className="my-8 border border-stone-300 bg-white shadow-sm rounded-sm overflow-hidden break-inside-avoid">
    <div className="bg-stone-100 border-b border-stone-200 px-4 py-2 flex items-center gap-2 text-xs font-mono text-stone-500 uppercase tracking-wider">
      {type === 'email' ? <Mail className="w-4 h-4" /> : type === 'transcript' ? <Search className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
      <span>{title}</span>
    </div>
    <div className="p-6 font-mono text-sm md:text-base leading-relaxed text-stone-800 bg-[url('https://www.transparenttextures.com/patterns/subtle-paper.png')] italic">
      {children}
    </div>
  </div>
);

const LegalNote = ({ term, children }: { term: string, children: React.ReactNode }) => (
  <div className="my-10 flex gap-4 p-5 bg-blue-50/50 border-l-4 border-blue-900/80 rounded-r-lg">
    <Scale className="w-6 h-6 text-blue-900/80 shrink-0 mt-1" />
    <div>
      <strong className="block font-serif text-blue-900 text-lg mb-2">{term}</strong>
      <div className="text-stone-700 text-sm leading-relaxed">{children}</div>
    </div>
  </div>
);

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

// LEKKI KOMPONENT CYTATU (PULL QUOTE)
const PullQuote = ({ quote, author, source }: { quote: string, author: string, source: string }) => (
  <div className="my-10 pl-6 border-l-[3px] border-stone-800/80">
    <p className="font-serif text-xl md:text-2xl italic text-stone-900 leading-relaxed mb-3">
      „{quote}”
    </p>
    <div className="font-sans text-[10px] uppercase tracking-widest text-stone-500">
      — <span className="font-bold text-stone-800">{author}</span>, {source}
    </div>
  </div>
);

// --- NOWY STYL MODALA ---
const EvidenceAudioModal = ({ src, isOpen, onClose }: { src: string, isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 transition-all duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#1a1a1a] shadow-2xl rounded-lg w-full max-w-sm relative overflow-hidden animate-[fadeIn_0.3s_ease-out] border border-stone-700"
      >
        {/* Górny pasek dekoracyjny */}
        <div className="h-1 w-full bg-gradient-to-r from-red-800 via-red-600 to-red-800"></div>

        <div className="p-6 relative">
          {/* Tło tekstura */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] pointer-events-none"></div>

          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-[0.2em]">Dowód #A-23</span>
              </div>
              <h3 className="text-stone-100 font-serif text-xl italic tracking-wide">„Rozmowa w ogrodzie”</h3>
            </div>
            <button 
              onClick={onClose} 
              className="text-stone-500 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wizualizacja kasety */}
          <div className="bg-stone-800 rounded border border-stone-700 p-4 mb-6 shadow-inner relative group">
            <div className="flex justify-between items-center bg-black/40 rounded px-3 py-4 border border-stone-600/50">
               <div className="w-8 h-8 rounded-full border-2 border-stone-600 bg-[#111] flex items-center justify-center">
                 <div className="w-2 h-2 bg-stone-700 rounded-full"></div>
               </div>
               
               <div className="flex-1 mx-3 h-8 bg-[#2a2a2a] rounded flex items-center justify-center overflow-hidden relative">
                  <div className="absolute w-[120%] h-[1px] bg-stone-600 rotate-12 top-1/2"></div>
                  <span className="text-[9px] font-mono text-stone-500 z-10 bg-[#2a2a2a] px-1">SIDE A</span>
               </div>

               <div className="w-8 h-8 rounded-full border-2 border-stone-600 bg-[#111] flex items-center justify-center">
                  <div className="w-2 h-2 bg-stone-700 rounded-full"></div>
               </div>
            </div>
            <div className="mt-3 text-center">
               <span className="font-mono text-[10px] text-stone-400 uppercase tracking-wider block">K. Stefanek / 2023</span>
            </div>
          </div>

          {/* Player */}
          <div className="bg-stone-200 rounded p-1">
            <audio controls className="w-full h-8 accent-stone-900 focus:outline-none">
              <source src={src} type="audio/mpeg" />
              Twoja przeglądarka nie obsługuje elementu audio.
            </audio>
          </div>

        </div>
      </div>
    </div>
  );
};


// --- GŁÓWNY KOMPONENT ---

export default function Home() {
  const [isAudioOpen, setIsAudioOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1a1a1a] selection:bg-yellow-200/50 font-serif flex flex-col">
      
      {/* HEADER */}
      <header className="pt-20 pb-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          
          <div className="inline-block mb-6 px-3 py-1 border border-stone-900 text-[10px] font-sans font-bold tracking-[0.2em] uppercase">
            Śledztwo Dziennikarskie
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8 text-stone-900">
            Dwa światy Wiedźmina: <br/>
            <span className="text-stone-500 italic font-medium text-3xl md:text-5xl block mt-4">
              Mroczna tajemnica Ayahuaski i milionerów z CD Projekt
            </span>
          </h1>

          {/* LEAD Z KRESKAMI GÓRA/DÓŁ (BEZ PEŁNEJ SZEROKOŚCI) */}
          <div className="max-w-2xl mx-auto border-y border-stone-200 py-8 px-4">
            <p className="text-xl md:text-2xl text-stone-700 leading-relaxed italic">
              W cieniu głośnego procesu „szamanów” z polskiego establishmentu, dziennikarskie śledztwo ujawnia sieć powiązań prowadzącą do twórców gry „Wiedźmin”.
            </p>
          </div>
        </div>
      </header>

      {/* ARTYKUŁ */}
      <article className="max-w-2xl mx-auto px-4 py-8 flex-grow">
        
        <div className="prose prose-stone prose-lg max-w-none prose-headings:font-sans prose-headings:font-bold prose-a:text-blue-800 hover:prose-a:text-blue-900 prose-blockquote:not-italic">
          
          <p className="first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-stone-900 leading-relaxed">
            Większość Polaków kojarzy sprawę polskich „szamanów” ayahuaski z głośnym aresztowaniem małżeństwa Kordysów w 2020 roku. Media pokazywały policyjne nagrania z nalotu, pisały o sekcie. Dla przeciętnego obserwatora sprawa wydawała się zamknięta: policja złapała „szamana” Kordysa i jego żonę, sąd wymierzył surowy wyroki 8,5 roku dla Jarosława i 5,5 lat więzienia dla Karoliny, a finałem było spektakularne ułaskawienie przez czeskiego prezydenta po dwóch latach odsiadki.
          </p>

          <p>
            Kurtyna opadła, temat ucichł. Ale czy to na pewno koniec tej historii? Analiza akt sądowych prowadzi do zdumiewających wniosków. W cieniu tego głośnego procesu toczył się drugi – cichy i błyskawiczny. Tropy prowadzą do posiadłości, której właścicielem okazał się miliarder – <strong>Michał Kiciński</strong>.
          </p>

          <p>
            W Janovie równolegle funkcjonował inny ayahuaskowy ośrodek, w którym – podobnie jak u Kordysów – odbywały się nielegalne ceremonie z użyciem psychodelików. Podczas gdy Kordysowie trafili na czołówki gazet i do celi, bliźniacza sprawa, w którą uwikłane jest nazwisko jednego z najbogatszych Polaków, zakończyła się na dyskretnym wyroku w zawieszeniu, o którym nikt nawet w mediach się nie zająknął.
          </p>

          <p>
            W obszernym i publicznie dostępnym uzasadnieniu wyroku Jarosława Kordysa (sygn. 30 T 5/2021) pojawia się postać świadka Bartosza B. Zgodnie z aktami:
          </p>

          <CaseFile title="Zeznania świadka B.">
            „Świadek B. odnośnie osoby oskarżonego [Jarosława Kordysa] oświadczył, że zna się z nim ok. 8 lat, a poznali się w Holandii”.
            <br/><br/>
            „Świadek B. potwierdził, że i on sam w przeszłości prowadził warsztaty”, a obecnie sam „jest przedmiotem dochodzenia policji w Krnowie właśnie z powodu ceremonii”.
          </CaseFile>

          <p>
            Akta ujawniają również skalę zarzutów wobec Bartosza B.:
          </p>

          <CaseFile title="Zarzuty wobec Bartosza B.">
            „(...)wymieniony był sprawdzany w związku z występkiem niedozwolonej produkcji i innego obchodzenia się ze środkami odurzającymi (...) albowiem miał w roku 2014 zlecić przesłanie na swój adres przesyłki pocztowej przechwyconej na lotnisku w Lipsku RFN zawierającej 4,5 kg DMT, a 6.6.2018 miało dojść do zatrzymania przesyłki pocztowej we Frankfurcie nad Menem RFN zawierającej 2000 g meskaliny i 38,6 g substancji DMT.”
          </CaseFile>

          <p>
            Intrygujący fragment dotyczy własności „bazy”:
          </p>

          <CaseFile title="Własność nieruchomości">
            &quot;Świadek [Bartosz B.] potwierdził, że w Janowie jest właścicielem jednej dziesiątej nieruchomości”.
          </CaseFile>

          <p>
            Do kogo należała reszta? Sąd wskazuje wprost:
          </p>

          <CaseFile title="Ustalenia Sądu">
            „...w odniesieniu do nieruchomości będących współwłasnością Bartosza B. i Michala D. K.”.
          </CaseFile>

          <p>
            W Czechach księgi wieczyste są jawne i dostępne online. Wystarczy wejść na stronę Katastru Nieruchomości, wyszukać działkę w Janovie i za niewielką opłatą pobrać jej pełną historię (obręb: Janov u Krnova [656976], działka nr st. 281, numer arkusza własności: LV 127).
          </p>

          <div className="my-10 p-6 bg-stone-100 border-l-2 border-stone-400 italic text-stone-800 font-medium">
            Pobrany dokument nie pozostawia wątpliwości: w latach 2012–2023 współwłaścicielami nieruchomości byli Bartosz Badowski (1/10) oraz Michał Dawid Kiciński (9/10).
          </div>

          <p>
            Drugie imię – Dawid – idealnie wypełnia lukę w zanonimizowanym skrócie „Michal D. K.”. Wspólnikiem w „bazie” był twórca Wiedźmina - jeden z najbogatszych Polaków.
          </p>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Telefon, który pogrążył imperium</h2>

          <p>
            Przełom w sprawie organizatorów ayahuaskowych ceremonii w 2020 roku nastąpił dzięki policyjnej technice operacyjnej. Telefon Kordysa był na stałym podsłuchu, a funkcjonariusze słuchali na żywo, gdy w dniu 24.08.2020 r. doszło do nerwowej wymiany zdań pomiędzy Badowskim i Kordysem.
          </p>

          <p>
            Kordys zadzwonił do Badowskiego wyraźnie zaniepokojony wieściami, które do niego dotarły. Bał się, że tragedia, o której huczało w kuluarach, może zniszczyć ich imperium. Sąd w uzasadnieniu wyroku precyzyjnie rekonstruuje ten moment:
          </p>

          <CaseFile title="Rekonstrukcja rozmowy (Uzasadnienie Sądu)" type="transcript">
            „oskarżony J. K. omawia z B., że dotarła do niego informacja, że w obiekcie w Janovie  <span className="bg-red-100 text-red-900 font-bold px-1">zmarła jakaś kobieta</span>”.
          </CaseFile>

          <p>
            W rozmowie pojawia się też wątek zagrożenia ze strony osoby trzeciej – mężczyźni omawiają jakiegoś szantażystę, który chce iść na policję. Kordys wprost pyta wspólnika:
          </p>

          <CaseFile title="Pytanie Kordysa" type="transcript">
            „W jakim zagrożeniu jest nasza praca?”
          </CaseFile>

          <p>
            Odpowiedź na to pytanie znajduje się w aktach sprawy i nie pozostawia złudzeń co do intencji rozmówców. W uzasadnieniu wyroku Kordysa czytamy:
          </p>

          <div className="my-8 pl-6 border-l-4 border-stone-900 font-serif italic text-xl text-stone-800">
            „Z ich rozmowy wynika, że nie zajmowali i się w zasadzie samym faktem śmierci, lecz raczej obawą, aby to nie przyciągnęło uwagi policji.&quot;
          </div>

          <p>
            Dla sądu był to koronny dowód na to, że oskarżeni prowadzili nielegalny biznes, a nie działalność duchową – śmierć człowieka była dla nich jedynie „psuciem interesów”.
          </p>

          <p>
            Cynizm tej konwersacji sięga zenitu chwilę później. Gdy tylko ustalili strategię uciszenia plotek, natychmiast przeszli do logistyki dostaw narkotyku. Sąd odnotowuje, że zaraz po dywagacjach o śmierci i szantażu, rozmówcy wracają do interesów:
          </p>

          <CaseFile title="Kontynuacja rozmowy" type="transcript">
            „Następnie w rozmowie omawiają zamówienia &quot;herbaty&quot; z dżungli i to, czy im tego &quot;nie zepsują”, ekscytując się nagraniem od dostawcy, który „siedzi w dżungli i gotuje”.
          </CaseFile>

          <p>
            Dla policjantów, którzy słyszeli to w czasie rzeczywistym, przekaz był jasny: w obiekcie mogło dojść do tragedii, a sprawcy martwią się jedynie o ciągłość dostaw.
          </p>

          <p>
            Zaledwie dwa dni po tym telefonie, 26.08.2020 czescy policjanci weszli do posiadłości Badowskiego (i Kicińskiego) w Janowie. Efekty rewizji opisano w wyroku Kordysa:
          </p>

          <CaseFile title="Protokół rewizji">
            „w nieruchomości zabezpieczono rzeczy... oprócz marihuany zabezpieczono również substancje zawierające DMT o objętości ok. 2 kg”.
          </CaseFile>

          <p>
            Podczas policyjnej interwencji zidentyfikowano tam „15 obywateli Polski”, którzy mieli brać udział w ceremonii. Wśród nich, stali bywalcy i bliscy znajomi Badowskiego – <strong>Krzysztof Stefanek</strong> i <strong>Lena Drzewińska</strong>, których obecność w momencie wkroczenia służb ma znaczenie w kontekście późniejszej ich roli w tej historii.
          </p>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Cena wolności i zdrady</h2>

          <p>
            Kiedy 26 sierpnia 2020 roku czeska policja weszła do posiadłości w Janovie, należącej do Bartosza Badowskiego i miliardera Michała Kicińskiego, Jarosław Kordys wciąż czuł się bezpiecznie. Nie wiedział jeszcze, że zegar zaczął odliczać czas do jego własnej katastrofy. Równo siedem tygodni później, 15 października 2020 roku, funkcjonariusze zapukali do drzwi Kordysów, kończąc działalność ich imperium.
          </p>

          <p>
            Podczas gdy Bartosz Badowski – po swojej sierpniowej wpadce – przebywał już na wolności, u Kordysów rozpętało się piekło. Zaledwie 7 tygodni po cichym nalocie na Badowskiego, 15 października 2020 roku sielankę w ich ośrodku przerwał huk granatów ogłuszających. Czeska jednostka antyterrorystyczna nie bawiła się w półśrodki: zamaskowani funkcjonariusze z długą bronią wdarli się do budynku, rzucając na ziemię przyszłych bohaterów głośnego skandalu.
          </p>

          {/* WIDEO 1: Aresztowanie Kordysa */}
          <EvidenceVideo 
            src="https://www.youtube.com/embed/h52n25BjzH4" 
            title="Aresztowanie Kordysa"
            caption="Policyjne nagranie z aresztowania małżeństwa Kordysów (Październik 2020)"
          />

          <p>
            Co wydarzyło się w ciągu tych niespełna dwóch miesięcy? Odpowiedź kryje się w jednym czeskim terminie prawnym:
          </p>

          <LegalNote term="Dohoda o vině a trestu">
            Ugoda o winie i karze. Czeska procedura karna pozwalająca oskarżonemu na dobrowolne poddanie się karze w zamian za łagodniejszy wyrok, bez przeprowadzania pełnego procesu dowodowego i wzywania świadków.
          </LegalNote>

          <p>
            Bartosz Badowski, wspólnik jednego z najbogatszych Polaków, błyskawicznie zrozumiał swoje położenie. W obliczu zabezpieczonych dowodów – w tym 2 kilogramów substancji z DMT i marihuany – wybrał strategię, która miała uchronić go przed wieloletnim więzieniem. Postanowił „kupić” sobie wolność.
          </p>

          <p>
            Ugoda pozwoliła na zamknięcie jego teczki bez wywoływania świadków, co w praktyce oznaczało, że mechanizmy działania janovskiego ośrodka nigdy nie wybrzmiały echem w publicznej debacie, chroniąc Badowskiego przed krzyżowym ogniem pytań i zeznaniami, które mogłyby pogrążyć także jego cichego wspólnika.
          </p>

          <p>
            Cena wolności Badowskiego okazała się być wysoka dla kogo innego: Zeznania Bartosza B. stały się gwoździem do trumny jego znajomego po fachu Jarosława. Dla prokuratury był to bezcenny materiał dowodowy – zeznania Badowskiego pozwoliły prokuraturze domknąć łańcuch poszlak w sprawie Kordysów.
          </p>

          <p>
            Na mocy wyroku (66 T 146/2021-323) z dnia 2 listopada 2021 roku Bartosz Badowski został uznany winnym popełnienia „zbrodni niedozwolonej produkcji i innego obchodzenia się ze środkami odurzającymi”. Sąd ustalił, że:
          </p>

          <CaseFile title="Ustalenia wyroku skazującego Bartosza B.">
            „co najmniej od bliżej nieustalonej daty w 2015 roku do 26.08.2020 [...] oferował, organizował i co najmniej w 441 przypadkach zrealizował w nieregularnych odstępach czterodniowe i dziesięciodniowe pobyty [...] ukierunkowane na tzw. duchowe ćwiczenia spirytualne”
            <br/><br/>
            „udostępnił uczestnikom do użycia bliżej nieustaloną ilość substancji psychotropowych, a mianowicie tzw. ayahuascę zawierającą dimetylotryptaminę (DMT) oraz tzw. marihuanę zawierającą tetrahydrokannabinol (THC)”
            <br/><br/>
            „przechowywał łącznie 1902,79 grama materiału roślinnego (...), który zawierał łącznie 37,24 grama substancji czynnej dimetylotryptaminy (DMT) oraz 92,29 grama tzw. narkotyku marihuany”.
          </CaseFile>

          <p>
            Podczas gdy Jarosław Kordys został skazany na 8,5 roku pozbawienia wolności Bartosz Badowski, którego sprawa dotyczyła tego samego procederu, tych samych substancji, regionu i czasu trwania działalności, dzięki ugodzie i współpracy z wymiarem sprawiedliwości, zakończył sprawę wyrokiem w zawieszeniu.
          </p>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Cisza po burzy i nowy porządek</h2>

          <p>
            Choć Badowski zaprzestał prowadzenia działalności szamańskiej, posiadłość w Janovie nie opustoszała – zamieszkali z nim wspomniani wcześniej <strong>Krzysztof Stefanek</strong> i <strong>Magdalena Drzewińska</strong>. Ich obecność u boku &apos;Badiego&apos; w tamtym czasie rzuca cień na ich późniejszą rolę; nie byli to wszakże niewinni obserwatorzy, lecz ludzie, którzy mimo tego, że sami byli obecni podczas policyjnego nalotu, pozostali lojalni wobec byłego szamana.
          </p>

          <p>
            Będąc tak blisko Badowskiego, doskonale znali mroczne kulisy śmierci Ilony. Ich decyzja o zamieszkaniu z człowiekiem, który w obliczu tragedii martwił się jedynie o „ciągłość dostaw”, dowodzi, że w pełni akceptowali reguły zmowy milczenia.
          </p>

          {/* NOWY NAGŁÓWEK */}
          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Kiciński</h2>

          <p>
            W cieniu tych wyroków pozostaje wciąż niewyjaśniona rola cichego wspólnika z Janova. Michał Kiciński to nie jest postać, która o ayahuasce jedynie „słyszała” – on stał się jej nieoficjalnym ambasadorem w polskich mediach głównego nurtu. W licznych wywiadach (m.in. dla „Focusa”, „Newsweeka”) z niezwykłą precyzją opisuje on mechanizmy działania psychodelików. Kiciński publicznie opowiada o lekcjach pokory, jakie dała mu „medycyna”, o spotkaniach z szamanami i o tym, jak napar z dżungli otwiera „nową rzeczywistość”.
          </p>

          {/* PULL QUOTE */}
          <PullQuote 
            quote="Po ayahuasce jest szansa na to, żeby sobie nie ściemniać."
            author="Michał Kiciński"
            source="Newsweek, 30 maja 2016 r."
          />

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Wezwanie na policję i &quot;zadośćuczynienie&quot;</h2>

          <p>
            Konfrontacja Michała Kicińskiego z organami ścigania nabrała formalnego kształtu dopiero jesienią 2023 roku. 21 września 2023 roku miliarder osobiście odebrał wezwanie do stawiennictwa w charakterze świadka w sprawie o sygnaturze WD-I-3186/23. Na wezwaniu czytelnie było napisane, że przesłuchanie będzie dotyczyć zdarzeń w Janovie.
          </p>

          <p>
            Reakcja miliardera na zainteresowanie organów ścigania była błyskawiczna. Zwrócił się bezpośrednio do Niezadowolonego Klienta – autora zawiadomienia – wysyłając mu wiadomość mailową z propozycją swoistej pokuty. Zamiast wyjaśnień prokuratorskich zaoferował przelew na cel charytatywny, nazywając lata nielegalnego procederu młodzieńczą naiwnością.
          </p>

          <CaseFile title="Wiadomość prywatna od M. Kicińskiego" type="email">
            „(...)Tak mogę zapłacić za swój błąd z Badim. Podaj mi Fundacje lub Stowarzyszenie (najlepiej powiązaną z hospicjum lub domami dziecka, bo tu Widzę morze potrzeb i dużo cierpienia) i wpłacę tam dobrowolnie kwotę darowizny, w ramach Przeprosin wszechświatowi, za moją młodzieńczą naiwność i brak przenikliwości. Fundacja / Stowarzyszenie musi być uznana i z tradycjami, a nie jakaś organizacja krzak. Wyślę Ci potwierdzenie przelewu.(...)”
          </CaseFile>

          <p>
            Do przesłuchania doszło 11 października 2023 roku o godzinie 15:00  w Komendzie Rejonowej Policji Warszawa II. W protokole Kiciński przyjął linię opartą na braku świadomości co do charakteru działalności prowadzonej w jego posiadłości.
          </p>

          <CaseFile title="Zeznanie do protokołu">
            „Nie mam żadnej wiedzy co się działo na mojej farmie, w której jestem 90% udziałowcem (...) wynajmowałem tę nieruchomość.”
          </CaseFile>

          <p>
            Gdy w toku czynności padło kluczowe pytanie o jego własny udział w ceremoniach ayahuaski w Janovie, odpowiedź była lakoniczna:
          </p>

          <CaseFile title="Odpowiedź na pytanie o udział">
            „nie brałem udziału w takich ceremoniach w latach 2016-2023, a o wcześniejszym okresie <span className="bg-stone-200 px-1 border-b-2 border-stone-800 font-bold italic text-stone-900">odmawiam odpowiedzi</span>”
          </CaseFile>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Darowizna, czy gorący kartofel</h2>

          <p>
            W listopadzie 2025 roku na kanale YouTube „Osada Natury Zew” pojawia się nagrany rok wcześniej film, w którym obecny gospodarz, <strong>Krzysztof Stefanek</strong>, snuje opowieść o powstaniu „Osady”. W sielskiej scenerii, z uśmiechem na ustach, buduje narrację o cudownym zbiegu okoliczności i tajemniczym dobroczyńcy.
          </p>

          <p>
            Stefanek wspomina, jak wspólnie z grupą przyjaciół pomagał uporządkować sprawy własnościowe, by obiekt „znalazł się w jednych rękach”. Kluczowy moment tej opowieści Stefanek datuje z niezwykłą precyzją:
          </p>

          <CaseFile title="Wypowiedź K. Stefanka">
            „Ostatecznie <span className="bg-emerald-100 border-b border-emerald-500 px-1">23 października 2023</span> roku ten człowiek do nas zadzwonił powiedział, że wspólnie z żoną zdecydowali, że oni by chcieli to miejsce przekazać w <span className="bg-emerald-100 border-b border-emerald-500 px-1">darowiźnie</span>&quot;
          </CaseFile>

          <p>
            Stefanek przedstawia to jako efekt „researchu” darczyńcy, który rzekomo urzekł się wizją działalności non-profit.
          </p>

          {/* WIDEO 2: Opowieść Stefanka */}
          <EvidenceVideo 
            src="https://www.youtube.com/embed/4Xujw-krjxs" 
            title="Stefanek o darowiźnie"
            caption="Krzysztof Stefanek opowiada o „cudownym” otrzymaniu darowizny (Materiał z 2025 r.)"
          />

          <p>
            Jednak kalendarz wydarzeń prawnych burzy ten romantyczny mit, ujawniając nerwowy pośpiech w pozbywaniu się „gorącego kartofla”:
          </p>

          <ul className="list-none space-y-4 my-8 font-mono text-sm border-l-2 border-stone-300 pl-4">
            <li className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-stone-400 shrink-0" />
              <div>
                <strong>21 września 2023 r.</strong> – Michał Kiciński odbiera wezwanie na przesłuchanie w sprawie Janova.
              </div>
            </li>
            <li className="flex items-center justify-center text-stone-400">
              &darr;
            </li>
            <li className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-stone-400 shrink-0" />
              <div>
                <strong>11 października 2023 r.</strong> – Miliarder staje przed policją, odmawiając zeznań na temat swojej przeszłości w tym miejscu.
              </div>
            </li>
            <li className="flex items-center justify-center text-stone-400">
              &darr;
            </li>
            <li className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-stone-400 shrink-0" />
              <div>
                <strong>23 października 2023 r.</strong> – Zaledwie 12 dni po kłopotliwym przesłuchaniu, następuje telefon z propozycją oddania majątku wartego miliony za darmo.
              </div>
            </li>
          </ul>

          <p>
            Cynizm tej sytuacji pogłębia fakt, że obdarowani nie byli przypadkowymi entuzjastami ekologii. <strong>Krzysztof Stefanek</strong>, który w filmie mówi o „odwróconej logice” i pięknie wolontariatu, i jego konkubina <strong>Magdalena Drzewińska</strong> w rzeczywistości doskonale znali mroczną historię Janova i tajemnicę śmierci Ilony. Przyjmując darowiznę, przejmowali nie tylko ziemię, ale i milczenie.
          </p>

          <p>
            Ostatecznie strategia okazała się skuteczna. Niezadowolony Klient wycofał sprawę, śledztwo umorzono zanim się zaczęło, a majątek, który mógł podlegać przepadkowi jako narzędzie przestępstwa, został bezpiecznie zaparkowany w „stowarzyszeniu” (Natury Zew). Kiciński pozostał anonimowym &quot;filantropem&quot;, a Stefanek – opiekunem nowej, „czystej” osady. Prawda o śmierci Ilony i o tym, że fundamentem tej sielanki były lata nielegalnego procederu, została przykryta warstwą ziemi w ogrodzie permakulturowym.
          </p>

          <p>
            Na tym jednak historia (na szczęście) się nie kończy.  Niezadowolony Klient nie był  zadowolony, bo „zadośćuczynienie wszechświatowi” miało trafić na hospicjum, a nie na „organizację krzak”. Tymczasem Stefan i Lena, pod płaszczykiem non-profit, zaczęli żyć z organizacji turnusów wypoczynkowych z cennikiem darowizn zamiast paragonów.
          </p>

          <div className="my-8 p-6 border border-stone-300 bg-[#F5F5F4] rounded-sm text-stone-900">
             6 maja 2024 roku Prokuratura Okręgowa w Częstochowie wszczęła śledztwo (3013-1.Ds.15.2024). Nie dotyczy ono wyłącznie udziału Michała Kicińskiego w ayahuaskowym biznesie i kwesti zastanawiającej darowizny, ale przede wszystkim ma na celu wyjaśnienie tajemniczych okoliczności śmierci Ilony Lewandowskiej.
          </div>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Bliźniaczy ośrodek i drugi miliarder</h2>

          <p>
            Gdyby sprawa dotyczyła tylko jednego miliardera, można by mówić o przypadku. Jednak nieco dalej od Janova, w miejscowości Nýdek, funkcjonował kolejny, bliźniaczy ośrodek.
          </p>

          <p>
            Relacje świadków wskazują, że w posiadłości w Nýdku odbywały się regularne ceremonie o charakterze zbliżonym do tych u Kordysów, prowadzone przez <strong>Piotra Bonawenturę Tracza</strong>. Chociaż witryna ośrodka już nie istnieje, archiwum internetu „Wayback Machine” zachowało zrzuty strony <em>tribunydek.com</em>. Opisy warsztatów jednoznacznie wskazują, że nieruchomość była wykorzystywana do pracy z psychodelikami.
          </p>

          <p>
            Skoro wiemy już, czym ten dom był, kluczowym pytaniem staje się: do kogo należał?
          </p>

          <p>
            Analiza czeskich ksiąg wieczystych przynosi sensacyjne odkrycie. Właścicielem tej kolejnej &apos;szamańskiej świątyni&apos; – dokładnie w czasie, gdy strona internetowa zapraszała na ceremonie – był drugi z duetu miliarderów stojących za CD Projekt, <strong>Marcin Iwiński</strong>. Dokumenty urzędowe bezlitośnie łączą jego nazwisko z infrastrukturą, w której odbywał się nielegalny proceder w latach 2016-2021.
          </p>

          <p>
            Jeszcze bardziej zastanawiające jest to, co stało się z tą nieruchomością w momencie zagrożenia. Gdy 15.10.2020 roku aresztowano Kordysa, nad środowiskiem zawisło widmo policyjnych nalotów. Dokumenty urzędowe odsłaniają niepokojącą zbieżność dat:
          </p>

          <ul className="list-none space-y-4 my-8 font-mono text-sm border-l-2 border-stone-300 pl-4">
             <li className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-stone-400 shrink-0" />
              <div>
                <strong>15 października 2020 r.</strong> – Policyjny szturm na ośrodek Kordysów. W środowisku wybucha panika.
              </div>
            </li>
            <li className="flex items-center justify-center text-stone-400">
              &darr;
            </li>
            <li className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-stone-400 shrink-0" />
              <div>
                <strong>15 czerwca 2021 r.</strong> – <strong>Marcin Iwiński</strong> sprzedaje nieruchomości w Nýdku.
              </div>
            </li>
          </ul>

          <p>
            Nabywcą luksusowej posiadłości nie został inny inwestor, lecz sam <strong>Piotr Bonawentura Tracz</strong> – ten sam człowiek, który wcześniej pełnił tam rolę „szamana”. (numer sprawy w katastrze: V-2937/2021-832, obręb: Nýdek [708186]).
          </p>

          <p>
            Transakcja ta rodzi wątpliwości: w jaki sposób niszowy szaman sfinansował zakup luksusowej willi od jednego z najbogatszych Polaków? Nowy właściciel niemal natychmiast zmienił formalny profil działalności na legalne warsztaty pracy z ciałem. Zbieżność tej sekwencji zdarzeń z „darowizną” Kicińskiego w Janovie pozwala dostrzec powtarzalny schemat wycofywania się właścicieli z infrastruktury powiązanej z nielegalnym procederem.
          </p>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Sprawiedliwość na sprzedaż?</h2>

          <p>
            Historia Janova i Nýdka to opowieść o dwóch równoległych światach. W jednym – za kratami czeskich więzień – siedzą „szamani”, których nazwiska stały się synonimem skandalu. W drugim – na szczytach list Forbesa – trwają ludzie, którzy tę infrastrukturę sfinansowali.
          </p>

          <p>
            Choć miliony płynące z cyfrowej rozrywki pozwoliły na budowę azylów w czeskich górach, nie zdołały kupić spokoju sumienia wobec śmierci, która przecięła ten psychodeliczny biznes. Dziś, gdy posiadłości zmieniają właścicieli w blasku darowizn i pospiesznych transakcji, pozostaje pytanie: czy sprawiedliwość, podobnie jak ayahuaskowe wizje, jest tylko iluzją i kwestią zasobności portfela?
          </p>

        </div>

        {/* STOPKA ŹRÓDŁOWA */}
        <footer className="mt-12 pt-12 border-t-2 border-stone-200 font-sans">
          <h3 className="text-xl font-bold text-stone-900 mb-8 uppercase tracking-widest flex items-center gap-2">
            <Search className="w-5 h-5" /> Dokumenty Źródłowe
          </h3>
          
          <div className="grid gap-4 text-sm text-stone-600">
            <div className="p-4 bg-white border border-stone-200 hover:border-blue-300 transition-colors shadow-sm">
              <h4 className="font-bold text-stone-900 mb-1">Wyrok Bartosza B. (Sygn. 66 T 146/2021)</h4>
              <p className="mb-2">Sąd Rejonowy w Bruntalu.</p>
              <a href="https://infosoud.justice.cz/InfoSoud/file/29Si25_2022/1" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-bold flex items-center gap-2">
                <FileText className="w-3 h-3" /> Pobierz PDF
              </a>
            </div>

            <div className="p-4 bg-white border border-stone-200 hover:border-blue-300 transition-colors shadow-sm">
              <h4 className="font-bold text-stone-900 mb-1">Sprawa karna Jarosława Kordysa (Sygn. 30 T 5/2020)</h4>
              <p className="mb-2">Sąd Wojewódzki w Ostrawie.</p>
              <a href="https://infosoud.justice.cz/InfoSoud/public/search.jsp" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-bold flex items-center gap-2">
                <Search className="w-3 h-3" /> Sprawdź w Rejestrze InfoSoud
              </a>
            </div>

            <div className="p-4 bg-white border border-stone-200 hover:border-blue-300 transition-colors shadow-sm">
              <h4 className="font-bold text-stone-900 mb-1">Księgi Wieczyste (ČÚZK)</h4>
              <p className="mb-2">Działka Janov (656976, nr 281) & Nýdek (708186, nr 506).</p>
              <a href="https://nahlizenidokn.cuzk.cz/" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-bold flex items-center gap-2">
                <MapPin className="w-3 h-3" /> Weryfikuj online
              </a>
            </div>

            <div className="p-4 bg-white border border-stone-200 hover:border-blue-300 transition-colors shadow-sm">
              <h4 className="font-bold text-stone-900 mb-1">Archiwum: tribunydek.com</h4>
              <p className="mb-2">Zrzuty strony ośrodka w Nýdku (2016-2021). <br/> <span className="text-stone-400 text-xs uppercase">Instrukcja:</span> Wejdź na archive.org i wpisz &quot;tribunydek.com&quot;</p>
              <a href="https://web.archive.org/web/*/tribunydek.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-bold flex items-center gap-2">
                <Globe className="w-3 h-3" /> Zobacz w Wayback Machine
              </a>
            </div>
          </div>
        </footer>
      </article>

      {/* STOPKA AUTORSKA (WIZYTÓWKA DETEKTYWA - NA DOLE) */}
      <div className="bg-stone-100 border-t border-stone-200 py-12 mt-auto">
        <div className="max-w-lg mx-auto text-center px-4">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-white rounded-full shadow-sm border border-stone-200">
              <User className="w-6 h-6 text-stone-700" />
            </div>
          </div>
          <h3 className="font-serif text-lg font-bold text-stone-900 mb-1">Detektyw Polutek</h3>
          <p className="font-sans text-xs uppercase tracking-widest text-stone-500 mb-6">Dziennikarz Śledczy &bull; Niezależne Media</p>
          <a href="mailto:detektyw.polutek@protonmail.com" className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors text-sm hover:underline">
            <Mail className="w-4 h-4" />
            detektyw.polutek@protonmail.com
          </a>
        </div>
      </div>

      <EvidenceAudioModal 
        isOpen={isAudioOpen} 
        onClose={() => setIsAudioOpen(false)} 
        src="/evidence/stefan-nagranie.mp3"
      />
    </main>
  );
}
