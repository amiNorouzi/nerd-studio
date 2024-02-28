"use client";
import { Run, SetSearchParamProvider } from "@/components/shared";
import { useTemplateStore } from "@/stores/zustand/template-store";
import type { SCRPropsType } from "@/services/types";

export function DynamicTemplatePage({ params, searchParams }: SCRPropsType) {
  const template = useTemplateStore.use.currentTemplate();

  return (
    <SetSearchParamProvider appName="app" appSearchParamValue="template">
      <div className="grid h-fit max-h-full grid-cols-12 divide-x overflow-y-auto lg:h-full lg:overflow-hidden ">
        <Run params={params} template={template} />
      </div>
    </SetSearchParamProvider>
  );
}
