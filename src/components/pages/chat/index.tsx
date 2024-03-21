"use client";
import React, { useState } from "react";
import {
  PromptInput,
  ChatSettings,
  ChatList,
  Options,
  Title,
  ChatSettingAndUpload,
  StopResponseButton,
  HistoryItems,
  Highlight,
  HighlightContent,
} from "./componets";
import {
  HistoryBox,
  MyTooltip,
  SetSearchParamProvider,
} from "@/components/shared";
import { ChatHero } from "@/components/pages/chat/componets/ChatHero";
import RenderIf from "@/components/shared/RenderIf";
import type { Locale } from "../../../../i18n.config";
import { Button } from "@/components/ui/button";
import { NewChat } from "@/components/svg-icons";
import { useGetDictionary } from "@/hooks";
import type { StateSetterType } from "@/services/types";
import { useChatStore } from "@/stores/zustand/chat-store";

const chatContent = {
  chatList: ChatList,
  options: Options,
};

function NewChatButton({
  setChatList,
}: {
  setChatList: StateSetterType<boolean>;
}) {
  const {
    page: { chat: chatDictionary },
  } = useGetDictionary();
  return (
    <MyTooltip title={chatDictionary.new_chat_button_label}>
      <Button
        variant="ghost"
        className="h-8 w-8 rounded-full bg-primary-dark p-[10px] text-white hover:bg-primary-dark lg:h-12  lg:w-12 "
        onClick={() => setChatList(v => !v)}
      >
        <NewChat />
      </Button>
    </MyTooltip>
  );
}

export default function ChatPage({ lang }: { lang: Locale }) {
  const isHighlightOpen = useChatStore.use.openHighlightBox();
  const [chatList, setChatList] = useState(false);
  const isChatListValid = chatList ? "chatList" : "options";
  const Content = chatContent[isChatListValid];
  const {
    page: { chat: chatDictionary },
  } = useGetDictionary();

  /**
   * * Important: SetSearchParamProvider is used to set apps name to url search param
   *  value of it used in apps Header in  layout or form-section
   *  and everywhere that needs to know app name
   */
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
            <div className="flex w-full items-start gap-4">
              {/*new chat button*/}
              <NewChatButton setChatList={setChatList} />
              {/*prompt input (text box)*/}
              <PromptInput />
            </div>
          </div>
        </div>

        <Highlight>
          <HighlightContent key={String(isHighlightOpen)} />
        </Highlight>

        {/*history box open when history button in header clicked (value of history button save in zustand)*/}
        <HistoryBox>
          <HistoryItems />
        </HistoryBox>
      </div>
    </SetSearchParamProvider>
  );
}
