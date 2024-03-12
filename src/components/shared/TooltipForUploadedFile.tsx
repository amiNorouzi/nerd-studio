import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegFilePdf } from "react-icons/fa";
import { AiOutlineFileWord } from "react-icons/ai";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface IProps {
  file: File;
  handleDeleteFiles: (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => void;
  index: number;
}

/**
 * this component is a tooltip and icon button for delete for uploaded file
 * @param file - uploaded file
 * @param handleDeleteFiles - delete file function
 * @param index - file index
 * @constructor
 */
export function TooltipForUploadedFile({
  file,
  handleDeleteFiles,
  index,
}: IProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="h-fit">
          <div className="relative flex   flex-col  items-center justify-center   truncate">
            {file.type === "application/pdf" ? (
              <FaRegFilePdf size={50} />
            ) : (
              <AiOutlineFileWord size={50} />
            )}

            {/*show file*/}
            <div className="absolute inset-0 z-10 flex items-end justify-end rounded-lg bg-transparent p-1 lg:bg-[#00000050] lg:opacity-0 lg:hover:opacity-100">
              <Button
                variant="ghost"
                className={cn(
                  "fit z-10 !h-7 !w-7  rounded-full bg-[#98989860]  p-1 text-primary hover:bg-muted hover:text-primary-dark",
                )}
                onClick={e => handleDeleteFiles(e, index)}
              >
                <MdDeleteOutline className={cn("h-5 w-5 text-destructive")} />
              </Button>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>{file.name}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
