import React from "react";
import { GoHistory } from "react-icons/go";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useGetDictionary } from "@/hooks";
import { usePathname } from "next/navigation";
import { useHistoryStore } from "@/stores/zustand/history-store";

interface IProps {
  children: React.ReactNode;
}
export function HistorySheet({ children }: IProps) {
  const { components } = useGetDictionary();
  const pathname = usePathname();
  const setHistoryIsOpen = useHistoryStore.use.setHistoryIsOpen();
  const isHistoryOpen = useHistoryStore.use.isHistoryOpen();

  if (pathname.includes("image")) return null;

  return (
    <>
      {/*<Sheet>*/}
      {/*  <SheetTrigger asChild>*/}
      <Button
        variant="outline"
        size="sm"
        className="gap-1"
        onClick={() => setHistoryIsOpen(!isHistoryOpen)}
      >
        <GoHistory />
        {components.apps_header.history}
      </Button>
      {/* </SheetTrigger>*/}
      {/*<SheetContent className="w-full max-w-[400px] sm:max-w-[600px]">*/}
      {/*  <SheetHeader>*/}
      {/*    <SheetTitle>{components.apps_header.history}</SheetTitle>*/}
      {/*    <SheetDescription></SheetDescription>*/}
      {/*  </SheetHeader>*/}
      {/*  {children}*/}

      {/*<SheetFooter>*/}
      {/*  <SheetClose asChild>*/}
      {/*    <Button type="submit">Save changes</Button>*/}
      {/*  </SheetClose>*/}
      {/*</SheetFooter>*/}

      {/*  </SheetContent>*/}
      {/*</Sheet>*/}
    </>
  );
}
