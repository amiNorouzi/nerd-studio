import { BsChevronUp } from "react-icons/bs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { useCustomSearchParams } from "@/hooks";

import { statuses } from "./contants";
import type { IProps } from "./types";

interface Props extends IProps {
  buttonContent: string;
}
export function PopoverSelection({
  open,
  onOpenChange,
  buttonContent,
  children,
}: Props) {
  const [searchParams] = useCustomSearchParams();

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between bg-muted hover:border-primary-light hover:text-foreground aria-expanded:border-primary"
        >
          {buttonContent}
          <span
            data-open={open}
            className="transition data-[open=false]:rotate-180"
          >
            <BsChevronUp className="h-4 w-4 opacity-50" />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        {children}
      </PopoverContent>
    </Popover>
  );
}
