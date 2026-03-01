"use client";

import React, { useEffect, useRef, useState, useCallback, createContext, useContext } from 'react';

import {
  Scale, FileText, Search, Mail, Stamp, X,
  Home as HouseIcon, ExternalLink, ChevronLeft, ChevronRight, Download, Globe, Calendar, History, ShieldCheck,
  Newspaper
} from 'lucide-react';
import Hls from 'hls.js';

// --- DATA ---
export type GalleryData = {
  title: string;
  images: string[];
  signature?: string;
  pdfUrl?: string;
  type?: 'verdict' | 'gallery';
};

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
const MUNAY_WAYBACK_URL = "https://web.archive.org/web/20230607033503/https://munaysonqo.com/retreats/";

const VIDEO_ARREST_METADATA = {
  name: "Nalot policji na ośrodek ayahuaski w Hermanovicach",
  description: "Pełna dokumentacja policyjnej interwencji i aresztowania grupy organizującej nielegalne ceremonie ayahuaski. Materiał dowodowy w sprawie Jarosława Kordysa.",
  thumbnailUrl: `${JANOV_IMAGES_URL}/janov01.jpg`,
  contentUrl: `${PINATA_GATEWAY}/${ARREST_VIDEO_CID}/videoplayback.m3u8`,
  uploadDate: "2020-10-15T09:00:00+01:00",
};

const VIDEO_STEFANEK_METADATA = {
  name: "Wyznania Krzysztofa Stefanka o przejęciu Janówa",
  description: "Relacja z pierwszej ręki dotycząca darowizny nieruchomości w Janowie od Michała Kicińskiego dla Stowarzyszenia Natury Zew.",
  thumbnailUrl: `${JANOV_IMAGES_URL}/janov02.jpg`,
  contentUrl: `${PINATA_GATEWAY}/${VIDEO_CID}/YTDowncom_YouTube_Media_4Xujw-krjxs_001_1080p-1.m3u8`,
  uploadDate: "2024-11-01T12:00:00+01:00",
};

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
  title: "Dokumentacja Nieruchomości: Janów",
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

// --- COMPONENTS ---

const BrandHeader = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    const formattedDate = now.toLocaleDateString('pl-PL', options).toUpperCase();
    setCurrentDate(formattedDate);
  }, []);

  return (
    <div className="w-full pb-2 mb-0">
      <div className="flex items-center justify-center w-full gap-4 pb-2">
        <div className="flex-grow h-[3px] bg-stone-900 hidden sm:block"></div>
        <h1 className="text-5xl md:text-[6.5rem] font-black tracking-tighter text-stone-900 uppercase font-serif leading-none whitespace-nowrap">
          NASZA GAZETKA
        </h1>
        <div className="flex-grow h-[3px] bg-stone-900 hidden sm:block"></div>
      </div>

      <div
        className="border-y border-stone-900 py-1 flex items-center justify-between text-[10px] md:text-sm font-bold uppercase tracking-[0.1em] text-stone-800"
        style={{
          marginLeft: 'calc(50% - 50vw)',
          width: '100vw',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
        }}
      >
        <div className="flex items-center gap-2">
          <Newspaper className="w-4 h-4 md:w-5 md:h-5" />
          <span className="hidden sm:inline">Niezależne Media</span>
        </div>

        <div className="text-center">
          {currentDate || "NIEDZIELA, 1 MARCA 2026"}
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline">Serwis Śledczy</span>
          <FileText className="w-4 h-4 md:w-5 md:h-5" />
          <span className="hidden md:inline border-l border-stone-900 pl-2 ml-1">ROK XXV, NR 10</span>
        </div>
      </div>
    </div>
  );
};

const CaseFile = ({ title, children, type = 'evidence' }: { title: string, children: React.ReactNode, type?: 'evidence' | 'transcript' | 'email' }) => (
  <div className="my-8 border border-stone-400 bg-white/60 rounded-sm overflow-hidden break-inside-avoid text-left">
    <div className="bg-stone-200 border-b border-stone-300 px-4 py-2 flex items-center gap-2 text-xs font-mono text-stone-600 uppercase tracking-wider">
      {type === 'email' ? <Mail className="w-4 h-4" /> : type === 'transcript' ? <Search className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
      <span>{title}</span>
    </div>
    <div className="p-6 font-mono text-sm md:text-base leading-relaxed text-stone-900 bg-[url('https://www.transparenttextures.com/patterns/subtle-paper.png')] italic">
      {children}
    </div>
  </div>
);

const PullQuote = ({ quote, author, source }: { quote: string, author: string, source: string }) => (
  <div className="my-10 pl-6 border-l-[3px] border-stone-800/80 text-left">
    <p className="font-serif text-xl md:text-2xl italic text-stone-900 leading-relaxed mb-3">
      „{quote}"
    </p>
    <div className="font-sans text-[10px] uppercase tracking-widest text-stone-500">
      — <span className="font-bold text-stone-800">{author}</span>, {source}
    </div>
  </div>
);

const LocationStampUI = ({ name, code, plot, lv }: { name: string, code: string, plot: string, lv: string }) => (
  <div className="relative border border-stone-400 bg-white/80 p-1 pr-6 rounded-sm flex items-center gap-4 transition-colors text-left group">
     <div className="absolute top-1 right-1 text-stone-400 group-hover:text-stone-600 transition-colors">
       <Search className="w-3 h-3" />
     </div>
     <div className="bg-stone-200 h-full p-3 flex items-center justify-center border-r border-stone-300 border-dashed transition-colors">
        <HouseIcon className="w-5 h-5 text-stone-500" />
     </div>
     <div className="py-2">
        <div className="text-[9px] uppercase tracking-[0.2em] text-stone-500 font-bold mb-1 flex items-center gap-2">
          {name}
        </div>
        <div className="font-mono text-base font-bold text-stone-900">LV {lv}</div>
        <div className="text-[10px] text-stone-600 font-mono mt-1">
          Działka: {plot} <span className="text-stone-400 mx-1">|</span> Obręb: {code}
        </div>
     </div>
  </div>
);

const TransactionStampUI = ({ label, value, subDetails }: { label: string, value: string, subDetails?: string }) => (
  <div className="relative border border-stone-400 bg-white/80 p-1 pr-6 rounded-sm flex items-center gap-4 group hover:border-stone-500 transition-colors cursor-default text-left">
     <div className="absolute top-1 right-1 text-stone-400 group-hover:text-stone-600 transition-colors">
       <Search className="w-3 h-3" />
     </div>
     <div className="bg-stone-200 h-full p-3 flex items-center justify-center border-r border-stone-300 border-dashed">
        <Stamp className="w-5 h-5 text-stone-500" />
     </div>
     <div className="py-2">
        <div className="text-[9px] uppercase tracking-[0.2em] text-stone-500 font-bold mb-1">{label}</div>
        <div className="font-mono text-base font-bold text-stone-900">{value}</div>
        {subDetails && <div className="text-[10px] text-stone-600 font-mono mt-1">{subDetails}</div>}
     </div>
  </div>
);

const ArticleVideoPlayer: React.FC<{ src: string; poster: string }> = ({ src, poster }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src;
      }
    }
  }, [src]);
  return (
    <div className="my-12 w-full bg-black rounded-sm overflow-hidden">
      <video ref={videoRef} controls poster={poster} className="w-full h-auto block opacity-95" />
    </div>
  );
};

const GalleryModal: React.FC<{ isOpen: boolean; onClose: () => void; data: GalleryData | null }> = ({ isOpen, onClose, data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, data]);
  const handleNext = useCallback(() => {
    if (!data) return;
    setCurrentIndex((prev) => (prev + 1) % data.images.length);
  }, [data]);
  const handlePrev = useCallback(() => {
    if (!data) return;
    setCurrentIndex((prev) => (prev - 1 + data.images.length) % data.images.length);
  }, [data]);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (data?.type !== 'verdict') {
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrev, data]);
  if (!isOpen || !data) return null;
  const isVerdict = data.type === 'verdict';
  return (
    <div className={`fixed inset-0 z-[100] flex flex-col ${isVerdict ? 'bg-stone-900/95' : 'bg-black'} backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]`}>
      <div className="flex items-center justify-between px-4 py-3 bg-black/40 border-b border-white/10 z-50 shrink-0">
        <div className="text-white text-left">
          <h3 className="font-bold text-sm md:text-base leading-tight">{data.title}</h3>
          <p className="font-mono text-[10px] text-stone-400 mt-1 uppercase tracking-wider">
             {isVerdict ? `Dokument: ${data.images.length} stron` : `Zdjęcie ${currentIndex + 1} / ${data.images.length}`}
             {data.signature && <span className="mx-2 text-stone-600">|</span>}
             {data.signature}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {data.pdfUrl && (
             <a href={data.pdfUrl} target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-stone-800 text-stone-200 text-xs font-bold uppercase tracking-wider hover:bg-stone-700 transition-colors rounded-sm border border-white/10">
               <Download className="w-3 h-3" /> PDF
             </a>
          )}
          <button onClick={onClose} className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden relative w-full h-full">
        {isVerdict ? (
          <div className="w-full h-full overflow-y-auto p-4 md:p-8 flex justify-center bg-[#1a1a1a]">
            <div className="flex flex-col gap-4 max-w-4xl w-full">
               {data.images.map((img, idx) => (
                 <div key={idx} className="relative group">
                   <img src={img} alt={`Strona ${idx + 1}`} className="w-full h-auto border border-stone-700" loading="lazy" />
                   <div className="absolute top-2 right-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded font-mono">#{idx + 1}</div>
                 </div>
               ))}
               <div className="text-center py-8 text-stone-500 font-mono text-xs">--- KONIEC DOKUMENTU ---</div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center p-2 md:p-10 relative">
            <button onClick={(e) => { e.stopPropagation(); handlePrev(); }} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-20">
              <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
            </button>
            <div className="relative w-full h-full flex items-center justify-center">
              <img src={data.images[currentIndex]} alt={`Zdjęcie ${currentIndex + 1}`} className="max-w-full max-h-full object-contain" />
            </div>
            <button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-20">
              <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

type ModalContextType = {
  openGallery: (type: 'nydek' | 'wyrok_kordys' | 'wyrok_badi' | 'wezwanie_kicinski' | 'janov') => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const useElixirModals = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useElixirModals must be used within ElixirModalsProvider');
  return context;
};

const ElixirModalsProvider = ({ children }: { children: React.ReactNode }) => {
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
    <ModalContext.Provider value={{ openGallery }}>
      {children}
      <GalleryModal isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} data={galleryData} />
    </ModalContext.Provider>
  );
};

const GalleryTrigger = ({ type, children, className }: { type: 'nydek' | 'wyrok_kordys' | 'wyrok_badi' | 'wezwanie_kicinski' | 'janov', children: React.ReactNode, className?: string }) => {
  const { openGallery } = useElixirModals();
  return (
    <button onClick={() => openGallery(type)} className={className}>
      {children}
    </button>
  );
};

export default function ElixirWitcherPage() {
  return (
    <ElixirModalsProvider>
      <main className="min-h-screen bg-[#f4f1ea] text-stone-900 font-serif selection:bg-stone-300 selection:text-stone-900 p-4 md:p-8 lg:p-12 overflow-x-hidden">
        <div className="max-w-5xl mx-auto">
          <BrandHeader />

          <div className="border-x border-stone-900 px-4 md:px-12 py-8 md:py-16 bg-white/30">
            <header className="mb-16 text-center">
              <div className="flex flex-col items-center">
                <img src="/detektyw-polutek-logo.png" alt="Logo" className="w-24 h-24 object-contain grayscale contrast-200 mix-blend-multiply mb-1" />
                <h2 className="text-stone-900 w-full mb-1">
                  <span className="block text-4xl md:text-[5.5rem] font-bold leading-none tracking-tight uppercase">
                    Eliksir Wiedźmina
                  </span>
                  <span className="block text-sm md:text-2xl text-stone-800 italic font-medium uppercase tracking-widest mt-1 whitespace-nowrap">
                    Mroczna tajemnica twórców CD Projekt
                  </span>
                </h2>
                <div className="max-w-3xl mx-auto px-4 mt-0">
                  <p className="text-base md:text-xl text-stone-800 leading-snug italic font-serif">
                    Ayahuasca, policyjne naloty i tragedia, o której nie miał się nikt dowiedzieć. Publicznie dostępne akta i rejestry ujawniają, jak twórcy gry „Wiedźmin" finansowali szamańskie podziemie.
                  </p>
                </div>
              </div>
            </header>

            <article className="prose prose-stone max-w-none prose-p:leading-relaxed prose-p:text-lg prose-p:mb-8">
              <p className="first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-stone-900">
                W przygranicznym Janowie funkcjonował drugi, bliźniaczy ayahuaskowy ośrodek, którego współwłaścicielem okazał się miliarder – <strong>Michał Kiciński</strong>.
              </p>

              <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-400 pb-2">Świadek B.</h2>
              <p>
                W obszernym i publicznie dostępnym uzasadnieniu <GalleryTrigger type="wyrok_kordys" className="font-bold text-stone-900 underline decoration-double decoration-stone-500 hover:bg-stone-200 transition-colors">wyroku</GalleryTrigger> Jarosława Kordysa pojawia się postać świadka Bartosza B.
              </p>
              <p> Zgodnie z aktami: </p>
              <CaseFile title="Zeznania świadka B.">
                &quot;Świadek B. odnośnie osoby oskarżonego [Jarosława Kordysa] oświadczył, że zna się z nim ok. 8 lat, a poznali się w Holandii&quot;. <br/><br/>
                &quot;Świadek B. potwierdził, że i on sam w przeszłości prowadził warsztaty&quot;, a obecnie sam &quot;jest przedmiotem dochodzenia policji w Krnowie właśnie z powodu ceremonii&quot;.
              </CaseFile>

              <p> Akta ujawniają również skalę zarzutów wobec Bartosza B.: </p>
              <CaseFile title="Zarzuty wobec Bartosza B.">
                &quot;(...) wymieniony był sprawdzany w związku z występkiem niedozwolonej produkcji i innego obchodzenia się ze środkami odurzającymi (...) albowiem miał w roku 2014 zlecić przesłanie na swój adres przesyłki pocztowej przechwyconej na lotnisku w Lipsku RFN zawierającej 4,5 kg DMT, a 6.6.2018 miało dojść do zatrzymania przesyłki pocztowej we Frankfurcie nad Menem RFN zawierającej...&quot;
              </CaseFile>

              <PullQuote
                quote="oskarżony omawia z B., że dotarła do niego informacja, że w obiekcie w Janowie zmarła jakaś kobieta."
                author="Sąd Okręgowy w Ostrawie"
                source="Sygnatura 30 T 5/2021"
              />

              <p>
                Bartosz Badowski wyraźnie zaniepokojony wieściami, które do niego dotarły. Bał się, że tragedia, o której huczało w kuluarach, może zniszczyć ich imperium. Sąd w uzasadnieniu wyroku precyzyjnie rekonstruuje ten moment:
              </p>
              <CaseFile title="Rekonstrukcja rozmowy (Uzasadnienie Sądu)" type="transcript">
                &quot;oskarżony [Jarosława Kordysa] omawia z&nbsp;B., że dotarła do niego informacja, że w obiekcie w Janowie <span className="underline decoration-red-700 decoration-4 underline-offset-4">zmarła jakaś kobieta</span>&quot;.
              </CaseFile>

              <p>
                W rozmowie pojawia się też wątek zagrożenia ze strony osoby trzeciej – mężczyźni omawiają szantażystę, który chce iść na policję. Kordys wprost pyta wspólnika:
              </p>
              <CaseFile title="Pytanie Kordysa" type="transcript">
                &quot;W jakim zagrożeniu jest nasza praca?&quot;
              </CaseFile>

              <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-400 pb-2">Cena wolności</h2>
              <p>
                Kiedy 26 sierpnia 2020 roku czeska policja weszła do posiadłości w Janowie, należącej do Bartosza Badowskiego i miliardera Michała Kicińskiego, Jarosław Kordys w Hermanovicach wciąż czuł się bezpiecznie. Nie wiedział jeszcze, że zegar zaczął odliczać czas do jego własnej katastrofy. Zaledwie 7 tygodni po cichym nalocie na Badowskiego policja zapukała do Kordysów.
              </p>
              <ArticleVideoPlayer src={VIDEO_ARREST_METADATA.contentUrl} poster={VIDEO_ARREST_METADATA.thumbnailUrl} />
              <p>
                15 października 2020 roku sielankę w ich ośrodku przerwał huk granatów ogłuszających. Czeska jednostka antyterrorystyczna nie bawiła się w półśrodki: zamaskowani funkcjonariusze z długą bronią wdarli się do budynku, rzucając na ziemię przyszłych bohaterów głośnego skandalu.
              </p>

              <CaseFile title="Ustalenia wyroku skazującego Bartosza B.">
                &quot;co najmniej od bliżej nieustalanej daty w 2015 roku do 26.08.2020 [...] oferował, organizował i co najmniej w 441 przypadkach zrealizował w nieregularnych odstępach czterodniowe i dziesięciodniowe pobyty [...] ukierunkowane na tzw. duchowe ćwiczenia spirytualne&quot; <br/><br/>
                &quot;udostępnił uczestnikom do użycia bliżej nieustaloną ilość substancji psychotropowych, a mianowicie tzw. ayahuascę zawierającą dimetylotryptaminę (DMT) oraz tzw. marihuanę zawierającą tetrahydrokannabinol (THC)&quot; <br/><br/>
                &quot;przechowywał łącznie 1902,79 grama materiału roślinnego (...)&quot;
              </CaseFile>

              <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-400 pb-2">&quot;Błąd z Badim&quot;</h2>
              <p>
                Michał Kiciński wiedział o Ilonie. Jego konfrontacja z organami ścigania nabrała formalnego kształtu dopiero jesienią 2023 roku. 21 września 2023 roku miliarder osobiście odebrał wezwanie do stawiennictwa w charakterze świadka w sprawie o sygnaturze WD-I-3186/23. Miało się ono odbyć 18.10.2023. Na wezwaniu czytelnie było napisane, że przesłuchanie będzie dotyczyć &quot;pobytu w Janowie&quot;.
              </p>
              <div className="my-12 flex flex-col items-center">
                <GalleryTrigger type="wezwanie_kicinski">
                  <img src={`${KORDYS_IMAGES_URL}/wezwanie/wezwanie_kicinski.png`} alt="Wezwanie na policję" className="w-48 rounded border border-stone-400 cursor-pointer hover:opacity-90 transition-opacity shadow-lg" />
                </GalleryTrigger>
                <span className="mt-2 text-[10px] text-stone-500 uppercase tracking-widest font-bold">Dowód nr 14: Wezwanie dla M. Kicińskiego</span>
              </div>

              <p>
                Fakt, że Kiciński w momencie przesłuchania zarządzał legalnym biznesem ayahuaskowym w Ameryce Południowej, stawia pod znakiem zapytania jego deklarowaną nieświadomość co do profilu działalności w Janowie.
              </p>

              <CaseFile title="Fragment korespondencji B. Badowskiego" type="email">
                &quot;Przelewy wysyłałem z mojego konta ING, które mam do tej pory [...]. Tytuł „wynajem&quot;. (...) Dopóki zarabiałem - dzieliłem się z nim zyskiem.(...) Michał wiedział dokładnie co się dzieje na farmie i czerpał z tego zyski przez wiele wiele lat. (...) Rozważam też wizytę na Policji w Czechach - ja poniosłem prawne konsekwencje za prowadzenie ceremonii, ale Kici...&quot;
              </CaseFile>

              <div className="my-16 bg-stone-100 p-8 border border-stone-300 rounded-sm">
                <h3 className="font-bold text-xl mb-6 uppercase tracking-tight flex items-center gap-2">
                  <Calendar className="w-6 h-6" /> Ostatnie dni w Janowie
                </h3>
                <ul className="space-y-6 list-none p-0 m-0">
                  <li className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-stone-500 shrink-0" />
                    <div>
                      <strong>21 września 2023 r.</strong> – Michał Kiciński odbiera wezwanie na przesłuchanie w sprawie Janowa.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-stone-500 shrink-0" />
                    <div>
                      <strong>3 października 2023 r.</strong> – Na tydzień przed wizytą na komendzie odkupuje od Bartosza Badowskiego jego 10% udziałów w nieruchomości. Aby pozbyć się całego ośrodka jednym podpisem, musi najpierw stać się jego jedynym właścicielem.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-stone-500 shrink-0" />
                    <div>
                      <strong>11 października 2023 r.</strong> – Miliarder staje przed policją. Do protokołu odmawia zeznań na temat swojej przeszłości w tym miejscu.
                    </div>
                  </li>
                </ul>
              </div>

              <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-400 pb-2">Nýdek</h2>
              <p>
                Gdyby sprawa dotyczyła tylko jednego miliardera, można by mówić o przypadku lub pechowym doborze najemców. Jednak nieco dalej od Janowa, w miejscowości <strong>Nýdek</strong>, funkcjonował kolejny, bliźniaczy ośrodek.
              </p>
              <p>
                Relacje świadków wskazują, że w <GalleryTrigger type="nydek" className="font-bold text-stone-900 underline decoration-double decoration-stone-500 hover:bg-stone-200 transition-colors">posiadłości w Nýdku</GalleryTrigger> odbywały się regularne ceremonie o charakterze szamańskim. Co istotne, nieruchomość ta również figurowała w rejestrach jako własność jednego z czołowych menedżerów CD Projekt, dopóki nie została &quot;przekazana&quot; prowadzącemu ją szamanowi.
              </p>

              <div className="my-8 flex justify-start">
                <TransactionStampUI label="Nr Transakcji (Katastr)" value="V-2937/2021-832" subDetails="Obręb: Nýdek [708186]" />
              </div>

              <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-400 pb-2">Wiktor B.</h2>
              <p>
                3 marca 2026 Onet ujawnia opinii publicznej wstrząsające kulisy działalności ośrodka w czeskim Janowie, gdzie podczas szamańskich ceremonii prowadzonych przez Bartosza Badowskiego dochodziło do tragicznych w skutkach zdarzeń. Reportaż śledczy rzuca nowe światło na sprawę tajemniczej śmierci Wiktora B., polskiego przedsiębiorcy, który w 2016 roku brał udział w warsztatach organizowanych w tej posiadłości.
              </p>

              <div className="mt-8 mb-4 flex justify-end">
                <div className="text-right">
                  <span className="block font-bold text-stone-900 uppercase">Detektyw Polutek</span>
                  <span className="block text-xs text-stone-600 font-sans mt-1 italic">detektyw.polutek@protonmail.com</span>
                </div>
              </div>

              <div className="my-12 border-y-[3px] border-stone-900 py-8">
                <h3 className="font-sans font-bold text-lg uppercase tracking-widest text-stone-900 mb-8 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" /> Baza Dowodowa (Full Archive)
                </h3>
                <div className="grid gap-px bg-stone-300 border border-stone-300">
                  <div className="bg-white/80 p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex flex-col">
                      <h4 className="font-bold text-stone-900 text-sm leading-tight uppercase">Pełny Wyrok: <strong>Jarosława Kordysa</strong></h4>
                      <p className="font-mono text-[10px] text-stone-600 mt-1">Sygn. 30 T 5/2020</p>
                    </div>
                    <a href={KORDYS_PDF_URL} target="_blank" rel="noopener noreferrer" className="shrink-0 w-40 justify-center bg-stone-200 text-stone-900 px-3 py-1 text-xs font-bold rounded border border-stone-400 hover:bg-stone-300 transition-colors flex items-center gap-2 underline decoration-double decoration-stone-500" >
                      <FileText className="w-3 h-3" /> Pobierz PDF
                    </a>
                  </div>
                  <div className="bg-white/80 p-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2">
                       <h4 className="font-bold text-stone-900 text-sm leading-tight uppercase">Własność: <strong>Janów</strong></h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <LocationStampUI name="Janov u Krnova" code="Janov [656917]" plot="461/1" lv="127" />
                      <GalleryTrigger type="janov" className="flex items-center gap-2 text-xs font-bold text-stone-700 hover:bg-stone-200 p-2 rounded transition-colors uppercase">
                        <Search className="w-4 h-4" /> Zobacz Księgę Wieczystą
                      </GalleryTrigger>
                    </div>
                  </div>
                </div>
              </div>

              <footer className="mt-16 pt-8 border-t border-stone-400">
                <div className="text-center">
                    <div className="mb-6">
                      <p className="text-[10px] text-stone-500 font-mono uppercase tracking-[0.3em] mb-4">Archiwa Zewnętrzne</p>
                      <div className="flex flex-wrap justify-center gap-6 text-[10px] font-mono uppercase">
                        <a href="https://yellow-elegant-porpoise-917.mypinata.cloud/ipfs/dokumentacja_wiedzmin_gate" className="text-stone-900 font-bold hover:bg-stone-200 underline decoration-stone-500 decoration-double">IPFS: Baza Dowodowa (Full Archive)</a>
                        <a href="https://arweave.net/eliksir-wiedzmina-dokumentacja" className="text-stone-900 font-bold hover:bg-stone-200 underline decoration-stone-500 decoration-double">Arweave: Trwała Archiwizacja</a>
                        <a href="https://github.com/detektyw-polutek/eliksir-mirror" className="text-stone-900 font-bold hover:bg-stone-200 underline decoration-stone-500 decoration-double">GitHub: Source Mirror</a>
                      </div>
                    </div>

                    <p className="text-xs text-stone-700 font-mono uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
                      <Globe className="w-4 h-4" />
                      Oficjalna Witryna
                    </p>
                    <a
                      href="https://www.eliksir-wiedzmina.pl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm font-bold text-stone-900 hover:bg-stone-200 transition-colors underline decoration-double decoration-stone-500"
                    >
                      www.eliksir-wiedzmina.pl
                    </a>
                 </div>
              </footer>
            </article>
          </div>
        </div>
      </main>
    </ElixirModalsProvider>
  );
}
