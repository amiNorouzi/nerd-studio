import React, { useState } from "react";
import Image from "next/image";

import { TbBookmarks, TbPin, TbTrash } from "react-icons/tb";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AudioPlayer, MinimalButton } from "@/components/shared";

import { useChatStore } from "@/stores/zustand/chat-store";
import { cn } from "@/lib/utils";

import type { ChatHistoryItem } from "@/stores/zustand/types";
import { useGetDictionary } from "@/hooks";

interface DeletePopoverProps {
  item: ChatHistoryItem;
}

/**
 * this component is a popover  for delete history item
 * @param item - history item
 * @constructor
 */
function DeletePopOver({ item }: DeletePopoverProps) {
  const [open, setOpen] = useState(false);
  const selectedHistoryItem = useChatStore.use.selectedHistoryItem();
  const {
    page: { chat },
  } = useGetDictionary();
  const isItemSelected = (id: string) => selectedHistoryItem?.id === id;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/*delete popover button to open popover*/}
      <PopoverTrigger asChild>
        <div>
          <MinimalButton
            Icon={TbTrash}
            iconClassname={isItemSelected(item.id) ? "text-destructive" : ""}
            onClick={e => {
              e.stopPropagation();
              setOpen(true);
              console.log("deleted itemId: ", item.id);
            }}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="flex w-80 flex-col gap-4"
        collisionPadding={30}
      >
        <div>
          <h3 className="text-base font-semibold">
            {chat.delete_history_item}
          </h3>
          <p>{chat.delete_history_description}</p>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={e => {
              e.stopPropagation();
              setOpen(false);
            }}
          >
            {chat.cancel}
          </Button>

          <Button
            variant="outline"
            className="border bg-inherit text-destructive hover:border-destructive hover:bg-inherit hover:text-destructive"
            onClick={e => {
              e.stopPropagation();
              setOpen(false);
            }}
          >
            {chat.delete}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

/**
 * this component is for history items
 * @constructor
 */
export function HistoryItems() {
  const selectedHistoryItem = useChatStore.use.selectedHistoryItem();
  const setSelectedHistoryItem = useChatStore.use.setSelectHistoryItem();
  const isItemSelected = (id: string) => selectedHistoryItem?.id === id;

  // list of history items
  const items = listOfHistoryItem.map(item => (
    <div
      key={item.id}
      className={cn(
        "flex w-full cursor-pointer flex-col gap-3 rounded-lg border bg-background p-2 transition-all hover:bg-muted-dark",
        isItemSelected(item.id) &&
          "border-primary bg-primary-light hover:bg-primary-light",
      )}
      onClick={() => setSelectedHistoryItem(item)}
    >
      {/*title and delete and bookmark button and pin*/}
      <div className="flex w-full items-center justify-between">
        <span className=" text-muted-foreground">{item.title}</span>
        {/*delete and bookmark buttons*/}
        <div className="flex items-center gap-1">
          <MinimalButton
            Icon={TbPin}
            iconClassname={isItemSelected(item.id) ? "text-primary" : ""}
          />
          <MinimalButton
            Icon={TbBookmarks}
            iconClassname={isItemSelected(item.id) ? "text-primary" : ""}
            onClick={e => {
              e.stopPropagation();
              console.log("bookmark itemId: ", item.id);
            }}
          />
          <DeletePopOver item={item} />
        </div>
      </div>

      {/*generated audio*/}
      {item.file && typeof item.file === "string" && (
        <AudioPlayer audioUrl={item.file} />
      )}
      {/* generated images */}
      {item.file && Array.isArray(item.file) && (
        <div className="grid grid-cols-4 gap-4 ">
          {item.file.map((file, index) => (
            <div
              key={index}
              className="relative h-12 w-12 self-center overflow-hidden  rounded-lg"
            >
              <Image src={file} alt={file} fill sizes="100%" />
            </div>
          ))}
        </div>
      )}
      {/*description*/}
      {!item.file && <p className="line-clamp-2">{item.description}</p>}
      {/*data and Text & upload*/}
      <div className="flex w-full items-center justify-end gap-8 text-muted-foreground-light">
        <span>48 Min ago</span>
      </div>
    </div>
  ));

  return (
    <div className="flex w-full flex-col items-center justify-start gap-3 overflow-y-auto">
      {items}
    </div>
  );
}

// mock data
const randomIndex = (): number => Math.floor(Math.random() * 5);
const randomEngine = () => Object.entries(engines)[randomIndex()];
const engines = {
  "GPT-3.5 Turbo": "/images/gpt.jpeg",
  "GPT-4 Turbo": "/images/gpt.jpeg",
  "Claude-instant": "/images/cloude.png",
  "Claude-2": "/images/cloude.png",
  "Gemini Pro": "/images/gemni.jpeg",
};

const listOfHistoryItem = Array.from({ length: 20 }, (v, i) => {
  const engine = randomEngine();
  return {
    id: String(i),
    title: "history " + String(i),
    prompt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    question:
      "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?",
    engine: engine[0],
    engineIcon: engine[1],
    timeline: "48 Min ago",
    file:
      randomIndex() === 0
        ? undefined
        : randomIndex() % 2 === 0
          ? "/testMusic/background-music-for-short-video-hip-hop-beat-piano-and-cello-30-sec-192914.mp3"
          : [
              "/images/generateds/1.webp",
              "/images/generateds/3.webp",
              "/images/generateds/5.webp",
              "/images/generateds/6.webp",
            ],
  };
});
