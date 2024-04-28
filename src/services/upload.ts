import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";

type PDFConvertorResponse = {
  text: string;
};

export function useUploadPdf() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [index, setIndex] = useState<number | null>(null);
  const { mutate, data, ...rest } = useMutation({
    async mutationFn(pdf: File) {
      try {
        const formData = new FormData();
        formData.append("file", pdf);

        const response = await axiosClient.post<PDFConvertorResponse>(
          "/uploads/convert_pdf_to_text/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: progressEvent => {
              if (index === null) setIndex(0);
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total!,
              );
              setUploadProgress(percentCompleted);
            },
          },
        );

        return response.data.text;
      } catch (err) {
        console.log("error happened in the upload", err);
        console.log("error in upload index number", index);
      }
    },

    onSettled: () => {
      setIndex(prev => (prev ? prev + 1 : 1));
      setUploadProgress(0);
    },
  });

  return {
    mutate,
    data,
    uploadProgress,
    setIndex,
    index,
    ...rest,
  };
}

export function useUploadUrl() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const { mutate, data, ...rest } = useMutation({
    async mutationFn(url: string) {
      try {
        const response = await axiosClient.post<PDFConvertorResponse>(
          "/uploads/import_pdf_from_url/",
          { url },
          {
            onUploadProgress: progressEvent => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total!,
              );
              setUploadProgress(percentCompleted);
            },
          },
        );

        return response.data.text;
      } catch (err) {
        console.log("error happened in the upload url", err);
      }
    },
  });

  return {
    mutate,
    data,
    uploadProgress,

    ...rest,
  };
}
