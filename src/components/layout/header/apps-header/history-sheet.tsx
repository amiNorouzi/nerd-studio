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

interface IProps {
  children: React.ReactNode;
}
export function HistorySheet({ children }: IProps) {
  const { components } = useGetDictionary();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <GoHistory />
          {components.apps_header.history}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[600px]">
        <SheetHeader>
          <SheetTitle>{components.apps_header.history}</SheetTitle>
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
