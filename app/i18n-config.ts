export const locales = ['pl', 'en', 'es', 'de', 'fr', 'cs'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'pl';
