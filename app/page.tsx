"use client";

import React, { useState } from 'react';
import { Scale, FileText, Search, User, Mail, MapPin, Calendar, Globe, X, Stamp, Video, Info, ShieldCheck, History, ExternalLink, Download, PenTool, Home as HouseIcon, AlertCircle } from 'lucide-react';
import {
  CaseFile, LegalNote, PullQuote, LocationStamp, TransactionStamp,
  EvidenceAudioModal, ArticleVideoPlayer, GalleryModal,
  GalleryData
} from './components';

// --- KONFIGURACJA IPFS (DEDYKOWANA BRAMA) ---
const PINATA_GATEWAY = "https://yellow-elegant-porpoise-917.mypinata.cloud/ipfs";

// 1. DOWODY KORDYSA (Zdjęcia wyroku 30 T 5/2021)
const KORDYS_IMAGES_CID = "bafybeigjvxqqprplfpt4io3ciq6ut4x652p4mwetb3kscufj3uwj6z36tm";
const KORDYS_IMAGES_URL = `${PINATA_GATEWAY}/${KORDYS_IMAGES_CID}`;

// 2. DOWODY BADIEGO (Zdjęcia wyroku 66 T 146/2021)
const BADI_IMAGES_CID = "bafybeifdgw2zosj6lz2qg3d33aye4bd4vcz3rtrix2jbw3wwjhvxxjrk6q";
const BADI_IMAGES_URL = `${PINATA_GATEWAY}/${BADI_IMAGES_CID}`;

// 3. DOWODY NYDEK (Folder ze zdjęciami)
const NYDEK_IMAGES_CID = "bafybeidabdztfvfa7ycie5q47xfby7jiqtuwt6oddccuujpvjxqzd4ofpa";
const NYDEK_IMAGES_URL = `${PINATA_GATEWAY}/${NYDEK_IMAGES_CID}`;

// 4. DOWODY JANOV (Folder ze zdjęciami)
const JANOV_IMAGES_CID = "bafybeia6rid25dw5t46mwmgwu4coa3t6qp34vcno4mcnqxuixplpyfmvly";
const JANOV_IMAGES_URL = `${PINATA_GATEWAY}/${JANOV_IMAGES_CID}`;

// 5. WIDEO STEFANA (HLS - Hosting IPFS)
const VIDEO_CID = "bafybeifkquvqp6cewygbgoqsm3vm6kni3d4wy6medzc7nbsczziswmmv7u";

// 6. WIDEO Z ARESZTOWANIA (HLS - Hosting IPFS)
const ARREST_VIDEO_CID = "bafybeickwaxlebikfa2aax7mwk7xnp56n6vqmnw7mafponnztlzinf73iy";

// 7. LINKI DO PLIKÓW PDF (Pełne wyroki na IPFS)
const KORDYS_PDF_URL = `${PINATA_GATEWAY}/bafybeibzxfsg5s4jkiuf2kzmbdtmfutfjk75ej5zrpt2igan4aldvqc3oq`;
const BADI_PDF_URL = `${PINATA_GATEWAY}/bafkreietkosain6ftde7f3li5ic34qhkwuglz2tu2kfcpbvrwhslskhwza`;

// 8. LINKI ZEWNĘTRZNE (Wayback Machine)
const MUNAY_WAYBACK_URL = "https://web.archive.org/web/20230607033503/https://munaysonqo.com/retreats/";


// --- FUNKCJE POMOCNICZE DO GENEROWANIA ŚCIEŻEK ---
const generateKordysPages = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const pageNumber = String(i + 1).padStart(4, '0');
    const fileName = `30T 5 2021-1_page-${pageNumber}.jpg`;
    return `${KORDYS_IMAGES_URL}/${fileName}`;
  });
};

const generateBadiPages = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const pageNumber = String(i + 1).padStart(4, '0');
    const fileName = `wyrok_page-${pageNumber}.jpg`;
    return `${BADI_IMAGES_URL}/${fileName}`;
  });
};

// --- DANE DO GALERII ---
const GALLERY_NYDEK: GalleryData = {
  title: "Posiadłość w Nýdku (Archiwum)",
  images: [
    `${NYDEK_IMAGES_URL}/nydek01.jpg`,
    `${NYDEK_IMAGES_URL}/nydek02.jpg`,
    `${NYDEK_IMAGES_URL}/nydek03.jpg`,
    `${NYDEK_IMAGES_URL}/nydek04.jpg`,
    `${NYDEK_IMAGES_URL}/nydek05.jpg`,
    `${NYDEK_IMAGES_URL}/nydek06.jpeg`
  ],
  signature: "LV 832"
};

const GALLERY_WYROK_KORDYS: GalleryData = {
  title: "Pełne uzasadnienie wyroku: Jarosław K.",
  images: generateKordysPages(95),
  signature: "30 T 5/2021",
  pdfUrl: KORDYS_PDF_URL,
  type: 'verdict'
};

const GALLERY_WYROK_BADI: GalleryData = {
  title: "Wyrok skazujący: Bartosz B.",
  images: generateBadiPages(3),
  signature: "66 T 146/2021",
  pdfUrl: BADI_PDF_URL,
  type: 'verdict'
};

const GALLERY_WEZWANIE_KICINSKI: GalleryData = {
  title: "Wezwanie dla Michała Kicińskiego",
  images: [`${KORDYS_IMAGES_URL}/wezwanie/wezwanie_kicinski.png`],
  signature: "WD-I-3186/23"
};

const GALLERY_JANOV: GalleryData = {
  title: "Dokumentacja Nieruchomości: Janov",
  images: [
    `${JANOV_IMAGES_URL}/janov01.jpg`,
    `${JANOV_IMAGES_URL}/janov02.jpg`,
    `${JANOV_IMAGES_URL}/janov04.jpg`,
    `${JANOV_IMAGES_URL}/janov06.jpg`,
    `${JANOV_IMAGES_URL}/janov07.jpg`,
    `${JANOV_IMAGES_URL}/janov08.jpg`,
    `${JANOV_IMAGES_URL}/janov09.jpg`,
    `${JANOV_IMAGES_URL}/janov10.jpg`,
    `${JANOV_IMAGES_URL}/janov11.jpg`,
    `${JANOV_IMAGES_URL}/janov12.jpg`,
    `${JANOV_IMAGES_URL}/janov13.jpg`,
    `${JANOV_IMAGES_URL}/janov14.jpg`,
    `${JANOV_IMAGES_URL}/janov15.jpg`,
    `${JANOV_IMAGES_URL}/janov16.jpg`,
    `${JANOV_IMAGES_URL}/janov17.jpg`,
    `${JANOV_IMAGES_URL}/janov18.jpg`,
    `${JANOV_IMAGES_URL}/janov19.jpg`,
    `${JANOV_IMAGES_URL}/janov20.jpg`,
    `${JANOV_IMAGES_URL}/janov21.jpg`,
    `${JANOV_IMAGES_URL}/janov23.jpg`,
    `${JANOV_IMAGES_URL}/janov24.jpg`,
    `${JANOV_IMAGES_URL}/janov25.jpg`,
    `${JANOV_IMAGES_URL}/janov26.jpg`,
  ],
  signature: "LV 127"
};

// --- GŁÓWNY KOMPONENT STRONY ---

export default function Home() {
  const [isAudioOpen, setIsAudioOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryData, setGalleryData] = useState<GalleryData | null>(null);

  const openGallery = (type: 'nydek' | 'wyrok_kordys' | 'wyrok_badi' | 'wezwanie_kicinski' | 'janov') => {
    const maps = {
      nydek: GALLERY_NYDEK,
      wyrok_kordys: GALLERY_WYROK_KORDYS,
      wyrok_badi: GALLERY_WYROK_BADI,
      wezwanie_kicinski: GALLERY_WEZWANIE_KICINSKI,
      janov: GALLERY_JANOV
    };
    setGalleryData(maps[type]);
    setIsGalleryOpen(true);
  };

  return (
      <main className="min-h-screen bg-[#FDFBF7] text-[#1a1a1a] selection:bg-yellow-200/50 font-serif flex flex-col">

        <header className="pt-20 pb-8 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-3 py-1 border border-stone-900 text-[10px] font-sans font-bold tracking-[0.2em] uppercase">
              Śledztwo Dziennikarskie
            </div>
            
            <h1 className="mb-8 text-stone-900">
              <span className="block text-5xl md:text-7xl font-bold leading-none tracking-tight">
                Eliksir Wiedźmina
              </span>
              <span className="block text-2xl md:text-4xl text-stone-500 italic font-medium mt-6 max-w-3xl mx-auto">
                Mroczna tajemnica twórców CD Projekt
              </span>
            </h1>

            <div className="max-w-2xl mx-auto border-y border-stone-200 py-8 px-4">
              <p className="text-xl md:text-2xl text-stone-700 leading-relaxed italic">
                Ayahuasca, policyjne naloty i tragedia, o której nikt się miał nie dowiedzieć. W cieniu głośnego procesu dziennikarskie śledztwo ujawnia, jak twórcy gry „Wiedźmin” finansowali szamańskie podziemie.
              </p>
            </div>
          </div>
        </header>

        <article className="max-w-2xl mx-auto px-4 pt-8 pb-0 flex-grow">
          
          <div className="prose prose-stone prose-lg max-w-none prose-headings:font-sans prose-headings:font-bold prose-blockquote:not-italic
            prose-a:text-stone-900 prose-a:font-bold prose-a:no-underline prose-a:underline prose-a:decoration-double prose-a:decoration-stone-400 hover:prose-a:bg-stone-100 transition-colors">
            
            <p className="first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-stone-900 leading-relaxed">
              W 2020 roku media obiegły doniesienia o rozbiciu grupy polskich szamanów w czeskich <strong>Hermanovicach</strong>. Policyjny nalot, aresztowanie <strong>Jarosława i Karoliny Kordysów</strong>, a następnie surowe wyroki – 8,5 oraz 5,5 roku więzienia za prowadzenie nielegalnego biznesu polegającego na organizacji tzw. „ceremonii”, podczas których klientom podawano egzotyczny psychodelik – ayahuaskę.
            </p>

            <p>
              Ayahuaska to tradycyjny wywar z amazońskich roślin o silnym działaniu halucynogennym. Ze względu na wysoką zawartość DMT – substancji psychodelicznej wywołującej intensywne wizje i zmiany stanu świadomości, jej posiadanie i podawanie jest w <strong>Polsce</strong> i <strong>Czechach</strong> zabronione. Finałem medialnego spektaklu Kordysów było ułaskawienie przez czeskiego prezydenta po dwóch latach odsiadki.
            </p>

            <p>
              Kurtyna opadła, temat ucichł. Ale czy to na pewno koniec tej historii? W cieniu tego głośnego procesu toczył się drugi – cichy i błyskawiczny, zakończony dyskretnym wyrokiem, o którym nikt nawet w mediach się nie zająknął. Analiza sądowych dokumentów prowadzi do zdumiewających wniosków.
            </p>

            <p>
              W przygranicznym <strong>Janovie</strong> funkcjonował drugi, bliźniaczy ayahuaskowy ośrodek, którego współwłaścicielem okazał się miliarder – <strong>Michał Kiciński</strong>.
            </p>

            <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Świadek B.</h2>

            <p>
              W obszernym i publicznie dostępnym uzasadnieniu <button onClick={() => openGallery('wyrok_kordys')} title="Zobacz skan wyroku" className="font-bold text-stone-900 underline decoration-double decoration-stone-400 hover:bg-stone-100 transition-colors">wyroku</button> <strong>Jarosława Kordysa</strong> pojawia się postać świadka <strong>Bartosza B.</strong>
            </p>
            
            <p>
              Zgodnie z aktami:
            </p>

            <CaseFile title="Zeznania świadka B.">
              „Świadek <strong>B.</strong> odnośnie osoby oskarżonego [<strong>Jarosława Kordysa</strong>] oświadczył, że zna się z nim ok. 8 lat, a poznali się w Holandii”.
              <br/><br/>
              „Świadek <strong>B.</strong> potwierdził, że i on sam w przeszłości prowadził warsztaty”, a obecnie sam „jest przedmiotem dochodzenia policji w Krnowie właśnie z powodu ceremonii”.
            </CaseFile>

            <p>
              Akta ujawniają również skalę zarzutów wobec <strong>Bartosza B.</strong>:
            </p>

            <CaseFile title="Zarzuty wobec Bartosza B.">
              „(...) wymieniony był sprawdzany w związku z występkiem niedozwolonej produkcji i innego obchodzenia się ze środkami odurzającymi (...) albowiem miał w roku 2014 zlecić przesłanie na swój adres przesyłki pocztowej przechwyconej na lotnisku w <strong>Lipsku</strong> RFN zawierającej 4,5 kg DMT, a 6.6.2018 miało dojść do zatrzymania przesyłki pocztowej we Frankfurcie nad Menem RFN zawierającej 2000 g meskaliny i 38,6 g substancji DMT.”
            </CaseFile>

            <p>
              Intrygujący fragment dotyczy własności „bazy”. Dokumenty stwierdzają:
            </p>

            <CaseFile title="Własność nieruchomości">
              „(...) budynek rodzinny w miejscowości <strong>Janov</strong> (...), który jest częściowo użytkowany do stałego zamieszkania, a częściowo jako komercyjny obiekt noclegowy”
              <br/><br/>
              „Świadek [<strong>Bartosz B.</strong>] potwierdził, że w <strong>Janowie</strong> jest właścicielem jednej dziesiątej nieruchomości”.
            </CaseFile>

            <p>
              Do kogo należała reszta? Sąd wskazuje wprost:
            </p>

            <CaseFile title="Ustalenia Sądu">
              „...w odniesieniu do nieruchomości będących współwłasnością <strong>Bartosza B.</strong> i Michala D. K.”.
            </CaseFile>

            <p>
              W <strong>Czechach</strong> księgi wieczyste są jawne i dostępne online. Wystarczy wejść na stronę Katastru Nieruchomości, wyszukać <button onClick={() => openGallery('janov')} className="font-bold text-stone-900 underline decoration-double decoration-stone-400 hover:bg-stone-100 transition-colors">działkę w <strong>Janovie</strong></button> i za niewielką opłatą pobrać jej pełną historię.
            </p>
            
            <LocationStamp 
              name="JANOV U KRNOVA" 
              code="656976" 
              plot="st. 281" 
              lv="127" 
              onClick={() => openGallery('janov')}
            />

            <p>
            Pobrany dokumentnie pozostawia wątpliwości: w latach 2012–2023 współwłaścicielami nieruchomości byli:
               <br/>
               <strong>Bartosz Badowski (10%)</strong>
               <br/>
               <strong className="text-stone-900 underline decoration-red-600 decoration-4 underline-offset-4">Michał Dawid Kiciński (90%)</strong>
            </p>

            <p>
              Drugie imię – Dawid – idealnie wypełnia lukę w zanonimizowanym skrócie „Michal D. K.”. <span className="bg-yellow-200 px-1 font-bold text-stone-900 shadow-sm">Wspólnikiem szamana był twórca „Wiedźmina” – jeden z najbogatszych Polaków.</span>
            </p>

            <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Na podsłuchu</h2>

            <p>
              Przełom w sprawie organizatorów ayahuaskowych ceremonii w 2020 roku nastąpił dzięki policyjnej technice operacyjnej. Telefon <strong>Kordysa</strong> był na stałym podsłuchu, a funkcjonariusze słuchali na żywo, gdy w dniu 24.08.2020 r. doszło do nerwowej wymiany zdań pomiędzy <strong>Badowskim</strong> i <strong>Kordysem</strong>.
            </p>

            <p>
              <strong>Kordys</strong> zadzwonił do <strong>Badowskiego</strong> wyraźnie zaniepokojony wieściami, które do niego dotarły. Bał się, że tragedia, o której huczało w kuluarach, może zniszczyć ich imperium. Sąd w uzasadnieniu wyroku precyzyjnie rekonstruuje ten moment:
            </p>

            <CaseFile title="Rekonstrukcja rozmowy (Uzasadnienie Sądu)" type="transcript">
              „oskarżony J. K. omawia z B., że dotarła do niego informacja, że w obiekcie w <strong>Janovie</strong> zmarła jakaś kobieta”.
            </CaseFile>

            <p>
              W rozmowie pojawia się też wątek zagrożenia ze strony osoby trzeciej – mężczyźni omawiają szantażystę, który chce iść na policję. <strong>Kordys</strong> wprost pyta wspólnika:
            </p>

            <CaseFile title="Pytanie Kordysa" type="transcript">
              „W jakim zagrożeniu jest nasza praca?”
            </CaseFile>

            <p>
              Odpowiedź na to pytanie znajduje się w aktach sprawy i nie pozostawia złudzeń co do intencji rozmówców. W uzasadnieniu wyroku <strong>Kordysa</strong> czytamy:
            </p>

            <div className="my-8 pl-6 border-l-4 border-stone-900 font-serif italic text-xl text-stone-800">
              „Z ich rozmowy wynika, że nie zajmowali  się w zasadzie samym faktem śmierci, lecz raczej obawą, aby to nie przyciągnęło uwagi policji.”
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
              Dla policjantów, którzy słyszeli to w czasie rzeczywistym, przekaz był jasny: w obiekcie mogło dojść do tragedii, a sprawcy martwili się jedynie o ciągłość dostaw.
            </p>

            <p>
              Zaledwie dwa dni po tym telefonie, 26.08.2020 czescy policjanci weszli do posiadłości w <strong>Janovie</strong>. Efekty rewizji opisano w wyroku <strong>Kordysa</strong>:
            </p>

            <CaseFile title="Protokół rewizji">
              „w nieruchomości zabezpieczono rzeczy... oprócz marihuany zabezpieczono również substancje zawierające DMT o objętości ok. 2 kg”.
            </CaseFile>

            <p>
              Podczas policyjnej interwencji zidentyfikowano tam 15 obywateli <strong>Polski</strong>, którzy mieli brać udział w ceremonii. Wśród nich, stali bywalcy i bliscy znajomi <strong>Badowskiego</strong> – <strong>Krzysztof Stefanek</strong> i <strong>Lena Drzewińska</strong>, których obecność w momencie wkroczenia służb ma znaczenie w kontekście późniejszej ich roli w tej historii.
            </p>

            <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Cena wolności</h2>

            <p>
              Kiedy 26 sierpnia 2020 roku czeska policja weszła do posiadłości w <strong>Janovie</strong>, należącej do <strong>Bartosza Badowskiego</strong> i miliardera <strong>Michała Kicińskiego</strong>, <strong>Jarosław Kordys</strong> w <strong>Hermanovicach</strong> wciąż czuł się bezpiecznie. Nie wiedział jeszcze, że zegar zaczął odliczać czas do jego własnej katastrofy. Zaledwie 7 tygodni po cichym nalocie na <strong>Badowskiego</strong> policja zapukała do <strong>Kordysów</strong>.
            </p>

            <p>
              15 października 2020 roku sielankę w ich ośrodku przerwał huk granatów ogłuszających. Czeska jednostka antyterrorystyczna nie bawiła się w półśrodki: zamaskowani funkcjonariusze z długą bronią wdarli się do budynku, rzucając na ziemię przyszłych bohaterów głośnego skandalu.
            </p>

            <div className="my-12 w-full rounded-sm overflow-hidden shadow-md">
               <ArticleVideoPlayer 
                  src={`${PINATA_GATEWAY}/${ARREST_VIDEO_CID}/videoplayback.m3u8`} 
                  poster=""
               />
            </div>
             <div className="mt-1 text-sm text-stone-500 font-sans border-l-2 border-stone-300 pl-3">
                 <span className="font-bold text-stone-900 uppercase text-xs mr-2">Materiał Operacyjny:</span>
                 Nagranie z policyjnego nalotu na ośrodek w <strong>Hermanovicach</strong> (15.10.2020)
              </div>

            <p>
              Co wydarzyło się w ciągu tych niespełna dwóch miesięcy? Odpowiedź kryje się w jednym czeskim terminie prawnym:
            </p>

            <LegalNote term="Dohoda o vině a trestu">
              Ugoda o winie i karze. Czeska procedura karna pozwalająca oskarżonemu na dobrowolne poddanie się karze w zamian za łagodniejszy wyrok, bez przeprowadzania pełnego procesu dowodowego i wzywania świadków.
            </LegalNote>

            <p>
              <strong>Bartosz „Badi” Badowski</strong>, wspólnik jednego z najbogatszych Polaków, błyskawicznie zrozumiał swoje położenie. W obliczu zabezpieczonych dowodów – w tym 2 kilogramów substancji z DMT i marihuany – wybrał strategię, która miała uchronić go przed wieloletnim więzieniem. Postanowił „kupić” sobie wolność.
            </p>

            <p>
              Ugoda pozwoliła na zamknięcie jego teczki bez wywoływania świadków, co w praktyce oznaczało, że mechanizmy działania janovskiego ośrodka nigdy nie wybrzmiały echem w publicznej debacie, chroniąc <strong>Badowskiego</strong> przed krzyżowym ogniem pytań i zeznaniami, które mogłyby pogrążyć także jego cichego wspólnika.
            </p>

            <p>
              Cena wolności <strong>Badowskiego</strong> okazała się być wysoka dla jego kolegi z branży. Zeznania „Badiego” były dla prokuratury bezcennym materiałem dowodowym, który pozwolił domknąć łańcuch poszlak w sprawie <strong>Kordysów</strong>.
            </p>

            <p>
               Na mocy <button onClick={() => openGallery('wyrok_badi')} title="Zobacz wyrok Bartosza B." className="font-bold text-stone-900 underline decoration-double decoration-stone-400 hover:bg-stone-100 transition-colors">wyroku</button> z dnia 2 listopada 2021 roku <strong>Bartosz Badowski</strong> został uznany winnym popełnienia „zbrodni niedozwolonej produkcji i innego obchodzenia się ze środkami odurzającymi”.
            </p>
            
            <p>
              Sąd ustalił, że:
            </p>

            <CaseFile title="Ustalenia wyroku skazującego Bartosza B.">
              „co najmniej od bliżej nieustalonej daty w 2015 roku do 26.08.2020 [...] oferował, organizował i co najmniej w 441 przypadkach zrealizował w nieregularnych odstępach czterodniowe i dziesięciodniowe pobyty [...] ukierunkowane na tzw. duchowe ćwiczenia spirytualne”
              <br/><br/>
              „udostępnił uczestnikom do użycia bliżej nieustaloną ilość substancji psychotropowych, a mianowicie tzw. ayahuascę zawierającą dimetylotryptaminę (DMT) oraz tzw. marihuanę zawierającą tetrahydrokannabinol (THC)”
              <br/><br/>
              „przechowywał łącznie 1902,79 grama materiału roślinnego (...), który zawierał łącznie 37,24 grama substancji czynnej dimetylotryptaminy (DMT) oraz 92,29 grama tzw. narkotyku marihuany”.
            </CaseFile>

            <p>
              Podczas, gdy <strong>Jarosław Kordys</strong> został skazany na 8,5 roku pozbawienia wolności <strong>Bartosz Badowski</strong>, którego sprawa dotyczyła tego samego procederu, tych samych substancji, regionu i czasu trwania działalności, dzięki ugodzie i współpracy z wymiarem sprawiedliwości, zakończył sprawę wyrokiem w zawieszeniu.
            </p>

            <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Cisza po burzy</h2>

            <p>
              Choć <strong>Badowski</strong> zaprzestał prowadzenia działalności szamańskiej, posiadłość w <strong>Janovie</strong> nie opustoszała – zamieszkali z nim wspomniani wcześniej <strong>Krzysztof Stefanek</strong> i <strong>Magdalena Drzewińska</strong>. Ich obecność u boku „Badiego” w tamtym czasie rzuca cień na ich późniejszą rolę; nie byli to wszakże niewinni obserwatorzy, lecz ludzie, którzy mimo tego, że sami byli obecni podczas policyjnej interwencji, pozostali lojalni wobec byłego szamana.
            </p>

            <p>
              Będąc tak blisko <strong>Badowskiego</strong>, doskonale znali mroczną tajemnicę śmierci <strong>Ilony</strong>. Ich decyzja o zamieszkaniu z człowiekiem, który w obliczu tragedii martwił się  o „ciągłość dostaw”, dowodzi, że w pełni akceptowali reguły zmowy milczenia.
            </p>

            <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Kiciński</h2>

            <p>
              W cieniu tych wyroków pozostaje wciąż niewyjaśniona rola cichego wspólnika. <strong>Michał Kiciński</strong> to nie jest postać, która o ayahuasce jedynie „słyszała” – on stał się jej nieoficjalnym ambasadorem w polskich mediach głównego nurtu. W licznych wywiadach (m.in. dla „Focusa”, „Newsweeka”) z niezwykłą precyzją opisuje on mechanizmy działania psychodelików. <strong>Kiciński</strong> publicznie opowiada o lekcjach pokory, jakie dała mu „medycyna”, o spotkaniach z szamanami i o tym, jak napar z dżungli otwiera „nową rzeczywistość”.
            </p>

            <PullQuote 
              quote="Po ayahuasce jest szansa na to, żeby sobie nie ściemniać."
              author="Michał Kiciński"
              source="Newsweek, 30 maja 2016 r."
            />

            <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">„Błąd z Badim”</h2>

            <p>
               <strong>Michała Kiciński</strong> wiedział o <strong>Ilonie</strong>. Jego konfrontacja z organami ścigania nabrała formalnego kształtu dopiero jesienią 2023 roku. 21 września 2023 roku miliarder osobiście odebrał wezwanie do stawiennictwa w charakterze świadka w sprawie o sygnaturze WD-I-3186/23. Miało się ono odbyć 18.10.2023. Na wezwaniu czytelnie było napisane, że przesłuchanie będzie dotyczyć „pobytu w <strong>Janowie</strong>”.
            </p>

            <div className="my-8 flex flex-col items-center">
              <img 
                src={`${KORDYS_IMAGES_URL}/wezwanie/wezwanie_kicinski.png`} 
                alt="Wezwanie na policję"
                className="w-48 rounded shadow-md border border-stone-200 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openGallery('wezwanie_kicinski')}
              />
              <p className="text-xs text-stone-500 mt-2 font-mono uppercase tracking-wider w-48 text-center">
                Skan wezwania (Kliknij)
              </p>
            </div>

            <p>
              Reakcja miliardera na zainteresowanie organów ścigania była błyskawiczna. Zwrócił się bezpośrednio do autora zawiadomienia – wysyłając mu wiadomość mailową z propozycją swoistej pokuty. Zamiast wyjaśnień prokuratorskich zaoferował przelew na cel charytatywny, nazywając lata nielegalnego procederu młodzieńczą naiwnością.
            </p>

            <CaseFile title="Wiadomość prywatna od M. Kicińskiego" type="email">
              „(...) Tak mogę zapłacić za swój błąd z Badim. Podaj mi Fundacje lub Stowarzyszenie (najlepiej powiązaną z hospicjum lub domami dziecka, bo tu widzę morze potrzeb i dużo cierpienia) i wpłacę tam dobrowolnie kwotę darowizny, w ramach Przeprosin wszechświatowi, za moją młodzieńczą naiwność i brak przenikliwości. Fundacja / Stowarzyszenie musi być uznana i z tradycjami, a nie jakaś organizacja krzak. Wyślę Ci potwierdzenie przelewu. (...)”
            </CaseFile>

            <p>
              Do przesłuchania doszło tydzień przed terminem wskazanym na wezwaniu – 11 października 2023 roku o godzinie 15:00 w<strong> Komendzie Rejonowej Policji Warszawa II</strong> . W protokole <strong>Kiciński</strong> przyjmuje linię opartą na braku świadomości co do charakteru działalności prowadzonej w jego posiadłości.
            </p>

            <CaseFile title="Zeznanie do protokołu">
              „Nie mam żadnej wiedzy co się działo na mojej farmie, w której jestem 90% udziałowcem (...) wynajmowałem tę nieruchomość.”
            </CaseFile>

            <p>
              Gdy w toku czynności padło kluczowe pytanie o jego własny udział w ceremoniach ayahuaski w <strong>Janovie</strong>, odpowiedź była lakoniczna:
            </p>

            <CaseFile title="Odpowiedź na pytanie o udział">
              „nie brałem udziału w takich ceremoniach w latach 2016-2023, a o wcześniejszym okresie odmawiam odpowiedzi”
            </CaseFile>

            {/* --- WSTAWKA: MUNAY SONQO (PERU) --- */}
            <p>
              W kontekście złożonych zeznań warto zauważyć, że miliarder jest właścicielem luksusowego ośrodka <strong>Munay Sonqo</strong> w <strong>Peru</strong>, o którym wielokrotnie wspominał w wywiadach.
            </p>
            
            <p>
              W przeciwieństwie do Europy, peruwiańskie prawo zezwala na komercyjne prowadzenie ceremonii z ayahuascą. Ośrodek <strong>Kicińskiego</strong> oferował tam w pełni jawną i profesjonalną sprzedaż usług o profilu bliźniaczym do tych, które w <strong>Czechach</strong> są zakazane, co przez lata było wprost eksponowane na stronie internetowej.
            </p>

            <p>
              Fakt, że <strong>Kiciński</strong> w momencie przesłuchania zarządzał legalnym biznesem ayahuaskowym w <strong>Ameryce Południowej</strong>, stawia pod znakiem zapytania jego deklarowaną nieświadomość co do charakteru wydarzeń w <strong>Janovie</strong>. Co znamienne, niedługo po wizycie na komendzie w <strong>Warszawie</strong>, oferta ceremonii „świętych roślin” zniknęła z oficjalnej witryny peruwiańskiego kurortu. Ślad po niej zachowały jednak cyfrowe archiwa Wayback Machine.
            </p>
            {/* ------------------------------------------- */}

            <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Anonimowy filantrop</h2>

            <p>
              W listopadzie 2025 roku na kanale YouTube „<strong>Osada Natury Zew</strong>” pojawia się nagrany rok wcześniej film, w którym obecny gospodarz, <strong>Krzysztof Stefanek</strong>, snuje opowieść o powstaniu „Osady”. W sielskiej scenerii, z uśmiechem na ustach, buduje narrację o cudownym zbiegu okoliczności i tajemniczym dobroczyńcy.
            </p>

            <p>
              <strong>Stefanek</strong> wspomina, jak wspólnie z grupą przyjaciół pomagał uporządkować sprawy własnościowe, by obiekt „znalazł się w jednych rękach”. Kluczowy moment tej opowieści <strong>Stefanek</strong> datuje z niezwykłą precyzją:
            </p>

            <CaseFile title="Wypowiedź K. Stefanka">
              „Ostatecznie 23 października 2023 roku ten człowiek do nas zadzwonił powiedział, że wspólnie z żoną zdecydowali, że oni by chcieli to miejsce przekazać w darowiźnie”
            </CaseFile>

            <p>
              <strong>Stefanek</strong> przedstawia to jako efekt „researchu” darczyńcy, który rzekomo urzekła wizja działalności non-profit.
            </p>

            <div className="my-12 w-full rounded-sm overflow-hidden shadow-md">
                  <ArticleVideoPlayer 
                src={`${PINATA_GATEWAY}/${VIDEO_CID}/YTDowncom_YouTube_Media_4Xujw-krjxs_001_1080p-1.m3u8`} 
                poster=""
              />
            </div>
             <div className="mt-1 text-sm text-stone-500 font-sans border-l-2 border-stone-300 pl-3">
                <span className="font-bold text-stone-900 uppercase text-xs mr-2">Materiał Wideo:</span>
                <strong>Krzysztof Stefanek</strong> opowiada o „cudownym” otrzymaniu darowizny (Materiał z 2025 r.)
              </div>

            <p>
              Jednak kalendarz wydarzeń prawnych burzy ten romantyczny mit, ujawniając nerwowy pośpiech w pozbywaniu się „gorącego kartofla”:
            </p>

            <ul className="list-none space-y-4 my-8 font-mono text-sm border-l-2 border-stone-300 pl-4">
              <li className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-stone-400 shrink-0" />
                <div>
                  <strong>21 września 2023 r.</strong> – <strong>Michał Kiciński</strong> odbiera wezwanie na przesłuchanie w sprawie <strong>Janova</strong>.
                </div>
              </li>
              <li className="flex items-center justify-center text-stone-400">
                &darr;
              </li>
              <li className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-stone-400 shrink-0" />
                <div>
                  <strong>3 października 2023 r.</strong> – Na tydzień przed wizytą na komendzie odkupuje od <strong>Bartosza Badowskiego</strong> jego 10% udziałów w nieruchomości. Aby pozbyć się całego ośrodka jednym podpisem, musi najpierw stać się jego jedynym właścicielem.
                </div>
              </li>
              <li className="flex items-center justify-center text-stone-400">
                &darr;
              </li>
              <li className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-stone-400 shrink-0" />
                <div>
                  <strong>11 października 2023 r.</strong> – Miliarder staje przed policją. Do protokołu odmawia zeznań na temat swojej przeszłości w tym miejscu.
                </div>
              </li>
               <li className="flex items-center justify-center text-stone-400">
                &darr;
              </li>
               
              <li className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-orange-600 shrink-0 mt-3" />
                <div className="bg-orange-50 border border-orange-200 p-4 rounded-sm shadow-sm w-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
                  <span className="font-bold text-stone-900">23 października 2023 r.</span> – Zaledwie 12 dni po kłopotliwym przesłuchaniu, gdy formalności własnościowe z Badim są już dopięte, następuje telefon do <strong>Stefanka</strong> z propozycją oddania majątku wartego miliony za darmo.
                </div>
              </li>

              <li className="flex items-center justify-center text-stone-400">
                &darr;
              </li>
              <li className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-stone-400 shrink-0" />
                <div>
                  <strong>21 grudnia 2023 r.</strong> – Finał operacji. <strong>Kiciński</strong> formalnie przekazuje <strong>Janov</strong> w formie darowizny. Nieruchomość trafia do stowarzyszenia „non-profit” – fasadowej organizacji „krzak”, zarządzanej przez ludzi, którzy przez lata byli częścią tego procederu. Miliarder pozbywa się dowodów, a nowi właściciele zyskują bazę do dalszej działalności pod nowym szyldem.
                </div>
              </li>
            </ul>

            <p>
              Cynizm tej sytuacji pogłębia fakt, że obdarowani nie byli przypadkowymi entuzjastami ekologii. <strong>Krzysztof Stefanek</strong>, który w filmie mówi o „odwróconej logice” i pięknie wolontariatu, i jego konkubina <strong>Magdalena Drzewińska</strong> w rzeczywistości doskonale znali mroczną historię <strong>Janova</strong> i tajemnicę śmierci <strong>Ilony</strong>. Przyjmując darowiznę, przejmowali nie tylko ziemię, ale i milczenie.
            </p>

            <TransactionStamp 
              label="Nr Transakcji (Katastr)" 
              value="V-5821/2023-127" 
              subDetails="Obręb: Janov u Krnova [656976]"
            />

            <p>
              Ostatecznie strategia okazała się skuteczna. Śledztwo umorzono zanim się zaczęło, a majątek, który mógł podlegać przepadkowi jako narzędzie przestępstwa, został bezpiecznie zaparkowany w „stowarzyszeniu”. <strong>Kiciński</strong> pozostał anonimowym „filantropem”, a <strong>Stefanek</strong> – opiekunem nowej, „czystej” osady.
            </p>

            <p>
              Na tragedii świadomie wzbogacili się ludzie, dla których tuszowanie prawdy stało się fundamentem ich nowej, intratnej rzeczywistości. Pod szyldem organizacji non-profit <strong>Stowarzyszenie Natury Zew</strong> żyją teraz z organizacji turnusów wypoczynkowych z cennikiem darowizn zamiast paragonów, okłamując swoich gości i publicznie każdego, kto natrafi na ich sielankowe filmiki. „Zadośćuczynienie wszechświatowi” miało  trafić na hospicjum, a nie na „organizację krzak”. 
            </p>
              
            <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Nýdek</h2>

            <p>
              Gdyby sprawa dotyczyła tylko jednego miliardera, można by mówić o przypadku lub pechowym doborze najemców. Jednak nieco dalej od <strong>Janova</strong>, w miejscowości <strong>Nýdek</strong>, funkcjonował <button onClick={() => openGallery('nydek')} className="font-bold text-stone-900 underline decoration-double decoration-stone-400 hover:bg-stone-100 transition-colors">kolejny, bliźniaczy ośrodek</button>.
            </p>

            
            <p>
              Relacje świadków wskazują, że w posiadłości w <strong>Nýdku</strong> odbywały się regularne ceremonie o charakterze zbliżonym do tych u <strong>Kordysów</strong> i <strong>Badowskiego</strong>, prowadzone przez <strong>Piotra Bonawenturę Tracza</strong>. Chociaż witryna ośrodka już nie istnieje, archiwum internetu „Wayback Machine” zachowało zrzuty strony tribunydek.com. Opisy warsztatów jednoznacznie wskazują, że nieruchomość była wykorzystywana do pracy z psychodelikami.
            </p>

            <p>
              Skoro wiemy już, czym ten dom był, kluczowym pytaniem staje się: do kogo należał?
            </p>

            <p>
              Analiza czeskich ksiąg wieczystych przynosi sensacyjne odkrycie. Właścicielem tej kolejnej szamańskiej świątyni – dokładnie w czasie, gdy strona internetowa zapraszała na ceremonie – był drugi z duetu miliarderów stojących za gamingowym gigantem, <strong>Marcin Iwiński</strong>. Dokumenty urzędowe bezlitośnie łączą jego nazwisko z infrastrukturą, w której odbywał się nielegalny proceder.
            </p>
            

            <LocationStamp 
              name="NÝDEK" 
              code="708186" 
              plot="st. 506/1" 
              lv="832" 
              onClick={() => openGallery('nydek')}
            />

            <p>
              Oznacza to, że nie jeden lecz obaj legendarni założyciele  <strong>CD Projekt</strong> na czeskim pograniczu posiadali nieruchomości, w których -za około 1500zł- serwowano zakazany wywar z dżungli. Zastanawiające.
            </p>

            <p>
              Jeszcze bardziej zastanawiające jest to, co stało się z tą nieruchomością w momencie zagrożenia. Gdy 15.10.2020 roku aresztowano <strong>Kordysa</strong>, nad środowiskiem zawisło widmo policyjnych nalotów. Dokumenty urzędowe odsłaniają niepokojącą zbieżność dat:
            </p>

            <ul className="list-none space-y-4 my-8 font-mono text-sm border-l-2 border-stone-300 pl-4">
               <li className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-stone-400 shrink-0" />
                <div>
                  <strong>15 października 2020 r.</strong> – Policyjny szturm na ośrodek <strong>Kordysów</strong>. W środowisku wybucha panika.
                </div>
              </li>
              <li className="flex items-center justify-center text-stone-400">
                &darr;
              </li>
              <li className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-stone-400 shrink-0" />
                <div>
                  <strong>15 czerwca 2021 r.</strong> – <strong>Marcin Iwiński</strong> sprzedaje nieruchomości w <strong>Nýdku</strong>.
                </div>
              </li>
            </ul>

            <p>
              Nabywcą luksusowej posiadłości nie został inny inwestor, lecz sam <strong>Piotr Bonawentura Tracz</strong> – ten sam człowiek, który wcześniej pełnił tam rolę szamana.
            </p>

            <TransactionStamp 
              label="Nr Transakcji (Katastr)" 
              value="V-2937/2021-832" 
              subDetails="Obręb: Nýdek [708186]"
            />

            <p>
              Transakcja ta rodzi wątpliwości: w jaki sposób niszowy szaman sfinansował zakup luksusowej willi od jednego z najbogatszych Polaków? Nowy właściciel niemal natychmiast zmienił formalny profil działalności na legalne warsztaty pracy z ciałem. Zbieżność tej sekwencji zdarzeń z „darowizną” <strong>Kicińskiego</strong> w <strong>Janovie</strong> pozwala dostrzec powtarzalny schemat wycofywania się właścicieli z infrastruktury powiązanej z nielegalnym procederem.
            </p>

            <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Sprawiedliwość na sprzedaż?</h2>

            <p>
              Historia <strong>Hermanovic</strong>, <strong>Janova</strong> i <strong>Nýdka</strong> to opowieść o dwóch równoległych światach. W jednym – za kraty czeskich więzień – trafiają szamani, których nazwiska stają się synonimem skandalu. W drugim – na szczytach list Forbesa – trwają ludzie, którzy tę infrastrukturę sfinansowali.
            </p>

            <p>
              Choć miliony płynące z cyfrowej rozrywki pozwoliły na budowę azylów w czeskich górach, nie zdołały kupić spokoju sumienia wobec śmierci, która przecięła ten psychodeliczny biznes. Dziś, gdy posiadłości zmieniają właścicieli w blasku darowizn i pospiesznych transakcji, pozostaje pytanie: czy sprawiedliwość, podobnie jak ayahuaskowe wizje, jest tylko iluzją i kwestią zasobności portfela?
            </p>

            <div className="mt-8 mb-4 flex justify-end">
               <div className="text-right">
                  <span className="block font-bold text-stone-900">Marlow</span>
               </div>
            </div>

            {/* --- SEKCJA: STATUS PRAWNY (ZMODYFIKOWANA - STYL 'NAJS' BEZ IKON) --- */}
            <div className="mt-12 mb-12 py-4 px-5 bg-stone-50 shadow-sm">
               <div className="border-l-4 border-red-900 pl-4">
                  <h4 className="font-bold text-red-900 uppercase tracking-widest mb-2 text-xs">
                     Status Prawny (2025/2026)
                  </h4>
                  <p className="mb-2 font-bold text-stone-900 text-xs">Prokuratura w <strong>Częstochowie</strong> prowadzi śledztwa:</p>
                  <ul className="list-disc list-inside space-y-1 mb-3 font-mono text-[10px]">
                     <li>W sprawie organizacji ceremonii i udzielania środków odurzających <span className="text-stone-500">(Sygn. PR 3 Ds 125.2024)</span>.</li>
                     <li>W sprawie nieumyślnego spowodowania śmierci <strong>Ilony Lewandowskiej</strong> <span className="text-stone-500">(Sygn. PR 3 Ds 124.2024)</span>.</li>
                  </ul>
                  <div className="text-[10px] font-bold text-red-800 border-t border-red-100 pt-2 tracking-wide">
                    Nadzór nad postępowaniami objął Zastępca Prokuratora Okręgowego.
                  </div>
               </div>
            </div>
            {/* ------------------------------------------------ */}

          </div>

          <footer className="mt-4 pt-8 border-none font-sans">
              
             <div className="mb-8">
               <h3 className="text-xl font-bold text-stone-900 uppercase tracking-widest flex items-center gap-2 mb-4">
                 <Search className="w-5 h-5" /> Dokumenty Źródłowe
               </h3>
               <div className="border-b border-stone-300 w-full mb-6"></div>
               <p className="text-base text-stone-800 italic text-left">
                 Artykuł powstał na podstawie jawnej dokumentacji urzędowej i sądowej. Pełną listę sygnatur oraz odnośniki do baz państwowych (Katastr, InfoSoud), umożliwiające samodzielną niezależną weryfikację danych.
               </p>
             </div>
             
             <div className="grid gap-4 text-sm text-stone-600">
               
               {/* 1. WYROK KORDYSA */}
               <div className="p-3 bg-white border border-stone-200 hover:border-blue-300 transition-colors shadow-sm">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2">
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm leading-tight">Wyrok <strong>Jarosława Kordysa</strong></h4>
                      <p className="font-mono text-[10px] text-stone-500 mt-1">Sygn. 30 T 5/2020</p>
                    </div>
                    <a
                      href={KORDYS_PDF_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 w-40 justify-center bg-blue-50 text-blue-700 px-3 py-1 text-xs font-bold rounded border border-blue-100 hover:bg-blue-100 transition-colors flex items-center gap-2 underline decoration-double decoration-blue-300"
                    >
                      <FileText className="w-3 h-3" /> Pobierz PDF
                    </a>
                  </div>
                  <div className="border-t border-stone-100 pt-2">
                    <a
                      href="https://msp.gov.cz/web/krajsky-soud-v-ostrave/zakladni-informace/-/clanek/informace-rok-2022"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-stone-400 hover:text-blue-600 flex items-center gap-1 uppercase tracking-wider underline decoration-double decoration-stone-200"
                    >
                      <Globe className="w-3 h-3" />
                      Weryfikuj na msp.gov.cz
                    </a>
                  </div>
               </div>

               {/* 2. WYROK BADOWSKIEGO */}
               <div className="p-3 bg-white border border-stone-200 hover:border-blue-300 transition-colors shadow-sm">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2">
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm leading-tight">Wyrok <strong>Bartosza Badowskiego</strong></h4>
                      <p className="font-mono text-[10px] text-stone-500 mt-1">Sygn. 66 T 146/2021</p>
                    </div>
                    <a 
                      href={BADI_PDF_URL} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="shrink-0 w-40 justify-center bg-blue-50 text-blue-700 px-3 py-1 text-xs font-bold rounded border border-blue-100 hover:bg-blue-100 transition-colors flex items-center gap-2 underline decoration-double decoration-blue-300"
                    >
                      <FileText className="w-3 h-3" /> Pobierz PDF
                    </a>
                  </div>
                  <div className="border-t border-stone-100 pt-2">
                    <a 
                      href="https://msp.gov.cz/documents/22409/2997339/29Si+25-2022+p%C5%99%C3%ADloha+%C4%8D.+1.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[10px] text-stone-400 hover:text-blue-600 flex items-center gap-1 uppercase tracking-wider underline decoration-double decoration-stone-200"
                    >
                      <Globe className="w-3 h-3" />
                      Weryfikuj oryginał (29 Si 25/2022)
                    </a>
                  </div>
               </div>

               {/* 3. HISTORIA JANOV */}
               <div className="p-3 bg-white border border-stone-200 hover:border-blue-300 transition-colors shadow-sm">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2">
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm leading-tight">Historia własności: <strong>Janov</strong></h4>
                      <p className="font-mono text-[10px] text-stone-500 mt-1">LV 127 | Obręb 656976</p>
                    </div>
                    <a 
                      href="#" 
                      className="shrink-0 w-40 justify-center bg-blue-50 text-blue-700 px-3 py-1 text-xs font-bold rounded border border-blue-100 hover:bg-blue-100 transition-colors flex items-center gap-2 underline decoration-double decoration-blue-300"
                    >
                      <Download className="w-3 h-3" /> Pobierz PDF
                    </a>
                  </div>
                  <div className="border-t border-stone-100 pt-2">
                    <a 
                      href="https://nahlizenidokn.cuzk.cz" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[10px] text-stone-400 hover:text-blue-600 flex items-center gap-1 uppercase tracking-wider underline decoration-double decoration-stone-200"
                    >
                      <Globe className="w-3 h-3" />
                      Weryfikuj na nahlizenidokn.cuzk.cz
                    </a>
                  </div>
               </div>

               {/* 4. HISTORIA NYDEK */}
               <div className="p-3 bg-white border border-stone-200 hover:border-blue-300 transition-colors shadow-sm">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2">
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm leading-tight">Historia własności: <strong>Nýdek</strong></h4>
                      <p className="font-mono text-[10px] text-stone-500 mt-1">LV 832 | Obręb 708186</p>
                    </div>
                    <a 
                      href="#" 
                      className="shrink-0 w-40 justify-center bg-blue-50 text-blue-700 px-3 py-1 text-xs font-bold rounded border border-blue-100 hover:bg-blue-100 transition-colors flex items-center gap-2 underline decoration-double decoration-blue-300"
                    >
                      <Download className="w-3 h-3" /> Pobierz PDF
                    </a>
                  </div>
                  <div className="border-t border-stone-100 pt-2">
                    <a 
                      href="https://nahlizenidokn.cuzk.cz" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[10px] text-stone-400 hover:text-blue-600 flex items-center gap-1 uppercase tracking-wider underline decoration-double decoration-stone-200"
                    >
                      <Globe className="w-3 h-3" />
                      Weryfikuj na nahlizenidokn.cuzk.cz
                    </a>
                  </div>
               </div>

               {/* 5. DAROWIZNA JANOV */}
               <div className="p-3 bg-white border border-stone-200 hover:border-blue-300 transition-colors shadow-sm">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2">
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm leading-tight">Transakcja: Darowizna (<strong>Janov</strong>)</h4>
                      <p className="font-mono text-[10px] text-stone-500 mt-1">Sygnatura: V-5821/2023</p>
                    </div>
                    <a 
                      href="#" 
                      className="shrink-0 w-40 justify-center bg-blue-50 text-blue-700 px-3 py-1 text-xs font-bold rounded border border-blue-100 hover:bg-blue-100 transition-colors flex items-center gap-2 underline decoration-double decoration-blue-300"
                    >
                      <Download className="w-3 h-3" /> Pobierz PDF
                    </a>
                  </div>
                  <div className="border-t border-stone-100 pt-2">
                    <a 
                      href="https://nahlizenidokn.cuzk.cz" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[10px] text-stone-400 hover:text-blue-600 flex items-center gap-1 uppercase tracking-wider underline decoration-double decoration-stone-200"
                    >
                      <Globe className="w-3 h-3" />
                      Weryfikuj na nahlizenidokn.cuzk.cz
                    </a>
                  </div>
               </div>

               {/* 6. SPRZEDAŻ NYDEK */}
               <div className="p-3 bg-white border border-stone-200 hover:border-blue-300 transition-colors shadow-sm">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2">
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm leading-tight">Transakcja: Sprzedaż (<strong>Nýdek</strong>)</h4>
                      <p className="font-mono text-[10px] text-stone-500 mt-1">Sygnatura: V-2937/2021</p>
                    </div>
                    <a 
                      href="#" 
                      className="shrink-0 w-40 justify-center bg-blue-50 text-blue-700 px-3 py-1 text-xs font-bold rounded border border-blue-100 hover:bg-blue-100 transition-colors flex items-center gap-2 underline decoration-double decoration-blue-300"
                    >
                      <Download className="w-3 h-3" /> Pobierz PDF
                    </a>
                  </div>
                  <div className="border-t border-stone-100 pt-2">
                    <a 
                      href="https://nahlizenidokn.cuzk.cz" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[10px] text-stone-400 hover:text-blue-600 flex items-center gap-1 uppercase tracking-wider underline decoration-double decoration-stone-200"
                    >
                      <Globe className="w-3 h-3" />
                      Weryfikuj na nahlizenidokn.cuzk.cz
                    </a>
                  </div>
               </div>

               {/* 7. WAYBACK MACHINE - NYDEK */}
               <div className="p-3 bg-white border border-stone-200 hover:border-blue-300 transition-colors shadow-sm">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2">
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm leading-tight">Archiwalna Strona: <strong>Nýdek</strong></h4>
                      <p className="font-mono text-[10px] text-stone-500 mt-1">Archiwum: tribunydek.com</p>
                    </div>
                    <a 
                      href="https://web.archive.org/web/*/tribunydek.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="shrink-0 w-40 justify-center bg-stone-50 text-stone-600 px-3 py-1 text-xs font-bold rounded border border-stone-200 hover:bg-stone-100 transition-colors flex items-center gap-2 underline decoration-double decoration-stone-300"
                    >
                      <History className="w-3 h-3" /> Wayback Machine
                    </a>
                  </div>
               </div>

                {/* 8. WAYBACK MACHINE - MUNAY SONQO (PERU) */}
               <div className="p-3 bg-white border border-stone-200 hover:border-blue-300 transition-colors shadow-sm">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2">
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm leading-tight">Archiwalna Strona: <strong>Munay Sonqo</strong></h4>
                      <p className="font-mono text-[10px] text-stone-500 mt-1">Archiwum: munaysonqo.com (Peru)</p>
                    </div>
                    <a 
                      href={MUNAY_WAYBACK_URL}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="shrink-0 w-40 justify-center bg-stone-50 text-stone-600 px-3 py-1 text-xs font-bold rounded border border-stone-200 hover:bg-stone-100 transition-colors flex items-center gap-2 underline decoration-double decoration-stone-300"
                    >
                      <History className="w-3 h-3" /> Wayback Machine
                    </a>
                  </div>
               </div>

             </div>

             <div className="mt-16 text-center">
                <div className="w-24 h-px bg-stone-300 mx-auto mb-6"></div>
                <p className="text-xs text-stone-500 font-mono uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  Zasoby Niezatapialne (Web3)
                </p>
                <a 
                  href="https://kutasinskigate.eth.limo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-stone-400 hover:text-stone-900 transition-colors underline decoration-double decoration-stone-200"
                >
                  kutasinskigate.eth.limo
                </a>
             </div>
          </footer>
        </article>

        <EvidenceAudioModal isOpen={isAudioOpen} onClose={() => setIsAudioOpen(false)} src="/evidence/stefan-nagranie.mp3" />
        <GalleryModal isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} data={galleryData} />
      </main>
  );
}
