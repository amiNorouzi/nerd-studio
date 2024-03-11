import React from "react";
import { TooltipForUploadedFile } from "@/components/shared";

interface IProps {
  files: File[];
  handleDeleteFile: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    fileIndex: number,
  ) => void;
  children?: React.ReactNode;
}
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
            <TooltipForUploadedFile
              file={file}
              handleDeleteFiles={handleDeleteFile}
              index={index}
              key={index}
            />
          ))}
        </div>
      )}
      {children}
    </div>
  );
}
