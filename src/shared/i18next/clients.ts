import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { i18nextPlugin } from 'translation-check';
import { initReactI18next } from 'react-i18next';
await i18next
  .use(initReactI18next)
  .use(i18nextPlugin)
  .use(HttpBackend)
  .init({
    lng: 'ru',
    defaultNS: 'buttonLabels',
    debug: true,
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18next;
