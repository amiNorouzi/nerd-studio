import { BsChevronUp } from "react-icons/bs";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

import { useCustomSearchParams } from "@/hooks";

import { statuses } from "./contants";
import type { IProps } from "./types";

interface Props extends IProps {
  buttonContent: string;
}
export function DrawerSelection({
  open,
  onOpenChange,
  buttonContent,
  children,
}: Props) {
  const [searchParams] = useCustomSearchParams();
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {buttonContent}
          <span
            data-open={open}
            className="transition data-[open=false]:rotate-180"
          >
            <BsChevronUp className="h-4 w-4 opacity-50" />
          </span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">{children}</div>
      </DrawerContent>
    </Drawer>
  );
}
