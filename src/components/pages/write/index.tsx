"use client";
import {
  HistoryBox,
  HistoryInfo,
  HistoryItems,
  Run,
  SetSearchParamProvider,
} from "@/components/shared";
import { HistoryInfoContent } from "./history-info-content";
import type { SCRPropsType } from "@/services/types";
import { useEventChanel } from "@/services/events-chanel";
import { useState } from "react";
import { useAIWriter } from "@/services/ai-writer";
import { useGetDictionary } from "@/hooks";

export function WritePage({ params }: SCRPropsType) {
  const {
    page: { ReWrite: reWrite },
  } = useGetDictionary();

  /**
   * * Important: SetSearchParamProvider is used to set apps name to url search param
   *  value of it used in apps Header in  layout or form-section
   *  and everywhere that needs to know app name
   */

  const generatedText = useEventChanel({
    eventName: "message",
  });
  const { mutate: generate } = useAIWriter();
  const [prompt, setPrompt] = useState("");
  const handleGenerate = () => {
    if (prompt) {
      generate({
        prompt,
        model: "gpt-3.5-turbo-0125",
        temperature: 0.1,
        max_tokens: 100,
      });
    }
  };

  return (
    <SetSearchParamProvider appName="app" appSearchParamValue="ReWrite">
      <Run>
        <Run.Form
          params={params}
          onTextAreaChange={setPrompt}
          value={prompt}
          onSubmit={handleGenerate}
          buttonContent={reWrite?.form_rewrite_button}
          mainTextAreaPlaceholder={reWrite?.text_input_placeholder}
        />
        <Run.Editor value={generatedText} onChange={() => {}}>
          <HistoryBox>
            <HistoryItems appName="ReWrite" />
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
