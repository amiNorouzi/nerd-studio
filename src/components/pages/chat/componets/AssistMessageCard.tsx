"use client";

import { useState } from "react";

import {
  TbBookmarks,
  TbChevronLeft,
  TbChevronRight,
  TbHighlight,
  TbReload,
  TbThumbDown,
  TbThumbUp,
  TbVolume,
} from "react-icons/tb";
import { LuCopy, LuCopyCheck } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user";
import { MinimalButton, MyTooltip } from "@/components/shared";
import { useChatStore } from "@/stores/zustand/chat-store";
import {
  useCopyTextInClipBoard,
  useGetDictionary,
  useTextToSpeech,
} from "@/hooks";
import { cn } from "@/lib/utils";
import { iconVariants } from "@/constants/variants";

interface IProps {
  image: string;
  name: string;
  prompt: string[];
  timeLine: string;
  id: string;
  role: string;
}

export function AssistMessageCard(props: IProps) {
  const { timeLine, prompt, image, name } = props;
  const [promptIndexToShow, setPromptIndexToShow] = useState(0);
  const setHighlightOpen = useChatStore.use.setOpenHighlightBox();
  const setSelectedMessageForHighlight =
    useChatStore.use.setSelectedMessageForHighlight();
  const { handleToggleSpeak, isSpeaking } = useTextToSpeech(
    prompt[promptIndexToShow],
  );
  const [handleCopy, isCopy] = useCopyTextInClipBoard();
  const {
    page: { chat },
  } = useGetDictionary();

  function handleClickHighlight() {
    setSelectedMessageForHighlight(props);
    setHighlightOpen(true);
  }

  return (
    <div className="col gap-1 lg:flex-row  lg:pe-10">
      {/*assist image*/}
      <UserAvatar
        imageSrc={image}
        name={name ?? ""}
        className="h-6 w-6"
        fallbackClassname="text-xs"
      />

      <div className="col items-start ">
        {/*content box*/}
        <div className="col gap-4 rounded-lg  border bg-muted px-4 py-3">
          {/*speaker icon and prompt*/}
          <div className="flex flex-row-reverse gap-3">
            <MyTooltip title={chat.speak_button_label}>
              <Button
                className={cn(
                  "fit p-0 transition-all",
                  isSpeaking &&
                    "scale-110  rounded-full bg-white p-2 shadow shadow-primary",
                )}
                variant="ghost"
                onClick={handleToggleSpeak}
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
            <p className="-mt-0.5">{prompt[promptIndexToShow]}</p>
          </div>
          {/* footer icon and time*/}
          <div className="flex flex-row-reverse items-end ">
            <div className="ms-auto flex items-end gap-2">
              <MinimalButton
                Icon={TbThumbUp}
                iconClassname="group-active:text-primary-dark"
              />
              <MinimalButton
                Icon={TbThumbDown}
                iconClassname="group-active:text-primary-dark"
              />
              <span className=" text-xs text-muted-foreground-light">
                {timeLine}
              </span>
            </div>
            <div className="grid grid-cols-4 items-center gap-2 rounded-lg bg-background px-2 py-1">
              <MinimalButton Icon={TbReload} title={chat.retry_button_label} />
              <MinimalButton
                Icon={isCopy ? LuCopyCheck : LuCopy}
                title={chat.copy_button_label}
                onClick={() => handleCopy(prompt[promptIndexToShow])}
              />
              <MinimalButton
                Icon={TbBookmarks}
                title={chat.save_button_label}
              />
              <MinimalButton
                Icon={TbHighlight}
                title={chat.highlight_button_label}
                onClick={handleClickHighlight}
              />
            </div>
          </div>
        </div>
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
