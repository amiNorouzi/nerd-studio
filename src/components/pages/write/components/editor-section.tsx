"use client";
import { PlateEditor } from "@/components/shared/plate-editor/editor";
import { useEditorContext } from "@/stores/contexts/useEditorContext";

export function EditorSection() {
  const { editorAndFooterButtonsWrapperRef } = useEditorContext();

  return (
    <div
      className=" col-span-12 h-fit overflow-hidden  bg-card  lg:col-span-6 lg:h-full xl:col-span-9"
      ref={editorAndFooterButtonsWrapperRef}
    >
      <PlateEditor
        isActiveEditor
        editorValue=""
        onChangeEditorValue={v => console.log(v)}
      />
    </div>
  );
}
