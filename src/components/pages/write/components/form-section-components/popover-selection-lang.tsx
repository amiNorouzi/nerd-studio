import { useRef, useState } from "react";
import { HiChevronUp } from "react-icons/hi";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { SelectLang } from "./select-lang";

import { useCustomSearchParams } from "@/hooks";

import { statuses } from "./contants";
import type { IProps } from "./types";

export function PopoverSelectionLang({ open, onOpenChange }: IProps) {
  // const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null);
  const [searchParams] = useCustomSearchParams();
  const popoverContentWidth = String(buttonRef?.offsetWidth) ?? "200";

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          ref={setButtonRef}
          variant="outline"
          className="w-full justify-between bg-muted"
        >
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
      <PopoverContent className={`w-[360px] p-0`} align="start">
        <SelectLang onOpenChange={onOpenChange} />
      </PopoverContent>
    </Popover>
  );
}
