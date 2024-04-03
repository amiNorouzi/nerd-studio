"use client";

import { useTemplateStore } from "@/stores/zustand/template-store";
import RenderIf from "@/components/shared/RenderIf";
import { DescriptionHoverCard, ToggleAdvance } from "@/components/shared";
import { inputComponents } from "@/constants/template";
import { Label } from "@/components/ui/label";
import { TemplateInput } from "@/stores/zustand/types";
import { cn } from "@/lib/utils";

export function PreviewForm() {
  const customTemplateInputs = useTemplateStore.use.customTemplateInputs();

  const renderComponents = (
    components: TemplateInput[],
    itemClassName?: string,
  ) => {
    return components.map(input => {
      const Components = inputComponents[input.type];

      return (
        <div
          className={cn("col col-span-2 gap-2", itemClassName)}
          key={input.id}
          data-isLast={input.order === components.length}
        >
          <div className="row w-full gap-2">
            <Label>{input.name}</Label>
            <RenderIf isTrue={!!input.description}>
              <DescriptionHoverCard description={input.description} />
            </RenderIf>
          </div>
          <Components {...input} onChangeValue={() => {}} />
        </div>
      );
    });
  };

  return (
    <div className="grid grid-cols-2 gap-5 p-4 lg:p-7">
      {renderComponents(customTemplateInputs.filter(i => !i.isAdvance))}
      <RenderIf isTrue={customTemplateInputs.some(i => i.isAdvance)}>
        <ToggleAdvance className="col-span-2" contentClassName="col-span-2">
          <div className="grid w-full grid-cols-2 gap-5">
            {renderComponents(
              customTemplateInputs.filter(i => i.isAdvance),
              "col-span-1 data-[isLast=true]:odd:col-span-2",
            )}
          </div>
        </ToggleAdvance>
      </RenderIf>
    </div>
  );
}
