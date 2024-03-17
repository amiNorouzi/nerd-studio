import { useDownLoadHandler } from "@/hooks";
import { useEditorContext } from "@/stores/contexts/useEditorContext";

export function useHandleCopyAndDownloadAction() {
  const { editorTextBoxRef, textareaEditorDivRef } = useEditorContext();

  const { handleDownloadPdf, handleDownloadDocx } =
    useDownLoadHandler(textareaEditorDivRef);
  async function handleCopyAction(cb: (text?: string) => void) {
    cb(editorTextBoxRef.current?.innerHTML);
  }
  async function handleDownLoadAction(type: "pdf" | "doc") {
    if (type === "pdf") {
      handleDownloadPdf();
    } else {
      await handleDownloadDocx();
    }
  }

  return { handleCopyAction, handleDownLoadAction };
}
