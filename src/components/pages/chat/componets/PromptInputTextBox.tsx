import React, { useRef } from "react";
import { MyTooltip } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Mic } from "@/components/svg-icons";
import { useChatStore } from "@/stores/zustand/chat-store";
import { useGetDictionary, useSpeechToText } from "@/hooks";
import useAutosizeTextArea from "@/hooks/useAutosizeTextArea";
import { cn } from "@/lib/utils";

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
          variant="ghost"
          className={cn(
            "fit  mt-2.5 p-0 transition-all",
            isRecording &&
              "scale-110  rounded-full bg-white p-2 shadow shadow-primary",
          )}
          onClick={handleToggleRecording}
        >
          <Mic
            className={cn(
              "h-5 w-5 fill-muted-foreground-light transition-all",
              isRecording && "fill-primary-dark",
            )}
          />
        </Button>
      </MyTooltip>
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
