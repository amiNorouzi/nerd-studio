"use client";
import { TextareaHTMLAttributes } from "react";

import { LuCopy, LuCopyCheck } from "react-icons/lu";
import { TbMicrophone, TbTrash, TbVolume } from "react-icons/tb";

import { MinimalButton } from "@/components/shared/MinimalButtton";

import {
  useCopyTextInClipBoard,
  useGetDictionary,
  useSpeechToText,
  useTextToSpeech,
} from "@/hooks";

import { cn } from "@/lib/utils";

export interface ICustomTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
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
}: ICustomTextareaProps) {
  const {
    common: { copy },
    components: { custom_textarea: dictionary },
  } = useGetDictionary();
  //for copy value
  const [handleCopy, isCopied] = useCopyTextInClipBoard(); // for copy value
  const { handleToggleRecording, isRecording } = useSpeechToText({
    transcript: value as string,
    setTranscript: setValue,
  });
  const {
    handlePlaySpeak,
    handleStopSpeak,
    handlePauseSpeak,
    isPaused,
    isSpeaking,
  } = useTextToSpeech(value as string);

  return (
    <div className={cn("relative w-full", rootClassName)}>
      {/*voice input*/}
      {isRecording ? (
        <button
          onClick={handleToggleRecording}
          className=" absolute start-1.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-400 hover:bg-red-500 focus:outline-none"
        >
          <svg
            className="h-12 w-12 "
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="white" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        </button>
      ) : (
        <MinimalButton
          Icon={TbMicrophone}
          title={dictionary.voice_button_label}
          className="absolute start-1.5 top-2.5"
          onClick={handleToggleRecording}
        />
      )}

      {/*textarea*/}
      <textarea
        rows={8}
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
          Icon={TbTrash}
          title={dictionary.clear_button_label}
          onClick={() => setValue("")}
        />
        {isSpeaking ? (
          <button
            onClick={handleStopSpeak}
            className=" flex h-5 w-5 items-center justify-center rounded-full bg-red-400 hover:bg-red-500 focus:outline-none"
          >
            <svg
              className="h-12 w-12 "
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="white" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          </button>
        ) : (
          <MinimalButton
            Icon={TbVolume}
            title={dictionary.speak_button_label}
            onClick={handlePlaySpeak}
          />
        )}
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
