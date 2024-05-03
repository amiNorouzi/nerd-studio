"use client";
import React, {
  useRef,
  useState,
  KeyboardEvent,
  FormEvent,
  useCallback,
  useEffect,
} from "react";

import { TbBookmarks, TbSend, TbUpload } from "react-icons/tb";

import { Button } from "@/components/ui/button";

import { MyTooltip } from "@/components/shared/myTooltip";
import { PromptLibraryDialog } from "./PromptLibraryDialog";
import { UploadDialog } from "./UploadDialog";
import { ShowUploadedFiles } from "./ShowUploadedFiles";
import { PromptInputTextBox } from "./PromptInputTextBox";

import useErrorToast from "@/hooks/useErrorToast";
import { useGetDictionary } from "@/hooks";
import { useChatStore } from "@/stores/zustand/chat-store";

import { iconVariants } from "@/constants/variants";
import { MinimalButton } from "@/components/shared";
import { useStream } from "@/services/useStreamingApi";
import { ChatList } from "./ChatList";
import { useFormStore } from "@/stores/zustand/apps-form-section-store";
import { StopResponseButton } from "./StopResponseButton";
import { cn } from "@/lib/utils";
import { AssistMessageCard } from "./AssistMessageCard";

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

/**
 * Prompt input component used in chat page
 * contains a textarea and send button nad some tools for input
 * @constructor
 */
export function PromptInput() {
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
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

  const formRef = useRef<HTMLFormElement>(null); //need it for submit on enter button pressed

  const prompt = useChatStore.use.chatTextBoxValue();
  const promptReset = useChatStore.use.setChatTextBoxValue();
  const files = useChatStore.use.files();
  const engines = useFormStore.use.engines();
  const setFiles = useChatStore.use.setFiles();
  const GPT3Turbo = engines["GPT-3.5 Turbo"];

  const {
    page: { chat: chatDictionary },
  } = useGetDictionary();

  const { showError } = useErrorToast();

  //submit form when user press enter button
  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

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
          frequency_penalty: GPT3Turbo.frequency / 100,
          max_tokens: 100,
          messages: [
            {
              content: prompt,
              role: "user",
            },
          ],
          model: "gpt-3.5-turbo-0125",
          presence_penalty: GPT3Turbo.presence / 100,
          temperature: GPT3Turbo.temperature / 100,
          top_p: GPT3Turbo.top / 100,
        });
        return;
      }

      startCoversation({
        frequency_penalty: GPT3Turbo.frequency / 100,
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
        presence_penalty: GPT3Turbo.presence / 100,
        temperature: GPT3Turbo.temperature / 100,
        top_p: GPT3Turbo.top / 100,
      });
    },
    [
      GPT3Turbo.frequency,
      GPT3Turbo.presence,
      GPT3Turbo.temperature,
      GPT3Turbo.top,
      continueCoversation,
      conversationHistory,
      prompt,
      promptReset,
      resetContinueMessage,
      resetMessage,
      showError,
      startCoversation,
    ],
  );

  function handleDeleteFile(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    fileIndex: number,
  ) {
    e.stopPropagation();
    const filterList = files.filter((item, index) => fileIndex !== index);
    setFiles(filterList);
  }

  if (isError) {
    console.error(error);
  }

  useEffect(() => {
    if (continueIsPending) {
      return;
    }
    if (continueIsSuccess) {
      setMessagesHistory(continueData);
    }
  }, [continueData, continueIsPending, continueIsSuccess]);

  useEffect(() => {
    if (isPending) {
      return;
    }
    if (isSuccess) {
      setMessagesHistory(data);
    }
  }, [data, isPending, isSuccess]);

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

  // let continueMessages = continueData?.chats.slice(1).map(chat => {
  //   return {
  //     name: "reza",
  //     image: "/images/logo.png",
  //     prompt: [chat.text],
  //     timeLine: "5 Min ago",
  //     id: chat.id.toString(),
  //     role: chat.role,
  //   };
  // });

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-4">
      {/*stop response button*/}
      <StopResponseButton
        className={cn("absolute -top-8 hidden", isPending && "flex")}
        onClick={cancelCoversation}
      />
      <div className="flex w-full items-start gap-4">
        <form
          ref={formRef}
          onSubmit={generateCoversation}
          onKeyDown={handleKeyDown}
          className="promptInputFormShadow col mx-auto h-fit w-full  rounded-lg border  border-primary-dark bg-primary-light p-2 lg:px-4 lg:py-2.5"
        >
          {/*prompt input text box and uploaded files*/}
          <div className=" col items-start">
            {/*show uploaded files*/}
            <ShowUploadedFiles
              files={files}
              handleDeleteFile={handleDeleteFile}
            />
            {/*prompt input text box*/}
            <ChatList messages={messages || []} />
            {(isPending || continueIsPending) && (
              <AssistMessageCard
                timeLine={""}
                prompt={[message || continueMessage]}
                image={""}
                name={"assistant"}
                id={"assisstant_prompt_card"}
                role="user"
              />
            )}
            <PromptInputTextBox />
          </div>
          {/*buttons like send, save, upload, prompt library*/}
          <div className="flex items-end gap-1">
            {/*upload button that when click on it open modal*/}
            <UploadDialog
              setOpen={setOpenUploadDialog}
              open={openUploadDialog}
              key={String(openUploadDialog)}
            >
              <MinimalButton
                title="Upload"
                Icon={TbUpload}
                onClick={() => setOpenUploadDialog(true)}
              />
            </UploadDialog>
            {/*prompt library button*/}
            <PromptLibraryDialog />
            {/*save button*/}
            <MinimalButton
              Icon={TbBookmarks}
              title={chatDictionary.saves_label}
              className="-mb-0.5"
            />
            <div className="row ms-auto gap-2">
              {/*words counter*/}
              <p className="text-xs font-light text-muted-foreground">{`${prompt.length}/4000`}</p>
              {/*send button*/}
              <MyTooltip title={chatDictionary.send_button_label}>
                <Button
                  variant="ghost"
                  className="w-element rounded-full bg-primary-dark p-1 text-white hover:bg-primary-dark   "
                  type="submit"
                >
                  <TbSend className={iconVariants({ size: "md" })} />
                </Button>
              </MyTooltip>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
