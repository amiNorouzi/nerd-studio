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

interface IProps {
  children: React.ReactNode;
}
export function HistorySheet({ children }: IProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-1 text-sm">
          <GoHistory />
          History
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[600px]">
        <SheetHeader>
          <SheetTitle>History</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        {children}
        {/*<SheetFooter>*/}
        {/*  <SheetClose asChild>*/}
        {/*    <Button type="submit">Save changes</Button>*/}
        {/*  </SheetClose>*/}
        {/*</SheetFooter>*/}
      </SheetContent>
    </Sheet>
  );
}
