import en from './locales/en.json';
import uk from './locales/uk.json';
import ru from './locales/ru.json';
import hu from './locales/hu.json';
import { url } from './url';

export const locales = ['en', 'uk', 'ru', 'hu'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  uk: 'Українська',
  ru: 'Русский',
  hu: 'Magyar',
};

const content = { en, uk, ru, hu } as const;

export function getTranslations(locale: Locale) {
  return content[locale];
}
export function localePath(locale: Locale) {
  return locale === 'en' ? url('/') : url(`/${locale}/`);
}
