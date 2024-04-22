"use client";
import React from "react";
import Image from "next/image";
import { IoMdInformationCircleOutline } from "react-icons/io";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { dirInLocalStorage } from "@/stores/browser-storage";
import { useHistoryStore } from "@/stores/zustand/history-store";
import { Separator } from "@/components/ui/separator";
import { useGetDictionary } from "@/hooks";

interface IProps {
  children: React.ReactNode;
}

/**
 * this component is a wrapper for history info content that open in a sheet
 * @param children - history info content
 * @constructor
 */
export function HistoryInfo({ children }: IProps) {
  const dir = dirInLocalStorage.get().dir ?? "ltr";
  const side = dir === "ltr" ? "right" : "left";
  const open = useHistoryStore.use.isHistoryInfoOpen();
  const onOpenChange = useHistoryStore.use.setHistoryInfoOpen();
  const engine = useHistoryStore.use.selectedHistoryItem()?.answer_text;
  const engineIcon = useHistoryStore.use.selectedHistoryItem()?.answer_text;
  const {
    components: { history_info },
  } = useGetDictionary();
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side={side} className="w-full max-w-[400px] sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex gap-2 text-sm font-medium text-primary">
            <IoMdInformationCircleOutline size={20} />
            {history_info.information_title}
          </SheetTitle>
        </SheetHeader>
        <Separator className="my-4" />
        {children}
        <SheetFooter className="mt-9 flex flex-row flex-nowrap gap-16">
          <SheetClose asChild>
            <Button
              variant="outline"
              className="flex w-1/2 justify-start gap-3 border-black disabled:opacity-100"
              disabled
            >
              <div className="relative h-5 w-5 overflow-hidden rounded-full">
                <Image src={engineIcon ?? ""} alt={engine ?? ""} fill />
              </div>
              {engine}
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button className="w-1/2" onClick={() => onOpenChange(false)}>
              {history_info.edit_prompt}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
