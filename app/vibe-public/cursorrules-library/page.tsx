import SchemaMarkup from '@/app/components/SchemaMarkup';
import CursorRulesClient from '@/app/components/CursorRulesClient';

export const metadata = {
  title: "Biblioteka .cursorrules: Gotowe szablony dla Twojego stacku | Polutek.pl",
  description: "Zbiór najlepszych reguł .cursorrules dla Next.js, Python, React Native i Backend. Skopiuj i zoptymalizuj swoje AI w edytorze Cursor.",
  keywords: ".cursorrules library, cursor rules templates, nextjs cursorrules, python cursorrules, ai coding standards",
};

export default function CursorRulesLibrary() {
  return (
    <main className="bg-slate-50 min-h-screen py-20 px-4">
      <SchemaMarkup
        type="Article"
        headline={metadata.title}
        description={metadata.description}
        author="Detektyw Polutek"
        datePublished="2025-03-04"
      />
      <CursorRulesClient />
    </main>
  );
}
