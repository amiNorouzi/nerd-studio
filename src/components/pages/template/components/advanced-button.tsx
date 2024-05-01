"use client";
import { Button } from "@/components/ui/button";

import { useCustomSearchParams, useGetDictionary } from "@/hooks";
import {
  tabsType,
  TEMPLATE_TAB_PARAMS_KEY,
} from "@/components/pages/template/constants";
import { cn } from "@/lib/utils";

export function AdvancedButton({ selected }: { selected: boolean }) {
  const [, setSearchParams] = useCustomSearchParams();
  const {
    page: {
      template: { advance },
    },
  } = useGetDictionary();

  // function handleClick() {
  //   setSearchParams(TEMPLATE_TAB_PARAMS_KEY, tabsType.advance);
  // }
  return (
    <Button
      className={cn(
        "h-[50px] w-[102px] rounded-lg  px-4 py-2",
        selected && "bg-primary-dark hover:bg-primary",
      )}
    >
      {advance}
    </Button>
  );
}
