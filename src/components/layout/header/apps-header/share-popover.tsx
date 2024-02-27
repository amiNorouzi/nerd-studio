import React from "react";
import { dirInLocalStorage } from "@/stores/browser-storage";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FiShare2 } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import type { ChildrenProps } from "@/services/types";
import { useGetDictionary } from "@/hooks";

interface IProps {
  children: React.ReactNode;
}
export function SharePopover({ children }: IProps) {
  const dir = dirInLocalStorage.get().dir ?? "ltr";
  const popoverPaddingFromEdge = dir === "ltr" ? { right: 20 } : { left: 20 };
  const { components } = useGetDictionary();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="  gap-1 ">
          <FiShare2 /> <span>{components.apps_header.share}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        collisionPadding={popoverPaddingFromEdge}
        className="flex w-[480px] flex-col gap-3 divide-y px-6 pt-3"
      >
        {children}
      </PopoverContent>
    </Popover>
  );
}
