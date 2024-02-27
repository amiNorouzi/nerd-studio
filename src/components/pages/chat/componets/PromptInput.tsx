"use client";
import { useRef, useState, KeyboardEvent, FormEvent } from "react";

import { PiMicrophone } from "react-icons/pi";
import { IoMdSend } from "react-icons/io";

import { Button } from "@/components/ui/button";
import { MyTooltip } from "@/components/shared/myTooltip";
import PromptLibraryDialog from "./PromptLibraryDialog";

import useAutosizeTextArea from "@/hooks/useAutosizeTextArea";
import useErrorToast from "@/hooks/useErrorToast";
import { useGetDictionary } from "@/hooks";

/**
 * Prompt input component used in chat page
 * contains a textarea and send button nad some tools for input
 * @constructor
 */
export function PromptInput() {
  const {
    page: { chat: chatDictionary },
  } = useGetDictionary();

  const [prompt, setPrompt] = useState("");
  const formRef = useRef<HTMLFormElement>(null); //need it for submit on enter button pressed
  const textAreaRef = useRef<HTMLTextAreaElement>(null); //ref for resize text area
  //this hooks increase textarea size when line break
  useAutosizeTextArea(textAreaRef.current, prompt);
  const { showError } = useErrorToast();

  //submit form when user press enter button
  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  /**
   * submit form
   * @param e FormEvent
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //check if user write a prompt
    if (!prompt) return showError("Please! write your prompt");
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
      onClick={() => textAreaRef.current?.focus()}
      className="col mx-auto h-fit w-full rounded-lg border bg-muted focus-within:border-primary focus-within:bg-background hover:border-primary/40"
    >
      <textarea
        className=" max-h-40 w-full rounded-lg border-none bg-transparent px-2.5 py-2.5 placeholder:font-normal placeholder:text-muted-foreground focus:outline-none"
        placeholder={chatDictionary.prompt_input_placeholder}
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        style={{ resize: "none" }}
        rows={1}
        ref={textAreaRef}
      />
      <div className="flex items-end gap-1 px-2.5 pb-2.5">
        {/*prompt library button*/}
        <PromptLibraryDialog />

        {/*voice input button*/}
        <MyTooltip title={chatDictionary.voice_input_button_label}>
          <Button variant="ghost" className="fit p-0 text-foreground/80">
            <PiMicrophone size="1.2rem" />
          </Button>
        </MyTooltip>

        <div className="row ms-auto gap-2">
          {/*words counter*/}
          <p className="text-xs font-light">100/4000</p>
          {/*send button*/}
          <MyTooltip title={chatDictionary.send_button_label}>
            <Button
              variant="ghost"
              className="fit p-0 text-primary/70 hover:text-primary"
            >
              <IoMdSend size="1.3rem" />
            </Button>
          </MyTooltip>
        </div>
      </div>
    </form>
  );
}
