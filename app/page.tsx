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

/* ─────────────────────────────────────────────
   DESIGN TOKENS – Modern Noir Detective
   Tło: krem #f8f5f0 (oryginał zachowany)
   Tekst: bliski czerni #0f0f0f
   Czerwień: #b8001f (głęboka karmazynowa)
   Ciemne powierzchnie: #161616
   ───────────────────────────────────────────── */

const BrandHeader = () => (
  <div className="w-full pb-0 mb-0 flex flex-col items-center border-b-2 border-[#0f0f0f]">
    {/* Top meta bar */}
    <div className="w-full bg-[#0f0f0f] text-[#f8f5f0] flex items-center justify-between px-4 py-1.5 text-[10px] font-mono uppercase tracking-[0.2em]">
      <span className="opacity-70">Niezależny Serwis Śledczy</span>
      <span className="opacity-50">⬥</span>
      <span className="opacity-70">Nr 01 / 2026</span>
    </div>
    {/* Masthead */}
    <div className="w-full flex items-center justify-center py-5 px-4 bg-[#f8f5f0]">
      <h1
        className="text-5xl md:text-[6rem] font-black tracking-tighter text-[#0f0f0f] uppercase leading-none whitespace-nowrap"
        style={{ fontFamily: '"Georgia", serif', letterSpacing: '-0.04em' }}
      >
        NASZA GAZETKA
      </h1>
    </div>
    {/* Date / divider bar */}
    <div className="w-full border-y border-[#0f0f0f] py-1.5 flex items-center justify-between px-4 text-[10px] font-mono uppercase tracking-[0.18em] text-[#0f0f0f] bg-[#f8f5f0]">
      <div className="flex items-center gap-3">
        <span className="w-2 h-2 bg-[#b8001f] rounded-full inline-block"></span>
        <span className="hidden sm:inline opacity-70">Śledztwo Dziennikarskie</span>
      </div>
      <div className="font-bold">Niedziela, 1 Marca 2026</div>
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline opacity-70">Dokumentacja Jawna</span>
        <span className="w-2 h-2 bg-[#b8001f] rounded-full inline-block"></span>
      </div>
    </div>
  </div>
);

/* ── Case File – ciemny header, mono body ── */
const CaseFile = ({ title, children, type = '📄' }: { title: string; children: React.ReactNode; type?: string }) => (
  <div className="my-8 border border-[#1c1c1c] overflow-hidden break-inside-avoid text-left shadow-[4px_4px_0px_0px_rgba(15,15,15,0.12)]">
    <div className="bg-[#161616] px-4 py-2.5 flex items-center gap-3 text-[10px] font-mono text-[#f8f5f0] uppercase tracking-[0.22em]">
      <span className="w-1.5 h-1.5 bg-[#b8001f] rounded-full shrink-0"></span>
      <span>{title}</span>
      <span className="ml-auto opacity-30">
        {type === 'transcript' ? 'TRANSKRYPT' : type === 'email' ? 'KORESPONDENCJA' : 'AKTA'}
      </span>
    </div>
    <div className="p-6 font-mono text-sm md:text-base leading-relaxed text-[#1c1c1c] italic bg-[#f8f5f0] border-l-4 border-[#b8001f]">
      {children}
    </div>
  </div>
);

/* ── Pull Quote – dramatyczna czerwień ── */
const PullQuote = ({ quote, author, source }: { quote: string; author: string; source: string }) => (
  <div className="my-12 relative pl-8 text-left">
    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#b8001f]"></div>
    <div className="absolute left-3 top-0 bottom-0 w-px bg-[#b8001f] opacity-30"></div>
    <p className="font-serif text-2xl md:text-3xl italic text-[#0f0f0f] leading-relaxed mb-4" style={{ fontFamily: '"Georgia", serif' }}>
      „{quote}"
    </p>
    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#4a4a4a]">
      — <span className="font-bold text-[#0f0f0f]">{author}</span>
      <span className="mx-2 text-[#b8001f]">|</span>
      {source}
    </div>
  </div>
);

/* ── Location Stamp ── */
const LocationStampUI = ({ name, plot, lv, code }: { name: string; plot: string; lv: string; code?: string }) => (
  <div className="relative border border-[#1c1c1c] bg-[#f8f5f0] flex items-center shadow-[3px_3px_0px_0px_rgba(15,15,15,0.15)] text-left group hover:shadow-[3px_3px_0px_0px_rgba(184,0,31,0.25)] transition-shadow">
    <div className="bg-[#161616] h-full px-4 py-4 flex items-center justify-center border-r border-[#1c1c1c]">
      <span className="text-[#f8f5f0] font-mono text-xs font-bold uppercase tracking-widest writing-mode-vertical">📍</span>
    </div>
    <div className="px-5 py-3 flex-1">
      <div className="text-[9px] uppercase tracking-[0.25em] text-[#b8001f] font-mono font-bold mb-1">
        Nieruchomość {code && <span className="text-[#4a4a4a]">[{code}]</span>}
      </div>
      <div className="font-mono text-base font-bold text-[#0f0f0f]">{name} — LV {lv}</div>
      <div className="text-[10px] text-[#4a4a4a] font-mono mt-0.5">Działka: {plot}</div>
    </div>
    <div className="px-4 text-[#b8001f] opacity-60 group-hover:opacity-100 transition-opacity">
      <Search className="w-4 h-4" />
    </div>
  </div>
);

/* ── Transaction Stamp ── */
const TransactionStampUI = ({ label, value, subDetails }: { label: string; value: string; subDetails?: string }) => (
  <div className="relative border border-[#1c1c1c] bg-[#f8f5f0] flex items-center shadow-[3px_3px_0px_0px_rgba(15,15,15,0.15)] text-left group hover:shadow-[3px_3px_0px_0px_rgba(184,0,31,0.25)] transition-shadow">
    <div className="bg-[#161616] h-full px-4 py-4 flex items-center justify-center border-r border-[#1c1c1c]">
      <span className="text-[#f8f5f0]">📜</span>
    </div>
    <div className="px-5 py-3 flex-1">
      <div className="text-[9px] uppercase tracking-[0.25em] text-[#b8001f] font-mono font-bold mb-1">{label}</div>
      <div className="font-mono text-base font-bold text-[#0f0f0f]">{value}</div>
      {subDetails && <div className="text-[10px] text-[#4a4a4a] font-mono mt-0.5">{subDetails}</div>}
    </div>
    <div className="px-4 text-[#b8001f] opacity-60 group-hover:opacity-100 transition-opacity">
      <FileText className="w-4 h-4" />
    </div>
  </div>
);

const ArticleVideoPlayer: React.FC<{ src: string; poster: string }> = ({ src, poster }) => (
  <div className="my-12 w-full bg-[#0f0f0f] border border-[#1c1c1c] shadow-[6px_6px_0px_0px_rgba(15,15,15,0.18)] overflow-hidden">
    <div className="bg-[#0f0f0f] px-4 py-2 flex items-center gap-2 border-b border-[#2a2a2a]">
      <span className="w-2 h-2 rounded-full bg-[#b8001f]"></span>
      <span className="w-2 h-2 rounded-full bg-[#4a4a4a]"></span>
      <span className="w-2 h-2 rounded-full bg-[#4a4a4a]"></span>
      <span className="ml-3 text-[10px] font-mono text-[#4a4a4a] uppercase tracking-widest">Materiał Operacyjny</span>
    </div>
    <video controls poster={poster} className="w-full h-auto block">
      <source src={src} type="application/x-mpegURL" />
      <a href={src} className="text-[#f8f5f0] underline">Pobierz plik</a>.
    </video>
  </div>
);

const ElixirModalsProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;

const GalleryTrigger = ({ children, className }: { children: React.ReactNode; className?: string; type?: string }) => (
  <span className={className || "cursor-pointer"}>{children}</span>
);

/* ── Section Divider ── */
const SectionDivider = () => (
  <div className="flex items-center gap-3 my-2">
    <span className="w-4 h-px bg-[#b8001f]"></span>
    <span className="w-1.5 h-1.5 bg-[#b8001f] rotate-45 inline-block"></span>
    <span className="flex-1 h-px bg-[#1c1c1c]"></span>
  </div>
);

export const metadata: Metadata = {
  title: "Michał Kiciński, Ayahuasca i Tajemnicza Śmierć w Janovie",
  description: "Pełna dokumentacja śledztwa dziennikarskiego w sprawie ceremonii ayahuaski. Dowody, nagrania i treści wyroków.",
  keywords: "Michał Kiciński, Jarosław Kordys, prokurator Jolanta Świdnicka, Janov, Ayahuasca, Eliksir Wiedźmina, śledztwo dziennikarskie",
};

export default function Page() {
  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": "Eliksir Wiedźmina – Śledztwo: Michał Kiciński i tajemnica Janova",
    "description": "Pełna dokumentacja śledztwa: Michał Kiciński, Jarosław Kordys i prokurator Jolanta Świdnicka. Ayahuasca, Janov i tragiczna śmierć uczestniczki.",
    "image": [`${KORDYS_IMAGES_URL}/wezwanie/wezwanie_kicinski.png`],
    "datePublished": "2024-03-03",
    "author": [{ "@type": "Person", "name": "Detektyw Polutek", "url": "mailto:detektyw.polutek@protonmail.com" }]
  };

  const videoArrestSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": VIDEO_ARREST_METADATA.name,
    "description": VIDEO_ARREST_METADATA.description,
    "thumbnailUrl": VIDEO_ARREST_METADATA.thumbnailUrl,
    "uploadDate": VIDEO_ARREST_METADATA.uploadDate,
    "contentUrl": VIDEO_ARREST_METADATA.contentUrl,
  };

  const videoStefanekSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": VIDEO_STEFANEK_METADATA.name,
    "description": VIDEO_STEFANEK_METADATA.description,
    "thumbnailUrl": VIDEO_STEFANEK_METADATA.thumbnailUrl,
    "uploadDate": VIDEO_STEFANEK_METADATA.uploadDate,
    "contentUrl": VIDEO_STEFANEK_METADATA.contentUrl,
  };

  return (
    <ElixirModalsProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoArrestSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStefanekSchema) }} />

      <main className="min-h-screen bg-[#f8f5f0] text-[#0f0f0f] selection:bg-[#b8001f]/20 font-serif flex flex-col">
        <BrandHeader />

        {/* ── HERO ── */}
        <header className="pt-12 pb-10 px-4 border-b border-[#1c1c1c]">
          <div className="max-w-4xl mx-auto text-center">
            {/* Category tag */}
            <div className="inline-flex items-center gap-2 mb-8 border border-[#b8001f] px-4 py-1.5">
              <span className="w-1.5 h-1.5 bg-[#b8001f] rounded-full animate-pulse"></span>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#b8001f] font-bold">Śledztwo Dziennikarskie</span>
            </div>

            <h1 className="mb-8 text-[#0f0f0f]">
              <span className="block text-5xl md:text-8xl font-black leading-none tracking-tighter uppercase" style={{ fontFamily: '"Georgia", serif' }}>
                Eliksir Wiedźmina
              </span>
              <span className="block text-lg md:text-2xl text-[#4a4a4a] font-mono uppercase tracking-[0.15em] mt-5 font-normal">
                Mroczna tajemnica twórców CD Projekt
              </span>
            </h1>

            <div className="max-w-2xl mx-auto border-t border-b border-[#1c1c1c] py-8 px-4 mt-8">
              <p className="text-lg md:text-xl text-[#1c1c1c] leading-relaxed font-serif">
                Ayahuasca, policyjne naloty i tragedia, o której nie miał się nikt dowiedzieć. Publicznie dostępne akta i rejestry ujawniają, jak twórcy gry &quot;Wiedźmin&quot; finansowali szamańskie podziemie.
              </p>
            </div>
          </div>
        </header>

        {/* ── ARTICLE BODY ── */}
        <article className="max-w-2xl mx-auto px-4 pt-10 pb-0 flex-grow">
          <div className="prose prose-stone prose-lg max-w-none">

            <p className="text-[#1c1c1c] leading-relaxed text-lg" style={{
              firstLetter: undefined
            }}>
              <span className="float-left text-8xl font-black leading-[0.75] mr-3 mt-2 text-[#0f0f0f] font-serif" style={{ fontFamily: '"Georgia", serif' }}>W</span>
              2020 roku media obiegły doniesienia o rozbiciu grupy polskich szamanów w czeskich Hermanovicach. Policyjny nalot, aresztowanie Jarosława i Karoliny Kordysów, a następnie surowe wyroki – 8,5 oraz 5,5 roku więzienia za prowadzenie nielegalnego biznesu polegającego na organizacji tzw. &quot;ceremonii&quot;, podczas których klientom podawano egzotyczny psychodelik – ayahuaskę.
            </p>

            <p className="text-[#1c1c1c] leading-relaxed">
              Ayahuaska to tradycyjny wywar z amazońskich roślin o silnym działaniu halucynogennym. Ze względu na wysoką zawartość DMT – substancji psychodelicznej wywołującej intensywne wizje i zmiany stanu świadomości, jej posiadanie i podawanie jest w Polsce i Czechach zabronione. Finałem medialnego spektaklu Kordysów było ułaskawienie przez czeskiego prezydenta po dwóch latach odsiadki.
            </p>

            <p className="text-[#1c1c1c] leading-relaxed">
              Kurtyna opadła, temat ucichł. Ale czy to na pewno koniec tej historii? W cieniu tego głośnego procesu toczył się drugi – cichy i błyskawiczny, zakończony dyskretnym wyrokiem, o którym nikt nawet w mediach się nie zająknął. Analiza sądowych dokumentów prowadzi do zdumiewających wniosków.
            </p>

            <p className="text-[#1c1c1c] leading-relaxed">
              W przygranicznym Janowie funkcjonował drugi, bliźniaczy ayahuaskowy ośrodek, którego współwłaścicielem okazał się miliarder – Michał Kiciński.
            </p>

            {/* ── SECTION HEADER ── */}
            <div className="mt-16 mb-8">
              <SectionDivider />
              <h2 className="text-2xl font-black uppercase tracking-[0.1em] text-[#0f0f0f] mt-4 mb-1" style={{ fontFamily: '"Georgia", serif' }}>
                Świadek B.
              </h2>
            </div>

            <p className="text-[#1c1c1c] leading-relaxed">
              W obszernym i publicznie dostępnym uzasadnieniu{' '}
              <GalleryTrigger type="wyrok_kordys" className="font-bold text-[#0f0f0f] border-b-2 border-[#b8001f] hover:bg-[#b8001f]/10 transition-colors cursor-pointer">wyroku</GalleryTrigger>{' '}
              Jarosława Kordysa pojawia się postać świadka Bartosza B.
            </p>

            <p className="text-[#1c1c1c] leading-relaxed">Zgodnie z aktami:</p>

            <CaseFile title="Zeznania świadka B.">
              &quot;Świadek B. odnośnie osoby oskarżonego [Jarosława Kordysa] oświadczył, że zna się z nim ok. 8 lat, a poznali się w Holandii&quot;.
              <br/><br/>
              &quot;Świadek B. potwierdził, że i on sam w przeszłości prowadził warsztaty&quot;, a obecnie sam &quot;jest przedmiotem dochodzenia policji w Krnowie właśnie z powodu ceremonii&quot;.
            </CaseFile>

            <p className="text-[#1c1c1c] leading-relaxed">Akta ujawniają również skalę zarzutów wobec Bartosza B.:</p>

            <CaseFile title="Zarzuty wobec Bartosza B.">
              &quot;(...) wymieniony był sprawdzany w związku z występkiem niedozwolonej produkcji i innego obchodzenia się ze środkami odurzającymi (...) albowiem miał w roku 2014 zlecić przesłanie na swój adres przesyłki pocztowej przechwyconej na lotnisku w Lipsku RFN zawierającej 4,5 kg DMT, a 6.6.2018 miało dojść do zatrzymania przesyłki pocztowej we Frankfurcie nad Menem RFN zawierającej 2000 g meskaliny i 38,6 g substancji DMT.&quot;
            </CaseFile>

            <p className="text-[#1c1c1c] leading-relaxed">Intrygujący fragment dotyczy własności &quot;bazy&quot;. Dokumenty stwierdzają:</p>

            <CaseFile title="Własność nieruchomości">
              &quot;(...) budynek rodzinny w miejscowości Janov (...), który jest częściowo użytkowany do stałego zamieszkania, a częściowo jako komercyjny obiekt noclegowy&quot;
              <br/><br/>
              &quot;Świadek [Bartosz B.] potwierdził, że w Janowie jest właścicielem jednej dziesiątej nieruchomości&quot;.
            </CaseFile>

            <p className="text-[#1c1c1c] leading-relaxed">Do kogo należała reszta? Sąd wskazuje wprost:</p>

            <CaseFile title="Ustalenia Sądu">
              &quot;...w odniesieniu do nieruchomości będących współwłasnością Bartosza B. i Michała D. K.&quot;.
            </CaseFile>

            <p className="text-[#1c1c1c] leading-relaxed">
              W Czechach księgi wieczyste są jawne i dostępne online. Wystarczy wejść na stronę Katastru Nieruchomości, wyszukać{' '}
              <GalleryTrigger type="janov" className="font-bold text-[#0f0f0f] border-b-2 border-[#b8001f] hover:bg-[#b8001f]/10 transition-colors cursor-pointer">działkę w Janowie</GalleryTrigger>{' '}
              i za niewielką opłatą pobrać jej pełną historię.
            </p>

            <div className="my-8 flex justify-start">
              <GalleryTrigger type="janov">
                <LocationStampUI name="JANOV U KRNOVA" code="656976" plot="st. 281" lv="127" />
              </GalleryTrigger>
            </div>

            <p className="text-[#1c1c1c] leading-relaxed">
              Pobrany dokument nie pozostawia wątpliwości: w latach 2012–2023 współwłaścicielami nieruchomości byli:
              <br />Bartosz Badowski (10%)
              <br /><span className="bg-[#b8001f] text-[#f8f5f0] px-1.5 font-bold font-mono">Michał Dawid Kiciński (90%)</span>
            </p>

            <p className="text-[#1c1c1c] leading-relaxed">
              Drugie imię – Dawid – idealnie wypełnia lukę w zanonimizowanym skrócie &quot;Michal D. K.&quot;.{' '}
              <span className="bg-[#0f0f0f] text-[#f8f5f0] px-1.5 font-bold box-decoration-clone">Wspólnikiem szamana był twórca &quot;Wiedźmina&quot; – jeden z najbogatszych Polaków.</span>
            </p>

            {/* ── NA PODSŁUCHU ── */}
            <div className="mt-16 mb-8">
              <SectionDivider />
              <h2 className="text-2xl font-black uppercase tracking-[0.1em] text-[#0f0f0f] mt-4 mb-1" style={{ fontFamily: '"Georgia", serif' }}>
                Na podsłuchu
              </h2>
            </div>

            <p className="text-[#1c1c1c] leading-relaxed">
              Przełom w sprawie organizatorów ayahuaskowych ceremonii w 2020 roku nastąpił dzięki policyjnej technice operacyjnej. Telefon Kordysa był na stałym podsłuchu, a funkcjonariusze słuchali na żywo, gdy w dniu 24.08.2020 r. doszło do nerwowej wymiany zdań pomiędzy Badowskim i Kordysem.
            </p>

            <p className="text-[#1c1c1c] leading-relaxed">
              Kordys zadzwonił do Badowskiego wyraźnie zaniepokojony wieściami, które do niego dotarły. Bał się, że tragedia, o której huczało w kuluarach, może zniszczyć ich imperium. Sąd w uzasadnieniu wyroku precyzyjnie rekonstruuje ten moment:
            </p>

            <CaseFile title="Rekonstrukcja rozmowy (Uzasadnienie Sądu)" type="transcript">
              &quot;oskarżony [Jarosława Kordysa] omawia z B., że dotarła do niego informacja, że w obiekcie w Janowie{' '}
              <span className="not-italic font-bold text-[#b8001f] border-b-2 border-[#b8001f]">zmarła jakaś kobieta</span>&quot;.
            </CaseFile>

            <p className="text-[#1c1c1c] leading-relaxed">
              W rozmowie pojawia się też wątek zagrożenia ze strony osoby trzeciej – mężczyźni omawiają szantażystę, który chce iść na policję. Kordys wprost pyta wspólnika:
            </p>

            <CaseFile title="Pytanie Kordysa" type="transcript">
              &quot;W jakim zagrożeniu jest nasza praca?&quot;
            </CaseFile>

            <p className="text-[#1c1c1c] leading-relaxed">
              Odpowiedź na to pytanie znajduje się w aktach sprawy i nie pozostawia złudzeń co do intencji rozmówców. W uzasadnieniu wyroku Kordysa czytamy:
            </p>

            <div className="my-12 pl-8 relative border-l-[3px] border-[#b8001f]">
              <div className="font-serif text-xl italic text-[#1c1c1c] leading-relaxed" style={{ fontFamily: '"Georgia", serif' }}>
                &quot;Z ich rozmowy wynika, że nie zajmowali się w zasadzie samym faktem śmierci, lecz raczej obawą, aby to nie przyciągnęło uwagi policji.&quot;
              </div>
            </div>

            <p className="text-[#1c1c1c] leading-relaxed">
              Dla sądu był to koronny dowód na to, że oskarżeni prowadzili nielegalny biznes, a nie działalność duchową – śmierć człowieka była dla nich jedynie &quot;psuciem interesów&quot;.
            </p>

            <p className="text-[#1c1c1c] leading-relaxed">
              Cynizm tej konwersacji sięga zenitu chwilę później. Gdy tylko ustalili strategię uciszenia plotek, natychmiast przeszli do logistyki dostaw narkotyku. Sąd odnotowuje, że zaraz po dywagacjach o śmierci i szantażu, rozmówcy wracają do interesów:
            </p>

            <CaseFile title="Kontynuacja rozmowy" type="transcript">
              &quot;Następnie w rozmowie omawiają zamówienia «herbaty» z dżungli i to, czy im tego «nie zepsują», ekscytując się nagraniem od dostawcy, który «siedzi w dżungli i gotuje».&quot;
            </CaseFile>

            <p className="text-[#1c1c1c] leading-relaxed">
              Dla policjantów, którzy słyszeli to w czasie rzeczywistym, przekaz był jasny: w obiekcie mogło dojść do tragedii, a sprawcy martwili się jedynie o ciągłość dostaw.
            </p>

            <p className="text-[#1c1c1c] leading-relaxed">
              Zaledwie dwa dni po tym telefonie, 26.08.2020 czescy policjanci weszli do posiadłości w Janowie. Efekty rewizji opisano w wyroku Kordysa:
            </p>

            <CaseFile title="Protokół rewizji">
              &quot;w nieruchomości zabezpieczono rzeczy... oprócz marihuany zabezpieczono również substancje zawierające DMT o objętości ok. 2 kg&quot;.
            </CaseFile>

            <p className="text-[#1c1c1c] leading-relaxed">
              Podczas policyjnej interwencji zidentyfikowano tam 15 obywateli Polski, którzy mieli brać udział w ceremonii. Wśród nich, stali bywalcy i bliscy znajomi Badowskiego – Krzysztof Stefanek i Lena Drzewińska, których obecność w momencie wkroczenia służb ma znaczenie w kontekście późniejszej ich roli w tej historii.
            </p>

            {/* ── CENA WOLNOŚCI ── */}
            <div className="mt-16 mb-8">
              <SectionDivider />
              <h2 className="text-2xl font-black uppercase tracking-[0.1em] text-[#0f0f0f] mt-4 mb-1" style={{ fontFamily: '"Georgia", serif' }}>
                Cena wolności
              </h2>
            </div>

            <p className="text-[#1c1c1c] leading-relaxed">
              Kiedy 26 sierpnia 2020 roku czeska policja weszła do posiadłości w Janowie, należącej do Bartosza Badowskiego i miliardera Michała Kicińskiego, Jarosław Kordys w Hermanovicach wciąż czuł się bezpiecznie. Nie wiedział jeszcze, że zegar zaczął odliczać czas do jego własnej katastrofy. Zaledwie 7 tygodni po cichym nalocie na Badowskiego policja zapukała do Kordysów.
            </p>

            <p className="text-[#1c1c1c] leading-relaxed">
              15 października 2020 roku sielankę w ich ośrodku przerwał huk granatów ogłuszających. Czeska jednostka antyterrorystyczna nie bawiła się w półśrodki: zamaskowani funkcjonariusze z długą bronią wdarli się do budynku, rzucając na ziemię przyszłych bohaterów głośnego skandalu.
            </p>

            <ArticleVideoPlayer
              src={`${PINATA_GATEWAY}/${ARREST_VIDEO_CID}/videoplayback.m3u8`}
              poster=""
            />
            <div className="mt-[-2rem] mb-12 text-xs text-[#4a4a4a] font-mono uppercase tracking-[0.18em] border-l-2 border-[#b8001f] pl-3">
              Nagranie z policyjnego nalotu na ośrodek w Hermanovicach (15.10.2020)
            </div>

            <p className="text-[#1c1c1c] leading-relaxed">Co wydarzyło się w ciągu tych niespełna dwóch miesięcy? Odpowiedź kryje się w jednym czeskim terminie prawnym:</p>

            <div className="my-10 flex gap-4 p-5 bg-[#f8f5f0] border border-[#1c1c1c] border-l-4 border-l-[#b8001f] shadow-[4px_4px_0px_0px_rgba(15,15,15,0.1)]">
              <Scale className="w-7 h-7 text-[#b8001f] shrink-0 mt-0.5" />
              <div>
                <strong className="block font-mono text-[#0f0f0f] text-base font-bold mb-1 uppercase tracking-widest">Dohoda o vině a trestu</strong>
                <div className="text-[#1c1c1c] text-base leading-relaxed font-serif">
                  Ugoda o winie i karze. Czeska procedura karna pozwalająca oskarżonemu na dobrowolne poddanie się karze w zamian za łagodniejszy wyrok, bez przeprowadzania pełnego procesu dowodowego i wzywania świadków.
                </div>
              </div>
            </div>

            <p className="text-[#1c1c1c] leading-relaxed">
              Bartosz &quot;Badi&quot; Badowski, wspólnik jednego z najbogatszych Polaków, błyskawicznie zrozumiał swoje położenie. W obliczu zabezpieczonych dowodów – w tym 2 kilogramów substancji z DMT i marihuany – wybrał strategię, która miała uchronić go przed wieloletnim więzieniem. Postanowił &quot;kupić&quot; sobie wolność.
            </p>

            <p className="text-[#1c1c1c] leading-relaxed">
              Ugoda pozwoliła na zamknięcie jego teczki bez wywoływania świadków, co w praktyce oznaczało, że mechanizmy działania janowskiego ośrodka nigdy nie wybrzmiały echem w publicznej debacie, chroniąc Badowskiego przed krzyżowym ogniem pytań i zeznaniami, które mogłyby pogrążyć także jego cichego wspólnika.
            </p>

            <p className="text-[#1c1c1c] leading-relaxed">
              Cena wolności Badowskiego okazała się być wysoka dla jego kolegi z branży. Zeznania &quot;Badiego&quot; były dla prokuratury bezcennym materiałem dowodowym, który pozwolił domknąć łańcuch poszlak w sprawie Kordysów.
            </p>

            <p className="text-[#1c1c1c] leading-relaxed">
              Na mocy{' '}
              <GalleryTrigger type="wyrok_badi" className="font-bold text-[#0f0f0f] border-b-2 border-[#b8001f] hover:bg-[#b8001f]/10 transition-colors cursor-pointer">wyroku</GalleryTrigger>{' '}
              z dnia 2 listopada 2021 roku Bartosz Badowski został uznany winnym popełnienia &quot;zbrodni niedozwolonej produkcji i innego obchodzenia się ze środkami odurzającymi&quot;.
            </p>

            <p className="text-[#1c1c1c] leading-relaxed">Sąd ustalił, że:</p>

            <CaseFile title="Ustalenia wyroku skazującego Bartosza B.">
              &quot;co najmniej od bliżej nieustalanej daty w 2015 roku do 26.08.2020 [...] oferował, organizował i co najmniej w 441 przypadkach zrealizował w nieregularnych odstępach czterodniowe i dziesięciodniowe pobyty [...] ukierunkowane na tzw. duchowe ćwiczenia spirytualne&quot;
              <br/><br/>
              &quot;udostępnił uczestnikom do użycia bliżej nieustaloną ilość substancji psychotropowych, a mianowicie tzw. ayahuascę zawierającą dimetylotryptaminę (DMT) oraz tzw. marihuanę zawierającą tetrahydrokannabinol (THC)&quot;
              <br/><br/>
              &quot;przechowywał łącznie 1902,79 grama materiału roślinnego (...), który zawierał łącznie 37,24 grama substancji czynnej dimetylotryptaminy (DMT) oraz 92,29 grama tzw. narkotyku marihuany&quot;.
            </CaseFile>

            <p className="text-[#1c1c1c] leading-relaxed">
              Podczas, gdy Jarosław Kordys został skazany na 8,5 roku pozbawienia wolności Bartosz Badowski, którego sprawa dotyczyła tego samego procederu, tych samych substancji, regionu i czasu trwania działalności, dzięki ugodzie i współpracy z wymiarem sprawiedliwości, zakończył sprawę wyrokiem w zawieszeniu.
            </p>

            {/* ── CISZA PO BURZY ── */}
            <div className="mt-16 mb-8">
              <SectionDivider />
              <h2 className="text-2xl font-black uppercase tracking-[0.1em] text-[#0f0f0f] mt-4 mb-1" style={{ fontFamily: '"Georgia", serif' }}>
                Cisza po burzy
              </h2>
            </div>

            <p className="text-[#1c1c1c] leading-relaxed">
              Choć Badowski zaprzestał prowadzenia działalności szamańskiej, posiadłość w Janowie nie opustoszała – zamieszkali z nim wspomniani wcześniej Krzysztof Stefanek i Magdalena Drzewińska. Ich obecność u boku &quot;Badiego&quot; w tamtym czasie rzuca cień na ich późniejszą rolę; nie byli to wszakże niewinni obserwatorzy, lecz ludzie, którzy mimo tego, że sami byli obecni podczas policyjnej interwencji, pozostali lojalni wobec byłego szamana.
            </p>

            <p className="text-[#1c1c1c] leading-relaxed">
              Będąc tak blisko Badowskiego, doskonale znali mroczną tajemnicę śmierci Ilony. Ich decyzja o zamieszkaniu z człowiekiem, który w obliczu tragedii martwił się o &quot;ciągłość dostaw&quot;, dowodzi, że w pełni akceptowali reguły zmowy milczenia.
            </p>

            {/* ── KICIŃSKI ── */}
            <div className="mt-16 mb-8">
              <SectionDivider />
              <h2 className="text-2xl font-black uppercase tracking-[0.1em] text-[#0f0f0f] mt-4 mb-1" style={{ fontFamily: '"Georgia", serif' }}>
                Kiciński
              </h2>
            </div>

            <p className="text-[#1c1c1c] leading-relaxed">
              W cieniu tych wyroków pozostaje wciąż niewyjaśniona rola cichego wspólnika. Michał Kiciński to nie jest postać, która o ayahuasce jedynie &quot;słyszała&quot; – on stał się jej nieoficjalnym ambasadorem w polskich mediach głównego nurtu. W licznych wywiadach (m.in. dla &quot;Focusa&quot;, &quot;Newsweeka&quot;) z niezwykłą precyzją opisuje on mechanizmy działania psychodelików. Kiciński publicznie opowiada o lekcjach pokory, jakie dała mu &quot;medycyna&quot;, o spotkaniach z szamanami i o tym, jak napar z dżungli otwiera &quot;nową rzeczywistość&quot;.
            </p>

            <PullQuote
              quote="Po ayahuasce jest szansa na to, żeby sobie nie ściemniać."
              author="Michał Kiciński"
              source="Newsweek, 30 maja 2016 r."
            />

            {/* ── BŁĄD Z BADIM ── */}
            <div className="mt-16 mb-8">
              <SectionDivider />
              <h2 className="text-2xl font-black uppercase tracking-[0.1em] text-[#0f0f0f] mt-4 mb-1" style={{ fontFamily: '"Georgia", serif' }}>
                „Błąd z Badim"
              </h2>
            </div>

            <p className="text-[#1c1c1c] leading-relaxed">
              Michał Kiciński wiedział o Ilonie. Jego konfrontacja z organami ścigania nabrała formalnego kształtu dopiero jesienią 2023 roku. 21 września 2023 roku miliarder osobiście odebrał wezwanie do stawiennictwa w charakterze świadka w sprawie o sygnaturze WD-I-3186/23. Miało się ono odbyć 18.10.2023. Na wezwaniu czytelnie było napisane, że przesłuchanie będzie dotyczyć &quot;pobytu w Janowie&quot;.
            </p>

            <div className="my-12 flex flex-col items-center">
              <GalleryTrigger type="wezwanie_kicinski">
                <img
                  src={`${KORDYS_IMAGES_URL}/wezwanie/wezwanie_kicinski.png`}
                  alt="Wezwanie na policję"
                  className="w-48 border border-[#1c1c1c] cursor-pointer hover:opacity-90 transition-opacity shadow-[4px_4px_0px_0px_rgba(15,15,15,0.15)]"
                />
              </GalleryTrigger>
              <p className="text-[10px] text-[#4a4a4a] mt-2 font-mono uppercase tracking-widest w-48 text-center">
                Skan wezwania (Kliknij)
              </p>
            </div>

            <p className="text-[#1c1c1c] leading-relaxed">
              Reakcja miliardera na zainteresowanie organów ścigania była błyskawiczna. Zwrócił się bezpośrednio do autora zawiadomienia – wysyłając mu wiadomość mailową z propozycją swoistej pokuty. Zamiast wyjaśnień prokuratorskich zaoferował przelew na cel charytatywny, nazywając lata nielegalnego procederu młodzieńczą naiwnością.
            </p>

            <CaseFile title="Wiadomość prywatna od M. Kicińskiego" type="email">
              &quot;(...) Tak mogę zapłacić za swój błąd z Badim. Podaj mi Fundacje lub Stowarzyszenie (najlepiej powiązaną z hospicjum lub domami dziecka, bo tu widzę morze potrzeb i dużo cierpienia) i wpłacę tam dobrowolnie kwotę darowizny, w ramach Przeprosin wszechświatowi, za moją młodzieńczą naiwność i brak przenikliwości. Fundacja / Stowarzyszenie musi być uznana i z tradycjami, a nie jakaś organizacja krzak. Wyślę Ci potwierdzenie przelewu. (...)&quot;
            </CaseFile>

            <p className="text-[#1c1c1c] leading-relaxed">
              Do przesłuchania doszło tydzień przed terminem wskazanym na wezwaniu – 11 października 2023 roku o godzinie 15:00 w Komendzie Rejonowej Policji Warszawa II. W protokole Kiciński przyjmuje linię opartą na braku świadomości co do charakteru działalności prowadzonej w jego posiadłości.
            </p>

            <CaseFile title="Zeznanie do protokołu">
              &quot;Nie mam żadnej wiedzy co się działo na mojej farmie, w której jestem 90% udziałowcem (...) wynajmowałem tę nieruchomość.&quot;
            </CaseFile>

            <p className="text-[#1c1c1c] leading-relaxed">
              Gdy w toku czynności padło kluczowe pytanie o jego własny udział w ceremoniach ayahuaski w Janowie, odpowiedź była lakoniczna:
            </p>

            <CaseFile title="Odpowiedź na pytanie o udział">
              &quot;nie brałem udziału w takich ceremoniach w latach 2016-2023, a o wcześniejszym okresie{' '}
              <span className="not-italic font-bold text-[#b8001f] border-b border-[#b8001f]">odmawiam odpowiedzi</span>&quot;
            </CaseFile>

            <p className="text-[#1c1c1c] leading-relaxed">
              W kontekście złożonych zeznań warto zauważyć, że miliarder jest właścicielem luksusowego ośrodka Munay Sonqo w Peru, o którym wielokrotnie wspominał w wywiadach.
            </p>

            <p className="text-[#1c1c1c] leading-relaxed">
              W przeciwieństwie do Europy, peruwiańskie prawo zezwala na komercyjne prowadzenie ceremonii z ayahuascą. Ośrodek Kicińskiego oferuje tam w pełni jawną i profesjonalną sprzedaż usług o profilu bliźniaczym do tych, które w Czechach są zakazane, co wciąż jest eksponowane na stronie internetowej.
            </p>

            <p className="text-[#1c1c1c] leading-relaxed">
              Fakt, że Kiciński w momencie przesłuchania zarządzał legalnym biznesem ayahuaskowym w Ameryce Południowej, stawia pod znakiem zapytania jego deklarowaną nieświadomość co do profilu działalności w Janowie.
            </p>

            <p className="text-[#1c1c1c] leading-relaxed">Co na to Bartosz Badowski?</p>

            <CaseFile title="Fragment korespondencji B. Badowskiego" type="email">
              &quot;Przelewy wysyłałem z mojego konta ING, które mam do tej pory [...]. Tytuł „wynajem". (...) Dopóki zarabiałem - dzieliłem się z nim zyskiem.(...) Michał wiedział dokładnie co się dzieje na farmie i czerpał z tego zyski przez wiele wiele lat. (...) Rozważam też wizytę na Policji w Czechach - ja poniosłem prawne konsekwencje za prowadzenie ceremonii, ale Kiciński - żadnych. Mimo, że to on czerpał z tego największe zyski, to on był nade mną i był większościowym właścicielem farmy.&quot;
            </CaseFile>

            {/* ── ANONIMOWY FILANTROP ── */}
            <div className="mt-16 mb-8">
              <SectionDivider />
              <h2 className="text-2xl font-black uppercase tracking-[0.1em] text-[#0f0f0f] mt-4 mb-1" style={{ fontFamily: '"Georgia", serif' }}>
                Anonimowy filantrop
              </h2>
            </div>

            <p className="text-[#1c1c1c] leading-relaxed">
              W listopadzie 2025 roku na kanale YouTube &quot;Osada Natury Zew&quot; pojawia się nagrany rok wcześniej film, w którym obecny gospodarz, Krzysztof Stefanek, snuje opowieść o powstaniu &quot;Osady&quot;. W sielskiej scenerii, z uśmiechem na ustach, buduje narrację o cudownym zbiegu okoliczności i tajemniczym dobroczyńcy.
            </p>

            <p className="text-[#1c1c1c] leading-relaxed">
              Stefanek wspomina, jak wspólnie z grupą przyjaciół pomagał uporządkować sprawy własnościowe, by obiekt &quot;znalazł się w jednych rękach&quot;. Kluczowy moment tej opowieści Stefanek datuje z niezwykłą precyzją:
            </p>

            <CaseFile title="Wypowiedź K. Stefanka">
              &quot;Ostatecznie{' '}
              <span className="not-italic font-bold bg-[#b8001f] text-[#f8f5f0] px-1">23 października 2023 roku</span>{' '}
              ten człowiek do nas zadzwonił powiedział, że wspólnie z żoną zdecydowali, że oni by chcieli to miejsce przekazać w darowiźnie&quot;
            </CaseFile>

            <p className="text-[#1c1c1c] leading-relaxed">
              Stefanek przedstawia to jako efekt &quot;researchu&quot; darczyńcy, który rzekomo urzekła wizja działalności non-profit.
            </p>

            <ArticleVideoPlayer
              src={`${PINATA_GATEWAY}/${VIDEO_CID}/YTDowncom_YouTube_Media_4Xujw-krjxs_001_1080p-1.m3u8`}
              poster=""
            />
            <div className="mt-[-2rem] mb-12 text-xs text-[#4a4a4a] font-mono uppercase tracking-[0.18em] border-l-2 border-[#b8001f] pl-3">
              Krzysztof Stefanek opowiada o &quot;cudownym&quot; otrzymaniu darowizny (Materiał z 2025 r.)
            </div>

            <p className="text-[#1c1c1c] leading-relaxed">Jednak kalendarz wydarzeń prawnych burzy ten romantyczny mit, ujawniając nerwowy pośpiech w pozbywaniu się &quot;gorącego kartofla&quot;:</p>

            {/* Timeline */}
            <div className="my-12 space-y-0 font-mono text-sm border-l-2 border-[#1c1c1c] pl-0 ml-2">
              {[
                { date: "21 września 2023 r.", text: "Michał Kiciński odbiera wezwanie na przesłuchanie w sprawie Janowa.", highlight: false },
                { date: "3 października 2023 r.", text: "Na tydzień przed wizytą na komendzie odkupuje od Bartosza Badowskiego jego 10% udziałów in nieruchomości. Aby pozbyć się całego ośrodka jednym podpisem, musi najpierw stać się jego jedynym właścicielem.", highlight: false },
                { date: "11 października 2023 r.", text: "Miliarder staje przed policją. Do protokołu odmawia zeznań na temat swojej przeszłości w tym miejscu.", highlight: false },
                { date: "23 października 2023 r.", text: "Zaledwie 12 dni po kłopotliwym przesłuchaniu, gdy formalności własnościowe z Badim są już dopięte, następuje telefon do Stefanka z propozycją oddania majątku wartego miliony za darmo.", highlight: true },
                { date: "21 grudnia 2023 r.", text: "Finał operacji. Kiciński formalnie przekazuje Janov w formie darowizny. Nieruchomość trafia do stowarzyszenia \"non-profit\" – fasadowej organizacji \"krzak\", zarządzanej przez ludzi, którzy przez lata byli częścią tego procederu.", highlight: false },
              ].map((item, i) => (
                <div key={i} className={`flex items-start gap-0 ${item.highlight ? '' : ''}`}>
                  <div className="flex flex-col items-center mr-4 shrink-0" style={{ marginLeft: '-9px' }}>
                    <div className={`w-4 h-4 border-2 rotate-45 mt-2 ${item.highlight ? 'border-[#b8001f] bg-[#b8001f]' : 'border-[#1c1c1c] bg-[#f8f5f0]'}`}></div>
                    {i < 4 && <div className="w-px h-full bg-[#1c1c1c] opacity-20 mt-1" style={{ minHeight: '2rem' }}></div>}
                  </div>
                  <div className={`pb-10 pt-1 flex-1 ${item.highlight ? 'bg-[#f8f5f0] border border-[#b8001f] p-4 mt-1 shadow-[3px_3px_0px_0px_rgba(184,0,31,0.15)]' : ''}`}>
                    <span className={`font-bold font-mono ${item.highlight ? 'text-[#b8001f]' : 'text-[#0f0f0f]'}`}>{item.date}</span>
                    {' – '}{item.text}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[#1c1c1c] leading-relaxed">
              Cynizm tej sytuacji pogłębia fakt, że obdarowani nie byli przypadkowymi entuzjastami ekologii. Krzysztof Stefanek, który w filmie mówi o &quot;odwróconej logice&quot; i pięknie wolontariatu, i jego konkubina Magdalena Drzewińska w rzeczywistości doskonale znali mroczną historię Janowa i tajemnicę śmierci Ilony. Przyjmując darowiznę, przejmowali nie tylko ziemię, ale i milczenie.
            </p>

            <div className="my-8 flex justify-start">
              <TransactionStampUI label="Nr Transakcji (Katastr)" value="V-5821/2023-127" subDetails="Obręb: Janov u Krnova [656976]" />
            </div>

            <p className="text-[#1c1c1c] leading-relaxed">
              Ostatecznie strategia okazała się skuteczna. Śledztwo umorzono zanim się zaczęło, a majątek, który mógł podlegać przepadkowi jako narzędzie przestępstwa, został bezpiecznie zaparkowany w &quot;stowarzyszeniu&quot;. Kiciński pozostał anonimowym &quot;filantropem&quot;, a Stefanek – opiekunem nowej, &quot;czystej&quot; osady.
            </p>

            <p className="text-[#1c1c1c] leading-relaxed">
              Na tragedii świadomie wzbogacili się ludzie, dla których tuszowanie prawdy stało się fundamentem ich nowej, intratnej rzeczywistości. Pod szyldem organizacji non-profit Stowarzyszenie Natury Zew żyją teraz z organizacji turnusów wypoczynkowych z cennikiem darowizn zamiast paragonów, okłamując swoich gości i publicznie każdego, kto natrafi na ich sielankowe filmiki. A przecież &quot;zadośćuczynienie wszechświatowi&quot; miało trafić na hospicjum, a nie na &quot;organizację krzak&quot;.
            </p>

            {/* ── NÝDEK ── */}
            <div className="mt-16 mb-8">
              <SectionDivider />
              <h2 className="text-2xl font-black uppercase tracking-[0.1em] text-[#0f0f0f] mt-4 mb-1" style={{ fontFamily: '"Georgia", serif' }}>
                Nýdek
              </h2>
            </div>

            <p className="text-[#1c1c1c] leading-relaxed">
              Gdyby sprawa dotyczyła tylko jednego miliardera, można by mówić o przypadku lub pechowym doborze najemców. Jednak nieco dalej od Janowa, w miejscowości Nýdek, funkcjonował kolejny, bliźniaczy ośrodek.
            </p>

            <p className="text-[#1c1c1c] leading-relaxed">
              Relacje świadków wskazują, że w{' '}
              <GalleryTrigger type="nydek" className="font-bold text-[#0f0f0f] border-b-2 border-[#b8001f] hover:bg-[#b8001f]/10 transition-colors cursor-pointer">posiadłości w Nýdku</GalleryTrigger>{' '}
              odbywały się regularne ceremonie o charakterze zbliżonym do tych u Kordysów i Badowskiego, prowadzone przez Piotra &quot;Bonawenturę&quot; Tracza. Chociaż witryna ośrodka już nie istnieje, archiwum internetu &quot;Wayback Machine&quot; zachowało zrzuty strony tribunydek.com. Opisy warsztatów jednoznacznie wskazują, że nieruchomość była wykorzystywana do pracy z psychodelikami.
            </p>

            <p className="text-[#1c1c1c] leading-relaxed">
              Skoro wiemy już, czym ten dom był, kluczowym pytaniem staje się: do kogo należał?
            </p>

            <p className="text-[#1c1c1c] leading-relaxed">
              Analiza czeskich ksiąg wieczystych przynosi sensacyjne odkrycie. Właścicielem tej kolejnej szamańskiej świątyni – dokładnie w czasie, gdy strona internetowa zapraszała na ceremonie – był drugi z duetu miliarderów stojących za gamingowym gigantem,{' '}
              <span className="bg-[#b8001f] text-[#f8f5f0] px-1.5 font-bold font-mono">Marcin Iwiński</span>.{' '}
              Dokumenty urzędowe bezlitośnie łączą jego nazwisko z infrastrukturą, w której odbywał się nielegalny proceder.
            </p>

            <div className="my-8 flex justify-start">
              <GalleryTrigger type="nydek">
                <LocationStampUI name="NÝDEK" code="708186" plot="st. 506/1" lv="832" />
              </GalleryTrigger>
            </div>

            <p className="text-[#1c1c1c] leading-relaxed">
              <span className="bg-[#0f0f0f] text-[#f8f5f0] px-1.5 font-bold box-decoration-clone">Oznacza to, że nie jeden lecz obaj legendarni założyciele CD Projekt, na czeskim pograniczu posiadali nieruchomości, w których odpłatnie oferowano te same nielegalne substancje.</span>
            </p>

            <p className="text-[#1c1c1c] leading-relaxed">
              Jeszcze bardziej zastanawiające jest to, co stało się z tą nieruchomością w momencie zagrożenia. Gdy 15.10.2020 roku aresztowano Kordysa, nad środowiskiem zawisło widmo policyjnych nalotów. Dokumenty urzędowe odsłaniają niepokojącą zbieżność dat:
            </p>

            <div className="my-12 space-y-0 font-mono text-sm border-l-2 border-[#1c1c1c] pl-0 ml-2">
              {[
                { date: "15 października 2020 r.", text: "Policyjny szturm na ośrodek Kordysów. W środowisku wybucha panika." },
                { date: "15 czerwca 2021 r.", text: "Marcin Iwiński sprzedaje nieruchomości w Nýdku." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-0">
                  <div className="flex flex-col items-center mr-4 shrink-0" style={{ marginLeft: '-9px' }}>
                    <div className="w-4 h-4 border-2 border-[#1c1c1c] bg-[#f8f5f0] rotate-45 mt-2"></div>
                    {i < 1 && <div className="w-px bg-[#1c1c1c] opacity-20 mt-1" style={{ height: '4rem' }}></div>}
                  </div>
                  <div className="pb-10 pt-1 flex-1">
                    <span className="font-bold text-[#0f0f0f]">{item.date}</span>
                    {' – '}{item.text}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[#1c1c1c] leading-relaxed">
              Nabywcą luksusowej posiadłości nie został inny inwestor, lecz sam Piotr Tracz – ten sam człowiek, który wcześniej pełnił tam rolę szamana.
            </p>

            <div className="my-8 flex justify-start">
              <TransactionStampUI label="Nr Transakcji (Katastr)" value="V-2937/2021-832" subDetails="Obręb: Nýdek [708186]" />
            </div>

            <p className="text-[#1c1c1c] leading-relaxed">
              Transakcja ta rodzi wątpliwości: w jaki sposób niszowy szaman sfinansował zakup luksusowej willi od jednego z najbogatszych Polaków? Nowy właściciel niemal natychmiast zmienił formalny profil działalności na legalne warsztaty pracy z ciałem. Zbieżność tej sekwencji zdarzeń z &quot;darowizną&quot; Kicińskiego w Janowie pozwala dostrzec powtarzalny schemat wycofywania się właścicieli z infrastruktury powiązanej z nielegalnym procederem.
            </p>

            {/* ── WIKTOR B. ── */}
            <div className="mt-16 mb-8">
              <SectionDivider />
              <h2 className="text-2xl font-black uppercase tracking-[0.1em] text-[#0f0f0f] mt-4 mb-1" style={{ fontFamily: '"Georgia", serif' }}>
                Wiktor B.
              </h2>
            </div>

            <p className="text-[#1c1c1c] leading-relaxed">
              3 marca 2026 Onet ujawnia opinii publicznej wstrząsające kulisy działalności ośrodka w czeskim Janowie, gdzie podczas szamańskich ceremonii z użyciem ayahuaski miało dojść do tragicznych zdarzeń. Dziennikarskie śledztwo koncentruje się na śmierci 54-letniej uczestniczki, Ilony L.-H.
            </p>

            <p className="text-[#1c1c1c] leading-relaxed">
              Według ustaleń Onetu, w czerwcu 2018 roku na farmie w Janowie doszło do tragedii. Podczas nocnej ceremonii z użyciem ayahuaski, kobieta poczuła się fatalnie, zmagając się z silnym bólem i intensywnymi wymiotami. Mimo jej krytycznego stanu, nikt nie wezwał pomocy medycznej. Co więcej, uczestnikom odebrano wcześniej telefony, co uniemożliwiło im samodzielne zaalarmowanie służb ratunkowych.
            </p>

            <p className="text-[#1c1c1c] leading-relaxed">
              Prowadzący obrzęd Wiktor B., brat głównego organizatora ceremonii znanego jako Badi, był tej nocy pod wpływem marihuany. Z relacji świadków wynika, że po śmierci kobiety podjął on natychmiastowe działania mające na celu zatuszowanie incydentu. Nakazał uczestnikom bezzwłoczne opuszczenie ośrodka. Czeskiej policji przedstawił fałszywą wersję zdarzeń, twierdząc, że Ilona L.-H. była jedynie gościem i została znaleziona martwa w łazience nad ranem. Służby początkowo nie nabrały podejrzeń, przyjmując tę relację za wiarygodną.
            </p>

            <p className="text-[#1c1c1c] leading-relaxed">
              Przez kolejne lata tę kłamliwą narrację udawało się skutecznie utrzymywać. O nieszczęśliwym wypadku i śmierci z przyczyn naturalnych przez długi czas przekonana była nawet najbliższa rodzina Ilony.
            </p>

            <p className="text-[#1c1c1c] leading-relaxed">
              Sytuacja uległa diametralnej zmianie 6 maja 2024 roku, gdy Prokuratura Okręgowa w Częstochowie wszczęła oficjalne śledztwo w sprawie działalności ośrodka oraz okoliczności śmierci Ilony L.-H. Kilka miesięcy po rozpoczęciu intensywnych działań przez polskich śledczych, w tajemniczych okolicznościach umiera Wiktor B.
            </p>

            <p className="text-[#1c1c1c] leading-relaxed">
              Ciało mężczyzny odnaleziono w magazynie firmy, w której pracował przy montażu szaf serwerowych. Na jego ciele nie stwierdzono widocznych obrażeń wskazujących na użycie siły fizycznej. Mimo że od śmierci Wiktora B. minęło już ponad półtora roku, śledczy wciąż czekają na wyniki badań toksykologicznych, które mają kluczowe znaczenie dla wyjaśnienia, czy w organizmie mężczyzny znajdowały się substancje mogące przyczynić się do jego nagłego odejścia. Z tego względu obecnie śledztwo w sprawie jego tajemniczego zgonu pozostaje zawieszone.
            </p>

            {/* ── BYLINE ── */}
            <div className="mt-10 mb-4 flex justify-end items-center gap-4 border-t border-[#1c1c1c] pt-6">
              <div className="w-8 h-px bg-[#b8001f]"></div>
              <div className="text-right">
                <span className="block font-mono font-bold text-[#0f0f0f] uppercase tracking-widest text-sm">Detektyw Polutek</span>
                <span className="block text-[10px] text-[#4a4a4a] font-mono mt-1">detektyw.polutek@protonmail.com</span>
              </div>
            </div>

            {/* ── STATUS PRAWNY ── */}
            <div className="my-12 border border-[#1c1c1c] overflow-hidden shadow-[4px_4px_0px_0px_rgba(15,15,15,0.12)]">
              <div className="bg-[#161616] px-5 py-3 flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-[#b8001f] shrink-0" />
                <h3 className="font-mono font-bold text-[11px] uppercase tracking-[0.25em] text-[#f8f5f0]">
                  Status Prawny (2025/2026)
                </h3>
              </div>

              <div className="divide-y divide-[#d4d0ca]">
                {[
                  { title: "Śledztwo w sprawie organizacji ceremonii", sub: "Prokuratura Rejonowa w Częstochowie", sig: "3013-1.Ds.15.2024", alert: false },
                  { title: "Śledztwo w sprawie śmierci Ilony Lewandowskiej", sub: "Prokuratura Rejonowa w Częstochowie", sig: "3013-1.Ds.4.2026", alert: true },
                  { title: "Śledztwo w sprawie śmierci Wiktora B.", sub: "Prokuratura Rejonowa w Pułtusku", sig: "4027-0. Ds. 1254.2024", alert: false, suspended: true },
                ].map((item, i) => (
                  <div key={i} className="bg-[#f8f5f0] px-5 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <span className="block font-serif text-[#0f0f0f] font-medium text-sm">{item.title}</span>
                      <span className="block text-[10px] text-[#4a4a4a] font-mono mt-0.5 uppercase tracking-wider">{item.sub}</span>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className={`font-mono text-[10px] font-bold px-3 py-1.5 border whitespace-nowrap ${item.alert ? 'bg-[#fff0f0] border-[#b8001f] text-[#b8001f]' : 'bg-[#f0ebe3] border-[#d4d0ca] text-[#1c1c1c]'}`}>
                        {item.sig}
                      </span>
                      {item.suspended && (
                        <span className="text-[9px] font-mono font-bold text-[#b8001f] uppercase tracking-widest">● Śledztwo zawieszone</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#f0ebe3] px-5 py-3 text-[11px] text-[#1c1c1c] font-mono border-t border-[#1c1c1c]">
                Postępowania toczą się w wymienionych jednostkach Prokuratury. Nadzór nad sprawami w Częstochowie objął Zastępca Prokuratora Okręgowego, a kluczowe czynności nadzoruje prokurator Jolanta Świdnicka.
              </div>
            </div>

          </div>

          {/* ── FOOTER / DOKUMENTY ── */}
          <footer className="mt-4 pt-10 pb-16 font-sans border-t-2 border-[#0f0f0f]">

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-1">
                <Search className="w-5 h-5 text-[#b8001f]" />
                <h3 className="text-sm font-mono font-bold text-[#0f0f0f] uppercase tracking-[0.25em]">Dokumenty Źródłowe</h3>
              </div>
              <div className="h-px bg-[#1c1c1c] w-full mb-6"></div>
              <p className="text-sm text-[#1c1c1c] font-serif">
                Artykuł powstał na podstawie jawnej dokumentacji urzędowej i sądowej. Pełną listę sygnatur oraz odnośniki do baz państwowych (Katastr, InfoSoud), umożliwiające samodzielną niezależną weryfikację danych.
              </p>
            </div>

            <div className="grid gap-3 text-sm text-[#1c1c1c]">
              {/* Doc cards */}
              {[
                {
                  title: "Wyrok Jarosława Kordysa",
                  sig: "Sygn. 30 T 5/2020",
                  href: KORDYS_PDF_URL,
                  verifyHref: "https://msp.gov.cz/web/krajsky-soud-v-ostrave/zakladni-informace/-/clanek/informace-rok-2022",
                  verifyLabel: "Weryfikuj na msp.gov.cz",
                  dlLabel: "Pobierz PDF",
                  dlIcon: <FileText className="w-3 h-3" />,
                },
                {
                  title: "Wyrok Bartosza Badowskiego",
                  sig: "Sygn. 66 T 146/2021",
                  href: BADI_PDF_URL,
                  verifyHref: "https://msp.gov.cz/documents/22409/2997339/29Si+25-2022+p%C5%99%C3%ADloha+%C4%8D.+1.pdf",
                  verifyLabel: "Weryfikuj oryginał (29 Si 25/2022)",
                  dlLabel: "Pobierz PDF",
                  dlIcon: <FileText className="w-3 h-3" />,
                },
                {
                  title: "Historia własności: Janov",
                  sig: "LV 127 | Obręb 656976 | Koszt: 100 CZK (~17 PLN)",
                  href: "#",
                  verifyHref: "https://nahlizenidokn.cuzk.cz",
                  verifyLabel: "Weryfikuj na nahlizenidokn.cuzk.cz",
                  dlLabel: "Pobierz PDF",
                  dlIcon: <Download className="w-3 h-3" />,
                },
                {
                  title: "Historia własności: Nýdek",
                  sig: "LV 832 | Obręb 708186 | Koszt: 100 CZK (~17 PLN)",
                  href: "#",
                  verifyHref: "https://nahlizenidokn.cuzk.cz",
                  verifyLabel: "Weryfikuj na nahlizenidokn.cuzk.cz",
                  dlLabel: "Pobierz PDF",
                  dlIcon: <Download className="w-3 h-3" />,
                },
                {
                  title: "Transakcja: Darowizna (Janov)",
                  sig: "Sygnatura: V-5821/2023 | Koszt: 300 CZK (~52 PLN)",
                  href: "#",
                  verifyHref: "https://nahlizenidokn.cuzk.cz",
                  verifyLabel: "Weryfikuj na nahlizenidokn.cuzk.cz",
                  dlLabel: "Pobierz PDF",
                  dlIcon: <Download className="w-3 h-3" />,
                },
                {
                  title: "Transakcja: Sprzedaż (Nýdek)",
                  sig: "Sygnatura: V-2937/2021 | Koszt: 300 CZK (~52 PLN)",
                  href: "#",
                  verifyHref: "https://nahlizenidokn.cuzk.cz",
                  verifyLabel: "Weryfikuj na nahlizenidokn.cuzk.cz",
                  dlLabel: "Pobierz PDF",
                  dlIcon: <Download className="w-3 h-3" />,
                },
              ].map((doc, i) => (
                <div key={i} className="border border-[#1c1c1c] bg-[#f8f5f0] shadow-[2px_2px_0px_0px_rgba(15,15,15,0.08)] hover:shadow-[2px_2px_0px_0px_rgba(184,0,31,0.2)] transition-shadow">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 p-3">
                    <div>
                      <h4 className="font-bold text-[#0f0f0f] text-sm">{doc.title}</h4>
                      <p className="font-mono text-[10px] text-[#4a4a4a] mt-0.5">{doc.sig}</p>
                    </div>
                    <a
                      href={doc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 w-36 justify-center bg-[#0f0f0f] text-[#f8f5f0] px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider hover:bg-[#b8001f] transition-colors flex items-center gap-2"
                    >
                      {doc.dlIcon} {doc.dlLabel}
                    </a>
                  </div>
                  <div className="border-t border-[#d4d0ca] px-3 py-1.5">
                    <a
                      href={doc.verifyHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-[#4a4a4a] hover:text-[#b8001f] flex items-center gap-1.5 uppercase tracking-wider font-mono"
                    >
                      <Globe className="w-3 h-3" />
                      {doc.verifyLabel}
                    </a>
                  </div>
                </div>
              ))}

              {/* Wayback entries */}
              {[
                {
                  title: "Archiwalna Strona: Nýdek",
                  sig: "Archiwum: tribunydek.com",
                  href: "https://web.archive.org/web/*/tribunydek.com",
                  label: "Wayback Machine",
                },
                {
                  title: "Archiwalna Strona: Munay Sonqo",
                  sig: "Archiwum: munaysonqo.com (Peru)",
                  href: MUNAY_WAYBACK_URL,
                  label: "Wayback Machine",
                },
              ].map((doc, i) => (
                <div key={i} className="border border-[#1c1c1c] bg-[#f8f5f0] shadow-[2px_2px_0px_0px_rgba(15,15,15,0.08)] hover:shadow-[2px_2px_0px_0px_rgba(184,0,31,0.2)] transition-shadow">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 p-3">
                    <div>
                      <h4 className="font-bold text-[#0f0f0f] text-sm">{doc.title}</h4>
                      <p className="font-mono text-[10px] text-[#4a4a4a] mt-0.5">{doc.sig}</p>
                    </div>
                    <a
                      href={doc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 w-36 justify-center bg-[#0f0f0f] text-[#f8f5f0] px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider hover:bg-[#b8001f] transition-colors flex items-center gap-2"
                    >
                      <History className="w-3 h-3" /> {doc.label}
                    </a>
                  </div>
                </div>
              ))}

              {/* Onet article */}
              <div className="border border-[#1c1c1c] border-l-4 border-l-[#b8001f] bg-[#f8f5f0] shadow-[2px_2px_0px_0px_rgba(15,15,15,0.08)]">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 p-3">
                  <div>
                    <h4 className="font-bold text-[#0f0f0f] text-sm leading-tight">
                      Artykuł: Szamańskie ceremonie, tajemnicza śmierć i miliarderzy od „Wiedźmina"{' '}
                      <span className="text-[#4a4a4a] font-mono text-[10px] font-normal">— Onet.pl</span>
                    </h4>
                    <p className="font-mono text-[10px] text-[#b8001f] mt-0.5 uppercase tracking-wider">Opublikowano: 3 marca 2026</p>
                  </div>
                  <div className="shrink-0 w-36 justify-center bg-[#d4d0ca] text-[#4a4a4a] px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-2 cursor-default">
                    <ExternalLink className="w-3 h-3" /> Link nieaktywny
                  </div>
                </div>
                <div className="border-t border-[#d4d0ca] px-3 py-1.5">
                  <span className="text-[10px] text-[#4a4a4a] font-mono">onet.pl/wiadomosci/kraj/szamanskie-ceremonie-tajemnicza-smierc-i-miliarderzy-od-wiedzmina</span>
                </div>
              </div>
            </div>

            {/* Mirror / Archive block */}
            <div className="mt-10 border border-[#1c1c1c] overflow-hidden shadow-[4px_4px_0px_0px_rgba(15,15,15,0.12)]">
              <div className="bg-[#161616] px-5 py-3 flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-[#b8001f] shrink-0" />
                <h3 className="font-mono font-bold text-[11px] uppercase tracking-[0.25em] text-[#f8f5f0]">
                  Mirror – Kopia Zapasowa Dokumentacji
                </h3>
              </div>
              <div className="p-5 bg-[#f8f5f0]">
                <p className="text-xs text-[#1c1c1c] mb-4 leading-relaxed font-sans">
                  W celu zapewnienia niezniszczalności dowodów, pełna dokumentacja śledztwa (akty oskarżenia, wyroki, zeznania) została zarchiwizowana w sieciach zdecentralizowanych. Materiał jest odporny na próby cenzury i usuwania.
                </p>
                <div className="grid gap-2 font-mono text-[10px] uppercase tracking-wider">
                  <a href="ipfs://bafybeicnxl_pelna_dokumentacja_wiedzmin_gate" className="text-[#b8001f] hover:text-[#0f0f0f] transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b8001f] rounded-full"></span>
                    IPFS: Baza Dowodowa (Full Archive)
                  </a>
                  <a href="https://arweave.net/eliksir-wiedzmina-dokumentacja" className="text-[#b8001f] hover:text-[#0f0f0f] transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b8001f] rounded-full"></span>
                    Arweave: Trwała Archiwizacja
                  </a>
                  <a href="https://github.com/detektyw-polutek/eliksir-mirror" className="text-[#b8001f] hover:text-[#0f0f0f] transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#b8001f] rounded-full"></span>
                    GitHub: Source Mirror
                  </a>
                </div>
              </div>
            </div>

            {/* Official site */}
            <div className="mt-8 text-center">
              <div className="w-16 h-px bg-[#b8001f] mx-auto mb-4"></div>
              <p className="text-[10px] text-[#4a4a4a] font-mono uppercase tracking-[0.3em] mb-2 flex items-center justify-center gap-2">
                <Globe className="w-3 h-3" /> Oficjalna Witryna
              </p>
              <a
                href="https://www.eliksir-wiedzmina.pl"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-[#0f0f0f] hover:text-[#b8001f] transition-colors border-b border-[#b8001f]"
              >
                www.eliksir-wiedzmina.pl
              </a>
            </div>

          </footer>
        </article>
      </main>
    </ElixirModalsProvider>
  );
}
