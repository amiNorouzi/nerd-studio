"use client";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { TbSearch } from "react-icons/tb";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";

import { useHistoryStore } from "@/stores/zustand/history-store";

import { useGetDictionary } from "@/hooks";
import { cn } from "@/lib/utils";

interface IProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
}

/**
 * this component is a wrapper for history content(history items)
 * @param children - history items
 * @param className
 * @param props
 * @constructor
 */
export function HistoryBox({ children, className, ...props }: IProps) {
  const searchValue = useHistoryStore.use.historySearch();
  const isHistoryOpen = useHistoryStore.use.isHistoryOpen();
  const setSearch = useHistoryStore.use.setHistorySearch();
  const setHistoryIsOpen = useHistoryStore.use.setHistoryIsOpen();
  const [isDesktop, setIsDesktop] = useState<undefined | boolean>(undefined);

  useEffect(() => {
    setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
  }, []);
  
  const {
    components: { history_box },
  } = useGetDictionary();

  const header = (
    <>
      {/*header and search section*/}
      <div className="sticky top-0 flex w-full flex-col gap-4 bg-muted  pt-4">
        {/* <div className=" flex w-full items-center justify-between border-b py-1.5">
          <div className="flex items-center justify-start gap-1 text-sm font-medium text-primary">
            <TbHistory className={iconVariants({ size: "md" })} />
            {history_box.history_title}
          </div>
        </div> */}
        <div className="flex  h-[44px] w-full items-center justify-center gap-1.5 rounded-lg  p-2">
          <div className="flex h-[44px] w-full items-center justify-center gap-1.5 rounded-lg bg-background p-2">
            <TbSearch className="text-[20px] font-[800] text-[#747474]" />
            <Input
              value={searchValue}
              onChange={e => setSearch(e.target.value)}
              type="search"
              placeholder={history_box.history_search_placeholder}
              className="border-none bg-background px-0 outline-none ring-0"
            />
          </div>
          <div>
            <Button
              onClick={() => setHistoryIsOpen(false)}
              variant="ghost"
              className="fit p-1"
            >
              <IoMdClose className="text-[#747474]" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );

  if (isDesktop) {
    return (
      <div
        className={cn(
          "flex h-full w-0 max-w-0 basis-0 flex-col items-center  justify-start   gap-4 divide-y bg-muted opacity-0 transition-all duration-300",
          isHistoryOpen &&
            " w-fit max-w-[300px] basis-3/4  p-[18px] pt-0 opacity-100 xl:basis-1/2 ",
          className,
        )}
        {...props}
      >
        {header}
        {/*content*/}
        <div className="w-full overflow-y-auto overflow-x-hidden pt-3 px-1">
          {children}
        </div>
      </div>
    );
  }

  return (
    <Drawer open={isHistoryOpen} onOpenChange={setHistoryIsOpen}>
      <DrawerContent className="max-h-[90dvh] gap-2 bg-muted p-2 ">
        {header}
        {children}
      </DrawerContent>
    </Drawer>
  );
}
