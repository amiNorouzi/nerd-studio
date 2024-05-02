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
import { useGetDictionary } from "@/hooks";
import type { StateSetterType } from "@/services/types";
import { useChatStore } from "@/stores/zustand/chat-store";
import { TbMessagePlus } from "react-icons/tb";
import { iconVariants } from "@/constants/variants";
import Highlight from "@/components/shared/Highlight";

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
        className="w-element rounded-full bg-primary-dark
         p-1 text-white hover:bg-primary-dark"
        onClick={() => setChatList(v => !v)}
      >
        <TbMessagePlus className={iconVariants({ size: "md" })} />
      </Button>
    </MyTooltip>
  );
}

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

          {/*stop response button*/}
          <StopResponseButton className="sticky bottom-1/4 " />

          {/* chat settings and prompt input*/}
          <div className="col sticky bottom-0 w-full max-w-[760px] gap-1.5 ">
            <RenderIf isTrue={isChatListValid === "chatList"}>
              <ChatSettings />
            </RenderIf>
            <div className="flex w-full items-start gap-2">
              {/*new chat button*/}
              <NewChatButton setChatList={setChatList} />
              {/*prompt input (text box)*/}
              <PromptInput />
            </div>
          </div>
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
