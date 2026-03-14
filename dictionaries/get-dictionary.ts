import 'server-only';

const dictionaries: any = {
  pl: () => import('./pl.json').then((module) => module.default),
  en: () => import('./en.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  if (!dictionaries[locale]) {
    return dictionaries.pl();
  }
  return dictionaries[locale]();
};
