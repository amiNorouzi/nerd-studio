"use client";
import { memo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { PopoverSelection } from "./popover-selection";
import { DrawerSelection } from "./drawer-selection";
import { SelectLang } from "./select-lang";

import { useCustomSearchParams, useGetDictionary } from "@/hooks";

import { statuses } from "./contants";

const SelectLanguage = memo(SelectLang);
export function ResponseLang() {
  const [open, setOpen] = useState(false);
  const [searchParams] = useCustomSearchParams();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const buttonContent =
    statuses.find(
      item =>
        item.value.toLowerCase() ===
        searchParams.get("response-lang")?.toLowerCase(),
    )?.label ?? statuses[0].label;

  if (isDesktop) {
    return (
      <PopoverSelection
        open={open}
        onOpenChange={setOpen}
        buttonContent={buttonContent}
      >
        <SelectLanguage onOpenChange={setOpen} />
      </PopoverSelection>
    );
  }

  return (
    <DrawerSelection
      open={open}
      onOpenChange={setOpen}
      buttonContent={buttonContent}
    >
      <SelectLanguage onOpenChange={setOpen} />
    </DrawerSelection>
  );
}

export function SelectResponseLang() {
  const {
    page: { writing },
  } = useGetDictionary();
  return (
    <div className="flex flex-col gap-2">
      <span className="m-0 flex items-baseline gap-2 text-xsm font-semibold">
        {writing.form_language}
      </span>
      <ResponseLang />
    </div>
  );
}
