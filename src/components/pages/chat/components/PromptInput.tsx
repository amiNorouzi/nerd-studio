"use client";
import React, {
  FormEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { TbBookmarks, TbSend, TbUpload } from "react-icons/tb";


import { Button } from "@/components/ui/button";
import { MyTooltip } from "@/components/shared/myTooltip";
import { PromptLibraryDialog } from "./PromptLibraryDialog";
import { UploadDialog } from "./UploadDialog";
import { ShowUploadedFiles } from "./ShowUploadedFiles";
import { PromptInputTextBox } from "./PromptInputTextBox";


import { useGetDictionary } from "@/hooks";
import { useChatStore } from "@/stores/zustand/chat-store";


import { iconVariants } from "@/constants/variants";
import { MinimalButton } from "@/components/shared";
import useStream from "@/services/useStreamingApi";
import { useFormStore } from "@/stores/zustand/apps-form-section-store";
import { StopResponseButton } from "./StopResponseButton";
import { cn } from "@/lib/utils";
import { AssistMessageCard } from "./AssistMessageCard";


/**
 * Prompt input component used in chat page
 * contains a textarea and send button nad some tools for input
 * @constructor
 */
export function PromptInput({
  isPending,
  cancelConversation: cancelConversation,
  generateConversation: generateConversation,
}:{
  isPending: boolean,
  cancelConversation: ()=>void,
  generateConversation:(e: FormEvent<HTMLFormElement>) => Promise<any>,
}) {
  const [openUploadDialog, setOpenUploadDialog] = useState(false);

  const formRef = useRef<HTMLFormElement>(null); //need it for submit on enter button pressed


  const prompt = useChatStore.use.chatTextBoxValue();
  const files = useChatStore.use.files();
  const setFiles = useChatStore.use.setFiles();
 


  const {
    page: { chat: chatDictionary },
  } = useGetDictionary();


  //submit form when user press enter button
  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
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
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-4">
      {/*stop response button*/}
      <StopResponseButton
        className={cn("absolute -top-8 hidden", isPending && "flex")}
        onClick={cancelConversation}
      />


      {/*prompt input text box*/}
      {/* <ChatList
        messages={
            startMessages || []
        }
      /> */}
      <div className="flex w-full items-start gap-4">
        <form
          ref={formRef}
          onSubmit={generateConversation}
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
