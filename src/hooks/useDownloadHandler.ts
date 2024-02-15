import React from "react";
import { useReactToPrint } from "react-to-print";
import { convertInnerHtmlToDocx } from "@/lib/convertInnerHtmlToDocx";

type elType = React.MutableRefObject<HTMLElement | null>;
export function useDownLoadHandler(elementRef: elType) {
  const handleDownloadPdf = useReactToPrint({
    content: () => elementRef.current,
    bodyClass: "print:!h-fit print:!overflow-visible print:!font-sans",
  });

  const handleDownloadDocx = async (el?: elType) => {
    const htmlValue = el?.current ?? elementRef.current;
    if (htmlValue) {
      const source = convertInnerHtmlToDocx(htmlValue.innerHTML);

      const fileDownload = document.createElement("a");
      document.body.appendChild(fileDownload);
      fileDownload.href = source;
      fileDownload.download = "document.doc";
      fileDownload.click();
      document.body.removeChild(fileDownload);
    }
  };
  return { handleDownloadPdf, handleDownloadDocx };
}
