"use client";
import React, { useState } from "react";

import { BsBookmark } from "react-icons/bs";
import { FaRegTrashCan } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HistoryInfo } from "@/components/shared/HistoryInfo";
import HistoryInformationContent from "./HistoryInformationContent";
import { MinimalButton } from "@/components/shared";

import { useHistoryStore } from "@/stores/zustand/history-store";
import { cn } from "@/lib/utils";

import type { CodeHistoryItem } from "@/services/types";
import { useGetDictionary } from "@/hooks";

function DeletePopOver({ itemId }: { itemId: string }) {
  const {
    common: { delete_label },
  } = useGetDictionary();

  const [open, setOpen] = useState(false);

  const selectedHistoryItem = useHistoryStore.use.selectedHistoryItem();

  const isItemSelected = (id: string) => selectedHistoryItem?.id === id;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div>
          <MinimalButton
            Icon={FaRegTrashCan}
            title={delete_label}
            onClick={e => {
              e.stopPropagation();
              setOpen(true);
              console.log("deleted itemId: ", itemId);
            }}
            iconClassname={cn(
              "fill-muted-foreground-light",
              isItemSelected(itemId) && "fill-destructive",
            )}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="flex w-80 flex-col gap-4"
        collisionPadding={30}
      >
        <div>
          <h3 className="text-base font-semibold">Delete history item</h3>
          <p>Are you sure you want to delete this History?</p>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={e => {
              e.stopPropagation();
              setOpen(false);
            }}
          >
            Cancel
          </Button>

          <Button
            variant="outline"
            className="border bg-inherit text-destructive hover:border-destructive hover:bg-inherit hover:text-destructive"
            onClick={e => {
              e.stopPropagation();
              setOpen(false);
            }}
          >
            Delete
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

interface IProps {
  appName: string;
}
function CodeHistoryItems({ appName }: IProps) {
  const {
    common: { save_label },
  } = useGetDictionary();
  const selectedHistoryItem = useHistoryStore.use.selectedHistoryItem();
  const setSelectedHistoryItem = useHistoryStore.use.setSelectHistoryItem();
  const setOpenInfo = useHistoryStore.use.setHistoryInfoOpen();

  const isItemSelected = (id: string) => selectedHistoryItem?.id === id;

  const items = listOfHistoryItem.map(item => (
    <div
      key={item.id}
      className={cn(
        "flex w-full cursor-pointer flex-col gap-3 rounded-lg border p-2 transition-all hover:bg-muted-dark",
        isItemSelected(item.id) &&
          "border-primary bg-primary-light hover:bg-primary-light",
      )}
      onClick={() => {
        setSelectedHistoryItem(item);
        setOpenInfo(true);
      }}
    >
      {/*title and delete and bookmark button*/}
      <div className="flex w-full items-center justify-between">
        <span className=" text-muted-foreground">{item.title}</span>
        {/*delete and bookmark buttons*/}
        <div className="row">
          <MinimalButton
            title={save_label}
            onClick={e => {
              e.stopPropagation();
              console.log("bookmark itemId: ", item.id);
            }}
            Icon={BsBookmark}
            iconClassname={cn(
              "fill-muted-foreground-light",
              isItemSelected(item.id) && "fill-primary",
            )}
          />

          <DeletePopOver itemId={item.id} />
        </div>
      </div>

      {/*data and Text & upload*/}
      <div className="flex w-full flex-wrap items-center justify-start gap-x-8 gap-y-1 text-muted-foreground-light">
        <span className="whitespace-nowrap">{item.date}</span>
        <span className="whitespace-nowrap">{item.feature}</span>
      </div>
    </div>
  ));

  return (
    <>
      <div className="flex w-full flex-col items-center justify-start gap-3 overflow-y-auto">
        {items}
      </div>
      {/*info sheet that when a history item select then open*/}
      <HistoryInfo>
        <HistoryInformationContent />
      </HistoryInfo>
    </>
  );
}

export default CodeHistoryItems;

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
    id: String(i + 1),
    title: "history " + String(i + 1),
    date: "48 Min ago",
    feature: "Convert & Explanation",
    engine: engine[0],
    engineIcon: engine[1],
  };
});
