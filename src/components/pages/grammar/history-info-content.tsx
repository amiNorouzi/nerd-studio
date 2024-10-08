"use client";
import React, { useEffect, useState } from "react";
import { useHistoryStore } from "@/stores/zustand/history-store";
import { MinimalButton } from "@/components/shared";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { LuCopy, LuCopyCheck } from "react-icons/lu";
import {
  useCopyTextInClipBoard,
  useGetDictionary,
  useTextToSpeech,
} from "@/hooks";
import { cn } from "@/lib/utils";
import { SelectGrammarLanguage } from "@/components/shared/run-tab-for-app/form-section-components/select-grammar-language";
import GrammarInputDiv from "./InputDiv";

interface DivWrapperProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
}
function DivWrapper({ children, className, ...otherProps }: DivWrapperProps) {
  return (
    <div
      className={cn(
        "flex h-10 items-center justify-start rounded-md border border-black px-4 py-1",
        className,
      )}
      {...otherProps}
    >
      {children}
    </div>
  );
}
export function HistoryInfoContent({
  onTextAreaChange,
  appName,
}: {
  onTextAreaChange: (value: string) => void;
  appName?: string;
}) {
  const selectedHistoryItem = useHistoryStore.use.selectedHistoryItem();
  const [handleCopy, isCopied] = useCopyTextInClipBoard(); // for copy value
  const { handlePlaySpeak, handleStopSpeak, isSpeaking } = useTextToSpeech(
    selectedHistoryItem?.answer_text ?? "",
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const {
    common: { copy },
    components: { custom_textarea: dictionary },
    page: { grammar, translate },
  } = useGetDictionary();
  useEffect(() => {
    onTextAreaChange(selectedHistoryItem?.answer_text as string);
  }, [onTextAreaChange, selectedHistoryItem]);
  return (
    <div className="form-gap grid ">
      {/* show selected language*/}

      <SelectGrammarLanguage />

      {/* show prompt and inputs*/}
      <div className="grid items-start gap-label-space">
        <span className={cn("text-sm font-medium")}>
          {translate.text_label}
        </span>
        <div className="relative">
          <GrammarInputDiv onTextChange={onTextAreaChange} />

          <div className="row  absolute bottom-4 end-4 gap-1 bg-white">
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
                Icon={HiOutlineSpeakerWave}
                title={dictionary.speak_button_label}
                onClick={handlePlaySpeak}
              />
            )}
            <MinimalButton
              Icon={isCopied ? LuCopyCheck : LuCopy}
              title={copy}
              onClick={() => handleCopy(selectedHistoryItem?.answer_text ?? "")}
            />
          </div>
        </div>
      </div>
      {/*show options*/}
      <div className="grid grid-cols-2 gap-16">
        <div className="grid items-start gap-label-space">
          <span className={cn("text-sm font-medium")}>
            {translate.tone_label}
          </span>
          <DivWrapper>1024 x 1024px</DivWrapper>
        </div>
        <div className="grid items-start gap-label-space">
          <span className={cn("text-sm font-medium")}>
            {translate.style_label}
          </span>
          <DivWrapper>Anime</DivWrapper>
        </div>
      </div>
      {/*show url or file*/}

      {/*show tags*/}
      {appName !== "grammar" && (
        <div className="grid items-start gap-label-space">
          <span className={cn("text-sm font-medium")}>{translate.tags}</span>
          <div className="flex flex-wrap gap-1">
            {tags.map(tag => (
              <span
                className={cn(
                  "cursor-pointer rounded-md bg-muted p-3 text-muted-foreground",
                  selectedTags.includes(tag) && "bg-primary text-muted-dark",
                )}
                key={tag}
                onClick={() => {
                  if (selectedTags.includes(tag)) {
                    const filtered = selectedTags.filter(item => item !== tag);
                    setSelectedTags(filtered);
                  } else {
                    setSelectedTags(prev => [...prev, tag]);
                  }
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const tags = [
  "Email",
  "Message",
  "Phone",
  "Comment",
  "Twitter",
  "Blog Post",
  "Outline",
];
