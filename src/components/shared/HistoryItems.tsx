"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaRegTrashCan, FaRegBookmark } from "react-icons/fa6";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useHistoryStore } from "@/stores/zustand/history-store";
import { cn } from "@/lib/utils";
import type { HistoryItem } from "@/stores/zustand/types";
import { useGetDictionary } from "@/hooks";
import { useHistories } from "@/services/history";

interface DeletePopoverProps {
  item: HistoryItem;
}

/**
 * this component is a popover for delete history item
 * @param item - history item
 * @constructor
 */
function DeletePopOver({ item }: DeletePopoverProps) {
  const [open, setOpen] = useState(false);
  const selectedHistoryItem = useHistoryStore.use.selectedHistoryItem();
  const {
    components: { history_items },
  } = useGetDictionary();
  const isItemSelected = (id: number) => selectedHistoryItem?.id === id;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-fit w-fit p-1 transition-all hover:scale-110"
          onClick={e => {
            e.stopPropagation();
            setOpen(true);
            console.log("deleted itemId: ", item.id);
          }}
        >
          <FaRegTrashCan
            className={cn(
              "fill-muted-foreground-light",
              isItemSelected(item.id) && "fill-destructive",
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="flex w-80 flex-col gap-4"
        collisionPadding={30}
      >
        <div>
          <h3 className="text-base font-semibold">
            {history_items.delete_title}
          </h3>
          <p>{history_items.delete_description}</p>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={e => {
              e.stopPropagation();
              setOpen(false);
            }}
          >
            {history_items.cancel}
          </Button>

          <Button
            variant="outline"
            className="border bg-inherit text-destructive hover:border-destructive hover:bg-inherit hover:text-destructive"
            onClick={e => {
              e.stopPropagation();
              setOpen(false);
            }}
          >
            {history_items.delete}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

interface IProps {
  appName: string;
  historyItems?:
    | {
        answers: {
          answer_text: string;
          app_type: string;
          created_at: string;
          id: number;
          uuid: string;
        }[];
      }
    | undefined;
}

/**
 * this component is a list of history items
 * @param appName
 * @constructor
 */
export function HistoryItems({ appName, historyItems }: IProps) {
  const setSelectHistoryItem = useHistoryStore.use.setSelectHistoryItem();
  const selectedHistoryItem = useHistoryStore.use.selectedHistoryItem();
  const setHistoryInfoOpen = useHistoryStore.use.setHistoryInfoOpen();
  const isItemSelected = (id: number) => selectedHistoryItem?.id === id;
  const setGrammarHistoryIsOpen = useHistoryStore.use.setGrammarHistoryIsOpen();

  //fetch history

  const items =
    historyItems &&
    historyItems.answers &&
    historyItems.answers
      .filter(item => item.app_type === "grammar")
      .map(item => (
        <div
          key={item.id}
          className={cn(
            "flex w-full cursor-pointer flex-col gap-3 rounded-lg border p-2 transition-all hover:bg-muted-dark",
            isItemSelected(item.id) &&
              "border-primary bg-primary-light hover:bg-primary-light",
          )}
          onClick={() => {
            setSelectHistoryItem(item);
            setGrammarHistoryIsOpen(true);
          }}
        >
          {/*title and delete and bookmark button*/}
          <div className="flex w-full items-center justify-between">
            <span className=" truncate text-muted-foreground">
              {item.answer_text}
            </span>
            {/*delete and bookmark buttons*/}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className=" h-fit w-fit p-1 transition-all hover:scale-110"
              >
                <FaRegBookmark
                  className={cn(
                    "fill-muted-foreground-light",
                    isItemSelected(item.id) && "fill-primary",
                  )}
                  onClick={e => {
                    e.stopPropagation();
                    console.log("bookmark itemId: ", item.id);
                  }}
                />
              </Button>
              <DeletePopOver item={item} />
            </div>
          </div>
          {/*data and Text & upload*/}
          <div className="flex w-full items-center justify-start gap-8 text-muted-foreground-light">
            <span>48 Min ago</span>
            <span>Text & Upload doc</span>
          </div>
          {/*description*/}
          <p className="line-clamp-2">{item.answer_text}</p>
        </div>
      ));

  return (
    <div className="flex w-full flex-col items-center justify-start gap-3 overflow-y-auto">
      {items}
    </div>
  );
}

// this is test data for history items
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
    date: "",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    question:
      "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?",
    engine: engine[0],
    engineIcon: engine[1],
  };
});
