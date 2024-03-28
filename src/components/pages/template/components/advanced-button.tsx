"use client";
import { Button } from "@/components/ui/button";

import { useCustomSearchParams, useGetDictionary } from "@/hooks";

export function AdvancedButton() {
  const [, setSearchParams] = useCustomSearchParams();
  const {
    page: {
      template: { advance },
    },
  } = useGetDictionary();

  function handleClick() {
    setSearchParams("select-template-category", "advance");
  }
  return (
    <Button className="h-[40px] rounded-lg px-4 py-2" onClick={handleClick}>
      {advance}
    </Button>
  );
}
