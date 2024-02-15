import BrowserStorage from "./storage";
import type { DirType, IThemeConfig } from "./types";

export const dirInLocalStorage = new BrowserStorage<DirType>(
  "dir",
  "localStorage",
);
export const themeConfigStorage = new BrowserStorage<IThemeConfig>(
  "themeConfig",
  "localStorage",
);
