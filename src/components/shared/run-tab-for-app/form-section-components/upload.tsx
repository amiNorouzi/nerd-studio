"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FiUpload } from "react-icons/fi";
import { AiOutlineLink } from "react-icons/ai";
import { TooltipForUploadedFile } from "./tooltip-for-uploaded-file";
import { DialogForUpload } from "./dialog-for-upload";

import { cn } from "@/lib/utils";

interface IProps {
  setFiles: (files: File[]) => void;
  setUserUrl: (url: string) => void;
  files: File[];
  userUrl: string;
}
export function Upload({ setFiles, setUserUrl, files, userUrl }: IProps) {
  const [open, setOpen] = useState(false);
  const [documentFiles, setDocumentFiles] = useState<File[]>(files);
  const [fileType, setFileType] = useState<"file" | "url">("file");
  const [url, setUrl] = useState<string>(userUrl);

  function handleDeleteFilesFromParent(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    fileIndex: number,
  ) {
    e.stopPropagation();
    const filterList = files.filter((item, index) => fileIndex !== index);
    setFiles(filterList);
  }
  function handleDeleteUrl() {
    setUserUrl("");
  }
  function handleSave(tab: string) {
    if (tab === "document") {
      setFiles(documentFiles);
      setFileType("file");
    } else {
      setUserUrl(url);
      setFileType("url");
    }
    setOpen(false);
  }
  function handleTriggerOpenButton() {
    setDocumentFiles(files);
    setUrl(userUrl);
    setOpen(true);
  }

  const isFileOrUrlValid =
    (fileType === "file" && files.length > 0) ||
    (fileType === "url" && userUrl);
  return (
    <div>
      <div
        className={cn(
          "flex items-start justify-between p-3",
          isFileOrUrlValid && "border",
        )}
      >
        <div className="flex flex-wrap gap-1">
          {fileType === "file" &&
            files.map((file, index) => (
              <TooltipForUploadedFile
                file={file}
                handleDeleteFiles={handleDeleteFilesFromParent}
                index={index}
                key={index}
              />
            ))}
          {fileType === "url" && userUrl && (
            <div className="group relative flex items-center justify-start gap-1 rounded-md border border-black p-3">
              <AiOutlineLink />
              {userUrl}
              <Button
                variant="ghost"
                className="h-3 w-3 p-1 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={handleDeleteUrl}
              >
                X
              </Button>
            </div>
          )}
        </div>
        <Button
          onClick={handleTriggerOpenButton}
          variant="muted"
          className="gap-2 text-sm text-muted-foreground"
        >
          <FiUpload className="stroke-muted-foreground" size={20} />
          Upload
        </Button>
      </div>

      <DialogForUpload
        open={open}
        setOpen={setOpen}
        handleSave={handleSave}
        documentFiles={documentFiles}
        setDocumentFiles={setDocumentFiles}
        url={url}
        setUrl={setUrl}
      />
    </div>
  );
}
