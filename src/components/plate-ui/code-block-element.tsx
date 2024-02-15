"use client";

import "./code-block-element.css";

import React, { useRef } from "react";
import { cn, withRef } from "@udecode/cn";
import { useCodeBlockElementState } from "@udecode/plate-code-block";
import { PlateElement } from "@udecode/plate-common";

import { CodeBlockCombobox } from "./code-block-combobox";

import { CopyAndDownloadButtons } from "@/components/shared/plate-editor/components/copy-download-buttons";

import { useDownLoadHandler, useCopyTextInClipBoard } from "@/hooks";

export const CodeBlockElement = withRef<typeof PlateElement>(
  ({ className, children, ...props }, ref) => {
    const { element } = props;
    const state = useCodeBlockElementState({ element });
    const codeRef = useRef<HTMLPreElement>(null);
    const { handleDownloadPdf, handleDownloadDocx } =
      useDownLoadHandler(codeRef);
    const [handleCopy, isCopied] = useCopyTextInClipBoard();

    function handleCopyButton() {
      const codeEl = codeRef.current?.innerText;
      codeEl && handleCopy(codeEl);
    }

    return (
      <PlateElement
        ref={ref}
        className={cn(
          "relative grid space-y-1 py-1",
          state.className,
          className,
        )}
        {...props}
      >
        <CopyAndDownloadButtons>
          <CopyAndDownloadButtons.DownloadDropDown
            handleDownloadDocx={handleDownloadDocx}
            handleDownloadPdf={handleDownloadPdf}
          />
          <CopyAndDownloadButtons.CopyButton
            variant="ghost"
            isCopy={isCopied}
            onClick={handleCopyButton}
          />
        </CopyAndDownloadButtons>
        <pre
          ref={codeRef}
          className="overflow-x-auto rounded-md bg-muted px-6 py-8 font-mono text-sm leading-[normal] [tab-size:2]"
        >
          <code>{children}</code>
        </pre>

        {state.syntax && (
          <div
            className="absolute right-2 top-2 z-10 select-none"
            contentEditable={false}
          >
            <CodeBlockCombobox />
          </div>
        )}
      </PlateElement>
    );
  },
);
