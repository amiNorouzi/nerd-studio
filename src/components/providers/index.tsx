"use client";
import React, { useEffect } from "react";
import { DirectionProvider } from "@radix-ui/react-direction";
import { AppProgressBar } from "next-nprogress-bar";
import { EditorContextProvider } from "@/stores/contexts/editor-context";

import { useChangeDirection } from "@/hooks";
import { dirInLocalStorage } from "@/stores/browser-storage";
import { ReactQueryProvider } from "./ReactQueryProvider";
import { NextAuthProvider } from "@/components/providers/NextAuthProvider";
import { Toaster } from "@/components/ui/toaster";

/**
 * all providers of app
 * used in main layout
 * @param children
 * @constructor
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const { dirState } = useChangeDirection();
  useInitialSetDirToHtmlTag();

  return (
    <NextAuthProvider>
      <ReactQueryProvider>
        <EditorContextProvider>
          <DirectionProvider dir={dirState}>{children}</DirectionProvider>
          <AppProgressBar
            height="4px"
            color="hsl(256, 78%, 69%)"
            options={{ showSpinner: false }}
            shallowRouting
          />
          <Toaster />
        </EditorContextProvider>
      </ReactQueryProvider>
    </NextAuthProvider>
  );
}

function useInitialSetDirToHtmlTag() {
  useEffect(() => {
    document.documentElement.dir = dirInLocalStorage.get().dir ?? "ltr";
  }, []);
}
