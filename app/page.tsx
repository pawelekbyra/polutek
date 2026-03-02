"use client";

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
  description: "Pełna dokumentacja policyjnej interwencji i aresztowania grupy organizującej nielegalne ceremonie ayahuaski.",
  thumbnailUrl: `${JANOV_IMAGES_URL}/janov1.jpg`,
  contentUrl: `${PINATA_GATEWAY}/${ARREST_VIDEO_CID}/videoplayback.m3u8`,
  uploadDate: "2020-10-15T09:00:00+01:00",
};

const VIDEO_STEFANEK_METADATA = {
  name: "Wyznania Krzysztofa Stefanka o przejęciu Janówa",
  description: "Relacja z pierwszej ręki dotycząca darowizny nieruchomości w Janowie.",
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
const GALLERY_JANOV = Array.from({ length: 26 }, (_, i) => i === 6 || i === 21 ? null : `${JANOV_IMAGES_URL}/janov${i+1}.jpg`).filter(Boolean) as string[];

const EvidenceGrid = () => {
  return (
    <div className="my-16" id="galeria">
      <h3 className="text-2xl font-bold text-slate-900 uppercase tracking-[0.2em] mb-8 border-b-2 border-indigo-900 pb-3 flex items-center gap-3">
        <span className="text-indigo-600">⚖️</span> Galeria Dowodów
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="group relative bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden flex flex-col">
          <div className="aspect-[3/4] overflow-hidden bg-slate-50">
            <img src="/wezwanie_kicinski.png" alt="Wezwanie" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="p-5">
            <h4 className="font-bold text-slate-900 text-sm mb-1 uppercase tracking-tight">Wezwanie dla M. Kicińskiego</h4>
            <p className="text-[10px] text-indigo-600 font-bold font-mono tracking-wider">Sygn. WD-I-3186/23</p>
            <a href="/wezwanie_kicinski.png" target="_blank" className="text-[11px] font-bold text-white bg-slate-900 px-3 py-1 mt-4 inline-block rounded-full hover:bg-indigo-700 transition-colors">POKAŻ DOWÓD</a>
          </div>
        </div>

        <div className="group relative bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden flex flex-col">
          <div className="aspect-[3/4] overflow-hidden bg-slate-50">
            <img src="/gallery/wyrok_kordysa/30T_5_2021-1_page-0001.jpg" alt="Wyrok Kordys" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="p-5">
            <h4 className="font-bold text-slate-900 text-sm mb-1 uppercase tracking-tight">Uzasadnienie Wyroku: J. Kordys</h4>
            <p className="text-[10px] text-indigo-600 font-bold font-mono tracking-wider">Sygn. 30 T 5/2021</p>
            <details className="mt-3">
              <summary className="text-[10px] font-bold text-slate-500 hover:text-indigo-600 cursor-pointer transition-colors uppercase">POKAŻ STRONY (25)</summary>
              <div className="grid grid-cols-2 gap-2 mt-3 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                {GALLERY_WYROK_KORDYS.map((img, i) => (
                  <a key={i} href={img} target="_blank" className="text-[9px] text-slate-600 hover:text-indigo-600 border border-slate-100 p-1 rounded bg-slate-50 text-center transition-colors">Strona {i+1}</a>
                ))}
              </div>
            </details>
          </div>
        </div>

        <div className="group relative bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden flex flex-col">
          <div className="aspect-[3/4] overflow-hidden bg-slate-50">
            <img src="/gallery/janov/janov1.jpg" alt="Dokumentacja Janów" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="p-5">
            <h4 className="font-bold text-slate-900 text-sm mb-1 uppercase tracking-tight">Dokumentacja: Janów</h4>
            <p className="text-[10px] text-indigo-600 font-bold font-mono tracking-wider">KW LV 127</p>
            <details className="mt-3">
              <summary className="text-[10px] font-bold text-slate-500 hover:text-indigo-600 cursor-pointer transition-colors uppercase">POKAŻ GALERIĘ</summary>
              <div className="grid grid-cols-2 gap-2 mt-3 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                {GALLERY_JANOV.map((img, i) => (
                  <a key={i} href={img} target="_blank" className="text-[9px] text-slate-600 hover:text-indigo-600 border border-slate-100 p-1 rounded bg-slate-50 text-center transition-colors">Zdjęcie {i+1}</a>
                ))}
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- UI COMPONENTS ---

const BrandHeader = () => (
    <div className="w-full pb-8 mb-8 flex flex-col items-center">
      <div className="flex items-center justify-center w-full py-6">
        <h1 className="text-5xl md:text-[7rem] font-black tracking-tighter text-slate-900 uppercase leading-none text-center">
          NASZA <span className="text-indigo-700">GAZETKA</span>
        </h1>
      </div>
      <div className="w-full border-y-[1px] border-slate-300 py-3 flex items-center justify-between px-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-slate-600">
        <div className="flex items-center gap-3"><span className="text-indigo-600">●</span><span>Niezależne Media Śledcze</span></div>
        <div className="text-center font-serif italic text-slate-500 lowercase first-letter:uppercase">Poniedziałek, 2 marca 2026</div>
        <div className="flex items-center gap-3"><span className="hidden md:inline border-r border-slate-300 pr-3 mr-1">Wydanie Specjalne</span><span className="text-indigo-600">Nr 01</span></div>
      </div>
    </div>
);

const CaseFile = ({ title, children, icon = '📄' }: { title: string, children: React.ReactNode, icon?: string }) => (
  <div className="my-10 bg-white/80 backdrop-blur-sm border-l-4 border-indigo-600 shadow-lg rounded-r-xl overflow-hidden text-left transition-transform hover:-translate-y-1">
    <div className="bg-slate-900 px-6 py-2 flex items-center justify-between text-[10px] font-bold text-indigo-200 uppercase tracking-[0.15em]">
      <div className="flex items-center gap-2"><span>{icon}</span><span>{title}</span></div>
      <span className="opacity-50">DOK_REF:2026</span>
    </div>
    <div className="p-8 font-sans text-base leading-relaxed text-slate-800">{children}</div>
  </div>
);

const PullQuote = ({ quote, author, source }: { quote: string, author: string, source: string }) => (
  <div className="my-14 relative px-10 text-center">
    <span className="absolute top-0 left-0 text-6xl text-indigo-100 font-serif leading-none italic select-none">„</span>
    <p className="font-serif text-2xl md:text-3xl italic text-slate-900 leading-snug mb-6 relative z-10">{quote}</p>
    <div className="font-sans text-[10px] uppercase tracking-[0.3em] text-indigo-600 font-black">
      — {author} <span className="text-slate-400 mx-2">/</span> <span className="text-slate-500 font-normal italic">{source}</span>
    </div>
  </div>
);

const LocationStampUI = ({ name, plot, lv }: { name: string, plot: string, lv: string }) => (
  <div className="inline-flex border border-slate-200 bg-white p-4 rounded-2xl items-center gap-5 shadow-sm hover:shadow-md transition-shadow group">
      <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">📍</div>
      <div className="text-left pr-4">
        <div className="text-[10px] uppercase tracking-widest text-indigo-600 font-black mb-0.5">{name}</div>
        <div className="font-mono text-lg font-bold text-slate-900 tracking-tighter">LV {lv}</div>
        <div className="text-[10px] text-slate-400 font-mono italic">Działka: {plot}</div>
      </div>
  </div>
);

const ArticleVideoPlayer: React.FC<{ src: string; poster: string }> = ({ src, poster }) => (
    <div className="my-12 w-full bg-slate-950 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/10">
      <video controls poster={poster} className="w-full aspect-video block opacity-90 hover:opacity-100 transition-opacity">
        <source src={src} type="application/x-mpegURL" />
      </video>
    </div>
);

// --- MAIN PAGE ---

export default function Page() {
  return (
    <main className="min-h-screen bg-[#e4dbbe] text-slate-900 selection:bg-indigo-600 selection:text-white font-serif flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-5xl bg-[#fcfaf2] min-h-screen shadow-[0_0_50px_rgba(0,0,0,0.1)] border border-slate-200 flex flex-col relative overflow-hidden rounded-sm">
        <div className="h-1.5 w-full bg-indigo-700"></div>

        <div className="w-full px-8 md:px-16 flex flex-col items-center">
          <BrandHeader />
        </div>

        <article className="max-w-4xl mx-auto px-8 md:px-20 pb-20 w-full z-10 relative">
          <div className="text-center mb-16">
            <img src="/zdjeciehej.png" alt="Logo" className="h-24 md:h-32 mx-auto object-contain opacity-80 mix-blend-multiply mb-6" />
            <h2 className="mb-4">
              <span className="block text-5xl md:text-8xl font-black text-slate-900 leading-none tracking-tighter uppercase mb-4">
                ELIKSIR <span className="text-indigo-800">WIEDŹMINA</span>
              </span>
              <span className="inline-block px-4 py-1 bg-indigo-900 text-white text-xs md:text-base font-bold uppercase tracking-[0.4em] rounded-full">
                Mroczna tajemnica twórców CD Projekt
              </span>
            </h2>
          </div>

          <div className="prose prose-slate prose-lg max-w-none prose-strong:text-indigo-900 prose-strong:font-black prose-a:text-indigo-700 prose-a:no-underline prose-a:border-b-2 prose-a:border-indigo-100 hover:prose-a:bg-indigo-50 transition-colors">

            <p className="first-letter:text-8xl first-letter:font-black first-letter:mr-4 first-letter:float-left first-letter:text-indigo-700 first-letter:leading-none">
              W 2020 roku media obiegły doniesienia o rozbiciu grupy polskich szamanów w czeskich <strong>Hermanovicach</strong>. Surowe wyroki – 8,5 oraz 5,5 roku więzienia za prowadzenie nielegalnego biznesu.
            </p>

            <h2 className="text-3xl text-slate-900 border-l-8 border-indigo-700 pl-6 my-12">Świadek B.</h2>
            <p>Współwłaścicielem bazy okazał się znany miliarder. Analiza Katastru Nieruchomości nie pozostawia złudzeń.</p>
            
            <div className="my-10"><LocationStampUI name="JANOV U KRNOVA" plot="st. 281" lv="127" /></div>

            <CaseFile title="Akta Sądowe: Janów" icon="⚖️">
              „W odniesieniu do nieruchomości będących współwłasnością <strong>Bartosza B.</strong> i <strong>Michała D. K.</strong>...” – Wspólnikiem szamana był Michał Kiciński.
            </CaseFile>

            <PullQuote quote="Po ayahuasce jest szansa na to, żeby sobie nie ściemniać." author="Michał Kiciński" source="Newsweek, 2016" />

            <div className="my-12"><ArticleVideoPlayer src={VIDEO_ARREST_METADATA.contentUrl} poster="" /></div>

            <EvidenceGrid />

            <footer className="mt-20 pt-10 border-t border-slate-200">
                <div className="text-left mb-10">
                  <h4 className="text-slate-400 uppercase tracking-[0.3em] text-[10px] font-black mb-2">Redaktor Prowadzący</h4>
                  <div className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Detektyw Polutek</div>
                </div>
                <div className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col justify-center items-center text-center">
                    <a href="https://www.eliksir-wiedzmina.pl" className="text-lg font-black text-slate-900 hover:text-indigo-700 transition-colors tracking-tight">WWW.ELIKSIR-WIEDZMINA.PL</a>
                </div>
            </footer>
          </div>
        </article>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #6366f1; }
      `}</style>
    </main>
  );
}
