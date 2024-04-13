import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MyTooltip, UploadZone } from "@/components/shared";
import { useGetDictionary } from "@/hooks";
import { Button } from "@/components/ui/button";
import { ShowUploadedFiles } from "./ShowUploadedFiles";
import { useChatStore } from "@/stores/zustand/chat-store";
import { useHandleUpload } from "@/components/pages/chat/hooks";
import type { StateSetterType } from "@/services/types";

interface IProps {
  children: React.ReactNode;
  open: boolean;
  setOpen: StateSetterType<boolean>;
}

/**
 * this component is for upload file and open in modal
 * @param children - trigger button
 * @param open - open modal
 * @param setOpen - set open modal
 * @constructor
 */
export function UploadDialog({ children, open, setOpen }: IProps) {
  const {
    documentFiles,
    handleDeleteFile,
    handleSelectFile,
    handleSaveButton,
  } = useHandleUpload(setOpen);
  const {
    page: { chat },
  } = useGetDictionary();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <MyTooltip title={chat.upload_button_label}>
        <DialogTrigger asChild>{children}</DialogTrigger>
      </MyTooltip>
      <DialogContent className="flex h-full max-h-[320px] w-full  max-w-xl flex-col justify-start  gap-3 divide-y  p-0">
        <DialogHeader className="m-0 p-6 pb-0">
          <DialogTitle className="flex gap-2 font-medium">
            {chat.upload_label}
          </DialogTitle>
        </DialogHeader>
        <div className="form-padding flex flex-1 flex-col justify-between pt-3">
          {/*upload zone and show uploaded files*/}
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
            <Button className="px-9" onClick={handleSaveButton}>
              {chat.save_button_label}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
