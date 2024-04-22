"use client";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";

import { useGetDictionary } from "@/hooks";
import { cn } from "@/lib/utils";

interface IProps extends React.ComponentPropsWithoutRef<"div"> {
  documentFiles: File[];
  setDocumentFiles: (v: File[]) => void;
  acceptedFiles?: Record<string, string[]>;
  placeholder?: string;
  description?: string;
}

/**
 * drop zone upload component
 * used for upload document
 * @constructor
 */
export function UploadZone({
  setDocumentFiles,
  documentFiles,
  className,
  acceptedFiles,
  description,
  placeholder,
  ...divProps
}: IProps) {
  const {
    components: { upload_pdf },
  } = useGetDictionary();

  /**
   * This is a callback function that handles the drop event of the file upload.
   * It accepts an array of File objects, which represent the files that were dropped into the upload zone.
   * For each file, it creates a new FileReader object and reads the file as a data URL.
   * When the file is fully loaded, it logs the base64 encoded file data.
   * The function is wrapped in a useCallback hook to prevent unnecessary re-renders.
   *
   * @callback
   * @param {File[]} acceptedFiles - The files that were dropped into the upload zone.
   */
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    setDocumentFiles(acceptedFiles);
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = async () => {
        // Do whatever you want with the file contents
        const pdf = reader.result as string;
      };
      reader.readAsDataURL(file);
    });
  }, []);

  /**
   * validate file size , if size is over than 5MB show error
   * @param file
   */
  function sizeValidation(file: File) {
    const documentsSize = documentFiles.reduce((prev, cur) => {
      prev += cur.size;
      return prev;
    }, 0);
    if (documentsSize + file.size > 5000000) {
      return {
        code: "file is too big",
        message: upload_pdf.upload_size_error_message,
      };
    }
    return null;
  }

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    accept: acceptedFiles ?? {
      "application/pdf": [],
      "application/msword": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
    },
    validator: sizeValidation,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "mb-2 flex h-[173px] w-full gap-2 rounded-xl border bg-background  transition-all duration-300 hover:bg-hover lg:mb-3  xl:mb-5  ",
        className,
      )}
      {...divProps}
    >
      <div className="centered-col h-full w-full cursor-pointer">
        <input {...getInputProps()} onClick={e => e.stopPropagation()} />
        <div className="col items-center gap-3">
          <FiUpload className="h-10 w-10 text-muted-foreground-light" />
          <p className="text-center">
            {placeholder ?? upload_pdf.upload_zone_placeholder}
          </p>
          <p className="text-center text-xs font-normal text-muted-foreground">
            {description ?? upload_pdf.upload_size}
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
    </div>
  );
}
