import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-4xl w-full">
        <h1 className="font-masthead text-[#e8d154] text-6xl md:text-8xl mb-4 tracking-tight">
          NASZA GAZETKA
        </h1>
        <p className="font-serif text-white/60 text-lg md:text-xl mb-16 uppercase tracking-[0.2em]">
          Dziennikarstwo Śledcze • Investigative Journalism
        </p>

        <div className="flex flex-col space-y-8 md:space-y-12">
          <Link
            href="/pl/"
            className="group flex flex-col items-center"
          >
            <span className="font-serif text-white text-3xl md:text-5xl group-hover:text-[#e8d154] transition-colors duration-300">
              WEJŚCIE (PL)
            </span>
            <div className="h-px w-24 bg-[#e8d154]/20 group-hover:w-48 transition-all duration-500 mt-2" />
          </Link>

          <Link
            href="/en/"
            className="group flex flex-col items-center"
          >
            <span className="font-serif text-white text-3xl md:text-5xl group-hover:text-[#e8d154] transition-colors duration-300">
              ENTER (EN)
            </span>
            <div className="h-px w-24 bg-[#e8d154]/20 group-hover:w-48 transition-all duration-500 mt-2" />
          </Link>

          <Link
            href="/es/"
            className="group flex flex-col items-center"
          >
            <span className="font-serif text-white text-3xl md:text-5xl group-hover:text-[#e8d154] transition-colors duration-300">
              ENTRAR (ES)
            </span>
            <div className="h-px w-24 bg-[#e8d154]/20 group-hover:w-48 transition-all duration-500 mt-2" />
          </Link>
        </div>

        <footer className="mt-24 font-serif text-white/30 text-sm uppercase tracking-widest">
          © 2024 Marlow Investigative Media
        </footer>
      </div>
    </main>
  );
}
