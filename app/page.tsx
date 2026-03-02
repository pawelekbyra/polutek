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

const generateKordysPages = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const pageNumber = String(i + 1).padStart(4, '0');
    const fileName = `30T_5_2021-1_page-${pageNumber}.jpg`;
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
    <div className="my-16" id="galeria">
      <h3 className="text-2xl font-bold text-stone-900 uppercase tracking-widest mb-8 border-b-[3px] border-stone-900 pb-2 flex items-center gap-3">
        ⚖️ Galeria Dowodów
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div className="group relative overflow-hidden bg-[#e4dbbe] border-[2px] border-stone-900 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] flex flex-col text-left rounded-none">
          <div className="aspect-[3/4] overflow-hidden bg-[#dfd5b4] border-b-[2px] border-stone-900">
            <img
              src="/wezwanie_kicinski.png"
              alt="Wezwanie Kiciński"
              className="w-full h-full object-cover grayscale contrast-125 mix-blend-multiply transition-all duration-500"
            />
          </div>
          <div className="p-4 bg-[#e4dbbe]">
            <h4 className="font-bold text-stone-900 text-sm mb-1 uppercase tracking-tight">Wezwanie dla M. Kicińskiego</h4>
            <p className="text-[10px] text-stone-900 font-mono font-bold">Sygn. WD-I-3186/23</p>
            <a href="/wezwanie_kicinski.png" target="_blank" className="text-[10px] font-bold text-stone-900 underline mt-2 inline-block uppercase">Pokaż Dowód</a>
          </div>
        </div>

        <div className="group relative overflow-hidden bg-[#e4dbbe] border-[2px] border-stone-900 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] flex flex-col text-left rounded-none">
          <div className="aspect-[3/4] overflow-hidden bg-[#dfd5b4] border-b-[2px] border-stone-900">
            <img
              src="/gallery/wyrok_kordysa/30T_5_2021-1_page-0001.jpg"
              alt="Wyrok Kordys"
              className="w-full h-full object-cover grayscale contrast-125 mix-blend-multiply transition-all duration-500"
            />
          </div>
          <div className="p-4 bg-[#e4dbbe]">
            <h4 className="font-bold text-stone-900 text-sm mb-1 uppercase tracking-tight">Uzasadnienie Wyroku: J. Kordys</h4>
            <p className="text-[10px] text-stone-900 font-mono font-bold">Sygn. 30 T 5/2021</p>
            <details className="mt-2">
              <summary className="text-[10px] font-bold text-stone-900 cursor-pointer uppercase">Pokaż Strony (25)</summary>
              <div className="flex flex-col gap-2 mt-2">
                {GALLERY_WYROK_KORDYS.map((img, i) => (
                  <a key={i} href={img} target="_blank" className="text-[9px] text-stone-900 underline font-bold hover:bg-stone-300">Strona {i+1}</a>
                ))}
              </div>
            </details>
          </div>
        </div>

        <div className="group relative overflow-hidden bg-[#e4dbbe] border-[2px] border-stone-900 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] flex flex-col text-left rounded-none">
          <div className="aspect-[3/4] overflow-hidden bg-[#dfd5b4] border-b-[2px] border-stone-900">
            <img
              src="/gallery/wyrok_badi/wyrok_page-0001.jpg"
              alt="Wyrok Badi"
              className="w-full h-full object-cover grayscale contrast-125 mix-blend-multiply transition-all duration-500"
            />
          </div>
          <div className="p-4 bg-[#e4dbbe]">
            <h4 className="font-bold text-stone-900 text-sm mb-1 uppercase tracking-tight">Wyrok Skazujący: Bartosz B.</h4>
            <p className="text-[10px] text-stone-900 font-mono font-bold">Sygn. 66 T 146/2021</p>
            <details className="mt-2">
              <summary className="text-[10px] font-bold text-stone-900 cursor-pointer uppercase">Pokaż Strony (3)</summary>
              <div className="flex flex-col gap-2 mt-2">
                {GALLERY_WYROK_BADI.map((img, i) => (
                  <a key={i} href={img} target="_blank" className="text-[9px] text-stone-900 underline font-bold hover:bg-stone-300">Strona {i+1}</a>
                ))}
              </div>
            </details>
          </div>
        </div>

        <div className="group relative overflow-hidden bg-[#e4dbbe] border-[2px] border-stone-900 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] flex flex-col text-left rounded-none">
          <div className="aspect-[3/4] overflow-hidden bg-[#dfd5b4] border-b-[2px] border-stone-900">
            <img
              src="/gallery/janov/janov1.jpg"
              alt="Dokumentacja Janów"
              className="w-full h-full object-cover grayscale contrast-125 mix-blend-multiply transition-all duration-500"
            />
          </div>
          <div className="p-4 bg-[#e4dbbe]">
            <h4 className="font-bold text-stone-900 text-sm mb-1 uppercase tracking-tight">Dokumentacja: Janów</h4>
            <p className="text-[10px] text-stone-900 font-mono font-bold">KW LV 127</p>
            <details className="mt-2">
              <summary className="text-[10px] font-bold text-stone-900 cursor-pointer uppercase">Pokaż Galerię</summary>
              <div className="flex flex-col gap-2 mt-2">
                {GALLERY_JANOV.map((img, i) => (
                  <a key={i} href={img} target="_blank" className="text-[9px] text-stone-900 underline font-bold hover:bg-stone-300">Zdjęcie {i+1}</a>
                ))}
              </div>
            </details>
          </div>
        </div>

        <div className="group relative overflow-hidden bg-[#e4dbbe] border-[2px] border-stone-900 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] flex flex-col text-left rounded-none">
          <div className="aspect-[3/4] overflow-hidden bg-[#dfd5b4] border-b-[2px] border-stone-900 flex items-center justify-center">
            <span className="text-4xl grayscale">🏠</span>
          </div>
          <div className="p-4 bg-[#e4dbbe] flex-grow">
            <h4 className="font-bold text-stone-900 text-sm mb-1 uppercase tracking-tight">Posiadłość w Nýdku</h4>
            <p className="text-[10px] text-stone-900 font-mono font-bold">KW LV 832 (M. Iwiński)</p>
            <details className="mt-2">
              <summary className="text-[10px] font-bold text-stone-900 cursor-pointer uppercase">Pokaż Galerię</summary>
              <div className="flex flex-col gap-2 mt-2">
                {GALLERY_NYDEK.map((img, i) => (
                  <a key={i} href={img} target="_blank" className="text-[9px] text-stone-900 underline font-bold hover:bg-stone-300">Zdjęcie {i+1}</a>
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
    <div className="w-full pb-2 mb-2 flex flex-col items-center">
      <div className="flex items-center justify-center w-[98%] mx-auto pb-2">
        <h1 className="text-5xl md:text-[6.5rem] font-black tracking-tighter text-stone-900 uppercase font-serif leading-none whitespace-nowrap">
          NASZA GAZETKA
        </h1>
      </div>

      <div className="w-[98%] mx-auto border-y-[3px] border-stone-900 py-2 flex items-center justify-between px-2 text-[10px] md:text-sm font-bold uppercase tracking-[0.1em] text-stone-900">
        <div className="flex items-center gap-2">
          <span className="grayscale">📰</span>
          <span className="hidden sm:inline">Niezależne Media</span>
        </div>

        <div className="text-center font-serif">
          NIEDZIELA, 1 MARCA 2026
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline">Serwis Śledczy</span>
          <span className="grayscale">📄</span>
          <span className="hidden md:inline border-l-[2px] border-stone-900 pl-2 ml-1">Nr 01</span>
        </div>
      </div>
    </div>
  );
};

const CaseFile = ({ title, children, icon = '📄' }: { title: string, children: React.ReactNode, icon?: string }) => (
  <div className="my-8 border-[2px] border-stone-900 bg-[#e4dbbe] shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] overflow-hidden break-inside-avoid text-left rounded-none">
    <div className="bg-stone-900 border-b-[2px] border-stone-900 px-4 py-2 flex items-center gap-2 text-xs font-mono text-[#e4dbbe] uppercase tracking-wider font-bold">
      <span className="grayscale brightness-200">{icon}</span>
      <span>{title}</span>
    </div>
    <div className="p-6 font-mono text-sm md:text-base leading-relaxed text-stone-900 italic bg-[#dfd5b4]">
      {children}
    </div>
  </div>
);

const PullQuote = ({ quote, author, source }: { quote: string, author: string, source: string }) => (
  <div className="my-10 pl-6 border-l-[4px] border-stone-900 text-left bg-[#e4dbbe]">
    <p className="font-serif text-xl md:text-2xl italic text-stone-900 leading-relaxed mb-3">
      „{quote}”
    </p>
    <div className="font-sans text-[10px] uppercase tracking-widest text-stone-900 font-bold">
      — {author}, {source}
    </div>
  </div>
);

const LocationStampUI = ({ name, plot, lv }: { name: string, plot: string, lv: string }) => (
  <div className="relative border-[2px] border-stone-900 bg-[#e4dbbe] p-1 pr-6 flex items-center gap-4 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] group text-left rounded-none">
     <div className="absolute top-1 right-1 text-stone-900">
       🔍
     </div>
     <div className="bg-[#dfd5b4] h-full p-3 flex items-center justify-center border-r-[2px] border-stone-900 border-dashed transition-colors">
        <span className="text-xl grayscale">🏠</span>
     </div>
     <div className="py-2">
        <div className="text-[9px] uppercase tracking-[0.2em] text-stone-900 font-bold mb-1 flex items-center gap-2">
          {name}
        </div>
        <div className="font-mono text-base font-bold text-stone-900">LV {lv}</div>
        <div className="text-[10px] text-stone-900 font-mono mt-1 font-bold">
          Działka: {plot}
        </div>
     </div>
  </div>
);

const TransactionStampUI = ({ label, value, subDetails }: { label: string, value: string, subDetails?: string }) => (
  <div className="relative border-[2px] border-stone-900 bg-[#e4dbbe] p-1 pr-6 flex items-center gap-4 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] group text-left rounded-none">
     <div className="absolute top-1 right-1 text-stone-900">
       🔍
     </div>
     <div className="bg-[#dfd5b4] h-full p-3 flex items-center justify-center border-r-[2px] border-stone-900 border-dashed">
        <span className="text-xl grayscale">📜</span>
     </div>
     <div className="py-2">
        <div className="text-[9px] uppercase tracking-[0.2em] text-stone-900 font-bold mb-1">{label}</div>
        <div className="font-mono text-base font-bold text-stone-900">{value}</div>
        {subDetails && <div className="text-[10px] text-stone-900 font-mono mt-1 font-bold">{subDetails}</div>}
     </div>
  </div>
);

const ArticleVideoPlayer: React.FC<{ src: string; poster: string }> = ({ src, poster }) => {
  return (
    <div className="my-12 w-full bg-stone-900 rounded-none shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] border-[2px] border-stone-900 overflow-hidden">
      <video controls poster={poster} className="w-full h-auto block opacity-95">
        <source src={src} type="application/x-mpegURL" />
        Twoja przeglądarka nie obsługuje odtwarzacza wideo. <a href={src} className="text-[#e4dbbe] underline font-bold">Pobierz plik</a>.
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoArrestSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStefanekSchema) }}
      />

      <main className="min-h-screen bg-[#e4dbbe] text-[#1c1917] selection:bg-stone-900 selection:text-[#e4dbbe] font-serif flex flex-col items-center">
        
        <div className="w-full max-w-5xl bg-[#e4dbbe] min-h-screen shadow-2xl border-x-[3px] border-stone-900 flex flex-col relative overflow-hidden">

          <div className="w-full pt-4 px-6 flex flex-col items-center z-10 relative">
            <BrandHeader />
          </div>

          <div className="w-full mx-auto flex-grow flex flex-col z-10 relative">
            
            <div className="w-full text-center flex flex-col justify-center items-center pb-6 px-6 pt-4">
              <img
                src="/zdjeciehej.png"
                alt="Wiedźmini z eliksirem"
                className="h-32 md:h-[180px] object-contain grayscale contrast-125 mix-blend-multiply mb-1"
              />

              <h2 className="text-stone-900 w-full mb-1">
                <span className="block text-4xl md:text-[5.5rem] font-bold leading-none tracking-tight uppercase">
                  Eliksir Wiedźmina
                </span>
                <span className="block text-sm md:text-2xl text-stone-900 italic font-medium uppercase tracking-widest mt-2 whitespace-nowrap font-bold">
                  Mroczna tajemnica twórców CD Projekt
                </span>
              </h2>

              <div className="max-w-3xl mx-auto px-4 mt-2">
                <p className="text-base md:text-xl text-stone-900 leading-snug italic font-serif font-bold">
                  Ayahuasca, policyjne naloty i tragedia, o której nie miał się nikt dowiedzieć. Publicznie dostępne akta i rejestry ujawniają, jak twórcy gry „Wiedźmin” finansowali szamańskie podziemie.
                </p>
              </div>
            </div>

            <article className="max-w-3xl mx-auto px-6 pt-2 pb-0 flex-grow w-full z-10 relative">
              <div className="prose prose-stone prose-lg max-w-none prose-headings:font-sans prose-headings:font-bold prose-blockquote:not-italic
                prose-a:text-stone-900 prose-a:font-bold prose-a:no-underline prose-a:underline prose-a:decoration-double prose-a:decoration-stone-900 hover:prose-a:bg-stone-300 transition-colors">

                <p className="first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-stone-900 leading-relaxed mt-0">
                  W 2020 roku media obiegły doniesienia o rozbiciu grupy polskich szamanów w czeskich <strong>Hermanovicach</strong>. Policyjny nalot, aresztowanie <strong>Jarosława i Karoliny Kordysów</strong>, a następnie surowe wyroki – 8,5 oraz 5,5 roku więzienia za prowadzenie nielegalnego biznesu polegającego na organizacji tzw. &quot;ceremonii&quot;, podczas których klientom podawano egzotyczny psychodelik – ayahuaskę.
                </p>

                <p>
                  Ayahuaska to tradycyjny wywar z amazońskich roślin o silnym działaniu halucynogennym. Ze względu na wysoką zawartość DMT – substancji psychodelicznej wywołującej intensywne wizje i zmiany stanu świadomości, jej posiadanie i podawanie jest w Polsce i Czechach zabronione. Finałem medialnego spektaklu Kordysów było ułaskawienie przez czeskiego prezydenta po dwóch latach odsiadki.
                </p>

                <p>
                  Kurtyna opadła, temat ucichł. Ale czy to na pewno koniec tej historii? W cieniu tego głośnego procesu toczył się drugi – cichy i błyskawiczny, zakończony dyskretnym wyrokiem, o którym nikt nawet w mediach się nie zająknął. Analiza sądowych dokumentów prowadzi do zdumiewających wniosków.
                </p>

                <p>
                  W przygranicznym Janowie funkcjonował drugi, bliźniaczy ayahuaskowy ośrodek, którego współwłaścicielem okazał się miliarder – <strong>Michał Kiciński</strong>.
                </p>

                <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b-[3px] border-stone-900 pb-2 uppercase">Świadek B.</h2>

                <p>
                  W obszernym i publicznie dostępnym uzasadnieniu <a href="#galeria" className="font-bold text-stone-900 underline decoration-double decoration-stone-900 hover:bg-stone-300 transition-colors">wyroku</a> Jarosława Kordysa pojawia się postać świadka Bartosza B.
                </p>

                <p>
                  Zgodnie z aktami:
                </p>

                <CaseFile title="Zeznania świadka B." icon="✉️">
                  &quot;Świadek B. odnośnie osoby oskarżonego [Jarosława Kordysa] oświadczył, że zna się z nim ok. 8 lat, a poznali się w Holandii&quot;.
                  <br/><br/>
                  &quot;Świadek B. potwierdził, że i on sam w przeszłości prowadził warsztaty&quot;, a obecnie sam &quot;jest przedmiotem dochodzenia policji w Krnowie właśnie z powodu ceremonii&quot;.
                </CaseFile>

                <p>
                  Akta ujawniają również skalę zarzutów wobec Bartosza B.:
                </p>

                <CaseFile title="Zarzuty wobec Bartosza B.">
                  &quot;(...) wymieniony był sprawdzany w związku z występkiem niedozwolonej produkcji i innego obchodzenia się ze środkami odurzającymi (...) albowiem miał w roku 2014 zlecić przesłanie na swój adres przesyłki pocztowej przechwyconej na lotnisku w Lipsku RFN zawierającej 4,5 kg DMT, a 6.6.2018 miało dojść do zatrzymania przesyłki pocztowej we Frankfurcie nad Menem RFN zawierającej 2000 g meskaliny i 38,6 g substancji DMT.&quot;
                </CaseFile>

                <p>
                  Intrygujący fragment dotyczy własności &quot;bazy&quot;. Dokumenty stwierdzają:
                </p>

                <CaseFile title="Własność nieruchomości">
                  &quot;(...) budynek rodzinny w miejscowości Janów (...), który jest częściowo użytkowany do stałego zamieszkania, a częściowo jako komercyjny obiekt noclegowy&quot;
                  <br/><br/>
                  &quot;Świadek [Bartosz B.] potwierdził, że w Janowie jest właścicielem jednej dziesiątej nieruchomości&quot;.
                </CaseFile>

                <p>
                  Do kogo należała reszta? Sąd wskazuje wprost:
                </p>

                <CaseFile title="Ustalenia Sądu">
                  &quot;...w odniesieniu do nieruchomości będących współwłasnością <strong>Bartosza B.</strong> i <strong>Michała D. K.</strong>&quot;.
                </CaseFile>

                <p>
                  W Czechach księgi wieczyste są jawne i dostępne online. Wystarczy wejść na stronę Katastru Nieruchomości, wyszukać <a href="#galeria" className="font-bold text-stone-900 underline decoration-double decoration-stone-900 hover:bg-stone-300 transition-colors">działkę w Janowie</a> i za niewielką opłatą pobrać jej pełną historię.
                </p>

                <div className="my-8 flex justify-start">
                    <LocationStampUI
                      name="JANOV U KRNOVA"
                      plot="st. 281"
                      lv="127"
                    />
                </div>

                <p>
                Pobrany dokument nie pozostawia wątpliwości: w latach 2012–2023 współwłaścicielami nieruchomości byli:
                   <br/>
                   Bartosz Badowski (10%)
                   <br/>
                   <span className="bg-stone-900 px-1 font-bold text-[#e4dbbe] box-decoration-clone">Michał Dawid Kiciński (90%)</span>
                </p>

                <p>
                  Drugie imię – Dawid – idealnie wypełnia lukę w zanonimizowanym skrócie &quot;Michal D. K.&quot;. <span className="bg-stone-900 px-1 font-bold text-[#e4dbbe] shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] box-decoration-clone">Wspólnikiem szamana był twórca &quot;Wiedźmina&quot; – jeden z najbogatszych Polaków.</span>
                </p>

                <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b-[3px] border-stone-900 pb-2 uppercase">Na podsłuchu</h2>

                <p>
                  Przełom w sprawie organizatorów ayahuaskowych ceremonii w 2020 roku nastąpił dzięki policyjnej technice operacyjnej. Telefon Kordysa był na stałym podsłuchu, a funkcjonariusze słuchali na żywo, gdy w dniu 24.08.2020 r. doszło do nerwowej wymiany zdań pomiędzy Badowskim i Kordysem.
                </p>

                <p>
                  Kordys zadzwonił do Badowskiego wyraźnie zaniepokojony wieściami, które do niego dotarły. Bał się, że tragedia, o której huczało w kuluarach, może zniszczyć ich imperium. Sąd w uzasadnieniu wyroku precyzyjnie rekonstruuje ten moment:
                </p>

                <CaseFile title="Rekonstrukcja rozmowy (Uzasadnienie Sądu)" icon="🔍">
                  &quot;oskarżony [Jarosława Kordysa] omawia z B., że dotarła do niego informacja, że w obiekcie w Janowie <span className="underline decoration-stone-900 decoration-4 underline-offset-4 font-bold bg-[#e4dbbe] text-stone-900 px-1">zmarła jakaś kobieta</span>&quot;.
                </CaseFile>

                <p>
                  W rozmowie pojawia się też wątek zagrożenia ze strony osoby trzeciej – mężczyźni omawiają szantażystę, który chce iść na policję. Kordys wprost pyta wspólnika:
                </p>

                <CaseFile title="Pytanie Kordysa" icon="🔍">
                  &quot;W jakim zagrożeniu jest nasza praca?&quot;
                </CaseFile>

                <p>
                  Odpowiedź na to pytanie znajduje się w aktach sprawy i nie pozostawia złudzeń co do intencji rozmówców. W uzasadnieniu wyroku Kordysa czytamy:
                </p>

                <div className="my-12 pl-6 border-l-[4px] border-stone-900 font-serif italic text-xl text-stone-900 bg-[#dfd5b4] py-4 pr-4 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)]">
                  &quot;Z ich rozmowy wynika, że nie zajmowali się w zasadzie samym faktem śmierci, lecz raczej obawą, aby to nie przyciągnęło uwagi policji.&quot;
                </div>

                <p>
                  Dla sądu był to koronny dowód na to, że oskarżeni prowadzili nielegalny biznes, a nie działalność duchową – śmierć człowieka była dla nich jedynie &quot;psuciem interesów&quot;.
                </p>

                <p>
                  Cynizm tej konwersacji sięga zenitu chwilę później. Gdy tylko ustalili strategię uciszenia plotek, natychmiast przeszli do logistyki dostaw narkotyku. Sąd odnotowuje, że zaraz po dywagacjach o śmierci i szantażu, rozmówcy wracają do interesów:
                </p>

                <CaseFile title="Kontynuacja rozmowy" icon="🔍">
                  &quot;Następnie w rozmowie omawiają zamówienia «herbaty» z dżungli i to, czy im tego «nie zepsują», ekscytując się nagraniem od dostawcy, który «siedzi w dżungli i gotuje».&quot;
                </CaseFile>

                <p>
                  Dla policjantów, którzy słyszeli to w czasie rzeczywistym, przekaz był jasny: w obiekcie mogło dojść do tragedii, a sprawcy martwili się jedynie o ciągłość dostaw.
                </p>

                <p>
                  Zaledwie dwa dni po tym telefonie, 26.08.2020 czescy policjanci weszli do posiadłości w Janowie. Efekty rewizji opisano w wyroku Kordysa:
                </p>

                <CaseFile title="Protokół rewizji">
                  &quot;w nieruchomości zabezpieczono rzeczy... oprócz marihuany zabezpieczono również substancje zawierające DMT o objętości ok. 2 kg&quot;.
                </CaseFile>

                <p>
                  Podczas policyjnej interwencji zidentyfikowano tam 15 obywateli Polski, którzy mieli brać udział w ceremonii. Wśród nich, stali bywalcy i bliscy znajomi Badowskiego – <strong>Krzysztof Stefanek</strong> i <strong>Lena Drzewińska</strong>, których obecność w momencie wkroczenia służb ma znaczenie w kontekście późniejszej ich roli w tej historii.
                </p>

                <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b-[3px] border-stone-900 pb-2 uppercase">Cena wolności</h2>

                <p>
                  Kiedy 26 sierpnia 2020 roku czeska policja weszła do posiadłości w Janowie, należącej do Bartosza Badowskiego i miliardera Michała Kicińskiego, Jarosław Kordys w Hermanovicach wciąż czuł się bezpiecznie. Nie wiedział jeszcze, że zegar zaczął odliczać czas do jego własnej katastrofy. Zaledwie 7 tygodni po cichym nalocie na Badowskiego policja zapukała do Kordysów.
                </p>

                <p>
                  15 października 2020 roku sielankę w ich ośrodku przerwał huk granatów ogłuszających. Czeska jednostka antyterrorystyczna nie bawiła się w półśrodki: zamaskowani funkcjonariusze z długą bronią wdarli się do budynku, rzucając na ziemię przyszłych bohaterów głośnego skandalu.
                </p>

                <div className="my-12 w-full">
                   <ArticleVideoPlayer
                      src={VIDEO_ARREST_METADATA.contentUrl}
                      poster=""
                   />
                </div>
                  <div className="mt-1 text-sm text-stone-900 font-sans border-l-[3px] border-stone-900 pl-3 mb-12 bg-[#dfd5b4] py-2 pr-2 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)]">
                     <span className="font-bold text-stone-900 uppercase text-xs mr-2">Materiał Operacyjny:</span>
                     Nagranie z policyjnego nalotu na ośrodek w Hermanovicach (15.10.2020)
                  </div>

                <p>
                  Co wydarzyło się w ciągu tych niespełna dwóch miesięcy? Odpowiedź kryje się w jednym czeskim terminie prawnym:
                </p>

                <div className="my-12 flex gap-4 p-5 bg-[#dfd5b4] border-[2px] border-stone-900 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] rounded-none">
                  <span className="text-3xl mt-1 grayscale">⚖️</span>
                  <div>
                    <strong className="block font-serif text-stone-900 text-lg font-bold mb-1 uppercase">Dohoda o vině a trestu</strong>
                    <div className="text-stone-900 text-lg leading-relaxed font-bold">
                      Ugoda o winie i karze. Czeska procedura karna pozwalająca oskarżonemu na dobrowolne poddanie się karze w zamian za łagodniejszy wyrok, bez przeprowadzania pełnego procesu dowodowego i wzywania świadków.
                    </div>
                  </div>
                </div>

                <p>
                  Bartosz &quot;Badi&quot; Badowski, wspólnik jednego z najbogatszych Polaków, błyskawicznie zrozumiał swoje położenie. W obliczu zabezpieczonych dowodów – w tym 2 kilogramów substancji z DMT i marihuany – wybrał strategię, która miała uchronić go przed wieloletnim więzieniem. Postanowił &quot;kupić&quot; sobie wolność.
                </p>

                <p>
                  Ugoda pozwoliła na zamknięcie jego teczki bez wywoływania świadków, co w praktyce oznaczało, że mechanizmy działania janowskiego ośrodka nigdy nie wybrzmiały echem w publicznej debacie, chroniąc Badowskiego przed krzyżowym ogniem pytań i zeznaniami, które mogłyby pogrążyć także jego cichego wspólnika.
                </p>

                <p>
                  Cena wolności Badowskiego okazała się być wysoka dla jego kolegi z branży. Zeznania &quot;Badiego&quot; były dla prokuratury bezcennym materiałem dowodowym, który pozwolił domknąć łańcuch poszlak w sprawie Kordysów.
                </p>

                <p>
                   Na mocy <a href="#galeria" className="font-bold text-stone-900 underline decoration-double decoration-stone-900 hover:bg-stone-300 transition-colors">wyroku</a> z dnia 2 listopada 2021 roku Bartosz Badowski został uznany winnym popełnienia &quot;zbrodni niedozwolonej produkcji i innego obchodzenia się ze środkami odurzającymi&quot;.
                </p>

                <p>
                  Sąd ustalił, że:
                </p>

                <CaseFile title="Ustalenia wyroku skazującego Bartosza B.">
                  &quot;co najmniej od bliżej nieustalanej daty w 2015 roku do 26.08.2020 [...] oferował, organizował i co najmniej w 441 przypadkach zrealizował w nieregularnych odstępach czterodniowe i dziesięciodniowe pobyty [...] ukierunkowane na tzw. duchowe ćwiczenia spirytualne&quot;
                  <br/><br/>
                  &quot;udostępnił uczestnikom do użycia bliżej nieustaloną ilość substancji psychotropowych, a mianowicie tzw. ayahuascę zawierającą dimetylotryptaminę (DMT) oraz tzw. marihuanę zawierającą tetrahydrokannabinol (THC)&quot;
                  <br/><br/>
                  &quot;przechowywał łącznie 1902,79 grama materiału roślinnego (...), który zawierał łącznie 37,24 grama substancji czynnej dimetylotryptaminy (DMT) oraz 92,29 grama tzw. narkotyku marihuany&quot;.
                </CaseFile>

                <p>
                  Podczas, gdy Jarosław Kordys został skazany na 8,5 roku pozbawienia wolności Bartosz Badowski, którego sprawa dotyczyła tego samego procederu, tych samych substancji, regionu i czasu trwania działalności, dzięki ugodzie i współpracy z wymiarem sprawiedliwości, zakończył sprawę wyrokiem w zawieszeniu.
                </p>

                <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b-[3px] border-stone-900 pb-2 uppercase">Cisza po burzy</h2>

                <p>
                  Choć Badowski zaprzestał prowadzenia działalności szamańskiej, posiadłość w Janowie nie opustoszała – zamieszkali z nim wspomniani wcześniej Krzysztof Stefanek i Magdalena Drzewińska. Ich obecność u boku &quot;Badiego&quot; w tamtym czasie rzuca cień na ich późniejszą rolę; nie byli to wszakże niewinni obserwatorzy, lecz ludzie, którzy mimo tego, że sami byli obecni podczas policyjnej interwencji, pozostali lojalni wobec byłego szamana.
                </p>

                <p>
                  Będąc tak blisko Badowskiego, doskonale znali mroczną tajemnicę śmierci Ilony. Ich decyzja o zamieszkaniu z człowiekiem, który w obliczu tragedii martwił się o &quot;ciągłość dostaw&quot;, dowodzi, że w pełni akceptowali reguły zmowy milczenia.
                </p>

                <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b-[3px] border-stone-900 pb-2 uppercase">Kiciński</h2>

                <p>
                  W cieniu tych wyroków pozostaje wciąż niewyjaśniona rola cichego wspólnika. Michał Kiciński to nie jest postać, która o ayahuasce jedynie &quot;słyszała&quot; – on stał się jej nieoficjalnym ambasadorem w polskich mediach głównego nurtu. W licznych wywiadach (m.in. dla &quot;Focusa&quot;, &quot;Newsweeka&quot;) z niezwykłą precyzją opisuje on mechanizmy działania psychodelików. Kiciński publicznie opowiada o lekcjach pokory, jakie dała mu &quot;medycyna&quot;, o spotkaniach z szamanami i o tym, jak napar z dżungli otwiera &quot;nową rzeczywistość&quot;.
                </p>

                <PullQuote
                  quote="Po ayahuasce jest szansa na to, żeby sobie nie ściemniać."
                  author="Michał Kiciński"
                  source="Newsweek, 30 maja 2016 r."
                />

                <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b-[3px] border-stone-900 pb-2 uppercase">&quot;Błąd z Badim&quot;</h2>

                <p>
                   Michał Kiciński wiedział o Ilonie. Jego konfrontacja z organami ścigania nabrała formalnego kształtu dopiero jesienią 2023 roku. 21 września 2023 roku miliarder osobiście odebrał wezwanie do stawiennictwa w charakterze świadka w sprawie o sygnaturze WD-I-3186/23. Miało się ono odbyć 18.10.2023. Na wezwaniu czytelnie było napisane, że przesłuchanie będzie dotyczyć &quot;pobytu w Janowie&quot;.
                </p>

                <div className="my-12 flex flex-col items-center">
                  <a href="/wezwanie_kicinski.png" target="_blank">
                    <img
                      src={`${KORDYS_IMAGES_URL}/wezwanie/wezwanie_kicinski.png`}
                      alt="Wezwanie na policję"
                      className="w-48 border-[2px] border-stone-900 cursor-pointer hover:opacity-90 transition-opacity mix-blend-multiply grayscale shadow-[4px_4px_0px_0px_rgba(28,25,23,1)]"
                    />
                  </a>
                  <p className="text-xs text-stone-900 mt-4 font-mono uppercase tracking-wider w-48 text-center font-bold bg-[#dfd5b4] py-1 border-[2px] border-stone-900">
                    Skan wezwania
                  </p>
                </div>

                <p>
                  Reakcja miliardera na zainteresowanie organów ścigania była błyskawiczna. Zwrócił się bezpośrednio do autora zawiadomienia – wysyłając mu wiadomość mailową z propozycją swoistej pokuty. Zamiast wyjaśnień prokuratorskich zaoferował przelew na cel charytatywny, nazywając lata nielegalnego procederu młodzieńczą naiwnością.
                </p>

                <CaseFile title="Wiadomość prywatna od M. Kicińskiego" icon="✉️">
                  &quot;(...) Tak mogę zapłacić za swój błąd z Badim. Podaj mi Fundacje lub Stowarzyszenie (najlepiej powiązaną z hospicjum lub domami dziecka, bo tu widzę morze potrzeb i dużo cierpienia) i wpłacę tam dobrowolnie kwotę darowizny, w ramach Przeprosin wszechświatowi, za moją młodzieńczą naiwność i brak przenikliwości. Fundacja / Stowarzyszenie musi być uznana i z tradycjami, a nie jakaś organizacja krzak. Wyślę Ci potwierdzenie przelewu. (...)&quot;
                </CaseFile>

                <p>
                  Do przesłuchania doszło tydzień przed terminem wskazanym na wezwaniu – 11 października 2023 roku o godzinie 15:00 w Komendzie Rejonowej Policji Warszawa II. W protokole Kiciński przyjmuje linię opartą na braku świadomości co do charakteru działalności prowadzonej w jego posiadłości.
                </p>

                <CaseFile title="Zeznanie do protokołu">
                  &quot;Nie mam żadnej wiedzy co się działo na mojej farmie, w której jestem 90% udziałowcem (...) wynajmowałem tę nieruchomość.&quot;
                </CaseFile>

                <p>
                  Gdy w toku czynności padło kluczowe pytanie o jego własny udział w ceremoniach ayahuaski w Janowie, odpowiedź była lakoniczna:
                </p>

                <CaseFile title="Odpowiedź na pytanie o udział">
                  &quot;nie brałem udziału w takich ceremoniach w latach 2016-2023, a o wcześniejszym okresie <span className="bg-stone-900 text-[#e4dbbe] px-1 font-bold">odmawiam odpowiedzi</span>&quot;
                </CaseFile>

                <p>
                  W kontekście złożonych zeznań warto zauważyć, że miliarder jest właścicielem luksusowego ośrodka Munay Sonqo w Peru, o którym wielokrotnie wspominał w wywiadach.
                </p>

                <p>
                  W przeciwieństwie do Europy, peruwiańskie prawo zezwala na komercyjne prowadzenie ceremonii z ayahuascą. Ośrodek Kicińskiego oferuje tam w pełni jawną i profesjonalną sprzedaż usług o profilu bliźniaczym do tych, które w Czechach są zakazane, co wciąż jest eksponowane na stronie internetowej.
                </p>

                <p>
                  Fakt, że Kiciński w momencie przesłuchania zarządzał legalnym biznesem ayahuaskowym w Ameryce Południowej, stawia pod znakiem zapytania jego deklarowaną nieświadomość co do profilu działalności w Janowie.
                </p>

                <p>
                  Co na to Bartosz Badowski?
                </p>

                <CaseFile title="Fragment korespondencji B. Badowskiego" icon="✉️">
                  &quot;Przelewy wysyłałem z mojego konta ING, które mam do tej pory [...]. Tytuł „wynajem”. (...) Dopóki zarabiałem - dzieliłem się z nim zyskiem.(...) Michał wiedział dokładnie co się dzieje na farmie i czerpał z tego zyski przez wiele wiele lat. (...) Rozważam też wizytę na Policji w Czechach - ja poniosłem prawne konsekwencje za prowadzenie ceremonii, ale Kiciński - żadnych. Mimo, że to on czerpał z tego największe zyski, to on był nade mną i był większościowym właścicielem farmy.&quot;
                </CaseFile>

                <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b-[3px] border-stone-900 pb-2 uppercase">Anonimowy filantrop</h2>

                <p>
                  W listopadzie 2025 roku na kanale YouTube &quot;<strong>Osada Natury Zew</strong>&quot; pojawia się nagrany rok wcześniej film, w którym obecny gospodarz, <strong>Krzysztof Stefanek</strong>, snuje opowieść o powstaniu &quot;Osady&quot;. W sielskiej scenerii, z uśmiechem na ustach, buduje narrację o cudownym zbiegu okoliczności i tajemniczym dobroczyńcy.
                </p>

                <p>
                  Stefanek wspomina, jak wspólnie z grupą przyjaciół pomagał uporządkować sprawy własnościowe, by obiekt &quot;znalazł się w jednych rękach&quot;. Kluczowy moment tej opowieści Stefanek datuje z niezwykłą precyzją:
                </p>

                <CaseFile title="Wypowiedź K. Stefanka">
                  &quot;Ostatecznie <span className="bg-stone-900 px-1 font-bold text-[#e4dbbe] box-decoration-clone">23 października 2023 roku</span> ten człowiek do nas zadzwonił powiedział, że wspólnie z żoną zdecydowali, że oni by chcieli to miejsce przekazać w darowiźnie&quot;
                </CaseFile>

                <p>
                  Stefanek przedstawia to jako efekt &quot;researchu&quot; darczyńcy, który rzekomo urzekła wizja działalności non-profit.
                </p>

                <div className="my-12 w-full">
                       <ArticleVideoPlayer
                    src={VIDEO_STEFANEK_METADATA.contentUrl}
                    poster=""
                  />
                </div>
                  <div className="mt-1 text-sm text-stone-900 font-sans border-l-[3px] border-stone-900 pl-3 mb-12 bg-[#dfd5b4] py-2 pr-2 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)]">
                    <span className="font-bold text-stone-900 uppercase text-xs mr-2">Materiał Wideo:</span>
                    Krzysztof Stefanek opowiada o &quot;cudownym&quot; otrzymaniu darowizny (Materiał z 2025 r.)
                  </div>

                <p>
                  Jednak kalendarz wydarzeń prawnych burzy ten romantyczny mit, ujawniając nerwowy pośpiech w pozbywaniu się &quot;gorącego kartofla&quot;:
                </p>

                <ul className="list-none space-y-12 my-12 font-mono text-sm border-l-[4px] border-stone-900 pl-4">
                  <li className="flex items-start gap-3">
                    <span className="grayscale">📅</span>
                    <div className="bg-[#dfd5b4] border-[2px] border-stone-900 p-4 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] w-full">
                      <strong className="text-stone-900">21 września 2023 r.</strong> – Michał Kiciński odbiera wezwanie na przesłuchanie w sprawie Janowa.
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="grayscale">📅</span>
                    <div className="bg-[#dfd5b4] border-[2px] border-stone-900 p-4 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] w-full">
                      <strong className="text-stone-900">3 października 2023 r.</strong> – Na tydzień przed wizytą na komendzie odkupuje od Bartosza Badowskiego jego 10% udziałów w nieruchomości. Aby pozbyć się całego ośrodka jednym podpisem, musi najpierw stać się jego jedynym właścicielem.
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="grayscale">📅</span>
                    <div className="bg-[#dfd5b4] border-[2px] border-stone-900 p-4 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] w-full">
                      <strong className="text-stone-900">11 października 2023 r.</strong> – Miliarder staje przed policją. Do protokołu odmawia zeznań na temat swojej przeszłości w tym miejscu.
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="text-stone-900 mt-3 grayscale">📅</span>
                    <div className="bg-stone-900 text-[#e4dbbe] border-[2px] border-stone-900 p-4 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] w-full relative overflow-hidden">
                      <span className="font-bold">23 października 2023 r.</span> – Zaledwie 12 dni po kłopotliwym przesłuchaniu, gdy formalności własnościowe z Badim są już dopięte, następuje telefon do Stefanka z propozycją oddania majątku wartego miliony za darmo.
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="grayscale">📅</span>
                    <div className="bg-[#dfd5b4] border-[2px] border-stone-900 p-4 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] w-full">
                      <strong className="text-stone-900">21 grudnia 2023 r.</strong> – Finał operacji. Kiciński formalnie przekazuje Janów w formie darowizny. Nieruchomość trafia do stowarzyszenia &quot;non-profit&quot; – fasadowej organizacji &quot;krzak&quot;, zarządzanej przez ludzi, którzy przez lata byli częścią tego procederu. Miliarder pozbywa się dowodów, a nowi właściciele zyskują bazę do dalszej działalności pod nowym szyldem.
                    </div>
                  </li>
                </ul>

                <p>
                  Cynizm tej sytuacji pogłębia fakt, że obdarowani nie byli przypadkowymi entuzjastami ekologii. <strong>Krzysztof Stefanek</strong>, który w filmie mówi o &quot;odwróconej logice&quot; i pięknie wolontariatu, i jego konkubina <strong>Magdalena Drzewińska</strong> w rzeczywistości doskonale znali mroczną historię Janowa i tajemnicę śmierci Ilony. Przyjmując darowiznę, przejmowali nie tylko ziemię, ale i milczenie.
                </p>

                <div className="my-8 flex justify-start">
                   <TransactionStampUI
                    label="Nr Transakcji (Katastr)"
                    value="V-5821/2023-127"
                    subDetails="Obręb: Janów u Krnova [656976]"
                  />
                </div>

                <p>
                  Ostatecznie strategia okazała się skuteczna. Śledztwo umorzono zanim się zaczęło, a majątek, który mógł podlegać przepadkowi jako narzędzie przestępstwa, został bezpiecznie zaparkowany w &quot;stowarzyszeniu&quot;. Kiciński pozostał anonimowym &quot;filantropem&quot;, a Stefanek – opiekunem nowej, &quot;czystej&quot; osady.
                </p>

                <p>
                  Na tragedii świadomie wzbogacili się ludzie, dla których tuszowanie prawdy stało się fundamentem ich nowej, intratnej rzeczywistości. Pod szyldem organizacji non-profit <strong>Stowarzyszenie Natury Zew</strong> żyją teraz z organizacji turnusów wypoczynkowych z cennikiem darowizn zamiast paragonów, okłamując swoich gości i publicznie każdego, kto natrafi na ich sielankowe filmiki. A przecież &quot;zadośćuczynienie wszechświatowi&quot; miało trafić na hospicjum, a nie na &quot;organizację krzak&quot;.
                </p>

                <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b-[3px] border-stone-900 pb-2 uppercase">Nýdek</h2>

                <p>
                  Gdyby sprawa dotyczyła tylko jednego miliardera, można by mówić o przypadku lub pechowym doborze najemców. Jednak nieco dalej od Janowa, w miejscowości <strong>Nýdek</strong>, funkcjonował kolejny, bliźniaczy ośrodek.
                </p>


                <p>
                  Relacje świadków wskazują, że w <a href="#galeria" className="font-bold text-stone-900 underline decoration-double decoration-stone-900 hover:bg-stone-300 transition-colors">posiadłości w Nýdku</a> odbywały się regularne ceremonie o charakterze zbliżonym do tych u Kordysów i Badowskiego, prowadzone przez <strong>Piotra &quot;Bonawenturę&quot; Tracza</strong>. Chociaż witryna ośrodka już nie istnieje, archiwum internetu &quot;Wayback Machine&quot; zachowało zrzuty strony tribunydek.com. Opisy warsztatów jednoznacznie wskazują, że nieruchomość była wykorzystywana do pracy z psychodelikami.
                </p>

                <p>
                  Skoro wiemy już, czym ten dom był, kluczowym pytaniem staje się: do kogo należał?
                </p>

                <p>
                  Analiza czeskich ksiąg wieczystych przynosi sensacyjne odkrycie. Właścicielem tej kolejnej szamańskiej świątyni – dokładnie w czasie, gdy strona internetowa zapraszała na ceremonie – był drugi z duetu miliarderów stojących za gamingowym gigantem, <span className="bg-stone-900 px-1 font-bold text-[#e4dbbe] box-decoration-clone shadow-[2px_2px_0px_0px_rgba(28,25,23,1)]">Marcin Iwiński</span>. Dokumenty urzędowe bezlitośnie łączą jego nazwisko z infrastrukturą, w której odbywał się nielegalny proceder.
                </p>


                <div className="my-8 flex justify-start">
                    <LocationStampUI
                      name="NÝDEK"
                      plot="st. 506/1"
                      lv="832"
                    />
                </div>

                <p>
                  <span className="bg-stone-900 px-1 font-bold text-[#e4dbbe] shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] leading-relaxed block p-2">Oznacza to, że nie jeden lecz obaj legendarni założyciele CD Projekt, na czeskim pograniczu posiadali nieruchomości, w których odpłatnie oferowano te same nielegalne substancje.</span>
                </p>

                <p>
                  Jeszcze bardziej zastanawiające jest to, co stało się z tą nieruchomością w momencie zagrożenia. Gdy 15.10.2020 roku aresztowano Kordysa, nad środowiskiem zawisło widmo policyjnych nalotów. Dokumenty urzędowe odsłaniają niepokojącą zbieżność dat:
                </p>

                <ul className="list-none space-y-12 my-12 font-mono text-sm border-l-[4px] border-stone-900 pl-4">
                   <li className="flex items-start gap-3">
                    <span className="grayscale">📅</span>
                    <div className="bg-[#dfd5b4] border-[2px] border-stone-900 p-4 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] w-full">
                      <strong className="text-stone-900">15 października 2020 r.</strong> – Policyjny szturm na ośrodek Kordysów. W środowisku wybucha panika.
                    </div>
                   </li>

                  <li className="flex items-start gap-3">
                    <span className="grayscale">📅</span>
                    <div className="bg-[#dfd5b4] border-[2px] border-stone-900 p-4 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] w-full">
                      <strong className="text-stone-900">15 czerwca 2021 r.</strong> – Marcin Iwiński sprzedaje nieruchomości w Nýdku.
                    </div>
                  </li>
                </ul>

                <p>
                  Nabywcą luksusowej posiadłości nie został inny inwestor, lecz sam Piotr Tracz – ten sam człowiek, który wcześniej pełnił tam rolę szamana.
                </p>

                <div className="my-8 flex justify-start">
                  <TransactionStampUI
                    label="Nr Transakcji (Katastr)"
                    value="V-2937/2021-832"
                    subDetails="Obręb: Nýdek [708186]"
                  />
                </div>

                <p>
                  Transakcja ta rodzi wątpliwości: w jaki sposób niszowy szaman sfinansował zakup luksusowej willi od jednego z najbogatszych Polaków? Nowy właściciel niemal natychmiast zmienił formalny profil działalności na legalne warsztaty pracy z ciałem. Zbieżność tej sekwencji zdarzeń z &quot;darowizną&quot; Kicińskiego w Janowie pozwala dostrzec powtarzalny schemat wycofywania się właścicieli z infrastruktury powiązanej z nielegalnym procederem.
                </p>

                <h2 className="text-3xl mt-16 mb-8 tracking-tight text-stone-900 border-b-[3px] border-stone-900 pb-2 uppercase">Wiktor B.</h2>

                <p>
                  3 marca 2026 Onet ujawnia opinii publicznej wstrząsające kulisy działalności ośrodka w czeskim Janowie, gdzie podczas szamańskich ceremonii z użyciem ayahuaski miało dojść do tragicznych zdarzeń. Dziennikarskie śledztwo koncentruje się na śmierci 54-letniej uczestniczki, Ilony L.-H.
                </p>

                <p>
                  Według ustaleń Onetu, w czerwcu 2018 roku na farmie w Janowie doszło do tragedii. Podczas nocnej ceremonii z użyciem ayahuaski, kobieta poczuła się fatalnie, zmagając się z silnym bólem i intensywnymi wymiotami. Mimo jej krytycznego stanu, nikt nie wezwał pomocy medycznej. Co więcej, uczestnikom odebrano wcześniej telefony, co uniemożliwiło im samodzielne zaalarmowanie służb ratunkowych.
                </p>

                <p>
                  Prowadzący obrzęd Wiktor B., brat głównego organizatora ceremonii znanego jako Badi, był tej nocy pod wpływem marihuany. Z relacji świadków wynika, że po śmierci kobiety podjął on natychmiastowe działania mające na celu zatuszowanie incydentu. Nakazał uczestnikom bezzwłoczne opuszczenie ośrodka. Czeskiej policji przedstawił fałszywą wersję zdarzeń, twierdząc, że Ilona L.-H. była jedynie gościem i została znaleziona martwa w łazience nad ranem. Służby początkowo nie nabrały podejrzeń, przyjmując tę relację za wiarygodną.
                </p>

                <p>
                  Przez kolejne lata tę kłamliwą narrację udawało się skutecznie utrzymywać. O nieszczęśliwym wypadku i śmierci z przyczyn naturalnych przez długi czas przekonana była nawet najbliższa rodzina Ilony.
                </p>

                <p>
                  Sytuacja uległa diametralnej zmianie 6 maja 2024 roku, gdy Prokuratura Okręgowa w Częstochowie wszczęła oficjalne śledztwo w sprawie działalności ośrodka oraz okoliczności śmierci Ilony L.-H. Kilka miesięcy po rozpoczęciu intensywnych działań przez polskich śledczych, w tajemniczych okolicznościach umiera Wiktor B.
                </p>

                <p>
                  Ciało mężczyzny odnaleziono w magazynie firmy, w której pracował przy montażu szaf serwerowych. Na jego ciele nie stwierdzono widocznych obrażeń wskazujących na użycie siły fizycznej. Mimo że od śmierci Wiktora B. minęło już ponad półtora roku, śledczy wciąż czekają na wyniki badań toksykologicznych, które mają kluczowe znaczenie dla wyjaśnienia, czy w organizmie mężczyzny znajdowały się substancje mogące przyczynić się do jego nagłego odejścia. Z tego względu obecnie śledztwo w sprawie jego tajemniczego zgonu pozostaje zawieszone.
                </p>

                <div className="mt-8 mb-4 flex justify-end">
                   <div className="text-right bg-[#dfd5b4] p-4 border-[2px] border-stone-900 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)]">
                      <span className="block font-bold text-stone-900 uppercase tracking-widest">Detektyw Polutek</span>
                      <span className="block text-xs text-stone-900 font-mono mt-1 font-bold">detektyw.polutek@protonmail.com</span>
                   </div>
                </div>

                <div className="my-12 border-y-[4px] border-stone-900 py-8 bg-[#e4dbbe]">
                   <h3 className="font-sans font-bold text-lg uppercase tracking-widest text-stone-900 mb-8 flex items-center gap-2">
                      <span className="grayscale">🛡️</span>
                      Status Prawny (2025/2026)
                   </h3>

                   <div className="grid gap-[2px] bg-stone-900 border-[2px] border-stone-900 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] p-[2px]">
                      <div className="bg-[#e4dbbe] p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                         <div>
                            <span className="block font-serif text-stone-900 font-bold uppercase">Śledztwo w sprawie organizacji ceremonii</span>
                            <span className="block text-xs text-stone-900 font-bold mt-1 uppercase tracking-wider">Prokuratura Rejonowa w Częstochowie</span>
                         </div>
                         <span className="font-mono text-xs font-bold bg-[#dfd5b4] px-3 py-1.5 border-[2px] border-stone-900 text-stone-900 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] whitespace-nowrap">
                            3013-1.Ds.15.2024
                         </span>
                      </div>

                      <div className="bg-[#e4dbbe] p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                         <div>
                            <span className="block font-serif text-stone-900 font-bold uppercase">Śledztwo w sprawie śmierci Ilony Lewandowskiej</span>
                            <span className="block text-xs text-stone-900 font-bold mt-1 uppercase tracking-wider">Prokuratura Rejonowa w Częstochowie</span>
                         </div>
                         <span className="font-mono text-xs font-bold bg-[#dfd5b4] px-3 py-1.5 border-[2px] border-stone-900 text-stone-900 shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] whitespace-nowrap">
                            3013-1.Ds.4.2026
                         </span>
                      </div>

                      <div className="bg-[#e4dbbe] p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                         <div>
                            <span className="block font-serif text-stone-900 font-bold uppercase">Śledztwo w sprawie śmierci Wiktora B.</span>
                            <span className="block text-xs text-stone-900 font-bold mt-1 uppercase tracking-wider">Prokuratura Rejonowa w Pułtusku</span>
                         </div>
                         <div className="flex flex-col items-end gap-1">
                            <span className="font-mono text-xs font-bold bg-stone-900 px-3 py-1.5 border-[2px] border-stone-900 text-[#e4dbbe] shadow-[2px_2px_0px_0px_rgba(28,25,23,1)] whitespace-nowrap">
                              4027-0. Ds. 1254.2024
                            </span>
                            <span className="text-[10px] font-sans font-bold text-stone-900 uppercase tracking-tighter bg-[#dfd5b4] px-2 border-[1px] border-stone-900 mt-1">Śledztwo zawieszone</span>
                         </div>
                      </div>
                   </div>

                   <div className="mt-8 text-sm text-stone-900 font-sans text-center md:text-left italic font-bold">
                    Postępowania toczą się w wymienionych jednostkach Prokuratury. Nadzór nad sprawami w Częstochowie objął Zastępca Prokuratora Okręgowego, a kluczowe czynności nadzoruje prokurator Jolanta Świdnicka.
                   </div>
                </div>

                <EvidenceGrid />

              </div>

              <footer className="mt-4 pt-8 border-none font-sans relative z-10">

                 <div className="mb-8">
                   <h3 className="text-xl font-bold text-stone-900 uppercase tracking-widest flex items-center gap-2 mb-4">
                     <span className="grayscale">🔍</span> Dokumenty Źródłowe
                   </h3>
                   <div className="border-b-[4px] border-stone-900 w-full mb-6"></div>
                   <p className="text-base text-stone-900 font-bold italic text-left font-serif">
                     Artykuł powstał na podstawie jawnej dokumentacji urzędowej i sądowej. Pełną listę sygnatur oraz odnośniki do baz państwowych (Katastr, InfoSoud), umożliwiające samodzielną niezależną weryfikację danych.
                   </p>
                 </div>

                 <div className="grid gap-4 text-sm text-stone-900">

                   <div className="p-3 bg-[#e4dbbe] border-[2px] border-stone-900 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] rounded-none hover:bg-[#dfd5b4] transition-colors">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2">
                        <div>
                          <h4 className="font-bold text-stone-900 text-sm leading-tight uppercase">Wyrok <strong>Jarosława Kordysa</strong></h4>
                          <p className="font-mono text-[10px] text-stone-900 font-bold mt-1 uppercase">Sygn. 30 T 5/2020</p>
                        </div>
                        <a
                          href={KORDYS_PDF_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 w-40 justify-center bg-stone-900 text-[#e4dbbe] px-3 py-1 text-xs font-bold border-[2px] border-stone-900 hover:bg-stone-800 transition-colors flex items-center gap-2 uppercase tracking-wider"
                        >
                          <span className="grayscale">📄</span> Pobierz PDF
                        </a>
                      </div>
                      <div className="border-t-[2px] border-stone-900 pt-2">
                        <a
                          href="https://msp.gov.cz/web/krajsky-soud-v-ostrave/zakladni-informace/-/clanek/informace-rok-2022"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-stone-900 font-bold hover:bg-stone-300 flex items-center gap-1 uppercase tracking-wider underline decoration-double decoration-stone-900"
                        >
                          <span className="grayscale">🌐</span>
                          Weryfikuj na msp.gov.cz
                        </a>
                      </div>
                   </div>

                   <div className="p-3 bg-[#e4dbbe] border-[2px] border-stone-900 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] rounded-none hover:bg-[#dfd5b4] transition-colors">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2">
                        <div>
                          <h4 className="font-bold text-stone-900 text-sm leading-tight uppercase">Wyrok <strong>Bartosza Badowskiego</strong></h4>
                          <p className="font-mono text-[10px] text-stone-900 font-bold mt-1 uppercase">Sygn. 66 T 146/2021</p>
                        </div>
                        <a
                          href={BADI_PDF_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 w-40 justify-center bg-stone-900 text-[#e4dbbe] px-3 py-1 text-xs font-bold border-[2px] border-stone-900 hover:bg-stone-800 transition-colors flex items-center gap-2 uppercase tracking-wider"
                        >
                          <span className="grayscale">📄</span> Pobierz PDF
                        </a>
                      </div>
                      <div className="border-t-[2px] border-stone-900 pt-2">
                        <a
                          href="https://msp.gov.cz/documents/22409/2997339/29Si+25-2022+p%C5%99%C3%ADloha+%C4%8D.+1.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-stone-900 font-bold hover:bg-stone-300 flex items-center gap-1 uppercase tracking-wider underline decoration-double decoration-stone-900"
                        >
                          <span className="grayscale">🌐</span>
                          Weryfikuj oryginał (29 Si 25/2022)
                        </a>
                      </div>
                   </div>

                   <div className="p-3 bg-[#e4dbbe] border-[2px] border-stone-900 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] rounded-none hover:bg-[#dfd5b4] transition-colors">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2">
                        <div>
                          <h4 className="font-bold text-stone-900 text-sm leading-tight uppercase">Historia własności: <strong>Janów</strong></h4>
                          <p className="font-mono text-[10px] text-stone-900 font-bold mt-1 uppercase">
                            LV 127 | Obręb 656976 <span className="block sm:inline sm:ml-2">| Koszt: 100 CZK</span>
                          </p>
                        </div>
                        <a
                          href="#"
                          className="shrink-0 w-40 justify-center bg-stone-900 text-[#e4dbbe] px-3 py-1 text-xs font-bold border-[2px] border-stone-900 hover:bg-stone-800 transition-colors flex items-center gap-2 uppercase tracking-wider"
                        >
                          <span className="grayscale">⬇️</span> Pobierz PDF
                        </a>
                      </div>
                      <div className="border-t-[2px] border-stone-900 pt-2">
                        <a
                          href="https://nahlizenidokn.cuzk.cz"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-stone-900 font-bold hover:bg-stone-300 flex items-center gap-1 uppercase tracking-wider underline decoration-double decoration-stone-900"
                        >
                          <span className="grayscale">🌐</span>
                          Weryfikuj na nahlizenidokn.cuzk.cz
                        </a>
                      </div>
                   </div>

                   <div className="p-3 bg-[#e4dbbe] border-[2px] border-stone-900 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] rounded-none hover:bg-[#dfd5b4] transition-colors">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2">
                        <div>
                          <h4 className="font-bold text-stone-900 text-sm leading-tight uppercase">Historia własności: <strong>Nýdek</strong></h4>
                          <p className="font-mono text-[10px] text-stone-900 font-bold mt-1 uppercase">
                            LV 832 | Obręb 708186 <span className="block sm:inline sm:ml-2">| Koszt: 100 CZK</span>
                          </p>
                        </div>
                        <a
                          href="#"
                          className="shrink-0 w-40 justify-center bg-stone-900 text-[#e4dbbe] px-3 py-1 text-xs font-bold border-[2px] border-stone-900 hover:bg-stone-800 transition-colors flex items-center gap-2 uppercase tracking-wider"
                        >
                          <span className="grayscale">⬇️</span> Pobierz PDF
                        </a>
                      </div>
                      <div className="border-t-[2px] border-stone-900 pt-2">
                        <a
                          href="https://nahlizenidokn.cuzk.cz"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-stone-900 font-bold hover:bg-stone-300 flex items-center gap-1 uppercase tracking-wider underline decoration-double decoration-stone-900"
                        >
                          <span className="grayscale">🌐</span>
                          Weryfikuj na nahlizenidokn.cuzk.cz
                        </a>
                      </div>
                   </div>

                   <div className="p-3 bg-[#e4dbbe] border-[2px] border-stone-900 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] rounded-none hover:bg-[#dfd5b4] transition-colors">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2">
                        <div>
                          <h4 className="font-bold text-stone-900 text-sm leading-tight uppercase">Transakcja: Darowizna (<strong>Janów</strong>)</h4>
                          <p className="font-mono text-[10px] text-stone-900 font-bold mt-1 uppercase">
                            Sygnatura: V-5821/2023 <span className="block sm:inline sm:ml-2">| Koszt: 300 CZK</span>
                          </p>
                        </div>
                        <a
                          href="#"
                          className="shrink-0 w-40 justify-center bg-stone-900 text-[#e4dbbe] px-3 py-1 text-xs font-bold border-[2px] border-stone-900 hover:bg-stone-800 transition-colors flex items-center gap-2 uppercase tracking-wider"
                        >
                          <span className="grayscale">⬇️</span> Pobierz PDF
                        </a>
                      </div>
                      <div className="border-t-[2px] border-stone-900 pt-2">
                        <a
                          href="https://nahlizenidokn.cuzk.cz"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-stone-900 font-bold hover:bg-stone-300 flex items-center gap-1 uppercase tracking-wider underline decoration-double decoration-stone-900"
                        >
                          <span className="grayscale">🌐</span>
                          Weryfikuj na nahlizenidokn.cuzk.cz
                        </a>
                      </div>
                   </div>

                   <div className="p-3 bg-[#e4dbbe] border-[2px] border-stone-900 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] rounded-none hover:bg-[#dfd5b4] transition-colors">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2">
                        <div>
                          <h4 className="font-bold text-stone-900 text-sm leading-tight uppercase">Transakcja: Sprzedaż (<strong>Nýdek</strong>)</h4>
                          <p className="font-mono text-[10px] text-stone-900 font-bold mt-1 uppercase">
                            Sygnatura: V-2937/2021 <span className="block sm:inline sm:ml-2">| Koszt: 300 CZK</span>
                          </p>
                        </div>
                        <a
                          href="#"
                          className="shrink-0 w-40 justify-center bg-stone-900 text-[#e4dbbe] px-3 py-1 text-xs font-bold border-[2px] border-stone-900 hover:bg-stone-800 transition-colors flex items-center gap-2 uppercase tracking-wider"
                        >
                          <span className="grayscale">⬇️</span> Pobierz PDF
                        </a>
                      </div>
                      <div className="border-t-[2px] border-stone-900 pt-2">
                        <a
                          href="https://nahlizenidokn.cuzk.cz"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-stone-900 font-bold hover:bg-stone-300 flex items-center gap-1 uppercase tracking-wider underline decoration-double decoration-stone-900"
                        >
                          <span className="grayscale">🌐</span>
                          Weryfikuj na nahlizenidokn.cuzk.cz
                        </a>
                      </div>
                   </div>

                   <div className="p-3 bg-[#e4dbbe] border-[2px] border-stone-900 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] rounded-none hover:bg-[#dfd5b4] transition-colors">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2">
                        <div>
                          <h4 className="font-bold text-stone-900 text-sm leading-tight uppercase">Archiwalna Strona: <strong>Nýdek</strong></h4>
                          <p className="font-mono text-[10px] text-stone-900 font-bold mt-1 uppercase">Archiwum: tribunydek.com</p>
                        </div>
                        <a
                          href="https://web.archive.org/web/20230601000000/tribunydek.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 w-40 justify-center bg-stone-900 text-[#e4dbbe] px-3 py-1 text-xs font-bold border-[2px] border-stone-900 hover:bg-stone-800 transition-colors flex items-center gap-2 uppercase tracking-wider"
                        >
                          <span className="grayscale">🕒</span> Wayback Machine
                        </a>
                      </div>
                   </div>

                   <div className="p-3 bg-[#e4dbbe] border-[2px] border-stone-900 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] rounded-none hover:bg-[#dfd5b4] transition-colors">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2">
                        <div>
                          <h4 className="font-bold text-stone-900 text-sm leading-tight uppercase">Archiwalna Strona: <strong>Munay Sonqo</strong></h4>
                          <p className="font-mono text-[10px] text-stone-900 font-bold mt-1 uppercase">Archiwum: munaysonqo.com (Peru)</p>
                        </div>
                        <a
                          href={MUNAY_WAYBACK_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 w-40 justify-center bg-stone-900 text-[#e4dbbe] px-3 py-1 text-xs font-bold border-[2px] border-stone-900 hover:bg-stone-800 transition-colors flex items-center gap-2 uppercase tracking-wider"
                        >
                          <span className="grayscale">🕒</span> Wayback Machine
                        </a>
                      </div>
                   </div>

                   <div className="p-3 bg-[#dfd5b4] border-[2px] border-stone-900 border-l-[6px] shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] rounded-none">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2">
                        <div>
                          <h4 className="font-bold text-stone-900 text-sm leading-tight uppercase">
                            Artykuł: <strong>Szamańskie ceremonie, tajemnicza śmierć i miliarderzy od „Wiedźmina”</strong>, <span className="text-stone-900 font-black">Onet.pl</span>
                          </h4>
                          <p className="font-mono text-[10px] text-stone-900 font-bold mt-1 uppercase tracking-wider">Opublikowano: 3 marca 2026</p>
                        </div>
                        <div className="shrink-0 w-40 justify-center bg-[#e4dbbe] text-stone-900 px-3 py-1 text-xs font-bold border-[2px] border-stone-900 flex items-center gap-2 cursor-default uppercase">
                          <span className="grayscale">🔗</span> Link nieaktywny
                        </div>
                      </div>
                      <div className="border-t-[2px] border-stone-900 pt-2 text-[10px] text-stone-900 font-bold font-mono italic">
                        Źródło: onet.pl/wiadomosci/kraj/szamanskie-ceremonie-tajemnicza-smierc-i-miliarderzy-od-wiedzmina
                      </div>
                   </div>

                 </div>

                 <div className="mt-8 text-center pb-12">
                   <div className="w-24 h-[4px] bg-stone-900 mx-auto mb-6"></div>

                   <div className="mb-10 bg-[#e4dbbe] p-6 border-[2px] border-stone-900 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] text-center rounded-none">
                     <h3 className="text-sm font-bold text-stone-900 uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
                       <span className="grayscale">🛡️</span> Mirror – Kopia Zapasowa Dokumentacji
                     </h3>
                     <p className="text-xs text-stone-900 font-bold mb-4 leading-relaxed font-sans max-w-lg mx-auto">
                       W celu zapewnienia niezniszczalności dowodów, pełna dokumentacja śledztwa (akty oskarżenia, wyroki, zeznania) została zarchiwizowana w sieciach zdecentralizowanych. Materiał jest odporny na próby cenzury i usuwania.
                     </p>
                     <div className="grid gap-3 font-mono text-[10px] uppercase tracking-wider">
                       <a href="ipfs://bafybeicnxl_pelna_dokumentacja_wiedzmin_gate" className="text-stone-900 font-bold hover:bg-[#dfd5b4] underline decoration-stone-900 decoration-double py-1">IPFS: Baza Dowodowa (Full Archive)</a>
                       <a href="https://arweave.net/eliksir-wiedzmina-dokumentacja" className="text-stone-900 font-bold hover:bg-[#dfd5b4] underline decoration-stone-900 decoration-double py-1">Arweave: Trwała Archiwizacja</a>
                       <a href="https://github.com/detektyw-polutek/eliksir-mirror" className="text-stone-900 font-bold hover:bg-[#dfd5b4] underline decoration-stone-900 decoration-double py-1">GitHub: Source Mirror</a>
                     </div>
                   </div>

                   <p className="text-xs text-stone-900 font-mono font-bold uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
                     <span className="grayscale">🌐</span>
                     Oficjalna Witryna
                   </p>
                   <a
                     href="https://www.eliksir-wiedzmina.pl"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="font-mono text-sm font-bold text-stone-900 hover:bg-[#dfd5b4] transition-colors underline decoration-double decoration-stone-900 px-2 py-1"
                   >
                     www.eliksir-wiedzmina.pl
                   </a>
                 </div>
              </footer>
            </article>
          </div>
        </div>
      </main>
    </>
  );
}
