import React from 'react';
import type { Metadata } from 'next';
import { Scale, Search, ShieldCheck, Globe, FileText, Download, Calendar, History, ExternalLink } from 'lucide-react';

// --- DATA ---
const PINATA_GATEWAY = "https://yellow-elegant-porpoise-917.mypinata.cloud/ipfs";
const KORDYS_IMAGES_URL = "/gallery/wyrok_kordysa";
const BADI_IMAGES_URL = "/gallery/wyrok_badi";
const NYDEK_IMAGES_URL = "/gallery/nydek";
const JANOV_IMAGES_URL = "/gallery/janov";
const VIDEO_CID = "bafybeifkquvqp6cewygbgoqsm3vm6kni3d4wy6medzc7nbsczziswmmv7u";
const ARREST_VIDEO_CID = "bafybeickwaxlebikfa2aax7mwk7xnp56n6vqmnw7mafponnztlzinf73iy";

const KORDYS_PDF_URL = `${PINATA_GATEWAY}/bafybeibzxfsg5s4jkiuf2kzmbdtmfutfjk75ej5zrpt2igan4aldvqc3oq`;
const BADI_PDF_URL = `${PINATA_GATEWAY}/bafkreietkosain6ftde7f3li5ic34qhkwuglz2tu2kfcpbvrwhslskhwza`;

const VIDEO_ARREST_METADATA = {
  name: "Nalot policji na ośrodek ayahuaski w Hermanovicach",
  description: "Pełna dokumentacja policyjnej interwencji i aresztowania grupy organizującej nielegalne ceremonie ayahuaski. Materiał dowodowy w sprawie Jarosława Kordysa.",
  thumbnailUrl: `${JANOV_IMAGES_URL}/janov1.jpg`,
  contentUrl: `${PINATA_GATEWAY}/${ARREST_VIDEO_CID}/videoplayback.m3u8`,
  uploadDate: "2020-10-15T09:00:00+01:00",
};

const VIDEO_STEFANEK_METADATA = {
  name: "Wyznania Krzysztofa Stefanka o przejęciu Janówa",
  description: "Relacja z pierwszej ręki dotycząca darowizny nieruchomości w Janowie od Michała Kicińskiego dla Stowarzyszenia Natury Zew.",
  thumbnailUrl: `${JANOV_IMAGES_URL}/janov2.jpg`,
  contentUrl: `${PINATA_GATEWAY}/${VIDEO_CID}/YTDowncom_YouTube_Media_4Xujw-krjxs_001_1080p-1.m3u8`,
  uploadDate: "2024-11-01T12:00:00+01:00",
};

// --- COMPONENTS ---

const BrandHeader = () => {
  return (
    <div className="w-full pt-6 pb-4 mb-8 flex flex-col items-center border-b-[1px] border-[#c4b99a]">
      {/* Kontener ograniczający szerokość do tekstu */}
      <div className="inline-flex flex-col items-center">
        <h1 className="text-5xl md:text-[6.5rem] font-black tracking-tighter text-[#1c1917] uppercase font-serif leading-none">
          NASZA GAZETKA
        </h1>
        
        {/* Paski pod napisem o szerokości napisu */}
        <div className="w-full border-y-[3px] border-[#1c1917] py-1 mt-2 flex items-center justify-between px-1 text-[10px] md:text-sm font-bold uppercase tracking-[0.1em] text-[#1c1917]">
          <div className="flex items-center gap-2">
            <span>📰</span>
            <span className="hidden sm:inline">Niezależne Media</span>
          </div>
          <div className="text-center font-serif px-4">
            NIEDZIELA, 1 MARCA 2026
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline font-mono">Nr 01</span>
            <span>📄</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const CaseFile = ({ title, children, type = '📄' }: { title: string, children: React.ReactNode, type?: string }) => (
  <div className="my-8 border border-[#c4b99a] bg-[#e8e0cc]/40 shadow-[4px_4px_0px_0px_rgba(61,43,31,0.1)] rounded-sm overflow-hidden break-inside-avoid text-left">
    <div className="bg-[#c4b99a] px-4 py-1.5 flex items-center gap-2 text-[11px] font-mono text-[#1c1917] uppercase tracking-widest font-bold">
      <span>{type === 'transcript' ? '🎙️' : type === 'email' ? '✉️' : '📄'}</span>
      <span>{title}</span>
    </div>
    <div className="p-6 font-mono text-sm md:text-base leading-relaxed text-[#1c1917] italic">
      {children}
    </div>
  </div>
);

const PullQuote = ({ quote, author, source }: { quote: string, author: string, source: string }) => (
  <div className="my-12 pl-6 border-l-[4px] border-[#722f37] text-left bg-[#e8e0cc]/20 py-4 pr-4">
    <p className="font-serif text-xl md:text-2xl italic text-[#1c1917] leading-relaxed mb-3">
      „{quote}"
    </p>
    <div className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#8a7a62]">
      — <span className="font-bold text-[#722f37]">{author}</span>, {source}
    </div>
  </div>
);

const LocationStampUI = ({ name, plot, lv, code }: { name: string, plot: string, lv: string, code?: string }) => (
  <div className="relative border-2 border-[#3d2b1f] bg-[#e4dbbe] p-2 pr-8 rounded-sm flex items-center gap-4 shadow-[3px_3px_0px_0px_#3d2b1f] text-left group">
     <div className="absolute top-1 right-1 text-[#722f37] opacity-60">
       🔍
     </div>
     <div className="bg-[#3d2b1f] text-[#e4dbbe] h-full p-3 flex items-center justify-center border-r-2 border-[#3d2b1f] border-dashed">
        <span className="text-xl">🏠</span>
     </div>
     <div className="py-1">
        <div className="text-[9px] uppercase tracking-[0.2em] text-[#722f37] font-black mb-1 flex items-center gap-2">
          {name} {code && `[${code}]`}
        </div>
        <div className="font-mono text-lg font-black text-[#1c1917] leading-none">LV {lv}</div>
        <div className="text-[10px] text-[#3d2b1f] font-mono mt-1 uppercase font-bold">
          Działka: {plot}
        </div>
     </div>
  </div>
);

const ArticleVideoPlayer: React.FC<{ src: string; poster: string }> = ({ src, poster }) => {
  return (
    <div className="my-12 w-full bg-[#1c1917] rounded-sm shadow-[8px_8px_0px_0px_#c4b99a] overflow-hidden border-4 border-[#3d2b1f]">
      <video controls poster={poster} className="w-full h-auto block grayscale contrast-125 mix-blend-screen opacity-90">
        <source src={src} type="application/x-mpegURL" />
        Twoja przeglądarka nie obsługuje odtwarzacza wideo.
      </video>
    </div>
  );
};

const GalleryTrigger = ({ children, className }: { children: React.ReactNode, className?: string, type?: string }) => (
  <span className={className || "cursor-pointer"}>{children}</span>
);

export const metadata: Metadata = {
  title: "Michał Kiciński, Ayahuasca i Tajemnicza Śmierć w Janovie",
  description: "Pełna dokumentacja śledztwa dziennikarskiego w sprawie ceremonii ayahuaski.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#e4dbbe] text-[#1c1917] selection:bg-[#722f37] selection:text-white font-serif flex flex-col items-center overflow-x-hidden">
      <BrandHeader />

      <main className="w-full max-w-4xl px-4 flex flex-col">
        <header className="py-8 text-center border-b border-[#c4b99a] mb-12">
            <h1 className="mb-6">
              <span className="block text-5xl md:text-8xl font-black leading-none tracking-tighter text-[#1c1917] uppercase">
                Eliksir Wiedźmina
              </span>
              <span className="block text-xl md:text-3xl text-[#722f37] italic font-bold mt-4 tracking-tight">
                Mroczna tajemnica twórców CD Projekt
              </span>
            </h1>

            <div className="max-w-2xl mx-auto border-t-[3px] border-double border-[#3d2b1f] pt-8">
              <p className="text-xl md:text-2xl text-[#1c1917] leading-relaxed italic font-medium">
                Ayahuasca, policyjne naloty i tragedia, o której nie miał się nikt dowiedzieć. Publicznie dostępne akta i rejestry ujawniają, jak twórcy gry „Wiedźmin” finansowali szamańskie podziemie.
              </p>
            </div>
        </header>

        <article className="max-w-2xl mx-auto pb-24">
          <div className="prose prose-stone prose-lg max-w-none 
            prose-headings:text-[#1c1917] prose-headings:font-serif prose-headings:uppercase prose-headings:tracking-tighter
            prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-[#1c1917] prose-a:font-bold prose-a:underline prose-a:decoration-double prose-a:decoration-[#b8a880] hover:prose-a:bg-[#e8e0cc] transition-colors">

            <p className="first-letter:text-8xl first-letter:font-black first-letter:mr-4 first-letter:float-left first-letter:text-[#722f37] first-letter:leading-[0.8] leading-relaxed">
              W 2020 roku media obiegły doniesienia o rozbiciu grupy polskich szamanów w czeskich Hermanovicach. Policyjny nalot, aresztowanie Jarosława i Karoliny Kordysów, a następnie surowe wyroki – 8,5 oraz 5,5 roku więzienia za prowadzenie nielegalnego biznesu polegającego na organizacji tzw. &quot;ceremonii&quot;, podczas których klientom podawano egzotyczny psychodelik – ayahuaskę.
            </p>

            <p>
              Ayahuaska to tradycyjny wywar z amazońskich roślin o silnym działaniu halucynogennym. Ze względu na wysoką zawartość DMT jej posiadanie i podawanie jest zabronione. Ale czy to na pewno koniec tej historii? Analiza dokumentów prowadzi do zdumiewających wniosków.
            </p>

            <p className="font-bold border-l-4 border-[#722f37] pl-4 py-2 bg-[#e8e0cc]/30">
              W przygranicznym Janowie funkcjonował drugi, bliźniaczy ayahuaskowy ośrodek, którego współwłaścicielem okazał się miliarder – Michał Kiciński.
            </p>

            <h2 className="text-4xl mt-16 mb-8 border-b-2 border-[#1c1917] pb-2 font-black">Świadek B.</h2>

            <p>
              W uzasadnieniu <GalleryTrigger type="wyrok_kordys" className="font-bold underline decoration-double decoration-[#b8a880] hover:bg-[#c4b99a]">wyroku</GalleryTrigger> Jarosława Kordysa pojawia się postać świadka Bartosza B.
            </p>

            <CaseFile title="Zeznania świadka B.">
              &quot;Świadek B. odnośnie osoby oskarżonego oświadczył, że zna się z nim ok. 8 lat... potwierdził, że i on sam w przeszłości prowadził warsztaty, a obecnie sam jest przedmiotem dochodzenia policji w Krnowie właśnie z powodu ceremonii.&quot;
            </CaseFile>

            <p>
              Intrygujący fragment dotyczy własności &quot;bazy&quot;. Dokumenty stwierdzają:
            </p>

            <CaseFile title="Ustalenia Sądu" type="transcript">
              &quot;...w odniesieniu do nieruchomości będących współwłasnością Bartosza B. i Michała D. K.&quot;.
            </CaseFile>

            <div className="my-10 flex justify-center">
              <GalleryTrigger type="janov">
                <LocationStampUI
                  name="JANOV U KRNOVA"
                  code="656976"
                  plot="st. 281"
                  lv="127"
                />
              </GalleryTrigger>
            </div>

            <p className="text-center font-mono text-sm uppercase tracking-widest bg-[#3d2b1f] text-[#e4dbbe] py-2 px-4 shadow-md">
              Wspólnikiem szamana był twórca &quot;Wiedźmina&quot; – jeden z najbogatszych Polaków.
            </p>

            <h2 className="text-4xl mt-16 mb-8 border-b-2 border-[#1c1917] pb-2 font-black">Na podsłuchu</h2>

            <p>
              Telefon Kordysa był na podsłuchu. Sąd w uzasadnieniu wyroku precyzyjnie rekonstruuje moment, w którym dowiedzieli się o tragedii:
            </p>

            <CaseFile title="Rekonstrukcja rozmowy" type="transcript">
              &quot;oskarżony omawia z B., że dotarła do niego informacja, że w obiekcie w Janowie <span className="text-[#722f37] font-black underline decoration-[#722f37] decoration-2 underline-offset-4">zmarła jakaś kobieta</span>&quot;.
            </CaseFile>

            <div className="my-12 px-6 py-8 border-2 border-dashed border-[#722f37] font-serif italic text-2xl text-[#1c1917] bg-[#722f37]/5">
              &quot;Z ich rozmowy wynika, że nie zajmowali się w zasadzie samym faktem śmierci, lecz raczej obawą, aby to nie przyciągnęło uwagi policji.&quot;
            </div>

            <h2 className="text-4xl mt-16 mb-8 border-b-2 border-[#1c1917] pb-2 font-black">Cena wolności</h2>

            <div className="my-12">
               <ArticleVideoPlayer
                 src={`${PINATA_GATEWAY}/${ARREST_VIDEO_CID}/videoplayback.m3u8`}
                 poster=""
               />
               <div className="mt-2 text-[10px] text-[#1c1917] font-mono uppercase tracking-[0.3em] text-center font-bold">
                  *** Materiał Dowodowy: Operacja Hermanovice ***
               </div>
            </div>

            <p>
              Bartosz &quot;Badi&quot; Badowski wybrał strategię, która miała uchronić go przed więzieniem. Wybrał tzw. <span className="bg-[#722f37] text-white px-1 font-mono uppercase text-sm">Dohoda o vině a trestu</span>.
            </p>

            <CaseFile title="Wyrok Bartosza B." type="transcript">
              &quot;uznany winnym popełnienia zbrodni niedozwolonej produkcji... udostępnił uczestnikom ayahuascę zawierającą DMT w co najmniej 441 przypadkach...&quot;
            </CaseFile>

            <h2 className="text-4xl mt-16 mb-8 border-b-2 border-[#1c1917] pb-2 font-black">Kiciński</h2>

            <PullQuote
              quote="Po ayahuasce jest szansa na to, żeby sobie nie ściemniać."
              author="Michał Kiciński"
              source="Newsweek, 2016 r."
            />

            <h2 className="text-4xl mt-16 mb-8 border-b-2 border-[#1c1917] pb-2 font-black">&quot;Błąd z Badim&quot;</h2>

            <div className="my-12 flex flex-col items-center">
              <GalleryTrigger type="wezwanie_kicinski">
                <img
                  src={`${KORDYS_IMAGES_URL}/wezwanie/wezwanie_kicinski.png`}
                  alt="Wezwanie"
                  className="w-56 grayscale contrast-125 border-4 border-[#3d2b1f] shadow-[10px_10px_0px_0px_#c4b99a] cursor-pointer hover:scale-105 transition-transform"
                />
              </GalleryTrigger>
              <p className="text-[10px] text-[#722f37] mt-4 font-mono font-black uppercase tracking-widest">
                Exhibitum A: Wezwanie Prokuratorskie
              </p>
            </div>

            <CaseFile title="Wiadomość prywatna M. Kicińskiego" type="email">
              &quot;(...) Tak mogę zapłacić za swój błąd z Badim. Podaj mi Fundacje... wpłacę tam dobrowolnie kwotę darowizny, w ramach Przeprosin wszechświatowi, za moją młodzieńczą naiwność... (...)&quot;
            </CaseFile>

            <p className="text-xs font-mono text-[#8a7a62] uppercase tracking-tighter mt-12 border-t border-[#c4b99a] pt-4">
              Archiwum Gazetki Śledczej © 2026. Wszystkie materiały pochodzą z jawnych akt sądowych i rejestrów publicznych.
            </p>
          </div>
        </article>
      </main>
    </div>
  );
}
