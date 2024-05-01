import ChatPage from "@/components/pages/chat";

import type { LangParams } from "@/services/types";
import HomeLoading from "@/app/[lang]/loading";
import { Suspense } from "react";
import ChatLoading from "@/app/[lang]/(protect-roots)/(apps)/chat/loading";

export default function Chat({ params: { lang } }: LangParams) {
  return (
    <Suspense fallback={<ChatLoading />}>
      <ChatPage lang={lang} />
    </Suspense>
  );
}
