import i18next from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { FALLBACK_LANG, LANGUAGES, DEFAULT_NS } from "./constants";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../locales/${language}/${namespace}.json`)
    )
  )
  .init({
    supportedLngs: LANGUAGES,
    fallbackLng: FALLBACK_LANG,
    lng: undefined,
    fallbackNS: DEFAULT_NS,
    defaultNS: DEFAULT_NS,
    contextSeparator: ".",
    returnObjects: true,
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
    },
    preload: typeof window === "undefined" ? [...LANGUAGES] : [],
  });

export default i18next;
