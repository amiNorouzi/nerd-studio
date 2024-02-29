"use client";
import { Run, SetSearchParamProvider } from "@/components/shared";
import { useTemplateStore } from "@/stores/zustand/template-store";
import type { SCRPropsType } from "@/services/types";

export function DynamicTemplatePage({ params, searchParams }: SCRPropsType) {
  const template = useTemplateStore.use.currentTemplate();

  return (
    <SetSearchParamProvider appName="app" appSearchParamValue="template">
      <Run params={params} template={template} />
    </SetSearchParamProvider>
  );
}
