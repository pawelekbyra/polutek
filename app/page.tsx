import React from 'react';

// ==========================================
// --- KONFIGURACJA STYLU ŚLEDZCEGO ---
// Tekst: Czarny tusz (#000000)
// Zakreślenia: Jasne siku (#e8d154)
// Ramki: Czarny kontur (tusz)
// Tło: bg-paper-texture (przywrócone)
// ==========================================

const PINATA_GATEWAY = "https://yellow-elegant-porpoise-917.mypinata.cloud/ipfs";
const KORDYS_IMAGES_URL = "/gallery/wyrok_kordysa";
const JANOV_IMAGES_URL = "/gallery/janov";
const VIDEO_CID = "bafybeifkquvqp6cewygbgoqsm3vm6kni3d4wy6medzc7nbsczziswmmv7u";
const ARREST_VIDEO_CID = "bafybeickwaxlebikfa2aax7mwk7xnp56n6vqmnw7mafponnztlzinf73iy";

const KORDYS_PDF_URL = `${PINATA_GATEWAY}/bafybeibzxfsg5s4jkiuf2kzmbdtmfutfjk75ej5zrpt2igan4aldvqc3oq`;

const VIDEO_ARREST_METADATA = {
  contentUrl: `${PINATA_GATEWAY}/${ARREST_VIDEO_CID}/videoplayback.m3u8`,
};

const VIDEO_STEFANEK_METADATA = {
  contentUrl: `${PINATA_GATEWAY}/${VIDEO_CID}/YTDowncom_YouTube_Media_4Xujw-krjxs_001_1080p-1.m3u8`,
};

const CaseFile = ({ title, children, icon = '📄' }: { title: string, children: React.ReactNode, icon?: string }) => (
  <div className="my-8 border-2 border-black bg-white/40 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-sm overflow-hidden break-inside-avoid text-left">
    <div className="bg-black px-4 py-2 flex items-center gap-2 text-xs font-mono text-white uppercase tracking-wider">
      <span>{icon}</span>
      <span>{title}</span>
    </div>
    <div className="p-6 font-mono text-sm md:text-base leading-relaxed text-black italic">
      {children}
    </div>
  </div>
);

const PullQuote = ({ quote, author, source }: { quote: string, author: string, source: string }) => (
  <div className="my-10 pl-6 border-l-[6px] border-black text-left">
    <p className="font-display text-xl md:text-2xl italic text-black leading-relaxed mb-3">
      „{quote}"
    </p>
    <div className="font-sans text-[10px] uppercase tracking-widest text-black/70">
      — <span className="font-bold text-black">{author}</span>, {source}
    </div>
  </div>
);

const LocationStampUI = ({ name, plot, lv }: { name: string, plot: string, lv: string }) => (
  <div className="relative border-2 border-black bg-white p-1 pr-6 rounded-sm flex items-center gap-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-left">
      <div className="absolute top-1 right-1 text-black">🔍</div>
      <div className="bg-black/5 h-full p-3 flex items-center justify-center border-r-2 border-black border-dashed">
         <span className="text-xl">🏠</span>
      </div>
      <div className="py-2">
         <div className="text-[9px] uppercase tracking-[0.2em] text-black font-bold mb-1">{name}</div>
         <div className="font-mono text-base font-bold text-black uppercase">LV {lv}</div>
         <div className="text-[10px] text-black/60 font-mono mt-1 uppercase">Działka: {plot}</div>
      </div>
  </div>
);

const ArticleVideoPlayer: React.FC<{ src: string; poster?: string }> = ({ src, poster }) => (
  <div className="w-full bg-black aspect-video rounded-sm overflow-hidden flex items-center justify-center relative group border-2 border-black">
      <video controls poster={poster} className="w-full h-full object-cover" playsInline>
        <source src={src} type="application/x-mpegURL" />
      </video>
  </div>
);

const EvidenceGrid = () => (
  <div className="my-12">
    <h3 className="font-display font-bold text-lg uppercase tracking-widest text-black mb-8 flex items-center gap-2">
      <span>⚖️</span> Galeria Dowodów
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[
        { title: "Wezwanie Kiciński", sub: "Sygn. WD-I-3186/23", link: `${KORDYS_IMAGES_URL}/wezwanie/wezwanie_kicinski.png` },
        { title: "Wyrok Kordys", sub: "Sygn. 30 T 5/2021", label: "POKAŻ STRONY (25)" },
        { title: "Wyrok Badi", sub: "Sygn. 66 T 146/2021", label: "POKAŻ STRONY (3)" },
        { title: "Dokumentacja Janów", sub: "Janów KW LV 127", label: "POKAŻ GALERIĘ" }
      ].map((item, idx) => (
        <div key={idx} className="border-2 border-black p-4 bg-white/60 hover:bg-[#e8d154]/20 transition-colors">
          <div className="flex flex-col h-full">
            <h4 className="font-bold text-black text-sm leading-tight font-display mb-1">{item.title}</h4>
            <p className="text-xs text-black/60 mb-4">{item.sub}</p>
            <div className="mt-auto">
              <button className="w-full inline-flex justify-center bg-black text-white px-3 py-2 text-xs font-bold border border-black hover:bg-white hover:text-black transition-colors uppercase">
                {item.label || "POKAŻ DOWÓD"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function Page() {
  return (
    <main className="min-h-screen text-black selection:bg-[#e8d154]/50 font-body flex flex-col items-center">
      {/* Tutaj przywrócona klasa bg-paper-texture */}
      <div className="w-full max-w-4xl bg-paper-texture flex flex-col items-center pb-20 border-x-4 border-black overflow-hidden relative shadow-2xl">
        
        {/* BrandHeader */}
        <div className="w-full flex flex-col items-center pt-2 pb-1 bg-white/10">
          <div className="flex items-center justify-center w-[calc(100%-2rem)] mx-auto gap-4 pt-4 pb-1">
            <div className="flex-grow h-[3px] bg-black"></div>
            <h1 className="text-4xl md:text-[5rem] font-black tracking-tighter text-black uppercase font-unifraktur leading-none whitespace-nowrap px-2">
              NASZA GAZETKA
            </h1>
            <div className="flex-grow h-[3px] bg-black"></div>
          </div>
          <div className="w-[calc(100%-2rem)] mx-auto border-y-4 border-black py-2 flex items-center justify-between px-4 text-[10px] md:text-xs font-black uppercase tracking-[0.15em]">
            <span>📰 Niezależne Media</span>
            <div className="text-center font-display">NIEDZIELA, 1 MARCA 2026</div>
            <span>Serwis Śledczy Nr 01 📄</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="w-full text-center flex flex-col items-center pt-6 pb-4 px-6 box-border">
          <img
            src="/zdjeciehej.png"
            alt="Wiedźmini"
            className="h-24 md:h-[160px] object-contain grayscale contrast-[1.6] mix-blend-multiply mb-4" 
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
            <p className="text-sm md:text-lg text-black leading-snug italic font-bold px-4">
              Ayahuasca, policyjne naloty i tragedia, o której nie miał się nikt dowiedzieć. Publicznie dostępne akta i rejestry ujawniają, jak twórcy gry „Wiedźmin" finansowali szamańskie podziemie.
            </p>
          </div>
        </div>

        {/* Artykuł */}
        <article className="max-w-3xl mx-auto px-6 pt-4 pb-0 flex-grow w-full z-10 relative">
          <div className="article-prose text-black">
            <p className="drop-cap leading-relaxed mt-0">
              W 2020 roku media obiegły doniesienia o rozbiciu grupy polskich szamanów v czeskich <strong>Hermanovicach</strong>. Policyjny nalot, aresztowanie <strong>Jarosława i Karoliny Kordysów</strong>, a następnie surowe wyroki – 8,5 oraz 5,5 roku więzienia za prowadzenie nielegalnego biznesu.
            </p>

            <p>
              W przygranicznym Janowie funkcjonował drugi, bliźniaczy ayahuaskowy ośrodek, którego współwłaścicielem okazał się miliarder – <strong>Michał Kiciński</strong>.
            </p>

            <h2 className="section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-12">Świadek B.</h2>

            <CaseFile title="Zeznania świadka B." icon="🔍">
              &quot;Świadek B. odnośnie osoby oskarżonego [Jarosława Kordysa] oświadczył, że zna się z nim ok. 8 lat, a poznali się w Holandii&quot;.
            </CaseFile>

            <div className="my-8 flex justify-start">
              <LocationStampUI name="JANOV U KRNOVA" plot="st. 281" lv="127" />
            </div>

            <p>
              Pobrany dokument nie pozostawia wątpliwości: w latach 2012–2023 współwłaścicielami nieruchomości byli:
              <br />
              Bartosz Badowski (10%)
              <br />
              {/* Zakreślenie żółtym, ale tekst czarny */}
              <span className="bg-[#e8d154] text-black px-1 font-bold">Michał Dawid Kiciński (90%)</span>
            </p>

            <PullQuote 
              quote="Z ich rozmowy wynika, że nie zajmowali się v zasadzie samym faktem śmierci, lecz raczej obawą, aby to nie przyciągnęła uwagi policji."
              author="Akta Sądowe"
              source="Uzasadnienie Wyroku"
            />

            <h2 className="section-heading text-4xl font-black tracking-tighter text-black uppercase border-b-4 border-black mb-6 mt-12">Cena wolności</h2>

            <div className="my-12">
              <ArticleVideoPlayer src={VIDEO_ARREST_METADATA.contentUrl} />
            </div>

            <CaseFile title="Wiadomość prywatna od M. Kicińskiego" icon="✉️">
              <span className="bg-[#e8d154]/40 px-1 italic">
                &quot;(...) Tak mogę zapłacić za swój błąd z Badim. Podaj mi Fundacje lub Stowarzyszenie [...] i wpłacę tam dobrowolnie kwotę darowizny...&quot;
              </span>
            </CaseFile>

            <div className="my-12 border-y-4 border-black py-8">
              <h3 className="font-display font-bold text-lg uppercase tracking-widest text-black mb-8 flex items-center gap-2">
                <span>🛡️</span> Status Prawny (2025/2026)
              </h3>
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-2 border-black p-4 bg-white/50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <div>
                  <span className="block font-bold uppercase text-sm">Śledztwo: Organizacja Ceremonii</span>
                  <span className="block text-[10px] text-black/70">Prokuratura Rejonowa w Częstochowie</span>
                </div>
                <span className="font-mono text-sm font-black bg-black text-white px-4 py-1">3013-1.Ds.15.2024</span>
              </div>
            </div>

            <EvidenceGrid />

            <footer className="mt-12 pt-8 border-t-4 border-black mb-12">
              <div className="grid gap-4">
                <div className="border-2 border-black p-4 flex flex-col sm:flex-row justify-between items-center bg-white/40 gap-4">
                  <span className="font-bold uppercase text-sm font-display">Wyrok Jarosława Kordysa (Sygn. 30 T 5/2020)</span>
                  <a href={KORDYS_PDF_URL} target="_blank" className="w-full sm:w-auto bg-black text-white px-6 py-2 text-xs font-bold hover:bg-[#e8d154] hover:text-black transition-colors text-center uppercase tracking-tighter">
                    Otwórz PDF
                  </a>
                </div>
              </div>
              <div className="mt-12 text-center opacity-40 text-[10px] font-black uppercase tracking-[0.5em]">
                Raport Śledczy Polutka • 2026
              </div>
            </footer>
          </div>
        </article>
      </div>
    </main>
  );
}
