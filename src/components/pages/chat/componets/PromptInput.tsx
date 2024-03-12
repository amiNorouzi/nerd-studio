"use client";
import React, { useRef, useState, KeyboardEvent, FormEvent } from "react";
import { FiUpload } from "react-icons/fi";

import { Button } from "@/components/ui/button";

import { MyTooltip } from "@/components/shared/myTooltip";
import { DoubleBookMark, NewChat, Send } from "@/components/svg-icons";
import { PromptLibraryDialog } from "./PromptLibraryDialog";
import { UploadDialog } from "./UploadDialog";
import { ShowUploadedFiles } from "./ShowUploadedFiles";
import { PromptInputTextBox } from "./PromptInputTextBox";

import useErrorToast from "@/hooks/useErrorToast";
import { useGetDictionary } from "@/hooks";
import { useChatStore } from "@/stores/zustand/chat-store";

import type { StateSetterType } from "@/services/types";
/**
 * Prompt input component used in chat page
 * contains a textarea and send button nad some tools for input
 * @constructor
 */
export function PromptInput({
  setChatList,
}: {
  setChatList: StateSetterType<boolean>;
}) {
  const [openUploadDialog, setOpenUploadDialog] = useState(false);

  const formRef = useRef<HTMLFormElement>(null); //need it for submit on enter button pressed

  const prompt = useChatStore.use.chatTextBoxValue();
  const files = useChatStore.use.files();
  const setFiles = useChatStore.use.setFiles();

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
   * submit form
   * @param e FormEvent
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //check if user write a prompt
    if (!prompt) return showError("Please! write your prompt");
  };

  function handleDeleteFile(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    fileIndex: number,
  ) {
    e.stopPropagation();
    const filterList = files.filter((item, index) => fileIndex !== index);
    setFiles(filterList);
  }

  return (
    <div className="flex w-full items-start gap-4 ">
      {/*new chat button*/}
      <MyTooltip title={chatDictionary.new_chat_button_label}>
        <Button
          variant="ghost"
          className="h-8 w-8 rounded-full bg-primary-dark p-[10px] text-white hover:bg-primary-dark lg:h-12  lg:w-12 "
          onClick={() => setChatList(v => !v)}
        >
          <NewChat />
        </Button>
      </MyTooltip>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
        className="promptInputFormShadow col mx-auto h-fit w-full  rounded-lg border  border-primary-dark bg-primary-light p-2 lg:px-4 lg:py-3"
      >
        {/*prompt input text box and uploaded files*/}
        <div className=" col items-start">
          <ShowUploadedFiles
            files={files}
            handleDeleteFile={handleDeleteFile}
          />
          <PromptInputTextBox />
        </div>
        <div className="flex items-end gap-3">
          {/*upload button that when click on it open modal*/}
          <UploadDialog
            setOpen={setOpenUploadDialog}
            open={openUploadDialog}
            key={String(openUploadDialog)}
          >
            <MyTooltip title={chatDictionary.upload_button_label}>
              <Button
                variant="ghost"
                className="mt-2.5 h-6 w-6 p-0 text-muted-foreground-light hover:text-muted-foreground-light"
                onClick={() => setOpenUploadDialog(true)}
              >
                <FiUpload className="h-full w-full" />
              </Button>
            </MyTooltip>
          </UploadDialog>
          {/*prompt library button*/}
          <PromptLibraryDialog />
          {/*save button*/}
          <MyTooltip title={chatDictionary.saves_label}>
            <Button
              variant="ghost"
              className="fit  group mt-2.5 rounded p-0 active:bg-primary-dark "
            >
              <DoubleBookMark className="fill-muted-foreground-light group-active:fill-white" />
            </Button>
          </MyTooltip>

          <div className="row ms-auto gap-2">
            {/*words counter*/}
            <p className="text-xs font-light text-muted-foreground">{`${prompt.length}/4000`}</p>
            {/*send button*/}
            <MyTooltip title={chatDictionary.send_button_label}>
              <Button
                variant="ghost"
                className="h-8 w-8 rounded-full bg-primary-dark p-[10px] text-white hover:bg-primary-dark   lg:h-12 lg:w-12 "
              >
                <Send />
              </Button>
            </MyTooltip>
          </div>
        </div>
      </form>
    </div>
  );
}
