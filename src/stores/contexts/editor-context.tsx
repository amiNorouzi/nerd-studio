"use client";
import { useRef } from "react";
import { PlateEditor } from "@udecode/plate-common";
import { EditorContext } from "./useEditorContext";

import type { ChildrenProps } from "@/services/types";

/**
 * we have two context
 * one for data and one for setter
 * this is because optimization
 *
 *
 * @param children all children in this provider receive editor information
 * like editor value or editorRef or editorTextareaRef
 * @returns children that wrapped in provider
 */
export function EditorContextProvider({ children }: ChildrenProps) {
  const editorRef = useRef<PlateEditor | null>(null);
  const editorValueUpdate = useRef(false);
  const textareaEditorDivRef = useRef<HTMLDivElement>(null);
  const editorAndFooterButtonsWrapperRef = useRef<HTMLDivElement>(null);
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
