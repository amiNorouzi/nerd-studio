"use client";
import { TextareaHTMLAttributes } from "react";

import { PiMicrophone } from "react-icons/pi";
import type { IconType } from "react-icons";

import { Button, ButtonProps } from "@/components/ui/button";
import { MyTooltip } from "@/components/shared/myTooltip";

import { useCopyTextInClipBoard, useGetDictionary } from "@/hooks";

import { cn } from "@/lib/utils";
import { MdDeleteOutline } from "react-icons/md";
import { LuCopy, LuCopyCheck } from "react-icons/lu";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { MinimalButton } from "@/components/shared/MinimalButtton";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number;
  rootClassName?: string;
  setValue: (value: string) => void;
  renderMoreActions?: () => JSX.Element;
}

/**
 * Custom textarea component with voice, clear, speak, copy and more actions
 * used for prompts and other textarea
 * @param maxLength - max length of textarea
 * @param value - value of textarea
 * @param className - additional class name for textarea
 * @param setValue - state setter for value
 * @param rootClassName - additional class name for root div
 * @param renderMoreActions - render more actions
 * @param rows - number of rows
 * @param props - other textarea props
 * @constructor
 */
export function CustomTextarea({
  maxLength,
  value,
  className,
  setValue,
  rootClassName,
  rows = 8,
  renderMoreActions,
  ...props
}: IProps) {
  const {
    common: { copy },
    components: { custom_textarea: dictionary },
  } = useGetDictionary();
  //for copy value
  const [handleCopy, isCopied] = useCopyTextInClipBoard(); // for copy value

  return (
    <div className={cn("relative w-full", rootClassName)}>
      {/*voice input*/}
      <MinimalButton
        Icon={PiMicrophone}
        title={dictionary.voice_button_label}
        className="absolute start-1.5 top-2.5"
      />

      {/*textarea*/}
      <textarea
        rows={rows}
        className={cn(
          "mb-0 w-full rounded-lg border bg-muted px-[26px] pb-6 pt-2 outline-none ring-0 first-line:pl-4 focus:border-primary focus:bg-background",
          className,
        )}
        value={value}
        onChange={e => setValue?.(e.target.value)}
        maxLength={maxLength}
        {...props}
      />

      {/*action buttons*/}
      <div className="row absolute bottom-8 end-4 gap-1">
        <MinimalButton
          Icon={MdDeleteOutline}
          title={dictionary.clear_button_label}
          onClick={() => setValue("")}
        />
        <MinimalButton
          Icon={HiOutlineSpeakerWave}
          title={dictionary.speak_button_label}
        />
        <MinimalButton
          Icon={isCopied ? LuCopyCheck : LuCopy}
          title={copy}
          onClick={() => handleCopy(value!.toString())}
        />
        {!!renderMoreActions && renderMoreActions()}
      </div>
      {/*character count*/}
      <span className="text-xs text-muted-foreground">
        {value?.toString().length}/{maxLength}
      </span>
    </div>
  );
}
