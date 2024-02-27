import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useCustomSearchParams, useGetDictionary } from "@/hooks";
import { SelectEngineItems } from "./select-engine-items";
import { engines } from "./contants";
import { PopoverSelection } from "./popover-selection";
import { DrawerSelection } from "./drawer-selection";

function SelectEngineDropDown() {
  const [open, setOpen] = useState(false);
  const [searchParams] = useCustomSearchParams();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const buttonContent =
    engines.find(
      item => item.toLowerCase() === searchParams.get("engine")?.toLowerCase(),
    ) ?? engines[0];

  if (isDesktop) {
    return (
      <PopoverSelection
        open={open}
        onOpenChange={setOpen}
        buttonContent={buttonContent}
      >
        <SelectEngineItems onOpenChange={setOpen} />
      </PopoverSelection>
    );
  }

  return (
    <DrawerSelection
      open={open}
      onOpenChange={setOpen}
      buttonContent={buttonContent}
    >
      <SelectEngineItems onOpenChange={setOpen} />
    </DrawerSelection>
  );
}

export function SelectEngine() {
  const {
    page: { writing },
  } = useGetDictionary();
  return (
    <div className="flex flex-col justify-center gap-2 ">
      {/*<span className="m-0 flex items-baseline gap-2 text-xsm font-semibold">*/}
      {/*  Engines*/}
      {/*</span>*/}
      <SelectEngineDropDown />
    </div>
  );
}
