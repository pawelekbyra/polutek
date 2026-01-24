"use client";
import React, { useState } from 'react';
import { Scale, FileText, Search, User, Mail, MapPin, Calendar, Globe, X, Stamp, Video, Info } from 'lucide-react';
import PasswordProtect from './components/PasswordProtect';
import { GalleryModal } from '@/components/gallery/GalleryModal';
import ArticleVideoPlayer from '@/components/ArticleVideoPlayer';

// Definicja typu danych galerii
type GalleryData = {
  title: string;
  images: string[];
  signature?: string;
  pdfUrl?: string;
};

// --- DANE DO GALERII ---

const GALLERY_NYDEK: GalleryData = {
  title: "Posiadłość w Nýdku (Archiwum)",
  images: [
    "/Nydek1.jpg",
    "/Nydek2.jpg"
  ],
  signature: "LV 832"
};

const GALLERY_WYROK_KORDYS: GalleryData = {
  title: "Uzasadnienie wyroku: Jarosław K.",
  images: [
    "/wyrok_page-0001.jpg",
    "/wyrok_page-0002.jpg",
    "/wyrok_page-0003.jpg"
  ],
  signature: "30 T 5/2021",
  pdfUrl: "/wyrok.pdf"
};

const GALLERY_WYROK_BADI: GalleryData = {
  title: "Wyrok skazujący: Bartosz B.",
  images: [
    "/wyrok_page-0001.jpg",
    "/wyrok_page-0002.jpg",
    "/wyrok_page-0003.jpg"
  ],
  signature: "66 T 146/2021",
  pdfUrl: "/wyrok.pdf"
};

const GALLERY_NIERUCHOMOSCI_2: GalleryData = {
  title: "Kolejny bliźniaczy ośrodek",
  images: ["/Nydek1.jpg", "/Nydek2.jpg", "/Nieruchomosc3.jpeg"],
};

const GALLERY_WEZWANIE_KICINSKI: GalleryData = {
  title: "Wezwanie dla Michała Kicińskiego",
  images: ["/wezwanie_kicinski.png"],
  signature: "WD-I-3186/23"
};

const GALLERY_JANOV: GalleryData = {
  title: "Dokumentacja Nieruchomości: Janov",
  images: [
    "/gallery/janov/janov1.jpg",
    "/gallery/janov/janov2.jpg",
    "/gallery/janov/janov3.jpg",
    "/gallery/janov/janov4.jpg",
    "/gallery/janov/janov5.jpg",
    "/gallery/janov/janov6.jpg",
    "/gallery/janov/janov8.jpg",
    "/gallery/janov/janov9.jpg",
    "/gallery/janov/janov11.jpg",
    "/gallery/janov/janov12.jpg",
    "/gallery/janov/janov13.jpg",
    "/gallery/janov/janov14.jpg",
    "/gallery/janov/janov15.jpg",
    "/gallery/janov/janov16.jpg",
    "/gallery/janov/janov17.jpg",
    "/gallery/janov/janov18.jpg",
    "/gallery/janov/janov19.jpg",
    "/gallery/janov/janov20.jpg",
    "/gallery/janov/janov21.jpg",
    "/gallery/janov/janov23.jpg",
    "/gallery/janov/janov24.jpg",
    "/gallery/janov/janov25.jpg",
    "/gallery/janov/janov26.jpg",
  ],
  signature: "LV 127"
};


// --- KOMPONENTY STYLU ---

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

const LocationStrip = ({ name, code, plot, lv, onClick }: { name: string, code: string, plot: string, lv: string, onClick?: () => void }) => (
  <div className="w-full border-y border-stone-300 bg-stone-50/50 py-2 my-10 flex flex-col md:flex-row items-center justify-between gap-y-2 gap-x-4 px-1 md:px-2 font-mono text-[10px] md:text-xs text-stone-600 tracking-tight select-all cursor-default hover:bg-stone-100 transition-colors">
     
     <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="flex h-2 w-2 relative shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
        </div>
        {onClick ? (
          <button 
            onClick={onClick}
            className="font-bold text-stone-900 uppercase tracking-widest hover:text-blue-700 hover:underline transition-all text-left"
            title="Kliknij, aby zobaczyć galerię zdjęć"
          >
            {name}
          </button>
        ) : (
          <span className="font-bold text-stone-900 uppercase tracking-widest">{name}</span>
        )}
     </div>

     <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto border-t md:border-t-0 border-stone-200 pt-1 md:pt-0">
        <span className="flex gap-1.5">
           <span className="text-stone-400 uppercase hidden sm:inline">Obręb:</span>
           <span className="font-medium text-stone-800">{code}</span>
        </span>
        <span className="text-stone-300 hidden md:inline">|</span>
        <span className="flex gap-1.5">
           <span className="text-stone-400 uppercase hidden sm:inline">Działka:</span>
           <span className="font-medium text-stone-800">{plot}</span>
        </span>
         <span className="text-stone-300 hidden md:inline">|</span>
         <span className="flex gap-1.5">
           <span className="text-stone-400 uppercase hidden sm:inline">LV:</span>
           <span className="font-medium text-stone-800">{lv}</span>
        </span>
     </div>
  </div>
);

const TransactionStamp = ({ label, value, subDetails }: { label: string, value: string, subDetails?: string }) => (
  <div className="my-8 flex justify-start">
    <div className="relative border border-stone-300 bg-white p-1 pr-6 rounded-sm flex items-center gap-4 shadow-[2px_2px_0px_0px_rgba(231,229,228,1)]">
       <div className="bg-stone-100 h-full p-3 flex items-center justify-center border-r border-stone-200 border-dashed">
          <Stamp className="w-5 h-5 text-stone-400" />
       </div>
       <div className="py-2">
          <div className="text-[9px] uppercase tracking-[0.2em] text-stone-400 font-bold mb-1">{label}</div>
          <div className="font-mono text-base font-bold text-stone-800">{value}</div>
          {subDetails && <div className="text-[10px] text-stone-500 font-mono mt-1">{subDetails}</div>}
       </div>
    </div>
  </div>
);

// --- GŁÓWNY KOMPONENT ---

export default function Home() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryData, setGalleryData] = useState<GalleryData | null>(null);

  const openGallery = (type: 'nydek' | 'wyrok_kordys' | 'wyrok_badi' | 'nieruchomosci_2' | 'wezwanie_kicinski' | 'janov') => {
    if (type === 'nydek') setGalleryData(GALLERY_NYDEK);
    else if (type === 'wyrok_kordys') setGalleryData(GALLERY_WYROK_KORDYS);
    else if (type === 'wyrok_badi') setGalleryData(GALLERY_WYROK_BADI);
    else if (type === 'nieruchomosci_2') setGalleryData(GALLERY_NIERUCHOMOSCI_2);
    else if (type === 'wezwanie_kicinski') setGalleryData(GALLERY_WEZWANIE_KICINSKI);
    else if (type === 'janov') setGalleryData(GALLERY_JANOV);
    setIsGalleryOpen(true);
  };

  return (
    <PasswordProtect>
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
        </div>
      </header>

      {/* ARTYKUŁ */}
      <article className="max-w-2xl mx-auto px-4 py-8 flex-grow">
        <div className="prose prose-stone prose-lg max-w-none prose-headings:font-sans prose-headings:font-bold prose-a:text-blue-800 hover:prose-a:text-blue-900 prose-blockquote:not-italic">
          
          <p className="first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-stone-900 leading-relaxed">
            W 2020 roku media obiegły doniesienia o rozbiciu grupy polskich „szamanów” w Czechach. Policyjny nalot, aresztowanie Jarosława i Karoliny Kordysów, a następnie surowe wyroki – 8,5 oraz 5,5 roku więzienia za prowadzenie nielegalnego biznesu polegającego na podawaniu klientom egzotycznego psychodeliku – ayahuaski.
          </p>

          <p>
            Ayahuaska to tradycyjny wywar z amazońskich roślin o silnym działaniu halucynogennym. Ze względu na wysoką zawartość DMT – substancji psychodelicznej wywołującej intensywne wizje i zmiany stanu świadomości – jej posiadanie i podawanie jest w Polsce i Czechach zabronione. Finałem medialnego spektaklu Kordysów było ułaskawienie przez czeskiego prezydenta po dwóch latach odsiadki.
          </p>

          <p>
            Kurtyna opadła, temat ucichł. Ale czy to na pewno koniec tej historii? W cieniu tego głośnego procesu toczył się drugi – cichy i błyskawiczny, zakończony dyskretnym wyrokiem, o którym nikt nawet w mediach się nie zająknął. Analiza sądowych dokumentów prowadzi do zdumiewających wniosków.
          </p>

          <p>
            W przygranicznym Janovie funkcjonował drugi, bliźniaczy ayahuaskowy ośrodek, którego współwłaścicielem okazał się miliarder – <strong>Michał Kiciński</strong>.
          </p>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Świadek B.</h2>

          <p>
            W obszernym i publicznie dostępnym uzasadnieniu wyroku Jarosława Kordysa o sygnaturze <button onClick={() => openGallery('wyrok_kordys')} className="text-blue-700 hover:underline font-bold hover:bg-blue-50 px-1 rounded transition-colors">30 T 5/2021</button> pojawia się postać świadka <strong>Bartosza B.</strong>
          </p>
          
          <p>Zgodnie z aktami:</p>

          <CaseFile title="Zeznania świadka B.">
            „Świadek B. odnośnie osoby oskarżonego [Jarosława Kordysa] oświadczył, że zna się z nim ok. 8 lat, a poznali się w Holandii”.
            <br/><br/>
            „Świadek B. potwierdził, że i on sam w przeszłości prowadził warsztaty”, a obecnie sam „jest przedmiotem dochodzenia policji w Krnowie właśnie z powodu ceremonii”.
          </CaseFile>

          <p>Akta ujawniają również skalę zarzutów wobec Bartosza B.:</p>

          <CaseFile title="Zarzuty wobec Bartosza B.">
            „(...) wymieniony był sprawdzany w związku z występkiem niedozwolonej produkcji i innego obchodzenia się ze środkami odurzającymi (...) albowiem miał w roku 2014 zlecić przesłanie na swój adres przesyłki pocztowej przechwyconej na lotnisku w Lipsku RFN zawierającej 4,5 kg DMT, a 6.6.2018 miało dojść do zatrzymania przesyłki pocztowej we Frankfurcie nad Menem RFN zawierającej 2000 g meskaliny i 38,6 g substancji DMT.”
          </CaseFile>

          <p>Intrygujący fragment dotyczy własności „bazy”. Dokumenty stwierdzają:</p>

          <CaseFile title="Własność nieruchomości">
            „(...) budynek rodzinny w miejscowości Janov (...), który jest częściowo użytkowany do stałego zamieszkania, a częściowo jako komercyjny obiekt noclegowy”
            <br/><br/>
            „Świadek [Bartosz B.] potwierdził, że w Janowie jest właścicielem jednej dziesiątej nieruchomości”.
          </CaseFile>

          <p>Do kogo należała reszta? Sąd wskazuje wprost:</p>

          <CaseFile title="Ustalenia Sądu">
            „...w odniesieniu do nieruchomości będących współwłasnością Bartosza B. i Michala D. K.”.
          </CaseFile>

          <p>
            W Czechach księgi wieczyste są jawne i dostępne online. Wystarczy wejść na stronę Katastru Nieruchomości, wyszukać działkę w Janovie i za niewielką opłatą pobrać jej pełną historię.
          </p>
          
          <LocationStrip name="JANOV U KRNOVA" code="656976" plot="st. 281" lv="127" />

          <div className="my-10 p-6 bg-stone-100 border-l-2 border-stone-400 italic text-stone-800 font-medium">
            Pobrany dokument nie pozostawia wątpliwości: w latach 2012–2023 współwłaścicielami nieruchomości byli Bartosz Badowski (1/10) oraz Michał Dawid Kiciński (9/10).
          </div>

          <p>
            Drugie imię – Dawid – idealnie wypełnia lukę w zanonimizowanym skrócie „Michal D. K.”. Wspólnikiem w <button onClick={() => openGallery('janov')} className="text-blue-700 hover:underline font-bold hover:bg-blue-50 px-1 rounded transition-colors">„bazie”</button> był twórca Wiedźmina – jeden z najbogatszych Polaków.
          </p>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Telefon, który pogrążył imperium</h2>

          <p>
            Przełom w sprawie organizatorów ayahuaskowych ceremonii w 2020 roku nastąpił dzięki policyjnej technice operacyjnej. Telefon Kordysa był na stałym podsłuchu, a funkcjonariusze słuchali na żywo, gdy w dniu 24.08.2020 r. doszło do nerwowej wymiany zdań pomiędzy Badowskim i Kordysem.
          </p>

          <p>
            Kordys zadzwonił do Badowskiego wyraźnie zaniepokojony wieściami, które do niego dotarły. Bał się, że tragedia, o której huczało w kuluarach, może zniszczyć ich imperium. Sąd w uzasadnieniu wyroku precyzyjnie rekonstruuje ten moment:
          </p>

          <CaseFile title="Rekonstrukcja rozmowy (Uzasadnienie Sądu)" type="transcript">
            „oskarżony J. K. omawia z B., że dotarła do niego informacja, że w obiekcie w Janovie <span className="bg-red-100 text-red-900 font-bold px-1">zmarła jakaś kobieta</span>”.
          </CaseFile>

          <p>
            W rozmowie pojawia się też wątek zagrożenia ze strony osoby trzeciej – mężczyźni omawiają jakiegoś szantażystę, który chce iść na policję. Kordys wprost pyta wspólnika:
          </p>

          <CaseFile title="Pytanie Kordysa" type="transcript">
            „W jakim zagrożeniu jest nasza praca?”
          </CaseFile>

          <p>Odpowiedź na to pytanie znajduje się w aktach sprawy i nie pozostawia złudzeń co do intencji rozmówców. W uzasadnieniu wyroku Kordysa czytamy:</p>

          <div className="my-8 pl-6 border-l-4 border-stone-900 font-serif italic text-xl text-stone-800">
            „Z ich rozmowy wynika, że nie zajmowali się w zasadzie samym faktem śmierci, lecz raczej obawą, aby to nie przyciągnęło uwagi policji.”
          </div>

          <p>
            Dla sądu był to koronny dowód na to, że oskarżeni prowadzili nielegalny biznes, a nie działalność duchową – śmierć człowieka była dla nich jedynie „psuciem interesów”.
          </p>

          <p>
            Cynizm tej konwersacji sięga zenitu chwilę później. Gdy tylko ustalili strategię uciszenia plotek, natychmiast przeszli do logistyki dostaw narkotyku. Sąd odnotowuje, że zaraz po dywagacjach o śmierci i szantażu, rozmówcy wracają do interesów:
          </p>

          <CaseFile title="Kontynuacja rozmowy" type="transcript">
            „Następnie w rozmowie omawiają zamówienia «herbaty» z dżungli i to, czy im tego «nie zepsują», ekscytując się nagraniem od dostawcy, który «siedzi w dżungli i gotuje».”
          </CaseFile>

          <p>
            Zaledwie dwa dni po tym telefonie, 26.08.2020 czescy policjanci weszli do posiadłości Badowskiego (i Kicińskiego) w Janovie. Efekty rewizji opisano w wyroku Kordysa:
          </p>

          <CaseFile title="Protokół rewizji">
            „w nieruchomości zabezpieczono rzeczy... oprócz marihuany zabezpieczono również substancje zawierające DMT o objętości ok. 2 kg”.
          </CaseFile>

          <p>
            Podczas policyjnej interwencji zidentyfikowano tam 15 obywateli Polski. Wśród nich stali bywalcy i bliscy znajomi Badowskiego – <strong>Krzysztof Stefanek</strong> i <strong>Lena Drzewińska</strong>, których obecność w momencie wkroczenia służb ma znaczenie w kontekście późniejszej ich roli w tej historii.
          </p>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Cena wolności i zdrady</h2>

          <p>
            Kiedy 26 sierpnia 2020 roku czeska policja weszła do posiadłości w Janovie, Jarosław Kordys wciąż czuł się bezpiecznie. Nie wiedział jeszcze, że zegar zaczął odliczać czas do jego własnej katastrofy. Zaledwie 7 tygodni po cichym nalocie na Badowskiego, policja zapukała do Kordysów.
          </p>

          <p>
            15 października 2020 roku sielankę w ich ośrodku przerwał huk granatów ogłuszających. Czeska jednostka antyterrorystyczna wdarła się do budynku, rzucając na ziemię przyszłych bohaterów głośnego skandalu. Co wydarzyło się w ciągu tych niespełna dwóch miesięcy? Odpowiedź kryje się w jednym czeskim terminie prawnym:
          </p>

          <LegalNote term="Dohoda o vině a trestu">
            Ugoda o winie i karze. Czeska procedura karna pozwalająca oskarżonemu na dobrowolne poddanie się karze w zamian za łagodniejszy wyrok, bez przeprowadzania pełnego procesu dowodowego i wzywania świadków.
          </LegalNote>

          <p>
            Bartosz Badowski, wspólnik jednego z najbogatszych Polaków, wybrał strategię, która miała uchronić go przed wieloletnim więzieniem. Postanowił „kupić” sobie wolność. Ugoda pozwoliła na zamknięcie jego teczki bez wywoływania świadków, co chroniło Badowskiego przed krzyżowym ogniem pytań i zeznaniami, które mogłyby pogrążyć także jego cichego wspólnika.
          </p>

          <p>
            Cena wolności Badowskiego okazała się wysoka dla kogo innego. Zeznania Badowskiego stały się gwoździem do trumny jego kolegi z branży, Jarosława. Dla prokuratury był to bezcenny materiał dowodowy, który pozwolił domknąć łańcuch poszlak w sprawie Kordysów.
          </p>

          <ArticleVideoPlayer src="/evidence/stefan/playlist.m3u8" poster="" />
          <p className="text-xs text-stone-500 mt-1 italic">Materiał Wideo: Policyjne nagranie z aresztowania małżeństwa Kordysów (Październik 2020)</p>

          <p>
            Na mocy wyroku o sygnaturze <button onClick={() => openGallery('wyrok_badi')} className="text-blue-700 hover:underline font-bold hover:bg-blue-50 px-1 rounded transition-colors">66 T 146/2021</button> z dnia 2 listopada 2021 roku Bartosz Badowski został uznany winnym. Sąd ustalił, że:
          </p>

          <CaseFile title="Ustalenia wyroku skazującego Bartosza B.">
            „co najmniej od bliżej nieustalonej daty w 2015 roku do 26.08.2020 [...] oferował, organizował i co najmniej w 441 przypadkach zrealizował [...] pobyty ukierunkowane na tzw. duchowe ćwiczenia spirytualne”
            <br/><br/>
            „udostępnił uczestnikom do użycia [...] ayahuascę zawierającą dimetylotryptaminę (DMT) oraz tzw. marihuanę zawierającą tetrahydrokannabinol (THC)”
            <br/><br/>
            „przechowywał łącznie 1902,79 grama materiału roślinnego (...), który zawierał łącznie 37,24 grama substancji czynnej (DMT)”.
          </CaseFile>

          <p>
            Podczas gdy Jarosław Kordys został skazany na 8,5 roku pozbawienia wolności, Bartosz Badowski, dzięki ugodzie i współpracy, zakończył sprawę wyrokiem w zawieszeniu.
          </p>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Cisza po burzy i nowy porządek</h2>

          <p>
            Choć Badowski zaprzestał prowadzenia działalności, posiadłość w Janovie nie opustoszała – zamieszkali z nim Krzysztof Stefanek i Magdalena Drzewińska. Ich obecność u boku „Badiego” w tamtym czasie rzuca cień na ich późniejszą rolę; nie byli to niewinni obserwatorzy, lecz ludzie, którzy pozostali lojalni wobec byłego szamana.
          </p>

          <p>
            Będąc tak blisko Badowskiego, doskonale znali mroczną tajemnicę śmierci Ilony. Ich decyzja o zamieszkaniu z człowiekiem, który w obliczu tragedii martwił się jedynie o „ciągłość dostaw”, dowodzi, że w pełni akceptowali reguły zmowy milczenia.
          </p>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Kiciński</h2>

          <p>
            Michał Kiciński stał się nieoficjalnym ambasadorem ayahuaski w polskich mediach, opisując w licznych wywiadach mechanizmy działania psychodelików.
          </p>

          <PullQuote 
            quote="Po ayahuasce jest szansa na to, żeby sobie nie ściemniać."
            author="Michał Kiciński"
            source="Newsweek, 30 maja 2016 r."
          />

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Wezwanie na policję i „zadośćuczynienie”</h2>

          <p>
            Konfrontacja Michała Kicińskiego z organami ścigania nabrała formalnego kształtu dopiero jesienią 2023 roku. 21 września 2023 r. miliarder odebrał wezwanie do stawiennictwa w charakterze świadka w sprawie <button onClick={() => openGallery('wezwanie_kicinski')} className="text-blue-700 hover:underline font-bold hover:bg-blue-50 px-1 rounded transition-colors">WD-I-3186/23</button>. Przesłuchanie miało dotyczyć „pobytu w Janovie”.
          </p>

          <div className="my-8 flex flex-col items-center">
            <img 
              src="/wezwanie_kicinski.png" 
              alt="Wezwanie na policję"
              className="w-48 rounded shadow-md border border-stone-200 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openGallery('wezwanie_kicinski')}
            />
            <p className="text-xs text-stone-500 mt-2 font-mono uppercase tracking-wider text-center">Skan wezwania (Kliknij)</p>
          </div>

          <p>
            Reakcja miliardera była błyskawiczna. Zwrócił się do autora zawiadomienia, oferując przelew na cel charytatywny zamiast wyjaśnień prokuratorskich.
          </p>

          <CaseFile title="Wiadomość prywatna od M. Kicińskiego" type="email">
            „(...) Tak mogę zapłacić za swój błąd z Badim. Podaj mi Fundacje lub Stowarzyszenie [...] i wpłacę tam dobrowolnie kwotę darowizny, w ramach Przeprosin wszechświatowi, za moją młodzieńczą naiwność i brak przenikliwości.”
          </CaseFile>

          <p>
            Podczas przesłuchania 11 października 2023 r. Kiciński twierdził, że nie ma wiedzy o tym, co działo się na jego farmie. Na kluczowe pytanie o własny udział w ceremoniach odpowiedział:
          </p>

          <CaseFile title="Odpowiedź na pytanie o udział">
            „nie brałem udziału w takich ceremoniach w latach 2016-2023, a o wcześniejszym okresie <span className="bg-stone-200 px-1 border-b-2 border-stone-800 font-bold italic text-stone-900">odmawiam odpowiedzi</span>”
          </CaseFile>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Darowizna, czy gorący kartofel</h2>

          <p>
            W listopadzie 2025 r. Krzysztof Stefanek w filmie na YouTube buduje narrację o cudownej darowiźnie od „tajemniczego dobroczyńcy”. Jednak kalendarz wydarzeń ujawnia pośpiech w pozbywaniu się „gorącego kartofla”:
          </p>

          <ul className="list-none space-y-4 my-8 font-mono text-sm border-l-2 border-stone-300 pl-4">
            <li><strong>21 września 2023 r.</strong> – Kiciński odbiera wezwanie na przesłuchanie.</li>
            <li className="text-stone-400 text-center">&darr;</li>
            <li><strong>3 października 2023 r.</strong> – Odkupuje od Badowskiego 10% udziałów, stając się jedynym właścicielem.</li>
            <li className="text-stone-400 text-center">&darr;</li>
            <li><strong>11 października 2023 r.</strong> – Przesłuchanie na policji i odmowa zeznań.</li>
            <li className="text-stone-400 text-center">&darr;</li>
            <li className="bg-orange-50 border border-orange-200 p-4 rounded-sm shadow-sm relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
                <strong>23 października 2023 r.</strong> – Zaledwie 12 dni po przesłuchaniu, proponuje Stefankowi oddanie majątku wartego miliony za darmo.
            </li>
            <li className="text-stone-400 text-center">&darr;</li>
            <li><strong>21 grudnia 2023 r.</strong> – Finał operacji. Kiciński formalnie przekazuje Janov stowarzyszeniu „Natury Zew”.</li>
          </ul>

          <p>
            Cynizm sytuacji pogłębia fakt, że obdarowani – Krzysztof Stefanek i Magdalena Drzewińska – doskonale znali mroczną historię Janova i tajemnicę śmierci Ilony. Przyjmując darowiznę, przejmowali milczenie.
          </p>

          <TransactionStamp label="Nr Transakcji (Katastr)" value="V-5821/2023-127" subDetails="Obręb: Janov u Krnova [656976]" />

          <p>
            Ostatecznie strategia okazała się skuteczna, a majątek został bezpiecznie zaparkowany w stowarzyszeniu. Na tragedii Ilony świadomie wzbogacili się członkowie Stowarzyszenia Natury Zew, a tuszowanie prawdy stało się fundamentem ich nowej rzeczywistości. Pod płaszczykiem non-profit organizują turnusy wypoczynkowe, okłamując gości i opinię publiczną.
          </p>
          
          <div className="my-8 p-6 border border-stone-300 bg-[#F5F5F4] rounded-sm text-stone-900">
             6 maja 2024 r. Prokuratura Okręgowa w Częstochowie wszczęła śledztwo (3013-1.Ds.15.2024), które ma na celu wyjaśnienie okoliczności śmierci Ilony Lewandowskiej.
          </div>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Bliźniaczy ośrodek i drugi miliarder</h2>

          <p>
            W miejscowości Nýdek funkcjonował kolejny ośrodek prowadzony przez Piotra Bonawenturę Tracza. Archiwum Wayback Machine potwierdza, że nieruchomość była wykorzystywana do pracy z psychodelikami.
          </p>

          <LocationStrip name="NÝDEK" code="708186" plot="st. 506/1" lv="832" onClick={() => openGallery('nydek')} />

          <p>
            Analiza ksiąg wieczystych ujawnia, że właścicielem tej posiadłości był drugi z miliarderów stojących za CD Projekt – <strong>Marcin Iwiński</strong>. Dokumenty łączą jego nazwisko z infrastrukturą, w której zginął człowiek w latach 2016-2021.
          </p>

          <p>Również tutaj widać schemat wycofywania się w momencie zagrożenia:</p>
          <ul className="list-none space-y-4 my-8 font-mono text-sm border-l-2 border-stone-300 pl-4">
            <li><strong>15 października 2020 r.</strong> – Policyjny szturm na Kordysów.</li>
            <li className="text-stone-400 text-center">&darr;</li>
            <li><strong>15 czerwca 2021 r.</strong> – Marcin Iwiński sprzedaje posiadłość szamanowi, Piotrowi Bonawenturze Traczowi.</li>
          </ul>

          <TransactionStamp label="Nr Transakcji (Katastr)" value="V-2937/2021-832" subDetails="Obręb: Nýdek [708186]" />

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Sprawiedliwość na sprzedaż?</h2>

          <p>
            Historia Janova i Nýdka to opowieść o dwóch światach. W jednym „szamani” siedzą w więzieniach, w drugim – miliarderzy z list Forbesa trwają na szczytach. Choć miliony pozwoliły na budowę azylów, nie zdołały kupić spokoju wobec śmierci. Czy sprawiedliwość jest tylko iluzją i kwestią zasobności portfela?
          </p>

        </div>

        {/* STOPKA ŹRÓDŁOWA */}
        <footer className="mt-12 pt-12 border-t-2 border-stone-200 font-sans">
          <h3 className="text-xl font-bold text-stone-900 uppercase tracking-widest flex items-center gap-2 mb-4">
            <Search className="w-5 h-5" /> Dokumenty Źródłowe
          </h3>
          <div className="grid gap-4 text-sm text-stone-600">
            <div className="p-4 bg-white border border-stone-200 shadow-sm">
              <h4 className="font-bold text-stone-900 mb-1">Wyrok Bartosza B. (Sygn. 66 T 146/2021)</h4>
              <a href="https://infosoud.justice.cz/InfoSoud/file/29Si25_2022/1" target="_blank" className="text-blue-700 hover:underline font-bold">Pobierz PDF</a>
            </div>
            <div className="p-4 bg-white border border-stone-200 shadow-sm">
              <h4 className="font-bold text-stone-900 mb-1">Sprawa karna Jarosława Kordysa (Sygn. 30 T 5/2021)</h4>
              <a href="https://infosoud.justice.cz/InfoSoud/public/search.jsp" target="_blank" className="text-blue-700 hover:underline font-bold">Sprawdź w InfoSoud</a>
            </div>
          </div>
        </footer>
      </article>

      <GalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        data={galleryData}
      />
    </main>
    </PasswordProtect>
  );
}
