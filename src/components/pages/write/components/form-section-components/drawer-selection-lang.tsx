import { HiChevronUp } from "react-icons/hi";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { SelectLang } from "./select-lang";

import { useCustomSearchParams } from "@/hooks";

import { statuses } from "./contants";
import type { IProps } from "./types";

export function DrawerSelectionLang({ open, onOpenChange }: IProps) {
  const [searchParams] = useCustomSearchParams();
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
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
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <SelectLang onOpenChange={onOpenChange} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
