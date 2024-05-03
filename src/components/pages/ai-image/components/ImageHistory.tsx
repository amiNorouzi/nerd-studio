"use client";

import { useMediaQuery } from "usehooks-ts";

import ImageHistoryItem from "./ImageHistoryItem";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";

import { useGetDictionary } from "@/hooks";

import type { HistoryItem, StateSetterType } from "@/services/types";
import { TbHistory, TbSearch } from "react-icons/tb";
import React, { useState } from "react";
import ImageHistoryInfo from "@/components/pages/ai-image/components/ImageHistoryInfo";
import { iconVariants } from "@/constants/variants";
import { cn } from "@/lib/utils";
import { useFavorites, useSetFavorites } from "@/services/favorite-history";
import { usePinHistory, useSetPinHistory } from "@/services/pin-history";
import { useHistories } from "@/services/history";

interface IProps {
  histories: Answer[];
  isOpenMobileImageHistory: boolean;
  setIsOpenMobileImageHistory: StateSetterType<boolean>;
}

/**
 * responsive ImageHistory component
 *used in ImagePage result section
 * it's a list of ImageHistoryItem
 * render drawer in mobile and sidebar in desktop
 * @param histories list of HistoryItem
 * @param setIsOpenMobileImageHistory - set state to open/close mobile drawer
 * @param isOpenMobileImageHistory - state to open/close mobile drawer
 * @constructor
 */
function ImageHistory({
  histories,
  setIsOpenMobileImageHistory,
  isOpenMobileImageHistory,
}: IProps) {
  const {
    common: { search },
    page: { image: imageDictionary },
  } = useGetDictionary();
  const [selectedItem, setSelectedItem] = useState<Answer>();
  const [isOpenInfo, setIsOpenInfo] = useState(false);

  // check if mobile screen
  const isMd = useMediaQuery("(max-width:768px)");
  const { data: favoriteItems } = useFavorites();
  const { data: pinItems } = usePinHistory();

  const { data: historyItems } = useHistories({ pageNumber: 1 });
  const handleClickItem = (history: Answer) => {
    setSelectedItem(history);
    setIsOpenInfo(true);
  };
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
  // render main content
  const renderMain = () => (
    <>
      <div className="col gap-2 p-5 md:p-2">
        {/*search input*/}

        {historyItems &&
          historyItems.answers &&
          sortAnswers(historyItems.answers)
            .filter(
              item =>
                item.app_type === "text_to_image" ||
                item.app_type === "image_to_image" ||
                item.app_type === "image_upscale",
            )
            .map(history => (
              <ImageHistoryItem
                onClick={() => {}}
                history={history}
                key={history.id}
                isActive={history.id === selectedItem?.id}
                favorite={favoriteCheck(history.id)}
                pin={pinCheck(history.id)}
              />
            ))}
      </div>
      {/*<ImageHistoryInfo*/}
      {/*  isOpen={isOpenInfo}*/}
      {/*  setIsOpen={setIsOpenInfo}*/}
      {/*  history={selectedItem!}*/}
      {/*/>*/}
    </>
  );

  // render drawer in mobile and sidebar in desktop
  if (isMd)
    return (
      <Drawer
        open={isOpenMobileImageHistory}
        onOpenChange={setIsOpenMobileImageHistory}
      >
        <DrawerContent>{renderMain()}</DrawerContent>
      </Drawer>
    );

  return (
    <div className="col !h-full w-64 min-w-48 bg-muted">{renderMain()}</div>
  );
}

export default ImageHistory;
