"use client";

import ImageHistoryItem from "./ImageHistoryItem";

import { useGetDictionary } from "@/hooks";

import type { HistoryItem, StateSetterType } from "@/services/types";
import { useMediaQuery } from "usehooks-ts";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FiSearch } from "react-icons/fi";

interface IProps {
  histories: HistoryItem[];
  isOpenMobileImageHistory: boolean;
  setIsOpenMobileImageHistory: StateSetterType<boolean>;
}

function ImageHistory({
  histories,
  setIsOpenMobileImageHistory,
  isOpenMobileImageHistory,
}: IProps) {
  const {
    common: { search },
    page: { image: imageDictionary },
  } = useGetDictionary();

  const isMd = useMediaQuery("(max-width:768px)");

  const renderMain = () => (
    <>
      <h3 className="mb-2 border-b px-4 py-2.5 font-semibold">
        {imageDictionary.history_title}
      </h3>
      <div className="col gap-2 p-5 md:p-2">
        {/*search input*/}
        <div className="relative w-full">
          <Input
            type="search"
            className=" w-full bg-muted ps-7 font-light"
            placeholder={search}
          />
          <FiSearch
            size="1rem"
            className="absolute start-2 top-1/2 -translate-y-1/2"
          />
        </div>
        {histories?.map(history => (
          <ImageHistoryItem
            history={history}
            key={history.id}
            isActive={history.id === "1"}
          />
        ))}
      </div>
    </>
  );

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
