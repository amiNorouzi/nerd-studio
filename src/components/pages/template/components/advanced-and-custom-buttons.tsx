"use client";
import { Button } from "@/components/ui/button";
import { useCustomSearchParams, useGetDictionary } from "@/hooks";
import { useTemplateStore } from "@/stores/zustand/template-store";

export function AdvancedAndCustomButtons() {
  const setTemplatePageContent = useTemplateStore.use.setTemplatePageContent();
  const {
    page: { template },
  } = useGetDictionary();
  function handleClick(buttonValue: any) {
    setTemplatePageContent(buttonValue);
  }
  return (
    <div className="flex gap-1">
      {buttons.map(button => (
        <Button
          key={button}
          className="h-[40px] rounded-lg px-4 py-2"
          onClick={() => handleClick(template[button])}
        >
          {template[button]}
        </Button>
      ))}
    </div>
  );
}

const buttons = ["advance"] as const;
type ButtonsType = typeof buttons;
