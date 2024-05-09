"use client";

import { MyTooltip } from "@/components/shared";
import RenderIf from "@/components/shared/RenderIf";
import { Button } from "@/components/ui/button";
import { iconVariants } from "@/constants/variants";
import { useGetDictionary } from "@/hooks";
import { StateSetterType } from "@/services/types";
import { TbMessagePlus } from "react-icons/tb";
import { ChatSettings } from "./ChatSettings";
import { PromptInput } from "./PromptInput";
import { FormEvent, memo } from "react";

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

export default memo(function ChatArea(
    {
      isChatListValid, 
      setChatList, 
      isPending,
      cancelConversation: cancelConversation,
      generateConversation: generateConversation,
      continueIsPending,
      continueMessage
    } : {
      isChatListValid: "chatList" | "options";
      setChatList: React.Dispatch<React.SetStateAction<boolean>>;
      isPending: boolean;
      cancelConversation: ()=>void;
      generateConversation:(e: FormEvent<HTMLFormElement>) => Promise<any>;
      continueIsPending: boolean;
      continueMessage:string;
    }) {
   
   return (
    <div className="col sticky bottom-0 w-full max-w-[760px] gap-1.5 ">
    <RenderIf isTrue={isChatListValid === "chatList"}>
      <ChatSettings />
    </RenderIf>
    <div className="flex w-full items-start gap-2">
      {/*new chat button*/}
      <NewChatButton setChatList={setChatList} />
      {/*prompt input (text box)*/}
      <PromptInput 
        isPending={isPending}
        cancelConversation={cancelConversation}
        generateConversation={generateConversation}
      />
    </div>
  </div>
   );
})