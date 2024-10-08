"use client";
import React, { FormEvent, KeyboardEvent, useRef, useState } from "react";
import { AiOutlineScissor } from "react-icons/ai";

import { TbBookmarks, TbSend, TbUpload } from "react-icons/tb";

import { Button } from "@/components/ui/button";

import { MyTooltip } from "@/components/shared/myTooltip";
import { PromptLibraryDialog } from "../../chat/components/PromptLibraryDialog";
import { PromptInputTextBox } from "../../chat/components/PromptInputTextBox";

import useErrorToast from "@/hooks/useErrorToast";
import { useGetDictionary } from "@/hooks";
import { useChatStore } from "@/stores/zustand/chat-store";

import { iconVariants } from "@/constants/variants";
import { MinimalButton } from "@/components/shared";
import { DialogForUpload } from "@/components/shared/run-tab-for-app/form-section-components/dialog-for-upload";
import {
  useStateCapturePicStore,
  useStateCaptureStore,
} from "@/stores/zustand/chat-pdf-file";

/**
 * Prompt input component used in chat page
 * contains a textarea and send button nad some tools for input
 * @constructor
 */
export function InputPromtChatPdf() {
  const [openUploadDialog, setOpenUploadDialog] = useState(false);

  const formRef = useRef<HTMLFormElement>(null); //need it for submit on enter button pressed

  const prompt = useChatStore.use.chatTextBoxValue();
  const files = useChatStore.use.files();
  const setFiles = useChatStore.use.setFiles();
  const pics = useStateCapturePicStore.use.pic();

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

  function handleDeleteFile(fileIndex: number) {
    const filterList = pics.filter((item, index) => fileIndex !== index);
    setFiles(filterList);
  }
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [file, setFile] = useState<File[]>([]);
  const onClickCap = useStateCaptureStore.use.onClick();
  return (
    <div className="absolute bottom-0 h-[20vh] z-30 flex w-full justify-center flex-col items-start  bg-[#F4F7FE] gap-4 p-3 ">
      <div onClick={onClickCap} className={" -rotate-90 "}>
        <AiOutlineScissor className="h-5 w-5 cursor-pointer text-[#B9BAC0]" />
      </div>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
        className="promptInputFormShadow col mx-auto h-fit w-full  rounded-lg border  border-primary-dark bg-primary-light p-2 lg:px-4 lg:py-2.5"
      >
        {/*prompt input text box and uploaded files*/}
        <div className=" col items-start">
          {/*show uploaded files*/}
          {/*prompt input text box*/}
          <PromptInputTextBox />
        </div>
        {/*buttons like send, save, upload, prompt library*/}
        <div className="flex items-end gap-1">
          {/*upload button that when click on it open modal*/}

          <MinimalButton
            title="Upload"
            Icon={TbUpload}
            onClick={() => setOpenDialog(!openDialog)}
          />
          <DialogForUpload
            open={openDialog}
            setOpen={setOpenDialog}
            handleSave={() => console.log("save")}
            documentFiles={file}
            setDocumentFiles={setFile}
            url={""}
            setUrl={() => console.log()}
            files={[]}
            handleDeleteFilesFromParent={() => {}}
            setExtractedText={() => {}}
            startConverting={() => {}}
            uploadIndex={1}
            uploadProgress={50}
            uploadStatus={[]}
            setUploadStatus={() => {}}
          />
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
  );
}
