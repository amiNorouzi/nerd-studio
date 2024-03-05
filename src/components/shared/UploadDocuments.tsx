"use client";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";

import { useGetDictionary } from "@/hooks";

interface IProps {
  documentFiles: File[];
  setDocumentFiles: (v: File[]) => void;
}

/**
 * drop zone upload component
 * used for upload document
 * @constructor
 */
export function UploadDocuments({ setDocumentFiles, documentFiles }: IProps) {
  const {
    components: { upload_pdf },
  } = useGetDictionary();

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
    accept: {
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
      className="mb-2 flex h-[160px] w-full gap-2 rounded-xl border
         bg-background p-2 transition-all duration-300 hover:bg-hover lg:mb-3 xl:mb-5"
    >
      <div className="centered-col h-full w-full cursor-pointer">
        <input {...getInputProps()} onClick={e => e.stopPropagation()} />
        <div className="col items-center gap-3">
          <FiUpload className="h-10 w-10 text-muted-foreground-light" />
          <p className="text-center">{upload_pdf.upload_zone_placeholder}</p>
          <p className="text-center text-xs font-normal text-muted-foreground">
            {upload_pdf.upload_size}
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
