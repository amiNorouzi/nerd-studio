"use client";
import { SetSearchParamProvider } from "@/components/shared";
import { UploadFilePdf } from "@/components/pages/chatPdf/componets/uploadfilePdf";
import { useState } from "react";
import { SidebarChatPdf } from "@/components/pages/chatPdf/componets/sidebarChatPdf";
import { ListPdfFile } from "@/components/pages/chatPdf/componets/ListPdfFile";

export function ChatWithPdf() {
  const [isUploadMood, setIsUploadMood] = useState<boolean>(false);

  return (
    <SetSearchParamProvider appName="app" appSearchParamValue="chatpdf">
      <div>
        <div className={""}></div>
        {isUploadMood ? <UploadFilePdf /> : <ListPdfFile />}
      </div>
    </SetSearchParamProvider>
  );
}
