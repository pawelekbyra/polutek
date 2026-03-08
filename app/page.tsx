import React from 'react';



// ==========================================

// --- PALETA SIKU (KOLORYSTYKA ŚLEDCZA) ---

// Jasne siku (tła, zakreślenia): #e8d154

// Zaschnięte siku (ramki, detale): #8b7312

// Stare siku (kontrastowy tekst): #66540b

// ==========================================



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

  name: "Intencja, świadomość, sprawczość - Michał Kiciński Q&A",

  description: "Wystąpienie Michała Kicińskiego na Festiwalu Wibracje o intencji i świadomości.",

  thumbnailUrl: `${JANOV_IMAGES_URL}/janov1.jpg`,

  contentUrl: "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/intencja-swiadomosc-sprawczosci-michal-kicinski-qa-festiwal-wibracje.mp4",

  uploadDate: "2024-11-01T12:00:00+01:00",

};



const VIDEO_STEFANEK_METADATA = {

  name: "Historia powstania osady Natury Zew - Krzysztof Stefanek",

  description: "Relacja Krzysztofa Stefanka o historii powstania i rozwoju osady Natury Zew.",

  thumbnailUrl: `${JANOV_IMAGES_URL}/janov2.jpg`,

  contentUrl: "https://pub-309ebc4b2d654f78b2a22e1d57917b94.r2.dev/historia-powstania-osady-natury-zew-w-gruncie-ruchu-stefan.mp4",

  uploadDate: "2024-11-01T12:00:00+01:00",

};



const CaseFile = ({ title, children, icon = '📄' }: { title: string, children: React.ReactNode, icon?: string }) => (

  <div className="my-8 border border-[#8b7312]/40 bg-[#e8d154]/10 shadow-sm rounded-sm overflow-hidden break-inside-avoid text-left">

    <div className="bg-[#e8d154]/30 border-b border-[#8b7312]/40 px-4 py-2 flex items-center gap-2 text-xs font-mono text-ink-light uppercase tracking-wider">

      <span>{icon}</span>

      <span>{title}</span>

    </div>

    <div className="p-6 font-mono text-sm md:text-base leading-relaxed text-ink-medium italic">

      {children}

    </div>

  </div>

);



const PullQuote = ({ quote, author, source }: { quote: string, author: string, source: string }) => (

  <div className="my-10 pl-6 border-l-[3px] border-[#8b7312]/80 text-left">

    <p className="font-display text-xl md:text-2xl italic text-ink leading-relaxed mb-3">

      „{quote}"

    </p>

    <div className="font-sans text-[10px] uppercase tracking-widest text-ink-light">

      — <span className="font-bold text-ink">{author}</span>, {source}

    </div>

  </div>

);



const LocationStampUI = ({ name, plot, lv }: { name: string, plot: string, lv: string }) => (

  <div className="relative border border-[#8b7312]/40 bg-white p-1 pr-6 rounded-sm flex items-center gap-4 shadow-sm text-left">

      <div className="absolute top-1 right-1 text-[#8b7312]/70">🔍</div>

      <div className="bg-[#e8d154]/20 h-full p-3 flex items-center justify-center border-r border-[#8b7312]/40 border-dashed">

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

  <div className="relative border border-[#8b7312]/40 bg-white p-1 pr-6 rounded-sm flex items-center gap-4 shadow-sm text-left">

      <div className="absolute top-1 right-1 text-[#8b7312]/70">🔍</div>

      <div className="bg-[#e8d154]/20 h-full p-3 flex items-center justify-center border-r border-[#8b7312]/40 border-dashed">

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

         <source src={src} type={src.endsWith('.m3u8') ? 'application/x-mpegURL' : 'video/mp4'} />

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

              <a href={`${KORDYS_IMAGES_URL}/wezwanie/wezwanie_kicinski.png`} target="_blank" className="w-full inline-flex justify-center bg-[#e8d154]/20 text-ink px-3 py-2 text-xs font-bold rounded border border-[#8b7312]/40 hover:bg-[#e8d154]/40 transition-colors underline decoration-double decoration-[#8b7312]">

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

              <button className="w-full inline-flex justify-center bg-[#e8d154]/20 text-ink px-3 py-2 text-xs font-bold rounded border border-[#8b7312]/40 hover:bg-[#e8d154]/40 transition-colors underline decoration-double decoration-[#8b7312]">

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

              <button className="w-full inline-flex justify-center bg-[#e8d154]/20 text-ink px-3 py-2 text-xs font-bold rounded border border-[#8b7312]/40 hover:bg-[#e8d154]/40 transition-colors underline decoration-double decoration-[#8b7312]">

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

              <button className="w-full inline-flex justify-center bg-[#e8d154]/20 text-ink px-3 py-2 text-xs font-bold rounded border border-[#8b7312]/40 hover:bg-[#e8d154]/40 transition-colors underline decoration-double decoration-[#8b7312]">

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

              <button className="w-full inline-flex justify-center bg-[#e8d154]/20 text-ink px-3 py-2 text-xs font-bold rounded border border-[#8b7312]/40 hover:bg-[#e8d154]/40 transition-colors underline decoration-double decoration-[#8b7312]">

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



      <main className="min-h-screen text-ink selection:bg-[#e8d154]/40 font-body flex flex-col items-center">

        <div className="w-full max-w-4xl bg-paper-texture flex flex-col items-center pb-20 border-x-2 border-ink overflow-hidden">



          {/* BrandHeader - Zacieśniony padding */}

          <div className="w-full flex flex-col items-center pt-1 pb-1">

            <div className="flex items-center justify-center w-[calc(100%-2rem)] mx-auto gap-4 pt-2 pb-1">

              <div className="flex-grow h-[2px] bg-ink"></div>

              <h1 className="text-4xl md:text-[4.5rem] font-black tracking-tighter text-ink uppercase font-sans leading-none whitespace-nowrap px-2">

                NASZA GAZETKA

              </h1>

              <div className="flex-grow h-[2px] bg-ink"></div>

            </div>

            <div className="w-[calc(100%-2rem)] mx-auto border-y-2 border-ink py-1 flex items-center justify-between px-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.1em] text-ink-medium">

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



          {/* Hero Section - Poprawiony layout na pierwszy ekran */}

          <div className="w-full text-center flex flex-col items-center pt-2 pb-4 px-6 box-border">

            <img

              src="/zdjeciehej.png"

              alt="Wiedźmini z eliksirem"

              className="h-24 md:h-[150px] object-contain grayscale contrast-200 mix-blend-multiply mb-2" 

            />



            <h2 className="text-ink w-full mb-1">

              <span className="block text-4xl md:text-[5.5rem] font-display font-black leading-none tracking-tight uppercase">

                Eliksir

              </span>

              <span className="block text-4xl md:text-[5.5rem] font-display font-black leading-none tracking-tight uppercase">

                Wiedźmina

              </span>

            </h2>



            <p className="block text-xs md:text-xl text-ink-medium italic font-medium uppercase tracking-widest mt-1 whitespace-nowrap font-body">

              Mroczna tajemnica twórców CD Projekt

            </p>



            {/* Ten blok teraz mieści się "nad linią zgięcia" */}

            <div className="max-w-3xl mx-auto mt-2">

              <div className="gradient-divider w-24 mx-auto mb-2"></div>

              <p className="text-sm md:text-lg text-ink-medium leading-snug italic font-body px-4">

                Ayahuasca, policyjne naloty i tragedia, o której nie miał się nikt dowiedzieć. Publicznie dostępne akta i rejestry ujawniają, jak twórcy gry „Wiedźmin" finansowali szamańskie podziemie.

              </p>

            </div>

          </div>



          {/* Artykuł zaczyna się zaraz pod leadem */}

          <article className="max-w-3xl mx-auto px-6 pt-4 pb-0 flex-grow w-full z-10 relative">

            <div className="article-prose">

              <p className="drop-cap leading-relaxed mt-0">

                W 2020 roku media obiegły doniesienia o rozbiciu grupy polskich szamanów v czeskich <strong>Hermanovicach</strong>. Policyjny nalot, aresztowanie <strong>Jarosława i Karoliny Kordysów</strong>, a następnie surowe wyroki – 8,5 oraz 5,5 roku więzienia za prowadzenie nielegalnego biznesu polegającego na organizacji tzw. &quot;ceremonii&quot;, podczas których klientom podawano egzotyczny psychodelik – ayahuaskę.

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



              <p>

                W obszernym i publicznie dostępnym uzasadnieniu wyroku Jarosława Kordysa pojawia się postać świadka Bartosza B.

              </p>



              <CaseFile title="Zeznania świadka B." icon="✉️">

                &quot;Świadek B. odnośnie osoby oskarżonego [Jarosława Kordysa] oświadczył, że zna się z nim ok. 8 lat, a poznali się w Holandii&quot;.

                <br /><br />

                &quot;Świadek B. potwierdził, że i on sam w przeszłości prowadził warsztaty&quot;, a obecnie sam &quot;jest przedmiotem dochodzenia policji v Krnowie właśnie z powodu ceremonii&quot;.

              </CaseFile>



              <p>

                Akta ujawniają również skalę zarzutów wobec Bartosza B.:

              </p>



              <CaseFile title="Zarzuty wobec Bartosza B.">

                &quot;(...) wymieniony był sprawdzany v związku z występkiem niedozwolonej produkcji i innego obchodzenia się ze środkami odurzającymi (...) albowiem miał w roku 2014 zlecić przesłanie na swój adres przesyłki pocztowej przechwyconej na lotnisku v Lipsku RFN zawierającej 4,5 kg DMT, a 6.6.2018 miało dojść do zatrzymania przesyłki pocztowej we Frankfurcie nad Menem RFN zawierającej 2000 g meskaliny i 38,6 g substancji DMT.&quot;

              </CaseFile>



              <p>

                Intrygujący fragment dotyczy własności &quot;bazy&quot;. Dokumenty stwierdzają:

              </p>



              <CaseFile title="Własność nieruchomości">

                &quot;(...) budynek rodzinny w miejscowości Janów (...), który jest częściowo użytkowany do stałego zamieszkania, a częściowo jako komercyjny obiekt noclegowy&quot;

                <br /><br />

                &quot;Świadek [Bartosz B.] potwierdził, że w Janowie jest właścicielem jednej dziesiątej nieruchomości&quot;.

              </CaseFile>



              <p>

                Do kogo należała reszta? Sąd wskazuje wprost:

              </p>



              <CaseFile title="Ustalenia Sądu">

                &quot;...w odniesieniu do nieruchomości będących współwłasnością <strong>Bartosza B.</strong> i <strong>Michała D. K.</strong>&quot;.

              </CaseFile>



              <div className="my-8 flex justify-start">

                <LocationStampUI name="JANOV U KRNOVA" plot="st. 281" lv="127" />

              </div>



              <p>

                Pobrany dokument nie pozostawia wątpliwości: w latach 2012–2023 współwłaścicielami nieruchomości byli:

                <br />

                Bartosz Badowski (10%)

                <br />

                <span className="bg-[#e8d154]/50 text-[#66540b] px-1 rounded-sm">Michał Dawid Kiciński (90%)</span>

              </p>



              <p>

                Drugie imię – Dawid – idealnie wypełnia lukę v zanonimizowanym skrócie &quot;Michal D. K.&quot;. <span className="bg-[#e8d154]/50 text-[#66540b] px-1 rounded-sm">Wspólnikiem szamana był twórca &quot;Wiedźmina&quot; – jeden z najbogatszych Polaków.</span>

              </p>



              <h2 className="section-heading text-3xl tracking-tight text-ink">Na podsłuchu</h2>



              <p>

                Przełom w sprawie organizatorów ayahuaskowych ceremonii v 2020 roku nastąpił dzięki policyjnej technice operacyjnej. Telefon Kordysa był na stałym podsłuchu, a funkcjonariusze słuchali na żywo, gdy v dniu 24.08.2020 r. doszło do nerwowej wymiany zdań pomiędzy Badowskim i Kordysów.

              </p>



              <CaseFile title="Rekonstrukcja rozmowy (Uzasadnienie Sądu)" icon="🔍">

                &quot;oskarżony [Jarosława Kordysa] omawia z B., że dotarła do niego informacja, że v obiekcie w Janowie <span className="underline decoration-[#8b7312] decoration-4 underline-offset-4 font-bold">zmarła jakaś kobieta</span>&quot;.

              </CaseFile>



              <div className="my-12 pl-6 border-l-4 border-[#8b7312] font-display italic text-xl text-ink-medium">

                &quot;Z ich rozmowy wynika, że nie zajmowali się v zasadzie samym faktem śmierci, lecz raczej obawą, aby to nie przyciągnęła uwagi policji.&quot;

              </div>



              <h2 className="section-heading text-3xl tracking-tight text-ink">Cena wolności</h2>



              <div className="my-12 w-full rounded-sm overflow-hidden shadow-md">

                <ArticleVideoPlayer src={VIDEO_ARREST_METADATA.contentUrl} poster="" />

              </div>



              <p>

                Bartosz &quot;Badi&quot; Badowski, wspólnik jednego z najbogatszych Polaków, błyskawicznie zrozumiał swoje położenie. W obliczu zabezpieczonych dowodów – v tym 2 kilogramów substancji z DMT i marihuany – wybrał strategię, która miała uchronić go przed wieloletnim więzieniem. Postanowił &quot;kupić&quot; sobie wolność.

              </p>



              <CaseFile title="Ustalenia wyroku skazującego Bartosza B.">

                &quot;co najmniej od bliżej nieustalanej daty v 2015 roku do 26.08.2020 [...] oferował, organizował i co najmniej v 441 przypadkach zrealizował v nieregularnych odstępach czterodniowe i dziesięciodniowe pobyty [...] ukierunkowane na tzw. duchowe ćwiczenia spirytualne&quot;

              </CaseFile>



              <h2 className="section-heading text-3xl tracking-tight text-ink">&quot;Błąd z Badim&quot;</h2>



              <div className="my-12 flex flex-col items-center">

                <a href={`${KORDYS_IMAGES_URL}/wezwanie/wezwanie_kicinski.png`} target="_blank">

                  <img

                    src={`${KORDYS_IMAGES_URL}/wezwanie/wezwanie_kicinski.png`}

                    alt="Wezwanie na policję"

                    className="w-48 rounded shadow-md border border-[#8b7312]/40 cursor-pointer hover:opacity-90 transition-opacity mix-blend-multiply grayscale sepia"

                  />

                </a>

              </div>



              <CaseFile title="Wiadomość prywatna od M. Kicińskiego" icon="✉️">

                &quot;(...) Tak mogę zapłacić za swój błąd z Badim. Podaj mi Fundacje lub Stowarzyszenie (najlepiej powiązaną z hospicjum lub domami dziecka, bo tu vidzę morze potrzeb i dużo cierpienia) i wpłacę tam dobrowolnie kwotę darowizny...&quot;

              </CaseFile>



              <h2 className="section-heading text-3xl tracking-tight text-ink">Anonimowy filantrop</h2>



              <div className="my-12 w-full rounded-sm overflow-hidden shadow-md">

                <ArticleVideoPlayer src={VIDEO_STEFANEK_METADATA.contentUrl} poster="" />

              </div>



              <ul className="list-none space-y-12 my-12 font-mono text-sm timeline-list">

                <li className="flex items-start gap-3">

                  <span>📅</span>

                  <div><strong>21 września 2023 r.</strong> – Michał Kiciński odbiera wezwanie na przesłuchanie.</div>

                </li>

                <li className="flex items-start gap-3">

                  <span className="text-[#8b7312] mt-3">📅</span>

                  <div className="timeline-item-critical p-4 rounded-sm shadow-sm w-full">

                    <span className="font-bold text-ink">23 października 2023 r.</span> – Zaledwie 12 dni po kłopotliwym przesłuchaniu następuje telefon do Stefanka z propozycją oddania majątku za darmo.

                  </div>

                </li>

              </ul>



              <h2 className="section-heading text-3xl tracking-tight text-ink">Wiktor B.</h2>



              <p>

                3 marca 2026 Onet ujawnia opinii publicznej wstrząsające kulisy działalności ośrodka v czeskim Janowie. Dziennikarskie śledztwo koncentruje się na śmierci 54-letniej uczestniczki, Ilony L.-H.

              </p>



              <div className="mt-8 mb-4 flex justify-end">

                <div className="text-right">

                  <span className="block font-bold text-ink uppercase font-display">Detektyw Polutek</span>

                  <span className="block text-xs text-ink-light font-body mt-1 italic">detektyw.polutek@protonmail.com</span>

                </div>

              </div>



              <div className="my-12 border-y-[3px] border-ink py-8">

                <h3 className="font-display font-bold text-lg uppercase tracking-widest text-ink mb-8 flex items-center gap-2">

                  <span>🛡️</span> Status Prawny (2025/2026)

                </h3>

                <div className="status-grid space-y-4">

                  <div className="status-row flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

                    <div>

                      <span className="block font-display text-ink font-bold">Śledztwo w sprawie organizacji ceremonii</span>

                      <span className="block text-xs text-ink-light mt-1">Prokuratura Rejonowa w Częstochowie</span>

                    </div>

                    <span className="font-mono text-xs font-bold bg-[#e8d154]/20 px-3 py-1.5 border border-[#8b7312]/40 text-ink">3013-1.Ds.15.2024</span>

                  </div>

                </div>

              </div>



              <EvidenceGrid />



            </div>



            <footer className="mt-4 pt-8 border-none font-body relative z-10">

              <div className="mb-8">

                <h3 className="text-xl font-bold text-ink uppercase tracking-widest flex items-center gap-2 mb-4 font-display">

                  <span>🔍</span> Dokumenty Źródłowe

                </h3>

                <div className="gradient-divider w-full mb-6"></div>

              </div>



              <div className="grid gap-4 text-sm text-ink-medium">

                <div className="source-card">

                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2">

                    <div>

                      <h4 className="font-bold text-ink text-sm leading-tight font-display">Wyrok <strong>Jarosława Kordysa</strong></h4>

                      <p className="font-mono text-[10px] text-ink-light mt-1">Sygn. 30 T 5/2020</p>

                    </div>

                    <a href={KORDYS_PDF_URL} target="_blank" className="shrink-0 w-40 justify-center bg-[#e8d154]/20 text-ink px-3 py-1 text-xs font-bold rounded border border-[#8b7312]/40 hover:bg-[#e8d154]/40 transition-colors flex items-center gap-2 underline">

                      <span>📄</span> PDF

                    </a>

                  </div>

                </div>

                {/* Pozostałe źródła analogicznie... */}

              </div>



              <div className="mt-8 text-center pb-12">

                <a href="https://www.eliksir-wiedzmina.pl" className="font-mono text-sm font-bold text-[#66540b] hover:bg-[#e8d154]/40 transition-colors underline decoration-double decoration-[#8b7312]">

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

