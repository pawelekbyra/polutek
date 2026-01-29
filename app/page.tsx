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

// ... (reszta Twoich stałych pozostaje bez zmian)
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
                Ayahuasca, policyjne naloty i tragedia, o której nikt się miał nie dowiedzieć. W cieniu głośnego procesu dziennikarskie śledztwo ujawnia, jak twórcy gry &quot;Wiedźmin&quot; finansowali szamańskie podziemie.
              </p>
            </div>
          </div>
        </header>

        <article className="max-w-2xl mx-auto px-4 pt-8 pb-0 flex-grow">
          <div className="prose prose-stone prose-lg max-w-none prose-headings:font-sans prose-headings:font-bold prose-blockquote:not-italic
            prose-a:text-stone-900 prose-a:font-bold prose-a:no-underline prose-a:underline prose-a:decoration-double prose-a:decoration-stone-400 hover:prose-a:bg-stone-100 transition-colors">
            
            <p className="first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-stone-900 leading-relaxed">
              W 2020 roku media obiegły doniesienia o rozbiciu grupy polskich szamanów w czeskich <strong>Hermanovicach</strong>. Policyjny nalot, aresztowanie <strong>Jarosława i Karoliny Kordysów</strong>, a następnie surowe wyroki – 8,5 oraz 5,5 roku więzienia za prowadzenie nielegalnego biznesu polegającego na organizacji tzw. &quot;ceremonii&quot;, podczas których klientom podawano egzotyczny psychodelik – ayahuaskę.
            </p>

            <p>
              Ayahuaska to tradycyjny wywar z amazońskich roślin o silnym działaniu halucynogennym. Ze względu na wysoką zawartość DMT – substancji psychodelicznej wywołującej intensywne wizje i zmiany stanu świadomości, jej posiadanie i podawanie jest w <strong>Polsce</strong> i <strong>Czechach</strong> zabronione. Finałem medialnego spektaklu Kordysów było ułaskawienie przez czeskiego prezydenta po dwóch latach odsiadki.
            </p>

            <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Świadek B.</h2>

            <p>
              W obszernym i publicznie dostępnym uzasadnieniu <button onClick={() => openGallery('wyrok_kordys')} title="Zobacz skan wyroku" className="font-bold text-stone-900 underline decoration-double decoration-stone-400 hover:bg-stone-100 transition-colors">wyroku</button> <strong>Jarosława Kordysa</strong> pojawia się postać świadka <strong>Bartosza B.</strong>
            </p>
            
            <CaseFile title="Zeznania świadka B.">
             <strong> &quot;Świadek B.</strong> odnośnie osoby oskarżonego [<strong>Jarosława Kordysa</strong>] oświadczył, że zna się z nim ok. 8 lat, a poznali się w Holandii&quot;.
              <br/><br/>
              <strong>&quot;Świadek B.</strong> potwierdził, że i on sam w przeszłości prowadził warsztaty&quot;, a obecnie sam &quot;jest przedmiotem dochodzenia policji w Krnowie właśnie z powodu ceremonii&quot;.
            </CaseFile>

            {/* POPRAWIONA LITERÓWKA TUTAJ: Michala D. K.strong> -> Michała D. K. */}
            <CaseFile title="Ustalenia Sądu">
              &quot;...w odniesieniu do nieruchomości będących współwłasnością <strong>Bartosza B.</strong> i <strong>Michała D. K.</strong>&quot;
            </CaseFile>

            <LocationStamp 
              name="JANOV U KRNOVA" 
              code="656976" 
              plot="st. 281" 
              lv="127" 
              onClick={() => openGallery('janov')}
            />

            <p>
              Drugie imię – Dawid – idealnie wypełnia lukę w zanonimizowanym skrócie &quot;Michal D. K.&quot;. <span className="bg-yellow-200 px-1 font-bold text-stone-900 shadow-sm">Wspólnikiem szamana był twórca &quot;Wiedźmina&quot; – jeden z najbogatszych Polaków.</span>
            </p>

            <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Cena wolności</h2>

            <div className="my-12 w-full rounded-sm overflow-hidden shadow-md">
               <ArticleVideoPlayer 
                  src={`${PINATA_GATEWAY}/${ARREST_VIDEO_CID}/videoplayback.m3u8`} 
                  poster=""
               />
            </div>

            <LegalNote term="Dohoda o vině a trestu">
              Ugoda o winie i karze. Czeska procedura karna pozwalająca oskarżonemu na dobrowolne poddanie się karze w zamian za łagodniejszy wyrok.
            </LegalNote>

            <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Kiciński</h2>

            <PullQuote 
              quote="Po ayahuasce jest szansa na to, żeby sobie nie ściemniać."
              author="Michał Kiciński"
              source="Newsweek, 30 maja 2016 r."
            />

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

            <div className="my-12 w-full rounded-sm overflow-hidden shadow-md">
               <ArticleVideoPlayer 
                src={`${PINATA_GATEWAY}/${VIDEO_CID}/YTDowncom_YouTube_Media_4Xujw-krjxs_001_1080p-1.m3u8`} 
                poster=""
              />
            </div>

            <TransactionStamp 
              label="Nr Transakcji (Katastr)" 
              value="V-5821/2023-127" 
              subDetails="Obręb: Janov u Krnova [656976]"
            />

            <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Nýdek</h2>

            <LocationStamp 
              name="NÝDEK" 
              code="708186" 
              plot="st. 506/1" 
              lv="832" 
              onClick={() => openGallery('nydek')}
            />

            <div className="mt-12 mb-12 py-4 px-5 bg-stone-50 shadow-sm">
               <div className="border-l-4 border-red-900 pl-4">
                  <h4 className="font-bold text-red-900 uppercase tracking-widest mb-2 text-xs">
                     Status Prawny (2025/2026)
                  </h4>
                  <p className="mb-2 font-bold text-stone-900 text-xs">Prokuratura w Częstochowie prowadzi śledztwa:</p>
                  <ul className="list-disc list-inside space-y-1 mb-3 font-mono text-[10px]">
                     <li>W sprawie organizacji ceremonii <span className="text-stone-500">(Sygn. PR 3 Ds 125.2024)</span>.</li>
                     <li>W sprawie nieumyślnego spowodowania śmierci <span className="text-stone-500">(Sygn. PR 3 Ds 124.2024)</span>.</li>
                  </ul>
               </div>
            </div>
          </div>

          <footer className="mt-4 pt-8 border-none font-sans">
             <div className="mb-8">
               <h3 className="text-xl font-bold text-stone-900 uppercase tracking-widest flex items-center gap-2 mb-4">
                 <Search className="w-5 h-5" /> Dokumenty Źródłowe
               </h3>
               <div className="border-b border-stone-300 w-full mb-6"></div>
             </div>
             
             <div className="grid gap-4 text-sm text-stone-600">
                <div className="p-3 bg-white border border-stone-200 hover:border-blue-300 transition-colors shadow-sm">
                   <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div>
                        <h4 className="font-bold text-stone-900 text-sm">Wyrok Jarosława Kordysa</h4>
                        <p className="font-mono text-[10px] text-stone-500">Sygn. 30 T 5/2020</p>
                      </div>
                      <a href={KORDYS_PDF_URL} target="_blank" rel="noopener noreferrer" className="shrink-0 bg-blue-50 text-blue-700 px-3 py-1 text-xs font-bold rounded flex items-center gap-2">
                        <FileText className="w-3 h-3" /> Pobierz PDF
                      </a>
                   </div>
                </div>
             </div>

             <div className="mt-16 text-center">
                <p className="text-xs text-stone-500 font-mono uppercase tracking-widest mb-2">
                  <ShieldCheck className="w-4 h-4 inline mr-1" /> Zasoby Niezatapialne
                </p>
                <a href="https://kutasinskigate.eth.limo" target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-stone-400 hover:text-stone-900 underline">
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
