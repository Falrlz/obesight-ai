import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationID from './locales/id.json';
import translationEN from './locales/en.json';

const resources = {
  id: {
    translation: translationID,
  },
  en: {
    translation: translationEN,
  },
};

// Retrieve language from localStorage, default to 'id' (Indonesian)
const savedLanguage = localStorage.getItem('language') || 'id';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'id',
    interpolation: {
      escapeValue: false, // React already safeguards against XSS
    },
  });

export default i18n;
