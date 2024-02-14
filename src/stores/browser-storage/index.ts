import BrowserStorage from "@/stores/browser-storage/storage";

import type { IThemeConfig } from "./types";

export const themeConfigStorage = new BrowserStorage<IThemeConfig>(
  "themeConfig",
  "localStorage",
);
