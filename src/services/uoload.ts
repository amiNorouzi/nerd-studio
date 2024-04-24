import { useMutation } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";
import { useState } from "react";

type PDFConvertorResponse = {
  text: string;
};

// export function usePDFConvertor() {
//   return useMutation({
//     async mutationFn(pdf: File) {
//       const formData = new FormData();
//       formData.append("file", pdf);
//       const { data } = await axiosClient.post<PDFConvertorResponse>(
//         "/uploads/convert_pdf_to_text/",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         },
//       );

//       return data.text;
//     },
//   });
// }

export function usePDFConvertor() {
  const [uploadProgress, setUploadProgress] = useState(0);

  const { mutate, data, ...rest } = useMutation({
    async mutationFn(pdf: File) {
      const formData = new FormData();
      formData.append("file", pdf);
      const { data } = await axiosClient.post<PDFConvertorResponse>(
        "/translates/convert_pdf_to_text/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: progressEvent => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total!,
            );
            setUploadProgress(percentCompleted);
          },
        },
      );

      return data.text;
    },
  });

  return { mutate, data, uploadProgress, ...rest };
}

const uploadService = {
  usePDFConvertor,
};

export default uploadService;
