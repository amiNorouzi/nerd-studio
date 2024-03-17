"use client";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { LuCopy, LuCopyCheck } from "react-icons/lu";

import { UserAvatar } from "@/components/user";

import RenderIf from "@/components/shared/RenderIf";
import type { ChatItem } from "@/services/types";
import ActionButton from "./ActionButton";

import { useCopyTextInClipBoard, useGetDictionary } from "@/hooks";

/**
 * chat card component used in chat list
 * is for bot and user
 * show message and bot or user image and name
 * TODO: add markdown
 * @param chatItem chat item
 * @constructor
 */
function ChatCard({ chatItem }: { chatItem: ChatItem }) {
  const {
    page: { chat: chatDictionary },
  } = useGetDictionary();
  const [handleCopy, isCopied] = useCopyTextInClipBoard(); //for copy message to clipboard

  return (
    <div className="col group relative w-fit">
      {/* avatar and name*/}
      <div className="row gap-1.5 max-md:mb-2">
        <UserAvatar
          imageSrc={chatItem.image}
          name={chatItem.name}
          className="ms-0 h-5 w-5 md:-ms-8 md:h-7 md:w-7"
          fallbackClassname="text-xs"
        />
        <p className="text-sm font-semibold capitalize">{chatItem.name}</p>
      </div>
      {/* message*/}
      <div className="w-fit rounded-lg rounded-ss-none border bg-background p-4 font-normal leading-5 tracking-wide text-muted-foreground">
        {chatItem.message}
      </div>
      {/*
        action buttons
        in mobile show in bottom of card
        in desktop is hidden and show on hover on right bottom side of card
       */}
      <div
        className="row absolute ms-0.5 w-fit rounded-md border bg-background px-1 py-[3px]
       opacity-100 shadow-sm transition-opacity duration-200 max-lg:end-0 max-lg:top-full max-lg:mt-0.5 lg:bottom-0 lg:start-full
       lg:opacity-0 lg:group-hover:opacity-100"
      >
        <RenderIf isTrue={chatItem.isBot}>
          <ActionButton
            title={chatDictionary.speak_button_label}
            Icon={HiOutlineSpeakerWave}
          />
        </RenderIf>
        <ActionButton
          title={chatDictionary.copy_button_label}
          Icon={isCopied ? LuCopyCheck : LuCopy}
          onClick={() => handleCopy(chatItem.message)}
        />
      </div>
    </div>
  );
}

export default ChatCard;
