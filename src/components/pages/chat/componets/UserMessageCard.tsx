"use client";

import { MouseEvent, useState } from "react";

import { LuCopy, LuCopyCheck } from "react-icons/lu";
import {
  TbBookmarks,
  TbChevronLeft,
  TbChevronRight,
  TbEdit,
  TbVolume,
} from "react-icons/tb";

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user";
import { MinimalButton, MyTooltip } from "@/components/shared";
import {
  useCopyTextInClipBoard,
  useGetDictionary,
  useTextToSpeech,
} from "@/hooks";
import { cn } from "@/lib/utils";
import { iconVariants } from "@/constants/variants";
import { EventType, IChatListProps } from "./AssistMessageCard";

/**
 * in this component we show user message card
 * @param timeLine time line of message
 * @param prompt prompt of message
 * @param image user image
 * @param name user name
 * @constructor
 */
export function UserMessageCard(props: IChatListProps) {
  const [promptIndexToShow, setPromptIndexToShow] = useState(0);
  const [isEditPrompt, setIsEditPrompt] = useState(false);
  const { handleToggleSpeak, isSpeaking } = useTextToSpeech(
    props.prompt[promptIndexToShow],
  );
  const [handleCopy, isCopy] = useCopyTextInClipBoard();

  const {
    page: { chat },
  } = useGetDictionary();

  return (
    <div className="flex flex-col items-end gap-1 lg:flex-row-reverse lg:items-start lg:ps-10">
      {/*user image*/}
      <UserAvatar
        imageSrc={props.image}
        name={props.name ?? ""}
        className="h-6 w-6 "
        fallbackClassname="text-xs"
      />

      <div className="col items-end">
        {/*content box*/}
        <div className="col gap-4 rounded-lg  border px-4 py-3">
          {/*speaker icon and prompt*/}
          <div className="flex gap-2">
            <MyTooltip title={chat.speak_button_label}>
              <Button
                className={cn(
                  "fit p-0 transition-all",
                  isSpeaking &&
                    "scale-110  rounded-full bg-white p-2 shadow shadow-primary",
                )}
                variant="ghost"
                onClick={e => {
                  const chatMessage = {
                    type: "VOLUME" as EventType,
                    data: props,
                  };
                  if (props.onClick) {
                    props.onClick(e, chatMessage);
                  }
                  handleToggleSpeak();
                }}
              >
                <TbVolume
                  className={cn(
                    "text-muted-foreground transition-all",
                    isSpeaking && "text-primary-dark",
                    iconVariants({ size: "md" }),
                  )}
                />
              </Button>
            </MyTooltip>
            {/*prompt*/}
            <p
              // when user click on edit button we make prompt editable
              contentEditable={isEditPrompt}
              className="focus:ouline-none -mt-0.5 border-none outline-none"
            >
              {props.prompt[promptIndexToShow]}
            </p>
          </div>

          {/* footer icon and time*/}
          <div className="flex items-end">
            {/*if user click on edit button we show save and cancel button else we show copy, save and edit button*/}
            {isEditPrompt ? (
              <div className="flex w-full justify-center gap-2 ">
                <Button size="sm" onClick={() => setIsEditPrompt(false)}>
                  Save & Submit
                </Button>
                <Button
                  size="sm"
                  onClick={() => setIsEditPrompt(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <>
                {/*timeline that will be replaced with real data and reformat*/}
                <span className="text-xs text-muted-foreground-light">
                  {props.timeLine}
                </span>
                {/*action buttons like:copy, save, edit*/}
                <div className="ms-auto grid grid-cols-3 items-center gap-2 rounded-lg bg-muted px-2 py-1">
                  <MinimalButton
                    Icon={isCopy ? LuCopyCheck : LuCopy}
                    title={chat.copy_button_label}
                    onClick={() => handleCopy(props.prompt[promptIndexToShow])}
                  />
                  <MinimalButton
                    Icon={TbBookmarks}
                    title={chat.save_button_label}
                  />
                  <MinimalButton
                    Icon={TbEdit}
                    title={chat.edit_button_label}
                    onClick={() => setIsEditPrompt(true)}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        {/*pagination*/}
        <div className="row mt-0.5 gap-2 text-muted-foreground">
          <MinimalButton
            Icon={TbChevronLeft}
            onClick={() => setPromptIndexToShow(v => v - 1)}
            disabled={promptIndexToShow === 0}
          />
          <span className="text-muted-foreground-light">{`${promptIndexToShow + 1}/${prompt.length}`}</span>
          <MinimalButton
            Icon={TbChevronRight}
            disabled={promptIndexToShow === prompt.length - 1}
            onClick={() => setPromptIndexToShow(v => v + 1)}
          />
        </div>
      </div>
    </div>
  );
}
