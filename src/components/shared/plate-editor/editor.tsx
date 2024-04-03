"use client";
import { useCallback, useEffect, useMemo } from "react";

import { createPlateEditor, Plate } from "@udecode/plate-common";
import { CommentsProvider } from "@udecode/plate-comments";

import { MentionCombobox } from "@/components/plate-ui/mention-combobox";
import { CommentsPopover } from "@/components/plate-ui/comments-popover";
import { Editor } from "@/components/plate-ui/editor";
import { FixedToolbar } from "@/components/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@/components/plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "@/components/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@/components/plate-ui/floating-toolbar-buttons";
import { withMemo } from "../with-memo";

import { plugins } from "./plugins";

import { useScrollEnd } from "@/hooks";
import { useEditorStore } from "@/stores/zustand/editor-slice";
import { useEditorContext } from "@/stores/contexts/useEditorContext";
import { useDebounceValue } from "usehooks-ts";

import { deserializeHtmlStringOrMarkDown } from "./utils";
import { testJSON } from "@/lib/test-json";
import { TooltipProvider } from "@/components/plate-ui/tooltip";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
interface IProps {
  editorValue: string;
  onChangeEditorValue: (v: any) => void;
  isActiveEditor: boolean;
}
function PlateEditorResponse({
  editorValue,
  onChangeEditorValue,
  isActiveEditor,
}: IProps) {
  const { contentRef, editorTextBoxRef, editorRef, textareaEditorDivRef } =
    useEditorContext();
  const valueInState = useEditorStore.use.editorValue();
  const debounceValue = useDebounceValue(valueInState, 500);
  const setEditorChange = useEditorStore.use.setEditorChange();
  const setEditorValue = useEditorStore.use.setEditorValue();

  useEffect(() => {
    if (isActiveEditor) {
      // we set textbox where we write in editor to this ref to use for copy and counter button
      editorTextBoxRef.current = document.querySelector(`[role="textbox"]`);
    }
  }, [isActiveEditor, valueInState]);

  useEffect(() => {
    // if editor is active and debounceValue change then call onChangeEditorValue to call answer api
    isActiveEditor && onChangeEditorValue(debounceValue);
  }, [debounceValue, isActiveEditor]);

  // any time editorValue change initial value create and plate remount
  const initialValue = useMemo(() => {
    // check if editorValue is md or JSON(editor format)
    if (testJSON(editorValue)) {
      // if it was JSON ,parse and return i
      return JSON.parse(editorValue);
    }

    const tempEditor = createPlateEditor({ plugins });
    // if it was md, pass it this function to convert it to JSON and return it
    return deserializeHtmlStringOrMarkDown(editorValue, tempEditor);
  }, [editorValue]);

  // this hook used to scrolling to end of textBox when editor value change
  useScrollEnd(
    isActiveEditor ? textareaEditorDivRef.current : null,
    editorValue,
  );

  /**
   * this function handles Editor changes
   * @param v is editor value
   */
  const handleEditorChange = useCallback((v: any) => {
    // this setter is used to say editor value change ,and it used to in font size and font family components
    setEditorChange();

    // this setter is used to store editor value in editor context
    setEditorValue(v, editorTextBoxRef.current?.textContent ?? "");
  }, []);

  return (
    <TooltipProvider
      disableHoverableContent
      delayDuration={500}
      skipDelayDuration={0}
    >
      <DndProvider backend={HTML5Backend}>
        <CommentsProvider users={{}} myUserId="1">
          <Plate
            {...(isActiveEditor && {
              editorRef,
            })}
            plugins={plugins}
            initialValue={initialValue}
            onChange={handleEditorChange}
            normalizeInitialValue
            key={editorValue}
            value={valueInState}
          >
            <FixedToolbar>
              <FixedToolbarButtons />
            </FixedToolbar>

            <Editor
              {...(isActiveEditor && {
                ref: textareaEditorDivRef,
                contentRef: contentRef,
              })}
              size="md"
              className="mx-auto max-w-4xl"
            />

            <FloatingToolbar>
              <FloatingToolbarButtons />
            </FloatingToolbar>
            <MentionCombobox items={[]} />

            <CommentsPopover />
          </Plate>
        </CommentsProvider>
      </DndProvider>
    </TooltipProvider>
  );
}

export const PlateEditor = withMemo(PlateEditorResponse);
