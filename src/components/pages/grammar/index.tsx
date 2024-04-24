"use client";
import {
  HistoryBox,
  HistoryItems,
  Run,
  SetSearchParamProvider,
} from "@/components/shared";
import type { ParamsType } from "@/services/types";
import { useEventChanel } from "@/services/events-chanel";
import { useGenerateGrammar } from "@/services/grammar";
import React, { useState } from "react";
import { Highlight, HighlightContent } from "@/components/shared/Highlight";
import { useHistories } from "@/services/history";
import { useHistoryStore } from "@/stores/zustand/history-store";

interface IProps {
  params: ParamsType;
}

export function GrammarPage({ params }: IProps) {
  /**
   * * Important: SetSearchParamProvider is used to set apps name to url search param
   *  value of it used in apps Header in  layout or form-section
   *  and everywhere that needs to know app name
   */
  const grammar = useEventChanel({
    eventName: "grammar",
  });
  const { mutate: generateGrammar, isPending } = useGenerateGrammar();
  const [text, setText] = useState("");
  // const [textInput, setTextInput] = useState("");
  const { data } = useHistories({ pageNumber: 1 });
  const selectedHistoryItem = useHistoryStore.use.selectedHistoryItem();
  const textInput = selectedHistoryItem
    ? selectedHistoryItem.answer_text + grammar.message
    : grammar.message;
  const handleGenerate = () => {
    if (text) {
      generateGrammar({
        text,
        model: "gpt-3.5-turbo-0125",
        temperature: 0.1,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
    }
  };

  return (
    <SetSearchParamProvider appName="app" appSearchParamValue="Grammar">
      <Run>
        <Run.GrammarForm
          isPending={isPending}
          params={params}
          onTextAreaChange={setText}
          value={text}
          onSubmit={handleGenerate}
        />

        <Run.Editor value={textInput} onChange={() => {}}>
          <Highlight>
            <HighlightContent />
          </Highlight>
          <HistoryBox>
            <HistoryItems appName="Grammar" historyItems={data} />
          </HistoryBox>
          {/* this is a sheet that when user select an item in history then this sheet open and show history information */}
          {/* <HistoryInfo>
            <HistoryInfoContent />
          </HistoryInfo> */}
        </Run.Editor>
      </Run>
    </SetSearchParamProvider>
  );
}
