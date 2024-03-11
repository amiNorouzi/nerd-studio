import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UploadZone } from "@/components/shared";
import { useGetDictionary } from "@/hooks";
import { Button } from "@/components/ui/button";
import { ShowUploadedFiles } from "./ShowUploadedFiles";
import { useChatStore } from "@/stores/zustand/chat-store";
import type { StateSetterType } from "@/services/types";

interface IProps {
  children: React.ReactNode;
  open: boolean;
  setOpen: StateSetterType<boolean>;
}
export function UploadDialog({ children, open, setOpen }: IProps) {
  const initialFile = useChatStore.use.files();
  const handleSave = useChatStore.use.setFiles();
  const [documentFiles, setDocumentFiles] = useState<File[]>(initialFile);
  const {
    page: { chat },
  } = useGetDictionary();

  function handleSaveButton() {
    handleSave(documentFiles);
    setOpen(false);
  }
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

  function handleSelectFile(file: File[]) {
    setDocumentFiles(v => [...v, ...file]);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex h-full max-h-[400px] w-full  max-w-[704px] flex-col justify-start  gap-3 divide-y  p-0">
        <DialogHeader className="m-0 p-6 pb-0">
          <DialogTitle className="flex gap-2 text-2xl font-medium">
            <FiUpload size={35} />
            Upload
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-1 flex-col justify-between p-9 pt-3">
          <ShowUploadedFiles
            files={documentFiles}
            handleDeleteFile={handleDeleteFile}
          >
            <UploadZone
              documentFiles={documentFiles}
              setDocumentFiles={handleSelectFile}
              className="mb-0 bg-white lg:mb-0 xl:mb-0"
              placeholder={chat.upload_zone_placeholder}
              description={chat.upload_zone_description}
            />
          </ShowUploadedFiles>

          <div className="flex w-full justify-end">
            <Button className="w-full lg:w-1/2" onClick={handleSaveButton}>
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
