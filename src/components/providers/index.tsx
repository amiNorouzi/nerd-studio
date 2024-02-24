"use client";
import React, { useEffect } from "react";
import { ReactQueryProvider } from "./ReactQueryProvider";
import { DirectionProvider } from "@radix-ui/react-direction";

import { EditorContextProvider } from "@/stores/contexts/editor-context";

import { useChangeDirection } from "@/hooks";
import { dirInLocalStorage } from "@/stores/browser-storage";
export function Providers({ children }: { children: React.ReactNode }) {
  const { dirState } = useChangeDirection();
  useInitialSetDirToHtmlTag();

  return (
    <ReactQueryProvider>
      <EditorContextProvider>
        <DirectionProvider dir={dirState}>{children}</DirectionProvider>
      </EditorContextProvider>
    </ReactQueryProvider>
  );
}

function useInitialSetDirToHtmlTag() {
  useEffect(() => {
    document.documentElement.dir = dirInLocalStorage.get().dir ?? "ltr";
  }, []);
}
