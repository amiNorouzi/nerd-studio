"use client";
import React, { useState, FormEvent,
  useCallback,
  useEffect,
  useRef } from "react";
import {
  ChatList,
  Options,
  Title,
  ChatSettingAndUpload,
  StopResponseButton,
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
import { useFormStore } from "@/stores/zustand/apps-form-section-store";
import useErrorToast from "@/hooks/useErrorToast";
import useStream from "@/services/useStreamingApi";
import HighlightContent from "@/components/shared/Highlight/HighlightContent";
import Highlight from "@/components/shared/Highlight";


interface Chat {
  id: number;
  role: "user" | "assistant";
  text: string;
}


interface StreamData {
  message: string;
  conversation_id: string;
  chats: Chat[];
}


let startMessages =
    [
  {
    name: "reza",
    image: "/images/logo.png",
    prompt: ["Hello, how are you?"],
    timeLine: "5 Min ago",
    id: "1",
    role: "user",
  },
  {
    name: "ali",
    image: "/images/user.png",
    prompt: ["I'm fine, thank you!"],
    timeLine: "4 Min ago",
    id: "2",
    role: "assistant",
  },
  {
    name: "reza",
    image: "/images/logo.png",
    prompt: ["Great to hear that!"],
    timeLine: "3 Min ago",
    id: "3",
    role: "user",
  },
];


export default function ChatPage({ lang }: { lang: Locale }) {
  const isHighlightOpen = useChatStore.use.openHighlightBox();
  const [chatList, setChatList] = useState(false);
  const isChatListValid = chatList ? "chatList" : "options";
  const prompt = useChatStore.use.chatTextBoxValue();
  const promptReset = useChatStore.use.setChatTextBoxValue();
  const engines = useFormStore.use.engines();
  const { showError } = useErrorToast();
  const GPT3Turbo = engines["GPT-3.5 Turbo"];


  const [messagesHistory, setMessagesHistory] = useState<StreamData>();
  const trackMessagesRef = useRef(0);
  const {
    generateStream: startCoversation,
    cancelStream: cancelCoversation,
    message,
    resetMessage,
    isPending,
    isError,
    isSuccess,
    error,
    data,
    conversationHistory,
  } = useStream<StreamData>({
    endpoint: "/chat_bot/conversation/",
    eventName: "chat_bot",
    // @ts-ignore
    envalidationKey: ["history"],
  });
  const {
    generateStream: continueCoversation,
    cancelStream: cancelContinueCoversation,
    message: continueMessage,
    isPending: continueIsPending,
    isError: continueIsError,
    isSuccess: continueIsSuccess,
    error: continueError,
    data: continueData,
    resetMessage: resetContinueMessage,
    conversationHistory: continueconversationHistory,
  } = useStream<StreamData>({
    endpoint: `/chat_bot/continue_conversation/?conversation_id=${data?.conversation_id}&chat_id=${messagesHistory?.chats[messagesHistory.chats.length - 1].id}`,
    eventName: "chat_bot",
    // @ts-ignore
    envalidationKey: ["history"],
  });


  /**
   * submit form to intitialize a conversation
   * @param e FormEvent
   */
  const generateCoversation = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      resetContinueMessage();
      resetMessage();
      promptReset("");
      trackMessagesRef.current = 1;


      console.log(conversationHistory);


      //check if user write a prompt
      if (!prompt) return showError("Please! write your prompt");


      if (conversationHistory.length > 0) {
        continueCoversation({
          frequency_penalty: GPT3Turbo.frequency/100,
          max_tokens: 100,
          messages: [
            {
              content: prompt,
              role: "user",
            },
          ],
          model: "gpt-3.5-turbo-0125",
          presence_penalty: GPT3Turbo.presence/100,
          temperature: GPT3Turbo.temperature/100,
          top_p: GPT3Turbo.top/100,
        });
        return;
      }


      startCoversation({
        frequency_penalty: GPT3Turbo.frequency/100,
        max_tokens: 100,
        messages: [
          {
            content: "you are a helpful assistant.",
            role: "system",
          },
          {
            content: prompt,
            role: "user",
          },
        ],
        model: "gpt-3.5-turbo-0125",
        presence_penalty: GPT3Turbo.presence/100,
        temperature: GPT3Turbo.temperature/100,
        top_p: GPT3Turbo.top/100,
      });
    },
    [GPT3Turbo.frequency, GPT3Turbo.presence, GPT3Turbo.temperature, GPT3Turbo.top, continueCoversation, conversationHistory, prompt, promptReset, resetContinueMessage, resetMessage, showError, startCoversation],
  );


   if (isError) {
    console.error(error);
  }


  useEffect(()=> {
    if (continueIsPending) {
      return;
    }
    if(continueIsSuccess) {
      setMessagesHistory(continueData);
    }
  }, [continueData, continueIsPending, continueIsSuccess]);


  useEffect(()=> {
    if (isPending) {
      return;
    }
    if(isSuccess) {
      setMessagesHistory(data);
    }
  }, [data, isPending, isSuccess]);


  useEffect(()=> {
    if(messagesHistory && messagesHistory?.chats?.length > 0) setChatList(true);
  }, [messagesHistory, messagesHistory?.chats?.length]);


  // Transform StreamData to the desired structure
  let messages = messagesHistory?.chats.map(chat => {
    return {
      name: "reza",
      image: "/images/logo.png",
      prompt: [chat.text],
      timeLine: "5 Min ago",
      id: chat.id.toString(),
      role: chat.role,
    };
  });


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
          {
            chatList ? 
            <ChatList messages={messages || []} onClick={(e,data) => console.log({e,data})}/> 
            : 
            <Options >
              {/*these children are for Options component*/}
              <Title lang={lang} />
              <ChatHero lang={lang} />
              <ChatSettingAndUpload />
            </Options>
          }

          {/* chat settings and prompt input*/}
          <ChatArea
            isChatListValid={isChatListValid}
            setChatList={setChatList}
            isPending={isPending}
            cancelCoversation={cancelCoversation}
            generateCoversation={generateCoversation}
            continueIsPending={continueIsPending}
            continueMessage={continueMessage}
          />
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
