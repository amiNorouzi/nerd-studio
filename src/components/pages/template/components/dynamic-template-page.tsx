"use client";
import { Run, SetSearchParamProvider } from "@/components/shared";
import { useTemplateStore } from "@/stores/zustand/template-store";
import type { SCRPropsType } from "@/services/types";
import { useGetDictionary } from "@/hooks";

export function DynamicTemplatePage({ params, searchParams }: SCRPropsType) {
  // pass template to Form component to used its data to show and change it
  const template = useTemplateStore.use.currentTemplate();
  const {
    page: { template: templatePage },
  } = useGetDictionary();
  /**
   * * Important: SetSearchParamProvider is used to set apps name to url search param
   *  value of it used in apps Header in  layout or form-section
   *  and everywhere that needs to know app name
   */

  return (
    <SetSearchParamProvider appName="app" appSearchParamValue="template">
      <Run>
        <Run.Form
          params={params}
          template={template}
          buttonContent={templatePage.template_button_label}
          mainTextAreaPlaceholder={templatePage.text_input_placeholder}
        />
        <Run.Editor />
      </Run>
    </SetSearchParamProvider>
  );
}
