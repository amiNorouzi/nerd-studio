"use client";
import { PlateEditor } from "@/components/shared/plate-editor/editor";
import { useEditorContext } from "@/stores/contexts/useEditorContext";

export function Editor() {
  const { editorAndFooterButtonsWrapperRef } = useEditorContext();

  return (
    <div ref={editorAndFooterButtonsWrapperRef} className="editorWrapper">
      <PlateEditor
        isActiveEditor
        editorValue=""
        onChangeEditorValue={v => console.log(v)}
      />
    </div>
  );
}
