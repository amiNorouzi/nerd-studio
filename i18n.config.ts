export const i18n = {
  defaultLocale: "en",
  locales: [
    "en",
    // "fa",
    // "ru",
    // "fr",
    // "es",
    // "hi",
    // "ar",
    // "de",
    // "it",
    // "ja",
    // "ko",
    // "pt",
    // "ku",
    // "tr",
  ],
} as const;

export type Locale = (typeof i18n)["locales"][number];
