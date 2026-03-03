import React from 'react';
import type { Metadata } from 'next';
import { Scale, Search, ShieldCheck, Globe, FileText, Download, Calendar, History, ExternalLink } from 'lucide-react';

const PINATA_GATEWAY = "https://yellow-elegant-porpoise-917.mypinata.cloud/ipfs";
const KORDYS_IMAGES_URL = "/gallery/wyrok_kordysa";
const BADI_IMAGES_URL = "/gallery/wyrok_badi";
const NYDEK_IMAGES_URL = "/gallery/nydek";
const JANOV_IMAGES_URL = "/gallery/janov";
const VIDEO_CID = "bafybeifkquvqp6cewygbgoqsm3vm6kni3d4wy6medzc7nbsczziswmmv7u";
const ARREST_VIDEO_CID = "bafybeickwaxlebikfa2aax7mwk7xnp56n6vqmnw7mafponnztlzinf73iy";

const KORDYS_PDF_URL = `${PINATA_GATEWAY}/bafybeibzxfsg5s4jkiuf2kzmbdtmfutfjk75ej5zrpt2igan4aldvqc3oq`;
const BADI_PDF_URL = `${PINATA_GATEWAY}/bafkreietkosain6ftde7f3li5ic34qhkwuglz2tu2kfcpbvrwhslskhwza`;
const MUNAY_WAYBACK_URL = "https://web.archive.org/web/20230607033503/https://munaysonqo.com/retreats/";

const VIDEO_ARREST_METADATA = {
  name: "Nalot policji na ośrodek ayahuaski w Hermanovicach",
  description: "Pełna dokumentacja policyjnej interwencji i aresztowania grupy organizującej nielegalne ceremonie ayahuaski.",
  thumbnailUrl: `${JANOV_IMAGES_URL}/janov1.jpg`,
  contentUrl: `${PINATA_GATEWAY}/${ARREST_VIDEO_CID}/videoplayback.m3u8`,
  uploadDate: "2020-10-15T09:00:00+01:00",
};

const VIDEO_STEFANEK_METADATA = {
  name: "Wyznania Krzysztofa Stefanka o przejęciu Janówa",
  description: "Relacja dotycząca darowizny nieruchomości w Janowie od Michała Kicińskiego.",
  thumbnailUrl: `${JANOV_IMAGES_URL}/janov2.jpg`,
  contentUrl: `${PINATA_GATEWAY}/${VIDEO_CID}/YTDowncom_YouTube_Media_4Xujw-krjxs_001_1080p-1.m3u8`,
  uploadDate: "2024-11-01T12:00:00+01:00",
};

const BrandHeader = () => {
  return (
    <div className="w-full pb-2 mb-2 flex flex-col items-center">
      <div className="flex items-center justify-center w-[98%] mx-auto pb-2">
        <h1 className="text-5xl md:text-[6.5rem] font-black tracking-tighter text-stone-950 uppercase font-serif leading-none whitespace-nowrap">
          NASZA GAZETKA
        </h1>
      </div>
      <div className="w-[98%] mx-auto border-y-[3px] border-stone-950 py-1.5 flex items-center justify-between px-4 text-[10px] md:text-sm font-bold uppercase tracking-[0.1em] text-stone-700">
        <div className="flex items-center gap-2">
          <span className="grayscale">📰</span>
          <span className="hidden sm:inline">Niezależne Media Śledcze</span>
        </div>
        <div className="text-center font-serif font-black">
          NIEDZIELA, 1 MARCA 2026
        </div>
        <div className="flex items-center gap-2">
          <span className="grayscale">📄</span>
          <span className="hidden md:inline border-l-2 border-stone-950 pl-2 ml-1">Wydanie Specjalne</span>
        </div>
      </div>
    </div>
  );
};

const CaseFile = ({ title, children, type = '📄' }: { title: string, children: React.ReactNode, type?: string }) => (
  <div className="my-8 border border-stone-300 bg-stone-100/30 shadow-sm rounded-sm overflow-hidden break-inside-avoid text-left">
    <div className="bg-stone-200/80 border-b border-stone-300 px-4 py-2 flex items-center gap-2 text-xs font-mono text-stone-600 uppercase tracking-wider">
      <span>{type === 'transcript' ? '🎙️' : type === 'email' ? '✉️' : '📄'}</span>
      <span>{title}</span>
    </div>
    <div className="p-6 font-mono text-sm md:text-base leading-relaxed text-stone-900 italic">
      {children}
    </div>
  </div>
);

const PullQuote = ({ quote, author, source }: { quote: string, author: string, source: string }) => (
  <div className="my-10 pl-6 border-l-[4px] border-red-900 text-left">
    <p className="font-serif text-xl md:text-2xl italic text-stone-950 leading-relaxed mb-3">
      „{quote}"
    </p>
    <div className="font-sans text-[10px] uppercase tracking-widest text-stone-500">
      — <span className="font-bold text-stone-800">{author}</span>, {source}
    </div>
  </div>
);

const LocationStampUI = ({ name, plot, lv, code }: { name: string, plot: string, lv: string, code?: string }) => (
  <div className="relative border border-blue-900/20 bg-blue-50/30 p-1 pr-6 rounded-sm flex items-center gap-4 shadow-[2px_2px_0px_0px_rgba(30,58,138,0.1)] text-left group">
      <div className="absolute top-1 right-1 text-blue-900/30">
        🔍
      </div>
      <div className="bg-blue-900/10 h-full p-3 flex items-center justify-center border-r border-blue-900/20 border-dashed">
         <span className="text-xl grayscale">🏠</span>
      </div>
      <div className="py-2">
         <div className="text-[9px] uppercase tracking-[0.2em] text-blue-900 font-bold mb-1 flex items-center gap-2">
           {name} {code && `[${code}]`}
         </div>
         <div className="font-mono text-base font-bold text-stone-900">LV {lv}</div>
         <div className="text-[10px] text-stone-500 font-mono mt-1">
           Rejestr: {plot}
         </div>
      </div>
  </div>
);

const TransactionStampUI = ({ label, value, subDetails }: { label: string, value: string, subDetails?: string }) => (
  <div className="relative border border-stone-300 bg-stone-50 p-1 pr-6 rounded-sm flex items-center gap-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)] group text-left">
      <div className="absolute top-1 right-1 text-stone-300">
        🔍
      </div>
      <div className="bg-stone-200 h-full p-3 flex items-center justify-center border-r border-stone-300 border-dashed">
         <span className="text-xl grayscale">📜</span>
      </div>
      <div className="py-2">
         <div className="text-[9px] uppercase tracking-[0.2em] text-stone-500 font-bold mb-1">{label}</div>
         <div className="font-mono text-base font-bold text-stone-950">{value}</div>
         {subDetails && <div className="text-[10px] text-stone-400 font-mono mt-1">{subDetails}</div>}
      </div>
  </div>
);

const ArticleVideoPlayer: React.FC<{ src: string; poster: string }> = ({ src, poster }) => {
  return (
    <div className="my-12 w-full bg-stone-950 rounded-sm shadow-2xl overflow-hidden border border-stone-800">
      <video controls poster={poster} className="w-full h-auto block opacity-80">
        <source src={src} type="application/x-mpegURL" />
        Błąd odtwarzania materiału dowodowego.
      </video>
    </div>
  );
};

const ElixirModalsProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;

const GalleryTrigger = ({ children, className }: { children: React.ReactNode, className?: string, type?: string }) => (
  <span className={className || "cursor-pointer"}>{children}</span>
);

export const metadata: Metadata = {
  title: "Śledztwo: Michał Kiciński i Tajemnica Janova",
  description: "Dokumentacja śledztwa dziennikarskiego. Dowody, nagrania i treści wyroków.",
};

export default function Page() {
  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": "Eliksir Wiedźmina – Śledztwo",
    "author": [{ "@type": "Person", "name": "Detektyw Polutek" }]
  };

  return (
    <ElixirModalsProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }}
      />

      <main className="min-h-screen bg-[#fcfbf9] text-stone-950 selection:bg-red-100 font-serif flex flex-col items-center">
        <div className="w-full max-w-5xl border-x border-black bg-[#fcfbf9] min-h-screen flex flex-col shadow-2xl">
          
          <BrandHeader />

          <header className="pt-8 pb-8 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="mb-8">
                <span className="block text-5xl md:text-7xl font-bold leading-none tracking-tight text-stone-950">
                  Eliksir Wiedźmina
                </span>
                <span className="block text-2xl md:text-4xl text-stone-600 italic font-medium mt-6 max-w-3xl mx-auto">
                  Mroczna tajemnica twórców CD Projekt
                </span>
              </h1>

              <div className="max-w-2xl mx-auto border-y border-stone-200 py-8 px-4">
                <p className="text-xl md:text-2xl text-stone-800 leading-relaxed italic">
                  Ayahuasca, policyjne naloty i tragedia, o której nie miał się nikt dowiedzieć. Publicznie dostępne akta ujawniają kulisy finansowania szamańskiego podziemia.
                </p>
              </div>
            </div>
          </header>

          <article className="max-w-2xl mx-auto px-4 pt-8 pb-0 flex-grow">
            <div className="prose prose-stone prose-lg max-w-none prose-headings:text-stone-950
              prose-a:text-stone-950 prose-a:font-bold prose-a:no-underline prose-a:underline prose-a:decoration-blue-900/30 hover:prose-a:bg-blue-50 transition-colors">

              <p className="first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-stone-950 leading-relaxed">
                W 2020 roku media obiegły doniesienia o rozbiciu grupy polskich szamanów w czeskich Hermanovicach. Policyjny nalot, aresztowanie Jarosława i Karoliny Kordysów, a następnie surowe wyroki – 8,5 oraz 5,5 roku więzienia.
              </p>

              <p>
                Ayahuaska to tradycyjny wywar z amazońskich roślin o silnym działaniu halucynogennym. Ze względu na wysoką zawartość DMT jej posiadanie i podawanie jest surowo zabronione.
              </p>

              <h2 className="text-3xl mt-16 mb-8 tracking-tight border-b border-stone-300 pb-2">Świadek B.</h2>

              <p>
                W uzasadnieniu <GalleryTrigger type="wyrok_kordys" className="font-bold underline decoration-red-900/30 hover:bg-red-50 transition-colors">wyroku</GalleryTrigger> Jarosława Kordysa pojawia się postać świadka Bartosza B.
              </p>

              <CaseFile title="Zeznania świadka B.">
                &quot;Świadek B. odnośnie osoby oskarżonego oświadczył, że zna się z nim ok. 8 lat, a poznali się w Holandii&quot;.
              </CaseFile>

              <div className="my-8 flex justify-start">
                <GalleryTrigger type="janov">
                  <LocationStampUI
                    name="JANOV U KRNOVA"
                    code="656976"
                    plot="st. 281"
                    lv="127"
                  />
                </GalleryTrigger>
              </div>

              <p>
              Pobrany dokument nie pozostawia wątpliwości: w latach 2012–2023 współwłaścicielami nieruchomości byli:
                 <br/>
                 Bartosz Badowski (10%)
                 <br/>
                 <span className="bg-amber-100/80 px-1 font-bold text-stone-950 box-decoration-clone">Michał Dawid Kiciński (90%)</span>
              </p>

              <p>
                Drugie imię – Dawid – idealnie wypełnia lukę w zanonimizowanym skrócie &quot;Michal D. K.&quot;. <span className="bg-stone-200/50 px-1 font-bold text-stone-950 shadow-sm box-decoration-clone">Wspólnikiem szamana był twórca &quot;Wiedźmina&quot; – jeden z najbogatszych Polaków.</span>
              </p>

              <h2 className="text-3xl mt-16 mb-8 tracking-tight border-b border-stone-300 pb-2 text-red-900">Na podsłuchu</h2>

              <p>
                Telefon Kordysa był na stałym podsłuchu. 24.08.2020 r. doszło do nerwowej wymiany zdań. Sąd w uzasadnieniu wyroku precyzyjnie rekonstruuje ten moment:
              </p>

              <CaseFile title="Podsłuch: Operacja Janov" type="transcript">
                &quot;oskarżony omawia z B., że w obiekcie w Janowie <span className="underline decoration-red-800 decoration-4 underline-offset-4 font-bold">zmarła jakaś kobieta</span>&quot;.
              </CaseFile>

              <div className="my-12 pl-6 border-l-4 border-stone-950 font-serif italic text-xl text-stone-800">
                &quot;Z ich rozmowy wynika, że nie zajmowali się faktem śmierci, lecz obawą, aby to nie przyciągnęło uwagi policji.&quot;
              </div>

              <h2 className="text-3xl mt-16 mb-8 tracking-tight border-b border-stone-300 pb-2">Cena wolności</h2>

              <div className="my-12 w-full rounded-sm overflow-hidden shadow-2xl">
                 <ArticleVideoPlayer
                   src={`${PINATA_GATEWAY}/${ARREST_VIDEO_CID}/videoplayback.m3u8`}
                   poster=""
                 />
              </div>

              <div className="my-12 flex gap-4 p-5 bg-blue-50 border-l-4 border-blue-900 rounded-r-lg shadow-sm">
                <Scale className="w-8 h-8 text-blue-900 shrink-0 mt-1" />
                <div>
                  <strong className="block font-serif text-blue-950 text-lg font-bold mb-1">Dohoda o vině a trestu</strong>
                  <div className="text-blue-900/80 text-lg leading-relaxed">
                    Ugoda o winie i karze. Strategia, która pozwoliła Badowskiemu &quot;kupić&quot; sobie wolność i uniknąć publicznego krzyżowego ognia pytań.
                  </div>
                </div>
              </div>

              <p>
                 Na mocy <GalleryTrigger type="wyrok_badi" className="font-bold underline decoration-blue-900/30 hover:bg-blue-50 transition-colors">wyroku</GalleryTrigger> z dnia 2 listopada 2021 roku Bartosz Badowski został uznany winnym.
              </p>

              <h2 className="text-3xl mt-16 mb-8 tracking-tight border-b border-stone-300 pb-2 text-red-900">&quot;Błąd z Badim&quot;</h2>

              <div className="my-12 flex flex-col items-center">
                <GalleryTrigger type="wezwanie_kicinski">
                  <img
                    src={`${KORDYS_IMAGES_URL}/wezwanie/wezwanie_kicinski.png`}
                    alt="Dowód: Wezwanie"
                    className="w-48 grayscale hover:grayscale-0 rounded shadow-2xl border border-stone-300 cursor-pointer transition-all"
                  />
                </GalleryTrigger>
                <p className="text-xs text-stone-500 mt-2 font-mono uppercase tracking-widest text-center">
                  Skan wezwania WD-I-3186/23
                </p>
              </div>

              <CaseFile title="Poufna wiadomość: M. Kiciński" type="email">
                &quot;(...) Tak mogę zapłacić za swój błąd z Badim. (...) w ramach Przeprosin wszechświatowi, za moją młodzieńczą naiwność...&quot;
              </CaseFile>

              <h2 className="text-3xl mt-16 mb-8 tracking-tight border-b border-stone-300 pb-2">Kalendarium Upadku</h2>

              <ul className="list-none space-y-12 my-12 font-mono text-sm border-l-2 border-stone-300 pl-4">
                <li className="flex items-start gap-3 opacity-60">
                  <Calendar className="w-5 h-5 text-stone-500 shrink-0" />
                  <div><span className="font-bold">21.09.2023</span> – Odebranie wezwania.</div>
                </li>
                <li className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-blue-900 shrink-0 mt-3" />
                  <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-sm shadow-sm w-full relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-900"></div>
                    <span className="font-bold text-blue-950">23.10.2023</span> – Nagła decyzja o darowiźnie majątku wartego miliony. Pozbycie się &quot;gorącego kartofla&quot;.
                  </div>
                </li>
              </ul>

              <div className="my-8 flex justify-start">
                 <TransactionStampUI
                  label="Akt Własności (V-5821/2023)"
                  value="V-5821/2023-127"
                  subDetails="Janov u Krnova [656976]"
                />
              </div>

              <h2 className="text-3xl mt-16 mb-8 tracking-tight border-b border-stone-300 pb-2">Wiktor B.</h2>

              <p>
                6 maja 2024 roku Prokuratura wszczyna śledztwo. Kilka miesięcy później, in tajemniczych okolicznościach, umiera Wiktor B. Ciało odnaleziono in magazynie. Śledztwo pozostaje zawieszone.
              </p>

              <div className="mt-8 mb-4 flex justify-end">
                 <div className="text-right border-r-4 border-stone-900 pr-4">
                    <span className="block font-bold text-stone-950 uppercase tracking-tighter">Detektyw Polutek</span>
                    <span className="block text-xs text-stone-500 font-sans mt-1">Szyfrowany: detektyw.polutek@proton.me</span>
                 </div>
              </div>

              <div className="my-12 border-y-2 border-stone-950 py-8">
                 <h3 className="font-sans font-bold text-lg uppercase tracking-widest text-stone-950 mb-8 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-red-900" />
                    Status Operacyjny (2025/2026)
                 </h3>

                 <div className="grid gap-px bg-stone-300 border border-stone-300">
                    <div className="bg-[#fcfbf9] p-4 flex justify-between items-center">
                       <span className="font-serif text-stone-900">Śledztwo: Organizacja ceremonii</span>
                       <span className="font-mono text-xs font-bold bg-stone-200 px-3 py-1">3013-1.Ds.15.2024</span>
                    </div>
                    <div className="bg-[#fcfbf9] p-4 flex justify-between items-center border-t border-stone-200">
                       <span className="font-serif text-red-900 font-bold">Śledztwo: Śmierć Ilony L.-H.</span>
                       <span className="font-mono text-xs font-bold bg-red-100 text-red-900 px-3 py-1">3013-1.Ds.4.2026</span>
                    </div>
                 </div>
              </div>
            </div>

            <footer className="mt-4 pt-8 border-none font-sans">
               <div className="mb-8">
                 <h3 className="text-xl font-bold text-stone-950 uppercase tracking-widest flex items-center gap-2 mb-4">
                   <Search className="w-5 h-5" /> Archiwum Dowodowe
                 </h3>
                 <div className="border-b border-stone-950 w-full mb-6"></div>
               </div>

               <div className="grid gap-4 text-sm">
                 <div className="p-3 bg-white border border-stone-300 hover:border-blue-900 transition-colors shadow-sm">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-stone-900">Wyrok: J. Kordys</h4>
                        <p className="font-mono text-[10px] text-stone-400">Sygn. 30 T 5/2020</p>
                      </div>
                      <a href={KORDYS_PDF_URL} className="bg-stone-950 text-white px-4 py-2 text-xs font-bold rounded-sm flex items-center gap-2">
                        <FileText className="w-3 h-3" /> POBIERZ AKT
                      </a>
                    </div>
                 </div>

                 <div className="mt-16 text-center pb-12">
                  <div className="w-24 h-px bg-stone-300 mx-auto mb-6"></div>
                  <div className="mb-10 bg-blue-900 text-white p-6 rounded-sm shadow-2xl">
                    <h3 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-blue-300" /> Weryfikacja Zdecentralizowana
                    </h3>
                    <p className="text-xs text-blue-100/70 mb-4 leading-relaxed max-w-lg mx-auto font-mono">
                      DOWODY ARCHIWIZOWANE W SIECI IPFS/ARWEAVE. MATERIAŁ NIEUSUWALNY.
                    </p>
                    <div className="flex flex-col gap-2 font-mono text-[10px] uppercase">
                      <a href="#" className="hover:text-blue-300 underline">IPFS: Baza Dowodowa (Full)</a>
                      <a href="#" className="hover:text-blue-300 underline">GitHub: Source Mirror</a>
                    </div>
                  </div>

                  <p className="text-xs text-stone-400 font-mono uppercase tracking-widest mb-2">
                    Oficjalna Witryna Projektu
                  </p>
                  <a href="https://www.eliksir-wiedzmina.pl" className="font-mono text-sm text-stone-950 font-bold underline decoration-stone-300">
                    www.eliksir-wiedzmina.pl
                  </a>
               </div>
            </footer>
          </article>
        </div>
      </main>
    </ElixirModalsProvider>
  );
}
