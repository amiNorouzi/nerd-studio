"use client";
import React from "react";
import { IoMdClose, IoIosSearch } from "react-icons/io";
import { GoHistory } from "react-icons/go";
import { useMediaQuery } from "usehooks-ts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

import { useHistoryStore } from "@/stores/zustand/history-store";

import { cn } from "@/lib/utils";

interface IProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
}
export function HistoryBox({ children, className, ...props }: IProps) {
  const searchValue = useHistoryStore.use.historySearch();
  const isHistoryOpen = useHistoryStore.use.isHistoryOpen();
  const setSearch = useHistoryStore.use.setHistorySearch();
  const setHistoryIsOpen = useHistoryStore.use.setHistoryIsOpen();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const header = (
    <>
      {/*header and search section*/}
      <div className="sticky top-0 flex w-full flex-col gap-4 bg-muted">
        <div className=" flex w-full items-center justify-between">
          <div className="flex items-center justify-start gap-1 text-sm font-medium text-primary">
            <GoHistory className="fill-primary stroke-primary" size={20} />
            History
          </div>
          <div>
            <Button
              onClick={() => setHistoryIsOpen(false)}
              variant="ghost"
              size="icon"
            >
              <IoMdClose size={20} />
            </Button>
          </div>
        </div>
        <div className="flex h-[44px] w-full items-center justify-center gap-1 rounded bg-white p-2">
          <IoIosSearch size={20} />
          <Input
            value={searchValue}
            onChange={e => setSearch(e.target.value)}
            type="search"
            placeholder="Search"
            className="border-none bg-white px-0 outline-none ring-0"
          />
        </div>
      </div>
    </>
  );
  if (isDesktop) {
    return (
      <div
        className={cn(
          " flex h-full  w-0 basis-0 flex-col  items-center justify-start  gap-4   divide-y bg-muted p-3 pt-0 opacity-0",
          isHistoryOpen && "w-fit basis-3/4 opacity-100 xl:basis-1/2",
          className,
        )}
        {...props}
      >
        {header}
        {/*content*/}
        <div className="w-full overflow-y-auto overflow-x-hidden pt-3">
          {children}
        </div>
      </div>
    );
  }

  return (
    <Drawer open={isHistoryOpen} onOpenChange={setHistoryIsOpen}>
      <DrawerContent className="max-h-96 gap-2 bg-muted p-2">
        {header}
        {children}
      </DrawerContent>
    </Drawer>
  );
}
