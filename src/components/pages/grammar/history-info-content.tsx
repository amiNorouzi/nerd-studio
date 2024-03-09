"use client";
import React from "react";
import { useHistoryStore } from "@/stores/zustand/history-store";
import { MinimalButton } from "@/components/shared";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { LuCopy, LuCopyCheck } from "react-icons/lu";
import {
  useCopyTextInClipBoard,
  useGetDictionary,
  useTextToSpeech,
} from "@/hooks";

export function HistoryInfoContent() {
  const selectedHistoryItem = useHistoryStore.use.selectedHistoryItem();
  const [handleCopy, isCopied] = useCopyTextInClipBoard(); // for copy value
  const { handlePlaySpeak, handleStopSpeak, isSpeaking } = useTextToSpeech(
    selectedHistoryItem?.question ?? "",
  );
  const {
    common: { copy },
    components: { custom_textarea: dictionary },
  } = useGetDictionary();
  return (
    <div className="grid gap-9 ">
      {/* show prompt and inputs*/}
      <div className="grid items-start gap-3">
        <span>Include your text here to check</span>
        <div className="relative">
          <textarea
            defaultValue={selectedHistoryItem?.question}
            className="w-full  rounded-md border border-black px-4 py-1 pb-8"
            rows={8}
            disabled
          />
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
              onClick={() => handleCopy(selectedHistoryItem?.question ?? "")}
            />
          </div>
        </div>
      </div>

      {/*show tags*/}
      <div className="grid items-start gap-3">
        <span>Tags</span>
        <div className="flex flex-wrap gap-1">
          {tags.map(tag => (
            <span
              className="rounded-md bg-muted p-3 text-muted-foreground"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const tags = [
  "tag1",
  "tag2",
  "tag3",
  "tag4",
  "tag5",
  "Email",
  "Message",
  "Phone",
  "Comment",
  "Twitter",
  "Blog Post",
];
