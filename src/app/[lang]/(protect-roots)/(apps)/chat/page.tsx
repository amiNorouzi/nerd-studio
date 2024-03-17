import ChatPage from "@/components/pages/chat";

import type { LangParams } from "@/services/types";

export default function Chat({ params: { lang } }: LangParams) {
  return <ChatPage lang={lang} />;
}
