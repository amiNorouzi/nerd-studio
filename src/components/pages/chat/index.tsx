"use client";
import { useState } from "react";
import {
  PromptInput,
  ChatSettings,
  ChatList,
  Options,
  Title,
  ChatSettingAndUpload,
  StopResponseButton,
  HistoryItems,
} from "./componets";
import { HistoryBox, SetSearchParamProvider } from "@/components/shared";
import { ChatHero } from "@/components/pages/chat/componets/ChatHero";
import RenderIf from "@/components/shared/RenderIf";
import type { Locale } from "../../../../i18n.config";

const chatContent = {
  chatList: ChatList,
  options: Options,
};
export default function ChatPage({ lang }: { lang: Locale }) {
  const [chatList, setChatList] = useState(false);
  const isChatListValid = chatList ? "chatList" : "options";
  const Content = chatContent[isChatListValid];

  return (
    <SetSearchParamProvider appName="app" appSearchParamValue="chat">
      <div className="max-h-page flex h-full w-full overflow-hidden bg-white p-0">
        <div className="col mx-auto h-full w-full items-center overflow-y-auto p-2 lg:p-4">
          {/* chat list or chat option*/}
          <Content>
            {/*these children are for Options component*/}
            <Title lang={lang} />
            <ChatHero lang={lang} />
            <ChatSettingAndUpload />
          </Content>

          {/*stop response button*/}
          <StopResponseButton className="sticky bottom-1/4 " />
          {/* chat settings and prompt input*/}
          <div className="sticky bottom-0 w-full max-w-4xl lg:mb-[67px]">
            <RenderIf isTrue={isChatListValid === "chatList"}>
              <ChatSettings />
            </RenderIf>
            {/*prompt input (text box)*/}
            <PromptInput setChatList={setChatList} />
          </div>
        </div>

        {/*history box open when history button in header clicked (value of history button save in zustand)*/}
        <HistoryBox>
          <HistoryItems />
        </HistoryBox>
      </div>
    </SetSearchParamProvider>
  );
}
