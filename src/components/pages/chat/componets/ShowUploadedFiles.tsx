import React, { MouseEventHandler } from "react";
import { TooltipForUploadedFile } from "@/components/shared";
import { useStateCapturePicStore } from "@/stores/zustand/chat-pdf-file";

interface IProps {
  files: any[];
  handleDeleteFile: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    fileIndex: number,
  ) => void;
  children?: React.ReactNode;
}

/**
 * this component is for show uploaded files
 * @param children - upload zone - optional
 * @param files - files to show
 * @param handleDeleteFile - function to delete file
 * @constructor
 */
export function ShowUploadedFiles({
  children,
  files,
  handleDeleteFile,
}: IProps) {
  return (
    <div className="flex w-full items-center  justify-start gap-2  rounded-xl border py-0">
      {files.length > 0 && (
        <div className="max-w-1/2 flex flex-wrap gap-1 lg:p-2">
          {files.map((file, index) => (
            <img
              className="h-10 w-10 rounded-xl"
              src={file}
              onClick={() => console.log()}
              key={index}
            />
          ))}
        </div>
      )}
      {children}
    </div>
  );
}
