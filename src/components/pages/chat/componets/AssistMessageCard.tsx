"use client";

import { useState } from "react";
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Copy,
  Highlight,
  Reload,
  Speaker,
  Stop,
  ThumbDown,
  ThumbUp,
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

export function AssistMessageCard({ timeLine, prompt, image, name }: IProps) {
  const [promptIndexToShow, setPromptIndexToShow] = useState(0);
  const { handleToggleSpeak, isSpeaking } = useTextToSpeech(
    prompt[promptIndexToShow],
  );
  const [handleCopy, isCopy] = useCopyTextInClipBoard();
  const {
    page: { chat },
  } = useGetDictionary();
  return (
    <div className="flex flex-col  items-start gap-2 lg:flex-row  lg:gap-4 lg:pe-[67px]">
      {/*user image*/}
      <UserAvatar
        imageSrc={image ?? "/images/logo.png"}
        name={name ?? ""}
        className="h-[37px] w-[37px] lg:h-[51px] lg:w-[51px]"
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
                  "fit   p-0 transition-all ",
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
            <p className="text-sm lg:text-lg">{prompt[promptIndexToShow]}</p>
          </div>
          {/* footer icon and time*/}
          <div className="flex flex-row-reverse ">
            <div className="ms-auto flex items-center gap-3">
              <Button
                className={cn("fit group p-0 active:bg-primary-light")}
                variant="ghost"
              >
                <ThumbUp
                  className={cn(
                    "fill-muted-foreground-light group-active:fill-primary-dark",
                  )}
                />
              </Button>
              <Button
                className={cn("fit group p-0 active:bg-primary-light")}
                variant="ghost"
              >
                <ThumbDown
                  className={cn(
                    "fill-muted-foreground-light group-active:fill-primary-dark",
                  )}
                />
              </Button>
              <span className=" text-xs text-muted-foreground-light">
                {timeLine}
              </span>
            </div>
            <div className="grid grid-cols-4 items-center gap-3 rounded-lg bg-white p-2">
              <MyTooltip title={chat.retry_button_label}>
                <Button className="fit p-0" variant="ghost">
                  <Reload />
                </Button>
              </MyTooltip>
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
              <MyTooltip title={chat.copy_button_label}>
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
              <MyTooltip title={chat.highlight_button_label}>
                <Button className="fit p-0" variant="ghost">
                  <Highlight />
                </Button>
              </MyTooltip>
            </div>
          </div>
        </div>
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
