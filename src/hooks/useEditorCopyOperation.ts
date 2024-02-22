import { useEditorContext } from "@/stores/contexts/useEditorContext";

export function useEditorCopyOperation() {
  const { editorTextBoxRef } = useEditorContext();
}
