import React from 'react';

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

const generateKordysPages = (count) => {
  return Array.from({ length: count }, (_, i) => {
    const pageNumber = String(i + 1).padStart(4, '0');
    const fileName = `30T_5_2021-1_page-${pageNumber}.jpg`;
    return `${KORDYS_IMAGES_URL}/${fileName}`;
  });
};

const generateBadiPages = (count) => {
  return Array.from({ length: count }, (_, i) => {
    const pageNumber = String(i + 1).padStart(4, '0');
    const fileName = `wyrok_page-${pageNumber}.jpg`;
    return `${BADI_IMAGES_URL}/${fileName}`;
  });
};

const GALLERY_NYDEK = [
    `${NYDEK_IMAGES_URL}/nydek01.jpg`,
    `${NYDEK_IMAGES_URL}/nydek02.jpg`,
    `${NYDEK_IMAGES_URL}/nydek03.jpg`,
    `${NYDEK_IMAGES_URL}/nydek04.jpg`,
    `${NYDEK_IMAGES_URL}/nydek05.jpg`,
    `${NYDEK_IMAGES_URL}/nydek06.jpeg`
];

const GALLERY_WYROK_KORDYS = generateKordysPages(25);
const GALLERY_WYROK_BADI = generateBadiPages(3);
const GALLERY_JANOV = [
    `${JANOV_IMAGES_URL}/janov1.jpg`,
    `${JANOV_IMAGES_URL}/janov2.jpg`,
    `${JANOV_IMAGES_URL}/janov3.jpg`,
    `${JANOV_IMAGES_URL}/janov4.jpg`,
    `${JANOV_IMAGES_URL}/janov5.jpg`,
    `${JANOV_IMAGES_URL}/janov6.jpg`,
    `${JANOV_IMAGES_URL}/janov8.jpg`,
    `${JANOV_IMAGES_URL}/janov9.jpg`,
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
];

const EvidenceGrid = () => {
  return (
    <div className="my-24" id="galeria">
      <div className="flex items-center gap-4 mb-10">
        <div className="h-px bg-zinc-800 flex-grow"></div>
        <h3 className="text-xl font-sans font-light text-zinc-400 uppercase tracking-[0.2em]">
          Baza Dowodowa
        </h3>
        <div className="h-px bg-zinc-800 flex-grow"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Wezwanie Kiciński */}
        <div className="group flex flex-col text-left">
          <div className="aspect-[3/4] overflow-hidden bg-zinc-900 rounded-xl mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10 opacity-60"></div>
            <img
              src="/wezwanie_kicinski.png"
              alt="Wezwanie Kiciński"
              className="w-full h-full object-cover grayscale opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out mix-blend-screen"
            />
          </div>
          <div>
            <h4 className="font-sans font-medium text-zinc-100 text-sm mb-1 tracking-wide">Wezwanie: M. Kiciński</h4>
            <p className="text-xs text-red-500 font-mono mb-3">Sygn. WD-I-3186/23</p>
            <a href="/wezwanie_kicinski.png" target="_blank" className="text-xs font-sans text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
              <span className="w-4 h-px bg-zinc-600"></span> Otwórz skan
            </a>
          </div>
        </div>

        {/* Wyrok Kordys */}
        <div className="group flex flex-col text-left">
          <div className="aspect-[3/4] overflow-hidden bg-zinc-900 rounded-xl mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10 opacity-60"></div>
            <img
              src="/gallery/wyrok_kordysa/30T_5_2021-1_page-0001.jpg"
              alt="Wyrok Kordys"
              className="w-full h-full object-cover grayscale opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out mix-blend-screen"
            />
          </div>
          <div>
            <h4 className="font-sans font-medium text-zinc-100 text-sm mb-1 tracking-wide">Wyrok: J. Kordys</h4>
            <p className="text-xs text-red-500 font-mono mb-3">Sygn. 30 T 5/2021</p>
            <details className="group/details">
              <summary className="text-xs font-sans text-zinc-400 hover:text-white transition-colors flex items-center gap-2 cursor-pointer list-none">
                <span className="w-4 h-px bg-zinc-600 group-open/details:bg-red-500 transition-colors"></span> Akta sprawy (25)
              </summary>
              <div className="flex flex-col gap-2 mt-4 pl-6 border-l border-zinc-800">
                {GALLERY_WYROK_KORDYS.map((img, i) => (
                  <a key={i} href={img} target="_blank" className="text-xs text-zinc-500 hover:text-zinc-200 transition-colors">Strona {String(i+1).padStart(2, '0')}</a>
                ))}
              </div>
            </details>
          </div>
        </div>

        {/* Wyrok Badi */}
        <div className="group flex flex-col text-left">
          <div className="aspect-[3/4] overflow-hidden bg-zinc-900 rounded-xl mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10 opacity-60"></div>
            <img
              src="/gallery/wyrok_badi/wyrok_page-0001.jpg"
              alt="Wyrok Badi"
              className="w-full h-full object-cover grayscale opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out mix-blend-screen"
            />
          </div>
          <div>
            <h4 className="font-sans font-medium text-zinc-100 text-sm mb-1 tracking-wide">Wyrok: Bartosz B.</h4>
            <p className="text-xs text-red-500 font-mono mb-3">Sygn. 66 T 146/2021</p>
            <details className="group/details">
              <summary className="text-xs font-sans text-zinc-400 hover:text-white transition-colors flex items-center gap-2 cursor-pointer list-none">
                <span className="w-4 h-px bg-zinc-600 group-open/details:bg-red-500 transition-colors"></span> Akta sprawy (3)
              </summary>
              <div className="flex flex-col gap-2 mt-4 pl-6 border-l border-zinc-800">
                {GALLERY_WYROK_BADI.map((img, i) => (
                  <a key={i} href={img} target="_blank" className="text-xs text-zinc-500 hover:text-zinc-200 transition-colors">Strona {String(i+1).padStart(2, '0')}</a>
                ))}
              </div>
            </details>
          </div>
        </div>

        {/* Dokumentacja Janów */}
        <div className="group flex flex-col text-left">
          <div className="aspect-[3/4] overflow-hidden bg-zinc-900 rounded-xl mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10 opacity-60"></div>
            <img
              src="/gallery/janov/janov1.jpg"
              alt="Dokumentacja Janów"
              className="w-full h-full object-cover grayscale opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out mix-blend-screen"
            />
          </div>
          <div>
            <h4 className="font-sans font-medium text-zinc-100 text-sm mb-1 tracking-wide">Baza: Janów</h4>
            <p className="text-xs text-red-500 font-mono mb-3">KW LV 127</p>
            <details className="group/details">
              <summary className="text-xs font-sans text-zinc-400 hover:text-white transition-colors flex items-center gap-2 cursor-pointer list-none">
                <span className="w-4 h-px bg-zinc-600 group-open/details:bg-red-500 transition-colors"></span> Materiał operacyjny
              </summary>
              <div className="flex flex-col gap-2 mt-4 pl-6 border-l border-zinc-800">
                {GALLERY_JANOV.map((img, i) => (
                  <a key={i} href={img} target="_blank" className="text-xs text-zinc-500 hover:text-zinc-200 transition-colors">Obiekt {String(i+1).padStart(2, '0')}</a>
                ))}
              </div>
            </details>
          </div>
        </div>

        {/* Posiadłość Nýdek */}
        <div className="group flex flex-col text-left">
          <div className="aspect-[3/4] overflow-hidden bg-zinc-900 rounded-xl mb-4 flex items-center justify-center border border-zinc-800/50">
            <svg className="w-12 h-12 text-zinc-700 group-hover:text-zinc-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <div>
            <h4 className="font-sans font-medium text-zinc-100 text-sm mb-1 tracking-wide">Baza: Nýdek</h4>
            <p className="text-xs text-red-500 font-mono mb-3">KW LV 832 (M. Iwiński)</p>
            <details className="group/details">
              <summary className="text-xs font-sans text-zinc-400 hover:text-white transition-colors flex items-center gap-2 cursor-pointer list-none">
                <span className="w-4 h-px bg-zinc-600 group-open/details:bg-red-500 transition-colors"></span> Materiał operacyjny
              </summary>
              <div className="flex flex-col gap-2 mt-4 pl-6 border-l border-zinc-800">
                {GALLERY_NYDEK.map((img, i) => (
                  <a key={i} href={img} target="_blank" className="text-xs text-zinc-500 hover:text-zinc-200 transition-colors">Obiekt {String(i+1).padStart(2, '0')}</a>
                ))}
              </div>
            </details>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- COMPONENTS ---

const BrandHeader = () => {
  return (
    <header className="w-full py-8 mb-12 flex flex-col items-center border-b border-zinc-900">
      <div className="font-sans text-[10px] tracking-[0.3em] text-zinc-500 uppercase mb-4">
        Raport Śledczy // Marzec 2026
      </div>
      <h1 className="text-3xl md:text-5xl font-sans font-light tracking-widest text-zinc-100 uppercase">
        Niezależne Media
      </h1>
    </header>
  );
};

const CaseFile = ({ title, children, icon }) => (
  <div className="my-10 relative bg-zinc-900/40 rounded-xl p-8 border border-zinc-800/50 backdrop-blur-sm text-left group hover:bg-zinc-900/60 transition-colors">
    <div className="absolute top-0 left-0 w-1 h-full bg-red-900/50 rounded-l-xl group-hover:bg-red-600 transition-colors"></div>
    <div className="flex items-center gap-3 mb-6">
      {icon && <span className="text-zinc-500 text-sm">{icon}</span>}
      <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-widest">{title}</h3>
    </div>
    <div className="font-serif text-lg leading-relaxed text-zinc-300">
      {children}
    </div>
  </div>
);

const PullQuote = ({ quote, author, source }) => (
  <div className="my-16 flex flex-col items-center text-center">
    <svg className="w-8 h-8 text-zinc-800 mb-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
    <p className="font-serif text-2xl md:text-4xl text-zinc-100 leading-snug mb-8 max-w-2xl font-light">
      {quote}
    </p>
    <div className="font-sans text-xs uppercase tracking-widest text-zinc-500">
      <span className="text-zinc-300 font-medium">{author}</span> <span className="mx-2 text-zinc-700">|</span> {source}
    </div>
  </div>
);

const LocationStampUI = ({ name, plot, lv }) => (
  <div className="inline-flex items-center gap-6 py-3 px-5 rounded-full bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-colors text-left backdrop-blur-sm">
     <div className="w-2 h-2 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
     <div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-1">
          {name}
        </div>
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-sm text-zinc-200">LV {lv}</span>
          <span className="text-xs text-zinc-600 font-sans">DZ: {plot}</span>
        </div>
     </div>
  </div>
);

const TransactionStampUI = ({ label, value, subDetails }) => (
  <div className="inline-flex items-center gap-6 py-3 px-5 rounded-full bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-colors text-left backdrop-blur-sm">
     <div className="w-2 h-2 rounded-full bg-zinc-500 shadow-[0_0_10px_rgba(161,161,170,0.5)]"></div>
     <div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-1">
          {label}
        </div>
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-sm text-zinc-200">{value}</span>
          {subDetails && <span className="text-xs text-zinc-600 font-sans">{subDetails}</span>}
        </div>
     </div>
  </div>
);

const ArticleVideoPlayer = ({ src, poster }) => {
  return (
    <div className="my-16 w-full bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800/80 shadow-2xl relative group">
      <div className="absolute inset-0 border border-white/5 rounded-xl pointer-events-none z-20"></div>
      <video controls poster={poster} className="w-full h-auto block z-10 relative opacity-90 group-hover:opacity-100 transition-opacity">
        <source src={src} type="application/x-mpegURL" />
        Brak obsługi wideo. <a href={src} className="text-red-400 hover:text-red-300">Pobierz</a>.
      </video>
    </div>
  );
};

// --- PAGE ---

export default function Page() {
  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": "Eliksir Wiedźmina – Śledztwo: Michał Kiciński i tajemnica Janowa",
    "description": "Pełna dokumentacja śledztwa: Michał Kiciński, Jarosław Kordys i prokurator Jolanta Świdnicka. Ayahuasca, Janów i tragiczna śmierć uczestniczki.",
    "image": [
      `${KORDYS_IMAGES_URL}/wezwanie/wezwanie_kicinski.png`
    ],
    "datePublished": "2024-03-03",
    "author": [{
      "@type": "Person",
      "name": "Detektyw Polutek",
      "url": "mailto:detektyw.polutek@protonmail.com"
    }]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }}
      />

      <main className="min-h-screen bg-zinc-950 text-zinc-300 selection:bg-red-900/30 selection:text-white font-serif">
        
        <div className="max-w-4xl mx-auto px-6 md:px-12 pb-24 relative">
          
          <BrandHeader />
          
          <article className="w-full relative z-10">
            
            <header className="mb-20 text-center flex flex-col items-center">
              <div className="w-24 h-24 mb-10 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                <img
                  src="/zdjeciehej.png"
                  alt="Wiedźmini z eliksirem"
                  className="h-14 object-contain grayscale opacity-60"
                />
              </div>

              <h2 className="mb-6 flex flex-col items-center">
                <span className="text-sm font-sans tracking-[0.3em] text-red-500 uppercase mb-4">
                  Akta Sprawy
                </span>
                <span className="text-5xl md:text-7xl font-sans font-light text-zinc-100 tracking-tight leading-none mb-4">
                  Eliksir Wiedźmina
                </span>
                <span className="text-lg md:text-2xl font-serif italic text-zinc-500 mt-2">
                  Mroczna tajemnica twórców CD Projekt
                </span>
              </h2>

              <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed font-light mt-8 max-w-2xl mx-auto">
                Ayahuasca, policyjne naloty i tragedia, o której nie miał się nikt dowiedzieć. Publicznie dostępne akta i rejestry ujawniają, jak twórcy gry „Wiedźmin” finansowali szamańskie podziemie.
              </p>
            </header>

            <div className="prose prose-invert prose-zinc prose-lg md:prose-xl max-w-none prose-p:leading-relaxed prose-headings:font-sans prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-zinc-100 prose-a:text-zinc-300 prose-a:underline prose-a:decoration-zinc-700 prose-a:underline-offset-4 hover:prose-a:decoration-red-500 hover:prose-a:text-zinc-100 transition-colors">

              <p className="first-letter:text-7xl first-letter:font-sans first-letter:font-light first-letter:text-zinc-100 first-letter:mr-3 first-letter:float-left">
                W 2020 roku media obiegły doniesienia o rozbiciu grupy polskich szamanów w czeskich Hermanovicach. Policyjny nalot, aresztowanie Jarosława i Karoliny Kordysów, a następnie surowe wyroki – 8,5 oraz 5,5 roku więzienia za prowadzenie nielegalnego biznesu polegającego na organizacji tzw. &quot;ceremonii&quot;, podczas których klientom podawano egzotyczny psychodelik – ayahuaskę.
              </p>

              <p>
                Ayahuaska to tradycyjny wywar z amazońskich roślin o silnym działaniu halucynogennym. Ze względu na wysoką zawartość DMT – substancji psychodelicznej wywołującej intensywne wizje i zmiany stanu świadomości, jej posiadanie i podawanie jest w Polsce i Czechach zabronione. Finałem medialnego spektaklu Kordysów było ułaskawienie przez czeskiego prezydenta po dwóch latach odsiadki.
              </p>

              <p>
                Kurtyna opadła, temat ucichł. Ale czy to na pewno koniec tej historii? W cieniu tego głośnego procesu toczył się drugi – cichy i błyskawiczny, zakończony dyskretnym wyrokiem, o którym nikt nawet w mediach się nie zająknął. Analiza sądowych dokumentów prowadzi do zdumiewających wniosków.
              </p>

              <p className="text-2xl text-zinc-200 font-light my-10 border-l-2 border-zinc-800 pl-6">
                W przygranicznym Janowie funkcjonował drugi, bliźniaczy ayahuaskowy ośrodek, którego współwłaścicielem okazał się miliarder – Michał Kiciński.
              </p>

              <h2 className="text-3xl mt-24 mb-10 text-zinc-100">Świadek B.</h2>

              <p>
                W obszernym i publicznie dostępnym uzasadnieniu <a href="#galeria">wyroku</a> Jarosława Kordysa pojawia się postać świadka Bartosza B. Zgodnie z aktami:
              </p>

              <CaseFile title="Zeznania świadka B.">
                Świadek B. odnośnie osoby oskarżonego [Jarosława Kordysa] oświadczył, że zna się z nim ok. 8 lat, a poznali się w Holandii. Świadek B. potwierdził, że i on sam w przeszłości prowadził warsztaty, a obecnie sam jest przedmiotem dochodzenia policji w Krnowie właśnie z powodu ceremonii.
              </CaseFile>

              <p>
                Akta ujawniają również skalę zarzutów wobec Bartosza B.:
              </p>

              <CaseFile title="Zarzuty wobec Bartosza B.">
                (...) wymieniony był sprawdzany w związku z występkiem niedozwolonej produkcji i innego obchodzenia się ze środkami odurzającymi (...) albowiem miał w roku 2014 zlecić przesłanie na swój adres przesyłki pocztowej przechwyconej na lotnisku w Lipsku RFN zawierającej 4,5 kg DMT, a 6.6.2018 miało dojść do zatrzymania przesyłki pocztowej we Frankfurcie nad Menem RFN zawierającej 2000 g meskaliny i 38,6 g substancji DMT.
              </CaseFile>

              <p>
                Intrygujący fragment dotyczy własności &quot;bazy&quot;. Dokumenty stwierdzają:
              </p>

              <CaseFile title="Własność nieruchomości">
                (...) budynek rodzinny w miejscowości Janów (...), który jest częściowo użytkowany do stałego zamieszkania, a częściowo jako komercyjny obiekt noclegowy. Świadek [Bartosz B.] potwierdził, że w Janowie jest właścicielem jednej dziesiątej nieruchomości.
              </CaseFile>

              <p>
                Do kogo należała reszta? Sąd wskazuje wprost na nieruchomości będące współwłasnością Bartosza B. i Michała D. K. W Czechach księgi wieczyste są jawne i dostępne online. Wystarczy wejść na stronę Katastru Nieruchomości, wyszukać <a href="#galeria">działkę w Janowie</a> i pobrać jej pełną historię.
              </p>

              <div className="my-12">
                  <LocationStampUI name="JANOV U KRNOVA" plot="st. 281" lv="127" />
              </div>

              <p>
                Pobrany dokument nie pozostawia wątpliwości: w latach 2012–2023 współwłaścicielami nieruchomości byli: Bartosz Badowski (10%) oraz <span className="text-zinc-100 bg-zinc-900 px-2 py-0.5 rounded">Michał Dawid Kiciński (90%)</span>.
              </p>

              <p className="text-2xl text-zinc-200 font-light my-10 border-l-2 border-red-900/50 pl-6">
                Drugie imię – Dawid – idealnie wypełnia lukę w zanonimizowanym skrócie. Wspólnikiem szamana był twórca &quot;Wiedźmina&quot; – jeden z najbogatszych Polaków.
              </p>

              <h2 className="text-3xl mt-24 mb-10 text-zinc-100">Na podsłuchu</h2>

              <p>
                Przełom w sprawie organizatorów ayahuaskowych ceremonii w 2020 roku nastąpił dzięki policyjnej technice operacyjnej. Telefon Kordysa był na stałym podsłuchu, a funkcjonariusze słuchali na żywo, gdy w dniu 24.08.2020 r. doszło do nerwowej wymiany zdań pomiędzy Badowskim i Kordysem.
              </p>

              <p>
                Kordys zadzwonił do Badowskiego wyraźnie zaniepokojony wieściami, które do niego dotarły. Bał się, że tragedia, o której huczało w kuluarach, może zniszczyć ich imperium. Sąd w uzasadnieniu wyroku precyzyjnie rekonstruuje ten moment:
              </p>

              <CaseFile title="Zapis operacyjny" icon="🎙️">
                oskarżony [Jarosław Kordys] omawia z B., że dotarła do niego informacja, że w obiekcie w Janowie <span className="text-red-400">zmarła jakaś kobieta</span>.
              </CaseFile>

              <p>
                W rozmowie pojawia się też wątek zagrożenia ze strony osoby trzeciej – mężczyźni omawiają szantażystę, który chce iść na policję. Kordys wprost pyta wspólnika: &quot;W jakim zagrożeniu jest nasza praca?&quot;
              </p>

              <p>
                Odpowiedź znajduje się w aktach sprawy. Sąd pisze, że z rozmowy wynika, iż nie zajmowali się oni samym faktem śmierci, lecz obawą, aby incydent nie przyciągnęło uwagi policji. Dla wymiaru sprawiedliwości był to koronny dowód. Cynizm tej konwersacji sięga zenitu chwilę później, gdy rozmówcy wracają do logistyki dostaw narkotyku, ekscytując się nagraniem od dostawcy, który &quot;siedzi w dżungli i gotuje&quot;.
              </p>

              <p>
                Zaledwie dwa dni po tym telefonie, czescy policjanci weszli do posiadłości w Janowie zabezpieczając marihuanę oraz około 2 kg substancji z DMT.
              </p>

              <h2 className="text-3xl mt-24 mb-10 text-zinc-100">Cena wolności</h2>

              <p>
                15 października 2020 roku sielankę u Kordysów w Hermanovicach przerwał huk granatów ogłuszających. Czeska jednostka antyterrorystyczna wdarła się do budynku.
              </p>

              <ArticleVideoPlayer src={VIDEO_ARREST_METADATA.contentUrl} poster="" />
              <div className="text-xs font-sans text-zinc-500 uppercase tracking-widest mt-4 text-center">
                Materiał dowodowy // Zapis z kamery taktycznej // 15.10.2020
              </div>

              <p className="mt-16">
                Co wydarzyło się wcześniej? Odpowiedź kryje się w czeskiej procedurze <strong>Dohoda o vině a trestu</strong> (ugoda o winie i karze). Badowski, w obliczu zabezpieczonych dowodów, wybrał strategię ugody. Kupił sobie wolność.
              </p>

              <p>
                Ugoda pozwoliła na zamknięcie teczki bez wzywania świadków, chroniąc Badowskiego i jego wspólnika przed publicznym praniem brudów. Za 441 ceremonii i udostępnianie DMT, Badowski dostał wyrok w zawieszeniu, podczas gdy Kordys trafił do więzienia na 8,5 roku.
              </p>

              <h2 className="text-3xl mt-24 mb-10 text-zinc-100">Kiciński</h2>

              <p>
                Michał Kiciński nie był postacią, która o ayahuasce tylko słyszała. W wywiadach dla największych mediów z precyzją opisywał swoje spotkania z szamanami i działanie medycyny z dżungli.
              </p>

              <PullQuote
                quote="Po ayahuasce jest szansa na to, żeby sobie nie ściemniać."
                author="Michał Kiciński"
                source="Newsweek, 2016"
              />

              <p>
                Konfrontacja Kicińskiego z organami ścigania nabrała kształtu jesienią 2023 roku. Odebrał wezwanie na przesłuchanie w sprawie Janowa.
              </p>

              <div className="my-16 flex flex-col items-center">
                <div className="p-2 bg-white rounded-lg rotate-1 hover:rotate-0 transition-transform shadow-2xl">
                  <img
                    src={`${KORDYS_IMAGES_URL}/wezwanie/wezwanie_kicinski.png`}
                    alt="Wezwanie"
                    className="w-64 opacity-90 grayscale contrast-125"
                  />
                </div>
                <p className="mt-6 text-xs font-mono text-zinc-500">
                  <a href="/wezwanie_kicinski.png" target="_blank" className="hover:text-zinc-300">ZOBACZ PEŁNY SKAN ↗</a>
                </p>
              </div>

              <p>
                Zamiast wyjaśnień, zaoferował przelew na cel charytatywny. W prywatnej wiadomości napisał, że chce zapłacić za &quot;błąd z Badim&quot; wpłacając na hospicjum darowiznę w ramach &quot;Przeprosin wszechświatowi&quot;.
              </p>

              <CaseFile title="Zeznanie: 11.10.2023">
                Nie mam żadnej wiedzy co się działo na mojej farmie, w której jestem 90% udziałowcem (...) wynajmowałem tę nieruchomość.
              </CaseFile>

              <p>
                Na pytanie o własny udział odparł krótko: &quot;nie brałem udziału w takich ceremoniach w latach 2016-2023, a o wcześniejszym okresie odmawiam odpowiedzi&quot.
              </p>

              <h2 className="text-3xl mt-24 mb-10 text-zinc-100">Anonimowy filantrop</h2>

              <p>
                Zaledwie 12 dni po tym kłopotliwym przesłuchaniu, Kiciński dzwoni do Krzysztofa Stefanka z propozycją oddania majątku wartego miliony za darmo. Nieruchomość trafia do stowarzyszenia zarządzanego przez ludzi blisko powiązanych ze środowiskiem Badowskiego. Śledztwo zostaje umorzone.
              </p>

              <div className="my-12">
                 <TransactionStampUI label="Akt Darowizny" value="V-5821/2023" subDetails="Janów u Krnova" />
              </div>

              <h2 className="text-3xl mt-24 mb-10 text-zinc-100">Nýdek: Druga Baza</h2>

              <p>
                Niedaleko, w Nýdku, funkcjonował bliźniaczy ośrodek prowadzony przez Piotra Tracza. Czeskie rejestry bezlitośnie łączą ten adres z drugim miliarderem z CD Projekt – Marcinem Iwińskim.
              </p>

              <div className="my-12">
                  <LocationStampUI name="NÝDEK" plot="st. 506/1" lv="832" />
              </div>

              <p>
                Gdy w 2020 roku upadł ośrodek Kordysów, Iwiński pozbył się nieruchomości. Nabywcą został sam szaman, Piotr Tracz. Schemat wycofywania się w obliczu policyjnych nalotów powtórzył się po raz kolejny.
              </p>

              <h2 className="text-3xl mt-24 mb-10 text-zinc-100">Śmierć i cisza</h2>

              <p>
                Sprawa wróciła ze zdwojoną siłą w 2026 roku. Onet ujawnił kulisy śmierci Ilony L.-H. w Janowie w 2018 roku. Kobiecie nie udzielono pomocy, a uczestnikom odebrano telefony. Prowadzący obrzęd Wiktor B. zatuszował zdarzenie przed czeską policją.
              </p>

              <p>
                Gdy w maju 2024 polska prokuratura wznowiła śledztwo, Wiktor B. został znaleziony martwy. Sprawa utknęła w oczekiwaniu na badania toksykologiczne.
              </p>

            </div>

            <div className="mt-24 pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center md:items-start justify-between">
               <div className="flex items-center gap-4 mb-6 md:mb-0">
                  <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-800">
                    <span className="text-zinc-500 font-serif italic text-xl">P</span>
                  </div>
                  <div>
                    <span className="block font-sans font-medium text-zinc-200">Detektyw Polutek</span>
                    <a href="mailto:detektyw.polutek@protonmail.com" className="block text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors">detektyw.polutek@protonmail.com</a>
                  </div>
               </div>
               
               <div className="flex flex-col gap-2 text-right">
                  <span className="text-xs font-sans text-zinc-500 uppercase tracking-widest">Status Postępowań (2026)</span>
                  <span className="text-sm font-mono text-zinc-300 bg-zinc-900 px-3 py-1 rounded border border-zinc-800">3013-1.Ds.15.2024 (Ceremonie)</span>
                  <span className="text-sm font-mono text-zinc-300 bg-zinc-900 px-3 py-1 rounded border border-zinc-800">3013-1.Ds.4.2026 (Śmierć)</span>
               </div>
            </div>

            <footer className="mt-24 pt-16 border-t border-zinc-900">
              <h3 className="text-sm font-sans text-zinc-500 uppercase tracking-[0.2em] mb-8 text-center">Dane Źródłowe & Mirror</h3>
              
              <div className="flex flex-wrap justify-center gap-4 font-mono text-xs">
                 <a href={KORDYS_PDF_URL} className="px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full text-zinc-400 hover:text-white hover:border-zinc-600 transition-all">Wyrok: Kordys (PDF)</a>
                 <a href={BADI_PDF_URL} className="px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full text-zinc-400 hover:text-white hover:border-zinc-600 transition-all">Wyrok: Badowski (PDF)</a>
                 <a href="https://nahlizenidokn.cuzk.cz" className="px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full text-zinc-400 hover:text-white hover:border-zinc-600 transition-all">Katastr CZ</a>
                 <a href="ipfs://bafybeicnxl_pelna_dokumentacja_wiedzmin_gate" className="px-4 py-2 bg-red-900/10 border border-red-900/30 rounded-full text-red-400 hover:bg-red-900/20 transition-all">IPFS Vault</a>
                 <a href="https://www.eliksir-wiedzmina.pl" className="px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full text-zinc-400 hover:text-white hover:border-zinc-600 transition-all">eliksir-wiedzmina.pl</a>
              </div>
            </footer>

          </article>
        </div>
      </main>
    </>
  );
}
