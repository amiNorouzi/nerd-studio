import { ChatWithPdf } from "@/components/pages/chat-pdf";

import type { LangParams } from "@/services/types";
import { Suspense } from "react";
import ChatPdfLoading from "@/app/[lang]/(protect-roots)/(apps)/chatpdf/loading";

export default function ChatPdf({ params: { lang } }: LangParams) {
  return (
    <Suspense fallback={<ChatPdfLoading />}>
      <ChatWithPdf />
    </Suspense>
  );
}
