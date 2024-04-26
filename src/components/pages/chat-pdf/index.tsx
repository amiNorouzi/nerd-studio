"use client";
import { SetSearchParamProvider } from "@/components/shared";
import { UploadFilePdf } from "@/components/pages/chat-pdf/componets/uploadfilePdf";
import { useState } from "react";
import { SidebarChatPdf } from "@/components/pages/chat-pdf/componets/sidebarChatPdf";
import { ListPdfFile } from "@/components/pages/chat-pdf/componets/ListPdfFile";

export function ChatWithPdf() {
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
