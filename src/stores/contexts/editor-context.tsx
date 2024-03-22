"use client";
import { useRef } from "react";
import { PlateEditor } from "@udecode/plate-common";
import { EditorContext } from "./useEditorContext";

import type { ChildrenProps } from "@/services/types";

/**
 * @param children all children in this provider receive editor information
 * like editor value or editorRef or editorTextareaRef
 * @returns children that wrapped in provider
 */
export function EditorContextProvider({ children }: ChildrenProps) {
  const editorRef = useRef<PlateEditor | null>(null);
  // when editor value change toggle
  const editorValueUpdate = useRef(false);
  // for download and scroll
  const textareaEditorDivRef = useRef<HTMLDivElement>(null);
  // for portal to show dropdown ,... in full screen mode
  const editorAndFooterButtonsWrapperRef = useRef<HTMLDivElement>(null);
  // text box for words number ...
  const editorTextBoxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const value = {
    editorRef,
    editorValueUpdate,
    textareaEditorDivRef,
    editorAndFooterButtonsWrapperRef,
    editorTextBoxRef,
    contentRef,
  };

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
}
