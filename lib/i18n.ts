import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "@/public/locales/en/common.json";
import translationFR from "@/public/locales/fr/common.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: translationEN },
      fr: { common: translationFR },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "fr"],
    debug: process.env.NODE_ENV === "development",
    interpolation: {
      escapeValue: false,
    },
    ns: ["common"],
    defaultNS: "common",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
