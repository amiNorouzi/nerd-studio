"use client";
import type { LangParams } from "@/services/types";
import ChatPdfLoading from "@/app/[lang]/(protect-roots)/(apps)/chatpdf/loading";
import dynamic from "next/dynamic";

const ChatWithPdf = dynamic(() => import("@/components/pages/chat-pdf"), {
  loading: () => <ChatPdfLoading />,
});

export default function ChatPdf({ params: { lang } }: LangParams) {
  return <ChatWithPdf />;
}
