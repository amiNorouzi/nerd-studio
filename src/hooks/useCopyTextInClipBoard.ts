"use client";
import { copyTextToClipboard } from "@/lib/copyTextToClipBoard";
import { useState } from "react";

export function useCopyTextInClipBoard() {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (text: string) => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(text)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return [handleCopy, isCopied] as const;
}
