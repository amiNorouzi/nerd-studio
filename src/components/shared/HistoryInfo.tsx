import React from "react";
import Image from "next/image";
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

interface IProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  children: React.ReactNode;
  engineIcon?: string;
  engine?: string;
}
export function HistoryInfo({
  open,
  onOpenChange,
  children,
  engine,
  engineIcon,
}: IProps) {
  const dir = dirInLocalStorage.get().dir ?? "ltr";
  const side = dir === "ltr" ? "right" : "left";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={side}
        className="w-full max-w-[400px] sm:max-w-[650px]"
      >
        <SheetHeader>
          <SheetTitle>Information</SheetTitle>
        </SheetHeader>
        {children}
        <SheetFooter className="flex flex-row flex-nowrap gap-2">
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
