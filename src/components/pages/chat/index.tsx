"use client";
import ChatHero from "@/components/pages/chat/components/ChatHero";
import { HistoryBox, SetSearchParamProvider } from "@/components/shared";
import Highlight from "@/components/shared/Highlight";
import useErrorToast from "@/hooks/useErrorToast";
import useStream from "@/services/useStreamingApi";
import { useFormStore } from "@/stores/zustand/apps-form-section-store";
import { useChatStore } from "@/stores/zustand/chat-store";
import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import type { Locale } from "../../../../i18n.config";
import {
  ChatList,
  ChatSettingAndUpload,
  HistoryItems,
  Options,
  Title,
} from "./components";
import ChatArea from "./components/ChatArea";


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


export default  memo(function ChatPage({ lang }: { lang: Locale }) {
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
    generateStream: startConversation,
    cancelStream: cancelConversation,
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
    appType: "chat_bot",
    invalidationQuery: { queryKey: ["history"] },
  });
  const {
    generateStream: continueConversation,
    cancelStream: cancelContinueConversation,
    message: continueMessage,
    isPending: continueIsPending,
    isError: continueIsError,
    isSuccess: continueIsSuccess,
    error: continueError,
    data: continueData,
    resetMessage: resetContinueMessage,
    conversationHistory: continueConversationHistory,
  } = useStream<StreamData>({
    endpoint: `/chat_bot/continue_conversation/?conversation_id=${data?.conversation_id}&chat_id=${messagesHistory?.chats[messagesHistory.chats.length - 1].id}`,
    appType: "chat_bot",
    invalidationQuery: { queryKey: ["history"] },
  });


  /**
   * submit form to initialize a conversation
   * @param e FormEvent
   */
  const generateConversation = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      resetContinueMessage();
      resetMessage();
      promptReset("");
      trackMessagesRef.current = 1;

      //check if user write a prompt
      if (!prompt) return showError("Please! write your prompt");


      if (conversationHistory.length > 0) {
        // continueConversation({
        //   frequency_penalty: GPT3Turbo.frequency/100,
        //   max_tokens: 100,
        //   messages: [
        //     {
        //       content: prompt,
        //       role: "user",
        //     },
        //   ],
        //   model: "gpt-3.5-turbo-0125",
        //   presence_penalty: GPT3Turbo.presence/100,
        //   temperature: GPT3Turbo.temperature/100,
        //   top_p: GPT3Turbo.top/100,
        // });
        //test
        return;
      }

      //
      // startConversation({
      //   frequency_penalty: GPT3Turbo.frequency/100,
      //   max_tokens: 100,
      //   messages: [
      //     {
      //       content: "you are a helpful assistant.",
      //       role: "system",
      //     },
      //     {
      //       content: prompt,
      //       role: "user",
      //     },
      //   ],
      //   model: "gpt-3.5-turbo-0125",
      //   presence_penalty: GPT3Turbo.presence/100,
      //   temperature: GPT3Turbo.temperature/100,
      //   top_p: GPT3Turbo.top/100,
      // });
    },
    [GPT3Turbo.frequency, GPT3Turbo.presence, GPT3Turbo.temperature, GPT3Turbo.top, continueConversation, conversationHistory, prompt, promptReset, resetContinueMessage, resetMessage, showError, startConversation],
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
  const messages = messagesHistory?.chats.map(chat => {
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
          {chatList ? (
            <ChatList
              messages={messages || []}
              onClick={(e, data) => console.log({ e, data })}
            />
          ) : (
            <Options>
              {/*these children are for Options component*/}
              <Title />
              <ChatHero />
              <ChatSettingAndUpload />
            </Options>
          )}

          {/* chat settings and prompt input*/}
          <ChatArea
            isChatListValid={isChatListValid}
            setChatList={setChatList}
            isPending={isPending}
            cancelConversation={cancelConversation}
            generateConversation={generateConversation}
            continueIsPending={continueIsPending}
            continueMessage={continueMessage}
          />
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
)
