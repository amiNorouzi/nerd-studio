"use client";
import React, { useState } from "react";
import {
  ChatList,
  Options,
  Title,
  ChatSettingAndUpload,
  HistoryItems,
} from "./componets";
import {
  HistoryBox,
  SetSearchParamProvider,
} from "@/components/shared";
import { ChatHero } from "@/components/pages/chat/componets/ChatHero";
import type { Locale } from "../../../../i18n.config";
import { useChatStore } from "@/stores/zustand/chat-store";
import ChatArea from "./componets/ChatArea";
import Highlight from "@/components/shared/Highlight";

const chatContent = {
  chatList: ChatList,
  options: Options,
};

export default function ChatPage({ lang }: { lang: Locale }) {
  const isHighlightOpen = useChatStore.use.openHighlightBox();
  const [chatList, setChatList] = useState(false);
  const isChatListValid = chatList ? "chatList" : "options";
  const Content = chatContent[isChatListValid];

  /**
   * * Important: SetSearchParamProvider is used to set apps name to url search param
   *  value of it used in apps Header in  layout or form-section
   *  and everywhere that needs to know app name
   */
  return (
    <SetSearchParamProvider appName="app" appSearchParamValue="chat">
      <div className="max-h-apps-page flex h-full w-full overflow-hidden bg-background p-0">
        <div className="col mx-auto h-full w-full items-center overflow-y-auto p-2 lg:p-4">
          {/* chat list or chat option*/}
          {/* @ts-ignore */}
          <Content >
            {/*these children are for Options component*/}
            <Title lang={lang} />
            <ChatHero lang={lang} />
            <ChatSettingAndUpload />
          </Content>

          {/* chat settings and prompt input*/}
          <ChatArea isChatListValid={isChatListValid} setChatList={setChatList} />
        </div>

        <Highlight />

        {/*history box open when history button in header clicked (value of history button save in zustand)*/}
        <HistoryBox>
          <HistoryItems />
        </HistoryBox>
      </div>
    </SetSearchParamProvider>
  );
}
