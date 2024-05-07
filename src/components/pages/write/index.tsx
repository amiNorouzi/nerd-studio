"use client";
import {
  HistoryBox,
  HistoryInfo,
  HistoryItems,
  Run,
  SetSearchParamProvider,
} from "@/components/shared";
import type { SCRPropsType } from "@/services/types";
import React from "react";
import useAIWriter from "@/services/ai-writer";
import { useGetDictionary } from "@/hooks";
import Highlight from "@/components/shared/Highlight";
import { useHandleGeneratedData } from "@/hooks/generates-hook";

export default function WritePage({ params }: SCRPropsType) {
  const {
    page: { ReWrite },
  } = useGetDictionary();

  /**
   * * Important: SetSearchParamProvider is used to set apps name to url search param
   *  value of it used in apps Header in  layout or form-section
   *  and everywhere that needs to know app name
   */

  const { generateReWrite, isPending, message } = useAIWriter();
  const { setUpdateText, text, setText, textInput } = useHandleGeneratedData({
    generateFn: handleGenerate,
    message,
  });
  function handleGenerate() {
    if (text) {
      generateReWrite({
        text: text,
        model: "gpt-3.5-turbo-0125",
        temperature: 0.1,
        max_tokens: 100,
        frequency_penalty: 0,
        presence_penalty: 0,
        top_p: 0,
        document_name: "AI Writer",
      });
    }
  }
  //reset the stream everytime item in history is selected

  return (
    <SetSearchParamProvider appName="app" appSearchParamValue="ReWrite">
      <Run>
        <Run.Form
          params={params}
          isPending={isPending}
          onTextAreaChange={setText}
          value={text}
          onSubmit={handleGenerate}
          buttonContent={ReWrite.form_rewrite_button}
          mainTextAreaPlaceholder={ReWrite.text_input_placeholder}
        />
        <Run.Editor value={textInput} onChange={setUpdateText}>
          <HistoryBox>
            <HistoryItems appName="ai_writer" />
          </HistoryBox>

          <Highlight />
          {/* this is a sheet that when user select an item in history then this sheet open and show history information */}
          <HistoryInfo />
        </Run.Editor>
      </Run>
    </SetSearchParamProvider>
  );
}
