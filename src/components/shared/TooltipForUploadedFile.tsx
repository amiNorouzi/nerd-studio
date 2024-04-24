"use client";

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
import React, { useState } from "react";

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
  handleDeleteFilesFromParent?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    fileIndex: number,
  ) => void;
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
  handleDeleteFilesFromParent,
}: IProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className={`h-fit rounded-lg ${index === uploadIndex! && "bg-[#00000050]"} ${hovered && "lg:bg-[#00000050]"} `}
          onMouseOver={() => setHovered(true)}
          onMouseOut={() => setHovered(false)}
        >
          <div className="relative flex  h-full  flex-col items-center  justify-center truncate rounded-lg  ">
            {file.type === "application/pdf" ? (
              <FaRegFilePdf
                className={`text-muted-foreground ${topOfTextField ? "h-[42px] w-[33px]" : "h-[62px] w-[49px]"}`}
              />
            ) : (
              <AiOutlineFileWord className="text-muted-foreground" />
            )}

            {/*show file*/}
            <div
              className={`absolute right-0 top-0 z-10 m-[2px] flex items-end justify-end rounded-md ${hovered && "bg-[#FFFFFF99] lg:opacity-100"}  ${!hovered && "bg-transparent lg:opacity-0"}`}
            >
              <Button
                variant="ghost"
                className={cn(
                  "fit z-10 h-[20px] w-[20px] rounded-full bg-transparent  p-0.5 text-primary ",
                )}
                onClick={e => {
                  handleDeleteFiles(e, index);
                  !topOfTextField && handleDeleteFilesFromParent!(e, index);
                }}
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
