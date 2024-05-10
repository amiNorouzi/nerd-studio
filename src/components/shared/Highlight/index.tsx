import React from "react";

import { useMediaQuery } from "usehooks-ts";

import { Drawer, DrawerContent } from "@/components/ui/drawer";

import { cn } from "@/lib/utils";
import useHighlightStore from "@/stores/zustand/highlight-store";
import HighlightContent from "@/components/shared/Highlight/HighlightContent";

interface IProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "children"> {}

export default function Highlight({ className, ...props }: IProps) {
  const isOpenHighlightBox = useHighlightStore.use.isHighlightOpen();
  const setOpenHighLightBox = useHighlightStore.use.setHighlightIsOpen();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <div
        className={cn(
          "flex h-full w-0 max-w-0 basis-0 flex-col items-center  justify-start   gap-4 divide-y bg-background opacity-0 transition-all duration-300",
          isOpenHighlightBox &&
            " w-full  max-w-[400px] basis-3/4  border-s  pt-0 opacity-100 xl:basis-1/2",
          className,
        )}
        {...props}
      >
        {/*content*/}
        <div className="w-full overflow-y-auto overflow-x-hidden pt-3">
          <HighlightContent />
        </div>
      </div>
    );
  }

  return (
    <Drawer open={isOpenHighlightBox} onOpenChange={setOpenHighLightBox}>
      <DrawerContent className="max-h-[90dvh] gap-2 p-2">
        <HighlightContent />
      </DrawerContent>
    </Drawer>
  );
}
