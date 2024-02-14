import BrowserStorage from "./storage";
import type { DirType } from "./types";

export const dirInLocalStorage = new BrowserStorage<DirType>(
  "dir",
  "localStorage",
);
