"use client";

import React, { useState } from 'react';
import { Scale, FileText, Search, User, Mail, MapPin, Calendar, Globe, X, Stamp, Video, Info, ShieldCheck, History, ExternalLink, Download, PenTool, Home as HouseIcon, Terminal, AlertTriangle, Radio, Database, Cpu } from 'lucide-react';
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
  images: [`${OLD_EVIDENCE_URL}/wezwanie/wezwanie_kicinski.png`],
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

// --- KOMPONENTY UI (CYBERPUNK STYLE) ---

const CaseFile = ({ title, children, type = 'evidence' }: { title: string, children: React.ReactNode, type?: 'evidence' | 'transcript' | 'email' }) => (
  <div className="my-8 border border-cyan-900/50 bg-[#0a0a0a] shadow-[0_0_15px_rgba(8,145,178,0.1)] rounded-sm overflow-hidden break-inside-avoid relative group">
    {/* Scanline effect overlay */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_4px,3px_100%]"></div>
    
    <div className="bg-cyan-950/30 border-b border-cyan-800/50 px-4 py-2 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            {type === 'email' ? <Mail className="w-4 h-4" /> : type === 'transcript' ? <Radio className="w-4 h-4 animate-pulse" /> : <FileText className="w-4 h-4" />}
            <span>DECRYPTED_DATA::{title}</span>
        </div>
        <div className="flex gap-1">
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-cyan-900 rounded-full"></div>
        </div>
    </div>
    <div className="p-6 font-mono text-sm md:text-base leading-relaxed text-slate-300 relative z-10 border-l-2 border-cyan-500/20">
      {children}
    </div>
  </div>
);

const LegalNote = ({ term, children }: { term: string, children: React.ReactNode }) => (
  <div className="my-10 flex gap-4 p-5 bg-yellow-900/10 border-l border-r border-yellow-500/50 relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-1">
        <AlertTriangle className="w-20 h-20 text-yellow-500/5 -rotate-12" />
    </div>
    <Scale className="w-6 h-6 text-yellow-500 shrink-0 mt-1 relative z-10" />
    <div className="relative z-10">
      <strong className="block font-mono text-yellow-500 text-lg mb-2 tracking-wider">SYSTEM_NOTICE: {term}</strong>
      <div className="text-stone-400 text-sm leading-relaxed font-mono">{children}</div>
    </div>
  </div>
);

const PullQuote = ({ quote, author, source }: { quote: string, author: string, source: string }) => (
  <div className="my-10 pl-6 border-l-4 border-fuchsia-600 bg-gradient-to-r from-fuchsia-900/10 to-transparent p-4">
    <p className="font-mono text-xl md:text-2xl text-fuchsia-100 leading-relaxed mb-3 italic tracking-tight shadow-black drop-shadow-md">
      „{quote}”
    </p>
    <div className="font-mono text-[10px] uppercase tracking-widest text-fuchsia-400/70">
      — <span className="font-bold text-fuchsia-400">{author}</span>, {source}
    </div>
  </div>
);

const LocationStamp = ({ name, code, plot, lv, onClick }: { name: string, code: string, plot: string, lv: string, onClick?: () => void }) => (
  <div className="my-8 flex justify-start">
    <button 
      onClick={onClick}
      className="relative group border border-emerald-500/30 bg-[#050505] p-1 pr-6 rounded-sm flex items-center gap-4 hover:border-emerald-400 transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] text-left overflow-hidden"
    >
       <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-emerald-500/50 opacity-50 group-hover:opacity-100 transition-opacity"></div>
       <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-emerald-500/50 opacity-50 group-hover:opacity-100 transition-opacity"></div>
       
       <div className="bg-emerald-950/20 h-full p-3 flex items-center justify-center border-r border-emerald-500/20">
          <MapPin className="w-5 h-5 text-emerald-400 group-hover:animate-bounce" />
       </div>
       <div className="py-2">
          <div className="text-[9px] uppercase tracking-[0.2em] text-emerald-600 font-bold mb-1 flex items-center gap-2 group-hover:text-emerald-400 transition-colors">
            TARGET_LOC: {name} <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="font-mono text-base font-bold text-emerald-100">LV {lv}</div>
          <div className="text-[10px] text-emerald-500/70 font-mono mt-1">
            SECTOR: {plot} <span className="text-emerald-800 mx-1">|</span> CODE: {code}
          </div>
       </div>
    </button>
  </div>
);

const TransactionStamp = ({ label, value, subDetails }: { label: string, value: string, subDetails?: string }) => (
  <div className="my-8 flex justify-start">
    <div className="relative border border-orange-500/30 bg-[#050505] p-1 pr-6 rounded-sm flex items-center gap-4 hover:border-orange-400 transition-colors">
       <div className="bg-orange-950/20 h-full p-3 flex items-center justify-center border-r border-orange-500/20">
          <Stamp className="w-5 h-5 text-orange-500" />
       </div>
       <div className="py-2">
          <div className="text-[9px] uppercase tracking-[0.2em] text-orange-600 font-bold mb-1">{label}</div>
          <div className="font-mono text-base font-bold text-orange-100">{value}</div>
          {subDetails && <div className="text-[10px] text-orange-500/70 font-mono mt-1">{subDetails}</div>}
       </div>
    </div>
  </div>
);

const EvidenceAudioModal = ({ src, isOpen, onClose }: { src: string, isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-4 transition-all duration-300">
      <div onClick={(e) => e.stopPropagation()} className="bg-black shadow-[0_0_50px_rgba(220,38,38,0.2)] rounded-sm w-full max-w-sm relative overflow-hidden animate-[fadeIn_0.3s_ease-out] border border-red-900/50">
        <div className="h-0.5 w-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>
        <div className="p-6 relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="flex h-2 w-2 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span></span>
                <span className="text-[10px] font-mono text-red-500 uppercase tracking-[0.2em] animate-pulse">REC_ACTIVE</span>
              </div>
              <h3 className="text-red-50 font-mono text-lg tracking-wide">EVIDENCE #A-23</h3>
            </div>
            <button onClick={onClose} className="text-red-800 hover:text-red-500 transition-colors"><X className="w-6 h-6" /></button>
          </div>
          
          {/* Visualizer placeholder */}
          <div className="flex items-end justify-center gap-1 h-12 mb-6 opacity-70">
             {[...Array(20)].map((_, i) => (
                 <div key={i} className="w-1 bg-red-600/80 animate-[bounce_1s_infinite]" style={{height: `${Math.random() * 100}%`, animationDelay: `${i * 0.05}s`}}></div>
             ))}
          </div>

          <div className="bg-red-950/20 border border-red-900/30 rounded p-2">
            <audio controls className="w-full h-8 accent-red-600 mix-blend-screen opacity-90">
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
      <main className="min-h-screen bg-black text-slate-300 selection:bg-cyan-500/30 selection:text-cyan-100 font-mono flex flex-col relative overflow-x-hidden">
        
        {/* CRT SCANLINE BACKGROUND */}
        <div className="fixed inset-0 pointer-events-none z-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20"></div>
        <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>

        {/* HEADER */}
        <header className="pt-20 pb-8 px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 border border-red-600/50 bg-red-950/20 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-red-500 animate-pulse">
              <AlertTriangle className="w-3 h-3" />
              Investigation In Progress
            </div>
            
            <h1 className="mb-8">
              <span className="block text-5xl md:text-7xl font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                ELIXIR_WIEDZMINA
              </span>
              <span className="block text-xl md:text-2xl text-cyan-700 font-medium mt-4 max-w-3xl mx-auto uppercase tracking-widest">
                [ Mroczna tajemnica CD Projekt ]
              </span>
            </h1>

            <div className="max-w-2xl mx-auto border-y border-cyan-900/30 py-8 px-4 bg-[#080808]/50 backdrop-blur-sm">
              <p className="text-lg md:text-xl text-slate-400 leading-relaxed font-mono">
                <span className="text-cyan-500 font-bold">&gt;</span> Ayahuasca, policyjne naloty i tragedia, o której nikt się miał nie dowiedzieć. 
                <br/><span className="text-cyan-500 font-bold">&gt;</span> Śledztwo ujawnia, jak twórcy "Wiedźmina" finansowali szamańskie podziemie.
              </p>
            </div>
          </div>
        </header>

        <article className="max-w-2xl mx-auto px-4 py-8 flex-grow relative z-10">
          
          {/* KONFIGURACJA STYLÓW TEKSTU I LINKÓW */}
          <div className="prose prose-invert prose-lg max-w-none 
            prose-headings:font-mono prose-headings:font-bold prose-headings:text-cyan-100
            prose-p:text-slate-400 prose-p:font-mono
            prose-strong:text-cyan-400 prose-strong:font-bold
            prose-a:text-fuchsia-400 prose-a:no-underline prose-a:border-b prose-a:border-fuchsia-800 prose-a:transition-all hover:prose-a:bg-fuchsia-900/20 hover:prose-a:text-fuchsia-200">
            
            <p className="first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-cyan-500 leading-relaxed">
              W 2020 roku media obiegły doniesienia o rozbiciu grupy polskich szamanów w czeskich Hermanovicach. Policyjny nalot, aresztowanie Jarosława i Karoliny Kordysów, a następnie surowe wyroki – 8,5 oraz 5,5 roku więzienia.
            </p>

            <p>
              Ayahuaska to tradycyjny wywar z amazońskich roślin o silnym działaniu halucynogennym. Ze względu na wysoką zawartość <span className="text-fuchsia-400">DMT</span> – substancji psychodelicznej wywołującej intensywne wizje.
            </p>

            <p>
              Kurtyna opadła, temat ucichł. Ale czy to na pewno koniec tej historii? W cieniu tego głośnego procesu toczył się drugi – cichy i błyskawiczny. Analiza logów sądowych prowadzi do zdumiewających wniosków.
            </p>

            <p>
              W przygranicznym Janovie funkcjonował drugi, bliźniaczy ayahuaskowy hub, którego współwłaścicielem okazał się miliarder – <strong>Michał Kiciński</strong>.
            </p>

            <h2 className="text-3xl mt-16 mb-8 tracking-widest uppercase border-b border-cyan-900/50 pb-2 flex items-center gap-2"><User className="text-cyan-500" /> Świadek B.</h2>

            <p>
              W obszernym uzasadnieniu <button onClick={() => openGallery('wyrok_kordys')} title="Zobacz skan wyroku" className="font-bold text-fuchsia-400 border-b border-fuchsia-800 hover:bg-fuchsia-900/20 transition-colors">wyroku</button> Jarosława Kordysa pojawia się postać świadka Bartosza B.
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
              „(...) wymieniony był sprawdzany w związku z występkiem niedozwolonej produkcji i innego obchodzenia się ze środkami odurzającymi (...) albowiem miał w roku 2014 zlecić przesłanie na swój adres przesyłki pocztowej przechwyconej na lotnisku w Lipsku RFN zawierającej 4,5 kg DMT...”
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
              W Czechach księgi wieczyste są jawne. Wystarczy przeszukać <button onClick={() => openGallery('janov')} className="font-bold text-fuchsia-400 border-b border-fuchsia-800 hover:bg-fuchsia-900/20 transition-colors">bazę danych</button> i pobrać historię działki.
            </p>
            
            <LocationStamp 
              name="JANOV U KRNOVA" 
              code="656976" 
              plot="st. 281" 
              lv="127" 
              onClick={() => openGallery('janov')}
            />

            <div className="my-10 p-6 bg-cyan-900/10 border border-cyan-500/30 text-cyan-100 font-mono relative">
              <div className="absolute -top-3 left-4 bg-black px-2 text-xs text-cyan-500 border border-cyan-500/30">ANALIZA DANYCH</div>
              <button onClick={() => openGallery('janov')} className="font-bold text-fuchsia-400 border-b border-fuchsia-800 hover:bg-fuchsia-900/20 transition-colors">Pobrany dokument</button> nie pozostawia wątpliwości: w latach 2012–2023 współwłaścicielami nieruchomości byli:
              
              <div className="mt-6 flex flex-col items-start gap-4 not-italic pl-4 border-l border-cyan-500/20">
                  <div className="flex flex-col gap-3 font-mono text-sm">
                      <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-500 shadow-[0_0_10px_blue]"></div>
                          <span className="text-slate-300">Bartosz Badowski <span className="text-blue-400 font-bold">[10%]</span></span>
                      </div>
                       <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-red-500 shadow-[0_0_10px_red]"></div>
                          <span className="text-red-400 font-bold tracking-wider">MICHAŁ DAWID KICIŃSKI [90%]</span>
                      </div>
                  </div>
              </div>
            </div>

            <p>
              Drugie imię – Dawid – idealnie wypełnia lukę w zanonimizowanym skrócie „Michal D. K.”. Wspólnikiem szamana był twórca „Wiedźmina”.
            </p>

            <h2 className="text-3xl mt-16 mb-8 tracking-widest uppercase border-b border-cyan-900/50 pb-2 flex items-center gap-2"><Radio className="text-cyan-500" /> Na podsłuchu</h2>

            <p>
              Przełom nastąpił dzięki policyjnej technice operacyjnej. Telefon Kordysa był na stałym podsłuchu. 24.08.2020 r. doszło do nerwowej wymiany zdań.
            </p>

            <p>
              Kordys zadzwonił do Badowskiego. Bał się, że tragedia, o której huczało w kuluarach, może zniszczyć ich imperium. Rekonstrukcja zdarzeń:
            </p>

            <CaseFile title="Rekonstrukcja rozmowy (Logi Sądowe)" type="transcript">
              „oskarżony J. K. omawia z B., że dotarła do niego informacja, że w obiekcie w Janovie zmarła jakaś kobieta”.
            </CaseFile>

            <p>
              W rozmowie pojawia się wątek szantażysty. Kordys pyta wprost:
            </p>

            <CaseFile title="Pytanie Kordysa" type="transcript">
              „W jakim zagrożeniu jest nasza praca?”
            </CaseFile>

            <p>
              Odpowiedź w aktach nie pozostawia złudzeń:
            </p>

            <div className="my-8 pl-6 border-l-2 border-red-600 font-mono text-lg text-red-400 bg-red-950/10 p-4">
              „Z ich rozmowy wynika, że nie zajmowali się w zasadzie samym faktem śmierci, lecz raczej obawą, aby to nie przyciągnęło uwagi policji.”
            </div>

            <p>
              Dla sądu był to dowód na to, że śmierć człowieka była dla nich jedynie „błędem w systemie”.
            </p>

            <p>
              Cynizm tej konwersacji sięga zenitu chwilę później. Gdy tylko ustalili strategię uciszenia plotek, wrócili do logistyki dostaw narkotyku.
            </p>

            <CaseFile title="Kontynuacja rozmowy" type="transcript">
              „Następnie w rozmowie omawiają zamówienia «herbaty» z dżungli i to, czy im tego «nie zepsują», ekscytując się nagraniem od dostawcy...”
            </CaseFile>

            <p>
              Zaledwie dwa dni po tym telefonie, 26.08.2020 czescy policjanci weszli do posiadłości w Janovie.
            </p>

            <CaseFile title="Protokół rewizji">
              „w nieruchomości zabezpieczono rzeczy... oprócz marihuany zabezpieczono również substancje zawierające DMT o objętości ok. 2 kg”.
            </CaseFile>

            <p>
              Zidentyfikowano 15 obywateli Polski. Wśród nich, stali bywalcy – <strong>Krzysztof Stefanek</strong> i <strong>Lena Drzewińska</strong>.
            </p>

            <h2 className="text-3xl mt-16 mb-8 tracking-widest uppercase border-b border-cyan-900/50 pb-2 flex items-center gap-2"><ShieldCheck className="text-cyan-500" /> Cena wolności</h2>

            <p>
              15 października 2020 roku jednostka antyterrorystyczna wdarła się do budynku Kordysów.
            </p>

            <div className="my-12 border border-cyan-900 bg-black shadow-[0_0_20px_rgba(8,145,178,0.2)]">
               <div className="bg-cyan-950/50 text-cyan-400 text-xs px-2 py-1 font-mono flex justify-between">
                   <span>CAM_01_REC</span>
                   <span className="animate-pulse text-red-500">LIVE</span>
               </div>
               <ArticleVideoPlayer 
                 src={`${PINATA_GATEWAY}/${ARREST_VIDEO_CID}/videoplayback.m3u8`} 
                 poster=""
               />
               <div className="mt-1 text-xs text-cyan-600 font-mono p-2 border-t border-cyan-900">
                  METADATA: Nalot Hermanovice (15.10.2020)
               </div>
            </div>

            <p>
              Co wydarzyło się w ciągu tych niespełna dwóch miesięcy?
            </p>

            <LegalNote term="Dohoda o vině a trestu">
              Ugoda o winie i karze. Czeska procedura karna pozwalająca oskarżonemu na dobrowolne poddanie się karze w zamian za łagodniejszy wyrok.
            </LegalNote>

            <p>
              Bartosz "Badi" Badowski, wspólnik Kicińskiego, wybrał strategię, która miała uchronić go przed systemem. Postanowił „wykupić” swoją wolność.
            </p>

            <p>
               Na mocy <button onClick={() => openGallery('wyrok_badi')} className="font-bold text-fuchsia-400 border-b border-fuchsia-800 hover:bg-fuchsia-900/20 transition-colors">wyroku</button> z dnia 2 listopada 2021 roku Bartosz Badowski został uznany winnym.
            </p>
            
            <p>
              Sąd ustalił, że:
            </p>

            <CaseFile title="Ustalenia wyroku skazującego Bartosza B.">
              „...oferował, organizował i co najmniej w 441 przypadkach zrealizował w nieregularnych odstępach czterodniowe i dziesięciodniowe pobyty...”
              <br/><br/>
              „udostępnił uczestnikom do użycia bliżej nieustaloną ilość substancji psychotropowych...”
              <br/><br/>
              „przechowywał łącznie 1902,79 grama materiału roślinnego (...), który zawierał łącznie 37,24 grama substancji czynnej dimetylotryptaminy (DMT)”.
            </CaseFile>

            <p>
              Badowski zakończył sprawę wyrokiem w zawieszeniu.
            </p>

            <h2 className="text-3xl mt-16 mb-8 tracking-widest uppercase border-b border-cyan-900/50 pb-2 flex items-center gap-2"><Terminal className="text-cyan-500" /> Kiciński</h2>

            <p>
              Michał Kiciński to nie jest postać, która o ayahuasce jedynie „słyszała” – on stał się jej nieoficjalnym ambasadorem w mediach.
            </p>

            <PullQuote 
              quote="Po ayahuasce jest szansa na to, żeby sobie nie ściemniać."
              author="Michał Kiciński"
              source="Newsweek, 30 maja 2016 r."
            />

            <h2 className="text-3xl mt-16 mb-8 tracking-widest uppercase border-b border-cyan-900/50 pb-2">„Błąd z Badim”</h2>

            <p>
               21 września 2023 roku miliarder odebrał wezwanie do stawiennictwa w charakterze świadka. Sygnatura: WD-I-3186/23.
            </p>

            <div className="my-8 flex flex-col items-center group">
              <div className="relative border-2 border-cyan-500/20 p-1 bg-cyan-950/20 rounded cursor-pointer hover:border-cyan-400 transition-all">
                  <div className="absolute top-0 right-0 p-1 bg-cyan-500 text-black text-[10px] font-bold">SCAN</div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={`${OLD_EVIDENCE_URL}/wezwanie/wezwanie_kicinski.png`} 
                    alt="Wezwanie na policję"
                    className="w-48 opacity-80 group-hover:opacity-100 hover:grayscale-0 grayscale transition-all duration-500"
                    onClick={() => openGallery('wezwanie_kicinski')}
                  />
              </div>
              <p className="text-xs text-cyan-600 mt-2 font-mono uppercase tracking-wider text-center">
                [KLIKNIJ ABY POWIĘKSZYĆ]
              </p>
            </div>

            <p>
              Kiciński zwrócił się do autora zawiadomienia z propozycją „pokuty”.
            </p>

            <CaseFile title="Wiadomość prywatna od M. Kicińskiego" type="email">
              „(...) Tak mogę zapłacić za swój błąd z Badim. Podaj mi Fundacje lub Stowarzyszenie (...) i wpłacę tam dobrowolnie kwotę darowizny, w ramach Przeprosin wszechświatowi...”
            </CaseFile>

            <p>
              W protokole Kiciński przyjmuje linię obrony opartą na braku świadomości.
            </p>

            <CaseFile title="Zeznanie do protokołu">
              „Nie mam żadnej wiedzy co się działo na mojej farmie, w której jestem 90% udziałowcem (...) wynajmowałem tę nieruchomość.”
            </CaseFile>

            <h2 className="text-3xl mt-16 mb-8 tracking-widest uppercase border-b border-cyan-900/50 pb-2">Anonimowy filantrop</h2>

            <p>
              W listopadzie 2025 roku na kanale YouTube „Osada Natury Zew” pojawia się film. Krzysztof Stefanek snuje opowieść o tajemniczym dobroczyńcy.
            </p>

            <CaseFile title="Wypowiedź K. Stefanka">
              „Ostatecznie 23 października 2023 roku ten człowiek do nas zadzwonił powiedział, że wspólnie z żoną zdecydowali, że oni by chcieli to miejsce przekazać w darowiźnie”
            </CaseFile>

            <div className="my-12 border border-cyan-900 bg-black shadow-[0_0_20px_rgba(8,145,178,0.2)]">
               <ArticleVideoPlayer 
                src={`${PINATA_GATEWAY}/${VIDEO_CID}/YTDowncom_YouTube_Media_4Xujw-krjxs_001_1080p-1.m3u8`} 
                poster=""
              />
               <div className="mt-1 text-xs text-cyan-600 font-mono p-2 border-t border-cyan-900">
                  METADATA: Statement K. Stefanek (2025)
               </div>
            </div>

            <p>
              Kalendarz wydarzeń prawnych burzy ten mit.
            </p>

            <ul className="list-none space-y-4 my-8 font-mono text-sm border-l-2 border-cyan-800 pl-4">
              <li className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-cyan-500 shrink-0" />
                <div>
                  <strong className="text-cyan-400">21.09.2023</strong> – Kiciński odbiera wezwanie.
                </div>
              </li>
              <li className="flex items-center justify-center text-cyan-900">
                &darr;
              </li>
              <li className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-cyan-500 shrink-0" />
                <div>
                  <strong className="text-cyan-400">03.10.2023</strong> – Odkupuje od Badowskiego 10% udziałów.
                </div>
              </li>
              <li className="flex items-center justify-center text-cyan-900">
                &darr;
              </li>
              <li className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-cyan-500 shrink-0" />
                <div>
                  <strong className="text-cyan-400">11.10.2023</strong> – Przesłuchanie na policji.
                </div>
              </li>
               <li className="flex items-center justify-center text-cyan-900">
                &darr;
              </li>
               
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-3" />
                <div className="bg-red-950/30 border border-red-500/50 p-4 rounded-sm shadow-[0_0_15px_rgba(220,38,38,0.2)] w-full">
                  <span className="font-bold text-red-400">23.10.2023</span> – Zaledwie 12 dni po przesłuchaniu następuje telefon z propozycją oddania majątku wartego miliony.
                </div>
              </li>

              <li className="flex items-center justify-center text-cyan-900">
                &darr;
              </li>
              <li className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-cyan-500 shrink-0" />
                <div>
                  <strong className="text-cyan-400">21.12.2023</strong> – Finał operacji. Kiciński formalnie przekazuje Janov.
                </div>
              </li>
            </ul>

            <TransactionStamp 
              label="TRANSACTION_ID" 
              value="V-5821/2023-127" 
              subDetails="SECTOR: Janov u Krnova [656976]"
            />

            <h2 className="text-3xl mt-16 mb-8 tracking-widest uppercase border-b border-cyan-900/50 pb-2">Nýdek</h2>

            <p>
              Nieco dalej od Janova, w miejscowości <strong>Nýdek</strong>, funkcjonował <button onClick={() => openGallery('nydek')} className="font-bold text-fuchsia-400 border-b border-fuchsia-800 hover:bg-fuchsia-900/20 transition-colors">kolejny ośrodek</button>.
            </p>

            <p>
              Analiza czeskich baz danych: Właścicielem tej kolejnej szamańskiej świątyni był drugi z duetu miliarderów CD Projekt, Marcin Iwiński.
            </p>
            <LocationStamp 
              name="NÝDEK" 
              code="708186" 
              plot="st. 506/1" 
              lv="832" 
              onClick={() => openGallery('nydek')}
            />

            <p>
              Kiedy 15.10.2020 aresztowano Kordysa, 15.06.2021 Iwiński sprzedaje nieruchomości w Nýdku. Nabywcą został Piotr Bonawentura Tracz – miejscowy szaman.
            </p>

            <TransactionStamp 
              label="TRANSACTION_ID" 
              value="V-2937/2021-832" 
              subDetails="SECTOR: Nýdek [708186]"
            />

            <h2 className="text-3xl mt-16 mb-8 tracking-widest uppercase border-b border-cyan-900/50 pb-2">Sprawiedliwość na sprzedaż?</h2>

            <p>
              Historia Hermanovic, Janova i Nýdka to opowieść o dwóch równoległych systemach. W jednym – za kraty trafiają płotki. W drugim – na szczytach list Forbesa – trwają architekci systemu.
            </p>

            <div className="mt-8 flex justify-end">
               <div className="text-right border-r-2 border-cyan-500 pr-4">
                  <span className="block font-bold text-cyan-400">MARLOW</span>
                  <a href="mailto:marlow.contact@proton.me" className="text-sm text-slate-500 no-underline hover:text-cyan-300 transition-colors">marlow.contact@proton.me</a>
               </div>
            </div>

          </div>

          {/* STOPKA ŹRÓDŁOWA */}
          <footer className="mt-12 pt-8 border-t border-cyan-900/50 font-mono relative">
              <div className="absolute top-0 left-0 w-20 h-1 bg-cyan-500"></div>
              
             {/* NAGŁÓWEK SEKCJ */}
             <div className="mb-8">
               <h3 className="text-xl font-bold text-cyan-500 uppercase tracking-widest flex items-center gap-2 mb-4">
                 <Database className="w-5 h-5" /> SOURCE_FILES
               </h3>
               <p className="text-xs text-slate-500 text-left">
                 ACCESS LEVEL: PUBLIC. VERIFICATION HASH: VALID.
               </p>
             </div>
             
             {/* KOMPAKTOWA SIATKA Z DOKUMENTAMI */}
             <div className="grid gap-4 text-sm text-slate-400">
               
               {/* 1. WYROK KORDYSA */}
               <div className="p-3 bg-cyan-950/10 border border-cyan-900/50 hover:border-cyan-500 transition-colors shadow-sm group">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2">
                    <div>
                      <h4 className="font-bold text-cyan-100 text-sm leading-tight group-hover:text-cyan-400 transition-colors">Wyrok Jarosława Kordysa</h4>
                      <p className="font-mono text-[10px] text-cyan-700 mt-1">REF: 30 T 5/2020</p>
                    </div>
                    <a
                      href={KORDYS_PDF_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 bg-cyan-900/30 text-cyan-400 px-3 py-1 text-xs font-bold rounded border border-cyan-700 hover:bg-cyan-800 transition-colors flex items-center gap-2"
                    >
                      <FileText className="w-3 h-3" /> DOWNLOAD
                    </a>
                  </div>
               </div>

               {/* 2. WYROK BADOWSKIEGO */}
               <div className="p-3 bg-cyan-950/10 border border-cyan-900/50 hover:border-cyan-500 transition-colors shadow-sm group">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2">
                    <div>
                      <h4 className="font-bold text-cyan-100 text-sm leading-tight group-hover:text-cyan-400 transition-colors">Wyrok Bartosza Badowskiego</h4>
                      <p className="font-mono text-[10px] text-cyan-700 mt-1">REF: 66 T 146/2021</p>
                    </div>
                    <a 
                      href={BADI_PDF_URL} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="shrink-0 bg-cyan-900/30 text-cyan-400 px-3 py-1 text-xs font-bold rounded border border-cyan-700 hover:bg-cyan-800 transition-colors flex items-center gap-2"
                    >
                      <FileText className="w-3 h-3" /> DOWNLOAD
                    </a>
                  </div>
               </div>

               {/* 3. KSIĘGI WIECZYSTE */}
               <div className="p-3 bg-cyan-950/10 border border-cyan-900/50 hover:border-cyan-500 transition-colors shadow-sm">
                  <div className="flex flex-col justify-between gap-4 mb-2">
                    <h4 className="font-bold text-cyan-100 text-sm leading-tight flex items-center gap-2"><Cpu className="w-3 h-3" /> PROPERTY_LOGS</h4>
                    
                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-cyan-900/30 pb-2 last:border-0">
                          <div className="text-[10px] text-slate-500">
                              <span className="font-bold block text-slate-300">Historia własności: Janov (LV 127)</span>
                              <span className="font-mono text-cyan-700">FULL DUMP</span>
                          </div>
                          <a href="#" className="cursor-pointer shrink-0 text-cyan-500 px-2 py-1 text-[10px] font-bold border border-cyan-900 hover:bg-cyan-900/50 transition-colors flex items-center gap-1">
                              <Download className="w-3 h-3" /> GET
                          </a>
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-cyan-900/30 pb-2 last:border-0">
                          <div className="text-[10px] text-slate-500">
                              <span className="font-bold block text-slate-300">Historia własności: Nýdek (LV 832)</span>
                              <span className="font-mono text-cyan-700">FULL DUMP</span>
                          </div>
                          <a href="#" className="cursor-pointer shrink-0 text-cyan-500 px-2 py-1 text-[10px] font-bold border border-cyan-900 hover:bg-cyan-900/50 transition-colors flex items-center gap-1">
                              <Download className="w-3 h-3" /> GET
                          </a>
                      </div>
                    </div>
                  </div>
               </div>

             </div>

             {/* SEKCJA WEB3 */}
             <div className="mt-16 text-center border-t border-dashed border-slate-800 pt-6">
                <p className="text-xs text-slate-600 font-mono uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  IMMUTABLE STORAGE (WEB3)
                </p>
                <a 
                  href="https://kutasinskigate.eth.limo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-emerald-500 hover:text-emerald-400 transition-colors tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.3)]"
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
