"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { MyTooltip, SelectEngine } from "@/components/shared";
import { Tools } from "@/components/svg-icons";
import { Button } from "@/components/ui/button";
import { ChatTools } from "./ChatTools";

import { useGetDictionary } from "@/hooks";

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
    <div className="spacing-row w-full items-end py-1.5 lg:ps-[62px]">
      {/*engine select*/}
      <SelectEngine titleStyle="hidden" className="w-full max-w-[200px]" />
      {/*chat tools that shows in popover*/}
      <Popover>
        <MyTooltip title={chat.chat_tools_button_label}>
          <PopoverTrigger asChild>
            <Button className="fit p-0" variant="ghost">
              <Tools />
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
