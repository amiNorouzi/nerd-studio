"use client";
import React, { useCallback, MouseEvent, useState } from "react";

import { FileError, useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";
import { PiPaintBrushLight } from "react-icons/pi";
import { MdDeleteOutline } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegFilePdf } from "react-icons/fa6";

import RenderIf from "@/components/shared/RenderIf";

import { useCustomSearchParams, useGetDictionary } from "@/hooks";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/**
 * drop zone upload component
 * used in image to image. masking and upscale for upload init image
 * @constructor
 */
export function UploadPdf() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const {
    common: { delete_label },
    page: { image: imageDictionary },
  } = useGetDictionary();

  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: File) => {
      setPdfFile(file);
      const reader = new FileReader();
      reader.onload = async () => {
        // Do whatever you want with the file contents
        const pdf = reader.result as string;
      };
      reader.readAsDataURL(file);
    });
  }, []);

  function sizeValidation(file: File) {
    if (file.size > 5000000) {
      return {
        code: "file is too big",
        message: "File size is more than 5MB",
      };
    }
    return null;
  }

  const { getRootProps, getInputProps, open, fileRejections } = useDropzone({
    onDrop,
    accept: { "application/pdf": [] },
    validator: sizeValidation,
  });

  const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    open();
  };

  return (
    <div
      {...getRootProps()}
      className="mb-2 flex h-[160px] w-full gap-2 rounded-xl border
         bg-background p-2 transition-all duration-300 hover:bg-hover lg:mb-3 xl:mb-5"
    >
      {pdfFile ? (
        <div className="relative flex h-full w-full items-center justify-center gap-1">
          <div className="relative flex w-fit flex-col  items-center justify-center gap-2">
            <FaRegFilePdf size={75} />
            {pdfFile.name}
            {/*show file*/}
            <div className="absolute inset-0 z-10 flex items-end justify-end rounded-lg bg-transparent p-1 lg:bg-[#00000050] lg:opacity-0 lg:hover:opacity-100">
              <Button
                variant="ghost"
                className={cn(
                  "fit z-10 !h-7 !w-7  rounded-full bg-[#98989860]  p-1 text-primary hover:bg-muted hover:text-primary-dark",
                )}
                onClick={e => {
                  e.stopPropagation();
                  setPdfFile(null);
                }}
              >
                <MdDeleteOutline className={cn("h-5 w-5 text-destructive")} />
              </Button>
              {/*<ImageAction*/}
              {/*  title={delete_label}*/}
              {/*  Icon={MdDeleteOutline}*/}
              {/*  iconClassname="text-destructive"*/}
              {/*  className="!h-7 !w-7 p-1"*/}
              {/*  onClick={e => {*/}
              {/*    e.stopPropagation();*/}
              {/*    //delete file*/}
              {/*  }}*/}
              {/*/>*/}
            </div>
          </div>
        </div>
      ) : (
        <div className="centered-col h-full w-full cursor-pointer">
          <input {...getInputProps()} onClick={e => e.stopPropagation()} />
          <div className="col items-center gap-3">
            <FiUpload className="h-10 w-10 text-muted-foreground-light" />
            <p className="text-center">
             { "Drag and drop your PDF here, or click to select files"}
            </p>
            <p className="text-center text-xs font-normal text-muted-foreground">
              (PDF / 5MB Max)
            </p>
            {fileRejections.map(({ file, errors }, index) => (
              <div key={index} className="text-destructive">
                {errors.map(e => (
                  <p key={e.code}> {e.message}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
