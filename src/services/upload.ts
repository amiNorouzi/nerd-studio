import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";

type PDFConvertorResponse = {
  text: string;
};

export function useUploadPdf() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [successfulUploads, setSuccessfulUploads] = useState(0);
  const [index, setIndex] = useState<number | null>(null);
  const { mutate, data, ...rest } = useMutation({
    async mutationFn(pdf: File) {
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
    },
    onSuccess: () => {
      setSuccessfulUploads(prev => prev + 1);
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
    successfulUploads,
    setSuccessfulUploads,
    setIndex,
    index,
    ...rest,
  };
}
