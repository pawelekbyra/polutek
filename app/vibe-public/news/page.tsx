import VibeNewsroom from '@/app/components/VibeNewsroom';
import SchemaMarkup from '@/app/components/SchemaMarkup';

export const metadata = {
  title: "Vibe Newsroom: Najnowsze wieści ze świata AI Coding | Polutek.pl",
  description: "Bądź na bieżąco z aktualizacjami w Cursorze, Claude, DeepSeek i nowych frameworkach agentycznych.",
};

export default function NewsPage() {
  return (
    <main className="bg-slate-50 min-h-screen">
      <SchemaMarkup
        type="Article"
        headline={metadata.title}
        description={metadata.description}
        author="Detektyw Polutek"
        datePublished="2025-02-27"
      />
      <section className="bg-slate-900 py-20 px-4 text-center text-white">
         <h1 className="text-4xl md:text-6xl font-black mb-4">Centrum Newsów</h1>
         <p className="text-slate-400 max-w-xl mx-auto">Codzienna dawka informacji o tym, jak AI redefiniuje pracę programisty.</p>
      </section>

      <VibeNewsroom />
    </main>
  );
}
