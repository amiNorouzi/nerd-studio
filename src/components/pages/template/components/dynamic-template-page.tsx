"use client";
import { useQuery } from "@tanstack/react-query";

import {
  HistoryBox,
  HistoryItems,
  Run,
  SetSearchParamProvider,
  HistoryInfo,
} from "@/components/shared";
import type { CategoryItem } from "@/components/pages/template/types";
import { HistoryInfoContent } from "./history-info-content";

import { useTemplateStore } from "@/stores/zustand/template-store";
import { useGetDictionary } from "@/hooks";
import { useAxiosFetcher } from "@/hooks/useAxiosFetcher";

import type { SCRPropsType } from "@/services/types";

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
          value=""
          onSubmit={() => {}}
          onTextAreaChange={() => {}}
          params={params}
          template={template}
          buttonContent={templatePage.template_button_label}
          mainTextAreaPlaceholder={templatePage.text_input_placeholder}
        />
        <Run.Editor value="" onChange={() => {}}>
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
