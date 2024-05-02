"use client";
import type { LangParams } from "@/services/types";
import ChatLoading from "@/app/[lang]/(protect-roots)/(apps)/chat/loading";
import dynamic from "next/dynamic";

const ChatPage = dynamic(() => import("@/components/pages/chat-pdf"), {
  loading: () => <ChatLoading />,
});

export default function Chat({ params: { lang } }: LangParams) {
  return <ChatPage />;
}
