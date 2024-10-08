"use client";
import { PlateEditor } from "@/components/shared/plate-editor/editor";
import { useEditorContext } from "@/stores/contexts/useEditorContext";

type Props = {
  value: string;
  onChange: (text: string) => void;
};

export default function Editor({ value, onChange }: Props) {
  const { editorAndFooterButtonsWrapperRef } = useEditorContext();

  const onEdite = (doc: any) => {
    // doc[0][0].children[0].text;
    if (doc && doc[0]) {
      onChange(doc[0][0].children[0].text);
    }
  };
  return (
    <div ref={editorAndFooterButtonsWrapperRef} className="editorWrapper">
      <PlateEditor
        isActiveEditor
        editorValue={value}
        onChangeEditorValue={onEdite}
      />
    </div>
  );
}
