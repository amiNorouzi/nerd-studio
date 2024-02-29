import type { Locale } from "../../../../i18n.config";
import { PromptInput, ChatSettings, ChatList } from "./componets";
import { SetSearchParamProvider } from "@/components/shared";

export default function ChatPage({ lang }: { lang: Locale }) {
  return (
    <SetSearchParamProvider appName="app" appSearchParamValue="chat">
      <div className="max-h-page bg-image h-full w-full overflow-auto p-2 lg:p-4">
        <div className="col mx-auto h-full w-full max-w-[80ch]">
          <ChatList />
          <div className="sticky bottom-0">
            <ChatSettings />
            <PromptInput />
          </div>
        </div>
      </div>
    </SetSearchParamProvider>
  );
}
