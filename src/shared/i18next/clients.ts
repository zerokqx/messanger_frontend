import i18next, { t } from 'i18next';
import ns1Ru from './locales/ru/ns1.json';
import { i18nextPlugin } from 'translation-check';
export const resources = {
  ru: {
    ns1: ns1Ru,
  },
} as const;

await i18next.use(i18nextPlugin).init({
  lng: 'ru',
  defaultNS: 'ns1',
  resources,
});
export default i18next;
