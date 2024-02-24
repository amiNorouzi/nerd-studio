import { useState } from "react";
import { dirInLocalStorage } from "@/stores/browser-storage";

export function useChangeDirection() {
  const [dirState, setDir] = useState(dirInLocalStorage.get().dir ?? "ltr");

  function changeDir(dir: "ltr" | "rtl") {
    document.documentElement.dir = dir;
    dirInLocalStorage.set({ dir });
    setDir(dir);
  }

  return { changeDir, dirState };
}
