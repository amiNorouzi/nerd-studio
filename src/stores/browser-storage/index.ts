import BrowserStorage from "./storage";
import type { DirType, IThemeConfig } from "./types";

export const dirInLocalStorage = new BrowserStorage<DirType>(
  "dir",
  "localStorage",
);

// used for keep the theme config in local storage to set in website first load
export const themeConfigStorage = new BrowserStorage<IThemeConfig>(
  "themeConfig",
  "localStorage",
);
