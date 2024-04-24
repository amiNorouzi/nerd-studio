"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { AiOutlineLink } from "react-icons/ai";
import { TooltipForUploadedFile } from "@/components/shared";
import { DialogForUpload } from "./dialog-for-upload";

import { useGetDictionary } from "@/hooks";
import { useHandleUpload } from "./useHandleUpload";
import { cn } from "@/lib/utils";
import { TbUpload } from "react-icons/tb";
import { iconVariants } from "@/constants/variants";

interface IProps {
  setFiles: (files: File[]) => void;
  setUserUrl: (url: string) => void;
  files: File[];
  userUrl: string;
  successfulUploads: number;
  uploadIndex: number | null;
  uploadProgress: number;
}

/**
 * upload component
 *
 * @constructor
 * @param props
 */
export function Upload(props: IProps) {
  const { userUrl, files, successfulUploads, uploadIndex, uploadProgress } =
    props;
  const {
    fileType,
    open,
    documentFiles,
    url,
    setDocumentFiles,
    setUrl,
    setOpen,
    handleDeleteFilesFromParent,
    handleDeleteUrl,
    handleSave,
    handleTriggerOpenButton,
  } = useHandleUpload(props);

  const {
    components: { form_section },
  } = useGetDictionary();

  const isFileOrUrlValid =
    (fileType === "file" && files.length > 0) ||
    (fileType === "url" && userUrl);
  return (
    <>
      <div
        className={cn(
          "absolute bottom-6 start-3.5 flex items-start justify-between rounded-lg",
        )}
      >
        <Button
          onClick={handleTriggerOpenButton}
          variant="muted"
          size={"sm"}
          className={cn(
            "gap-2 bg-muted-dark text-muted-foreground transition-all duration-300",
            !isFileOrUrlValid && "-me-0.5 -mt-[31px] ",
          )}
        >
          <TbUpload
            className={cn(
              iconVariants({ size: "sm" }),
              "stroke-muted-foreground",
            )}
          />
          {form_section.form_upload}
        </Button>
      </div>
      {/*upload modal*/}
      <DialogForUpload
        open={open}
        setOpen={setOpen}
        handleSave={handleSave}
        handleDeleteFilesFromParent={handleDeleteFilesFromParent}
        documentFiles={documentFiles}
        setDocumentFiles={setDocumentFiles}
        url={url}
        setUrl={setUrl}
        files={files}
        successfulUploads={successfulUploads}
        uploadIndex={uploadIndex}
        uploadProgress={uploadProgress}
      />
    </>
  );
}
