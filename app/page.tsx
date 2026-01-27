"use client";

import React, { useState } from 'react';
import { Scale, FileText, Search, User, Mail, MapPin, Calendar, Globe, X, Stamp, Video, Info, ShieldCheck, History, ExternalLink, Download, PenTool, Home as HouseIcon } from 'lucide-react';
import PasswordProtect from './components/PasswordProtect';
import { GalleryModal } from '@/components/gallery/GalleryModal';
import ArticleVideoPlayer from '@/components/ArticleVideoPlayer';

// --- KONFIGURACJA IPFS (DEDYKOWANA BRAMA) ---
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
  images: Array.from({ length: 26 }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return `${JANOV_IMAGES_URL}/janov${num === '03' || num === '05' ? '01' : num}.jpg`;
  }),
  signature: "LV 127"
};

// --- STYLIZOWANE KOMPONENTY 'NAJS' ---

const CaseFile = ({ title, children, type = 'evidence' }: { title: string, children: React.ReactNode, type?: 'evidence' | 'transcript' | 'email' }) => (
  <div className="my-10 group border-l-2 border-stone-800 bg-stone-50/40 p-6 transition-all hover:bg-white shadow-[4px_4px_0px_0px_rgba(28,25,23,0.05)]">
    <div className="flex items-center gap-3 mb-4 opacity-60 group-hover:opacity-100 transition-opacity">
      {type === 'email' ? <Mail className="w-4 h-4" /> : type === 'transcript' ? <Search className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
      <span className="text-[10px] font-mono uppercase tracking-[0.3em] font-black text-stone-900">{title}</span>
    </div>
    <div className="font-mono text-sm leading-relaxed text-stone-700 italic border-l border-stone-200 pl-4">
      {children}
    </div>
  </div>
);

const LegalNote = ({ term, children }: { term: string, children: React.ReactNode }) => (
  <div className="my-12 p-6 bg-[#f0f4f8] border border-blue-200 rounded-sm relative overflow-hidden">
    <div className="absolute top-0 right-0 p-2 opacity-10"><Scale className="w-12 h-12" /></div>
    <h4 className="text-blue-900 font-sans font-black text-xs uppercase tracking-tighter mb-3 flex items-center gap-2">
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" /> Definicja Prawna: {term}
    </h4>
    <div className="text-stone-600 text-sm font-medium leading-relaxed">{children}</div>
  </div>
);

const PullQuote = ({ quote, author, source }: { quote: string, author: string, source: string }) => (
  <div className="my-16 text-center max-w-xl mx-auto">
    <p className="font-serif text-2xl md:text-3xl font-light italic text-stone-900 leading-tight mb-6">
      „{quote}”
    </p>
    <div className="h-px w-12 bg-stone-300 mx-auto mb-4"></div>
    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-500">
      <span className="font-black text-stone-900">{author}</span> <br/> {source}
    </div>
  </div>
);

const LocationStamp = ({ name, code, plot, lv, onClick }: { name: string, code: string, plot: string, lv: string, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className="my-8 w-full flex items-center gap-6 p-4 border border-stone-200 bg-white hover:border-stone-800 transition-all text-left group"
  >
    <div className="bg-stone-100 p-4 group-hover:bg-stone-900 group-hover:text-white transition-colors">
      <HouseIcon className="w-6 h-6" />
    </div>
    <div>
      <div className="text-[9px] font-black uppercase tracking-widest text-stone-400 group-hover:text-stone-900 transition-colors">{name}</div>
      <div className="text-xl font-serif italic text-stone-900">Księga Wieczysta: LV {lv}</div>
      <div className="text-[10px] font-mono text-stone-500 mt-1 uppercase">Działka {plot} / Obręb {code}</div>
    </div>
    <ExternalLink className="ml-auto w-4 h-4 opacity-0 group-hover:opacity-20 transition-opacity" />
  </button>
);

const TransactionStamp = ({ label, value, subDetails }: { label: string, value: string, subDetails?: string }) => (
  <div className="my-8 p-4 border-2 border-dashed border-stone-200 flex items-center gap-4 grayscale hover:grayscale-0 transition-all">
    <Stamp className="w-8 h-8 text-stone-300" />
    <div>
      <div className="text-[9px] font-black text-stone-400 uppercase tracking-tighter">{label}</div>
      <div className="font-mono text-sm font-bold text-stone-800 tracking-tight">{value}</div>
      {subDetails && <div className="text-[10px] text-stone-500 font-mono italic">{subDetails}</div>}
    </div>
  </div>
);

// --- GŁÓWNY KOMPONENT ---

export default function Home() {
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
      <main className="min-h-screen bg-[#F9F7F2] text-stone-900 selection:bg-stone-900 selection:text-white font-serif">
        
        {/* HEADER */}
        <header className="pt-32 pb-16 px-6 border-b border-stone-200">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[2px] w-12 bg-stone-900"></div>
              <span className="text-[11px] font-mono font-black uppercase tracking-[0.4em]">Akta: Tajne / Śledcze</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8">
              ELIKSIR <br/> WIEDŹMINA
            </h1>
            
            <div className="max-w-2xl">
              <p className="text-2xl md:text-3xl text-stone-500 font-light leading-snug italic">
                Ayahuasca, miliardy z gier i śmierć, której nie było w scenariuszu.
              </p>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <article className="max-w-2xl mx-auto px-6 py-20">
          <div className="prose prose-stone prose-lg max-w-none">
            
            <p className="first-letter:text-8xl first-letter:font-black first-letter:mr-4 first-letter:float-left first-letter:leading-[0.8] text-xl leading-relaxed text-stone-800">
              W 2020 roku media obiegły doniesienia o rozbiciu grupy polskich szamanów w czeskich Hermanovicach. Policyjny nalot, aresztowanie Jarosława i Karoliny Kordysów, a następnie surowe wyroki – 8,5 oraz 5,5 roku więzienia za prowadzenie nielegalnego biznesu polegającego na organizacji tzw. „ceremonii”, podczas których klientom podawano egzotyczny psychodelik – ayahuaskę.
            </p>

            <p>
              Ayahuaska to tradycyjny wywar z amazońskich roślin o silnym działaniu halucynogennym. Ze względu na wysoką zawartość DMT – substancji psychodelicznej wywołującej intensywne wizje i zmiany stanu świadomości, jej posiadanie i podawanie jest w Polsce i Czechach zabronione. Finałem medialnego spektaklu Kordysów było ułaskawienie przez czeskiego prezydenta po dwóch latach odsiadki.
            </p>

            <p className="border-l-4 border-stone-200 pl-6 py-2 text-stone-500">
              Kurtyna opadła, temat ucichł. Ale czy to na pewno koniec tej historii? W cieniu tego głośnego procesu toczył się drugi – cichy i błyskawiczny, zakończony dyskretnym wyrokiem, o którym nikt nawet w mediach się nie zająknął. Analiza sądowych dokumentów prowadzi do zdumiewających wniosków.
            </p>

            <p className="text-2xl font-black tracking-tight mt-12">
              W przygranicznym Janovie funkcjonował drugi, bliźniaczy ayahuaskowy ośrodek, którego współwłaścicielem okazał się miliarder – <span className="underline decoration-stone-300">Michał Kiciński</span>.
            </p>

            <h2 className="text-4xl font-black mt-24 mb-10 tracking-tighter uppercase">I. Świadek B.</h2>

            <p>
              W obszernym i publicznie dostępnym uzasadnieniu <button onClick={() => openGallery('wyrok_kordys')} className="font-black border-b-2 border-stone-900 hover:bg-stone-900 hover:text-white px-1 transition-all">wyroku</button> Jarosława Kordysa pojawia się postać świadka Bartosza B.
            </p>
            
            <CaseFile title="Zeznania świadka B.">
              „Świadek B. odnośnie osoby oskarżonego [Jarosława Kordysa] oświadczył, że zna się z nim ok. 8 lat, a poznali się w Holandii”.
              <br/><br/>
              „Świadek B. potwierdził, że i on sam w przeszłości prowadził warsztaty”, a obecnie sam „jest przedmiotem dochodzenia policji w Krnowie właśnie z powodu ceremonii”.
            </CaseFile>

            <CaseFile title="Akta: Przemyt substancji">
              „(...) wymieniony był sprawdzany w związku z występkiem niedozwolonej produkcji i innego obchodzenia się ze środkami odurzającymi (...) albowiem miał w roku 2014 zlecić przesłanie na swój adres przesyłki pocztowej przechwyconej na lotnisku w Lipsku RFN zawierającej 4,5 kg DMT, a 6.6.2018 miało dojść do zatrzymania przesyłki pocztowej we Frankfurcie nad Menem RFN zawierającej 2000 g meskaliny i 38,6 g substancji DMT.”
            </CaseFile>

            <CaseFile title="Ustalenia Sądu ws. Własności">
              „...w odniesieniu do nieruchomości będących współwłasnością Bartosza B. i Michala D. K.”.
            </CaseFile>

            <LocationStamp 
              name="JANOV U KRNOVA" 
              code="656976" 
              plot="st. 281" 
              lv="127" 
              onClick={() => openGallery('janov')}
            />

            <p className="font-mono text-sm p-6 bg-stone-900 text-white leading-loose shadow-xl">
              Pobrany dokument pozostawia wątpliwości: w latach 2012–2023 współwłaścicielami nieruchomości byli:
              <br/>— Bartosz Badowski (10%)
              <br/>— <strong>Michał Dawid Kiciński (90%)</strong>
            </p>

            <h2 className="text-4xl font-black mt-24 mb-10 tracking-tighter uppercase">II. Na podsłuchu</h2>

            <p>
              Przełom w sprawie nastąpił dzięki policyjnej technice operacyjnej. Telefon Kordysa był na stałym podsłuchu. Sąd precyzyjnie rekonstruuje moment, w którym panika wdarła się do Janova:
            </p>

            <CaseFile title="Transkrypt: 24.08.2020" type="transcript">
              „oskarżony J. K. omawia z B., że dotarła do niego informacja, że w obiekcie w Janovie zmarła jakaś kobieta”.
              <br/><br/>
              Kordys: „W jakim zagrożeniu jest nasza praca?”
            </CaseFile>

            <div className="my-12 p-8 border-4 border-stone-900 bg-white">
              <p className="font-serif italic text-2xl leading-snug">
                „Z ich rozmowy wynika, że nie zajmowali się w zasadzie samym faktem śmierci, lecz raczej obawą, aby to nie przyciągnęło uwagi policji.”
              </p>
              <div className="mt-4 text-[10px] font-mono uppercase font-black">— Konkluzja Sądu Rejonowego</div>
            </div>

            <CaseFile title="Logistyka 'Herbaty'" type="transcript">
              „Następnie w rozmowie omawiają zamówienia «herbaty» z dżungli i to, czy im tego «nie zepsują», ekscytując się nagraniem od dostawcy, który «siedzi w dżungli i gotuje».”
            </CaseFile>

            <h2 className="text-4xl font-black mt-24 mb-10 tracking-tighter uppercase">III. Cena wolności</h2>

            <p>
              15 października 2020 roku sielankę przerwał huk granatów. Czeska specgrupa weszła do Kordysów. Co działo się wcześniej w Janovie?
            </p>

            <div className="my-12 group relative">
              <ArticleVideoPlayer 
                src={`${PINATA_GATEWAY}/${ARREST_VIDEO_CID}/videoplayback.m3u8`} 
                poster=""
              />
              <div className="mt-4 flex items-center gap-3 text-stone-500 font-mono text-[10px] uppercase">
                <Video className="w-4 h-4" /> Dowód Operacyjny: Nalot 15.10.2020
              </div>
            </div>

            <LegalNote term="Dohoda o vině a trestu">
              Ugoda o winie i karze. Pozwala na dobrowolne poddanie się karze w zamian za łagodniejszy wyrok, bez publicznego procesu. Bartosz Badowski skorzystał z tej drogi 2 listopada 2021 r.
            </LegalNote>

            <CaseFile title="Wyrok: Bartosz Badowski">
              „(...) co najmniej w 441 przypadkach zrealizował [...] pobyty [...] ukierunkowane na tzw. duchowe ćwiczenia spirytualne [...] udostępnił substancje zawierające DMT oraz marihuanę.”
            </CaseFile>

            <h2 className="text-4xl font-black mt-24 mb-10 tracking-tighter uppercase">IV. Kiciński: Błąd z Badim</h2>

            <p>
              Michał Kiciński nie był tylko pasywnym właścicielem. Był ambasadorem "medycyny" w mediach. 
            </p>

            <PullQuote 
              quote="Po ayahuasce jest szansa na to, żeby sobie nie ściemniać."
              author="Michał Kiciński"
              source="Newsweek, 30 maja 2016 r."
            />

            <div className="my-12 flex flex-col items-center bg-stone-100 p-8 rounded-sm">
              <img 
                src={`${KORDYS_IMAGES_URL}/wezwanie/wezwanie_kicinski.png`} 
                alt="Wezwanie"
                className="w-64 shadow-2xl sepia hover:sepia-0 transition-all cursor-crosshair mb-4"
                onClick={() => openGallery('wezwanie_kicinski')}
              />
              <p className="text-[10px] font-mono font-black uppercase tracking-widest text-stone-400">
                Dowód #K-23: Wezwanie na przesłuchanie
              </p>
            </div>

            <CaseFile title="Korespondencja e-mail" type="email">
              „(...) Tak mogę zapłacić za swój błąd z Badim. Podaj mi Fundacje [...] i wpłacę tam dobrowolnie kwotę darowizny, w ramach Przeprosin wszechświatowi, za moją młodzieńczą naiwność i brak przenikliwości.”
            </CaseFile>

            <h2 className="text-4xl font-black mt-24 mb-10 tracking-tighter uppercase">V. Anonimowy filantrop</h2>

            <div className="my-12 p-8 border-l-8 border-stone-900 bg-stone-50">
               <ul className="list-none space-y-8 font-mono text-xs">
                <li className="flex gap-4">
                  <span className="font-black text-stone-400 underline decoration-stone-200">21.09.2023</span>
                  <span>Odbiór wezwania przez Kicińskiego.</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-black text-stone-400 underline decoration-stone-200">03.10.2023</span>
                  <span>Odkupienie 10% udziałów od Badowskiego. Scalenie własności.</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-black text-stone-400 underline decoration-stone-200">11.10.2023</span>
                  <span>Przesłuchanie. Odmowa zeznań o przeszłości.</span>
                </li>
                <li className="flex gap-4 p-4 bg-stone-900 text-white rounded-sm">
                  <span className="font-black">23.10.2023</span>
                  <span>Nagły telefon do Stefanka: „Chcę oddać nieruchomość za darmo”.</span>
                </li>
              </ul>
            </div>

            <TransactionStamp 
              label="Katastr Nemovitostí: Darovizna" 
              value="V-5821/2023-127" 
              subDetails="Transfer majątku do stowarzyszenia Stefanka i Drzewińskiej."
            />

            <h2 className="text-4xl font-black mt-24 mb-10 tracking-tighter uppercase">VI. Nýdek</h2>

            <p>
              Janov nie był wyjątkiem. W Nýdku funkcjonował bliźniaczy ośrodek prowadzony przez Piotra Bonawenturę Tracza. 
            </p>

            <LocationStamp 
              name="NÝDEK" 
              code="708186" 
              plot="st. 506/1" 
              lv="832" 
              onClick={() => openGallery('nydek')}
            />

            <p className="text-xl font-bold italic border-b-2 border-stone-900 inline-block mb-8">
              Właścicielem tej szamańskiej świątyni był drugi z miliarderów – Marcin Iwiński.
            </p>

            <TransactionStamp 
              label="Sprzedaż Nieruchomości" 
              value="V-2937/2021-832" 
              subDetails="Marcin Iwiński sprzedaje posiadłość szamanowi Traczowi w czerwcu 2021 r."
            />

            <div className="mt-32 pt-16 border-t-4 border-stone-900">
              <div className="text-right">
                <div className="inline-block text-left">
                  <div className="text-[10px] font-mono uppercase font-black mb-2 opacity-30 tracking-[0.5em]">Autor Śledztwa</div>
                  <span className="text-4xl font-black tracking-tighter uppercase">Marlow</span>
                  <div className="h-2 w-full bg-stone-900 mt-1"></div>
                </div>
              </div>
            </div>

          </div>
        </article>

        {/* FOOTER */}
        <footer className="bg-stone-900 text-stone-400 py-24 px-6 font-mono text-xs uppercase tracking-widest">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h3 className="text-white font-black mb-8 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" /> Weryfikacja Danych (Web3)
                </h3>
                <div className="space-y-4">
                  <a href={KORDYS_PDF_URL} className="block hover:text-white transition-colors border-b border-stone-800 pb-2">30 T 5/2020: Jarosław K. (PDF)</a>
                  <a href={BADI_PDF_URL} className="block hover:text-white transition-colors border-b border-stone-800 pb-2">66 T 146/2021: Bartosz B. (PDF)</a>
                  <a href="https://nahlizenidokn.cuzk.cz" className="block hover:text-white transition-colors">Katastr Nemovitostí: LV 127 / LV 832</a>
                </div>
              </div>
              <div className="flex flex-col justify-end items-end text-right">
                <div className="text-stone-600 mb-4">Wszystkie dokumenty są jawne.</div>
                <div className="text-white font-black">marlow.contact@proton.me</div>
                <div className="mt-4 text-[9px] opacity-20 tracking-normal">Hash: bafybeig...3uwj6z36tm</div>
              </div>
            </div>
          </div>
        </footer>

        <GalleryModal isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} data={galleryData} />
      </main>
    </PasswordProtect>
  );
}
