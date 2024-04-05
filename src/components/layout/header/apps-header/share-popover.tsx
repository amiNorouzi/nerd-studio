import React from "react";

import { TbShare } from "react-icons/tb";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { useGetDictionary } from "@/hooks";
import { dirInLocalStorage } from "@/stores/browser-storage";
import { iconVariants } from "@/constants/variants";

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
        <Button variant="outline" size="sm" className="gap-1.5">
          <TbShare className={iconVariants({ size: "sm" })} />{" "}
          <span>{components.apps_header.share}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        collisionPadding={popoverPaddingFromEdge}
        className="flex flex-col  gap-3 divide-x divide-y px-6 pt-3 lg:w-[480px]"
      >
        {children}
      </PopoverContent>
    </Popover>
  );
}
