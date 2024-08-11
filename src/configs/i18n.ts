import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  // Use the backend plugin to load translations
  .use(HttpApi)
  // Enable automatic language detection
  .use(LanguageDetector)


  // Enables the hook initialization module
  .use(initReactI18next)
  .init({
    lng: "en",
    fallbackLng: 'en',
    debug: true,  // Set to true to see debug information in the console
    keySeparator: false,
    interpolation: {
      escapeValue: false,
      formatSeparator: ','
    },
    backend: {
      loadPath: '/locales/{{lng}}.json',  // Path to your translation files
    },
    react: {
      useSuspense: false,
    }
  });

export default i18n;


export const languageOption = [
  {
    lang: "English",
    value: 'en'
  },
  {
    lang: "Tiếng Việt",
    value: "vi"
  },

]
