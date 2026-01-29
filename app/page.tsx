"use client";

import React, { useState } from 'react';
import { Scale, FileText, Search, User, Mail, MapPin, Calendar, Globe, X, Stamp, Video, Info, ShieldCheck, History, ExternalLink, Download, PenTool, Home as HouseIcon, AlertCircle } from 'lucide-react';
import {
  CaseFile, LegalNote, PullQuote, LocationStamp, TransactionStamp,
  EvidenceAudioModal, ArticleVideoPlayer, GalleryModal,
  GalleryData
} from './components';

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
const MUNAY_WAYBACK_URL = "https://web.archive.org/web/20230607033503/https://munaysonqo.com/retreats/";

const generateKordysPages = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const pageNumber = String(i + 1).padStart(4, '0');
    return `${KORDYS_IMAGES_URL}/30T 5 2021-1_page-${pageNumber}.jpg`;
  });
};

const generateBadiPages = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const pageNumber = String(i + i).padStart(4, '0');
    return `${BADI_IMAGES_URL}/wyrok_page-${pageNumber}.jpg`;
  });
};

const GALLERY_NYDEK: GalleryData = {
  title: "Posiadłość w Nýdku (Archiwum)",
  images: [`${NYDEK_IMAGES_URL}/nydek01.jpg`, `${NYDEK_IMAGES_URL}/nydek02.jpg`, `${NYDEK_IMAGES_URL}/nydek03.jpg`, `${NYDEK_IMAGES_URL}/nydek04.jpg`, `${NYDEK_IMAGES_URL}/nydek05.jpg`, `${NYDEK_IMAGES_URL}/nydek06.jpeg`],
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
  images: Array.from({ length: 26 }, (_, i) => `${JANOV_IMAGES_URL}/janov${String(i + 1).padStart(2, '0')}.jpg`),
  signature: "LV 127"
};

export default function Home() {
  const [isAudioOpen, setIsAudioOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryData, setGalleryData] = useState<GalleryData | null>(null);

  const openGallery = (type: 'nydek' | 'wyrok_kordys' | 'wyrok_badi' | 'wezwanie_kicinski' | 'janov') => {
    const maps = { nydek: GALLERY_NYDEK, wyrok_kordys: GALLERY_WYROK_KORDYS, wyrok_badi: GALLERY_WYROK_BADI, wezwanie_kicinski: GALLERY_WEZWANIE_KICINSKI, janov: GALLERY_JANOV };
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
            <span className="block text-5xl md:text-7xl font-bold leading-none tracking-tight">Eliksir Wiedźmina</span>
            <span className="block text-2xl md:text-4xl text-stone-500 italic font-medium mt-6 max-w-3xl mx-auto">Mroczna tajemnica twórców CD Projekt</span>
          </h1>
          <div className="max-w-2xl mx-auto border-y border-stone-200 py-8 px-4">
            <p className="text-xl md:text-2xl text-stone-700 leading-relaxed italic">
              Ayahuasca, policyjne naloty i tragedia, o której nikt się miał nie dowiedzieć. W cieniu głośnego procesu dziennikarskie śledztwo ujawnia, jak twórcy gry &quot;Wiedźmin&quot; finansowali szamańskie podziemie.
            </p>
          </div>
        </div>
      </header>

      <article className="max-w-2xl mx-auto px-4 pt-8 pb-0 flex-grow">
        <div className="prose prose-stone prose-lg max-w-none prose-headings:font-sans prose-headings:font-bold prose-blockquote:not-italic prose-a:text-stone-900 prose-a:font-bold prose-a:no-underline prose-a:underline prose-a:decoration-double prose-a:decoration-stone-400 hover:prose-a:bg-stone-100 transition-colors">
          <p className="first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-stone-900 leading-relaxed">
            W 2020 roku media obiegły doniesienia o rozbiciu grupy polskich szamanów w czeskich <strong>Hermanovicach</strong>. Policyjny nalot, aresztowanie <strong>Jarosława i Karoliny Kordysów</strong>, a następnie surowe wyroki – 8,5 oraz 5,5 roku więzienia za prowadzenie nielegalnego biznesu polegającego na organizacji tzw. &quot;ceremonii&quot;, podczas których klientom podawano egzotyczny psychodelik – ayahuaskę.
          </p>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Świadek B.</h2>
          <CaseFile title="Zeznania świadka B.">
            &quot;Świadek <strong>B.</strong> odnośnie osoby oskarżonego [<strong>Jarosława Kordysa</strong>] oświadczył, że zna się z nim ok. 8 lat, a poznali się w Holandii&quot;.
            <br /><br />
            &quot;Świadek <strong>B.</strong> potwierdził, że i on sam w przeszłości prowadził warsztaty&quot;, a obecnie sam &quot;jest przedmiotem dochodzenia policji w Krnowie właśnie z powodu ceremonii&quot;.
          </CaseFile>

          <LocationStamp name="JANOV U KRNOVA" code="656976" plot="st. 281" lv="127" onClick={() => openGallery('janov')} />

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Na podsłuchu</h2>
          <CaseFile title="Rekonstrukcja rozmowy" type="transcript">
            &quot;oskarżony J. K. omawia z B., że dotarła do niego informacja, że w obiekcie w <strong>Janovie</strong> zmarła jakaś kobieta&quot;.
          </CaseFile>

          <div className="my-12 w-full rounded-sm overflow-hidden shadow-md">
            <ArticleVideoPlayer src={`${PINATA_GATEWAY}/${ARREST_VIDEO_CID}/videoplayback.m3u8`} poster="" />
          </div>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Cena wolności</h2>
          <LegalNote term="Dohoda o vině a trestu">
            Ugoda o winie i karze. Czeska procedura karna pozwalająca oskarżonemu na dobrowolne poddanie się karze w zamian za łagodniejszy wyrok.
          </LegalNote>

          <PullQuote quote="Po ayahuasce jest szansa na to, żeby sobie nie ściemniać." author="Michał Kiciński" source="Newsweek, 30 maja 2016 r." />

          <div className="my-8 flex flex-col items-center">
            <img 
              src={`${KORDYS_IMAGES_URL}/wezwanie/wezwanie_kicinski.png`} 
              alt="Wezwanie na policję" 
              className="w-48 rounded shadow-md border border-stone-200 cursor-pointer hover:opacity-90 transition-opacity" 
              onClick={() => openGallery('wezwanie_kicinski')} 
            />
          </div>

          <CaseFile title="Wiadomość od M. Kicińskiego" type="email">
            &quot;(...) Tak mogę zapłacić za swój błąd z Badim. Podaj mi Fundacje lub Stowarzyszenie (...) i wpłacę tam dobrowolnie kwotę darowizny, w ramach Przeprosin wszechświatowi, za moją młodzieńczą naiwność i brak przenikliwości.&quot;
          </CaseFile>

          <CaseFile title="Zeznanie do protokołu">
            &quot;Nie mam żadnej wiedzy co się działo na mojej farmie, w której jestem 90% udziałowcem (...) wynajmowałem tę nieruchomość.&quot;
          </CaseFile>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Anonimowy filantrop</h2>
          <CaseFile title="Wypowiedź K. Stefanka">
            &quot;Ostatecznie 23 października 2023 roku ten człowiek do nas zadzwonił powiedział, że wspólnie z żoną zdecydowali, że oni by chcieli to miejsce przekazać w darowiźnie&quot;
          </CaseFile>

          <div className="my-12 w-full rounded-sm overflow-hidden shadow-md">
            <ArticleVideoPlayer src={`${PINATA_GATEWAY}/${VIDEO_CID}/YTDowncom_YouTube_Media_4Xujw-krjxs_001_1080p-1.m3u8`} poster="" />
          </div>

          <p>
            &quot;Zadośćuczynienie wszechświatowi&quot; miało trafić na hospicjum, a nie na &quot;organizację krzak&quot;.
          </p>

          <TransactionStamp label="Nr Transakcji" value="V-5821/2023-127" subDetails="Obręb: Janov u Krnova [656976]" />
        </div>

        <footer className="mt-4 pt-8 border-none font-sans">
          <div className="mb-8">
            <h3 className="text-xl font-bold text-stone-900 uppercase tracking-widest flex items-center gap-2 mb-4">
              <Search className="w-5 h-5" /> Dokumenty Źródłowe
            </h3>
          </div>
          <div className="grid gap-4 text-sm text-stone-600">
            <div className="p-3 bg-white border border-stone-200 shadow-sm">
              <h4 className="font-bold text-stone-900">Wyrok <strong>Jarosława Kordysa</strong></h4>
              <p className="font-mono text-[10px]">Sygn. 30 T 5/2020</p>
              <a href={KORDYS_PDF_URL} className="text-blue-600 underline">Pobierz PDF</a>
            </div>
          </div>
          <div className="mt-16 text-center">
            <p className="text-xs text-stone-500 font-mono uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Zasoby Niezatapialne (Web3)
            </p>
            <a href="https://kutasinskigate.eth.limo" className="font-mono text-sm text-stone-400 underline">kutasinskigate.eth.limo</a>
          </div>
        </footer>
      </article>

      <EvidenceAudioModal isOpen={isAudioOpen} onClose={() => setIsAudioOpen(false)} src="/evidence/stefan-nagranie.mp3" />
      <GalleryModal isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} data={galleryData} />
    </main>
  );
}
