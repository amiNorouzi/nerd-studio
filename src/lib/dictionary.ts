// import "server-only";
import type { Locale } from "../../i18n.config";

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then(module => module.default),
  fa: () => import("@/dictionaries/fa.json").then(module => module.default),
  ru: () => import("@/dictionaries/ru.json").then(module => module.default),
  fr: () => import("@/dictionaries/fr.json").then(module => module.default),
  es: () => import("@/dictionaries/es.json").then(module => module.default),
  de: () => import("@/dictionaries/de.json").then(module => module.default),
  ar: () => import("@/dictionaries/ar.json").then(module => module.default),
  hi: () => import("@/dictionaries/hi.json").then(module => module.default),
  it: () => import("@/dictionaries/it.json").then(module => module.default),
  ja: () => import("@/dictionaries/ja.json").then(module => module.default),
  ko: () => import("@/dictionaries/ko.json").then(module => module.default),
  pt: () => import("@/dictionaries/pt.json").then(module => module.default),
  ku: () => import("@/dictionaries/ku.json").then(module => module.default),
  tr: () => import("@/dictionaries/tr.json").then(module => module.default),
};

export const langDir = {
  en: "ltr",
  fa: "rtl",
  ar: "rtl",
  ru: "ltr",
  fr: "ltr",
  es: "ltr",
  de: "ltr",
  hi: "ltr",
  it: "ltr",
  ja: "ltr",
  ko: "ltr",
  pt: "ltr",
  ku: "rtl",
  tr: "ltr",
} as const;
export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};
