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

const CaseFile = ({ title, children, icon = '📄' }: { title: string, children: React.ReactNode, icon?: string }) => (
  <div className="my-8 border border-sepia-light bg-parchment-warm/20 shadow-sm rounded-sm overflow-hidden break-inside-avoid text-left">
    <div className="bg-parchment-warm/40 border-b border-sepia-light px-4 py-2 flex items-center gap-2 text-xs font-mono text-ink-light uppercase tracking-wider">
      <span>{icon}</span>
      <span>{title}</span>
    </div>
    <div className="p-6 font-mono text-sm md:text-base leading-relaxed text-ink-medium italic">
      {children}
    </div>
  </div>
);

const PullQuote = ({ quote, author, source }: { quote: string, author: string, source: string }) => (
  <div className="my-10 pl-6 border-l-[3px] border-wine/80 text-left">
    <p className="font-display text-xl md:text-2xl italic text-ink leading-relaxed mb-3">
      „{quote}"
    </p>
    <div className="font-sans text-[10px] uppercase tracking-widest text-ink-light">
      — <span className="font-bold text-ink">{author}</span>, {source}
    </div>
  </div>
);

const LocationStampUI = ({ name, plot, lv }: { name: string, plot: string, lv: string }) => (
  <div className="relative border border-sepia-light bg-white p-1 pr-6 rounded-sm flex items-center gap-4 shadow-sm text-left">
      <div className="absolute top-1 right-1 text-sepia-light">🔍</div>
      <div className="bg-parchment-warm/30 h-full p-3 flex items-center justify-center border-r border-sepia-light border-dashed">
         <span className="text-xl">🏠</span>
      </div>
      <div className="py-2">
         <div className="text-[9px] uppercase tracking-[0.2em] text-ink-light font-bold mb-1">{name}</div>
         <div className="font-mono text-base font-bold text-ink">LV {lv}</div>
         <div className="text-[10px] text-ink-light font-mono mt-1">Działka: {plot}</div>
      </div>
  </div>
);

const TransactionStampUI = ({ label, value, subDetails }: { label: string, value: string, subDetails?: string }) => (
  <div className="relative border border-sepia-light bg-white p-1 pr-6 rounded-sm flex items-center gap-4 shadow-sm text-left">
      <div className="absolute top-1 right-1 text-sepia-light">🔍</div>
      <div className="bg-parchment-warm/30 h-full p-3 flex items-center justify-center border-r border-sepia-light border-dashed">
         <span className="text-xl">📜</span>
      </div>
      <div className="py-2">
         <div className="text-[9px] uppercase tracking-[0.2em] text-ink-light font-bold mb-1">{label}</div>
         <div className="font-mono text-base font-bold text-ink">{value}</div>
         {subDetails && <div className="text-[10px] text-ink-light font-mono mt-1">{subDetails}</div>}
      </div>
  </div>
);

const ArticleVideoPlayer: React.FC<{ src: string; poster: string }> = ({ src, poster }) => {
  return (
    <div className="w-full bg-black aspect-video rounded-sm overflow-hidden flex items-center justify-center relative group">
       <video
         controls
         poster={poster}
         className="w-full h-full object-cover"
         playsInline
       >
         <source src={src} type="application/x-mpegURL" />
         Your browser does not support the video tag.
       </video>
    </div>
  );
};

const EvidenceGrid = () => {
  return (
    <div className="my-12">
      <h3 className="font-display font-bold text-lg uppercase tracking-widest text-ink mb-8 flex items-center gap-2">
        <span>⚖️</span> Galeria Dowodów
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="source-card">
          <div className="flex flex-col h-full">
            <h4 className="font-bold text-ink text-sm leading-tight font-display mb-1">Wezwanie Kiciński</h4>
            <p className="text-xs text-ink-medium mb-4">Wezwanie dla M. Kicińskiego Sygn. WD-I-3186/23</p>
            <div className="mt-auto">
              <a href={`${KORDYS_IMAGES_URL}/wezwanie/wezwanie_kicinski.png`} target="_blank" className="w-full inline-flex justify-center bg-parchment text-ink px-3 py-2 text-xs font-bold rounded border border-sepia-light hover:bg-parchment-warm transition-colors underline decoration-double decoration-sepia">
                POKAŻ DOWÓD
              </a>
            </div>
          </div>
        </div>
        <div className="source-card">
          <div className="flex flex-col h-full">
            <h4 className="font-bold text-ink text-sm leading-tight font-display mb-1">Wyrok Kordys</h4>
            <p className="text-xs text-ink-medium mb-4">Uzasadnienie Wyroku: J. Kordys Sygn. 30 T 5/2021</p>
            <div className="mt-auto">
              <button className="w-full inline-flex justify-center bg-parchment text-ink px-3 py-2 text-xs font-bold rounded border border-sepia-light hover:bg-parchment-warm transition-colors underline decoration-double decoration-sepia">
                POKAŻ STRONY (25)
              </button>
            </div>
          </div>
        </div>
        <div className="source-card">
          <div className="flex flex-col h-full">
            <h4 className="font-bold text-ink text-sm leading-tight font-display mb-1">Wyrok Badi</h4>
            <p className="text-xs text-ink-medium mb-4">Wyrok Skazujący: Bartosz B. Sygn. 66 T 146/2021</p>
            <div className="mt-auto">
              <button className="w-full inline-flex justify-center bg-parchment text-ink px-3 py-2 text-xs font-bold rounded border border-sepia-light hover:bg-parchment-warm transition-colors underline decoration-double decoration-sepia">
                POKAŻ STRONY (3)
              </button>
            </div>
          </div>
        </div>
        <div className="source-card">
          <div className="flex flex-col h-full">
            <h4 className="font-bold text-ink text-sm leading-tight font-display mb-1">Dokumentacja Janów</h4>
            <p className="text-xs text-ink-medium mb-4">Dokumentacja: Janów KW LV 127</p>
            <div className="mt-auto">
              <button className="w-full inline-flex justify-center bg-parchment text-ink px-3 py-2 text-xs font-bold rounded border border-sepia-light hover:bg-parchment-warm transition-colors underline decoration-double decoration-sepia">
                POKAŻ GALERIĘ
              </button>
            </div>
          </div>
        </div>
        <div className="source-card md:col-span-2">
          <div className="flex flex-col h-full">
            <h4 className="font-bold text-ink text-sm leading-tight font-display mb-1">🏠 Posiadłość w Nýdku</h4>
            <p className="text-xs text-ink-medium mb-4">KW LV 832 (M. Iwiński)</p>
            <div className="mt-auto">
              <button className="w-full inline-flex justify-center bg-parchment text-ink px-3 py-2 text-xs font-bold rounded border border-sepia-light hover:bg-parchment-warm transition-colors underline decoration-double decoration-sepia">
                POKAŻ GALERIĘ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": "Eliksir Wiedźmina – Śledztwo: Michał Kiciński i tajemnica Janowa",
    "description": "Pełna dokumentacja śledztwa: Michał Kiciński, Jarosław Kordys i prokurator Jolanta Świdnicka. Ayahuasca, Janów i tragiczna śmierć uczestniczki.",
    "image": [`${KORDYS_IMAGES_URL}/wezwanie/wezwanie_kicinski.png`],
    "datePublished": "2024-03-03",
    "author": [{
      "@type": "Person",
      "name": "Detektyw Polutek",
      "url": "mailto:detektyw.polutek@protonmail.com"
    }]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }} />

      <main className="min-h-screen bg-white text-ink selection:bg-parchment-warm/50 font-body flex flex-col items-center">
        {/* Kontener max-w-4xl dla pasków ramki */}
        <div className="w-full max-w-4xl bg-white flex flex-col items-center pb-20 min-h-screen border-x-2 border-ink overflow-hidden">

          {/* BrandHeader */}
          <div className="w-full flex flex-col items-center pt-0 pb-1">
            <div className="flex items-center justify-center w-full pb-0">
              <h1 className="text-5xl md:text-[5.5rem] font-black tracking-tighter text-ink uppercase font-unifraktur leading-none whitespace-nowrap px-4">
                NASZA GAZETKA
              </h1>
            </div>
            <div className="w-full border-y-2 border-ink py-0.5 flex items-center justify-between px-4 text-[10px] md:text-sm font-bold uppercase tracking-[0.1em] text-ink-medium">
              <div className="flex items-center gap-2">
                <span>📰</span>
                <span className="hidden sm:inline">Niezależne Media</span>
              </div>
              <div className="text-center font-display">
                NIEDZIELA, 1 MARCA 2026
              </div>
              <div className="flex items-center gap-2">
                <span>📄</span>
                <span>Serwis Śledczy Nr 01</span>
              </div>
            </div>
          </div>

          {/* Hero Section - Podwyższony do paska (justify-start + pt) */}
          <div className="w-full min-h-[90vh] text-center flex flex-col justify-start items-center pb-12 pt-6 md:pt-10 px-6 box-border">
            <img
              src="/zdjeciehej.png"
              alt="Wiedźmini z eliksirem"
              className="h-32 md:h-[180px] object-contain grayscale contrast-200 mix-blend-multiply mb-4" 
            />

            {/* Estetycznie skorygowany odstęp (z -mt na lekki md:-mt-2) */}
            <h2 className="text-ink w-full mb-1 md:-mt-2">
              <span className="block text-4xl md:text-[5.5rem] font-display font-black leading-none tracking-tight uppercase">
                Eliksir
              </span>
              <span className="block text-4xl md:text-[5.5rem] font-display font-black leading-none tracking-tight uppercase">
                Wiedźmina
              </span>
            </h2>

            <p className="block text-sm md:text-2xl text-ink-medium italic font-medium uppercase tracking-widest mt-2 whitespace-nowrap font-body">
              Mroczna tajemnica twórców CD Projekt
            </p>

            <div className="max-w-3xl mx-auto mt-4 md:mt-6">
              <div className="gradient-divider w-32 mx-auto mb-4 md:mb-6"></div>
              <p className="text-base md:text-xl text-ink-medium leading-relaxed italic font-body">
                Ayahuasca, policyjne naloty i tragedia, o której nie miał się nikt dowiedzieć. Publicznie dostępne akta i rejestry ujawniają, jak twórcy gry „Wiedźmin" finansowali szamańskie podziemie.
              </p>
            </div>
          </div>

          <article className="max-w-3xl mx-auto px-6 pt-12 pb-0 flex-grow w-full z-10 relative border-t border-ink/10">
            <div className="article-prose">
              <p className="drop-cap leading-relaxed mt-0">
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

              <h2 className="section-heading text-3xl tracking-tight text-ink">Świadek B.</h2>

              <CaseFile title="Zeznania świadka B." icon="✉️">
                &quot;Świadek B. odnośnie osoby oskarżonego [Jarosława Kordysa] oświadczył, że zna się z nim ok. 8 lat, a poznali się w Holandii&quot;.
                <br /><br />
                &quot;Świadek B. potwierdził, że i on sam w przeszłości prowadził warsztaty&quot;, a obecnie sam &quot;jest przedmiotem dochodzenia policji w Krnowie właśnie z powodu ceremonii&quot;.
              </CaseFile>

              <div className="my-8 flex justify-start">
                <LocationStampUI name="JANOV U KRNOVA" plot="st. 281" lv="127" />
              </div>

              <p>
                Pobrany dokument nie pozostawia wątpliwości: w latach 2012–2023 współwłaścicielami nieruchomości byli:
                <br />
                Bartosz Badowski (10%)
                <br />
                <span className="highlight-wine">Michał Dawid Kiciński (90%)</span>
              </p>

              <h2 className="section-heading text-3xl tracking-tight text-ink">Na podsłuchu</h2>

              <CaseFile title="Rekonstrukcja rozmowy (Uzasadnienie Sądu)" icon="🔍">
                &quot;oskarżony [Jarosława Kordysa] omawia z B., że dotarła do niego informacja, że w obiekcie w Janowie <span className="underline decoration-wine decoration-4 underline-offset-4 font-bold">zmarła jakaś kobieta</span>&quot;.
              </CaseFile>

              <div className="my-12 w-full rounded-sm overflow-hidden shadow-md">
                <ArticleVideoPlayer src={VIDEO_ARREST_METADATA.contentUrl} poster="" />
              </div>
              <div className="mt-1 text-sm text-ink-light font-body border-l-2 border-sepia pl-3 mb-12">
                <span className="font-bold text-ink uppercase text-xs mr-2">Materiał Operacyjny:</span>
                Nagranie z policyjnego nalotu na ośrodek w Hermanovicach (15.10.2020)
              </div>

              <h2 className="section-heading text-3xl tracking-tight text-ink">Kiciński</h2>

              <PullQuote
                quote="Po ayahuasce jest szansa na to, żeby sobie nie ściemniać."
                author="Michał Kiciński"
                source="Newsweek, 30 maja 2016 r."
              />

              <div className="my-12 flex flex-col items-center">
                <a href={`${KORDYS_IMAGES_URL}/wezwanie/wezwanie_kicinski.png`} target="_blank">
                  <img
                    src={`${KORDYS_IMAGES_URL}/wezwanie/wezwanie_kicinski.png`}
                    alt="Wezwanie"
                    className="w-48 rounded shadow-md border border-sepia-light mix-blend-multiply grayscale sepia"
                  />
                </a>
                <p className="text-xs text-ink-light mt-2 font-mono uppercase tracking-wider w-48 text-center">
                  Skan wezwania (Kliknij)
                </p>
              </div>

              <CaseFile title="Wiadomość prywatna od M. Kicińskiego" icon="✉️">
                &quot;(...) Tak mogę zapłacić za swój błąd z Badim. Podaj mi Fundacje... i wpłacę tam dobrowolnie kwotę darowizny, w ramach Przeprosin wszechświatowi, za moją młodzieńczą naiwność...&quot;
              </CaseFile>

              <h2 className="section-heading text-3xl tracking-tight text-ink">Status Prawny</h2>

              <div className="my-12 border-y-[3px] border-ink py-8">
                <div className="status-grid space-y-4">
                  <div className="status-row flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <span className="font-display text-ink font-bold">Śledztwo w sprawie ceremonii</span>
                    <span className="font-mono text-xs font-bold bg-parchment px-3 py-1.5 border border-sepia-light">3013-1.Ds.15.2024</span>
                  </div>
                  <div className="status-row flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <span className="font-display text-ink font-bold">Śmierć Wiktora B.</span>
                    <span className="text-[10px] font-body font-bold text-wine uppercase">Śledztwo zawieszone</span>
                  </div>
                </div>
              </div>

              <EvidenceGrid />

            </div>

            <footer className="mt-4 pt-8 border-none font-body relative z-10">
              <div className="grid gap-4 text-sm text-ink-medium">
                <div className="source-card">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-bold text-ink text-sm font-display">Wyrok Kordys</h4>
                      <p className="font-mono text-[10px] text-ink-light">Sygn. 30 T 5/2020</p>
                    </div>
                    <a href={KORDYS_PDF_URL} target="_blank" className="shrink-0 bg-parchment text-ink px-3 py-1 text-xs font-bold rounded border border-sepia-light underline decoration-double decoration-sepia">PDF</a>
                  </div>
                </div>
                <div className="source-card">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-bold text-ink text-sm font-display">Wyrok Badowski</h4>
                      <p className="font-mono text-[10px] text-ink-light">Sygn. 66 T 146/2021</p>
                    </div>
                    <a href={BADI_PDF_URL} target="_blank" className="shrink-0 bg-parchment text-ink px-3 py-1 text-xs font-bold rounded border border-sepia-light underline decoration-double decoration-sepia">PDF</a>
                  </div>
                </div>
              </div>

              <div className="mt-12 text-center pb-12">
                <div className="w-24 h-[2px] bg-wine mx-auto mb-6"></div>
                <p className="text-xs text-ink-medium font-mono uppercase tracking-widest mb-2">Oficjalna Witryna</p>
                <a href="https://www.eliksir-wiedzmina.pl" target="_blank" className="font-mono text-sm font-bold text-wine underline decoration-double decoration-sepia">
                  www.eliksir-wiedzmina.pl
                </a>
              </div>
            </footer>
          </article>
        </div>
      </main>
    </>
  );
}
