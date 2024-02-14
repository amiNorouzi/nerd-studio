"use client";
import React, { useEffect } from "react";
import { ReactQueryProvider } from "./ReactQueryProvider";
import { DirectionProvider } from "@radix-ui/react-direction";
import { useChangeDir } from "@/hooks/useChangeDir";
import { dirInLocalStorage } from "@/stores/browser-storage";
export function Providers({ children }: { children: React.ReactNode }) {
  const { dirState } = useChangeDir();
  useInitialSetDirToHtmlTag();

  return (
    <ReactQueryProvider>
      <DirectionProvider dir={dirState}>{children}</DirectionProvider>
    </ReactQueryProvider>
  );
}

function useInitialSetDirToHtmlTag() {
  useEffect(() => {
    document.documentElement.dir = dirInLocalStorage.get().dir ?? "ltr";
  }, []);
}
