import React, { useState } from "react";
import { useChatStore } from "@/stores/zustand/chat-store";
import type { StateSetterType } from "@/services/types";

export function useHandleUpload(setOpen: StateSetterType<boolean>) {
  const initialFile = useChatStore.use.files(); // saved files in zustand
  const handleSave = useChatStore.use.setFiles(); // function to save file in zustand
  const [documentFiles, setDocumentFiles] = useState<File[]>(initialFile); // files to upload

  /**
   * this function is for save files in zustand and close modal
   */
  function handleSaveButton() {
    handleSave(documentFiles);
    setOpen(false);
  }

  /**
   * this function is for delete file from list
   * @param e - event
   * @param fileIndex - index of file that want to delete
   */
  function handleDeleteFile(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    fileIndex: number,
  ) {
    e.stopPropagation();
    const filterList = documentFiles.filter(
      (item, index) => fileIndex !== index,
    );
    setDocumentFiles(filterList);
  }

  /**
   * this function is for select file for upload
   * @param file
   */
  function handleSelectFile(file: File[]) {
    setDocumentFiles(v => [...v, ...file]);
  }

  return {
    handleSaveButton,
    handleDeleteFile,
    handleSelectFile,
    documentFiles,
    setDocumentFiles,
  };
}
