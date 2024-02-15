// import "server-only";
import type { Locale } from "../../i18n.config";

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then(module => module.default),
  fr: () => import("@/dictionaries/fr.json").then(module => module.default),
  de: () => import("@/dictionaries/de.json").then(module => module.default),
};

export const langDir = {
  en: "ltr",
  fr: "rtl",
  de: "ltr",
} as const;
export const getDictionary = async (locale: Locale) => dictionaries[locale]();
