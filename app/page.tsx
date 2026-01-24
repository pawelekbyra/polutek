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
  type?: 'verdict' | 'gallery';
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
  images: Array.from({ length: 25 }, (_, i) => 
    `/gallery/wyrok_kordysa/30T_5_2021-1_page-${String(i + 1).padStart(4, '0')}.jpg`
  ),
  signature: "30 T 5/2021",
  pdfUrl: "/wyrok.pdf",
  type: 'verdict'
};

const GALLERY_WYROK_BADI: GalleryData = {
  title: "Wyrok skazujący: Bartosz B.",
  images: [
    "/wyrok_page-0001.jpg",
    "/wyrok_page-0002.jpg",
    "/wyrok_page-0003.jpg"
  ],
  signature: "66 T 146/2021",
  pdfUrl: "/wyrok.pdf",
  type: 'verdict'
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


// --- KOMPONENTY STYLU "NAJS" ---

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
    if (type === 'nydek') {
      setGalleryData(GALLERY_NYDEK);
    } else if (type === 'wyrok_kordys') {
      setGalleryData(GALLERY_WYROK_KORDYS);
    } else if (type === 'wyrok_badi') {
      setGalleryData(GALLERY_WYROK_BADI);
    } else if (type === 'nieruchomosci_2') {
      setGalleryData(GALLERY_NIERUCHOMOSCI_2);
    } else if (type === 'wezwanie_kicinski') {
      setGalleryData(GALLERY_WEZWANIE_KICINSKI);
    } else if (type === 'janov') {
      setGalleryData(GALLERY_JANOV);
    }
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
            W 2020 roku media obiegły doniesienia o rozbiciu grupy polskich &quot;szamanów&quot; w czeskich Hermanovicach. Policyjny nalot, aresztowanie Jarosława i Karoliny Kordysów, a następnie surowe wyroki - 8,5 oraz 5,5 roku więzienia za prowadzenie nielegalnego biznesu polegającego na organizacji tzw. &quot;ceremonii&quot;, podczas których klientom podawano egzotyczny psychodelik – ayahuaskę.
          </p>

          <p>
            Ayahuaska to tradycyjny wywar z amazońskich roślin o silnym działaniu halucynogennym. Ze względu na wysoką zawartość DMT – substancji psychodelicznej wywołującej intensywne wizje i zmiany stanu świadomości, jej posiadanie i podawanie jest w Polsce i Czechach zabronione. Finałem medialnego spektaklu Kordysów było ułaskawienie przez czeskiego prezydenta po dwóch latach odsiadki.
          </p>

          <p>
            Kurtyna opadła, temat ucichł. Ale czy to na pewno koniec tej historii? W cieniu tego głośnego procesu toczył się drugi – cichy i błyskawiczny, zakończony dyskretnym wyrokiem, o którym nikt nawet w mediach się nie zająknął. Analiza sądowych dokumentów prowadzi do zdumiewających wniosków.
          </p>

          <p>
            W przygranicznym Janovie funkcjonował drugi, bliźniaczy ayahuaskowy ośrodek, którego współwłaścicielem okazał się miliarder – <strong>Michał Kiciński</strong>.
          </p>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Świadek B.</h2>

          <p>
            W obszernym i publicznie dostępnym uzasadnieniu <button onClick={() => openGallery('wyrok_kordys')} className="text-blue-700 hover:underline font-bold hover:bg-blue-50 px-1 rounded transition-colors" title="Zobacz skan wyroku">wyroku</button> Jarosława Kordysa o sygnaturze 30 T 5/2021 pojawia się postać świadka Bartosza B.
          </p>
          
          <p>
            Zgodnie z aktami:
          </p>

          <CaseFile title="Zeznania świadka B.">
            „Świadek B. odnośnie osoby oskarżonego [Jarosława Kordysa] oświadczył, że zna się z nim ok. 8 lat, a poznali się w Holandii”.
            <br/><br/>
            „Świadek B. potwierdził, że i on sam w przeszłości prowadził warsztaty”, a obecnie sam „jest przedmiotem dochodzenia policji v Krnowie właśnie z powodu ceremonii”.
          </CaseFile>

          <p>
            Akta ujawniają również skalę zarzutów wobec Bartosza B.:
          </p>

          <CaseFile title="Zarzuty wobec Bartosza B.">
            „(...) wymieniony był sprawdzany w związku z występkiem niedozwolonej produkcji i innego obchodzenia się ze środkami odurzającymi (...) albowiem miał w roku 2014 zlecić przesłanie na swój adres przesyłki pocztowej przechwyconej na lotnisku w Lipsku RFN zawierającej 4,5 kg DMT, a 6.6.2018 miało dojść do zatrzymania przesyłki pocztowej we Frankfurcie nad Menem RFN zawierającej 2000 g meskaliny i 38,6 g substancji DMT.”
          </CaseFile>

          <p>
            Intrygujący fragment dotyczy własności „bazy”. Dokumenty stwierdzają:
          </p>

          <CaseFile title="Własność nieruchomości">
            „(...) budynek rodzinny w miejscowości Janov (...), który jest częściowo użytkowany do stałego zamieszkania, a częściowo jako komercyjny obiekt noclegowy”
            <br/><br/>
            „Świadek [Bartosz B.] potwierdził, że w Janowie jest właścicielem jednej dziesiątej nieruchomości”.
          </CaseFile>

          <p>
            Do kogo należała reszta? Sąd wskazuje wprost:
          </p>

          <CaseFile title="Ustalenia Sądu">
            „...w odniesieniu do nieruchomości będących współwłasnością Bartosza B. i Michala D. K.”.
          </CaseFile>

          <p>
            W Czechach księgi wieczyste są jawne i dostępne online. Wystarczy wejść na stronę Katastru Nieruchomości, wyszukać działkę w Janovie i za niewielką opłatą pobrać jej pełną historię.
          </p>
          
          <LocationStrip 
            name="JANOV U KRNOVA" 
            code="656976" 
            plot="st. 281" 
            lv="127" 
            onClick={() => openGallery('janov')}
          />

          <div className="my-10 p-6 bg-stone-100 border-l-2 border-stone-400 italic text-stone-800 font-medium">
            <button onClick={() => openGallery('janov')} className="text-blue-700 hover:underline font-bold transition-colors">Pobrany dokument</button> nie pozostawia wątpliwości: w latach 2012–2023 współwłaścicielami nieruchomości byli:
            
            <div className="mt-6 flex flex-col items-center justify-center not-italic">
                <div className="flex flex-col gap-3 font-mono text-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-sm" style={{backgroundColor: 'rgba(59, 130, 246, 0.5)'}}></div>
                        <span><strong>Bartosz Badowski</strong> (10%)</span>
                    </div>
                     <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-sm" style={{backgroundColor: 'rgba(239, 68, 68, 0.5)'}}></div>
                        <span className="decoration-red-600 decoration-4 underline underline-offset-4">Michał Dawid Kiciński (90%)</span>
                    </div>
                </div>
            </div>
          </div>

          <p>
            Drugie imię – Dawid – idealnie wypełnia lukę w zanonimizowanym skrócie „Michal D. K.”. Wspólnikiem szamana był twórca &quot;Wiedźmina&quot; - jeden z najbogatszych Polaków.
          </p>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Telefon, który pogrążył imperium</h2>

          <p>
            Przełom w sprawie organizatorów ayahuaskowych ceremonii w 2020 roku nastąpił dzięki policyjnej technice operacyjnej. Telefon Kordysa był na stałym podsłuchu, a funkcjonariusze słuchali na żywo, gdy w dniu 24.08.2020 r. doszło do nerwowej wymiany zdań pomiędzy Badowskim i Kordysem.
          </p>

          <p>
            Kordys zadzwonił do Badowskiego wyraźnie zaniepokojony wieściami, które do niego dotarły. Bał się, że tragedia, o której huczało w kuluarach, może zniszczyć ich imperium. Sąd w uzasadnieniu wyroku precyzyjnie rekonstruuje ten moment:
          </p>

          <CaseFile title="Rekonstrukcja rozmowy (Uzasadnienie Sądu)" type="transcript">
            „oskarżony J. K. omawia z B., że dotarła do niego informacja, że w obiekcie w Janovie zmarła jakaś kobieta”.
          </CaseFile>

          <p>
            W rozmowie pojawia się też wątek zagrożenia ze strony osoby trzeciej – mężczyźni omawiają szantażystę, który chce iść na policję. Kordys wprost pyta wspólnika:
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
            Dla policjantów, którzy słyszeli to w czasie rzeczywistym, przekaz był jasny: w obiekcie mogło dojść do tragedii, a sprawcy martwili się jedynie o ciągłość dostaw.
          </p>

          <p>
            Zaledwie dwa dni po tym telefonie, 26.08.2020 czescy policjanci weszli do posiadłości Badowskiego (i Kicińskiego) w Janowie. Efekty rewizji opisano w wyroku Kordysa:
          </p>

          <CaseFile title="Protokół rewizji">
            „w nieruchomości zabezpieczono rzeczy... oprócz marihuany zabezpieczono również substancje zawierające DMT o objętości ok. 2 kg”.
          </CaseFile>

          <p>
            Podczas policyjnej interwencji zidentyfikowano tam 15 obywateli Polski, którzy mieli brać udział w ceremonii. Wśród nich, stali bywalcy i bliscy znajomi Badowskiego – <strong>Krzysztof Stefanek</strong> i <strong>Lena Drzewińska</strong>, których obecność w momencie wkroczenia służb ma znaczenie w kontekście późniejszej ich roli w tej historii.
          </p>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Cena wolności i zdrady</h2>

          <p>
            Kiedy 26 sierpnia 2020 roku czeska policja weszła do posiadłości w Janovie, należącej do Bartosza Badowskiego i miliardera Michała Kicińskiego, Jarosław Kordys wciąż czuł się bezpiecznie. Nie wiedział jeszcze, że zegar zaczął odliczać czas do jego własnej katastrofy. Zaledwie 7 tygodni po cichym nalocie na Badowskiego policja zapukała do Kordysów.
          </p>

          <p>
            15 października 2020 roku sielankę w ich ośrodku przerwał huk granatów ogłuszających. Czeska jednostka antyterrorystyczna nie bawiła się w półśrodki: zamaskowani funkcjonariusze z długą bronią wdarli się do budynku, rzucając na ziemię przyszłych bohaterów głośnego skandalu.
          </p>

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
            Cena wolności Badowskiego okazała się być wysoka dla jego kolegi z branży. Zeznania &quot;Badiego&quot; były dla prokuratury bezcennym materiałem dowodowym, który pozwolił domknąć łańcuch poszlak w sprawie Kordysów.
          </p>

          <ArticleVideoPlayer
            src="/evidence/stefan/playlist.m3u8"
            poster=""
          />

          <p>
             Na mocy wyroku o sygnaturze <button onClick={() => openGallery('wyrok_badi')} className="text-blue-700 hover:underline font-bold hover:bg-blue-50 px-1 rounded transition-colors" title="Zobacz wyrok Bartosza B.">66 T 146/2021</button> z dnia 2 listopada 2021 roku Bartosz Badowski został uznany winnym popełnienia „zbrodni niedozwolonej produkcji i innego obchodzenia się ze środkami odurzającymi”. Sąd ustalił, że:
          </p>

          <CaseFile title="Ustalenia wyroku skazującego Bartosza B.">
            „co najmniej od bliżej nieustalonej daty w 2015 roku do 26.08.2020 [...] oferował, organizował i co najmniej w 441 przypadkach zrealizował w nieregularnych odstępach czterodniowe i dziesięciodniowe pobyty [...] ukierunkowane na tzw. duchowe ćwiczenia spirytualne”
            <br/><br/>
            „udostępnił uczestnikom do użycia bliżej nieustaloną ilość substancji psychotropowych, a mianowicie tzw. ayahuascę zawierającą dimetylotryptaminę (DMT) oraz tzw. marihuanę zawierającą tetrahydrokannabinol (THC)”
            <br/><br/>
            „przechowywał łącznie 1902,79 grama materiału roślinnego (...), który zawierał łącznie 37,24 grama substancji czynnej dimetylotryptaminy (DMT) oraz 92,29 grama tzw. narkotyku marihuany”.
          </CaseFile>

          <p>
            Podczas, gdy Jarosław Kordys został skazany na 8,5 roku pozbawienia wolności Bartosz Badowski, którego sprawa dotyczyła tego samego procederu, tych samych substancji, regionu i czasu trwania działalności, dzięki ugodzie i współpracy z wymiarem sprawiedliwości, zakończył sprawę wyrokiem w zawieszeniu.
          </p>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Cisza po burzy i nowy porządek</h2>

          <p>
            Choć Badowski zaprzestał prowadzenia działalności szamańskiej, posiadłość w Janovie nie opustoszała – zamieszkali z nim wspomniani wcześniej Krzysztof Stefanek i Magdalena Drzewińska. Ich obecność u boku &apos;Badiego&apos; w tamtym czasie rzuca cień na ich późniejszą rolę; nie byli to wszakże niewinni obserwatorzy, lecz ludzie, którzy mimo tego, że sami byli obecni podczas policyjnego nalotu, pozostali lojalni wobec byłego szamana.
          </p>

          <p>
            Będąc tak blisko Badowskiego, doskonale znali mroczną tajemnicę śmierci Ilony. Ich decyzja o zamieszkaniu z człowiekiem, który w obliczu tragedii martwił się jedynie o „ciągłość dostaw”, dowodzi, że w pełni akceptowali reguły zmowy milczenia.
          </p>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Kiciński</h2>

          <p>
            W cieniu tych wyroków pozostaje wciąż niewyjaśniona rola cichego wspólnika. Michał Kiciński to nie jest postać, która o ayahuasce jedynie „słyszała” – on stał się jej nieoficjalnym ambasadorem w polskich mediach głównego nurtu. W licznych wywiadach (m.in. dla „Focusa”, „Newsweeka”) z niezwykłą precyzją opisuje on mechanizmy działania psychodelików. Kiciński publicznie opowiada o lekcjach pokory, jakie dała mu „medycyna”, o spotkaniach z szamanami i o tym, jak napar z dżungli otwiera „nową rzeczywistość”.
          </p>

          <PullQuote 
            quote="Po ayahuasce jest szansa na to, żeby sobie nie ściemniać."
            author="Michał Kiciński"
            source="Newsweek, 30 maja 2016 r."
          />

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Wezwanie na policję i &quot;zadośćuczynienie&quot;</h2>

          <p>
            Konfrontacja Michała Kicińskiego z organami ścigania nabrała formalnego kształtu dopiero jesienią 2023 roku. 21 września 2023 roku miliarder osobiście odebrał <button onClick={() => openGallery('wezwanie_kicinski')} className="text-blue-700 hover:underline font-bold transition-colors">wezwanie</button> do stawiennictwa w charakterze świadka w sprawie o sygnaturze WD-I-3186/23.
          </p>

          <CaseFile title="Wiadomość prywatna od M. Kicińskiego" type="email">
            „(...) Tak mogę zapłacić za swój błąd z Badim. Podaj mi Fundacje lub Stowarzyszenie (najlepiej powiązaną z hospicjum lub domami dziecka, bo tu widzę morze potrzeb i dużo cierpienia) i wpłacę tam dobrowolnie kwotę darowizny, w ramach Przeprosin wszechświatowi, za moją młodzieńczą naiwność i brak przenikliwości (...)”
          </CaseFile>

          <p>
            Do przesłuchania doszło 11 października 2023 roku. W protokole Kiciński przyjmuje linię opartą na braku świadomości co do charakteru działalności prowadzonej w jego posiadłości. Strategia „darowizny” pozwoliła mu ostatecznie pozbyć się nieruchomości, którą przekazał stowarzyszeniu zarządzanemu przez ludzi powiązanych z wcześniejszym procederem.
          </p>

          <TransactionStamp 
            label="Nr Transakcji (Katastr)" 
            value="V-5821/2023-127" 
            subDetails="Obręb: Janov u Krnova [656976]"
          />

          <p>
            6 maja 2024 roku Prokuratura Okręgowa w Częstochowie wszczęła śledztwo (3013-1.Ds.15.2024), które ma na celu wyjaśnienie nie tylko kwestii finansowych, ale przede wszystkim okoliczności śmierci Ilony Lewandowskiej.
          </p>
        </div>
      </article>

      <GalleryModal 
        isOpen={isGalleryOpen} 
        onClose={() => setIsGalleryOpen(false)} 
        data={galleryData} 
      />

      <footer className="py-12 border-t border-stone-200 bg-stone-50 text-center">
        <p className="text-stone-400 text-xs font-mono uppercase tracking-widest">
          © 2024 Śledztwo Dziennikarskie | Materiały Sądowe
        </p>
      </footer>
      </main>
    </PasswordProtect>
  );
}
