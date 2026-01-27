"use client";

import React, { useState } from 'react';
import { Scale, FileText, Search, Mail, X, Stamp, Calendar, Globe, History, ExternalLink, Download, Home as HouseIcon, Terminal, AlertTriangle, Eye, Lock } from 'lucide-react';
import PasswordProtect from './components/PasswordProtect';
import { GalleryModal } from '@/components/gallery/GalleryModal';
import ArticleVideoPlayer from '@/components/ArticleVideoPlayer';

// --- KONFIGURACJA IPFS ---
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

// --- GENERATORY STRON ---
const generateKordysPages = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const pageNumber = String(i + 1).padStart(4, '0');
    return `${KORDYS_IMAGES_URL}/30T 5 2021-1_page-${pageNumber}.jpg`;
  });
};

const generateBadiPages = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const pageNumber = String(i + 1).padStart(4, '0');
    return `${BADI_IMAGES_URL}/wyrok_page-${pageNumber}.jpg`;
  });
};

// --- DANE GALERII ---
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

// --- UI COMPONENTS: CYBER-BRUTALISM ---

const Separator = () => (
  <div className="w-full flex items-center gap-2 my-8 opacity-30 select-none">
    <div className="h-px bg-green-500 w-full"></div>
    <div className="text-[10px] font-mono text-green-500 whitespace-nowrap">RESTRICTED DATA</div>
    <div className="h-px bg-green-500 w-full"></div>
  </div>
);

const CaseFile = ({ title, children, type = 'evidence' }: { title: string, children: React.ReactNode, type?: 'evidence' | 'transcript' | 'email' }) => (
  <div className="my-10 font-mono text-sm relative group">
    <div className="absolute -left-2 top-0 bottom-0 w-1 bg-green-900 group-hover:bg-green-500 transition-colors"></div>
    <div className="bg-black border border-green-900/50 p-4">
      <div className="flex items-center gap-3 mb-3 border-b border-green-900/30 pb-2">
        {type === 'email' ? <Mail className="w-4 h-4 text-green-500" /> : 
         type === 'transcript' ? <Terminal className="w-4 h-4 text-green-500" /> : 
         <FileText className="w-4 h-4 text-green-500" />}
        <span className="text-xs text-green-500 uppercase tracking-widest">{title}</span>
      </div>
      <div className="text-gray-300 leading-relaxed pl-2 border-l border-dashed border-gray-800">
        {children}
      </div>
    </div>
  </div>
);

const LegalNote = ({ term, children }: { term: string, children: React.ReactNode }) => (
  <div className="my-12 p-4 border border-yellow-600/50 bg-yellow-950/10 flex gap-4 items-start">
    <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-1" />
    <div>
      <div className="text-yellow-600 text-xs font-bold font-mono uppercase tracking-widest mb-1">Nota Prawna: {term}</div>
      <div className="text-gray-400 text-sm font-sans leading-relaxed">{children}</div>
    </div>
  </div>
);

const PullQuote = ({ quote, author, source }: { quote: string, author: string, source: string }) => (
  <div className="my-16 text-center relative">
    <div className="text-4xl md:text-5xl font-serif text-white leading-tight tracking-tight mb-6">
      &quot;{quote}&quot;
    </div>
    <div className="inline-block border border-gray-700 px-4 py-1">
      <div className="font-mono text-xs text-gray-500 uppercase tracking-widest">
        <span className="text-white font-bold">{author}</span> <span className="text-gray-700 mx-2">|</span> {source}
      </div>
    </div>
  </div>
);

const LocationStamp = ({ name, code, plot, lv, onClick }: { name: string, code: string, plot: string, lv: string, onClick?: () => void }) => (
  <button onClick={onClick} className="w-full my-8 block text-left group">
    <div className="bg-zinc-900 border border-zinc-800 p-4 flex items-center justify-between group-hover:border-white/50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="bg-black p-2 border border-zinc-800">
          <HouseIcon className="w-5 h-5 text-gray-400" />
        </div>
        <div>
          <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Nieruchomość</div>
          <div className="text-lg font-bold text-white tracking-tight">{name}</div>
          <div className="text-xs font-mono text-gray-400 mt-1">LV: {lv} <span className="text-zinc-600">/</span> {code}</div>
        </div>
      </div>
      <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
    </div>
  </button>
);

const TransactionStamp = ({ label, value, subDetails }: { label: string, value: string, subDetails?: string }) => (
  <div className="w-full my-8">
    <div className="bg-black border-l-4 border-gray-700 p-4 pl-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1 flex items-center gap-2">
          <Stamp className="w-3 h-3" /> {label}
        </div>
        <div className="text-xl font-mono text-white">{value}</div>
      </div>
      {subDetails && <div className="text-xs font-mono text-gray-600 border border-gray-800 px-2 py-1">{subDetails}</div>}
    </div>
  </div>
);

const EvidenceAudioModal = ({ src, isOpen, onClose }: { src: string, isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div onClick={(e) => e.stopPropagation()} className="bg-black border border-green-500/50 w-full max-w-md shadow-[0_0_50px_rgba(0,255,0,0.1)]">
        <div className="bg-green-900/20 px-4 py-2 flex justify-between items-center border-b border-green-500/30">
          <span className="text-[10px] font-mono text-green-500 uppercase animate-pulse">● Odsłuch aktywny</span>
          <button onClick={onClose}><X className="w-4 h-4 text-green-500" /></button>
        </div>
        <div className="p-8">
          <div className="text-center mb-8">
            <h3 className="text-white font-mono text-lg mb-2">DOWÓD #A-23</h3>
            <p className="text-gray-500 text-xs uppercase tracking-widest">Rejestrator operacyjny</p>
          </div>
          
          <div className="flex justify-center items-center gap-1 mb-8 h-12">
             {[...Array(20)].map((_, i) => (
                <div key={i} className="w-1 bg-green-500/50" style={{ height: `${Math.random() * 100}%` }}></div>
             ))}
          </div>

          <audio controls className="w-full h-8 accent-green-500 grayscale invert brightness-75">
            <source src={src} type="audio/mpeg" />
          </audio>
        </div>
      </div>
    </div>
  );
};

// --- GŁÓWNA STRONA ---

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
      <main className="min-h-screen bg-[#050505] text-[#d4d4d4] font-sans selection:bg-green-900 selection:text-white pb-20">
        
        {/* TOP SYSTEM BAR */}
        <div className="fixed top-0 left-0 w-full bg-black border-b border-gray-900 z-50 px-4 py-2 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-mono text-gray-500">SECURE_CONNECTION_TLS_1.3</span>
            </div>
            <div className="text-[10px] font-mono text-gray-700 hidden md:block">
                ID: 8829-ACCESS-LEVEL-5
            </div>
        </div>

        <header className="pt-32 pb-16 px-4 max-w-3xl mx-auto text-center border-b border-gray-900">
            <div className="inline-block border border-gray-800 bg-gray-900/50 px-3 py-1 mb-6">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-400">Śledztwo Dziennikarskie</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8 leading-[0.9]">
                Eliksir Wiedźmina
            </h1>
            
            <p className="text-lg md:text-xl text-gray-500 font-serif leading-relaxed max-w-2xl mx-auto">
                Mroczna tajemnica twórców CD Projekt. Ayahuaska, policyjne naloty i tragedia, o której nikt się miał nie dowiedzieć.
            </p>
        </header>

        <article className="max-w-2xl mx-auto px-6 mt-12">
            
            {/* INTRO */}
            <div className="prose prose-invert prose-lg max-w-none prose-p:text-gray-300 prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white prose-strong:text-white prose-a:text-white prose-a:underline prose-a:decoration-gray-600 hover:prose-a:decoration-white transition-all">
                
                <p className="lead text-xl md:text-2xl font-serif text-white mb-10 leading-relaxed border-l-4 border-gray-800 pl-6">
                    W 2020 roku media obiegły doniesienia o rozbiciu grupy polskich szamanów w czeskich Hermanovicach. Policyjny nalot, aresztowanie Jarosława i Karoliny Kordysów, a następnie surowe wyroki – 8,5 oraz 5,5 roku więzienia.
                </p>

                <p>
                    Ayahuaska to tradycyjny wywar z amazońskich roślin o silnym działaniu halucynogennym. Ze względu na wysoką zawartość DMT jej posiadanie i podawanie jest w Polsce i Czechach zabronione. Finałem medialnego spektaklu było ułaskawienie przez czeskiego prezydenta.
                </p>

                <p>
                    Kurtyna opadła, temat ucichł. Ale czy to na pewno koniec tej historii? W cieniu tego głośnego procesu toczył się drugi – cichy i błyskawiczny. Analiza sądowych dokumentów prowadzi do zdumiewających wniosków.
                </p>

                <p>
                    W przygranicznym Janovie funkcjonował drugi, bliźniaczy ayahuaskowy ośrodek, którego współwłaścicielem okazał się miliarder – <strong>Michał Kiciński</strong>.
                </p>

                <Separator />

                <h2 className="text-3xl mt-16 mb-6 flex items-center gap-3">
                    <span className="text-gray-700 text-lg font-mono">01/</span> Świadek B.
                </h2>

                <p>
                    W obszernym i publicznie dostępnym uzasadnieniu <button onClick={() => openGallery('wyrok_kordys')} className="border-b border-gray-500 hover:text-white hover:border-white transition-colors">wyroku</button> Jarosława Kordysa pojawia się postać świadka Bartosza B.
                </p>

                <CaseFile title="Akta Sądowe: Zeznania">
                    „Świadek B. odnośnie osoby oskarżonego [Jarosława Kordysa] oświadczył, że zna się z nim ok. 8 lat, a poznali się w Holandii”.
                    <br/><br/>
                    „Świadek B. potwierdził, że i on sam w przeszłości prowadził warsztaty”, a obecnie sam „jest przedmiotem dochodzenia policji w Krnowie właśnie z powodu ceremonii”.
                </CaseFile>

                <p>
                    Akta ujawniają również skalę zarzutów wobec Bartosza B.:
                </p>

                <CaseFile title="Zarzuty: Bartosz B.">
                    „(...) wymieniony był sprawdzany w związku z występkiem niedozwolonej produkcji i innego obchodzenia się ze środkami odurzającymi (...) albowiem miał w roku 2014 zlecić przesłanie na swój adres przesyłki pocztowej przechwyconej na lotnisku w Lipsku RFN zawierającej 4,5 kg DMT...”
                </CaseFile>

                <p>
                    Intrygujący fragment dotyczy własności „bazy”. Dokumenty stwierdzają:
                </p>

                <CaseFile title="Własność: Janov">
                    „(...) budynek rodzinny w miejscowości Janov (...), który jest częściowo użytkowany do stałego zamieszkania, a częściowo jako komercyjny obiekt noclegowy”
                    <br/><br/>
                    „Świadek [Bartosz B.] potwierdził, że w Janowie jest właścicielem jednej dziesiątej nieruchomości”.
                </CaseFile>

                <p>Do kogo należała reszta? Sąd wskazuje wprost:</p>

                <CaseFile title="Ustalenia Sądu">
                    „...w odniesieniu do nieruchomości będących współwłasnością Bartosza B. i Michala D. K.”.
                </CaseFile>

                <p>
                    W Czechach księgi wieczyste są jawne i dostępne online.
                </p>

                <LocationStamp 
                    name="Janov u Krnova" 
                    code="656976" 
                    plot="st. 281" 
                    lv="127" 
                    onClick={() => openGallery('janov')}
                />

                <p className="font-mono text-sm bg-gray-900/50 p-4 border border-gray-800">
                    <span className="block text-gray-500 text-xs mb-2 uppercase">Właściciele (2012-2023):</span>
                    1. Bartosz Badowski (10%)<br/>
                    2. <span className="bg-white text-black px-1 font-bold">Michał Dawid Kiciński (90%)</span>
                </p>

                <p className="mt-6">
                    Drugie imię – Dawid – idealnie wypełnia lukę w zanonimizowanym skrócie „Michal D. K.”. Wspólnikiem szamana był twórca „Wiedźmina” – jeden z najbogatszych Polaków.
                </p>

                <h2 className="text-3xl mt-16 mb-6 flex items-center gap-3">
                    <span className="text-gray-700 text-lg font-mono">02/</span> Na podsłuchu
                </h2>

                <p>
                    Przełom w sprawie organizatorów ayahuaskowych ceremonii w 2020 roku nastąpił dzięki policyjnej technice operacyjnej. Telefon Kordysa był na stałym podsłuchu.
                </p>
                
                <p>
                    Kordys zadzwonił do Badowskiego wyraźnie zaniepokojony wieściami, które do niego dotarły. Bał się, że tragedia, o której huczało w kuluarach, może zniszczyć ich imperium.
                </p>

                <CaseFile title="Transkrypt: Rekonstrukcja" type="transcript">
                    „oskarżony J. K. omawia z B., że dotarła do niego informacja, że w obiekcie w Janovie zmarła jakaś kobieta”.
                </CaseFile>

                <p>
                     W rozmowie pojawia się też wątek zagrożenia ze strony osoby trzeciej – mężczyźni omawiają szantażystę. Kordys pyta:
                </p>

                <CaseFile title="Transkrypt: Kordys" type="transcript">
                    „W jakim zagrożeniu jest nasza praca?”
                </CaseFile>

                <div className="border-l-4 border-red-700 pl-4 py-2 my-8">
                     <p className="text-white font-serif italic text-xl">
                        „Z ich rozmowy wynika, że nie zajmowali się w zasadzie samym faktem śmierci, lecz raczej obawą, aby to nie przyciągnęło uwagi policji.”
                     </p>
                </div>

                <p>
                    Cynizm tej konwersacji sięga zenitu chwilę później. Gdy tylko ustalili strategię uciszenia plotek, natychmiast przeszli do logistyki dostaw narkotyku.
                </p>

                <CaseFile title="Transkrypt: Kontynuacja" type="transcript">
                    „Następnie w rozmowie omawiają zamówienia «herbaty» z dżungli i to, czy im tego «nie zepsują», ekscytując się nagraniem od dostawcy, który «siedzi w dżungli i gotuje».”
                </CaseFile>

                <p>
                    Dla policjantów przekaz był jasny: w obiekcie mogło dojść do tragedii, a sprawcy martwili się jedynie o ciągłość dostaw. Zaledwie dwa dni po tym telefonie, 26.08.2020 czescy policjanci weszli do posiadłości w Janovie.
                </p>

                <CaseFile title="Raport: Rewizja">
                    „w nieruchomości zabezpieczono rzeczy... oprócz marihuany zabezpieczono również substancje zawierające DMT o objętości ok. 2 kg”.
                </CaseFile>

                <p>
                    Zidentyfikowano 15 obywateli Polski. Wśród nich: <strong>Krzysztof Stefanek</strong> i <strong>Lena Drzewińska</strong>.
                </p>

                <Separator />

                <h2 className="text-3xl mt-16 mb-6 flex items-center gap-3">
                    <span className="text-gray-700 text-lg font-mono">03/</span> Cena wolności
                </h2>

                <p>
                    15 października 2020 roku sielankę w ośrodku Kordysów przerwał huk granatów ogłuszających. Czeska jednostka antyterrorystyczna wdarła się do budynku.
                </p>

                <div className="my-8 border border-gray-800 bg-black p-1">
                    <ArticleVideoPlayer 
                        src={`${PINATA_GATEWAY}/${ARREST_VIDEO_CID}/videoplayback.m3u8`} 
                        poster=""
                    />
                    <div className="p-2 flex items-center justify-between text-[10px] font-mono text-gray-500 bg-gray-900">
                        <span>KAMERA OPERACYJNA #04</span>
                        <span>15.10.2020</span>
                    </div>
                </div>

                <p>
                    Co wydarzyło się w ciągu tych niespełna dwóch miesięcy? Odpowiedź kryje się w jednym czeskim terminie prawnym:
                </p>

                <LegalNote term="Dohoda o vině a trestu">
                    Ugoda o winie i karze. Czeska procedura karna pozwalająca oskarżonemu na dobrowolne poddanie się karze w zamian za łagodniejszy wyrok.
                </LegalNote>

                <p>
                    Bartosz „Badi” Badowski wybrał strategię, która miała uchronić go przed wieloletnim więzieniem. Ugoda pozwoliła na zamknięcie jego teczki bez wywoływania świadków.
                </p>

                <p>
                    Na mocy <button onClick={() => openGallery('wyrok_badi')} className="border-b border-gray-500 hover:text-white">wyroku</button> z dnia 2 listopada 2021 roku Bartosz Badowski został uznany winnym.
                </p>

                <CaseFile title="Wyrok: Bartosz B.">
                    „co najmniej od bliżej nieustalonej daty w 2015 roku do 26.08.2020 [...] oferował, organizował i co najmniej w 441 przypadkach zrealizował w nieregularnych odstępach czterodniowe i dziesięciodniowe pobyty [...]”
                    <br/><br/>
                    „przechowywał łącznie 1902,79 grama materiału roślinnego (...), który zawierał łącznie 37,24 grama substancji czynnej DMT”.
                </CaseFile>

                <p>
                    Podczas, gdy Jarosław Kordys został skazany na 8,5 roku pozbawienia wolności, Bartosz Badowski zakończył sprawę wyrokiem w zawieszeniu.
                </p>

                <h2 className="text-3xl mt-16 mb-6 flex items-center gap-3">
                    <span className="text-gray-700 text-lg font-mono">04/</span> Kiciński
                </h2>

                <p>
                    W cieniu tych wyroków pozostaje wciąż niewyjaśniona rola cichego wspólnika. Michał Kiciński to nie jest postać, która o ayahuasce jedynie „słyszała” – on stał się jej nieoficjalnym ambasadorem.
                </p>

                <PullQuote 
                    quote="Po ayahuasce jest szansa na to, żeby sobie nie ściemniać."
                    author="Michał Kiciński"
                    source="Newsweek, 2016"
                />

                <h2 className="text-3xl mt-16 mb-6 flex items-center gap-3">
                    <span className="text-gray-700 text-lg font-mono">05/</span> „Błąd z Badim”
                </h2>

                <p>
                    21 września 2023 roku miliarder osobiście odebrał wezwanie do stawiennictwa w charakterze świadka. Miało się ono odbyć 18.10.2023.
                </p>

                <div className="my-8 text-center cursor-pointer group" onClick={() => openGallery('wezwanie_kicinski')}>
                     <div className="relative inline-block border border-gray-700 p-2 bg-gray-900 group-hover:border-white transition-colors">
                        <img 
                            src={`${KORDYS_IMAGES_URL}/wezwanie/wezwanie_kicinski.png`} 
                            alt="Wezwanie"
                            className="w-48 opacity-80 group-hover:opacity-100 transition-opacity filter grayscale contrast-125"
                        />
                        <div className="absolute bottom-2 right-2 bg-black text-white text-[10px] px-2 py-1 font-mono">KLIKNIJ ABY POWIĘKSZYĆ</div>
                     </div>
                </div>

                <p>
                    Reakcja była błyskawiczna. Zwrócił się bezpośrednio do autora zawiadomienia – wysyłając mu wiadomość mailową z propozycją swoistej pokuty.
                </p>

                <CaseFile title="Wiadomość Email" type="email">
                    „(...) Tak mogę zapłacić za swój błąd z Badim. Podaj mi Fundacje lub Stowarzyszenie [...] i wpłacę tam dobrowolnie kwotę darowizny, w ramach Przeprosin wszechświatowi, za moją młodzieńczą naiwność i brak przenikliwości. [...] Wyślę Ci potwierdzenie przelewu.”
                </CaseFile>

                <p>
                    Do przesłuchania doszło 11 października 2023 roku. Kiciński przyjmuje linię obrony opartą na braku świadomości.
                </p>

                <CaseFile title="Protokół Przesłuchania">
                    „Nie mam żadnej wiedzy co się działo na mojej farmie, w której jestem 90% udziałowcem (...) wynajmowałem tę nieruchomość.”
                    <br/><br/>
                    „nie brałem udziału w takich ceremoniach w latach 2016-2023, a o wcześniejszym okresie odmawiam odpowiedzi”
                </CaseFile>

                <h2 className="text-3xl mt-16 mb-6 flex items-center gap-3">
                    <span className="text-gray-700 text-lg font-mono">06/</span> Anonimowy filantrop
                </h2>

                <p>
                     W listopadzie 2025 roku na kanale YouTube „Osada Natury Zew” pojawia się film, w którym Krzysztof Stefanek snuje opowieść o tajemniczym dobroczyńcy.
                </p>

                <CaseFile title="Cytat: K. Stefanek">
                    „Ostatecznie 23 października 2023 roku ten człowiek do nas zadzwonił powiedział, że wspólnie z żoną zdecydowali, że oni by chcieli to miejsce przekazać w darowiźnie”
                </CaseFile>

                <div className="my-8 border border-gray-800 bg-black p-1">
                    <ArticleVideoPlayer 
                        src={`${PINATA_GATEWAY}/${VIDEO_CID}/YTDowncom_YouTube_Media_4Xujw-krjxs_001_1080p-1.m3u8`} 
                        poster=""
                    />
                    <div className="p-2 flex items-center justify-between text-[10px] font-mono text-gray-500 bg-gray-900">
                        <span>MATERIAŁ WIDEO</span>
                        <span>YOUTUBE / 2025</span>
                    </div>
                </div>

                <p>
                    Jednak kalendarz wydarzeń prawnych burzy ten romantyczny mit:
                </p>

                <div className="border-l border-gray-800 ml-4 my-12 space-y-8 font-mono text-sm relative">
                    <div className="relative pl-8">
                        <div className="absolute left-[-5px] top-1 w-2 h-2 bg-gray-600 rounded-full"></div>
                        <div className="text-gray-500 mb-1">21.09.2023</div>
                        <div className="text-gray-300">Kiciński odbiera wezwanie na przesłuchanie.</div>
                    </div>
                     <div className="relative pl-8">
                        <div className="absolute left-[-5px] top-1 w-2 h-2 bg-gray-600 rounded-full"></div>
                        <div className="text-gray-500 mb-1">03.10.2023</div>
                        <div className="text-gray-300">Kiciński odkupuje 10% udziałów od Badowskiego.</div>
                    </div>
                     <div className="relative pl-8">
                        <div className="absolute left-[-5px] top-1 w-2 h-2 bg-gray-600 rounded-full"></div>
                        <div className="text-gray-500 mb-1">11.10.2023</div>
                        <div className="text-gray-300">Przesłuchanie na policji.</div>
                    </div>
                     <div className="relative pl-8">
                        <div className="absolute left-[-5px] top-1 w-2 h-2 bg-red-600 rounded-full shadow-[0_0_10px_red]"></div>
                        <div className="text-red-500 mb-1 font-bold">23.10.2023</div>
                        <div className="text-white border border-red-900/50 bg-red-900/10 p-2">
                             Telefon do Stefanka z propozycją oddania majątku za darmo. 12 dni po przesłuchaniu.
                        </div>
                    </div>
                     <div className="relative pl-8">
                        <div className="absolute left-[-5px] top-1 w-2 h-2 bg-gray-600 rounded-full"></div>
                        <div className="text-gray-500 mb-1">21.12.2023</div>
                        <div className="text-gray-300">Formalny akt darowizny na stowarzyszenie.</div>
                    </div>
                </div>

                <TransactionStamp 
                    label="Numer Akt (Katastr)"
                    value="V-5821/2023-127"
                    subDetails="Darowizna"
                />

                <h2 className="text-3xl mt-16 mb-6 flex items-center gap-3">
                    <span className="text-gray-700 text-lg font-mono">07/</span> Nýdek
                </h2>

                <p>
                    W miejscowości <strong>Nýdek</strong>, funkcjonował <button onClick={() => openGallery('nydek')} className="border-b border-gray-500 hover:text-white">kolejny, bliźniaczy ośrodek</button>.
                </p>

                <p>
                    Właścicielem tej kolejnej szamańskiej świątyni był drugi z duetu miliarderów stojących za CD Projekt, Marcin Iwiński.
                </p>

                <LocationStamp 
                    name="Nýdek" 
                    code="708186" 
                    plot="st. 506/1" 
                    lv="832" 
                    onClick={() => openGallery('nydek')}
                />

                <p>
                    Gdy 15.10.2020 roku aresztowano Kordysa, nad środowiskiem zawisło widmo policyjnych nalotów.
                </p>
                
                <div className="border-l border-gray-800 ml-4 my-8 space-y-4 font-mono text-sm pl-8">
                    <div>
                        <span className="text-gray-500 mr-4">15.10.2020</span>
                        <span>Aresztowanie Kordysa.</span>
                    </div>
                     <div>
                        <span className="text-gray-500 mr-4">15.06.2021</span>
                        <span>Iwiński sprzedaje Nýdek.</span>
                    </div>
                </div>

                <p>
                     Nabywcą luksusowej posiadłości został sam Piotr Bonawentura Tracz – ten sam człowiek, który wcześniej pełnił tam rolę szamana.
                </p>

                <TransactionStamp 
                    label="Numer Akt (Katastr)"
                    value="V-2937/2021-832"
                    subDetails="Sprzedaż"
                />

                <h2 className="text-3xl mt-16 mb-6 flex items-center gap-3">
                    <span className="text-gray-700 text-lg font-mono">08/</span> Sprawiedliwość na sprzedaż?
                </h2>

                <p>
                    Historia Hermanovic, Janova i Nýdka to opowieść o dwóch równoległych światach. W jednym – za kraty czeskich więzień – trafiają szamani. W drugim – na szczytach list Forbesa – trwają ludzie, którzy tę infrastrukturę sfinansowali.
                </p>

                <p>
                    Czy sprawiedliwość, podobnie jak ayahuaskowe wizje, jest tylko iluzją i kwestią zasobności portfela?
                </p>

                <div className="mt-20 flex justify-end">
                    <div className="text-right border-t border-gray-800 pt-4 px-8">
                        <div className="font-mono text-xs text-gray-600 uppercase tracking-widest mb-1">Autor raportu</div>
                        <div className="font-bold text-white text-xl">Marlow</div>
                    </div>
                </div>

            </div>

            {/* FOOTER - DOWNLOADS */}
            <footer className="mt-24 pt-12 border-t border-dashed border-gray-800">
                <div className="flex items-center gap-2 mb-8">
                    <Download className="w-4 h-4 text-green-500" />
                    <h3 className="text-sm font-mono text-white uppercase tracking-widest">Pliki źródłowe</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm font-mono">
                    <a href={KORDYS_PDF_URL} target="_blank" className="flex items-center justify-between p-3 border border-gray-800 hover:bg-gray-900 transition-colors group">
                        <span className="text-gray-400 group-hover:text-white">Wyrok: Kordys (30 T 5/2020)</span>
                        <Download className="w-3 h-3 text-gray-600" />
                    </a>
                    <a href={BADI_PDF_URL} target="_blank" className="flex items-center justify-between p-3 border border-gray-800 hover:bg-gray-900 transition-colors group">
                        <span className="text-gray-400 group-hover:text-white">Wyrok: Badowski (66 T 146/2021)</span>
                        <Download className="w-3 h-3 text-gray-600" />
                    </a>
                    <a href="#" className="flex items-center justify-between p-3 border border-gray-800 hover:bg-gray-900 transition-colors group">
                         <span className="text-gray-400 group-hover:text-white">Historia: Janov (LV 127)</span>
                        <Download className="w-3 h-3 text-gray-600" />
                    </a>
                     <a href="#" className="flex items-center justify-between p-3 border border-gray-800 hover:bg-gray-900 transition-colors group">
                         <span className="text-gray-400 group-hover:text-white">Historia: Nýdek (LV 832)</span>
                        <Download className="w-3 h-3 text-gray-600" />
                    </a>
                    <a href="https://web.archive.org/web/*/tribunydek.com" target="_blank" className="flex items-center justify-between p-3 border border-gray-800 hover:bg-gray-900 transition-colors group md:col-span-2">
                        <span className="text-gray-400 group-hover:text-white">Archiwum: tribunydek.com</span>
                        <ExternalLink className="w-3 h-3 text-gray-600" />
                    </a>
                </div>

                <div className="mt-12 text-center text-xs font-mono text-gray-700">
                    <p className="mb-2">Zabezpieczono w sieci IPFS</p>
                    <a href="https://kutasinskigate.eth.limo" className="hover:text-white transition-colors">kutasinskigate.eth.limo</a>
                    <p className="mt-4">marlow.contact@proton.me</p>
                </div>
            </footer>
        </article>

        <EvidenceAudioModal isOpen={isAudioOpen} onClose={() => setIsAudioOpen(false)} src="/evidence/stefan-nagranie.mp3" />
        <GalleryModal isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} data={galleryData} />
      </main>
    </PasswordProtect>
  );
}
