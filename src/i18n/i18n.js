import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import esTranslation from './locales/es/translation.json';
import enTranslation from './locales/en/translation.json';

/**
 * i18n.js - Configuración de internacionalización (i18next)
 *
 * Este archivo configura i18next para manejar múltiples idiomas.
 * Los strings de traducción se cargan desde archivos JSON en locales/
 * (no están hardcoded aquí para evitar duplicación)
 *
 * Uso:
 * - Los texto se actualizan en: src/i18n/locales/[idioma]/translation.json
 * - Este archivo solo contiene la configuración de i18next
 */

const resources = {
  es: {
    translation: esTranslation,
  },
  en: {
    translation: enTranslation,
  },
};

// Configuración de i18next
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('preferredLanguage') || 'es',
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 