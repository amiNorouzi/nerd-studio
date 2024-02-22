import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { createSelectors } from "@/stores/zustand/createSelectors";

import type { EditorActions, EditorState } from "./types";

const initialState: EditorState = {
  isEditorChange: false,
  editorValue: null,
  editorTextContent: "",
};
const useEditor = create<EditorState & EditorActions>()(
  devtools(
    immer(set => ({
      ...initialState,
      setEditorChange: () =>
        set(state => {
          state.isEditorChange = !state.isEditorChange;
        }),
      setEditorValue: (v, textContent) =>
        set(state => {
          state.editorValue = v;
          state.editorTextContent = textContent;
        }),
    })),
    { name: "editor state" },
  ),
);

export const useEditorStore = createSelectors(useEditor);
