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

interface IProps {
  histories: HistoryItem[];
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
  const [selectedItem, setSelectedItem] = useState<HistoryItem>();
  const [isOpenInfo, setIsOpenInfo] = useState(false);

  // check if mobile screen
  const isMd = useMediaQuery("(max-width:768px)");

  const handleClickItem = (history: HistoryItem) => {
    setSelectedItem(history);
    setIsOpenInfo(true);
  };

  // render main content
  const renderMain = () => (
    <>
      <h3 className="row mb-2 gap-1 border-b px-4 py-2.5 font-semibold text-primary">
        <TbHistory className={iconVariants({ size: "md" })} />
        {imageDictionary.history_title}
      </h3>
      <div className="col gap-2 p-5 md:p-2">
        {/*search input*/}
        <div className="w-ful bg-backgroundl relative">
          <Input
            type="search"
            className=" w-full bg-background ps-7 font-light"
            placeholder={search}
          />
          <TbSearch
            className={cn(
              "absolute start-2 top-1/2 -translate-y-1/2",
              iconVariants({ size: "md" }),
            )}
          />
        </div>
        {histories?.map(history => (
          <ImageHistoryItem
            onClick={() => handleClickItem(history)}
            history={history}
            key={history.id}
            isActive={history.id === selectedItem?.id}
          />
        ))}
      </div>
      <ImageHistoryInfo
        isOpen={isOpenInfo}
        setIsOpen={setIsOpenInfo}
        history={selectedItem!}
      />
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
