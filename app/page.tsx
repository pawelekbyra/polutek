import React from 'react';
import type { Metadata } from 'next';
import { Scale, Search, ShieldCheck, Globe, FileText, Download, Calendar, History, ExternalLink } from 'lucide-react';

// --- DATA I STAŁE Z INDEX (1).TSX ---
const PINATA_GATEWAY = "https://yellow-elegant-porpoise-917.mypinata.cloud/ipfs";
const KORDYS_IMAGES_URL = "/gallery/wyrok_kordysa";
const BADI_IMAGES_URL = "/gallery/wyrok_badi";
const NYDEK_IMAGES_URL = "/gallery/nydek";
const JANOV_IMAGES_URL = "/gallery/janov";

const VIDEO_CID = "bafybeifkquvqp6cewygbgoqsm3vm6kni3d4wy6medzc7nbsczziswmmv7u";
const ARREST_VIDEO_CID = "bafybeickwaxlebikfa2aax7mwk7xnp56n6vqmnw7mafponnztlzinf73iy";

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

const GALLERY_WYROK_KORDYS = Array.from({ length: 25 }, (_, i) => {
  const pageNumber = String(i + 1).padStart(4, '0');
  return `${KORDYS_IMAGES_URL}/30T_5_2021-1_page-${pageNumber}.jpg`;
});

const GALLERY_WYROK_BADI = Array.from({ length: 3 }, (_, i) => {
  const pageNumber = String(i + 1).padStart(4, '0');
  return `${BADI_IMAGES_URL}/wyrok_page-${pageNumber}.jpg`;
});

// --- KOMPONENTY UI ZDEFINIOWANE WEWNĘTRZNIE ---

const BrandHeader = () => (
  <div className="w-full border-b-2 border-[#3d2b1f] py-4 mb-8">
    <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#3d2b1f]">
      <div className="flex items-center gap-2">
        <span>📰</span>
        <span className="hidden sm:inline">Niezależne Media</span>
      </div>
      <div className="text-center font-serif py-2 md:py-0">
        NIEDZIELA, 1 MARCA 2026
      </div>
      <div className="flex items-center gap-2">
        <span className="hidden sm:inline">Serwis Śledczy</span>
        <span>📄</span>
        <span className="hidden md:inline border-l border-[#3d2b1f] pl-2 ml-1">Nr 01</span>
      </div>
    </div>
  </div>
);

const CaseFile = ({ title, children, type = 'file' }: { title: string, children: React.ReactNode, type?: string }) => (
  <div className="my-8 border border-[#c4b99a] bg-[#faf6ec]/60 p-6 relative shadow-sm overflow-hidden">
    <div className="absolute top-0 right-0 w-12 h-12 bg-[#722f37]/5 -rotate-45 translate-x-6 -translate-y-6"></div>
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 rounded-full bg-[#722f37] flex items-center justify-center text-white text-xs font-bold">
        {type === 'transcript' ? 'RT' : 'CF'}
      </div>
      <h4 className="text-[#722f37] font-bold uppercase tracking-tighter text-sm">
        {title}
      </h4>
    </div>
    <div className="text-[#1c1917] leading-relaxed italic border-l-2 border-[#722f37]/20 pl-4">
      {children}
    </div>
  </div>
);

const LocationStampUI = ({ name, code, plot, lv }: { name: string, code?: string, plot: string, lv: string }) => (
  <div className="inline-block p-4 border-2 border-[#722f37] bg-[#faf6ec] rotate-1 shadow-md mb-4">
    <div className="text-[#722f37] font-bold text-[10px] uppercase mb-1 border-b border-[#722f37]/30 pb-1 flex items-center gap-1">
       <Globe className="w-3 h-3" /> Katastr Nemovitostí
    </div>
    <div className="text-xl font-black text-[#3d2b1f] tracking-tight">{name}</div>
    <div className="flex gap-4 mt-2 text-[10px] font-mono text-[#5a4a3a]">
      {code && <span>OBEC: {code}</span>}
      <span>PARCELA: {plot}</span>
      <span>LV: {lv}</span>
    </div>
  </div>
);

const TransactionStampUI = ({ label, value, subDetails }: { label: string, value: string, subDetails?: string }) => (
  <div className="bg-[#3d2b1f] text-[#faf6ec] p-4 font-mono text-[10px] uppercase tracking-widest inline-flex flex-col gap-1 border-l-4 border-[#722f37]">
    <span className="text-[#b8a880]">{label}</span>
    <span className="text-sm font-bold">{value}</span>
    {subDetails && <span className="opacity-60">{subDetails}</span>}
  </div>
);

const EvidenceGrid = () => (
  <div className="my-16" id="galeria">
    <h3 className="text-2xl font-bold text-[#3d2b1f] uppercase tracking-widest mb-8 border-b-2 border-[#722f37] pb-2 flex items-center gap-3">
      ⚖️ Galeria Dowodów
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="group relative overflow-hidden bg-[#faf6ec] border border-[#c4b99a] shadow-md flex flex-col text-left">
        <div className="aspect-[3/4] overflow-hidden bg-[#e8e0cc]">
          <img
            src="/wezwanie_kicinski.png"
            alt="Wezwanie Kiciński"
            className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
          />
        </div>
        <div className="p-4 bg-[#faf6ec]/90">
          <h4 className="font-bold text-[#3d2b1f] text-sm mb-1 uppercase tracking-tight">Wezwanie dla M. Kicińskiego</h4>
          <p className="text-[10px] text-[#8a7a62] font-mono">Sygn. WD-I-3186/23</p>
          <a href="/wezwanie_kicinski.png" target="_blank" className="text-[10px] font-bold text-[#722f37] underline mt-2 inline-block hover:text-[#8b3a3a] transition-colors">POKAŻ DOWÓD</a>
        </div>
      </div>

      <div className="group relative overflow-hidden bg-[#faf6ec] border border-[#c4b99a] shadow-md flex flex-col text-left">
        <div className="aspect-[3/4] overflow-hidden bg-[#e8e0cc]">
          <img
            src={`${KORDYS_IMAGES_URL}/30T_5_2021-1_page-0001.jpg`}
            alt="Wyrok Kordys"
            className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
          />
        </div>
        <div className="p-4 bg-[#faf6ec]/90">
          <h4 className="font-bold text-[#3d2b1f] text-sm mb-1 uppercase tracking-tight">Uzasadnienie Wyroku: J. Kordys</h4>
          <p className="text-[10px] text-[#8a7a62] font-mono">Sygn. 30 T 5/2021</p>
          <div className="mt-2 text-[10px] font-bold text-[#722f37]">DOKUMENT: 25 STRON</div>
        </div>
      </div>
    </div>
  </div>
);

export const metadata: Metadata = {
  title: "Michał Kiciński, Ayahuasca i Tajemnicza Śmierć w Janovie",
  description: "Pełna dokumentacja śledztwa dziennikarskiego w sprawie ceremonii ayahuaski.",
};

export default function Page() {
  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": "Eliksir Wiedźmina – Śledztwo: Michał Kiciński i tajemnica Janova",
    "description": "Pełna dokumentacja śledztwa: Michał Kiciński, Jarosław Kordys i prokurator Jolanta Świdnicka.",
    "image": [`${KORDYS_IMAGES_URL}/wezwanie/wezwanie_kicinski.png`],
    "datePublished": "2024-03-03",
    "author": [{
      "@type": "Person",
      "name": "Detektyw Polutek",
      "url": "mailto:detektyw.polutek@protonmail.com"
    }]
  };

  return (
    <div className="bg-[#e4dbbe]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }}
      />

      <main className="min-h-screen text-[#1c1917] selection:bg-[#722f37]/20 font-serif flex flex-col items-center">
        <div className="w-full max-w-5xl bg-[#e4dbbe] min-h-screen shadow-2xl border-x-[2px] border-[#3d2b1f] flex flex-col relative overflow-hidden">
          
          <div className="w-full pt-0 px-6 flex flex-col items-center z-10 relative">
            <BrandHeader />
          </div>

          <header className="pt-8 pb-8 px-4 w-full z-10 relative text-center">
            <h1 className="mb-8 text-[#3d2b1f]">
              <span className="block text-5xl md:text-7xl font-bold leading-none tracking-tight uppercase">
                Eliksir Wiedźmina
              </span>
              <span className="block text-2xl md:text-4xl text-[#5a4a3a] italic font-medium mt-6 max-w-3xl mx-auto uppercase tracking-widest">
                Mroczna tajemnica twórców CD Projekt
              </span>
            </h1>

            <div className="max-w-2xl mx-auto border-y-2 border-[#3d2b1f] py-8 px-4">
              <p className="text-xl md:text-2xl text-[#5a4a3a] leading-relaxed italic">
                Ayahuasca, policyjne naloty i tragedia, o której nie miał się nikt dowiedzieć. Publicznie dostępne akta i rejestry ujawniają, jak twórcy gry "Wiedźmin" finansowali szamańskie podziemie.
              </p>
            </div>
          </header>

          <article className="max-w-2xl mx-auto px-4 pt-8 pb-16 z-10 relative">
            <div className="prose prose-stone prose-lg max-w-none prose-headings:font-sans prose-headings:font-bold prose-blockquote:not-italic
              prose-a:text-[#722f37] prose-a:font-bold prose-a:no-underline prose-a:underline prose-a:decoration-double prose-a:decoration-[#b8a880] hover:prose-a:bg-[#e8e0cc] transition-colors">

              <p className="first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-[#722f37] leading-relaxed">
                W 2020 roku media obiegły doniesienia o rozbiciu grupy polskich szamanów w czeskich <strong>Hermanovicach</strong>. Policyjny nalot, aresztowanie <strong>Jarosława i Karoliny Kordysów</strong>, a następnie surowe wyroki – 8,5 oraz 5,5 roku więzienia za prowadzenie nielegalnego biznesu polegającego na organizacji tzw. "ceremonii", podczas których klientom podawano egzotyczny psychodelik – ayahuaskę.
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

              <h2 className="text-3xl mt-16 mb-8 tracking-tight text-[#3d2b1f] border-b border-[#722f37]/40 pb-2">Świadek B.</h2>

              <p>
                W obszernym i publicznie dostępnym uzasadnieniu wyroku Jarosława Kordysa pojawia się postać świadka Bartosza B. Zgodnie z aktami:
              </p>

              <CaseFile title="Zeznania świadka B.">
                "Świadek B. odnośnie osoby oskarżonego [Jarosława Kordysa] oświadczył, że zna się z nim ok. 8 lat, a poznali się w Holandii".
                <br/><br/>
                "Świadek B. potwierdził, że i on sam w przeszłości prowadził warsztaty", a obecnie sam "jest przedmiotem dochodzenia policji w Krnowie właśnie z powodu ceremonii".
              </CaseFile>

              <p>
                Akta ujawniają również skalę zarzutów wobec Bartosza B.:
              </p>

              <CaseFile title="Zarzuty wobec Bartosza B.">
                "(...) wymieniony był sprawdzany w związku z występkiem niedozwolonej produkcji i innego obchodzenia się ze środkami odurzającymi (...) albowiem miał w roku 2014 zlecić przesłanie na swój adres przesyłki pocztowej przechwyconej na lotnisku w Lipsku RFN zawierającej 4,5 kg DMT, a 6.6.2018 miało dojść do zatrzymania przesyłki pocztowej we Frankfurcie nad Menem RFN zawierającej 2000 g meskaliny i 38,6 g substancji DMT."
              </CaseFile>

              <p>
                Intrygujący fragment dotyczy własności "bazy". Dokumenty stwierdzają:
              </p>

              <CaseFile title="Własność nieruchomości">
                "(...) budynek rodzinny w miejscowości Janov (...), który jest częściowo użytkowany do stałego zamieszkania, a częściowo jako komercyjny obiekt noclegowy"
                <br/><br/>
                "Świadek [Bartosz B.] potwierdził, że w Janowie jest właścicielem jednej dziesiątej nieruchomości".
              </CaseFile>

              <p>
                Do kogo należała reszta? Sąd wskazuje wprost:
              </p>

              <CaseFile title="Ustalenia Sądu">
                "...w odniesieniu do nieruchomości będących współwłasnością <strong>Bartosza B.</strong> i <strong>Michała D. K.</strong>".
              </CaseFile>

              <p>
                W Czechach księgi wieczyste są jawne i dostępne online. Wystarczy wejść na stronę Katastru Nieruchomości, wyszukać działkę w Janowie i za niewielką opłatą pobrać jej pełną historię.
              </p>

              <div className="my-8 flex justify-start">
                <LocationStampUI
                  name="JANOV U KRNOVA"
                  code="656976"
                  plot="st. 281"
                  lv="127"
                />
              </div>

              <p>
                Pobrany dokument nie pozostawia wątpliwości: w latach 2012–2023 współwłaścicielami nieruchomości byli:
                <br/>
                Bartosz Badowski (10%)
                <br/>
                <span className="bg-[#722f37] px-1 font-bold text-[#faf6ec] box-decoration-clone">Michał Dawid Kiciński (90%)</span>
              </p>

              <p>
                Drugie imię – Dawid – idealnie wypełnia lukę w zanonimizowanym skrócie "Michal D. K.". Wspólnikiem szamana był twórca "Wiedźmina" – jeden z najbogatszych Polaków.
              </p>

              <h2 className="text-3xl mt-16 mb-8 tracking-tight text-[#3d2b1f] border-b border-[#722f37]/40 pb-2">Na podsłuchu</h2>

              <p>
                Przełom w sprawie organizatorów ayahuaskowych ceremonii w 2020 roku nastąpił dzięki policyjnej technice operacyjnej. Telefon Kordysa był na stałym podsłuchu, a funkcjonariusze słuchali na żywo, gdy w dniu 24.08.2020 r. doszło do nerwowej wymiany zdań pomiędzy Badowskim i Kordysym.
              </p>

              <CaseFile title="Rekonstrukcja rozmowy" type="transcript">
                "oskarżony [Jarosława Kordysa] omawia z B., że dotarła do niego informacja, że w obiekcie w Janowie <span className="underline decoration-[#722f37] decoration-4 underline-offset-4">zmarła jakaś kobieta</span>".
              </CaseFile>

              <div className="my-12 p-5 bg-[#faf6ec]/60 border-l-[4px] border-[#722f37] rounded-r-lg shadow-sm">
                <Scale className="w-8 h-8 text-[#722f37]/80 shrink-0 mt-1" />
                <div>
                  <strong className="block font-serif text-[#3d2b1f] text-lg font-bold mb-1">Dohoda o vině a trestu</strong>
                  <div className="text-[#1c1917] text-lg leading-relaxed">
                    Ugoda o winie i karze. Czeska procedura karna pozwalająca oskarżonemu na dobrowolne poddanie się karze w zamian za łagodniejszy wyrok, bez przeprowadzania pełnego procesu dowodowego i wzywania świadków.
                  </div>
                </div>
              </div>

              <p>
                Bartosz "Badi" Badowski, wspólnik jednego z najbogatszych Polaków, błyskawicznie zrozumiał swoje położenie. Wybrał strategię, która miała uchronić go przed wieloletnim więzieniem.
              </p>

              <h2 className="text-3xl mt-16 mb-8 tracking-tight text-[#3d2b1f] border-b border-[#722f37]/40 pb-2">Kiciński</h2>

              <p>
                W cieniu tych wyroków pozostaje wciąż niewyjaśniona rola finansowego zaplecza całej operacji. Michał Kiciński został wezwany na przesłuchanie w 2023 roku.
              </p>

              <CaseFile title="Zeznanie do protokołu">
                "Nie mam żadnej wiedzy co się działo na mojej farmie, w której jestem 90% udziałowcem (...) wynajmowałem tę nieruchomość."
              </CaseFile>

              <p>
                Zastanawiające jest to, co stało się z tą nieruchomością w momencie zagrożenia. Gdy 15.10.2020 roku aresztowano Kordysa, nad środowiskiem zawisło widmo policyjnych nalotów.
              </p>

              <ul className="list-none space-y-12 my-12 font-mono text-sm border-l-2 border-[#b8a880] pl-4">
                <li className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[#722f37] shrink-0" />
                  <div>
                    <strong>21 grudnia 2023 r.</strong> – Finał operacji. Kiciński formalnie przekazuje Janov w formie darowizny. Nieruchomość trafia do stowarzyszenia "non-profit".
                  </div>
                </li>
              </ul>

              <div className="my-8 flex justify-start">
                <TransactionStampUI label="Nr Transakcji (Katastr)" value="V-5821/2023-127" subDetails="Obręb: Janov u Krnova [656976]" />
              </div>

              <h2 className="text-3xl mt-16 mb-8 tracking-tight text-[#3d2b1f] border-b border-[#722f37]/40 pb-2">Wiktor B.</h2>

              <p>
                Sytuacja uległa diametralnej zmianie 6 maja 2024 roku, gdy Prokuratura Okręgowa w Częstochowie wszczęła oficjalne śledztwo. Kilka miesięcy później, w tajemniczych okolicznościach umiera Wiktor B.
              </p>

              <div className="p-4 bg-[#faf6ec] border border-[#3d2b1f]/10 mb-16 shadow-inner">
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                   <div>
                     <span className="block font-serif text-[#3d2b1f] font-medium text-lg">Śledztwo w sprawie śmierci Wiktora B.</span>
                     <span className="block text-xs text-[#5a4a3a] mt-1 uppercase tracking-widest font-sans">Prokuratura Rejonowa w Pułtusku</span>
                   </div>
                   <span className="font-mono text-xs font-bold bg-[#722f37] px-3 py-1.5 text-[#faf6ec] rounded-sm shadow-sm whitespace-nowrap">
                     4027-0. Ds. 1254.2024
                   </span>
                 </div>
               </div>

              <EvidenceGrid />
            </div>
          </article>

          <footer className="mt-4 pt-8 border-none font-sans relative z-10 bg-[#e4dbbe] px-8 pb-16">
            <h3 className="text-xl font-bold text-[#3d2b1f] uppercase tracking-widest flex items-center gap-2 mb-4">
              <span>🔍</span> Dokumenty Źródłowe
            </h3>
            <div className="w-full mb-6 h-[3px] bg-gradient-to-r from-[#722f37] via-[#b8a880] to-[#722f37]"></div>
            <div className="grid gap-4 font-mono text-[10px] uppercase tracking-wider mb-12">
              <div className="p-3 bg-[#faf6ec]/60 border border-[#c4b99a] flex justify-between items-center">
                <span>IPFS: Baza Dowodowa (Full Archive)</span>
                <span className="text-[#722f37] font-bold">ZABEZPIECZONO</span>
              </div>
              <div className="p-3 bg-[#faf6ec]/60 border border-[#c4b99a] flex justify-between items-center">
                <span>GitHub: Source Mirror</span>
                <span className="text-[#722f37] font-bold">ONLINE</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-[#5a4a3a] uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
                <span>🌐</span> Oficjalna Witryna
              </p>
              <a href="https://www.eliksir-wiedzmina.pl" className="font-mono text-sm font-bold text-[#722f37] hover:bg-[#e8e0cc] transition-colors underline decoration-double decoration-[#b8a880]">www.eliksir-wiedzmina.pl</a>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
