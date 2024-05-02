"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { MyTooltip, SelectEngine } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { ChatTools } from "./ChatTools";

import { useGetDictionary } from "@/hooks";
import { TbTools } from "react-icons/tb";
import { iconVariants } from "@/constants/variants";

/**
 * Chat settings component used in chat page
 * includes engine select and chat tools
 * @constructor
 */
export function ChatSettings() {
  const {
    page: { chat },
  } = useGetDictionary();
  
  return (
    <div className="spacing-row w-full !items-end pe-1 lg:ps-10">
      {/*engine select*/}
      <SelectEngine titleStyle="hidden" className="w-full max-w-[200px]" />
      {/*chat tools that shows in popover*/}
      <Popover>
        <MyTooltip title={chat.chat_tools_button_label}>
          <PopoverTrigger asChild>
            <Button
              className="fit mb-0 p-0.5 text-muted-foreground"
              variant="ghost"
            >
              <TbTools className={iconVariants({ size: "md" })} />
            </Button>
          </PopoverTrigger>
        </MyTooltip>
        <PopoverContent
          className="w-full max-w-72 p-0"
          side="top"
          sideOffset={8}
        >
          <ChatTools />
        </PopoverContent>
      </Popover>
    </div>
  );
}
