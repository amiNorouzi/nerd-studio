"use client";
import { Button } from "@/components/ui/button";
import { useCustomSearchParams, useGetDictionary } from "@/hooks";

export function AdvancedAndCustomButtons() {
  const [searchParams, setSearchParams] = useCustomSearchParams();
  const {
    page: { template },
  } = useGetDictionary();
  function handleClick(buttonValue: string) {
    const searchParamValue = searchParams.get("template-content");
    if (searchParamValue === buttonValue) {
      setSearchParams("template-content");
    } else {
      setSearchParams("template-content", buttonValue);
      setSearchParams("select-template-category");
    }
  }
  return (
    <div className="flex gap-1">
      {buttons.map(button => (
        <Button
          key={button}
          className="h-[50px] rounded-lg px-4 py-2"
          onClick={() => handleClick(template[button])}
        >
          {template[button]}
        </Button>
      ))}
    </div>
  );
}

const buttons = ["my_prompt", "advance"] as const;
