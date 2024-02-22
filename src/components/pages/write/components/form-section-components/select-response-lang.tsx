"use client";
import { memo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { PopoverSelectionLang } from "./popover-selection-lang";
import { DrawerSelectionLang } from "./drawer-selection-lang";
import { SelectLang } from "./select-lang";

import { useCustomSearchParams, useGetDictionary } from "@/hooks";

import { statuses } from "./contants";

const SelectLanguage = memo(SelectLang);
export function ResponseLang() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  useCustomSearchParams("response-lang", statuses[0].value);

  if (isDesktop) {
    return (
      <PopoverSelectionLang open={open} onOpenChange={setOpen}>
        <SelectLanguage onOpenChange={setOpen} />
      </PopoverSelectionLang>
    );
  }

  return (
    <DrawerSelectionLang open={open} onOpenChange={setOpen}>
      <SelectLanguage onOpenChange={setOpen} />
    </DrawerSelectionLang>
  );
}

export function SelectResponseLang() {
  const {
    page: { writing },
  } = useGetDictionary();
  return (
    <div className="flex flex-col gap-2">
      <h6 className="text-xsm font-semibold">{writing.form_language}</h6>
      <ResponseLang />
    </div>
  );
}
