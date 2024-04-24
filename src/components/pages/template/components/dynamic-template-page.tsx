"use client";
import {
  HistoryBox,
  HistoryInfo,
  HistoryItems,
  Run,
  SetSearchParamProvider,
} from "@/components/shared";
import { HistoryInfoContent } from "./history-info-content";

import { useTemplateStore } from "@/stores/zustand/template-store";
import { useGetDictionary } from "@/hooks";

import type { SCRPropsType } from "@/services/types";
import { useGenerateTemplate } from "@/services/templates";
import { useEventChanel } from "@/services/events-chanel";
import { useState } from "react";

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

  const { mutate: generateTemplate } = useGenerateTemplate();
  const generatedTemplate = useEventChanel({ eventName: "template" });
  const [prompt, setPrompt] = useState(template.prompt);
  const handleGenerate = () => {
    if (prompt) {
      generateTemplate({
        prompt,
        model: "gpt-3.5-turbo-0125",
        temperature: 0.1,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
    }
  };

  return (
    <SetSearchParamProvider appName="app" appSearchParamValue="template">
      <Run>
        <Run.Form
          value={prompt}
          onSubmit={handleGenerate}
          onTextAreaChange={setPrompt}
          params={params}
          template={template}
          buttonContent={templatePage.template_button_label}
          mainTextAreaPlaceholder={templatePage.text_input_placeholder}
        />
        <Run.Editor value={generatedTemplate} onChange={() => {}}>
          <HistoryBox>
            <HistoryItems appName="template" />
          </HistoryBox>
          {/* this is a sheet that when user select an item in history then this sheet open and show history information */}
          <HistoryInfo>
            <HistoryInfoContent />
          </HistoryInfo>
        </Run.Editor>
      </Run>
    </SetSearchParamProvider>
  );
}
