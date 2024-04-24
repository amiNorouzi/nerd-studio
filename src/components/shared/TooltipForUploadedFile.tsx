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
import { iconVariants } from "@/constants/variants";
import { IoCloseOutline } from "react-icons/io5";

interface IProps {
  file: File;
  handleDeleteFiles: (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => void;
  index: number;
  uploadIndex?: number | null;
  uploadProgress?: number;
  topOfTextField?: boolean;
}

/**
 * this component is a tooltip and icon button for delete for uploaded file
 * @param file - uploaded file
 * @param handleDeleteFiles - delete file function
 * @param index - file index
 * @param uploadIndex
 * @param uploadProgress
 * @param topOfTextField
 * @constructor
 */
export function TooltipForUploadedFile({
  file,
  handleDeleteFiles,
  index,
  uploadIndex,
  uploadProgress,
  topOfTextField,
}: IProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className={`h-fit rounded-lg ${index === uploadIndex! && "bg-[#00000050]"} opacity-100`}
        >
          <div className="relative flex  h-full  flex-col items-center  justify-center truncate rounded-lg  ">
            {file.type === "application/pdf" ? (
              <FaRegFilePdf
                className={`text-muted-foreground ${topOfTextField ? "h-[42px] w-[36px]" : "h-[62px] w-[49px]"}`}
              />
            ) : (
              <AiOutlineFileWord className="text-muted-foreground" />
            )}

            {/*show file*/}
            <div className="absolute right-0 top-0 z-10 flex items-end justify-end rounded-md  hover:bg-transparent  lg:opacity-0 lg:hover:opacity-100">
              <Button
                variant="ghost"
                className={cn(
                  "fit z-10 !h-6 !w-6  rounded-full bg-transparent  p-0.5 text-primary hover:bg-muted-foreground hover:bg-opacity-50 hover:text-primary-dark",
                )}
                onClick={e => handleDeleteFiles(e, index)}
              >
                <IoCloseOutline
                  className={cn(
                    iconVariants({ size: "sm" }),
                    "text-destructive ",
                  )}
                />
              </Button>
            </div>
          </div>
          {index === uploadIndex! && (
            <div className="absolute left-[2px] top-1/4 flex h-[10px] w-[40px]  rounded-l-md rounded-r-md border bg-white   ">
              <span
                style={{
                  height: "100%",
                  width: `${(40 * uploadProgress!) / 100}px`,
                }}
                className=" rounded-l-md rounded-r-md bg-primary transition-all duration-300  "
              ></span>
            </div>
          )}
          {index === uploadIndex! && (
            <div className="absolute left-1/3 top-[30px] text-white">
              {uploadProgress!}%
            </div>
          )}
        </TooltipTrigger>
        <TooltipContent>{file.name}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
