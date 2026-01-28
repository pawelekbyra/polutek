"use client";

import React, { useState } from 'react';
import { Search, Calendar, ShieldCheck, History, FileText, Globe } from 'lucide-react';
import {
  CaseFile, LegalNote, PullQuote, LocationStamp,
  TransactionStamp, EvidenceAudioModal, ArticleVideoPlayer,
  GalleryModal, type GalleryData
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

// --- FUNKCJE POMOCNICZE ---
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
  images: Array.from({ length: 26 }, (_, i) => {
    if (i + 1 === 3 || i + 1 === 5 || i + 1 === 22) return ""; // skipping missing indexes based on original code
    const num = String(i + 1).padStart(2, '0');
    return `${JANOV_IMAGES_URL}/janov${num}.jpg`;
  }).filter(Boolean),
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
              Ayahuasca, policyjne naloty i tragedia, o której nikt się miał nie dowiedzieć. W cieniu głośnego procesu dziennikarskie śledztwo ujawnia, jak twórcy gry „Wiedźmin” finansowali szamańskie podziemie.
            </p>
          </div>
        </div>
      </header>

      <article className="max-w-2xl mx-auto px-4 pt-8 pb-0 flex-grow">
        <div className="prose prose-stone prose-lg max-w-none prose-headings:font-sans prose-headings:font-bold prose-blockquote:not-italic
          prose-a:text-stone-900 prose-a:font-bold prose-a:no-underline prose-a:underline prose-a:decoration-double prose-a:decoration-stone-400 hover:prose-a:bg-stone-100 transition-colors">

          <p className="first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-stone-900 leading-relaxed">
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

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Świadek B.</h2>

          <p>
            W obszernym i publicznie dostępnym uzasadnieniu <button onClick={() => openGallery('wyrok_kordys')} title="Zobacz skan wyroku" className="font-bold text-stone-900 underline decoration-double decoration-stone-400 hover:bg-stone-100 transition-colors">wyroku</button> Jarosława Kordysa pojawia się postać świadka Bartosza B.
          </p>

          <p>Zgodnie z aktami:</p>

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
            W Czechach księgi wieczyste są jawne i dostępne online. Wystarczy wejść na stronę Katastru Nieruchomości, wyszukać <button onClick={() => openGallery('janov')} className="font-bold text-stone-900 underline decoration-double decoration-stone-400 hover:bg-stone-100 transition-colors">działkę w Janovie</button> i za niewielką opłatą pobrać jej pełną historię.
          </p>

          <LocationStamp
            name="JANOV U KRNOVA"
            code="656976"
            plot="st. 281"
            lv="127"
            onClick={() => openGallery('janov')}
          />

          <p>
            Pobrany dokument nie pozostawia wątpliwości: w latach 2012–2023 współwłaścicielami nieruchomości byli: Bartosz Badowski (10%) oraz <strong>Michał Dawid Kiciński (90%)</strong>.
          </p>

          <p>
            Drugie imię – Dawid – idealnie wypełnia lukę w zanonimizowanym skrócie „Michal D. K.”. Wspólnikiem szamana był twórca „Wiedźmina” – jeden z najbogatszych Polaków.
          </p>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Na podsłuchu</h2>

          <p>
            Przełom w sprawie organizatorów ayahuaskowych ceremonii w 2020 roku nastąpił dzięki policyjnej technice operacyjnej. Telefon Kordysa był na stałym podsłuchu, a funkcjonariusze słuchali na żywo, gdy w dniu 24.08.2020 r. doszło do nerwowej wymiany zdań pomiędzy Badowskim i Kordysem.
          </p>

          <CaseFile title="Rekonstrukcja rozmowy (Uzasadnienie Sądu)" type="transcript">
            „oskarżony J. K. omawia z B., że dotarła do niego informacja, że w obiekcie w Janovie zmarła jakaś kobieta”.
          </CaseFile>

          <p>
            W rozmowie pojawia się też wątek zagrożenia ze strony osoby trzeciej – mężczyźni omawiają szantażystę, który chce iść na policję. Kordys wprost pyta wspólnika: „W jakim zagrożeniu jest nasza praca?”
          </p>

          <div className="my-8 pl-6 border-l-4 border-stone-900 font-serif italic text-xl text-stone-800">
            „Z ich rozmowy wynika, że nie zajmowali  się w zasadzie samym faktem śmierci, lecz raczej obawą, aby to nie przyciągnęło uwagi policji.”
          </div>

          <p>
            Dla sądu był to koronny dowód na to, że oskarżeni prowadzili nielegalny biznes, a nie działalność duchową – śmierć człowieka była dla nich jedynie „psuciem interesów”.
          </p>

          <CaseFile title="Kontynuacja rozmowy" type="transcript">
            „Następnie w rozmowie omawiają zamówienia «herbaty» z dżungli i to, czy im tego «nie zepsują», ekscytując się nagraniem od dostawcy, który «siedzi w dżungli i gotuje».”
          </CaseFile>

          <p>
            Zaledwie dwa dni po tym telefonie, 26.08.2020 czescy policjanci weszli do posiadłości w Janovie. Efekty rewizji opisano w wyroku Kordysa:
          </p>

          <CaseFile title="Protokół rewizji">
            „w nieruchomości zabezpieczono rzeczy... oprócz marihuany zabezpieczono również substancje zawierające DMT o objętości ok. 2 kg”.
          </CaseFile>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Cena wolności</h2>

          <p>
            15 października 2020 roku sielankę w Hermanovicach przerwał huk granatów ogłuszających. Czeska jednostka antyterrorystyczna wdarła się do budynku, rzucając na ziemię Kordysów.
          </p>

          <ArticleVideoPlayer
            src={`${PINATA_GATEWAY}/${ARREST_VIDEO_CID}/videoplayback.m3u8`}
            poster=""
          />

          <p>
            Bartosz „Badi” Badowski wybrał strategię, która miała uchronić go przed wieloletnim więzieniem – ugodę (Dohoda o vině a trestu). Na mocy wyroku z dnia 2 listopada 2021 roku został uznany winnym, ale otrzymał wyrok w zawieszeniu. Jarosław Kordys otrzymał 8,5 roku bezwzględnego więzienia.
          </p>

          <CaseFile title="Ustalenia wyroku skazującego Bartosza B.">
            „co najmniej od bliżej nieustalonej daty w 2015 roku do 26.08.2020 [...] oferował, organizował i co najmniej w 441 przypadkach zrealizował w nieregularnych odstępach cztero- i dziesięciodniowe pobyty [...] udostępnił uczestnikom do użycia [...] ayahuascę oraz marihuanę”.
          </CaseFile>

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Kiciński i „Błąd z Badim”</h2>

          <p>
            Michał Kiciński wiedział o tragedii. W październiku 2023 roku miliarder stanął przed polską policją w charakterze świadka. Wcześniej, w mailu do autora zawiadomienia, pisał:
          </p>

          <CaseFile title="Wiadomość prywatna od M. Kicińskiego" type="email">
            „(...) Tak mogę zapłacić za swój błąd z Badim. Podaj mi Fundacje lub Stowarzyszenie [...] i wpłacę tam dobrowolnie kwotę darowizny, w ramach Przeprosin wszechświatowi, za moją młodzieńczą naiwność i brak przenikliwości. (...)”
          </CaseFile>

          <p>
            Zaledwie 12 dni po kłopotliwym przesłuchaniu, Kiciński przekazał Janov w formie darowizny stowarzyszeniu zarządzanemu przez Krzysztofa Stefanka – człowieka, który był częścią procederu.
          </p>

          <TransactionStamp
            label="Nr Transakcji (Katastr)"
            value="V-5821/2023-127"
            subDetails="Obręb: Janov u Krnova [656976]"
          />

          <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b border-stone-200 pb-2">Nýdek</h2>

          <p>
            W miejscowości Nýdek funkcjonował kolejny ośrodek, którego właścicielem w czasie trwania nielegalnych ceremonii był drugi z duetu miliarderów – <strong>Marcin Iwiński</strong>.
          </p>

          <LocationStamp
            name="NÝDEK"
            code="708186"
            plot="st. 506/1"
            lv="832"
            onClick={() => openGallery('nydek')}
          />

          <p>
            Iwiński sprzedał posiadłość szamanowi Piotrowi Bonawenturze Traczowi krótko po tym, jak aresztowano Kordysów, wpisując się w schemat wycofywania się z infrastruktury powiązanej z ayahuaskowym podziemiem.
          </p>

          <TransactionStamp
            label="Nr Transakcji (Katastr)"
            value="V-2937/2021-832"
            subDetails="Obręb: Nýdek [708186]"
          />

          <div className="mt-8 mb-4 flex justify-end">
            <div className="text-right">
              <span className="block font-bold text-stone-900">Marlow</span>
            </div>
          </div>
        </div>

        <footer className="mt-4 pt-8 border-t border-stone-200 font-sans">
          <h3 className="text-xl font-bold text-stone-900 uppercase tracking-widest flex items-center gap-2 mb-4">
            <Search className="w-5 h-5" /> Dokumenty Źródłowe
          </h3>
          <div className="grid gap-4 text-sm">
            <a href={KORDYS_PDF_URL} target="_blank" className="p-3 bg-white border border-stone-200 flex justify-between items-center hover:bg-stone-50 transition-colors">
              <span>Wyrok Jarosława Kordysa (30 T 5/2020)</span>
              <FileText className="w-4 h-4 text-stone-400" />
            </a>
            <a href={BADI_PDF_URL} target="_blank" className="p-3 bg-white border border-stone-200 flex justify-between items-center hover:bg-stone-50 transition-colors">
              <span>Wyrok Bartosza Badowskiego (66 T 146/2021)</span>
              <FileText className="w-4 h-4 text-stone-400" />
            </a>
            <a href="https://kutasinskigate.eth.limo" target="_blank" className="mt-8 text-center block text-stone-400 font-mono text-xs hover:text-stone-900 transition-colors">
              <ShieldCheck className="w-4 h-4 inline mr-2" />
              kutasinskigate.eth.limo
            </a>
            <div className="mt-4 text-center text-[10px] text-stone-300 font-mono">
              marlow.contact@proton.me
            </div>
          </div>
        </footer>
      </article>

      <GalleryModal isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} data={galleryData} />
      <EvidenceAudioModal isOpen={isAudioOpen} onClose={() => setIsAudioOpen(false)} src="/evidence/stefan-nagranie.mp3" />
    </main>
  );
}
