
import { Locale } from '../../../i18n.config';
import en from './en.json';
import gu from './gu.json';
import hi from './hi.json';

const dictionaries = {
  en,
  hi,
  gu,
};

export const getDictionary = (locale: Locale) => dictionaries[locale];
