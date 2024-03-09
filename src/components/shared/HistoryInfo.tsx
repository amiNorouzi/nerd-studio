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

interface IProps {
  children: React.ReactNode;
}
export function HistoryInfo({ children }: IProps) {
  const dir = dirInLocalStorage.get().dir ?? "ltr";
  const side = dir === "ltr" ? "right" : "left";
  const open = useHistoryStore.use.isHistoryInfoOpen();
  const onOpenChange = useHistoryStore.use.setHistoryInfoOpen();
  const engine = useHistoryStore.use.selectedHistoryItem()?.engine;
  const engineIcon = useHistoryStore.use.selectedHistoryItem()?.engineIcon;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side={side} className="w-full max-w-[400px] sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex gap-2 text-sm font-medium text-primary">
            <IoMdInformationCircleOutline size={20} />
            Information
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
              Edit Prompt
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
