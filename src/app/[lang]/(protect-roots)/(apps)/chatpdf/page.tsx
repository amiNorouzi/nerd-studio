import { ChatWithPdf } from "../../../../../components/pages/chat-pdf";

import type { LangParams } from "@/services/types";

export default function ChatPdf({ params: { lang } }: LangParams) {
  return <ChatWithPdf />;
}
