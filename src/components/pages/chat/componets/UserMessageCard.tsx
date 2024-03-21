"use client";

import { useState } from "react";
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Copy,
  Edit,
  Speaker,
  Stop,
} from "@/components/svg-icons";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user";
import { MyTooltip } from "@/components/shared";
import {
  useCopyTextInClipBoard,
  useGetDictionary,
  useTextToSpeech,
} from "@/hooks";
import { cn } from "@/lib/utils";

interface IProps {
  image: string;
  name: string;
  prompt: string[];
  timeLine: string;
  id: string;
  role: string;
}

/**
 * in this component we show user message card
 * @param timeLine time line of message
 * @param prompt prompt of message
 * @param image user image
 * @param name user name
 * @constructor
 */
export function UserMessageCard({ timeLine, prompt, image, name }: IProps) {
  const [promptIndexToShow, setPromptIndexToShow] = useState(0);
  const [isEditPrompt, setIsEditPrompt] = useState(false);
  const { handleToggleSpeak, isSpeaking } = useTextToSpeech(
    prompt[promptIndexToShow],
  );
  const [handleCopy, isCopy] = useCopyTextInClipBoard();

  const {
    page: { chat },
  } = useGetDictionary();

  return (
    <div className="flex flex-col items-end gap-2 lg:flex-row-reverse lg:items-start lg:gap-4 lg:ps-[67px]">
      {/*user image*/}
      <UserAvatar
        imageSrc={image ?? "/images/logo.png"}
        name={name ?? ""}
        className="h-[37px] w-[37px] lg:h-[51px] lg:w-[51px]"
        fallbackClassname="text-xs"
      />

      <div className="col items-end">
        {/*content box*/}
        <div className="col gap-4 rounded-lg  border px-4 py-3">
          {/*speaker icon and prompt*/}
          <div className="flex gap-3 ">
            <MyTooltip title={chat.speak_button_label}>
              <Button
                className={cn(
                  "fit   p-0 transition-all",
                  isSpeaking &&
                    "scale-110  rounded-full bg-white p-2 shadow shadow-primary",
                )}
                variant="ghost"
                onClick={handleToggleSpeak}
              >
                <Speaker
                  className={cn(
                    " fill-muted-foreground-light transition-all",
                    isSpeaking && "fill-primary-dark",
                  )}
                />
              </Button>
            </MyTooltip>
            {/*prompt*/}
            <p
              // when user click on edit button we make prompt editable
              contentEditable={isEditPrompt}
              className="focus:ouline-none border-none text-sm outline-none lg:text-lg"
            >
              {prompt[promptIndexToShow]}
            </p>
          </div>

          {/* footer icon and time*/}
          <div className="flex">
            {/*if user click on edit button we show save and cancel button else we show copy, save and edit button*/}
            {isEditPrompt ? (
              <div className="flex w-full justify-center gap-3 ">
                <Button onClick={() => setIsEditPrompt(false)}>
                  Save & Submit
                </Button>
                <Button
                  onClick={() => setIsEditPrompt(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <>
                {/*timeline that will be replaced with real data and reformat*/}
                <span className="me-auto text-xs text-muted-foreground-light">
                  {timeLine}
                </span>
                {/*action buttons like:copy, save, edit*/}
                <div className="grid grid-cols-3 items-center gap-3 rounded-lg bg-muted p-2">
                  <MyTooltip title={chat.copy_button_label}>
                    <Button
                      className={cn("fit p-0", isCopy && "bg-primary-light")}
                      variant="ghost"
                      onClick={() => handleCopy(prompt[promptIndexToShow])}
                    >
                      <Copy
                        className={cn(
                          "fill-muted-foreground-light",
                          isCopy && "fill-primary-dark",
                        )}
                      />
                    </Button>
                  </MyTooltip>
                  <MyTooltip title={chat.save_button_label}>
                    <Button
                      className={cn("fit group p-0 active:bg-primary-light")}
                      variant="ghost"
                    >
                      <Bookmark
                        className={cn(
                          "fill-muted-foreground-light group-active:fill-primary-dark",
                        )}
                      />
                    </Button>
                  </MyTooltip>
                  <MyTooltip title={chat.edit_button_label}>
                    <Button
                      className="fit p-0"
                      variant="ghost"
                      onClick={() => setIsEditPrompt(true)}
                    >
                      <Edit />
                    </Button>
                  </MyTooltip>
                </div>
              </>
            )}
          </div>
        </div>
        {/*pagination*/}
        <div className="flex items-center gap-2 text-muted-foreground">
          <Button
            className="fit p-0"
            variant="ghost"
            onClick={() => setPromptIndexToShow(v => v - 1)}
            disabled={promptIndexToShow === 0}
          >
            <ChevronLeft />
          </Button>
          <span className="text-sm text-muted-foreground-light">{`${promptIndexToShow + 1}/${prompt.length}`}</span>
          <Button
            className="fit p-0"
            variant="ghost"
            onClick={() => setPromptIndexToShow(v => v + 1)}
            disabled={promptIndexToShow === prompt.length - 1}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
