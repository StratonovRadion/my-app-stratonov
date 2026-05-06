"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslation, UseTranslationOptions } from "react-i18next";
import type { FlatNamespace, KeyPrefix } from "i18next";
import type { FallbackNs } from "react-i18next";
import i18next from "./client";

export function useT(
  ns?: string,
  options: UseTranslationOptions<
    KeyPrefix<FallbackNs<FlatNamespace>>
  > = {}
) {
  const params = useParams();
  const lang = params?.lang;

  if (typeof lang !== "string") {
    throw new Error("useT is only available inside [lang] route segment");
  }

  if (typeof window === "undefined") {
    // SSR path — synchronously change language (no hooks allowed here)
    if (i18next.resolvedLanguage !== lang) {
      i18next.changeLanguage(lang);
    }
  } else {
    // Client path — use hooks to keep language in sync
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeLng, setActiveLng] = useState(i18next.resolvedLanguage);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (activeLng === i18next.resolvedLanguage) return;
      setActiveLng(i18next.resolvedLanguage);
    }, [activeLng]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!lang || i18next.resolvedLanguage === lang) return;
      i18next.changeLanguage(lang);
    }, [lang]);
  }

  return useTranslation(ns, options);
}
