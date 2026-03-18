import React from 'react';
import { getDictionary } from '@/app/(localized)/[lang]/dictionaries';

export const ProkuraturaArticle = async ({ lang }: { lang: 'pl' | 'en' | 'es' | 'de' | 'fr' }) => {
  const t = await getDictionary(lang);

  return (
    <article className="max-w-3xl mx-auto px-6 pt-4 pb-0 flex-grow w-full z-10 relative">
      <div
        className="prose prose-stone prose-lg max-w-none article-prose font-serif text-lg leading-relaxed"
        style={{ color: '#000000', opacity: 1, WebkitFontSmoothing: 'none' }}
      >
        <p className="mt-4">
          {t.prokuratura.articleAtrappa}
        </p>
      </div>
    </article>
  );
};
