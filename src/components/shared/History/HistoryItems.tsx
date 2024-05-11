"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaRegTrashCan, FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HiArrowLongRight } from "react-icons/hi2";

import { useHistoryStore } from "@/stores/zustand/history-store";
import { cn } from "@/lib/utils";
import type { HistoryItem } from "@/stores/zustand/types";
import { useGetDictionary } from "@/hooks";
import { useHistories, useHistoryDelete } from "@/services/history";
import { BsPinAngle, BsPinAngleFill } from "react-icons/bs";
import { timePassedSince } from "@/lib/date-transform";
import { useFavorites, useSetFavorites } from "@/services/favorite-history";
import { usePinHistory, useSetPinHistory } from "@/services/pin-history";
import { BsFillPinAngleFill } from "react-icons/bs";
import { HistoryChild } from "@/components/shared/History/HistoryChild";

interface DeletePopoverProps {
  item: HistoryItem;
}

/**
 * this component is a popover for delete history item
 * @param item - history item
 * @constructor
 */
export function DeletePopOver({ item }: { item: Answer }) {
  const [open, setOpen] = useState(false);
  const selectedHistoryItem = useHistoryStore.use.selectedHistoryItem();

  const {
    components: { history_items },
  } = useGetDictionary();
  const isItemSelected = (id: number) => selectedHistoryItem?.id === id;
  const { mutate } = useHistoryDelete();
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
              mutate({ answerUuid: item.uuid });

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
 * @param historyItems
 * @constructor
 */
export function HistoryItems({ appName }: IProps) {
  const setSelectHistoryItem = useHistoryStore.use.setSelectHistoryItem();
  const selectedHistoryItem = useHistoryStore.use.selectedHistoryItem();
  const setHistoryInfoOpen = useHistoryStore.use.setHistoryInfoOpen();
  const isItemSelected = (id: number) => selectedHistoryItem?.id === id;
  const setGrammarHistoryIsOpen = useHistoryStore.use.setGrammarHistoryIsOpen();
  const { data: favoriteItems } = useFavorites();
  const { data: pinItems } = usePinHistory();
  const { data: toggleFavoriteAnswer, mutate: mutateFavoriteItems } =
    useSetFavorites();
  const { data: togglePinAnswer, mutate: mutatePinItems } = useSetPinHistory();
  const { data: historyItems } = useHistories({ pageNumber: 1 });

  //check if item is favorite or not
  const favoriteCheck = (id: number) => {
    if (!historyItems || !favoriteItems) return null;
    return favoriteItems.filter(item => item.id === id).length > 0;
  };
  //check if item is pinned

  const pinCheck = (id: number) => {
    if (!historyItems || !pinItems) return null;
    return pinItems.filter(item => item.id === id).length > 0;
  };

  //sort historyItems to set pin and fav on top

  const sortAnswers = (answers: Answer[]): Answer[] => {
    // Extract ids from pinnedAnswers and favoriteAnswers
    const pinnedIds = pinItems ? pinItems.map(answer => answer.id) : [];
    const favoriteIds = favoriteItems
      ? favoriteItems.map(answer => answer.id)
      : [];

    // Helper function to determine the sorting priority of an answer
    const getPriority = (answer: Answer): number => {
      if (pinnedIds.includes(answer.id)) return 1;
      if (favoriteIds.includes(answer.id)) return 2;
      return 3;
    };

    // Sorting function to compare two answers
    answers.sort((a, b) => {
      const priorityA = getPriority(a);
      const priorityB = getPriority(b);

      // If priorities are different, sort by priority
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }

      // If priorities are the same and additional criteria is needed, compare by id
      // or any other field, e.g., created_at
      return b.id - a.id; // Default tie breaker
    });

    return answers;
  };

  const items =
    historyItems &&
    historyItems.answers &&
    sortAnswers(historyItems.answers)
      .filter(item => item.app_type === appName)
      .map(item => (
        <div className='flex flex-col w-full' key={item.id}>


        <div

          className={cn(
            "flex min-h-[73px] w-full cursor-pointer flex-col gap-3 rounded-lg border  bg-white p-2 transition-all hover:bg-muted-dark",
            isItemSelected(item.id) &&
              " bg-primary-light hover:bg-primary-light",
          )}
          onClick={() => {
            setSelectHistoryItem(item);
            setGrammarHistoryIsOpen(true);
          }}
        >
          {/*title and delete and bookmark button*/}

          <div className="mt-1 flex w-full items-start  justify-between  px-2">
            {appName !== "translate" && (
              <span
                className={cn(
                  " w-[115px] truncate font-[400]",
                  isItemSelected(item.id) && " text-primary",
                )}
              >
                {item.answer_text}
              </span>
            )}{" "}
            {appName === "translate" && (
              <div className=" flex flex-col gap-2.5 ">
                <span
                  className={cn(
                    " w-[115px] truncate text-[12px] font-[400]",
                    isItemSelected(item.id) && " text-primary",
                  )}
                >
                  English to Persian
                </span>
                <div>
                  {" "}
                  <span className=" text-[#B9BAC0]"> text & upload doc</span>
                </div>
              </div>
            )}
            {/*delete and bookmark buttons*/}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className={` h-fit w-fit ${pinCheck(item.id) && "bg-[#F2EEFD]"} p-1 transition-all hover:scale-110`}
              >
                {pinCheck(item.id) && (
                  <BsFillPinAngleFill
                    className={cn("fill-primary")}
                    onClick={e => {
                      e.stopPropagation();

                      mutatePinItems({
                        answer_id: item.id,
                        is_pinned: false,
                      });
                    }}
                  />
                )}
                {!pinCheck(item.id) && (
                  <BsPinAngle
                    className={cn("fill-muted-foreground-light")}
                    onClick={e => {
                      e.stopPropagation();

                      mutatePinItems({
                        answer_id: item.id,
                        is_pinned: true,
                      });
                    }}
                  />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className=" h-fit w-fit p-1 transition-all hover:scale-110"
              >
                {favoriteCheck(item.id) && (
                  <FaBookmark
                    className={cn("fill-primary")}
                    onClick={e => {
                      e.stopPropagation();

                      mutateFavoriteItems({
                        answer_id: item.id,
                        is_favorite: false,
                      });
                    }}
                  />
                )}
                {!favoriteCheck(item.id) && (
                  <FaRegBookmark
                    className={cn("fill-muted-foreground-light")}
                    onClick={e => {
                      e.stopPropagation();

                      mutateFavoriteItems({
                        answer_id: item.id,
                        is_favorite: true,
                      });
                    }}
                  />
                )}
              </Button>

              <DeletePopOver item={item} />
            </div>
          </div>
          {/*data and Text & upload*/}
          {/* <div className="flex w-full items-center justify-start gap-8 text-muted-foreground-light">
            <span>48 Min ago</span>
            <span>Text & Upload doc</span>
          </div> */}
          {/*description*/}
          <div className="mt-1 line-clamp-2 flex flex-row items-center  justify-between  px-2">
            {appName === "grammar" && (
              <div className="flex flex-row items-center">
                <p className="mx-1 text-[#B9BAC0]"> Spell </p>
                <HiArrowLongRight className="text-[#B9BAC0]" />{" "}
                <p className="mx-1 "> Your </p>
              </div>
            )}
            {appName === "translate" && (
              <span
                className={cn(
                  " mb-1 w-[115px] truncate font-[400]",
                  isItemSelected(item.id) && " text-primary",
                )}
              >
                {item.answer_text}
              </span>
            )}{" "}
            {appName === "ai_writer" && (
              <span
                className={cn(
                  " w-[115px] truncate font-[400] text-[#B9BAC0]",
                  isItemSelected(item.id) && " text-primary",
                )}
              >
                English
              </span>
            )}{" "}
            {appName === "code" && (
              <span
                className={cn(
                  " w-[115px] truncate font-[400] text-[#B9BAC0]",
                  isItemSelected(item.id) && " text-primary",
                )}
              >
                Convert and explanation
              </span>
            )}
            <div className={`${appName === "translate" && "mb-1 "}`}>
              {" "}
              <span className="text-[#B9BAC0]">
                {" "}
                {timePassedSince(item.created_at)}
              </span>
            </div>
          </div>
        </div>
          <HistoryChild uuid={item.uuid} mainAnswer={item.answer_text}/>
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
