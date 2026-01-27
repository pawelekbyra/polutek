"use client";

import React, { useState } from 'react';
import { Scale, FileText, Search, User, Mail, MapPin, Calendar, Globe, X, Stamp, Video, Info, ShieldCheck, History, ExternalLink, Download, PenTool, Home as HouseIcon } from 'lucide-react';
import PasswordProtect from './components/PasswordProtect';
import { GalleryModal } from '@/components/gallery/GalleryModal';
import ArticleVideoPlayer from '@/components/ArticleVideoPlayer';

// --- KONFIGURACJA IPFS (BEZ ZMIAN) ---
const PINATA_GATEWAY = "https://yellow-elegant-porpoise-917.mypinata.cloud/ipfs";
const KORDYS_IMAGES_CID = "bafybeigjvxqqprplfpt4io3ciq6ut4x652p4mwetb3kscufj3uwj6z36tm";
const KORDYS_IMAGES_URL = `${PINATA_GATEWAY}/${KORDYS_IMAGES_CID}`;
const BADI_IMAGES_CID = "bafybeifdgw2zosj6lz2qg3d33aye4bd4vcz3rtrix2jbw3wwjhvxxjrk6q";
const BADI_IMAGES_URL = `${PINATA_GATEWAY}/${BADI_IMAGES_CID}`;
const NYDEK_IMAGES_CID = "bafybeidabdztfvfa7ycie5q47xfby7jiqtuwt6oddccuujpvjxqzd4ofpa";
const NYDEK_IMAGES_URL = `${PINATA_GATEWAY}/${NYDEK_IMAGES_CID}`;
const JANOV_IMAGES_CID = "bafybeia6rid25dw5t46mwmgwu4coa3t6qp34vcno4mcnqxuixplpyfmvly";
const JANOV_IMAGES_URL = `${PINATA_GATEWAY}/${JANOV_IMAGES_CID}`;
const VIDEO_CID = "bafybeifkquvqp6cewygbgoqsm3vm6kni3d4wy6medzc7nbsczziswmmv7u";
const ARREST_VIDEO_CID = "bafybeickwaxlebikfa2aax7mwk7xnp56n6vqmnw7mafponnztlzinf73iy";
const KORDYS_PDF_URL = `${PINATA_GATEWAY}/bafybeibzxfsg5s4jkiuf2kzmbdtmfutfjk75ej5zrpt2igan4aldvqc3oq`;
const BADI_PDF_URL = `${PINATA_GATEWAY}/bafkreietkosain6ftde7f3li5ic34qhkwuglz2tu2kfcpbvrwhslskhwza`;

type GalleryData = {
  title: string;
  images: string[];
  signature?: string;
  pdfUrl?: string;
  type?: 'verdict' | 'gallery';
};

// --- FUNKCJE POMOCNICZE (BEZ ZMIAN) ---
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

// --- DANE DO GALERII (BEZ ZMIAN) ---
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

// --- NOWE STYLE KOMPONENTÓW ---

// ZMIANA: Ciemna teczka z aktami, czcionka maszynowa
const CaseFile = ({ title, children, type = 'evidence' }: { title: string, children: React.ReactNode, type?: 'evidence' | 'transcript' | 'email' }) => (
  <div className="my-10 border-l-2 border-red-800 bg-zinc-900/50 rounded-r-sm overflow-hidden break-inside-avoid shadow-[0_4px_20px_-5px_rgba(0,0,0,0.5)]">
    <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex items-center gap-3 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
      {type === 'email' ? <Mail className="w-4 h-4 text-amber-500" /> : type === 'transcript' ? <Search className="w-4 h-4 text-blue-400" /> : <FileText className="w-4 h-4 text-red-500" />}
      <span className="opacity-75">{title}</span>
    </div>
    <div className="p-6 font-mono text-sm md:text-base leading-relaxed text-zinc-300 relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        {children}
    </div>
  </div>
);

// ZMIANA: Ostrzeżenie prawne w stylu "Warning"
const LegalNote = ({ term, children }: { term: string, children: React.ReactNode }) => (
  <div className="my-12 flex gap-5 p-6 bg-amber-950/20 border border-amber-900/30 rounded-lg backdrop-blur-sm">
    <Scale className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
    <div>
      <strong className="block font-mono text-amber-500 text-sm tracking-wider uppercase mb-3 border-b border-amber-900/30 pb-2 inline-block">{term}</strong>
      <div className="text-zinc-400 text-sm leading-relaxed font-sans">{children}</div>
    </div>
  </div>
);

// ZMIANA: Cytat jak wycinek z gazety lub transkrypt
const PullQuote = ({ quote, author, source }: { quote: string, author: string, source: string }) => (
  <div className="my-14 pl-8 border-l-[1px] border-zinc-700 relative">
    <div className="absolute -left-[9px] top-0 text-3xl leading-none text-zinc-700 font-serif">“</div>
    <p className="font-serif text-2xl md:text-3xl italic text-zinc-200 leading-relaxed mb-6 opacity-90">
      {quote}
    </p>
    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 flex gap-2 items-center">
       <div className="h-px w-8 bg-zinc-700"></div>
       <span className="font-bold text-zinc-400">{author}</span> // {source}
    </div>
  </div>
);

// ZMIANA: Wygląd "Karty z bazy danych" (ciemny)
const LocationStamp = ({ name, code, plot, lv, onClick }: { name: string, code: string, plot: string, lv: string, onClick?: () => void }) => (
  <div className="my-8 flex justify-start">
    <button 
      onClick={onClick}
      className="relative border border-zinc-700 bg-black/40 p-1 pr-6 rounded-sm flex items-center gap-4 hover:border-zinc-500 hover:bg-zinc-900 transition-all text-left group"
    >
       <div className="absolute top-1 right-1 text-zinc-700 group-hover:text-zinc-500 transition-colors">
         <ExternalLink className="w-3 h-3" />
       </div>

       <div className="bg-zinc-900 h-full p-3 flex items-center justify-center border-r border-zinc-800 border-dashed">
          <HouseIcon className="w-5 h-5 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
       </div>
       <div className="py-2 pl-2">
          <div className="text-[9px] uppercase tracking-[0.2em] text-red-700/80 font-bold mb-1 flex items-center gap-2">
            {name}
          </div>
          <div className="font-mono text-base font-bold text-zinc-200">LV {lv}</div>
          <div className="text-[10px] text-zinc-500 font-mono mt-1">
            Działka: <span className="text-zinc-300">{plot}</span> <span className="text-zinc-700 mx-1">|</span> Obręb: <span className="text-zinc-300">{code}</span>
          </div>
       </div>
    </button>
  </div>
);

// ZMIANA: Wygląd stempla urzędowego (negatyw)
const TransactionStamp = ({ label, value, subDetails }: { label: string, value: string, subDetails?: string }) => (
  <div className="my-8 flex justify-start opacity-90">
    <div className="relative border border-dashed border-zinc-600 bg-zinc-950 p-1 pr-6 rounded-sm flex items-center gap-4 cursor-default">
       <div className="bg-zinc-900 h-full p-3 flex items-center justify-center">
          <Stamp className="w-5 h-5 text-zinc-500" />
       </div>
       <div className="py-2 pl-2">
          <div className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-1">{label}</div>
          <div className="font-mono text-base font-bold text-zinc-300">{value}</div>
          {subDetails && <div className="text-[10px] text-zinc-600 font-mono mt-1">{subDetails}</div>}
       </div>
    </div>
  </div>
);

// --- MODAL AUDIO (Drobne poprawki kolorów) ---
const EvidenceAudioModal = ({ src, isOpen, onClose }: { src: string, isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-4 transition-all duration-300">
      <div onClick={(e) => e.stopPropagation()} className="bg-zinc-900 shadow-2xl rounded-sm w-full max-w-sm relative overflow-hidden animate-[fadeIn_0.3s_ease-out] border border-zinc-700">
        <div className="h-1 w-full bg-gradient-to-r from-red-900 via-red-600 to-red-900"></div>
        <div className="p-6 relative">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-2 w-2 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span></span>
                <span className="text-[10px] font-mono text-red-500/80 uppercase tracking-[0.2em] font-bold">Dowód #A-23 (Podsłuch)</span>
              </div>
              <h3 className="text-zinc-100 font-serif text-xl tracking-wide">„Rozmowa w ogrodzie”</h3>
            </div>
            <button onClick={onClose} className="text-zinc-600 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
          </div>
          {/* Kaseta */}
          <div className="bg-[#111] rounded border border-zinc-800 p-4 mb-6 relative group">
            <div className="flex justify-between items-center bg-zinc-900 rounded px-3 py-4 border border-zinc-800">
                <div className="w-8 h-8 rounded-full border-2 border-zinc-700 bg-black flex items-center justify-center"><div className="w-2 h-2 bg-zinc-800 rounded-full animate-spin [animation-duration:3s]"></div></div>
                <div className="flex-1 mx-3 h-8 bg-[#1a1a1a] rounded flex items-center justify-center overflow-hidden relative"><div className="absolute w-[120%] h-[1px] bg-zinc-800 rotate-12 top-1/2"></div></div>
                <div className="w-8 h-8 rounded-full border-2 border-zinc-700 bg-black flex items-center justify-center"><div className="w-2 h-2 bg-zinc-800 rounded-full animate-spin [animation-duration:3s]"></div></div>
            </div>
          </div>
          <div className="bg-zinc-800 rounded p-1">
            <audio controls className="w-full h-8 accent-red-600 grayscale brightness-75 invert contrast-150">
              <source src={src} type="audio/mpeg" />
            </audio>
          </div>
        </div>
      </div>
    </div>
  );
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

  // ZMIANA: Główne tło strony na ciemne (Zinc-950)
  return (
    <PasswordProtect>
      <main className="min-h-screen bg-zinc-950 text-zinc-300 selection:bg-red-900 selection:text-white font-sans flex flex-col relative">
        
        {/* Tło - ziarno */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')] z-0"></div>

        <header className="pt-24 pb-12 px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-8 px-3 py-1 border border-red-900/50 bg-red-950/10 text-red-500 text-[10px] font-mono font-bold tracking-[0.3em] uppercase">
              Raport Śledczy #2024-X
            </div>
            
            <h1 className="mb-10 text-zinc-100">
              <span className="block text-5xl md:text-7xl font-bold leading-none tracking-tight font-serif">
                Eliksir Wiedźmina
              </span>
              <span className="block text-xl md:text-3xl text-zinc-500 font-light mt-6 max-w-3xl mx-auto tracking-wide">
                Mroczna tajemnica twórców CD Projekt
              </span>
            </h1>

            <div className="max-w-2xl mx-auto border-y border-zinc-800 py-8 px-4 bg-zinc-900/30">
              <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed font-serif italic">
                Ayahuasca, policyjne naloty i tragedia, o której nikt się miał nie dowiedzieć. W cieniu głośnego procesu dziennikarskie śledztwo ujawnia, jak twórcy gry „Wiedźmin” finansowali szamańskie podziemie.
              </p>
            </div>
          </div>
        </header>

        <article className="max-w-2xl mx-auto px-4 pt-8 pb-0 flex-grow relative z-10">
          
          {/* ZMIANA: Prose Invert (Tryb ciemny dla tekstu) + zmiana fontów na bardziej techniczne w nagłówkach */}
          <div className="prose prose-invert prose-zinc prose-lg max-w-none 
            prose-headings:font-mono prose-headings:uppercase prose-headings:tracking-widest prose-headings:text-zinc-200 prose-headings:font-normal
            prose-p:font-sans prose-p:text-zinc-400 prose-p:leading-8
            prose-blockquote:not-italic prose-blockquote:border-l-red-900 prose-blockquote:bg-zinc-900/50 prose-blockquote:py-2 prose-blockquote:px-6
            prose-strong:text-zinc-100 prose-strong:font-bold
            prose-a:text-zinc-100 prose-a:font-bold prose-a:no-underline prose-a:border-b prose-a:border-dashed prose-a:border-zinc-500 hover:prose-a:bg-zinc-800 hover:prose-a:text-white transition-colors">
            
            <p className="first-letter:text-6xl first-letter:font-bold first-letter:mr-4 first-letter:float-left first-letter:text-zinc-100 leading-relaxed">
              W 2020 roku media obiegły doniesienia o rozbiciu grupy polskich szamanów w czeskich Hermanovicach. Policyjny nalot, aresztowanie Jarosława i Karoliny Kordysów, a następnie surowe wyroki – 8,5 oraz 5,5 roku więzienia za prowadzenie nielegalnego biznesu polegającego na organizacji tzw. „ceremonii”, podczas których klientom podawano egzotyczny psychodelik – ayahuaskę.
            </p>

            <p>
              Ayahuaska to tradycyjny wywar z amazońskich roślin o silnym działaniu halucynogennym. Ze względu na wysoką zawartość DMT – substancji psychodelicznej wywołującej intensywne wizje i zmiany stanu świadomości, jej posiadanie i podawanie jest w Polsce i Czechach zabronione. Finałem medialnego spektaklu Kordysów było ułaskawienie przez czeskiego prezydenta po dwóch latach odsiadki.
            </p>

            <p>
              Kurtyna opadła, temat ucichł. Ale czy to na pewno koniec tej historii? W cieniu tego głośnego procesu toczył się drugi – cichy i błyskawiczny, zakończony dyskretnym wyrokiem, o którym nikt nawet w mediach się nie zająknął. Analiza sądowych dokumentów prowadzi do zdumiewających wniosków.
            </p>

            <p>
              W przygranicznym Janovie funkcjonował drugi, bliźniaczy ayahuaskowy ośrodek, którego współwłaścicielem okazał się miliarder – <strong className="bg-zinc-800 px-1">Michał Kiciński</strong>.
            </p>

            <h2 className="text-2xl mt-20 mb-10 pb-4 border-b border-zinc-800 flex items-center gap-3">
               <span className="text-red-900">01.</span> Świadek B.
            </h2>

            <p>
              W obszernym i publicznie dostępnym uzasadnieniu <button onClick={() => openGallery('wyrok_kordys')} title="Zobacz skan wyroku" className="font-bold text-zinc-200 border-b border-dashed border-zinc-500 hover:bg-zinc-800 transition-colors">wyroku</button> Jarosława Kordysa pojawia się postać świadka Bartosza B.
            </p>
            
            <p>
              Zgodnie z aktami:
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
              W Czechach księgi wieczyste są jawne i dostępne online. Wystarczy wejść na stronę Katastru Nieruchomości, wyszukać <button onClick={() => openGallery('janov')} className="font-bold text-zinc-200 border-b border-dashed border-zinc-500 hover:bg-zinc-800 transition-colors">działkę w Janovie</button> i za niewielką opłatą pobrać jej pełną historię.
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
               Bartosz Badowski (10%)
               <br/>
               <strong className="text-white bg-red-900/30 px-1 mt-2 inline-block">Michał Dawid Kiciński (90%)</strong>
            </p>

            <p>
              Drugie imię – Dawid – idealnie wypełnia lukę w zanonimizowanym skrócie „Michal D. K.”. Wspólnikiem szamana był twórca „Wiedźmina” – jeden z najbogatszych Polaków.
            </p>

            <h2 className="text-2xl mt-20 mb-10 pb-4 border-b border-zinc-800 flex items-center gap-3">
               <span className="text-red-900">02.</span> Na podsłuchu
            </h2>

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

            <div className="my-8 pl-6 border-l-2 border-red-500 font-serif italic text-xl text-zinc-300">
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
              Zaledwie dwa dni po tym telefonie, 26.08.2020 czescy policjanci weszli do posiadłości w Janovie. Efekty rewizji opisano w wyroku Kordysa:
            </p>

            <CaseFile title="Protokół rewizji">
              „w nieruchomości zabezpieczono rzeczy... oprócz marihuany zabezpieczono również substancje zawierające DMT o objętości ok. 2 kg”.
            </CaseFile>

            <p>
              Podczas policyjnej interwencji zidentyfikowano tam 15 obywateli Polski, którzy mieli brać udział w ceremonii. Wśród nich, stali bywalcy i bliscy znajomi Badowskiego – <strong className="text-zinc-200">Krzysztof Stefanek</strong> i <strong className="text-zinc-200">Lena Drzewińska</strong>, których obecność w momencie wkroczenia służb ma znaczenie w kontekście późniejszej ich roli w tej historii.
            </p>

            <h2 className="text-2xl mt-20 mb-10 pb-4 border-b border-zinc-800 flex items-center gap-3">
               <span className="text-red-900">03.</span> Cena wolności
            </h2>

            <p>
              Kiedy 26 sierpnia 2020 roku czeska policja weszła do posiadłości w Janovie, należącej do Bartosza Badowskiego i miliardera Michała Kicińskiego, Jarosław Kordys w Hermanovicach wciąż czuł się bezpiecznie. Nie wiedział jeszcze, że zegar zaczął odliczać czas do jego własnej katastrofy. Zaledwie 7 tygodni po cichym nalocie na Badowskiego policja zapukała do Kordysów.
            </p>

            <p>
              15 października 2020 roku sielankę w ich ośrodku przerwał huk granatów ogłuszających. Czeska jednostka antyterrorystyczna nie bawiła się w półśrodki: zamaskowani funkcjonariusze z długą bronią wdarli się do budynku, rzucając na ziemię przyszłych bohaterów głośnego skandalu.
            </p>

            <div className="my-12 w-full rounded-sm overflow-hidden border border-zinc-800 bg-black">
               <ArticleVideoPlayer 
                 src={`${PINATA_GATEWAY}/${ARREST_VIDEO_CID}/videoplayback.m3u8`} 
                 poster=""
               />
            </div>
             <div className="mt-2 text-xs text-zinc-600 font-mono border-l border-zinc-700 pl-3 flex gap-2">
                 <span className="font-bold text-red-900 uppercase">MATERIAŁ OPERACYJNY</span>
                 <span>Nagranie z nalotu (15.10.2020)</span>
             </div>

            <p>
              Co wydarzyło się w ciągu tych niespełna dwóch miesięcy? Odpowiedź kryje się w jednym czeskim terminie prawnym:
            </p>

            <LegalNote term="Dohoda o vině a trestu">
              Ugoda o winie i karze. Czeska procedura karna pozwalająca oskarżonemu na dobrowolne poddanie się karze w zamian za łagodniejszy wyrok, bez przeprowadzania pełnego procesu dowodowego i wzywania świadków.
            </LegalNote>

            <p>
              Bartosz „Badi” Badowski, wspólnik jednego z najbogatszych Polaków, błyskawicznie zrozumiał swoje położenie. W obliczu zabezpieczonych dowodów – w tym 2 kilogramów substancji z DMT i marihuany – wybrał strategię, która miała uchronić go przed wieloletnim więzieniem. Postanowił „kupić” sobie wolność.
            </p>

            <p>
              Ugoda pozwoliła na zamknięcie jego teczki bez wywoływania świadków, co w praktyce oznaczało, że mechanizmy działania janovskiego ośrodka nigdy nie wybrzmiały echem w publicznej debacie, chroniąc Badowskiego przed krzyżowym ogniem pytań i zeznaniami, które mogłyby pogrążyć także jego cichego wspólnika.
            </p>

            <p>
              Cena wolności Badowskiego okazała się być wysoka dla jego kolegi z branży. Zeznania „Badiego” były dla prokuratury bezcennym materiałem dowodowym, który pozwolił domknąć łańcuch poszlak w sprawie Kordysów.
            </p>

            <p>
               Na mocy <button onClick={() => openGallery('wyrok_badi')} title="Zobacz wyrok Bartosza B." className="font-bold text-zinc-200 border-b border-dashed border-zinc-500 hover:bg-zinc-800 transition-colors">wyroku</button> z dnia 2 listopada 2021 roku Bartosz Badowski został uznany winnym popełnienia „zbrodni niedozwolonej produkcji i innego obchodzenia się ze środkami odurzającymi”.
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
              Podczas, gdy Jarosław Kordys został skazany na 8,5 roku pozbawienia wolności Bartosz Badowski, którego sprawa dotyczyła tego samego procederu, tych samych substancji, regionu i czasu trwania działalności, dzięki ugodzie i współpracy z wymiarem sprawiedliwości, zakończył sprawę wyrokiem w zawieszeniu.
            </p>

            <h2 className="text-2xl mt-20 mb-10 pb-4 border-b border-zinc-800 flex items-center gap-3">
               <span className="text-red-900">04.</span> Cisza po burzy
            </h2>

            <p>
              Choć Badowski zaprzestał prowadzenia działalności szamańskiej, posiadłość w Janovie nie opustoszała – zamieszkali z nim wspomniani wcześniej Krzysztof Stefanek i Magdalena Drzewińska. Ich obecność u boku „Badiego” w tamtym czasie rzuca cień na ich późniejszą rolę; nie byli to wszakże niewinni obserwatorzy, lecz ludzie, którzy mimo tego, że sami byli obecni podczas policyjnej interwencji, pozostali lojalni wobec byłego szamana.
            </p>

            <p>
              Będąc tak blisko Badowskiego, doskonale znali mroczną tajemnicę śmierci Ilony. Ich decyzja o zamieszkaniu z człowiekiem, który w obliczu tragedii martwił się  o „ciągłość dostaw”, dowodzi, że w pełni akceptowali reguły zmowy milczenia.
            </p>

            <h2 className="text-2xl mt-20 mb-10 pb-4 border-b border-zinc-800 flex items-center gap-3">
               <span className="text-red-900">05.</span> Kiciński
            </h2>

            <p>
              W cieniu tych wyroków pozostaje wciąż niewyjaśniona rola cichego wspólnika. Michał Kiciński to nie jest postać, która o ayahuasce jedynie „słyszała” – on stał się jej nieoficjalnym ambasadorem w polskich mediach głównego nurtu. W licznych wywiadach (m.in. dla „Focusa”, „Newsweeka”) z niezwykłą precyzją opisuje on mechanizmy działania psychodelików. Kiciński publicznie opowiada o lekcjach pokory, jakie dała mu „medycyna”, o spotkaniach z szamanami i o tym, jak napar z dżungli otwiera „nową rzeczywistość”.
            </p>

            <PullQuote 
              quote="Po ayahuasce jest szansa na to, żeby sobie nie ściemniać."
              author="Michał Kiciński"
              source="Newsweek, 30 maja 2016 r."
            />

            <h2 className="text-2xl mt-20 mb-10 pb-4 border-b border-zinc-800 flex items-center gap-3">
               <span className="text-red-900">06.</span> „Błąd z Badim”
            </h2>

            <p>
               Michała Kiciński wiedział o Ilonie. Jego konfrontacja z organami ścigania nabrała formalnego kształtu dopiero jesienią 2023 roku. 21 września 2023 roku miliarder osobiście odebrał wezwanie do stawiennictwa w charakterze świadka w sprawie o sygnaturze WD-I-3186/23. Miało się ono odbyć 18.10.2023. Na wezwaniu czytelnie było napisane, że przesłuchanie będzie dotyczyć „pobytu w Janowie”.
            </p>

            <div className="my-12 flex flex-col items-center p-6 bg-zinc-900/50 border border-zinc-800 rounded-sm">
              <img 
                src={`${KORDYS_IMAGES_URL}/wezwanie/wezwanie_kicinski.png`} 
                alt="Wezwanie na policję"
                className="w-48 rounded shadow-lg border border-zinc-700 cursor-pointer hover:scale-105 transition-transform brightness-90 contrast-125"
                onClick={() => openGallery('wezwanie_kicinski')}
              />
              <p className="text-[10px] text-zinc-500 mt-4 font-mono uppercase tracking-widest w-48 text-center flex items-center justify-center gap-2">
                <Search className="w-3 h-3" /> Dowód: Wezwanie
              </p>
            </div>

            <p>
              Reakcja miliardera na zainteresowanie organów ścigania była błyskawiczna. Zwrócił się bezpośrednio do autora zawiadomienia – wysyłając mu wiadomość mailową z propozycją swoistej pokuty. Zamiast wyjaśnień prokuratorskich zaoferował przelew na cel charytatywny, nazywając lata nielegalnego procederu młodzieńczą naiwnością.
            </p>

            <CaseFile title="Wiadomość prywatna od M. Kicińskiego" type="email">
              „(...) Tak mogę zapłacić za swój błąd z Badim. Podaj mi Fundacje lub Stowarzyszenie (najlepiej powiązaną z hospicjum lub domami dziecka, bo tu widzę morze potrzeb i dużo cierpienia) i wpłacę tam dobrowolnie kwotę darowizny, w ramach Przeprosin wszechświatowi, za moją młodzieńczą naiwność i brak przenikliwości. Fundacja / Stowarzyszenie musi być uznana i z tradycjami, a nie jakaś organizacja krzak. Wyślę Ci potwierdzenie przelewu. (...)”
            </CaseFile>

            <p>
              Do przesłuchania doszło tydzień przed terminem wskazanym na wezwaniu – 11 października 2023 roku o godzinie 15:00 w Komendzie Rejonowej Policji Warszawa II. W protokole Kiciński przyjmuje linię opartą na braku świadomości co do charakteru działalności prowadzonej w jego posiadłości.
            </p>

            <CaseFile title="Zeznanie do protokołu">
              „Nie mam żadnej wiedzy co się działo na mojej farmie, w której jestem 90% udziałowcem (...) wynajmowałem tę nieruchomość.”
            </CaseFile>

            <p>
              Gdy w toku czynności padło kluczowe pytanie o jego własny udział w ceremoniach ayahuaski w Janovie, odpowiedź była lakoniczna:
            </p>

            <CaseFile title="Odpowiedź na pytanie o udział">
              „nie brałem udziału w takich ceremoniach w latach 2016-2023, a o wcześniejszym okresie odmawiam odpowiedzi”
            </CaseFile>

            <h2 className="text-2xl mt-20 mb-10 pb-4 border-b border-zinc-800 flex items-center gap-3">
               <span className="text-red-900">07.</span> Anonimowy filantrop
            </h2>

            <p>
              W listopadzie 2025 roku na kanale YouTube „Osada Natury Zew” pojawia się nagrany rok wcześniej film, w którym obecny gospodarz, Krzysztof Stefanek, snuje opowieść o powstaniu „Osady”. W sielskiej scenerii, z uśmiechem na ustach, buduje narrację o cudownym zbiegu okoliczności i tajemniczym dobroczyńcy.
            </p>

            <p>
              Stefanek wspomina, jak wspólnie z grupą przyjaciół pomagał uporządkować sprawy własnościowe, by obiekt „znalazł się w jednych rękach”. Kluczowy moment tej opowieści Stefanek datuje z niezwykłą precyzją:
            </p>

            <CaseFile title="Wypowiedź K. Stefanka">
              „Ostatecznie 23 października 2023 roku ten człowiek do nas zadzwonił powiedział, że wspólnie z żoną zdecydowali, że oni by chcieli to miejsce przekazać w darowiźnie”
            </CaseFile>

            <p>
              Stefanek przedstawia to jako efekt „researchu” darczyńcy, który rzekomo urzekła wizja działalności non-profit.
            </p>

            <div className="my-12 w-full rounded-sm overflow-hidden border border-zinc-800 bg-black">
                  <ArticleVideoPlayer 
                src={`${PINATA_GATEWAY}/${VIDEO_CID}/YTDowncom_YouTube_Media_4Xujw-krjxs_001_1080p-1.m3u8`} 
                poster=""
              />
            </div>
             <div className="mt-2 text-xs text-zinc-600 font-mono border-l border-zinc-700 pl-3 flex gap-2">
                 <span className="font-bold text-blue-800 uppercase">WIDEO</span>
                 <span>Stefanek o darowiźnie (2025)</span>
             </div>

            <p>
              Jednak kalendarz wydarzeń prawnych burzy ten romantyczny mit, ujawniając nerwowy pośpiech w pozbywaniu się „gorącego kartofla”:
            </p>

            <ul className="list-none space-y-6 my-12 font-mono text-sm border-l-2 border-zinc-800 pl-6 ml-2 relative">
              <li className="flex items-start gap-4 relative">
                 <div className="absolute -left-[31px] top-1 w-2 h-2 rounded-full bg-zinc-700"></div>
                <Calendar className="w-5 h-5 text-zinc-600 shrink-0" />
                <div>
                  <strong className="text-zinc-300 block mb-1">21 września 2023 r.</strong>
                  <span className="text-zinc-500">Michał Kiciński odbiera wezwanie na przesłuchanie w sprawie Janova.</span>
                </div>
              </li>
              
              <li className="flex items-start gap-4 relative">
                 <div className="absolute -left-[31px] top-1 w-2 h-2 rounded-full bg-zinc-700"></div>
                <Calendar className="w-5 h-5 text-zinc-600 shrink-0" />
                <div>
                  <strong className="text-zinc-300 block mb-1">3 października 2023 r.</strong>
                  <span className="text-zinc-500">Na tydzień przed wizytą na komendzie odkupuje od Bartosza Badowskiego jego 10% udziałów w nieruchomości. Aby pozbyć się całego ośrodka jednym podpisem, musi najpierw stać się jego jedynym właścicielem.</span>
                </div>
              </li>
              
              <li className="flex items-start gap-4 relative">
                 <div className="absolute -left-[31px] top-1 w-2 h-2 rounded-full bg-zinc-700"></div>
                <Calendar className="w-5 h-5 text-zinc-600 shrink-0" />
                <div>
                  <strong className="text-zinc-300 block mb-1">11 października 2023 r.</strong>
                  <span className="text-zinc-500">Miliarder staje przed policją. Do protokołu odmawia zeznań na temat swojej przeszłości w tym miejscu.</span>
                </div>
              </li>
               
              <li className="flex items-start gap-4 mt-6 relative">
                <div className="absolute -left-[31px] top-1/2 w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <div className="bg-red-900/10 border border-red-900/50 p-5 rounded-sm w-full relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-red-800"></div>
                  <strong className="text-red-500 block mb-2 font-bold uppercase tracking-wider flex items-center gap-2"><Calendar className="w-4 h-4"/> 23 października 2023 r.</strong>
                  <span className="text-zinc-300 block">Zaledwie 12 dni po kłopotliwym przesłuchaniu, gdy formalności własnościowe z Badim są już dopięte, następuje telefon do Stefanka z propozycją oddania majątku wartego miliony za darmo.</span>
                </div>
              </li>

              <li className="flex items-start gap-4 relative">
                 <div className="absolute -left-[31px] top-1 w-2 h-2 rounded-full bg-zinc-700"></div>
                <Calendar className="w-5 h-5 text-zinc-600 shrink-0" />
                <div>
                  <strong className="text-zinc-300 block mb-1">21 grudnia 2023 r.</strong>
                  <span className="text-zinc-500">Finał operacji. Kiciński formalnie przekazuje Janov w formie darowizny. Nieruchomość trafia do stowarzyszenia „non-profit” – fasadowej organizacji „krzak”, zarządzanej przez ludzi, którzy przez lata byli częścią tego procederu. Miliarder pozbywa się dowodów, a nowi właściciele zyskują bazę do dalszej działalności pod nowym szyldem.</span>
                </div>
              </li>
            </ul>

            <p>
              Cynizm tej sytuacji pogłębia fakt, że obdarowani nie byli przypadkowymi entuzjastami ekologii. Krzysztof Stefanek, który w filmie mówi o „odwróconej logice” i pięknie wolontariatu, i jego konkubina Magdalena Drzewińska w rzeczywistości doskonale znali mroczną historię Janova i tajemnicę śmierci Ilony. Przyjmując darowiznę, przejmowali nie tylko ziemię, ale i milczenie.
            </p>

            <TransactionStamp 
              label="Nr Transakcji (Katastr)" 
              value="V-5821/2023-127" 
              subDetails="Obręb: Janov u Krnova [656976]"
            />

            <p>
              Ostatecznie strategia okazała się skuteczna. Śledztwo umorzono zanim się zaczęło, a majątek, który mógł podlegać przepadkowi jako narzędzie przestępstwa, został bezpiecznie zaparkowany w „stowarzyszeniu”. Kiciński pozostał anonimowym „filantropem”, a Stefanek – opiekunem nowej, „czystej” osady.
            </p>

            <p>
              Na tragedii świadomie wzbogacili się ludzie, dla których tuszowanie prawdy stało się fundamentem ich nowej, intratnej rzeczywistości. Pod szyldem organizacji non-profit, żyją teraz z organizacji turnusów wypoczynkowych z cennikiem darowizn zamiast paragonów, okłamując swoich gości i publicznie każdego, kto natrafi na ich sielankowe filmiki.  „Zadośćuczynienie wszechświatowi” miało  trafić na hospicjum, a nie na „organizację krzak”. Autor wycofanego zawiadomienia nie był zadowolony.
            </p>
             
            <h2 className="text-2xl mt-20 mb-10 pb-4 border-b border-zinc-800 flex items-center gap-3">
               <span className="text-red-900">08.</span> Nýdek
            </h2>

            <p>
              Gdyby sprawa dotyczyła tylko jednego miliardera, można by mówić o przypadku lub pechowym doborze najemców. Jednak nieco dalej od Janova, w miejscowości <strong>Nýdek</strong>, funkcjonowało <button onClick={() => openGallery('nydek')} className="font-bold text-zinc-200 border-b border-dashed border-zinc-500 hover:bg-zinc-800 transition-colors">kolejny, bliźniaczy ośrodek</button>.
            </p>

            
            <p>
              Relacje świadków wskazują, że w posiadłości w Nýdku odbywały się regularne ceremonie o charakterze zbliżonym do tych u Kordysów i Badowskiego, prowadzone przez Piotra Bonawenturę Tracza. Chociaż witryna ośrodka już nie istnieje, archiwum internetu „Wayback Machine” zachowało zrzuty strony tribunydek.com. Opisy warsztatów jednoznacznie wskazują, że nieruchomość była wykorzystywana do pracy z psychodelikami.
            </p>

            <p>
              Skoro wiemy już, czym ten dom był, kluczowym pytaniem staje się: do kogo należał?
            </p>

            <p>
              Analiza czeskich ksiąg wieczystych przynosi sensacyjne odkrycie. Właścicielem tej kolejnej szamańskiej świątyni – dokładnie w czasie, gdy strona internetowa zapraszała na ceremonie – był drugi z duetu miliarderów stojących za CD Projekt, Marcin Iwiński. Dokumenty urzędowe bezlitośnie łączą jego nazwisko z infrastrukturą, w której odbywał się nielegalny proceder.
            </p>
            <LocationStamp 
              name="NÝDEK" 
              code="708186" 
              plot="st. 506/1" 
              lv="832" 
              onClick={() => openGallery('nydek')}
            />

            <p>
              Jeszcze bardziej zastanawiające jest to, co stało się z tą nieruchomością w momencie zagrożenia. Gdy 15.10.2020 roku aresztowano Kordysa, nad środowiskiem zawisło widmo policyjnych nalotów. Dokumenty urzędowe odsłaniają niepokojącą zbieżność dat:
            </p>

            <ul className="list-none space-y-6 my-12 font-mono text-sm border-l-2 border-zinc-800 pl-6 ml-2 relative">
               <li className="flex items-start gap-4 relative">
                 <div className="absolute -left-[31px] top-1 w-2 h-2 rounded-full bg-zinc-700"></div>
                <Calendar className="w-5 h-5 text-zinc-600 shrink-0" />
                <div>
                  <strong className="text-zinc-300 block mb-1">15 października 2020 r.</strong>
                  <span className="text-zinc-500">Policyjny szturm na ośrodek Kordysów. W środowisku wybucha panika.</span>
                </div>
              </li>
              
              <li className="flex items-start gap-4 relative">
                 <div className="absolute -left-[31px] top-1 w-2 h-2 rounded-full bg-zinc-700"></div>
                <Calendar className="w-5 h-5 text-zinc-600 shrink-0" />
                <div>
                  <strong className="text-zinc-300 block mb-1">15 czerwca 2021 r.</strong>
                  <span className="text-zinc-500">Marcin Iwiński sprzedaje nieruchomości w Nýdku.</span>
                </div>
              </li>
            </ul>

            <p>
              Nabywcą luksusowej posiadłości nie został inny inwestor, lecz sam Piotr Bonawentura Tracz – ten sam człowiek, który wcześniej pełnił tam rolę szamana.
            </p>

            <TransactionStamp 
              label="Nr Transakcji (Katastr)" 
              value="V-2937/2021-832" 
              subDetails="Obręb: Nýdek [708186]"
            />

            <p>
              Transakcja ta rodzi wątpliwości: w jaki sposób niszowy szaman sfinansował zakup luksusowej willi od jednego z najbogatszych Polaków? Nowy właściciel niemal natychmiast zmienił formalny profil działalności na legalne warsztaty pracy z ciałem. Zbieżność tej sekwencji zdarzeń z „darowizną” Kicińskiego w Janovie pozwala dostrzec powtarzalny schemat wycofywania się właścicieli z infrastruktury powiązanej z nielegalnym procederem.
            </p>

            <h2 className="text-2xl mt-20 mb-10 pb-4 border-b border-zinc-800 flex items-center gap-3">
               <span className="text-red-900">09.</span> Sprawiedliwość na sprzedaż?
            </h2>

            <p>
              Historia Hermanovic, Janova i Nýdka to opowieść o dwóch równoległych światach. W jednym – za kraty czeskich więzień – trafiają szamani, których nazwiska stają się synonimem skandalu. W drugim – na szczytach list Forbesa – trwają ludzie, którzy tę infrastrukturę sfinansowali.
            </p>

            <p>
              Choć miliony płynące z cyfrowej rozrywki pozwoliły na budowę azylów w czeskich górach, nie zdołały kupić spokoju sumienia wobec śmierci, która przecięła ten psychodeliczny biznes. Dziś, gdy posiadłości zmieniają właścicieli w blasku darowizn i pospiesznych transakcji, pozostaje pytanie: czy sprawiedliwość, podobnie jak ayahuaskowe wizje, jest tylko iluzją i kwestią zasobności portfela?
            </p>

            <div className="mt-16 mb-8 flex justify-end">
               <div className="text-right">
                  <span className="block font-mono text-zinc-500 text-xs tracking-widest uppercase mb-2">Raport przygotował</span>
                  <span className="block font-bold text-zinc-100 font-serif italic text-xl">Marlow</span>
               </div>
            </div>

          </div>

          <footer className="mt-16 pt-12 border-t border-zinc-900 font-sans pb-24">
              
             <div className="mb-12">
               <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2 mb-6">
                 <Search className="w-4 h-4" /> Baza Dokumentów Źródłowych
               </h3>
               
               <p className="text-sm text-zinc-600 mb-8 max-w-xl">
                 Poniższe archiwum zawiera surowe pliki źródłowe. Weryfikacja sygnatur możliwa w publicznych rejestrach Republiki Czeskiej (InfoSoud, Katastr).
               </p>
             </div>
             
             <div className="grid gap-3 text-sm text-zinc-400">
               
               {/* 1. WYROK KORDYSA */}
               <div className="p-4 bg-zinc-900/50 border border-zinc-800 hover:border-red-900/50 transition-colors group">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3">
                    <div>
                      <h4 className="font-bold text-zinc-300 text-sm leading-tight flex items-center gap-2">
                          <FileText className="w-3 h-3 text-red-700" />
                          Wyrok Jarosława Kordysa
                      </h4>
                      <p className="font-mono text-[10px] text-zinc-600 mt-1 uppercase">Sygn. 30 T 5/2020</p>
                    </div>
                    <a
                      href={KORDYS_PDF_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 w-32 justify-center bg-zinc-950 text-zinc-400 px-3 py-2 text-[10px] font-bold rounded-sm border border-zinc-800 hover:bg-zinc-800 hover:text-white transition-all flex items-center gap-2 uppercase tracking-wide"
                    >
                      <Download className="w-3 h-3" /> Pobierz
                    </a>
                  </div>
               </div>

               {/* 2. WYROK BADOWSKIEGO */}
               <div className="p-4 bg-zinc-900/50 border border-zinc-800 hover:border-red-900/50 transition-colors group">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3">
                    <div>
                      <h4 className="font-bold text-zinc-300 text-sm leading-tight flex items-center gap-2">
                           <FileText className="w-3 h-3 text-red-700" />
                           Wyrok Bartosza Badowskiego
                      </h4>
                      <p className="font-mono text-[10px] text-zinc-600 mt-1 uppercase">Sygn. 66 T 146/2021</p>
                    </div>
                    <a 
                      href={BADI_PDF_URL} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="shrink-0 w-32 justify-center bg-zinc-950 text-zinc-400 px-3 py-2 text-[10px] font-bold rounded-sm border border-zinc-800 hover:bg-zinc-800 hover:text-white transition-all flex items-center gap-2 uppercase tracking-wide"
                    >
                      <Download className="w-3 h-3" /> Pobierz
                    </a>
                  </div>
               </div>

               {/* 3. HISTORIA JANOV */}
               <div className="p-4 bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors group">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3">
                    <div>
                      <h4 className="font-bold text-zinc-300 text-sm leading-tight flex items-center gap-2">
                           <HouseIcon className="w-3 h-3 text-zinc-600" />
                           Historia własności: Janov
                      </h4>
                      <p className="font-mono text-[10px] text-zinc-600 mt-1 uppercase">LV 127 | Obręb 656976</p>
                    </div>
                    <a 
                      href="#" 
                      className="shrink-0 w-32 justify-center bg-zinc-950 text-zinc-400 px-3 py-2 text-[10px] font-bold rounded-sm border border-zinc-800 hover:bg-zinc-800 hover:text-white transition-all flex items-center gap-2 uppercase tracking-wide"
                    >
                      <Download className="w-3 h-3" /> Pobierz
                    </a>
                  </div>
               </div>

               {/* 4. HISTORIA NYDEK */}
               <div className="p-4 bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors group">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3">
                    <div>
                      <h4 className="font-bold text-zinc-300 text-sm leading-tight flex items-center gap-2">
                          <HouseIcon className="w-3 h-3 text-zinc-600" />
                          Historia własności: Nýdek
                      </h4>
                      <p className="font-mono text-[10px] text-zinc-600 mt-1 uppercase">LV 832 | Obręb 708186</p>
                    </div>
                    <a 
                      href="#" 
                      className="shrink-0 w-32 justify-center bg-zinc-950 text-zinc-400 px-3 py-2 text-[10px] font-bold rounded-sm border border-zinc-800 hover:bg-zinc-800 hover:text-white transition-all flex items-center gap-2 uppercase tracking-wide"
                    >
                      <Download className="w-3 h-3" /> Pobierz
                    </a>
                  </div>
               </div>

               {/* 5. DAROWIZNA JANOV */}
               <div className="p-4 bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors group">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3">
                    <div>
                      <h4 className="font-bold text-zinc-300 text-sm leading-tight flex items-center gap-2">
                          <Stamp className="w-3 h-3 text-zinc-600" />
                          Akt Darowizny (Janov)
                      </h4>
                      <p className="font-mono text-[10px] text-zinc-600 mt-1 uppercase">Sygnatura: V-5821/2023</p>
                    </div>
                    <a 
                      href="#" 
                      className="shrink-0 w-32 justify-center bg-zinc-950 text-zinc-400 px-3 py-2 text-[10px] font-bold rounded-sm border border-zinc-800 hover:bg-zinc-800 hover:text-white transition-all flex items-center gap-2 uppercase tracking-wide"
                    >
                      <Download className="w-3 h-3" /> Pobierz
                    </a>
                  </div>
               </div>

               {/* 6. SPRZEDAŻ NYDEK */}
               <div className="p-4 bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors group">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3">
                    <div>
                      <h4 className="font-bold text-zinc-300 text-sm leading-tight flex items-center gap-2">
                          <Stamp className="w-3 h-3 text-zinc-600" />
                          Akt Sprzedaży (Nýdek)
                      </h4>
                      <p className="font-mono text-[10px] text-zinc-600 mt-1 uppercase">Sygnatura: V-2937/2021</p>
                    </div>
                    <a 
                      href="#" 
                      className="shrink-0 w-32 justify-center bg-zinc-950 text-zinc-400 px-3 py-2 text-[10px] font-bold rounded-sm border border-zinc-800 hover:bg-zinc-800 hover:text-white transition-all flex items-center gap-2 uppercase tracking-wide"
                    >
                      <Download className="w-3 h-3" /> Pobierz
                    </a>
                  </div>
               </div>

               {/* 7. WAYBACK MACHINE */}
               <div className="p-4 bg-zinc-900/50 border border-zinc-800 hover:border-blue-900/30 transition-colors group">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3">
                    <div>
                      <h4 className="font-bold text-zinc-300 text-sm leading-tight flex items-center gap-2">
                          <History className="w-3 h-3 text-blue-800" />
                          Archiwum: tribunydek.com
                      </h4>
                      <p className="font-mono text-[10px] text-zinc-600 mt-1 uppercase">Wayback Machine Snapshot</p>
                    </div>
                    <a 
                      href="https://web.archive.org/web/*/tribunydek.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="shrink-0 w-32 justify-center bg-zinc-950 text-blue-500/50 px-3 py-2 text-[10px] font-bold rounded-sm border border-blue-900/20 hover:bg-blue-900/20 hover:text-blue-400 transition-all flex items-center gap-2 uppercase tracking-wide"
                    >
                      <ExternalLink className="w-3 h-3" /> Otwórz
                    </a>
                  </div>
               </div>

             </div>

             <div className="mt-20 text-center">
                <div className="w-16 h-px bg-zinc-800 mx-auto mb-8"></div>
                <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest mb-4 flex items-center justify-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                  <ShieldCheck className="w-3 h-3" />
                  Zabezpieczono w sieci IPFS / Web3
                </p>
                <a 
                  href="https://kutasinskigate.eth.limo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-zinc-500 hover:text-red-500 transition-colors border-b border-zinc-800 pb-1"
                >
                  kutasinskigate.eth.limo
                </a>
                <div className="mt-6 text-[10px] text-zinc-700 font-mono">
                  marlow.contact@proton.me
                </div>
             </div>
          </footer>
        </article>

        <EvidenceAudioModal isOpen={isAudioOpen} onClose={() => setIsAudioOpen(false)} src="/evidence/stefan-nagranie.mp3" />
        <GalleryModal isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} data={galleryData} />
      </main>
    </PasswordProtect>
  );
}
