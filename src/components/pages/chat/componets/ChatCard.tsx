"use client";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { LuCopy, LuCopyCheck } from "react-icons/lu";

import { UserAvatar } from "@/components/user";
import { Button, type ButtonProps } from "@/components/ui/button";
import { MyTooltip } from "@/components/shared/myTooltip";

import type { IconType } from "react-icons";
import type { ChatItem } from "@/services/types";
import { useCopyTextInClipBoard, useGetDictionary } from "@/hooks";
import RenderIf from "@/components/shared/RenderIf";

interface IActionButtonProps extends ButtonProps {
  title: string;
  Icon: IconType;
}

const ActionButton = ({ title, Icon, ...otherProps }: IActionButtonProps) => (
  <MyTooltip title={title}>
    <Button variant="ghost" className="fit p-0.5" {...otherProps}>
      <Icon size="0.9rem" />
    </Button>
  </MyTooltip>
);

function ChatCard({ chatItem }: { chatItem: ChatItem }) {
  const {
    page: { chat: chatDictionary },
  } = useGetDictionary();
  const [handleCopy, isCopied] = useCopyTextInClipBoard();

  return (
    <div className="col group relative w-fit">
      <div className="row gap-1.5 ">
        <UserAvatar
          imageSrc={chatItem.image}
          firstname={chatItem.firstname}
          lastname={chatItem.lastname}
          className="-ms-8 h-7 w-7"
          fallbackClassname="text-xs"
        />
        <p className="text-sm font-semibold">{`${chatItem.firstname} ${chatItem.lastname}`}</p>
      </div>
      <div className="w-fit rounded-lg rounded-ss-none border bg-background p-4 font-normal leading-5 tracking-wide text-muted-foreground">
        {chatItem.message}
      </div>
      <div
        className="row absolute ms-0.5 w-fit gap-0.5 rounded-md border bg-background px-1 py-[3px]
       opacity-100 shadow-sm transition-opacity duration-200 max-lg:end-0 max-lg:top-full max-lg:mt-0.5 lg:bottom-0 lg:start-full
       lg:opacity-0 lg:group-hover:opacity-100"
      >
        <RenderIf isTrue={chatItem.isBot}>
          <ActionButton
            title={chatDictionary.speak_button_label}
            Icon={HiOutlineSpeakerWave}
          />
          <div className="vr h-4" />
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
