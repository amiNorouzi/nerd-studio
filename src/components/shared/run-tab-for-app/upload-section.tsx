import useSuccessToast from "@/hooks/useSuccessToast";
import useErrorToast from "@/hooks/useErrorToast";
import { useEffect, useState } from "react";
import { useUploadPdf } from "@/services/upload-pdf";
import {
  useCovertPdfToText,
  useUploadUrl,
} from "@/services/covert-pdf-to-text";

interface Props {
  files: File[];
}
export const useUploadData = ({ files }: Props) => {
  //returned text from pdfConvertor
  const [extractedText, setExtractedText] = useState("");
  const [uploadStatus, setUploadStatus] = useState<boolean[]>([]);

  const {
    mutateAsync: covertPDF,
    uploadProgress,

    setIndex: setUploadIndex,
    index: uploadIndex,
  } = useCovertPdfToText();

  // url upload
  const { mutateAsync: convertUrl, uploadProgress: urlUploadProgress } =
    useUploadUrl();

  //
  const { showSuccess } = useSuccessToast();
  const { showError } = useErrorToast();
  //set states of the upload hook
  useEffect(() => {
    if (uploadIndex === files.length) {
      setUploadIndex(null);
      // setUploadStatus([]);
    }
  }, [files, uploadIndex, setUploadIndex]);

  // convert pdf to text
  const covertPdfToText = async (files: File[]) => {
    let index = 0;
    for (const file of files) {
      const text = await covertPDF(file);
      if (text) {
        setExtractedText(prev => prev + text);
        setUploadStatus(prev => [...prev, true]);
        showSuccess(` file ${file.name} uploaded`);
      } else {
        showError(` file ${file.name} failed upload`);
        setUploadStatus(prev => [...prev, false]);
      }
      index++;
    }
  };

  //convert  url to text
  const covertUrlToText = async (url: string) => {
    const text = await convertUrl(url);
    if (text) {
      setExtractedText(prev => prev + text);
      setUploadStatus(prev => [...prev, true]);
      showSuccess(` url is converted to text`);
    } else {
      showError(`upload failed`);
      setUploadStatus(prev => [...prev, false]);
    }
  };

  const startConverting = (files: File[], url: string) => {
    files.length > 0 && covertPdfToText(files);
    url && covertUrlToText(url);
  };

  return {
    extractedText,
    setExtractedText,
    uploadStatus,
    setUploadStatus,
    startConverting,
    uploadIndex,
    uploadProgress,
  };
};
