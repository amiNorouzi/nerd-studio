"use client";

import React, { createContext, useContext } from "react";
import { PlateEditor } from "@udecode/plate-common";

export type textareaEditorDivType = React.RefObject<HTMLDivElement>;
type editorRefType = React.MutableRefObject<PlateEditor | null>;
type editorValueUpdateType = React.MutableRefObject<boolean>;
type editorAndFooterButtonsWrapperRefType = React.RefObject<HTMLDivElement>;
type editorTextBoxType = React.MutableRefObject<HTMLElement | null>;
type contentRefType = React.MutableRefObject<HTMLDivElement | null>;
interface editorContextType {
  editorRef: editorRefType;
  editorValueUpdate: editorValueUpdateType;
  textareaEditorDivRef: textareaEditorDivType;
  editorAndFooterButtonsWrapperRef: editorAndFooterButtonsWrapperRefType;
  editorTextBoxRef: editorTextBoxType;
  contentRef: contentRefType;
}

export const EditorContext = createContext<editorContextType | null>(null);

export function useEditorContext() {
  const state = useContext(EditorContext);
  if (!state) {
    throw new Error("editor context is not valid");
  }
  return state;
}
