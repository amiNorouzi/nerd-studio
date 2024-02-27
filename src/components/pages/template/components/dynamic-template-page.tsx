"use client";
import { Info, Run, SetSearchParamProvider } from "@/components/shared";
import { useTemplateStore } from "@/stores/zustand/template-store";
import type { SCRPropsType } from "@/services/types";

const tabToShow = {
  run: Run,
  info: Info,
};

export function DynamicTemplatePage({ params, searchParams }: SCRPropsType) {
  const tabValue = searchParams["apps-tab"] ?? "run";
  const Content = tabToShow[tabValue as keyof typeof tabToShow];

  const template = useTemplateStore.use.currentTemplate();

  return (
    <SetSearchParamProvider appName="app" appSearchParamValue="template">
      <div className="grid h-fit max-h-full grid-cols-12 divide-x overflow-y-auto lg:h-full lg:overflow-hidden ">
        <Content
          mdDescription={""}
          headerDescription={"hello"}
          params={params}
          template={template}
        />
      </div>
    </SetSearchParamProvider>
  );
}
