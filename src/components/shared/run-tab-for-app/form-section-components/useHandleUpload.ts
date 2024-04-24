import React, { useState } from "react";
import { StateSetterType } from "@/services/types";

interface Parametrs {
  userUrl?: string;
  files?: File[];
  setFiles?: (files: File[]) => void;
  setUserUrl?: (url: string) => void;
}
export function useHandleUpload({
  userUrl,
  setUserUrl,
  files,
  setFiles,
}: Parametrs) {
  const [open, setOpen] = useState(false);
  const [documentFiles, setDocumentFiles] = useState<File[]>(
    files ? files : [],
  );
  const [fileType, setFileType] = useState<"file" | "url">("file");
  const [url, setUrl] = useState<string>(userUrl ? userUrl : "");

  function handleDeleteFilesFromParent(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    fileIndex: number,
  ) {
    e.stopPropagation();
    const filterList = files!.filter((item, index) => fileIndex !== index);
    setFiles!(filterList);
  }
  function handleDeleteUrl() {
    setUserUrl!("");
  }
  function handleSave(tab: string) {
    if (tab === "document") {
      setFiles!(documentFiles);
      setFileType("file");
    } else {
      setUserUrl!(url);
      setFileType("url");
    }
    // setOpen(false);
  }
  function handleTriggerOpenButton() {
    setDocumentFiles(files!);
    setUrl(userUrl!);
    setOpen(true);
  }

  return {
    open,
    documentFiles,
    fileType,
    url,
    handleDeleteUrl,
    handleSave,
    handleTriggerOpenButton,
    handleDeleteFilesFromParent,
    setDocumentFiles,
    setUrl,
    setOpen,
  };
}
