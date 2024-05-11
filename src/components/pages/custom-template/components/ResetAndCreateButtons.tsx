"use client";
import { Button } from "@/components/ui/button";

import { useGetDictionary } from "@/hooks";
import { useTemplateStore } from "@/stores/zustand/template-store";
import { useCreateTemplate } from "@/services/templates";
import RenderIf from "@/components/shared/RenderIf";
import Loading from "@/components/shared/Loading";
import React from "react";

export function ResetAndCreateButtons() {
  const {
    page: { custom_template: dictionary },
  } = useGetDictionary();
  const resetCustomTemplate = useTemplateStore.use.resetCustomTemplate();
  const customTemplateDetails = useTemplateStore.use.customTemplateDetails();
  const customTemplateInputs = useTemplateStore.use.customTemplateInputs();
  const { mutate: createTemplate, isPending } = useCreateTemplate();
  const handleCreate = () => {
    createTemplate({
      prompt: customTemplateDetails.template,
      params: customTemplateInputs.map(input => ({
        type: "text",
        label: input.name,
        description: input.description,
        placeholder: input.placeholder ?? "",
      })),
      category_id: customTemplateDetails.category.id,
      task: customTemplateDetails.description,
      topic: customTemplateDetails.name,
    });
  };

  return (
    <div className="row sticky bottom-0 mt-auto w-full justify-end gap-4 bg-background px-4 pb-4 lg:px-7 lg:pb-7 xl:px-9 xl:pb-9">
      <Button
        variant="secondary"
        className="w-36"
        onClick={resetCustomTemplate}
      >
        {dictionary.reset_button_label}
      </Button>
      <Button className="w-36" onClick={handleCreate} disabled={isPending}>
        <RenderIf isTrue={isPending}>
          <Loading
            rootClass="-ms-1 me-1"
            svgClass="w-6 h-6 !stroke-primary-foreground"
          />
        </RenderIf>
        {dictionary.create_button_label}
      </Button>
    </div>
  );
}
