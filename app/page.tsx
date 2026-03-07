"use client";

import React, { useEffect, useRef } from 'react';

const PINATA_GATEWAY = "https://yellow-elegant-porpoise-917.mypinata.cloud/ipfs";
const KORDYS_PDF_URL = `${PINATA_GATEWAY}/bafybeibzxfsg5s4jkiuf2kzmbdtmfutfjk75ej5zrpt2igan4aldvqc3oq`;
                        
                      
const BADI_PDF_URL = `${PINATA_GATEWAY}/bafkreietkosain6ftde7f3li5ic34qhkwuglz2tu2kfcpbvrwhslskhwza`;
const DOCUMENTATION_IPFS_URL = `${PINATA_GATEWAY}/bafybeicnxlo366f6fznm5p6j7j7j7j7j7j7j7j7j7j7j7j7j7j7j7j7j7j`; 
const JANOV_PDF_URL = DOCUMENTATION_IPFS_URL;
const NYDEK_PDF_URL = DOCUMENTATION_IPFS_URL;
const MUNAY_WAYBACK_URL = "https://web.archive.org/web/20230607033503/https://munaysonqo.com/retreats/";

const ARREST_VIDEO_URL = `${PINATA_GATEWAY}/bafybeickwaxlebikfa2aax7mwk7xnp56n6vqmnw7mafponnztlzinf73iy/videoplayback.m3u8`;
const STEFANEK_VIDEO_URL = `${PINATA_GATEWAY}/bafybeifkquvqp6cewygbgoqsm3vm6kni3d4wy6medzc7nbsczziswmmv7u/videoplayback.m3u8`;

const CaseFile = ({ title, children, type = 'evidence', highlight = false }: { title: string, children: React.ReactNode, type?: 'evidence' | 'transcript' | 'email', highlight?: boolean }) => {
  const getIcon = () => {
    if (type === 'email') return '✉️';
    if (type === 'transcript') return '🔍';
    return '📄';
  };
  
  return (
    <div className={`not-prose my-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-sm overflow-hidden break-inside-avoid text-left relative z-10 ${highlight ? 'bg-[#e8d154]' : 'bg-white/40'}`}>
      <div className="bg-black px-4 py-2 flex items-center gap-2 text-xs font-mono text-white uppercase tracking-wider">
        <span>{getIcon()}</span>
        <span>{title}</span>
      </div>
      <div className="p-6 font-mono text-sm md:text-base leading-relaxed text-[#000000] antialiased">
        {children}
      </div>
    </div>
  );
};

const LegalNote = ({ term, children }: { term: string, children: React.ReactNode }) => (
  <div className="not-prose my-10 flex gap-4 p-5 bg-[#e8d154]/20 border-l-[6px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-left relative z-10">
    <div className="text-2xl mt-1">⚖️</div>
    <div>
      <strong className="block font-display font-black uppercase text-[#000000] text-lg mb-2">{term}</strong>
      <div className="text-[#000000] text-sm leading-relaxed font-mono italic">{children}</div>
    </div>
  </div>
);

const PullQuote = ({ quote, author, source }: { quote: string, author: string, source: string }) => (
  <div className="not-prose my-10 pl-6 border-l-[6px] border-black text-left relative z-10">
    <p className="font-serif text-xl md:text-2xl italic text-[#000000] leading-relaxed mb-3">
      „{quote}”
    </p>
    <div className="font-sans text-[10px] uppercase tracking-widest text-black/70">
      — <span className="font-bold text-black">{author}</span>, {source}
    </div>
  </div>
);

const LocationStampUI = ({ name, code, plot, lv }: { name: string, code: string, plot: string, lv: string }) => (
  <div className="not-prose relative z-10 border-2 border-black bg-white p-1 pr-6 rounded-sm flex items-center gap-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-left hover:bg-[#e8d154]/20 transition-colors">
      <div className="absolute top-1 right-1 text-black">🔍</div>
      <div className="bg-black/5 h-full p-3 flex items-center justify-center border-r-2 border-black border-dashed">
         <span className="text-xl">🏠</span>
      </div>
      <div className="py-2">
         <div className="text-[9px] uppercase tracking-[0.2em] text-black font-bold mb-1 flex items-center gap-2">{name}</div>
         <div className="font-mono text-base font-bold text-black uppercase">LV {lv}</div>
         <div className="text-[10px] text-black/60 font-mono mt-1 uppercase">
            Działka: {plot} <span className="mx-1">|</span> Obręb: {code}
         </div>
      </div>
  </div>
);

const TransactionStampUI = ({ label, value, subDetails }: { label: string, value: string, subDetails?: string }) => (
  <div className="not-prose relative z-10 border-2 border-black bg-white p-1 pr-6 rounded-sm flex items-center gap-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#e8d154]/20 transition-colors text-left group">
     <div className="absolute bottom-1 right-1 text-black">🔍</div>
     <div className="bg-black/5 h-full p-3 flex items-center justify-center border-r-2 border-black border-dashed">
        <span className="text-xl">📄</span>
     </div>
     <div className="py-2">
        <div className="text-[9px] uppercase tracking-[0.2em] text-black font-bold mb-1">{label}</div>
        <div className="font-mono text-base font-bold text-black uppercase">{value}</div>
        {subDetails && <div className="text-[10px] text-black/60 font-mono mt-1 uppercase">{subDetails}</div>}
     </div>
  </div>
);

const ArticleVideoPlayer: React.FC<{ src: string; poster?: string }> = ({ src, poster }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let hls: any;
    if (videoRef.current) {
      const video = videoRef.current;
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src;
      } else if ((window as any).Hls && (window as any).Hls.isSupported()) {
        hls = new (window as any).Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
      }
    }
    return () => {
      if (hls) hls.destroy();
    };
  }, [src]);

  return (
    <div className="not-prose w-full bg-black aspect-video rounded-sm overflow-hidden flex items-center justify-center relative group border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10">
      <video ref={videoRef} controls poster={poster} className="w-full h-full object-cover" playsInline />
    </div>
  );
};

export default function Page() {
  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": "Eliksir Wiedźmina – Śledztwo: Michał Kiciński i tajemnica Janowa",
    "description": "Pełna dokumentacja śledztwa: Michał Kiciński, Jarosław Kordys i prokurator Jolanta Świdnicka. Ayahuasca, Janów i tragiczna śmierć uczestniczki.",
    "image": ["/wezwanie_kicinski.png"],
    "datePublished": "2024-03-03",
    "author": [{
      "@type": "Person",
      "name": "Detektyw Polutek",
      "url": "mailto:detektyw.polutek@protonmail.com"
    }]
  };

  return (
    <>
      <script src="https://cdn.jsdelivr.net/npm/hls.js@latest" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }}
      />

      <main className="min-h-screen bg-transparent text-[#000000] selection:bg-[#e8d154]/50 font-body flex flex-col items-center relative">
        <div 
          className="w-full max-w-4xl bg-[#e7dfcc] flex flex-col items-center pb-0 border-x-4 border-black overflow-hidden relative shadow-2xl"
          style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/subtle-paper.png')` }}
        >
          
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-multiply z-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}
          ></div>

          <div className="w-full flex flex-col items-center pt-2 pb-1 bg-white/10 relative z-10">
            <div className="flex items-center justify-center w-[calc(100%-2rem)] mx-auto gap-4 pt-4 pb-1">
              <div className="flex-grow h-[3px] bg-black"></div>
              <h1 className="text-4xl md:text-[5rem] font-black tracking-tighter text-black uppercase font-unifraktur leading-none whitespace-nowrap px-2">
                NASZA GAZETKA
              </h1>
              <div className="flex-grow h-[3px] bg-black"></div>
            </div>
            <div className="w-[calc(100%-2rem)] mx-auto border-y-4 border-black py-2 flex items-center justify-between px-4 text-[10px] md:text-xs font-black uppercase tracking-[0.15em]">
              <span>📰 Niezależne Media</span>
              <div className="text-center font-display text-black">NIEDZIELA, 1 MARCA 2026</div>
              <span>Serwis Śledczy Nr 01 📄</span>
            </div>
          </div>

          <div className="w-full text-center flex flex-col items-center pt-6 pb-4 px-6 box-border relative z-10">
            <img
              src="/zdjeciehej.png"
              alt="Wiedźmini z eliksirem"
              className="h-24 md:h-[160px] object-contain grayscale contrast-[1.6] mix-blend-multiply mb-4 bg-transparent" 
            />
            <h2 className="text-black w-full mb-1">
              <span className="block text-5xl md:text-[6rem] font-display font-black leading-[0.85] tracking-tighter uppercase">
                Eliksir
              </span>
              <span className="block text-5xl md:text-[6rem] font-display font-black leading-[0.85] tracking-tighter uppercase">
                Wiedźmina
              </span>
            </h2>
            <p className="block text-xs md:text-xl text-black font-black italic uppercase tracking-[0.25em] mt-4 border-y-2 border-black py-1">
              Mroczna tajemnica twórców CD Projekt
            </p>
            <div className="max-w-3xl mx-auto mt-6">
              <p className="text-sm md:text-lg text-[#000000] leading-snug italic font-serif font-bold px-4">
                Ayahuasca, policyjne naloty i tragedia, o której nie miał się nikt dowiedzieć. Publicznie dostępne akta i rejestry ujawniają, jak twórcy gry „Wiedźmin” finansowali szamańskie podziemie.
              </p>
            </div>
          </div>

          <article className="max-w-3xl mx-auto px-6 pt-4 pb-0 flex-grow w-full z-10 relative">
         <div 
  className="prose prose-stone prose-lg max-w-none article-prose font-serif text-lg leading-relaxed" 
  style={{ color: '#000000', opacity: 1, WebkitFontSmoothing: 'none' }}
>

              <p className="drop-cap mt-0">
                W 2020 roku media obiegły doniesienia o rozbiciu grupy polskich szamanów w czeskich <strong className="font-black">Hermanovicach</strong>. Policyjny nalot, aresztowanie <strong className="font-black">Jarosława i Karoliny Kordysów</strong>, a następnie surowe wyroki – 8,5 oraz 5,5 roku więzienia za prowadzenie nielegalnego biznesu polegającego na organizacji tzw. ceremonii, podczas których klientom podawano egzotyczny psychodelik – ayahuaskę.
              </p>

              <p className="mt-4">
               Ayahuasca (czyt. ajałaska) to tradycyjny wywar z amazońskich roślin o silnym działaniu halucynogennym. Ze względu na wysoką zawartość DMT – substancji psychodelicznej wywołującej intensywne wizje i zmiany stanu świadomości – jej posiadanie i podawanie jest w Polsce i Czechach zabronione. Finałem medialnego spektaklu Kordysów było ułaskawienie ich przez czeskiego prezydenta po dwóch latach odsiadki.<span className="cursor-pointer hover:bg-[#e8d154]/50 transition-colors rounded px-1" title="Kliknij, aby zobaczyć archiwalny dowód (atrapa)">🔍</span>
              </p>

              <p className="mt-4">
                Kurtyna opadła, temat ucichł. Ale czy to na pewno koniec tej historii? W cieniu tego głośnego procesu toczył się drugi – cichy i błyskawiczny, zakończony dyskretnym wyrokiem, o którym nikt nawet w mediach się nie zająknął. Analiza sądowych dokumentów prowadzi do zdumiewających wniosków.
              </p>

              <p className="mt-4">
                W przygranicznym Janowie funkcjonował drugi, bliźniaczy ayahuaskowy ośrodek, którego współwłaścicielem okazał się miliarder – <strong className="font-black">Michał Kiciński</strong>.
              </p>

              <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">Świadek B.</h2>

              <p className="mt-4">
                W obszernym i publicznie dostępnym uzasadnieniu wyroku Jarosława Kordysa <span className="cursor-pointer hover:bg-[#e8d154]/50 transition-colors rounded px-1" title="Kliknij, aby zobaczyć wyrok (atrapa)">📄</span> pojawia się postać świadka Bartosza B. Zgodnie z aktami:
              </p>

              <CaseFile title="Zeznania świadka B." type="transcript">
                Świadek B. odnośnie osoby oskarżonego [Jarosława Kordysa] oświadczył, że zna się z nim ok. 8 lat, a poznali się w Holandii. Świadek B. potwierdził, że i on sam w przeszłości prowadził warsztaty, a obecnie sam jest przedmiotem dochodzenia policji v Krnowie właśnie z powodu ceremonii.
              </CaseFile>

              <p className="mt-4">
                Akta ujawniają również skalę zarzutów wobec Bartosza B.:
              </p>

              <CaseFile title="Zarzuty wobec Bartosza B.">
                (...) wymieniony był sprawdzany w związku z występkiem niedozwolonej produkcji i innego obchodzenia się ze środkami odurzającymi (...) albowiem miał w roku 2014 zlecić przesłanie na swój adres przesyłki pocztowej przechwyconej na lotnisku v Lipsku RFN zawierającej 4,5 kg DMT, a 6.6.2018 miało dojść do zatrzymania przesyłki pocztowej we Frankfurcie nad Menem RFN zawierającej 2000 g meskaliny i 38,6 g substancji DMT.
              </CaseFile>

              <p className="mt-4">
                Intrygujący fragment dotyczy własności bazy. Dokumenty stwierdzają:
              </p>

              <CaseFile title="Własność nieruchomości">
                (...) budynek rodzinny w miejscowości Janów (...), który jest częściowo użytkowany do stałego zamieszkania, a częściowo jako komercyjny obiekt noclegowy.
                <br/><br/>
                Świadek [Bartosz B.] potwierdził, że w Janowie jest właścicielem jednej dziesiątej nieruchomości.
              </CaseFile>

              <p className="mt-4">
                Do kogo należała reszta? Sąd wskazuje wprost:
              </p>

              <CaseFile title="Ustalenia Sądu">
                ...w odniesieniu do nieruchomości będących współwłasnością <strong className="font-black">Bartosza B.</strong> i <strong className="font-black">Michała D. K.</strong><span className="cursor-pointer hover:bg-[#e8d154]/50 transition-colors rounded px-1" title="Kliknij, aby zobaczyć zdjęcie (atrapa)">📸</span>
              </CaseFile>

              <p className="mt-4">
                W Czechach księgi wieczyste są jawne i dostępne online. Wystarczy wejść na stronę Katastru Nieruchomości, wyszukać działkę w Janowie i za niewielką opłatą pobrać jej pełną historię.
              </p>

              <div className="not-prose my-8 flex justify-start">
                  <LocationStampUI name="JANOV U KRNOVA" code="656976" plot="st. 281" lv="127" />
              </div>

              <p className="mt-4">
                Pobrany dokument nie pozostawia wątpliwości: w latach 2012–2023 współwłaścicielami ajałaskowej nieruchomości byli:
                <br/><br/>
                Bartosz Badowski (10%) i <span className="bg-[#e8d154]/80 px-1 font-black text-black box-decoration-clone">Michał Dawid Kiciński (90%)</span><br/>
              </p>

            <p className="mt-4">
  Drugie imię – Dawid – idealnie wypełnia lukę w zanonimizowanym skrócie Michal D. K.
</p>
<p className="mt-2">
  <span className="bg-red-600 px-1 font-black text-white shadow-sm box-decoration-clone">
    Wspólnikiem szamana był twórca Wiedźmina – jeden z najbogatszych Polaków.
  </span>
</p>
              <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">Na podsłuchu</h2>

              <p className="mt-4">
                Przełom w sprawie organizatorów ayahuaskowych ceremonii w 2020 roku nastąpił dzięki policyjnej technice operacyjnej. Telefon Kordysa był na stałym podsłuchu, a funkcjonariusze słuchali na żywo, gdy w dniu 24.08.2020 r. doszło do nerwowej wymiany zdań pomiędzy Badowskim i Kordysym.
              </p>

              <p className="mt-4">
                Kordys zadzwonił do Badowskiego wyraźnie zaniepokojony wieściami, które do niego dotarły. Bał się, że tragedia, o której huczało w kuluarach, może zniszczyć ich imperium. Sąd w uzasadnieniu wyroku precyzyjnie rekonstruuje ten moment:
              </p>

              <CaseFile title="Rekonstrukcja rozmowy (Uzasadnienie Sądu)" type="transcript">
                oskarżony [Jarosława Kordysa] omawia z B., że dotarła do niego informacja, że w obiekcie w Janowie <span className="underline decoration-red-700 decoration-4 underline-offset-4 font-bold">zmarła jakaś kobieta</span>.
              </CaseFile>

              <p className="mt-4">
                W rozmowie pojawia się też wątek zagrożenia ze strony osoby trzeciej – mężczyźni omawiają szantażystę, który chce iść na policję. Kordys wprost pyta wspólnika:
              </p>

              <CaseFile title="Pytanie Kordysa" type="transcript">
                W jakim zagrożeniu jest nasza praca?
              </CaseFile>

              <div className="not-prose my-12 pl-6 border-l-[6px] border-black font-serif italic text-2xl text-[#000000] leading-relaxed relative z-10">
                „Z ich rozmowy wynika, że nie zajmowali się w zasadzie samym faktem śmierci, lecz raczej obawą, aby to nie przyciągnęło uwagi policji.”
              </div>

              <p className="mt-4">
                Dla sądu był to koronny dowód na to, że oskarżeni prowadzili nielegalny biznes, a nie działalność duchową – śmierć człowieka była dla nich jedynie psuciem interesów.
              </p>

              <p className="mt-4">
                Cynizm tej konwersacji sięga zenitu chwilę później. Gdy tylko ustalili strategię uciszenia plotek, natychmiast przeszli do logistyki dostaw narkotyku. Sąd odnotowuje, że zaraz po dywagacjach o śmierci i szantażu, rozmówcy wracają do interesów:
              </p>

              <CaseFile title="Kontynuacja rozmowy" type="transcript">
                Następnie w rozmowie omawiają zamówienia «herbaty» z dżungli i to, czy im tego «nie zepsują», ekscytując się nagraniem od dostawcy, który «siedzi v dżungli i gotuje».
              </CaseFile>

              <p className="mt-4">
                Dla policjantów, którzy słyszeli to w czasie rzeczywistym, przekaz był jasny: w obiekcie mogło dojść do tragedii, a sprawcy martwili się jedynie o ciągłość dostaw.
              </p>

              <p className="mt-4">
                Zaledwie dwa dni po tym telefonie, 26.08.2020 czescy policjanci weszli do posiadłości w Janowie. Efekty rewizji opisano w wyroku Kordysa:
              </p>

              <CaseFile title="Protokół rewizji">
                w nieruchomości zabezpieczono rzeczy... oprócz marihuany zabezpieczono również substancje zawierające DMT o objętości ok. 2 kg.
              </CaseFile>

              <p className="mt-4">
                Podczas policyjnej interwencji zidentyfikowano tam 15 obywateli Polski, którzy mieli brać udział w ceremonii. Wśród nich, stali bywalcy i bliscy znajomi Badowskiego – <strong className="font-black">Krzysztof Stefanek</strong> i <strong className="font-black">Magdalena Drzewińska</strong>, których obecność w momencie wkroczenia służb ma znaczenie w kontekście późniejszej ich roli w tej historii.
              </p>

              <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">Cena wolności</h2>

              <p className="mt-4">
                Kiedy 26 sierpnia 2020 roku czeska policja weszła do posiadłości w Janowie, należącej do Bartosza Badowskiego i miliardera Michała Kicińskiego, Jarosław Kordys w Hermanovicach wciąż czuł się bezpiecznie. Nie wiedział jeszcze, że zegar zaczął odliczać czas do jego własnej katastrofy. Zaledwie 7 tygodni po cichym nalocie na Badowskiego policja zapukała do Kordysów.
              </p>

              <p className="mt-4">
                15 października 2020 roku sielankę w ich ośrodku przerwał huk granatów ogłuszających. Czeska jednostka antyterrorystyczna nie bawiła się w półśrodki: zamaskowani funkcjonariusze z długą bronią wdarli się do budynku, rzucając na ziemię przyszłych bohaterów głośnego skandalu.
              </p>

              <div className="not-prose my-8">
                <ArticleVideoPlayer src={ARREST_VIDEO_URL} />
                <div className="mt-4 text-sm text-black font-mono border-l-[4px] border-black pl-4 bg-[#e8d154]/20 py-2 relative z-10">
                  <span className="font-black uppercase text-xs mr-2">Materiał Operacyjny:</span>
                  Nagranie z policyjnego nalotu na ośrodek w Hermanovicach (15.10.2020)
                </div>
              </div>

              <p className="mt-4">
                Co wydarzyło się w ciągu tych niespełna dwóch miesięcy? Odpowiedź kryye się w jednym czeskim terminie prawnym:
              </p>

              <LegalNote term="Dohoda o vině a trestu">
                Ugoda o winie i karze. Czeska procedura karna pozwalająca oskarżonemu na dobrowolne poddanie się karze w zamian za łagodniejszy wyrok, bez przeprowadzania pełnego procesu dowodowego i wzywania świadków.
              </LegalNote>

              <p className="mt-4">
                Bartosz Badi Badowski, wspólnik jednego z najbogatszych Polaków, błyskawicznie zrozumiał swoje położenie. W obliczu zabezpieczonych dowodów – w tym 2 kilogramów substancji z DMT i marihuany – wybrał strategię, która miała uchronić go przed wieloletnim więzieniem. Postanowił kupić sobie wolność.
              </p>

              <p className="mt-4">
                Ugoda pozwoliła na zamknięcie jego teczki bez wywoływania świadków, co w praktyce oznaczało, że mechanizmy działania janowskiego ośrodka nigdy nie wybrzmiały echem w publicznej debacie, chroniąc Badowskiego przed krzyżowym ogniem pytań i zeznaniami, które mogłyby pogrążyć także jego cichego wspólnika.
              </p>

              <p className="mt-4">
                Cena wolności Badowskiego okazała się być wysoka dla jego kolegi z branży. Zeznania Badiego były dla prokuratury bezcennym materiałem dowodowym, który pozwolił domknąć łańcuch poszlak w sprawie Kordysów.
              </p>

              <p className="mt-4">
                Na mocy wyroku z dnia 2 listopada 2021 roku <span className="cursor-pointer hover:bg-[#e8d154]/50 transition-colors rounded px-1" title="Kliknij, aby zobaczyć wyrok (atrapa)">📜</span>Bartosz Badowski został uznany winnym popełnienia zbrodni niedozwolonej produkcji i innego obchodzenia się ze środkami odurzającymi.
              </p>

              <CaseFile title="Ustalenia wyroku skazującego Bartosza B.">
                co najmniej od bliżej nieustalanej daty w 2015 roku do 26.08.2020 [...] oferował, organizował i co najmniej w 441 przypadkach zrealizował w nieregularnych odstępach czterodniowe i dziesięciodniowe pobyty [...] ukierunkowane na tzw. duchowe ćwiczenia spirytualne
                <br/><br/>
                udostępnił uczestnikom do użycia bliżej nieustaloną ilość substancji psychotropowych, a mianowicie tzw. ayahuascę zawierającą dimetylotryptaminę (DMT) oraz tzw. marihuanę zawierającą tetrahydrokannabinol (THC)
                <br/><br/>
                przechowywał łącznie 1902,79 grama materiału roślinnego (...), który zawierał łącznie 37,24 grama substancji czynnej dimetylotryptaminy (DMT) oraz 92,29 grama tzw. narkotyku marihuany.
              </CaseFile>

              <p className="mt-4">
                Podczas, gdy Jarosław Kordys został skazany na 8,5 roku pozbawienia wolności Bartosz Badowski, którego sprawa dotyczyła tego samego procederu, tych samych substancji, regionu i czasu trwania działalności, dzięki ugodzie i współpracy z wymiarem sprawiedliwości, zakończył sprawę wyrokiem w zawieszeniu.
              </p>

              <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">Cisza po burzy</h2>

              <p className="mt-4">
                Choć Badowski zaprzestał prowadzenia działalności szamańskiej, posiadłość w Janowie nie opustoszała – zamieszkali z nim wspomniani wcześniej Krzysztof Stefanek i Magdalena Drzewińska. Ich obecność u boku Badiego w tamtym czasie rzuca cień na ich późniejszą rolę; nie byli to wszakże niewinni obserwatorzy, lecz ludzie, którzy mimo tego, że sami byli obecni podczas policyjnej interwencji, pozostali lojalni wobec byłego szamana.
              </p>

              <p className="mt-4">
                Będąc tak blisko Badowskiego, doskonale znali mroczną tajemnicę śmierci Ilony. Ich decyzja o zamieszkaniu z człowiekiem, który w obliczu tragedii martwił się o ciągłość dostaw, dowodzi, że w pełni akceptowali reguły zmowy milczenia.
              </p>

              <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">Kiciński</h2>

              <p className="mt-4">
                W cieniu tych wyroków pozostaje wciąż niewyjaśniona rola cichego wspólnika. Michał Kiciński to nie jest postać, która o ayahuasce jedynie słyszała – on stał się jej nieoficjalnym ambasadorem w polskich mediach głównego nurtu. W licznych wywiadach (m.in. dla Focusa, Newsweeka) z niezwykłą precyzją opisuje on mechanizmy działania psychodelików. Kiciński publicznie opowiada o lekcjach pokory, jakie dała mu medycyna, o spotkaniach z szamanami i o tym, jak napar z dżungli otwiera nową rzeczywistość.
              </p>

              <PullQuote
                quote="Po ayahuasce jest szansa na to, żeby sobie nie ściemniać."
                author="Michał Kiciński"
                source="Newsweek, 30 maja 2016 r."
              />

              <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">Błąd z Badim</h2>

              <p className="mt-4"> Jego konfrontacja z organami ścigania nabrała formalnego kształtu  jesienią 2023 roku. 21 września 2023 roku miliarder osobiście odebrał wezwanie do stawiennictwa w charakterze świadka w sprawie o sygnaturze WD-I-3186/23. Miało się ono odbyć 18.10.2023. Na wezwaniu czytelnie było napisane, że przesłuchanie będzie dotyczyć Janova.
              </p>

              <div className="not-prose my-12 flex flex-col items-center relative z-10">
                  <div className="border-4 border-black p-2 bg-white/50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <img
                      src="/wezwanie_kicinski.png"
                      alt="Wezwanie na policję"
                      className="w-64 grayscale mix-blend-multiply"
                    />
                  </div>
                <p className="text-xs text-black mt-4 font-mono uppercase tracking-wider font-bold">
                  Skan wezwania
                </p>
              </div>

              <p className="mt-4">
                Reakcja miliardera na zainteresowanie organów ścigania była błyskawiczna. Zwrócił się bezpośrednio do autora zawiadomienia – wysyłając mu wiadomość mailową z propozycją swoistej pokuty. Zamiast wyjaśnień prokuratorskich zaoferował przelew na cel charytatywny, nazywając lata nielegalnego procederu młodzieńczą naiwnością.
              </p>

              <CaseFile title="Wiadomość prywatna od M. Kicińskiego" type="email">
                (...) Tak mogę zapłacić za swój błąd z Badim. Podaj mi Fundacje lub Stowarzyszenie (najlepiej powiązaną z hospicjum lub domami dziecka, bo tu widzę morze potrzeb i dużo cierpienia) i wpłacę tam dobrowolnie kwotę darowizny, w ramach Przeprosin wszechświatowi, za moją młodzieńczą naiwność i brak przenikliwości. Fundacja / Stowarzyszenie musi być uznana i z tradycjami, a nie jakaś organizacja krzak. Wyślę Ci potwierdzenie przelewu.
              </CaseFile>

              <p className="mt-4">
                Do przesłuchania doszło tydzień przed terminem wskazanym na wezwaniu – 11 października 2023 roku o godzinie 15:00 w Komendzie Rejonowej Policji Warszawa II. W protokole Kiciński przyjmuje linię opartą na braku świadomości co do charakteru działalności prowadzonej w jego posiadłości.
              </p>

              <CaseFile title="Zeznanie do protokołu">
                Nie mam żadnej wiedzy co się działo na mojej farmie, w której jestem 90% udziałowcem (...) wynajmowałem tę nieruchomość.
              </CaseFile>

              <p className="mt-4">
                Gdy w toku czynności padło kluczowe pytanie o jego własny udział w ceremoniach ayahuaski w Janowie, odpowiedź była lakoniczna:
              </p>

              <CaseFile title="Odpowiedź na pytanie o udział">
                nie brałem udziału w takich ceremoniach w latach 2016-2023, a o wcześniejszym okresie <span className="underline decoration-black decoration-4 underline-offset-4 font-black">odmawiam odpowiedzi</span>
              </CaseFile>

              <p className="mt-4">
                W kontekście złożonych zeznań warto zauważyć, że miliarder jest właścicielem luksusowego ośrodka Munay Sonqo w Peru, o którym wielokrotnie wspominał w wywiadach.
              </p>

              <p className="mt-4">
                W przeciwieństwie do Europy, peruwiańskie prawo zezwala na komercyjne prowadzenie ceremonii z ayahuascą. Ośrodek Kicińskiego do tej pory oferuje tam w pełni jawną i profesjonalną sprzedaż usług o profilu bliźniaczym do tych, które w Czechach są zakazane, co wciąż jest eksponowane na stronie internetowej. <a 
  href="https://munaysonqo.com/all-retreats/#calendar-7a66adc3-3ebd-432c-b572-0faf936c281f-event-e90d5161-a00e-4742-b4b7-039de153a23d" 
  target="_blank" 
  rel="noopener noreferrer" 
  className="cursor-pointer hover:bg-[#e8d154]/50 transition-colors rounded px-1" 
  title="Kliknij, aby otworzyć stronę ośrodka Munay Sonqo"
>
  🌐
</a>
              </p>

              <p className="mt-4">
                Fakt, że Kiciński w momencie przesłuchania zarządzał legalnym biznesem ayahuaskowym w Ameryce Południowej, stawia pod znakiem zapytania jego deklarowaną nieświadomość co do profilu działalności w Janowie.
              </p>

              <p>
                Oto jak współpracę  opisuje sam Bartosz Badowski:
              </p>

              <CaseFile title="Fragment korespondencji B. Badowskiego" type="email">
                Przelewy wysyłałem z mojego konta ING, które mam do tej pory [...]. Tytuł „wynajem”. (...) Dopóki zarabiałem - dzieliłem się z zyskiem.(...) Michał wiedział dokładnie co się dzieje na farmie i czerpał z tego zyski przez wiele wiele lat. (...) Rozważam też wizytę na Policji w Czechach - ja poniosłem prawne konsekwicje za prowadzenie ceremonii, ale Kiciński - żadnych. Mimo, że to on czerpał z tego największe zyski, to on był nade mwem i był większościowym właścicielem farmy.
              </CaseFile>

              <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">Anonimowy filantrop</h2>

              <p className="mt-4">
                W listopadzie 2025 roku na kanale YouTube <strong className="font-black">Osada Natury Zew</strong> pojawia się nagrany rok wcześniej film, w którym obecny gospodarz, <strong className="font-black">Krzysztof Stefanek</strong>, snuje opowieść o powstaniu Osady. W sielskiej scenerii, z uśmiechem na ustach, buduje narrację o cudownym zbiegu okoliczności i tajemniczym dobroczyńcy.
              </p>

              <p className="mt-4">
                Stefanek wspomina, jak wspólnie z grupą przyjaciół pomagał uporządkować sprawy własnościowe, by obiekt znalazł się w jednych rękach. Kluczowy moment tej opowieści Stefanek datuje z niezwykłą precyzją:
              </p>

              <CaseFile title="Wypowiedź K. Stefanka">
                Ostatecznie <span className="bg-[#e8d154]/80 px-1 font-black text-black box-decoration-clone">23 października 2023 roku</span> ten człowiek do nas zadzwonił powiedział, że wspólnie z żoną zdecydowali, że oni by chciał to miejsce przekazać w darowiźnie
              </CaseFile>

              <p className="mt-4">
                Stefanek przedstawia to jako efekt researchu darczyńcy, który rzekomo urzekła wizja działalności non-profit.
              </p>

              <div className="not-prose my-8">
                <ArticleVideoPlayer src={STEFANEK_VIDEO_URL} />
                <div className="mt-4 text-sm text-black font-mono border-l-[4px] border-black pl-4 bg-[#e8d154]/20 py-2 relative z-10">
                  <span className="font-black uppercase text-xs mr-2">Materiał Wideo:</span>
                  Krzysztof Stefanek opowiada o cudownym otrzymaniu darowizny (Materiał z 2025 r.)
                </div>
              </div>

              <p className="mt-4 mb-8">
                Jednak kalendarz wydarzeń prawnych burzy ten romantyczny mit, ujawniając nerwowy pośpiech w pozbywaniu się gorącego kartofla:
              </p>

              <ul className="not-prose list-none space-y-10 my-12 font-mono text-sm border-l-4 border-black pl-6 relative z-10">
                <li className="flex items-start gap-4">
                  <span className="text-xl">📅</span>
                  <div>
                    <strong className="font-black text-base">21 września 2023 r.</strong><br/>
                    Michał Kiciński odbiera wezwanie na przesłuchanie w sprawie Janowa.
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <span className="text-xl">📅</span>
                  <div>
                    <strong className="font-black text-base">3 października 2023 r.</strong><br/>
                    Na tydzień przed wizytą na komendzie odkupuje od Bartosza Badowskiego jego 10% udziałów w nieruchomości. Aby pozbyć się całego ośrodka jednym podpisem, musi najpierw stać się jego jedynym właścicielem.
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <span className="text-xl">📅</span>
                  <div>
                    <strong className="font-black text-base">11 października 2023 r.</strong><br/>
                    Miliarder staje przed policją. Do protokołu odmawia zeznań na temat swojej przeszłości w tym miejscu.
                  </div>
                </li>

                <li className="flex items-start gap-4 mt-6">
                  <span className="text-xl mt-4">⚠️</span>
                  <div className="bg-[#e8d154]/30 border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full">
                    <strong className="font-black text-base font-sans">23 października 2023 r.</strong><br/>
                    Zaledwie 12 dni po kłopotliwym przesłuchaniu, gdy formalności własnościowe z Badim są już dopięte, następuje telefon do Stefanka z propozycją oddania majątku wartego miliony za darmo.
                  </div>
                </li>

                <li className="flex items-start gap-4 mt-6">
                  <span className="text-xl">📅</span>
                  <div>
                    <strong className="font-black text-base">21 grudnia 2023 r.</strong><br/>
                    Finał operacji. Kiciński formalnie przekazuje Janów w formie darowizny. Nieruchomość trafia do stowarzyszenia non-profit – fasadowej organizacji krzak, zarządzanej przez ludzi, którzy przez lata byli częścią tego procederu. Miliarder pozbywa się dowodów, a nowi właściciele zyskują bazę do dalszej działalności pod nowym szyldem.
                  </div>
                </li>
              </ul>

              <p className="mt-4">
                Cynizm tej sytuacji pogłębia fakt, że obdarowani nie byli przypadkowymi entuzjastami ekologii. <strong className="font-black">Krzysztof Stefanek</strong>, który w filmie mówi o odwróconej logice i pięknie wolontariatu, i jego konkubina <strong className="font-black">Magdalena Drzewińska</strong> w rzeczywistości doskonale znali mroczną historię Janowa i tajemnicę śmierci Ilony. Przyjmując darowiznę, przejmowali nie tylko ziemię, ale i milczenie.
              </p>

              <div className="not-prose my-8 flex justify-start">
                 <TransactionStampUI
                  label="Nr Transakcji (Katastr)"
                  value="V-5821/2023-127"
                  subDetails="Obręb: Janów u Krnova [656976]"
                />
              </div>

              <p className="mt-4">
                Ostatecznie strategia okazała się skuteczna. Śledztwo umorzono zanim się zaczęło, a majątek, który mógł podlegać przepadkowi jako narzędzie przestępstwa, został bezpiecznie zaparkowany w stowarzyszeniu. Kiciński pozostał anonimowym filantropem, a Stefanek – opiekunem nowej, czystej osady.
              </p>

              <p className="mt-4">
                Na tragedii świadomie wzbogacili się ludzie, dla których tuszowanie prawdy stało się fundamentem ich nowej, intratnej rzeczywistości. Pod szyldem organizacji non-profit <strong className="font-black">Stowarzyszenie Natury Zew</strong> Marta Zinserling, Michał Baciński, Stefanek i Drzewińska żyli później z organizacji turnusów wypoczynkowych z cennikiem darowizn zamiast paragonów, okłamując swoich gości i publicznie każdego, kto natrafi na ich sielankowe filmiki. A przecież zadośćuczynienie wszechświatowi miało trafić na hospicjum, a nie na organizację krzak.
              </p>

              <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">Nýdek</h2>

              <p className="mt-4">
                Gdyby sprawa dotyczyła tylko jednego miliardera, można by mówić o przypadku lub pechowym doborze najemców. Jednak nieco dalej od Janowa, w miejscowości <strong className="font-black">Nýdek</strong>, funkcjonował kolejny, bliźniaczy ośrodek.<span className="cursor-pointer hover:bg-[#e8d154]/50 transition-colors rounded px-1" title="Kliknij, aby zobaczyć zdjęcie (atrapa)">📸</span>
              </p>

              <p className="mt-4">
                Relacje świadków wskazują, że w posiadłości w Nýdku odbywały się regularne ceremonie o charakterze zbliżonym do tych u Kordysów i Badowskiego, prowadzone przez <strong className="font-black">Piotra Bonawenturę Tracza</strong>. Chociaż witryna ośrodka już nie istnieje, archiwum internetu Wayback Machine zachowało zrzuty strony tribunydek.com.<span className="cursor-pointer hover:bg-[#e8d154]/50 transition-colors rounded px-1" title="Kliknij, aby zobaczyć archiwalny dowód (atrapa)">🔍</span> Opisy warsztatów jednoznacznie wskazują, że nieruchomość była wykorzystywana do pracy z psychodelikami.
              </p>

              <p className="not-prose mt-4 font-bold text-center my-8 uppercase font-sans text-black">
                Skoro wiemy już, czym ten dom był, kluczowym pytaniem staje się: do kogo należał?
              </p>

              <p className="mt-4">
                Analiza czeskich ksiąg wieczystych przynosi sensacyjne odkrycie. Właścicielem tej kolejnej szamańskiej świątyni – dokładnie w czasie, gdy strona internetowa zapraszała na ceremonie – był drugi z duetu miliarderów stojących za gamingowym gigantem, <span className="bg-[#e8d154]/80 px-1 font-black text-black box-decoration-clone">Marcin Iwiński</span>. Dokumenty urzędowe bezlitośnie łączą jego nazwisko z infrastrukturą, w której odbywał się nielegalny proceder.
              </p>

              <div className="not-prose my-8 flex justify-start">
                  <LocationStampUI name="NÝDEK" code="708186" plot="st. 506/1" lv="832" />
              </div>

              <p className="mt-4">
                <span className="bg-red-600 px-1 font-black text-white shadow-sm box-decoration-clone">Oznacza to, że nie jeden lecz obaj legendarni założyciele CD Projekt, na czeskim pograniczu posiadali nieruchomości, w których odpłatnie oferowano te same nielegalne substancje.</span>
              </p>

              <p className="mt-4">
                Jeszcze bardziej zastanawiające jest to, co stało się z tą nieruchomością w momencie zagrożenia. Gdy 15.10.2020 roku aresztowano Kordysa, nad środowiskiem zawisło widmo policyjnych nalotów. Dokumenty urzędowe odsłaniają niepokojącą zbieżność dat:
              </p>

              <ul className="not-prose list-none space-y-10 my-12 font-mono text-sm border-l-4 border-black pl-6 relative z-10 text-black">
                 <li className="flex items-start gap-4">
                  <span className="text-xl">📅</span>
                <div>
  <strong className="font-black text-base block">25 stycznia 2016 r.</strong>
  <span className="block leading-tight">
    Marcin Iwiński zakupuje nieruchomość w Nydku za kwotę 5 000 000,00 CZK.
  </span>
  <span className="block leading-tight">
    Nieruchomość ta służy do organizacji nielegal ceremonii z użyciem psychodelików podawanych uczestnikom przez Piotra Tracza.
  </span>
</div>
                 </li>

                 <li className="flex items-start gap-4">
                  <span className="text-xl">📅</span>
                  <div>
                    <strong className="font-black text-base">15 października 2020 r.</strong><br/>
                    Policyjny szturm na ośrodek Kordysów. W środowisku wybucha panika.
                  </div>
                 </li>

                <li className="flex items-start gap-4">
                  <span className="text-xl">📅</span>
                  <div>
                    <strong className="font-black text-base">15 czerwca 2021 r.</strong><br/>
                    Marcin Iwiński "sprzedaje" nieruchomości w Nýdku.
                  </div>
                </li>
              </ul>

              <p className="mt-4">
                Nabywcą luksusowej posiadłości nie został inny inwestor, lecz sam Piotr Tracz – ten sam człowiek, który wcześniej pełnił tam rolę szamana.
              </p>

              <div className="not-prose my-8 flex justify-start">
                <TransactionStampUI
                  label="Nr Transakcji (Katastr)"
                  value="V-2937/2021-832"
                  subDetails="Obręb: Nýdek [708186]"
                />
              </div>

              <p className="mt-4">
                Transakcja ta rodzi wątpliwości: w jaki sposób niszowy szaman sfinansował zakup luksusowej willi od jednego z najbogatszych Polaków? Nowy właściciel niemal natychmiast zmienił formalny profil działalności na legalne warsztaty pracy z ciałem. Zbieżność tej sekwencji zdarzeń z darowizną Kicińskiego w Janowie pozwala dostrzec powtarzalny schemat wycofywania się właścicieli z infrastruktury powiązanej z nielegalnym procederem.
              </p>

              <h2 className="not-prose section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-16 font-display">Wiktor B.</h2>

              <p className="mt-4">
                9. marca 2026 Onet ujawnia opinii publicznej wstrząsające kulisy działalności ośrodka w czeskim Janowie.  Dziennikarskie śledztwo koncentruje się na śmierci 54-letniej uczestniczki, Ilony L.-H. 🌐
              </p>

              <p className="mt-4">
                Według ustaleń Onetu, w czerwcu 2018 roku na farmie w Janowie doszło do tragedii. Podczas nocnej ceremonii z użyciem ayahuaski, kobieta poczuła się fatalnie, zmagając się z silnym bólem i intensywnymi wymiotami. Mimo jej krytycznego stanu, organizator nie wezwał pomocy medycznej. Uczestnikom odebrano wcześniej telefony, co uniemożliwiło im samodzielne zaalarmowanie służb ratunkowych.
              </p>

              <p className="mt-4">
                     Prowadzący obrzęd Wiktor B., brat Bartosza Badowskiego, był tej nocy pod wpływem marihuany. Z relacji świadków wynika, że po śmierci kobiety podjął on natychmiastowe działania mające na celu zatuszowanie incydentu. Nakazał uczestnikom bezzwłoczne opuszczenie ośrodka. Czeskiej policji przedstawił fałszywą wersję zdarzeń, twierdząc, że Ilona L.-H. była jedynie gościem i została znaleziona martwa w łazience nad ranem. Służby początkowo nie nabrały podejrzeń, przyjmując tę relację za wiarygodną.
              </p>

              <p className="mt-4">
                Przez kolejne lata tę kłamliwą narrację udawało się skutecznie utrzymywać. O nieszczęśliwym wypadku i śmierci z przyczyn naturalnych przez długi czas przekonana była nawet najbliższa rodzina Ilony.
              </p>

              <p className="mt-4">
                Sytuacja uległa  zmianie dopiero 6 maja 2024 roku, gdy Prokuratura Okręgowa w Częstochowie wszczęła oficjalne śledztwo w sprawie działalności ośrodka oraz okoliczności śmierci Ilony L.-H. Zaledwie 2 miesiące  później, w tajemniczych okolicznościach umiera Wiktor B.
              </p>

              <p className="mt-4">
                Ciało mężczyzny odnaleziono w magazynie firmy, w której pracował przy montażu szaf serwerowych. Na jego ciele nie stwierdzono widocznych obrażeń wskazujących na użycie siły fizycznej. Mimo że od śmierci Wiktora B. minęło już ponad półtora roku, śledczy wciąż czekają na wyniki badań toksykologicznych, które mają kluczowe znaczenie dla wyjaśnienia, czy w organizmie mężczyzny znajdowały się substancje mogące przyczynić się do jego nagłego odejścia. Z tego względu obecnie śledztwo w sprawie jego tajemniczego zgonu pozostaje zawieszone.<span className="cursor-pointer hover:bg-[#e8d154]/50 transition-colors rounded px-1" title="Kliknij, aby zobaczyć szczegóły (atrapa)">🔍</span>
              </p>

              <div className="not-prose mt-12 mb-4 flex justify-end relative z-10">
                  <div className="text-right border-r-4 border-black pr-4">
                    <span className="block font-black text-black uppercase text-xl font-display tracking-widest">Detektyw Polutek</span>
                    <span className="block text-xs text-black/60 font-mono mt-1 italic">detektyw.polutek@protonmail.com</span>
                  </div>
              </div>

              <div className="not-prose mt-16 mb-0 border-y-4 border-black py-8 bg-[#e8d154]/10 relative z-10">
                  <h3 className="font-display font-black text-2xl uppercase tracking-widest text-black mb-8 flex items-center gap-2 px-4">
                    <span>🛡️</span> Status Prawny (2025/2026)
                  </h3>

                  <div className="grid gap-4 px-4">
                    <div className="border-2 border-black bg-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <div>
                          <span className="block font-display text-black font-bold uppercase">Śledztwo w sprawie organizacji ceremonii</span>
                          <span className="block text-xs text-black/60 mt-1 font-mono">Prokuratura Okręgowa w Częstochowie</span>
                        </div>
                        <span className="font-mono text-sm font-black bg-black text-white px-4 py-2 border border-black uppercase tracking-widest">
                          3013-1.Ds.15.2024
                        </span>
                    </div>

                    <div className="border-2 border-black bg-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <div>
                          <span className="block font-display text-black font-bold uppercase">Śledztwo w sprawie śmierci Ilony L.</span>
                          <span className="block text-xs text-black/60 mt-1 font-mono">Prokuratura Okręgowa w Częstochowie</span>
                        </div>
                        <span className="font-mono text-sm font-black bg-[#e8d154] text-black border-2 border-black px-4 py-2 uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          3013-1.Ds.4.2026
                        </span>
                    </div>

                    <div className="border-2 border-black bg-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <div>
                          <span className="block font-display text-black font-bold uppercase">Śledztwo w sprawie śmierci Wiktora B.</span>
                          <span className="block text-xs text-black/60 mt-1 font-mono">Prokuratura Rejonowa w Pułtusku</span>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="font-mono text-sm font-black bg-black/5 text-black px-4 py-2 border-2 border-black uppercase tracking-widest">
                             4027-0. Ds. 1254.2024
                          </span>
                          <div className="flex items-center gap-2">
                             <span className="text-[10px] font-black text-red-800 uppercase tracking-widest bg-red-100 px-2 py-1 border border-red-800 font-sans">Zawieszone</span>
                          </div>
                        </div>
                    </div>
                  </div>

                  <div className="mt-8 px-4 text-xs text-black/70 font-mono text-center italic">
                    Postępowania toczą się w wymienionych jednostkach Prokuratury. Nadzór nad sprawami w Częstochowie objął Zastępca Prokuratora Okręgowego, a kluczowe czynności nadzoruje prokurator Jolanta Świdnicka.
                  </div>
              </div>

            </div>

            <footer className="mt-8 pt-0 font-mono relative z-10 mb-0">

               <div className="mb-10 text-center">
                 <h3 className="text-3xl font-black text-black uppercase tracking-tighter font-display mb-4">
                   Dokumenty Źródłowe
                 </h3>
                 <p className="text-sm text-black/80 italic max-w-xl mx-auto font-serif">
                   Artykuł powstał na podstawie jawnej dokumentacji urzędowej i sądowej. Poniżej pełna lista sygnatur oraz odnośniki umożliwiające samodzielną weryfikację.
                 </p>
               </div>

               <div className="grid gap-6 text-sm text-black">

                 <div className="p-4 bg-white/40 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#e8d154]/10 transition-colors">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3 font-sans">
                      <div>
                        <h4 className="font-bold text-black text-base uppercase font-display tracking-widest">Wyrok Jarosława Kordysa</h4>
                        <p className="font-mono text-xs text-black/60 mt-1 font-black">Sygn. 30 T 5/2020</p>
                      </div>
                      <a href={KORDYS_PDF_URL} target="_blank" rel="noopener noreferrer" className="shrink-0 w-full sm:w-48 justify-center bg-black text-white px-4 py-2 text-xs font-bold border-2 border-black hover:bg-white hover:text-black transition-colors flex items-center gap-2 uppercase tracking-widest text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        📄 Pobierz PDF
                      </a>
                    </div>
                    <div className="border-t-2 border-black/20 pt-3">
                      <a href="https://msp.gov.cz/web/krajsky-soud-v-ostrave/zakladni-informace/-/clanek/informace-rok-2022" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-black/70 hover:text-black flex items-center gap-2 uppercase tracking-widest underline decoration-2 underline-offset-4 font-sans">
                        🌐 Weryfikuj na msp.gov.cz
                      </a>
                    </div>
                 </div>

                 <div className="p-4 bg-white/40 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#e8d154]/10 transition-colors">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3 font-sans">
                      <div>
                        <h4 className="font-bold text-black text-base uppercase font-display tracking-widest">Wyrok Bartosza Badowskiego</h4>
                        <p className="font-mono text-xs text-black/60 mt-1 font-black">Sygn. 66 T 146/2021</p>
                      </div>
                      <a href={BADI_PDF_URL} target="_blank" rel="noopener noreferrer" className="shrink-0 w-full sm:w-48 justify-center bg-black text-white px-4 py-2 text-xs font-bold border-2 border-black hover:bg-white hover:text-black transition-colors flex items-center gap-2 uppercase tracking-widest text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        📄 Pobierz PDF
                      </a>
                    </div>
                    <div className="border-t-2 border-black/20 pt-3">
                      <a href="https://msp.gov.cz/documents/22409/2997339/29Si+25-2022+p%C5%99%C3%ADloha+%C4%8D.+1.pdf" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-black/70 hover:text-black flex items-center gap-2 uppercase tracking-widest underline decoration-2 underline-offset-4 font-sans">
                        🌐 Weryfikuj oryginał (29 Si 25/2022)
                      </a>
                    </div>
                 </div>

                 <div className="p-4 bg-white/40 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#e8d154]/10 transition-colors">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3 font-sans">
                      <div>
                        <h4 className="font-bold text-black text-base uppercase font-display tracking-widest">Transakcja: Darowizna (Janów)</h4>
                        <p className="font-mono text-xs text-black/60 mt-1 font-black">Sygnatura: V-5821/2023 | Koszt: 300 CZK</p>
                      </div>
                      <a href={JANOV_PDF_URL} target="_blank" rel="noopener noreferrer" className="shrink-0 w-full sm:w-48 justify-center bg-black text-white px-4 py-2 text-xs font-bold border-2 border-black hover:bg-white hover:text-black transition-colors flex items-center gap-2 uppercase tracking-widest text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        📥 Pobierz PDF
                      </a>
                    </div>
                    <div className="border-t-2 border-black/20 pt-3">
                      <a href="https://nahlizenidokn.cuzk.cz" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-black/70 hover:text-black flex items-center gap-2 uppercase tracking-widest underline decoration-2 underline-offset-4 font-sans">
                        🌐 Weryfikuj na nahlizenidokn.cuzk.cz
                      </a>
                    </div>
                 </div>

                 <div className="p-4 bg-white/40 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#e8d154]/10 transition-colors">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3 font-sans">
                      <div>
                        <h4 className="font-bold text-black text-base uppercase font-display tracking-widest">Transakcja: Sprzedaż (Nýdek)</h4>
                        <p className="font-mono text-xs text-black/60 mt-1 font-black">Sygnatura: V-2937/2021 | Koszt: 300 CZK</p>
                      </div>
                      <a href={NYDEK_PDF_URL} target="_blank" rel="noopener noreferrer" className="shrink-0 w-full sm:w-48 justify-center bg-black text-white px-4 py-2 text-xs font-bold border-2 border-black hover:bg-white hover:text-black transition-colors flex items-center gap-2 uppercase tracking-widest text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        📥 Pobierz PDF
                      </a>
                    </div>
                    <div className="border-t-2 border-black/20 pt-3">
                      <a href="https://nahlizenidokn.cuzk.cz" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-black/70 hover:text-black flex items-center gap-2 uppercase tracking-widest underline decoration-2 underline-offset-4 font-sans">
                        🌐 Weryfikuj na nahlizenidokn.cuzk.cz
                      </a>
                    </div>
                 </div>

                 <div className="p-4 bg-white/40 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#e8d154]/10 transition-colors">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3 font-sans">
                      <div>
                        <h4 className="font-bold text-black text-base uppercase font-display tracking-widest">Archiwum: Nýdek & Munay</h4>
                        <p className="font-mono text-xs text-black/60 mt-1 font-black">Wayback Machine</p>
                      </div>
                      <a href={MUNAY_WAYBACK_URL} target="_blank" rel="noopener noreferrer" className="shrink-0 w-full sm:w-48 justify-center bg-[#e8d154] text-black px-4 py-2 text-xs font-black border-2 border-black hover:bg-white transition-colors flex items-center gap-2 uppercase tracking-widest text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-sans">
                        🕰️ Otwórz Archiwum
                      </a>
                    </div>
                 </div>

               </div>

               <div className="mt-4 text-center pb-8">
                  <a href="https://www.nasza-gazetka.pl" target="_blank" rel="noopener noreferrer" className="inline-block font-display text-2xl font-black text-black hover:bg-[#e8d154] transition-colors underline decoration-4 underline-offset-8 mt-4 px-2">
                    WWW.NASZA-GAZETKA.PL
                  </a>
               </div>
            </footer>
          </article>
        </div>
      </main>
    </>
  );
}
