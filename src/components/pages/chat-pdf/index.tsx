"use client";
import { SetSearchParamProvider } from "@/components/shared";
import { useState } from "react";
import UploadFilePdf from "./componets/uploadfilePdf";
import ListPdfFile from "./componets/ListPdfFile";

export default function ChatWithPdf() {
  //   this state control the mood od user list Last pdf upload or show section of upload pdf
  const [isUploadMood, setIsUploadMood] = useState<boolean>(true);

  return (
    <SetSearchParamProvider appName="app" appSearchParamValue="chatpdf">
      <div className=" relative h-full ">
        <div className={""}></div>
        {isUploadMood ? <UploadFilePdf /> : <ListPdfFile />}
      </div>
    </SetSearchParamProvider>
  );
}
