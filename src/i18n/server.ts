import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { headers as _headers } from "next/headers";
import { FALLBACK_LANG, LANGUAGES, DEFAULT_NS, HEADER_NAME } from "./constants";


async function createServerI18n(language: string, ns: string | string[]) {
  const instance = createInstance();

  await instance
    .use(
      resourcesToBackend(
        (lang: string, namespace: string) =>
          import(`../locales/${lang}/${namespace}.json`)
      )
    )
    .init({
      supportedLngs: LANGUAGES,
      fallbackLng: FALLBACK_LANG,
      lng: language,
      fallbackNS: DEFAULT_NS,
      defaultNS: DEFAULT_NS,
      contextSeparator: ".",
      returnObjects: true,
      ns: Array.isArray(ns) ? ns : [ns],
    });

  return instance;
}

export async function getT(
  ns: string | string[] = DEFAULT_NS,
  lang?: string | null,
  keyPrefix?: string
) {
  const headersList = await _headers();
  const language = (lang || headersList.get(HEADER_NAME) || FALLBACK_LANG) as string;

  const instance = await createServerI18n(language, ns);

  return {
    t: instance.getFixedT(language, Array.isArray(ns) ? ns[0] : ns, keyPrefix),
    i18n: instance,
  };
}
