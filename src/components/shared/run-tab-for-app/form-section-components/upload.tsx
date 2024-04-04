"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { AiOutlineLink } from "react-icons/ai";
import { TooltipForUploadedFile } from "../../TooltipForUploadedFile";
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
}

/**
 * upload component
 * @param setFiles - set files
 * @param setUserUrl - set user url
 * @param files - files
 * @param userUrl - user url
 * @constructor
 */
export function Upload(props: IProps) {
  const { userUrl, files } = props;
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
          "flex items-start justify-between rounded-lg",
          isFileOrUrlValid && "-mt-3 border p-2",
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
          className={cn(
            "gap-2 text-sm text-muted-foreground transition-all duration-300",
            !isFileOrUrlValid && "-me-0.5 -mt-10 ",
          )}
        >
          <TbUpload
            className={cn(
              iconVariants({ size: "md" }),
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
        documentFiles={documentFiles}
        setDocumentFiles={setDocumentFiles}
        url={url}
        setUrl={setUrl}
      />
    </>
  );
}
