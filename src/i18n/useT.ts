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
  const lang = useParams().lang;
  if (typeof lang !== "string") {
    throw new Error("useT is only available inside [lang]");
  }
  if (
    typeof window === "undefined" &&
    i18next.resolvedLanguage !== lang
  ) {
    i18next.changeLanguage(lang);
  } else {
    const [activeLng, setActiveLng] = useState(i18next.resolvedLanguage);
    useEffect(() => {
      if (activeLng === i18next.resolvedLanguage) return;
      setActiveLng(i18next.resolvedLanguage);
    }, [activeLng]);
    useEffect(() => {
      if (!lang || i18next.resolvedLanguage === lang) return;
      i18next.changeLanguage(lang);
    }, [lang]);
  }
  return useTranslation(ns, options);
}
