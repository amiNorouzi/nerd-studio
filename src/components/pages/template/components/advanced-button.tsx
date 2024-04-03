"use client";
import { Button } from "@/components/ui/button";

import { useCustomSearchParams, useGetDictionary } from "@/hooks";
import {
  tabsType,
  TEMPLATE_TAB_PARAMS_KEY,
} from "@/components/pages/template/constants";

export function AdvancedButton() {
  const [, setSearchParams] = useCustomSearchParams();
  const {
    page: {
      template: { advance },
    },
  } = useGetDictionary();

  function handleClick() {
    setSearchParams(TEMPLATE_TAB_PARAMS_KEY, tabsType.advance);
  }
  return (
    <Button className="h-[40px] rounded-lg px-4 py-2" onClick={handleClick}>
      {advance}
    </Button>
  );
}
