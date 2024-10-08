import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";
import { base64ToBlob } from "@/components/pages/ai-image/utils";

type PDFConvertorResponse = {
  path: string;
};
type ocr = {
  text: string;
};
type GetPdf = {
  url: string;
};

export function useUploadPdf() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [index, setIndex] = useState<number | null>(null);
  const { mutate, data, ...rest } = useMutation({
    async mutationFn(pdf: File) {
      try {
        const formData = new FormData();
        formData.append("file", pdf);
        console.log(formData);
        const response = await axiosClient.post<PDFConvertorResponse>(
          "/uploads/save_pdf/",
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
        console.log("res:", response.data);
        return response.data.path;
      } catch (err) {
        console.log("errors upload pdf:",err);
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

export function useGetPdf() {
  const { mutate, data, isPending, ...rest } = useMutation({
    async mutationFn(url: string) {
      try {
        const response = await axiosClient.post<GetPdf>(
          "/uploads/import_pdf_from_url/",
          { url: url },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        // console.log("res:", response.data.url);
        return response.data.url;
      } catch (err) {
        console.error(err);
      }
    },
  });

  return {
    mutate,
    data,
    isPending,
    ...rest,
  };
}
export function useGetUploadedPdf() {
  const { data, isLoading, refetch, isSuccess } = useQuery({
    queryKey: ["uploads"],
    async queryFn() {
      const { data } = await axiosClient.get<getPdfs[]>("/uploads/list_of_pdf");
      return data;
    },
  });

  return { data, isLoading, refetch, isSuccess };
}
export function usePdfDelete() {
  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const { data } = await axiosClient.delete<Version>(
        `/uploads/delete_pdf/${id}/`,
      );
      return data;
    },
  });
}
export function useConvertPicToText() {
  return useMutation({
    async mutationFn(pic: string) {
      try {
        const blob = base64ToBlob(pic, "image/png");
        const formData = new FormData();
        formData.append("file", blob);

        const response = await axiosClient.post<ocr>(
          "/uploads/ocr_extract_text_from_image/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
        console.log("res:", response.data);
        return response.data.text;
      } catch (err) {
        console.log("error happened in the upload", err);
      }
    },
  });
}
