"use client";
import { Button } from "@/components/ui/button";

import { useGetDictionary } from "@/hooks";
import { useTemplateStore } from "@/stores/zustand/template-store";

export function ResetAndCreateButtons() {
  const {
    page: { custom_template: dictionary },
  } = useGetDictionary();
  const resetCustomTemplate = useTemplateStore.use.resetCustomTemplate();

  return (
    <div className="row sticky bottom-0 mt-auto w-full justify-end gap-4 bg-background px-4 pb-4 lg:px-7 lg:pb-7 xl:px-9 xl:pb-9">
      <Button
        variant="secondary"
        className="w-36"
        onClick={resetCustomTemplate}
      >
        {dictionary.reset_button_label}
      </Button>
      <Button className="w-36">{dictionary.create_button_label}</Button>
    </div>
  );
}
