import React from "react";

import { Button } from "@/components/ui/button";
import { useGetDictionary } from "@/hooks";
import { usePathname } from "next/navigation";
import { useHistoryStore } from "@/stores/zustand/history-store";
import { TbHistory } from "react-icons/tb";

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
        <TbHistory />
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
