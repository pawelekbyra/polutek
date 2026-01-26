"use client";

import React, { useState } from 'react';
import { Scale, FileText, Search, User, Mail, MapPin, Calendar, Globe, X, Stamp, Video, Info, ShieldCheck, History, ExternalLink, Download, PenTool, Terminal, Cpu, Radio, AlertTriangle, Eye, Hash } from 'lucide-react';
import PasswordProtect from './components/PasswordProtect';
import { GalleryModal } from '@/components/gallery/GalleryModal';
import ArticleVideoPlayer from '@/components/ArticleVideoPlayer';

// --- KONFIGURACJA IPFS (NIEZATAPIALNE DOWODY) ---
const PINATA_GATEWAY = "https://cloudflare-ipfs.com/ipfs";

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
const KORDYS_PDF_URL = "https://yellow-elegant-porpoise-917.mypinata.cloud/ipfs/bafybeibzxfsg5s4jkiuf2kzmbdtmfutfjk75ej5zrpt2igan4aldvqc3oq";
const BADI_PDF_URL = "https://yellow-elegant-porpoise-917.mypinata.cloud/ipfs/bafkreietkosain6ftde7f3li5ic34qhkwuglz2tu2kfcpbvrwhslskhwza";

// Definicja typu danych galerii
type GalleryData = {
  title: string;
  images: string[];
  signature?: string;
  pdfUrl?: string;
  type?: 'verdict' | 'gallery';
};

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
const OLD_EVIDENCE_URL = `${PINATA_GATEWAY}/bafybeigjvxqqprplfpt4io3ciq6ut4x652p4mwetb3kscufj3uwj6z36tm`;

const GALLERY_NYDEK: GalleryData = {
  title: "LOKACJA: NÝDEK (ARCHIWUM)",
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
  title: "WYROK SĄDOWY: JAROSŁAW K.",
  images: generateKordysPages(95),
  signature: "30 T 5/2021",
  pdfUrl: KORDYS_PDF_URL,
  type: 'verdict'
};

const GALLERY_WYROK_BADI: GalleryData = {
  title: "WYROK SĄDOWY: BARTOSZ B.",
  images: generateBadiPages(3),
  signature: "66 T 146/2021",
  pdfUrl: BADI_PDF_URL,
  type: 'verdict'
};

const GALLERY_WEZWANIE_KICINSKI: GalleryData = {
  title: "WEZWANIE: MICHAŁ KICIŃSKI",
  images: [`${OLD_EVIDENCE_URL}/wezwanie/wezwanie_kicinski.png`],
  signature: "WD-I-3186/23"
};

const GALLERY_JANOV: GalleryData = {
  title: "LOKACJA: JANOV (DOKUMENTACJA)",
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

// --- STYLE CSS IN-JS DLA EFEKTÓW CYBERPUNK ---
const cyberpunkStyles = `
  @keyframes scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }
  .scanlines::before {
    content: " ";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
    z-index: 50;
    background-size: 100% 2px, 3px 100%;
    pointer-events: none;
  }
  .glitch-text:hover {
    text-shadow: 2px 0 #00f0ff, -2px 0 #ff003c;
  }
  .cyber-grid {
    background-image: linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px);
    background-size: 20px 20px;
  }
`;

// --- KOMPONENTY UI ---

const CaseFile = ({ title, children, type = 'evidence' }: { title: string, children: React.ReactNode, type?: 'evidence' | 'transcript' | 'email' }) => (
  <div className="my-8 border-l-2 border-[#fcee0a] bg-[#0a0a0a] relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-1">
      <div className="flex gap-1">
        <div className="w-1 h-1 bg-[#fcee0a]"></div>
        <div className="w-1 h-1 bg-[#fcee0a]"></div>
        <div className="w-1 h-1 bg-[#fcee0a]"></div>
      </div>
    </div>
    <div className="bg-[#151515] px-4 py-2 flex items-center gap-2 text-xs font-mono text-[#fcee0a] uppercase tracking-widest border-b border-[#222]">
      {type === 'email' ? <Mail className="w-4 h-4 text-cyan-400" /> : type === 'transcript' ? <Radio className="w-4 h-4 text-cyan-400" /> : <Terminal className="w-4 h-4 text-cyan-400" />}
      <span>{title}</span>
    </div>
    <div className="p-6 font-mono text-sm md:text-base leading-relaxed text-gray-300 bg-black/50">
      {children}
    </div>
  </div>
);

const LegalNote = ({ term, children }: { term: string, children: React.ReactNode }) => (
  <div className="my-10 flex gap-4 p-5 bg-[#0a0a00] border border-[#fcee0a]/30 rounded-none relative">
    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#fcee0a] to-transparent opacity-50"></div>
    <AlertTriangle className="w-6 h-6 text-[#fcee0a] shrink-0 mt-1" />
    <div>
      <strong className="block font-mono text-[#fcee0a] text-lg mb-2 tracking-wider uppercase"> {term}</strong>
      <div className="text-gray-400 text-sm leading-relaxed font-mono">{children}</div>
    </div>
  </div>
);

const PullQuote = ({ quote, author, source }: { quote: string, author: string, source: string }) => (
  <div className="my-12 relative pl-8">
    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00f0ff] to-[#fcee0a]"></div>
    <p className="font-sans font-black text-2xl md:text-4xl text-white leading-none tracking-tight mb-4 uppercase italic">
      „{quote}”
    </p>
    <div className="font-mono text-xs uppercase tracking-widest text-[#00f0ff]">
      {/* FIX: ' // ' is now wrapped in {'...'} to avoid comment error */}
      <span className="text-[#fcee0a] font-bold">NETRUNNER: {author}</span> {'//'} {source}
    </div>
  </div>
);

const LocationStamp = ({ name, code, plot, lv, onClick }: { name: string, code: string, plot: string, lv: string, onClick?: () => void }) => (
  <div className="my-8 flex justify-start">
    <button 
      onClick={onClick}
      className="relative border border-[#333] bg-[#050505] p-1 pr-6 flex items-center gap-4 hover:border-[#00f0ff] transition-all duration-100 group text-left w-full sm:w-auto"
    >
        <div className="bg-[#111] h-full p-3 flex items-center justify-center border-r border-[#333] group-hover:border-[#00f0ff] group-hover:bg-[#00f0ff]/10 transition-colors">
           <MapPin className="w-5 h-5 text-[#fcee0a]" />
        </div>
        <div className="py-2">
           <div className="text-[10px] uppercase tracking-[0.2em] text-[#00f0ff] font-bold mb-1 flex items-center gap-2">
             {name} <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
           </div>
           <div className="font-mono text-lg font-bold text-white">LV {lv}</div>
           <div className="text-[10px] text-gray-500 font-mono mt-1 uppercase">
             SEKTOR: {plot} <span className="text-[#333] mx-1">|</span> ZONE: {code}
           </div>
        </div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#fcee0a] opacity-0 group-hover:opacity-100"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#fcee0a] opacity-0 group-hover:opacity-100"></div>
    </button>
  </div>
);

const TransactionStamp = ({ label, value, subDetails }: { label: string, value: string, subDetails?: string }) => (
  <div className="my-8 flex justify-start">
    <div className="relative border border-[#333] bg-[#050505] p-1 pr-6 flex items-center gap-4 w-full sm:w-auto">
       <div className="bg-[#111] h-full p-3 flex items-center justify-center border-r border-[#333]">
          <Hash className="w-5 h-5 text-[#fcee0a]" />
       </div>
       <div className="py-2">
          <div className="text-[10px] uppercase tracking-[0.2em] text-[#00f0ff] font-bold mb-1">{label}</div>
          <div className="font-mono text-lg font-bold text-white">{value}</div>
          {subDetails && <div className="text-[10px] text-gray-500 font-mono mt-1 uppercase">{subDetails}</div>}
       </div>
    </div>
  </div>
);

const EvidenceAudioModal = ({ src, isOpen, onClose }: { src: string, isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[100] p-4">
      <div onClick={(e) => e.stopPropagation()} className="bg-black border border-[#fcee0a] w-full max-w-sm relative overflow-hidden shadow-[0_0_20px_rgba(252,238,10,0.2)]">
        <div className="h-6 bg-[#fcee0a] w-full flex items-center px-2 justify-between">
            <span className="text-black font-bold text-xs uppercase tracking-widest">Audio Decryption</span>
            <button onClick={onClose}><X className="w-4 h-4 text-black font-bold" /></button>
        </div>
        <div className="p-6 relative">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-mono text-[#00f0ff] uppercase tracking-[0.2em]">DOWÓD #A-23</span>
              </div>
              <h3 className="text-white font-mono text-lg tracking-wide">„ROZMOWA W OGRODZIE”</h3>
            </div>
          </div>
          <div className="bg-[#111] border border-[#333] p-4 mb-6 relative">
             <div className="w-full h-8 bg-[#222] flex items-center justify-center overflow-hidden">
                <div className="w-full h-[1px] bg-[#00f0ff] animate-pulse"></div>
             </div>
             <span className="font-mono text-[9px] text-gray-500 uppercase mt-2 block text-center">Rejestracja: K. Stefanek / 2023</span>
          </div>
          <div className="bg-[#fcee0a] p-1">
            <audio controls className="w-full h-8 accent-black focus:outline-none mix-blend-multiply">
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

  return (
    <PasswordProtect>
      <style dangerouslySetInnerHTML={{ __html: cyberpunkStyles }} />
      <main className="min-h-screen bg-black text-gray-300 font-mono flex flex-col relative selection:bg-[#fcee0a] selection:text-black scanlines cyber-grid">
        
        {/* DEKORACYJNY GLITCH EFEKT NA GÓRZE */}
        <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-[#fcee0a] via-[#00f0ff] to-[#ff003c] z-50 opacity-80"></div>

        {/* HEADER */}
        <header className="pt-24 pb-12 px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-1 bg-[#fcee0a] text-black text-[12px] font-bold tracking-[0.3em] uppercase transform -skew-x-12">
              Śledztwo Dziennikarskie
            </div>
            
            <h1 className="mb-10 text-white relative">
              <span className="block text-5xl md:text-8xl font-black leading-none tracking-tighter uppercase glitch-text" style={{ textShadow: '4px 4px 0px #333' }}>
                Eliksir <span className="text-[#fcee0a]">Wiedźmina</span>
              </span>
              <span className="block text-xl md:text-3xl text-[#00f0ff] font-bold tracking-widest mt-4 uppercase max-w-3xl mx-auto border-t border-[#333] pt-4">
                Mroczna tajemnica twórców CD Projekt
              </span>
            </h1>

            <div className="max-w-2xl mx-auto border border-[#333] bg-black/80 py-8 px-6 relative backdrop-blur-sm">
              <div className="absolute top-0 left-0 w-2 h-2 bg-[#fcee0a]"></div>
              <div className="absolute top-0 right-0 w-2 h-2 bg-[#fcee0a]"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#fcee0a]"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#fcee0a]"></div>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-sans">
                <span className="text-[#fcee0a] font-bold">Ayahuasca, policyjne naloty i tragedia</span>, o której nikt miał się nie dowiedzieć. W cieniu głośnego procesu dziennikarskie śledztwo ujawnia, jak twórcy gry „Wiedźmin” finansowali szamańskie podziemie.
              </p>
            </div>
          </div>
        </header>

        <article className="max-w-3xl mx-auto px-4 py-8 flex-grow relative z-10">
          
          {/* KONFIGURACJA STYLÓW TEKSTU */}
          <div className="prose prose-invert prose-lg max-w-none 
            prose-p:text-gray-300 prose-p:font-mono prose-p:text-sm md:prose-p:text-base prose-p:leading-7
            prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-headings:text-white
            prose-strong:text-[#fcee0a] prose-strong:font-bold
            prose-a:text-[#00f0ff] prose-a:font-bold prose-a:no-underline hover:prose-a:bg-[#00f0ff] hover:prose-a:text-black hover:prose-a:px-1 transition-all">
            
            <p className="first-letter:text-6xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-[#fcee0a] leading-relaxed">
              W 2020 roku media obiegły doniesienia o rozbiciu grupy polskich szamanów w czeskich Hermanovicach. Policyjny nalot, aresztowanie Jarosława i Karoliny Kordysów, a następnie surowe wyroki – 8,5 oraz 5,5 roku więzienia za prowadzenie nielegalnego biznesu polegającego na organizacji tzw. „ceremonii”, podczas których klientom podawano egzotyczny psychodelik – ayahuaskę.
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

            <h2 className="text-3xl mt-16 mb-8 text-[#fcee0a] border-b-4 border-[#fcee0a] inline-block pr-10">01 // Świadek B.</h2>

            <p>
              W obszernym i publicznie dostępnym uzasadnieniu <button onClick={() => openGallery('wyrok_kordys')} title="Zobacz skan wyroku" className="text-[#00f0ff] font-bold hover:bg-[#00f0ff] hover:text-black transition-colors px-1 uppercase text-xs border border-[#00f0ff]">DOKUMENT: wyrok.pdf</button> Jarosława Kordysa pojawia się postać świadka Bartosza B.
            </p>
            
            <p>
              Zgodnie z aktami:
            </p>

            <CaseFile title="LOGI: Zeznania świadka B.">
              „Świadek B. odnośnie osoby oskarżonego [Jarosława Kordysa] oświadczył, że zna się z nim ok. 8 lat, a poznali się w Holandii”.
              <br/><br/>
              „Świadek B. potwierdził, że i on sam w przeszłości prowadził warsztaty”, a obecnie sam „jest przedmiotem dochodzenia policji w Krnowie właśnie z powodu ceremonii”.
            </CaseFile>

            <p>
              Akta ujawniają również skalę zarzutów wobec Bartosza B.:
            </p>

            <CaseFile title="SYSTEM: Zarzuty wobec Bartosza B.">
              „(...) wymieniony był sprawdzany w związku z występkiem niedozwolonej produkcji i innego obchodzenia się ze środkami odurzającymi (...) albowiem miał w roku 2014 zlecić przesłanie na swój adres przesyłki pocztowej przechwyconej na lotnisku w Lipsku RFN zawierającej 4,5 kg DMT, a 6.6.2018 miało dojść do zatrzymania przesyłki pocztowej we Frankfurcie nad Menem RFN zawierającej 2000 g meskaliny i 38,6 g substancji DMT.”
            </CaseFile>

            <p>
              Intrygujący fragment dotyczy własności „bazy”. Dokumenty stwierdzają:
            </p>

            <CaseFile title="DANE: Własność nieruchomości">
              „(...) budynek rodzinny w miejscowości Janov (...), który jest częściowo użytkowany do stałego zamieszkania, a częściowo jako komercyjny obiekt noclegowy”
              <br/><br/>
              „Świadek [Bartosz B.] potwierdził, że w Janowie jest właścicielem jednej dziesiątej nieruchomości”.
            </CaseFile>

            <p>
              Do kogo należała reszta? Sąd wskazuje wprost:
            </p>

            <CaseFile title="USTALENIA SĄDU">
              „...w odniesieniu do nieruchomości będących współwłasnością Bartosza B. i Michala D. K.”.
            </CaseFile>

            <p>
              W Czechach księgi wieczyste są jawne i dostępne online. Wystarczy wejść na stronę Katastru Nieruchomości, wyszukać <button onClick={() => openGallery('janov')} className="text-[#00f0ff] font-bold hover:bg-[#00f0ff] hover:text-black transition-colors px-1 uppercase text-xs border border-[#00f0ff]">SEKTOR: JANOV</button> i za niewielką opłatą pobrać jej pełną historię.
            </p>
            
            <LocationStamp 
              name="JANOV U KRNOVA" 
              code="656976" 
              plot="st. 281" 
              lv="127" 
              onClick={() => openGallery('janov')}
            />

            <div className="my-10 p-6 bg-[#0a0a00] border-l-4 border-[#fcee0a] font-mono text-gray-300">
              <button onClick={() => openGallery('janov')} className="text-[#fcee0a] font-bold hover:underline">Pobrany dokument</button> nie pozostawia wątpliwości: w latach 2012–2023 współwłaścicielami nieruchomości byli:
              
              <div className="mt-6 flex flex-col gap-3 font-mono text-xs md:text-sm bg-black p-4 border border-[#333]">
                  <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500"></div>
                      <span className="text-gray-400">Bartosz Badowski (10%)</span>
                  </div>
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#fcee0a] animate-pulse"></div>
                      <span className="text-[#fcee0a] font-bold uppercase tracking-widest">Michał Dawid Kiciński (90%)</span>
                  </div>
              </div>
            </div>

            <p>
              Drugie imię – Dawid – idealnie wypełnia lukę w zanonimizowanym skrócie „Michal D. K.”. Wspólnikiem szamana był twórca „Wiedźmina” – jeden z najbogatszych Polaków.
            </p>

            <h2 className="text-3xl mt-16 mb-8 text-[#fcee0a] border-b-4 border-[#fcee0a] inline-block pr-10">02 // Na podsłuchu</h2>

            <p>
              Przełom w sprawie organizatorów ayahuaskowych ceremonii w 2020 roku nastąpił dzięki policyjnej technice operacyjnej. Telefon Kordysa był na stałym podsłuchu, a funkcjonariusze słuchali na żywo, gdy w dniu 24.08.2020 r. doszło do nerwowej wymiany zdań pomiędzy Badowskim i Kordysem.
            </p>

            <p>
              Kordys zadzwonił do Badowskiego wyraźnie zaniepokojony wieściami, które do niego dotarły. Bał się, że tragedia, o której huczało w kuluarach, może zniszczyć ich imperium. Sąd w uzasadnieniu wyroku precyzyjnie rekonstruuje ten moment:
            </p>

            <CaseFile title="TRANSKRYPCJA: Uzasadnienie Sądu" type="transcript">
              „oskarżony J. K. omawia z B., że dotarła do niego informacja, że w obiekcie w Janovie zmarła jakaś kobieta”.
            </CaseFile>

            <p>
              W rozmowie pojawia się też wątek zagrożenia ze strony osoby trzeciej – mężczyźni omawiają szantażystę, który chce iść na policję. Kordys wprost pyta wspólnika:
            </p>

            <CaseFile title="AUDIO: Kordys Voice" type="transcript">
              „W jakim zagrożeniu jest nasza praca?”
            </CaseFile>

            <p>
              Odpowiedź na to pytanie znajduje się w aktach sprawy i nie pozostawia złudzeń co do intencji rozmówców. W uzasadnieniu wyroku Kordysa czytamy:
            </p>

            <div className="my-8 pl-6 border-l-[6px] border-[#ff003c] font-sans font-bold text-xl text-white italic">
              „Z ich rozmowy wynika, że nie zajmowali  się w zasadzie samym faktem śmierci, lecz raczej obawą, aby to nie przyciągnęło uwagi policji.”
            </div>

            <p>
              Dla sądu był to koronny dowód na to, że oskarżeni prowadzili nielegalny biznes, a nie działalność duchową – śmierć człowieka była dla nich jedynie „psuciem interesów”.
            </p>

            <p>
              Cynizm tej konwersacji sięga zenitu chwilę później. Gdy tylko ustalili strategię uciszenia plotek, natychmiast przeszli do logistyki dostaw narkotyku. Sąd odnotowuje, że zaraz po dywagacjach o śmierci i szantażu, rozmówcy wracają do interesów:
            </p>

            <CaseFile title="TRANSKRYPCJA: ciąg dalszy" type="transcript">
              „Następnie w rozmowie omawiają zamówienia «herbaty» z dżungli i to, czy im tego «nie zepsują», ekscytując się nagraniem od dostawcy, który «siedzi w dżungli i gotuje».”
            </CaseFile>

            <p>
              Dla policjantów, którzy słyszeli to w czasie rzeczywistym, przekaz był jasny: w obiekcie mogło dojść do tragedii, a sprawcy martwili się jedynie o ciągłość dostaw.
            </p>

            <p>
              Zaledwie dwa dni po tym telefonie, 26.08.2020 czescy policjanci weszli do posiadłości w Janovie. Efekty rewizji opisano w wyroku Kordysa:
            </p>

            <CaseFile title="RAPORT: Protokół rewizji">
              „w nieruchomości zabezpieczono rzeczy... oprócz marihuany zabezpieczono również substancje zawierające DMT o objętości ok. 2 kg”.
            </CaseFile>

            <p>
              Podczas policyjnej interwencji zidentyfikowano tam 15 obywateli Polski, którzy mieli brać udział w ceremonii. Wśród nich, stali bywalcy i bliscy znajomi Badowskiego – <strong>Krzysztof Stefanek</strong> i <strong>Lena Drzewińska</strong>, których obecność w momencie wkroczenia służb ma znaczenie w kontekście późniejszej ich roli w tej historii.
            </p>

            <h2 className="text-3xl mt-16 mb-8 text-[#fcee0a] border-b-4 border-[#fcee0a] inline-block pr-10">03 // Cena wolności</h2>

            <p>
              Kiedy 26 sierpnia 2020 roku czeska policja weszła do posiadłości w Janovie, należącej do Bartosza Badowskiego i miliardera Michała Kicińskiego, Jarosław Kordys w Hermanovicach wciąż czuł się bezpiecznie. Nie wiedział jeszcze, że zegar zaczął odliczać czas do jego własnej katastrofy. Zaledwie 7 tygodni po cichym nalocie na Badowskiego policja zapukała do Kordysów.
            </p>

            <p>
              15 października 2020 roku sielankę w ich ośrodku przerwał huk granatów ogłuszających. Czeska jednostka antyterrorystyczna nie bawiła się w półśrodki: zamaskowani funkcjonariusze z długą bronią wdarli się do budynku, rzucając na ziemię przyszłych bohaterów głośnego skandalu.
            </p>

            <div className="my-12 border border-[#fcee0a] p-1 bg-[#fcee0a]/10">
               <ArticleVideoPlayer 
                 src={`${PINATA_GATEWAY}/${ARREST_VIDEO_CID}/videoplayback.m3u8`} 
                 poster=""
               />
               <div className="mt-2 text-[10px] text-[#fcee0a] font-mono flex items-center gap-2">
                 <Video className="w-3 h-3" />
                 <span className="uppercase tracking-widest">NAGRANIE OPERACYJNE: RAJD (15.10.2020)</span>
               </div>
            </div>

            <p>
              Co wydarzyło się w ciągu tych niespełna dwóch miesięcy? Odpowiedź kryje się w jednym czeskim terminie prawnym:
            </p>

            <LegalNote term="DOHODA O VINĚ A TRESTU">
              Ugoda o winie i karze. Czeska procedura karna pozwalająca oskarżonemu na dobrowolne poddanie się karze w zamian za łagodniejszy wyrok, bez przeprowadzania pełnego procesu dowodowego i wzywania świadków.
            </LegalNote>

            <p>
              Bartosz &quot;Badi&quot; Badowski, wspólnik jednego z najbogatszych Polaków, błyskawicznie zrozumiał swoje położenie. W obliczu zabezpieczonych dowodów – w tym 2 kilogramów substancji z DMT i marihuany – wybrał strategię, która miała uchronić go przed wieloletnim więzieniem. Postanowił „kupić” sobie wolność.
            </p>

            <p>
              Ugoda pozwoliła na zamknięcie jego teczki bez wywoływania świadków, co w praktyce oznaczało, że mechanizmy działania janovskiego ośrodka nigdy nie wybrzmiały echem w publicznej debacie, chroniąc Badowskiego przed krzyżowym ogniem pytań i zeznaniami, które mogłyby pogrążyć także jego cichego wspólnika.
            </p>

            <p>
              Cena wolności Badowskiego okazała się być wysoka dla jego kolegi z branży. Zeznania „Badiego” były dla prokuratury bezcennym materiałem dowodowym, który pozwolił domknąć łańcuch poszlak w sprawie Kordysów.
            </p>

            <p>
               Na mocy <button onClick={() => openGallery('wyrok_badi')} className="text-[#00f0ff] font-bold hover:bg-[#00f0ff] hover:text-black transition-colors px-1 uppercase text-xs border border-[#00f0ff]">WYROKU</button> z dnia 2 listopada 2021 roku Bartosz Badowski został uznany winnym popełnienia „zbrodni niedozwolonej produkcji i innego obchodzenia się ze środkami odurzającymi”.
            </p>
            
            <p>
              Sąd ustalił, że:
            </p>

            <CaseFile title="WERDYKT: Ustalenia wyroku">
              „co najmniej od bliżej nieustalonej daty w 2015 roku do 26.08.2020 [...] oferował, organizował i co najmniej w 441 przypadkach zrealizował w nieregularnych odstępach czterodniowe i dziesięciodniowe pobyty [...] ukierunkowane na tzw. duchowe ćwiczenia spirytualne”
              <br/><br/>
              „udostępnił uczestnikom do użycia bliżej nieustaloną ilość substancji psychotropowych, a mianowicie tzw. ayahuascę zawierającą dimetylotryptaminę (DMT) oraz tzw. marihuanę zawierającą tetrahydrokannabinol (THC)”
              <br/><br/>
              „przechowywał łącznie 1902,79 grama materiału roślinnego (...), który zawierał łącznie 37,24 grama substancji czynnej dimetylotryptaminy (DMT) oraz 92,29 grama tzw. narkotyku marihuany”.
            </CaseFile>

            <p>
              Podczas, gdy Jarosław Kordys został skazany na 8,5 roku pozbawienia wolności Bartosz Badowski, którego sprawa dotyczyła tego samego procederu, tych samych substancji, regionu i czasu trwania działalności, dzięki ugodzie i współpracy z wymiarem sprawiedliwości, zakończył sprawę wyrokiem w zawieszeniu.
            </p>

            <h2 className="text-3xl mt-16 mb-8 text-[#fcee0a] border-b-4 border-[#fcee0a] inline-block pr-10">04 // Cisza po burzy</h2>

            <p>
              Choć Badowski zaprzestał prowadzenia działalności szamańskiej, posiadłość w Janovie nie opustoszała – zamieszkali z nim wspomniani wcześniej Krzysztof Stefanek i Magdalena Drzewińska. Ich obecność u boku „Badiego” w tamtym czasie rzuca cień na ich późniejszą rolę; nie byli to wszakże niewinni obserwatorzy, lecz ludzie, którzy mimo tego, że sami byli obecni podczas policyjnego nalotu, pozostali lojalni wobec byłego szamana.
            </p>

            <p>
              Będąc tak blisko Badowskiego, doskonale znali mroczną tajemnicę śmierci Ilony. Ich decyzja o zamieszkaniu z człowiekiem, który w obliczu tragedii martwił się  o „ciągłość dostaw”, dowodzi, że w pełni akceptowali reguły zmowy milczenia.
            </p>

            <h2 className="text-3xl mt-16 mb-8 text-[#fcee0a] border-b-4 border-[#fcee0a] inline-block pr-10">05 // Kiciński</h2>

            <p>
              W cieniu tych wyroków pozostaje wciąż niewyjaśniona rola cichego wspólnika. Michał Kiciński to nie jest postać, która o ayahuasce jedynie „słyszała” – on stał się jej nieoficjalnym ambasadorem w polskich mediach głównego nurtu. W licznych wywiadach (m.in. dla „Focusa”, „Newsweeka”) z niezwykłą precyzją opisuje on mechanizmy działania psychodelików. Kiciński publicznie opowiada o lekcjach pokory, jakie dała mu „medycyna”, o spotkaniach z szamanami i o tym, jak napar z dżungli otwiera „nową rzeczywistość”.
            </p>

            <PullQuote 
              quote="Po ayahuasce jest szansa na to, żeby sobie nie ściemniać."
              author="Michał Kiciński"
              source="Newsweek, 30.05.2016"
            />

            <h2 className="text-3xl mt-16 mb-8 text-[#fcee0a] border-b-4 border-[#fcee0a] inline-block pr-10">06 // „Błąd z Badim”</h2>

            <p>
               Michała Kiciński wiedział o Ilonie.  Jego konfrontacja z organami ścigania nabrała formalnego kształtu dopiero jesienią 2023 roku. 21 września 2023 roku miliarder osobiście odebrał wezwanie do stawiennictwa w charakterze świadka w sprawie o sygnaturze WD-I-3186/23. Miało się ono odbyć 18.10.2023. Na wezwaniu czytelnie było napisane, że przesłuchanie będzie dotyczyć „pobytu w Janowie”.
            </p>

            <div className="my-10 flex flex-col items-center p-4 bg-[#111] border border-[#333]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={`${OLD_EVIDENCE_URL}/wezwanie/wezwanie_kicinski.png`} 
                alt="Wezwanie na policję"
                className="w-48 grayscale contrast-125 hover:grayscale-0 transition-all duration-300 border border-[#fcee0a] cursor-pointer"
                onClick={() => openGallery('wezwanie_kicinski')}
              />
              <p className="text-[10px] text-[#fcee0a] mt-3 font-mono uppercase tracking-widest flex items-center gap-2">
                <Eye className="w-3 h-3" /> Zobacz Skan
              </p>
            </div>

            <p>
              Reakcja miliardera na zainteresowanie organów ścigania była błyskawiczna. Zwrócił się bezpośrednio do autora zawiadomienia – wysyłając mu wiadomość mailową z propozycją swoistej pokuty. Zamiast wyjaśnień prokuratorskich zaoferował przelew na cel charytatywny, nazywając lata nielegalnego procederu młodzieńczą naiwnością.
            </p>

            <CaseFile title="WIADOMOŚĆ PRYWATNA: Kiciński" type="email">
              „(...) Tak mogę zapłacić za swój błąd z Badim. Podaj mi Fundacje lub Stowarzyszenie (najlepiej powiązaną z hospicjum lub domami dziecka, bo tu widzę morze potrzeb i dużo cierpienia) i wpłacę tam dobrowolnie kwotę darowizny, w ramach Przeprosin wszechświatowi, za moją młodzieńczą naiwność i brak przenikliwości. Fundacja / Stowarzyszenie musi być uznana i z tradycjami, a nie jakaś organizacja krzak. Wyślę Ci potwierdzenie przelewu. (...)”
            </CaseFile>

            <p>
              Do przesłuchania doszło tydzień przed terminem wskazanym na wezwaniu – 11 października 2023 roku o godzinie 15:00 w Komendzie Rejonowej Policji Warszawa II. W protokole Kiciński przyjmuje linię opartą na braku świadomości co do charakteru działalności prowadzonej w jego posiadłości.
            </p>

            <CaseFile title="PROTOKÓŁ: Zeznanie">
              „Nie mam żadnej wiedzy co się działo na mojej farmie, w której jestem 90% udziałowcem (...) wynajmowałem tę nieruchomość.”
            </CaseFile>

            <p>
              Gdy w toku czynności padło kluczowe pytanie o jego własny udział w ceremoniach ayahuaski w Janovie, odpowiedź była lakoniczna:
            </p>

            <CaseFile title="PROTOKÓŁ: Odpowiedź">
              „nie brałem udziału w takich ceremoniach w latach 2016-2023, a o wcześniejszym okresie odmawiam odpowiedzi”
            </CaseFile>

            <h2 className="text-3xl mt-16 mb-8 text-[#fcee0a] border-b-4 border-[#fcee0a] inline-block pr-10">07 // Anonimowy filantrop</h2>

            <p>
              W listopadzie 2025 roku na kanale YouTube „Osada Natury Zew” pojawia się nagrany rok wcześniej film, w którym obecny gospodarz, Krzysztof Stefanek, snuje opowieść o powstaniu „Osady”. W sielskiej scenerii, z uśmiechem na ustach, buduje narrację o cudownym zbiegu okoliczności i tajemniczym dobroczyńcy.
            </p>

            <p>
              Stefanek wspomina, jak wspólnie z grupą przyjaciół pomagał uporządkować sprawy własnościowe, by obiekt „znalazł się w jednych rękach”. Kluczowy moment tej opowieści Stefanek datuje z niezwykłą precyzją:
            </p>

            <CaseFile title="LOG: K. Stefanek">
              „Ostatecznie 23 października 2023 roku ten człowiek do nas zadzwonił powiedział, że wspólnie z żoną zdecydowali, że oni by chcieli to miejsce przekazać w darowiźnie”
            </CaseFile>

            <p>
              Stefanek przedstawia to jako efekt „researchu” darczyńcy, który rzekomo urzekła wizja działalności non-profit.
            </p>

            <div className="my-12 border border-[#fcee0a] p-1 bg-[#fcee0a]/10">
                 <ArticleVideoPlayer 
                src={`${PINATA_GATEWAY}/${VIDEO_CID}/YTDowncom_YouTube_Media_4Xujw-krjxs_001_1080p-1.m3u8`} 
                poster=""
              />
               <div className="mt-2 text-[10px] text-[#fcee0a] font-mono flex items-center gap-2">
                 <Video className="w-3 h-3" />
                 {/* FIX: Escaped quotes below: "DAROWIZNA" -> &quot;DAROWIZNA&quot; */}
                 <span className="uppercase tracking-widest">NAGRANIE: &quot;DAROWIZNA&quot; (2025)</span>
               </div>
            </div>

            <p>
              Jednak kalendarz wydarzeń prawnych burzy ten romantyczny mit, ujawniając nerwowy pośpiech w pozbywaniu się „gorącego kartofla”:
            </p>

            <ul className="list-none space-y-6 my-10 font-mono text-sm border-l border-[#333] pl-6 relative">
              <li className="flex items-start gap-4 group">
                <div className="absolute -left-[5px] mt-1 w-2 h-2 bg-[#333] group-hover:bg-[#00f0ff] transition-colors"></div>
                <div className="text-gray-500 w-32 shrink-0 pt-1 group-hover:text-[#00f0ff] transition-colors">21.09.2023</div>
                <div className="text-gray-300">
                  <strong className="text-white block mb-1">Wezwanie</strong>
                  Michał Kiciński odbiera wezwanie na przesłuchanie w sprawie Janova.
                </div>
              </li>
              
              <li className="flex items-start gap-4 group">
                <div className="absolute -left-[5px] mt-1 w-2 h-2 bg-[#333] group-hover:bg-[#00f0ff] transition-colors"></div>
                <div className="text-gray-500 w-32 shrink-0 pt-1 group-hover:text-[#00f0ff] transition-colors">03.10.2023</div>
                <div className="text-gray-300">
                  <strong className="text-white block mb-1">Konsolidacja</strong>
                  Na tydzień przed wizytą na komendzie odkupuje od Bartosza Badowskiego jego 10% udziałów. Musi stać się jedynym właścicielem.
                </div>
              </li>

              <li className="flex items-start gap-4 group">
                <div className="absolute -left-[5px] mt-1 w-2 h-2 bg-[#333] group-hover:bg-[#00f0ff] transition-colors"></div>
                <div className="text-gray-500 w-32 shrink-0 pt-1 group-hover:text-[#00f0ff] transition-colors">11.10.2023</div>
                <div className="text-gray-300">
                  <strong className="text-white block mb-1">Przesłuchanie</strong>
                   Miliarder staje przed policją. Odmawia zeznań na temat przeszłości.
                </div>
              </li>
               
              <li className="flex items-start gap-4 group">
                <div className="absolute -left-[5px] mt-1 w-2 h-2 bg-[#fcee0a] animate-pulse"></div>
                <div className="text-[#fcee0a] font-bold w-32 shrink-0 pt-1">23.10.2023</div>
                <div className="border border-[#fcee0a] bg-[#fcee0a]/10 p-3 text-white w-full">
                  <strong className="text-[#fcee0a] block mb-1 uppercase tracking-widest">ALERT: Telefon</strong>
                  Zaledwie 12 dni po kłopotliwym przesłuchaniu następuje telefon do Stefanka z propozycją oddania majątku wartego miliony za darmo.
                </div>
              </li>

              <li className="flex items-start gap-4 group">
                <div className="absolute -left-[5px] mt-1 w-2 h-2 bg-[#333] group-hover:bg-[#00f0ff] transition-colors"></div>
                <div className="text-gray-500 w-32 shrink-0 pt-1 group-hover:text-[#00f0ff] transition-colors">21.12.2023</div>
                <div className="text-gray-300">
                  <strong className="text-white block mb-1">Transfer</strong>
                  Kiciński formalnie przekazuje Janov w formie darowizny fasadowej organizacji „krzak”.
                </div>
              </li>
            </ul>

            <p>
              Cynizm tej sytuacji pogłębia fakt, że obdarowani nie byli przypadkowymi entuzjastami ekologii. Krzysztof Stefanek, który w filmie mówi o „odwróconej logice” i pięknie wolontariatu, i jego konkubina Magdalena Drzewińska w rzeczywistości doskonale znali mroczną historię Janova i tajemnicę śmierci Ilony. Przyjmując darowiznę, przejmowali nie tylko ziemię, ale i milczenie.
            </p>

            <TransactionStamp 
              label="TRANSAKCJA KATRAST (HASH)" 
              value="V-5821/2023-127" 
              subDetails="OBRĘB: Janov u Krnova [656976]"
            />

            <p>
              Ostatecznie strategia okazała się skuteczna. Śledztwo umorzono zanim się zaczęło, a majątek, który mógł podlegać przepadkowi jako narzędzie przestępstwa, został bezpiecznie zaparkowany w „stowarzyszeniu”. Kiciński pozostał anonimowym „filantropem”, a Stefanek – opiekunem nowej, „czystej” osady.
            </p>

            <p>
              Na tragedii świadomie wzbogacili się ludzie, dla których tuszowanie prawdy stało się fundamentem ich nowej, intratnej rzeczywistości. Pod szyldem organizacji non-profit, żyją teraz z organizacji turnusów wypoczynkowych z cennikiem darowizn zamiast paragonów, okłamując swoich gości i publicznie każdego, kto natrafi na ich sielankowe filmiki.  „Zadośćuczynienie wszechświatowi” miało  trafić na hospicjum, a nie na „organizację krzak”. Autor wycofanego zawiadomienia nie był zadowolony.
            </p>
             
            <h2 className="text-3xl mt-16 mb-8 text-[#fcee0a] border-b-4 border-[#fcee0a] inline-block pr-10">08 // Nýdek</h2>

            <p>
              Gdyby sprawa dotyczyła tylko jednego miliardera, można by mówić o przypadku lub pechowym doborze najemców. Jednak nieco dalej od Janova, w miejscowości <strong>Nýdek</strong>, funkcjonowało <button onClick={() => openGallery('nydek')} className="text-[#00f0ff] font-bold hover:bg-[#00f0ff] hover:text-black transition-colors px-1 uppercase text-xs border border-[#00f0ff]">LOKACJA: NÝDEK</button>.
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

             <ul className="list-none space-y-6 my-10 font-mono text-sm border-l border-[#333] pl-6 relative">
              <li className="flex items-start gap-4 group">
                <div className="absolute -left-[5px] mt-1 w-2 h-2 bg-[#fcee0a] animate-pulse"></div>
                <div className="text-[#fcee0a] font-bold w-32 shrink-0 pt-1">15.10.2020</div>
                <div className="text-gray-300">
                  <strong className="text-white block mb-1">RAJD POLICYJNY</strong>
                  Szturm na ośrodek Kordysów. W środowisku wybucha panika.
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="absolute -left-[5px] mt-1 w-2 h-2 bg-[#333] group-hover:bg-[#00f0ff] transition-colors"></div>
                <div className="text-gray-500 w-32 shrink-0 pt-1 group-hover:text-[#00f0ff] transition-colors">15.06.2021</div>
                <div className="text-gray-300">
                  <strong className="text-white block mb-1">SPRZEDAŻ</strong>
                  Marcin Iwiński sprzedaje nieruchomości w Nýdku.
                </div>
              </li>
             </ul>

            <p>
              Nabywcą luksusowej posiadłości nie został inny inwestor, lecz sam Piotr Bonawentura Tracz – ten sam człowiek, który wcześniej pełnił tam rolę szamana.
            </p>

            <TransactionStamp 
              label="TRANSAKCJA KATASTR (HASH)" 
              value="V-2937/2021-832" 
              subDetails="OBRĘB: Nýdek [708186]"
            />

            <p>
              Transakcja ta rodzi wątpliwości: w jaki sposób niszowy szaman sfinansował zakup luksusowej willi od jednego z najbogatszych Polaków? Nowy właściciel niemal natychmiast zmienił formalny profil działalności na legalne warsztaty pracy z ciałem. Zbieżność tej sekwencji zdarzeń z „darowizną” Kicińskiego w Janovie pozwala dostrzec powtarzalny schemat wycofywania się właścicieli z infrastruktury powiązanej z nielegalnym procederem.
            </p>

            <h2 className="text-3xl mt-16 mb-8 text-[#fcee0a] border-b-4 border-[#fcee0a] inline-block pr-10">09 // Sprawiedliwość na sprzedaż?</h2>

            <p>
              Historia Hermanovic, Janova i Nýdka to opowieść o dwóch równoległych światach. W jednym – za kraty czeskich więzień – trafiają szamani, których nazwiska stają się synonimem skandalu. W drugim – na szczytach list Forbesa – trwają ludzie, którzy tę infrastrukturę sfinansowali.
            </p>

            <p>
              Choć miliony płynące z cyfrowej rozrywki pozwoliły na budowę azylów w czeskich górach, nie zdołały kupić spokoju sumienia wobec śmierci, która przecięła ten psychodeliczny biznes. Dziś, gdy posiadłości zmieniają właścicieli w blasku darowizn i pospiesznych transakcji, pozostaje pytanie: czy sprawiedliwość, podobnie jak ayahuaskowe wizje, jest tylko iluzją i kwestią zasobności portfela?
            </p>

            {/* WIZYTÓWKA AUTORA: TERMINAL */}
            <div className="mt-12 flex justify-end">
               <div className="text-right border border-[#333] p-4 bg-black">
                  <span className="block text-xs text-gray-500 uppercase tracking-widest mb-1">Connection established with:</span>
                  <span className="block text-[#fcee0a] font-bold text-xl uppercase tracking-tighter">Marlow</span>
                  <a href="mailto:marlow.contact@proton.me" className="text-xs text-[#00f0ff] hover:underline block mt-1">marlow.contact@proton.me</a>
               </div>
            </div>

          </div>

          {/* STOPKA ŹRÓDŁOWA - DATA BANK STYLE */}
          <footer className="mt-20 pt-8 border-t border-[#333] font-mono">
              
             {/* NAGŁÓWEK SEKCJ */}
             <div className="mb-8">
               <h3 className="text-lg font-bold text-white uppercase tracking-widest flex items-center gap-2 mb-4">
                 <Cpu className="w-5 h-5 text-[#fcee0a]" /> DATA_BANK // SOURCES
               </h3>
               <p className="text-xs text-gray-500 uppercase tracking-wide">
                 Poniższe dane zostały zweryfikowane kryptograficznie. Dostęp publiczny.
               </p>
             </div>
             
             {/* KOMPAKTOWA SIATKA Z DOKUMENTAMI */}
             <div className="grid gap-4 text-xs">
               
               {/* 1. WYROK KORDYSA */}
               <div className="p-4 bg-[#050505] border border-[#222] hover:border-[#fcee0a] transition-colors group">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <div>
                      <h4 className="font-bold text-gray-300 uppercase group-hover:text-[#fcee0a] transition-colors">Wyrok: Jarosław Kordys</h4>
                      <p className="text-gray-600 font-mono mt-1">ID: 30 T 5/2020</p>
                    </div>
                    <a href={KORDYS_PDF_URL} target="_blank" rel="noopener noreferrer" className="text-[#00f0ff] hover:text-white uppercase font-bold text-[10px] flex items-center gap-1 border border-[#00f0ff] px-2 py-1 hover:bg-[#00f0ff] hover:text-black transition-all">
                      <Download className="w-3 h-3" /> POBIERZ
                    </a>
                  </div>
               </div>

               {/* 2. WYROK BADOWSKIEGO */}
               <div className="p-4 bg-[#050505] border border-[#222] hover:border-[#fcee0a] transition-colors group">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <div>
                      <h4 className="font-bold text-gray-300 uppercase group-hover:text-[#fcee0a] transition-colors">Wyrok: Bartosz Badowski</h4>
                      <p className="text-gray-600 font-mono mt-1">ID: 66 T 146/2021</p>
                    </div>
                    <a href={BADI_PDF_URL} target="_blank" rel="noopener noreferrer" className="text-[#00f0ff] hover:text-white uppercase font-bold text-[10px] flex items-center gap-1 border border-[#00f0ff] px-2 py-1 hover:bg-[#00f0ff] hover:text-black transition-all">
                      <Download className="w-3 h-3" /> POBIERZ
                    </a>
                  </div>
               </div>

               {/* 3. LINKI ZEWNETRZNE */}
               <div className="p-4 bg-[#050505] border border-[#222] hover:border-[#fcee0a] transition-colors group">
                   <h4 className="font-bold text-gray-300 uppercase mb-3 group-hover:text-[#fcee0a] transition-colors">Bazy Danych (Public)</h4>
                   <div className="space-y-2">
                       <a href="https://nahlizenidokn.cuzk.cz" target="_blank" className="block text-gray-500 hover:text-[#00f0ff] transition-colors flex justify-between">
                           <span>KATASTR NEMOVITOSTI</span>
                           <ExternalLink className="w-3 h-3" />
                       </a>
                        <a href="https://web.archive.org/web/*/tribunydek.com" target="_blank" className="block text-gray-500 hover:text-[#00f0ff] transition-colors flex justify-between">
                           <span>WAYBACK MACHINE (TRIBUNYDEK)</span>
                           <History className="w-3 h-3" />
                       </a>
                   </div>
               </div>

             </div>

             {/* SEKCJA WEB3 */}
             <div className="mt-16 text-center border-t border-[#333] pt-6">
                <p className="text-[10px] text-gray-600 font-mono uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#fcee0a]" />
                  IPFS / ETHEREUM NETWORK SECURED
                </p>
                <a 
                  href="https://kutasinskigate.eth.limo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black transition-all px-2 py-1"
                >
                  kutasinskigate.eth.limo
                </a>
             </div>
          </footer>
        </article>

        <EvidenceAudioModal isOpen={isAudioOpen} onClose={() => setIsAudioOpen(false)} src="/evidence/stefan-nagranie.mp3" />
        <GalleryModal isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} data={galleryData} />
      </main>
    </PasswordProtect>
  );
}
