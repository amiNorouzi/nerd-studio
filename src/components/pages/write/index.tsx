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
import React, { useEffect, useState } from "react";
import { useAIWriter } from "@/services/ai-writer";
import { useGetDictionary } from "@/hooks";
import { Highlight, HighlightContent } from "@/components/shared/Highlight";
import { useHistoryUpdate } from "@/services/history";
import { useHistoryStore } from "@/stores/zustand/history-store";

export default function WritePage({ params }: SCRPropsType) {
  const {
    page: { ReWrite },
  } = useGetDictionary();

  /**
   * * Important: SetSearchParamProvider is used to set apps name to url search param
   *  value of it used in apps Header in  layout or form-section
   *  and everywhere that needs to know app name
   */

  const { message: generatedText, reset } = useEventChanel({
    eventName: "ai_writer",
  });
  const { mutate: generate, isPending } = useAIWriter();
  const [prompt, setPrompt] = useState("");
  const { mutate: updateHistory } = useHistoryUpdate();
  const selectedHistoryItem = useHistoryStore.use.selectedHistoryItem();

  const textInput = selectedHistoryItem
    ? selectedHistoryItem.answer_text + generatedText
    : generatedText;
  const handleGenerate = () => {
    if (prompt) {
      reset();
      generate({
        prompt,
        model: "gpt-3.5-turbo-0125",
        temperature: 0.1,
        max_tokens: 100,
        frequency_penalty: 0,
        presence_penalty: 0,
        top_p: 0,
        document_name: "AI Writer",
      });
    }
  };
  //reset the stream everytime item in history is selected
  useEffect(() => {
    reset();
  }, [selectedHistoryItem]);
  useEffect(() => {
    if (!isPending && selectedHistoryItem) {
      updateHistory({
        answer_text: textInput,
        answerUuid: selectedHistoryItem?.uuid,
      });
    }
  }, [isPending]);

  return (
    <SetSearchParamProvider appName="app" appSearchParamValue="ReWrite">
      <Run>
        <Run.Form
          params={params}
          isPending={isPending}
          onTextAreaChange={setPrompt}
          value={prompt}
          onSubmit={handleGenerate}
          buttonContent={ReWrite.form_rewrite_button}
          mainTextAreaPlaceholder={ReWrite.text_input_placeholder}
        />
        <Run.Editor value={textInput} onChange={() => {}}>
          <HistoryBox>
            <HistoryItems appName="ai_writer" />
          </HistoryBox>

          <Highlight>
            <HighlightContent />
          </Highlight>
          {/* this is a sheet that when user select an item in history then this sheet open and show history information */}
          <HistoryInfo>
            <HistoryInfoContent />
          </HistoryInfo>
        </Run.Editor>
      </Run>
    </SetSearchParamProvider>
  );
}
