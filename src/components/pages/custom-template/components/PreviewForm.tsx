"use client";

import { useTemplateStore } from "@/stores/zustand/template-store";
import RenderIf from "@/components/shared/RenderIf";
import { DynamicInputsList, ToggleAdvance } from "@/components/shared";

export function PreviewForm() {
  //TODO: map and add onChangeValue and value for each component
  const customTemplateInputs = useTemplateStore.use.customTemplateInputs();

  return (
    <div className="grid grid-cols-2 gap-5 p-4 lg:p-7">
      <DynamicInputsList
        components={customTemplateInputs.filter(i => !i.isAdvance)}
        changeValue={() => {}}
        getValue={() => ""}
      />
      <RenderIf isTrue={customTemplateInputs.some(i => i.isAdvance)}>
        <ToggleAdvance className="col-span-2" contentClassName="col-span-2">
          <div className="grid w-full grid-cols-2 gap-5">
            <DynamicInputsList
              components={customTemplateInputs.filter(i => i.isAdvance)}
              itemClassName="col-span-1 data-[isLast=true]:odd:col-span-2"
              changeValue={() => {}}
              getValue={() => ""}
            />
          </div>
        </ToggleAdvance>
      </RenderIf>
    </div>
  );
}
