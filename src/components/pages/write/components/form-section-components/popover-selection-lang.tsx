import { HiChevronUp } from "react-icons/hi";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { useCustomSearchParams } from "@/hooks";

import { statuses } from "./contants";
import type { IProps } from "./types";

export function PopoverSelectionLang({ open, onOpenChange, children }: IProps) {
  const [searchParams] = useCustomSearchParams();

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between bg-muted">
          {statuses.find(
            item => item.value === searchParams.get("response-lang"),
          )?.label ?? statuses[0].label}
          <span
            data-open={open}
            className="transition data-[open=false]:rotate-180"
          >
            <HiChevronUp />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[360px] p-0" align="start">
        {children}
      </PopoverContent>
    </Popover>
  );
}
