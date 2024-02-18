"use client";
import { PlateEditorResponse } from "@/components/shared/plate-editor/editor";
import { useEditorContext } from "@/stores/contexts/useEditorContext";

export function EditorSection() {
  const { editorAndFooterButtonsWrapperRef } = useEditorContext();

  return (
    <div
      className=" col-span-12 h-fit overflow-hidden rounded border bg-card shadow lg:col-span-6 lg:h-full xl:col-span-8"
      ref={editorAndFooterButtonsWrapperRef}
    >
      <PlateEditorResponse
        isActiveEditor
        editorValue=""
        onChangeEditorValue={v => console.log(v)}
      />
    </div>
  );
}
