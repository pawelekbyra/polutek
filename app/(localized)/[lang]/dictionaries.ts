import 'server-only'

import { Locale } from '@/app/i18n-config';

const dictionaries: Record<Locale, () => Promise<any>> = {
  pl: () => import('../../../dictionaries/pl.json').then((module) => module.default),
  en: () => import('../../../dictionaries/en.json').then((module) => module.default),
  es: () => import('../../../dictionaries/es.json').then((module) => module.default),
  de: () => import('../../../dictionaries/de.json').then((module) => module.default),
  fr: () => import('../../../dictionaries/fr.json').then((module) => module.default),
  cs: () => import('../../../dictionaries/cs.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]()
}
