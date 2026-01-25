"use client";
import React, { useState } from 'react';
import { Scale, FileText, Search, User, Mail, MapPin, Calendar, Globe, X, Stamp, Video, Info } from 'lucide-react';
import PasswordProtect from './components/PasswordProtect';
import { GalleryModal } from '@/components/gallery/GalleryModal';
import ArticleVideoPlayer from '@/components/ArticleVideoPlayer';

// --- KONFIGURACJA IPFS (NIEZATAPIALNE DOWODY) ---
const PINATA_GATEWAY = "https://yellow-elegant-porpoise-917.mypinata.cloud/ipfs";

// 1. CID Folderu ze zdjęciami (Wyroki, dokumenty)
const EVIDENCE_CID = "bafybeigjvxqqprplfpt4io3ciq6ut4x652p4mwetb3kscufj3uwj6z36tm";
const EVIDENCE_URL = `${PINATA_GATEWAY}/${EVIDENCE_CID}`;

// 2. CID Folderu z FILMEM (Wideo Stefana - HLS)
const VIDEO_CID = "bafybeifkquvqp6cewygbgoqsm3vm6kni3d4wy6medzc7nbsczziswmmv7u";

// 3. LINK DO PDF Z WYROKIEM KORDYSA (Zaktualizowany)
const KORDYS_PDF_URL = "https://yellow-elegant-porpoise-917.mypinata.cloud/ipfs/bafybeibzxfsg5s4jkiuf2kzmbdtmfutfjk75ej5zrpt2igan4aldvqc3oq"; 

// Definicja typu danych galerii
type GalleryData = {
  title: string;
  images: string[];
  signature?: string;
  pdfUrl?: string;
  type?: 'verdict' | 'gallery';
};

// --- FUNKCJE POMOCNICZE DO GENEROWANIA ŚCIEŻEK ---

// Generator dla wyroku (100 stron)
const generateVerdictPages = (folderName: string, count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const fileName = `${i + 1}.jpg`; 
    return `${EVIDENCE_URL}/${folderName}/${fileName}`;
  });
};

// Specjalny generator dla wyroku Kordysa (95 stron, specyficzne nazwy plików)
const generateKordysPages = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    // Zamienia liczbę na format czterocyfrowy (np. 1 -> "0001")
    const pageNumber = String(i + 1).padStart(4, '0');
    // Format: "30T 5 2021-1_page-0001.jpg"
    const fileName = `30T 5 2021-1_page-${pageNumber}.jpg`;
    return `${EVIDENCE_URL}/${fileName}`;
  });
};

// --- DANE DO GALERII (Z IPFS) ---

const GALLERY_NYDEK: GalleryData = {
  title: "Posiadłość w Nýdku (Archiwum)",
  images: [
    `${EVIDENCE_URL}/nydek/Nydek1.jpg`,
    `${EVIDENCE_URL}/nydek/Nydek2.jpg`
  ],
  signature: "LV 832"
};

const GALLERY_WYROK_KORDYS: GalleryData = {
  title: "Pełne uzasadnienie wyroku: Jarosław K.",
  images: generateKordysPages(95),
  signature: "30 T 5/2021",
  pdfUrl: KORDYS_PDF_URL, // Używamy linku zdefiniowanego na górze
  type: 'verdict'
};

const GALLERY_WYROK_BADI: GalleryData = {
  title: "Wyrok skazujący: Bartosz B.",
  images: [
    `${EVIDENCE_URL}/wyrok_badi/wyrok_page-0001.jpg`,
    `${EVIDENCE_URL}/wyrok_badi/wyrok_page-0002.jpg`,
    `${EVIDENCE_URL}/wyrok_badi/wyrok_page-0003.jpg`
  ],
  signature: "66 T 146/2021",
  pdfUrl: `${EVIDENCE_URL}/wyrok_badi/wyrok.pdf`,
  type: 'verdict'
};

const GALLERY_NIERUCHOMOSCI_2: GalleryData = {
  title: "Kolejny bliźniaczy ośrodek",
  images: [
    `${EVIDENCE_URL}/nydek/Nydek1.jpg`, 
    `${EVIDENCE_URL}/nydek/Nydek2.jpg`, 
    `${EVIDENCE_URL}/nydek/Nieruchomosc3.jpeg`
  ],
};

const GALLERY_WEZWANIE_KICINSKI: GalleryData = {
  title: "Wezwanie dla Michała Kicińskiego",
  images: [`${EVIDENCE_URL}/wezwanie/wezwanie_kicinski.png`],
  signature: "WD-I-3186/23"
};

const GALLERY_JANOV: GalleryData = {
  title: "Dokumentacja Nieruchomości: Janov",
  images: [
    `${EVIDENCE_URL}/gallery/janov/janov1.jpg`,
    `${EVIDENCE_URL}/gallery/janov/janov2.jpg`,
    `${EVIDENCE_URL}/gallery/janov/janov3.jpg`,
    `${EVIDENCE_URL}/gallery/janov/janov4.jpg`,
    `${EVIDENCE_URL}/gallery/janov/janov5.jpg`,
    `${EVIDENCE_URL}/gallery/janov/janov6.jpg`,
    `${EVIDENCE_URL}/gallery/janov/janov8.jpg`,
    `${EVIDENCE_URL}/gallery/janov/janov9.jpg`,
    `${EVIDENCE_URL}/gallery/janov/janov11.jpg`,
    `${EVIDENCE_URL}/gallery/janov/janov12.jpg`,
    `${EVIDENCE_URL}/gallery/janov/janov13.jpg`,
    `${EVIDENCE_URL}/gallery/janov/janov14.jpg`,
    `${EVIDENCE_URL}/gallery/janov/janov15.jpg`,
    `${EVIDENCE_URL}/gallery/janov/janov16.jpg`,
    `${EVIDENCE_URL}/gallery/janov/janov17.jpg`,
    `${EVIDENCE_URL}/gallery/janov/janov18.jpg`,
    `${EVIDENCE_URL}/gallery/janov/janov19.jpg`,
    `${EVIDENCE_URL}/gallery/janov/janov20.jpg`,
    `${EVIDENCE_URL}/gallery/janov/janov21.jpg`,
    `${EVIDENCE_URL}/gallery/janov/janov23.jpg`,
    `${EVIDENCE_URL}/gallery/janov/janov24.jpg`,
    `${EVIDENCE_URL}/gallery/janov/janov25.jpg`,
    `${EVIDENCE_URL}/gallery/janov/janov26.jpg`,
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
          <button onClick={onClick} className="font-bold text-stone-900 uppercase tracking-widest hover:text-blue-700 hover:underline transition-all text-left">
            {name}
          </button>
        ) : (
          <span className="font-bold text-stone-900 uppercase tracking-widest">{name}</span>
        )}
     </div>
     <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto border-t md:border-t-0 border-stone-200 pt-1 md:pt-0">
        <span className="flex gap-1.5"><span className="text-stone-400 uppercase hidden sm:inline">Obręb:</span><span className="font-medium text-stone-800">{code}</span></span>
        <span className="text-stone-300 hidden md:inline">|</span>
        <span className="flex gap-1.5"><span className="text-stone-400 uppercase hidden sm:inline">Działka:</span><span className="font-medium text-stone-800">{plot}</span></span>
        <span className="text-stone-300 hidden md:inline">|</span>
        <span className="flex gap-1.5"><span className="text-stone-400 uppercase hidden sm:inline">LV:</span><span className="font-medium text-stone-800">{lv}</span></span>
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

const EvidenceAudioModal = ({ src, isOpen, onClose }: { src: string, isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div onClick={onClose} className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 transition-all duration-300">
      <div onClick={(e) => e.stopPropagation()} className="bg-[#1a1a1a] shadow-2xl rounded-lg w-full max-w-sm relative overflow-hidden animate-[fadeIn_0.3s_ease-out] border border-stone-700">
        <div className="h-1 w-full bg-gradient-to-r from-red-800 via-red-600 to-red-800"></div>
        <div className="p-6 relative">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] pointer-events-none"></div>
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="flex h-2 w-2 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span></span>
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-[0.2em]">Dowód #A-23</span>
              </div>
              <h3 className="text-stone-100 font-serif text-xl italic tracking-wide">&quot;Rozmowa w ogrodzie&quot;</h3>
            </div>
            <button onClick={onClose} className="text-stone-500 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"><X className="w-5 h-5" /></button>
          </div>
          <div className="bg-stone-800 rounded border border-stone-700 p-4 mb-6 shadow-inner relative group">
            <div className="flex justify-between items-center bg-black/40 rounded px-3 py-4 border border-stone-600/50">
               <div className="w-8 h-8 rounded-full border-2 border-stone-600 bg-[#111] flex items-center justify-center"><div className="w-2 h-2 bg-stone-700 rounded-full"></div></div>
               <div className="flex-1 mx-3 h-8 bg-[#2a2a2a] rounded flex items-center justify-center overflow-hidden relative"><div className="absolute w-[120%] h-[1px] bg-stone-600 rotate-12 top-1/2"></div><span className="text-[9px] font-mono text-stone-500 z-10 bg-[#2a2a2a] px-1">SIDE A</span></div>
               <div className="w-8 h-8 rounded-full border-2 border-stone-600 bg-[#111] flex items-center justify-center"><div className="w-2 h-2 bg-stone-700 rounded-full"></div></div>
            </div>
            <div className="mt-3 text-center"><span className="font-mono text-[10px] text-stone-400 uppercase tracking-wider block">K. Stefanek / 2023</span></div>
          </div>
          <div className="bg-stone-200 rounded p-1">
            <audio controls className="w-full h-8 accent-stone-900 focus:outline-none">
              <source src={src} type="audio/mpeg" />
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
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryData, setGalleryData] = useState<GalleryData | null>(null);

  const openGallery = (type: 'nydek' | 'wyrok_kordys' | 'wyrok_badi' | 'nieruchomosci_2' | 'wezwanie_kicinski' | 'janov') => {
    const maps = {
      nydek: GALLERY_NYDEK,
      wyrok_kordys: GALLERY_WYROK_KORDYS,
      wyrok_badi: GALLERY_WYROK_BADI,
      nieruchomosci_2: GALLERY_NIERUCHOMOSCI_2,
      wezwanie_kicinski: GALLERY_WEZWANIE_KICINSKI,
      janov: GALLERY_JANOV
    };
    setGalleryData(maps[type]);
    setIsGalleryOpen(true);
  };

  return (
    <PasswordProtect>
      <main className="min-h-screen bg-[#FDFBF7] text-[#1a1a1a] selection:bg-yellow-200/50 font-serif flex flex-col">

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
                W cieniu głośnego procesu &bdquo;szamanów&rdquo; z polskiego establishmentu, dziennikarskie śledztwo ujawnia sieć powiązań prowadzącą do twórców gry &bdquo;Wiedźmin&rdquo;.
              </p>
            </div>
          </div>
        </header>

        <article className="max-w-2xl mx-auto px-4 py-8 flex-grow">
          <div className="prose prose-stone prose-lg max-w-none prose-headings:font-sans prose-headings:font-bold prose-a:text-blue-800 hover:prose-a:text-blue-900 prose-blockquote:not-italic">
            
            <p className="first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-stone-900 leading-relaxed">
              W 2020 roku media obiegły doniesienia o rozbiciu grupy polskich &quot;szamanów&quot; w czeskich Hermanovicach. Policyjny nalot, aresztowanie Jarosława i Karoliny Kordysów, a następnie surowe wyroki - 8,5 oraz 5,5 roku więzienia za prowadzenie nielegalnego biznesu.
            </p>

            <p>
              Ayahuaska to tradycyjny wywar z amazońskich roślin o silnym działaniu halucynogennym. Ze względu na wysoką zawartość DMT, jej posiadanie jest w Polsce i Czechach zabronione.
            </p>

            <p>
              Kurtyna opadła, temat ucichł. Ale czy to na pewno koniec tej historii? W cieniu tego głośnego procesu toczył się drugi – cichy i błyskawiczny.
            </p>

            <p>
              W przygranicznym Janovie funkcjonował drugi, bliźniaczy ayahuaskowy ośrodek, którego współwłaścicielem okazał się miliarder – <strong>Michał Kiciński</strong>.
            </p>

            <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Świadek B.</h2>

            <p>
              W obszernym i publicznie dostępnym uzasadnieniu <button onClick={() => openGallery('wyrok_kordys')} className="text-blue-700 hover:underline font-bold hover:bg-blue-50 px-1 rounded transition-colors" title="Zobacz skan wyroku">wyroku</button> Jarosława Kordysa o sygnaturze 30 T 5/2021 pojawia się postać świadka Bartosza B.
            </p>

            <CaseFile title="Zeznania świadka B.">
              &bdquo;Świadek B. odnośnie osoby oskarżonego [Jarosława Kordysa] oświadczył, że zna się z nim ok. 8 lat, a poznali się w Holandii&rdquo;.
              <br/><br/>
              &bdquo;Świadek B. potwierdził, że i on sam w przeszłości prowadził warsztaty&rdquo;.
            </CaseFile>

            <CaseFile title="Własność nieruchomości">
              &bdquo;(...) budynek rodzinny w miejscowości Janov (...), który jest częściowo użytkowany do stałego zamieszkania, a częściowo jako komercyjny obiekt noclegowy&rdquo;
              <br/><br/>
              &bdquo;Świadek [Bartosz B.] potwierdził, że w Janowie jest właścicielem jednej dziesiątej nieruchomości&rdquo;.
            </CaseFile>

            <p>Do kogo należała reszta? Sąd wskazuje wprost:</p>
            <CaseFile title="Ustalenia Sądu">&bdquo;...w odniesieniu do nieruchomości będących współwłasnością Bartosza B. i Michala D. K.&rdquo;.</CaseFile>

            <LocationStrip name="JANOV U KRNOVA" code="656976" plot="st. 281" lv="127" onClick={() => openGallery('janov')} />

            <div className="my-10 p-6 bg-stone-100 border-l-2 border-stone-400 italic text-stone-800 font-medium">
              <button onClick={() => openGallery('janov')} className="text-blue-700 hover:underline font-bold transition-colors">Pobrany dokument</button> nie pozostawia wątpliwości: w latach 2012–2023 współwłaścicielami byli Bartosz Badowski (10%) i Michał Dawid Kiciński (90%).
            </div>

            <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Telefon, który pogrążył imperium</h2>
            <p>Przełom nastąpił dzięki policyjnej technice operacyjnej. Telefon Kordysa był na podsłuchu.</p>
            
            <CaseFile title="Rekonstrukcja rozmowy" type="transcript">
              &bdquo;oskarżony J. K. omawia z B., że dotarła do niego informacja, że w obiekcie w Janovie zmarła jakaś kobieta&rdquo;.
            </CaseFile>
            
            <CaseFile title="Kontynuacja rozmowy" type="transcript">
              &bdquo;Następnie w rozmowie omawiają zamówienia &quot;herbaty&quot; z dżungli i to, czy im tego &quot;nie zepsują&rdquo;, ekscytując się nagraniem od dostawcy...&rdquo;
            </CaseFile>

            <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Cena wolności i zdrady</h2>
            <p>Bartosz Badowski, wspólnik Kicińskiego, wybrał strategię ugody.</p>

            <LegalNote term="Dohoda o vině a trestu">
              Ugoda o winie i karze. Czeska procedura karna pozwalająca oskarżonemu na dobrowolne poddanie się karze w zamian za łagodniejszy wyrok.
            </LegalNote>

            <p>Zeznania &quot;Badiego&quot; były bezcenne dla prokuratury. Na mocy wyroku <button onClick={() => openGallery('wyrok_badi')} className="text-blue-700 hover:underline font-bold px-1 transition-colors">66 T 146/2021</button> Badowski został skazany, ale w zawieszeniu.</p>

            <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Darowizna, czy gorący kartofel</h2>
            <p>W 2025 Krzysztof Stefanek opowiada o &quot;cudownej darowiźnie&quot; w filmie:</p>

            <div className="my-12">
              <p className="text-xs text-stone-500 mb-2 font-mono uppercase tracking-wider">
                 Materiał Wideo: Stefanek o darowiźnie (Kopia bezpieczeństwa na IPFS)
              </p>
              <ArticleVideoPlayer 
                src={`${PINATA_GATEWAY}/${VIDEO_CID}/YTDowncom_YouTube_Media_4Xujw-krjxs_001_1080p-1.m3u8`} 
                poster=""
              />
               <div className="mt-3 text-sm text-stone-500 font-sans border-l-2 border-stone-300 pl-3">
                <span className="font-bold text-stone-900 uppercase text-xs mr-2">Materiał Wideo:</span>
                Krzysztof Stefanek opowiada o &bdquo;cudownym&rdquo; otrzymaniu darowizny (Materiał z 2025 r.)
              </div>
            </div>

            <p>Jednak kalendarz wydarzeń prawnych burzy ten mit. Kiciński oddał majątek po wezwaniu na policję.</p>
            
            <ul className="list-none space-y-4 my-8 font-mono text-sm border-l-2 border-stone-300 pl-4">
               <li><strong>21.09.2023</strong> – Wezwanie na przesłuchanie.</li>
               <li><strong>11.10.2023</strong> – Przesłuchanie na komendzie.</li>
               <li className="font-bold text-orange-600">23.10.2023 – Telefon do Stefanka o darowiźnie.</li>
               <li><strong>21.12.2023</strong> – Formalne przekazanie Janova.</li>
            </ul>

            <TransactionStamp label="Nr Transakcji (Katastr)" value="V-5821/2023-127" subDetails="Obręb: Janov u Krnova" />

            <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Jeszcze jeden ośrodek</h2>
            <p>W miejscowości Nýdek działał kolejny ośrodek. Właścicielem był Marcin Iwiński.</p>
            <LocationStrip name="NÝDEK" code="708186" plot="st. 506/1" lv="832" onClick={() => openGallery('nydek')} />
            <p>Po aresztowaniach Iwiński sprzedał dom Piotrowi Traczowi, dawnemu szamanowi.</p>
            <TransactionStamp label="Nr Transakcji" value="V-2937/2021-832" subDetails="Obręb: Nýdek" />

          </div>

          <footer className="mt-12 pt-12 border-t-2 border-stone-200 font-sans">
             <div className="mb-8">
               <h3 className="text-xl font-bold text-stone-900 uppercase tracking-widest flex items-center gap-2 mb-4">
                 <Search className="w-5 h-5" /> Dokumenty Źródłowe
               </h3>
               <p className="text-base text-stone-800">Artykuł powstał na podstawie jawnej dokumentacji urzędowej i sądowej.</p>
             </div>
             <div className="grid gap-4 text-sm text-stone-600">
               {/* Linki do dokumentów */}
               <div className="p-4 bg-white border border-stone-200 hover:border-blue-300 transition-colors shadow-sm">
                  <h4 className="font-bold text-stone-900">Wyrok Bartosza B.</h4>
                  <p>Sygn. 66 T 146/2021</p>
               </div>
               
               {/* SEKACJA Z PRZYCISKIEM POBIERANIA PDF */}
               <div className="p-4 bg-white border border-stone-200 hover:border-blue-300 transition-colors shadow-sm">
                  <h4 className="font-bold text-stone-900">Sprawa Kordysa</h4>
                  <p className="mb-2">Sygn. 30 T 5/2020</p>
                  <a 
                    href={KORDYS_PDF_URL} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-700 hover:underline font-bold flex items-center gap-2"
                  >
                    <FileText className="w-3 h-3" /> Pobierz Pełny Wyrok (PDF)
                  </a>
               </div>

               <div className="p-4 bg-white border border-stone-200 hover:border-blue-300 transition-colors shadow-sm">
                  <h4 className="font-bold text-stone-900">Księgi Wieczyste (ČÚZK)</h4>
                  <p>Weryfikuj online: nahlizenidokn.cuzk.cz</p>
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
