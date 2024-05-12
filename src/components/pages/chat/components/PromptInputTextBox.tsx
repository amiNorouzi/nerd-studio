"use client"
import React, { useRef } from "react";

import { TbMicrophone } from "react-icons/tb";

import { MyTooltip } from "@/components/shared";
import { Button } from "@/components/ui/button";

import { useGetDictionary, useSpeechToText } from "@/hooks";
import useAutosizeTextArea from "@/hooks/useAutosizeTextArea";

import { useChatStore } from "@/stores/zustand/chat-store";
import { cn } from "@/lib/utils";
import { iconVariants } from "@/constants/variants";

/**
 * this component is for prompt input text box and microphone button
 * @constructor
 */
export function PromptInputTextBox() {
  // textarea value that store in zustand
  const prompt = useChatStore.use.chatTextBoxValue();
  const setPrompt = useChatStore.use.setChatTextBoxValue();
  const { handleToggleRecording, isRecording } = useSpeechToText({
    transcript: prompt,
    setTranscript: setPrompt,
  });
  const textAreaRef = useRef<HTMLTextAreaElement>(null); //ref for resize text area
  const {
    page: { chat: chatDictionary },
  } = useGetDictionary();

  // this hook is for resize text area
  useAutosizeTextArea(textAreaRef.current, prompt);

  return (
    <div className="flex w-full items-start">
      {/*voice input button*/}
      <MyTooltip title={chatDictionary.voice_input_button_label}>
        <Button
          type="button"
          variant="ghost"
          className={cn(
            "fit me-0.5 mt-2.5 p-0 transition-all",
            isRecording &&
              "shadow-mic me-2 mt-1 scale-110 rounded-full bg-white p-1.5 !shadow-primary",
          )}
          onClick={handleToggleRecording}
        >
          <TbMicrophone
            className={cn(
              "text-muted-foreground transition-all",
              isRecording && "text-primary-dark",
              iconVariants({ size: "md" }),
            )}
          />
        </Button>
      </MyTooltip>
      {/*text area*/}
      <textarea
        className="max-h-40 w-full resize-none rounded-xl border-none bg-transparent py-2.5 placeholder:font-normal placeholder:text-muted-foreground-light focus:outline-none"
        placeholder={chatDictionary.prompt_input_placeholder}
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        rows={1}
        ref={textAreaRef}
      />
    </div>
  );
}
