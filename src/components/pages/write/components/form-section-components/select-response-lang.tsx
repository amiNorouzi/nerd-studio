"use client";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { useCustomSearchParams } from "@/hooks";

import { PopoverSelectionLang } from "./popover-selection-lang";
import { DrawerSelectionLang } from "./drawer-selection-lang";
import { statuses } from "./contants";

export function SelectResponseLang() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  useCustomSearchParams("response-lang", statuses[0].value);

  if (isDesktop) {
    return <PopoverSelectionLang open={open} onOpenChange={setOpen} />;
  }

  return <DrawerSelectionLang open={open} onOpenChange={setOpen} />;
}
