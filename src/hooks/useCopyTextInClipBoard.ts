"use client";

import { useState } from "react";
import { copyTextToClipboard } from "@/lib/copyTextToSystemClipboard";

export function useCopyTextInClipBoard(time: number = 1500) {
  const [isCopied, setIsCopied] = useState(false);
  const [copiedVal, setCopiedVal] = useState("");

  const handleCopy = (text: string) => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(text)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, time);
      })
      .catch(err => {
        console.log(err);
      });
    setCopiedVal(text);
  };

  return [handleCopy, isCopied, copiedVal] as const;
}
