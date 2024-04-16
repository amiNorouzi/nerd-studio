"use client";
import {
  HistoryBox,
  HistoryItems,
  Run,
  SetSearchParamProvider,
  HistoryInfo,
} from "@/components/shared";
import { HistoryInfoContent } from "./history-info-content";
import type { ParamsType } from "@/services/types";
import { useGenerateTranslate } from "@/services/translate";
import { useGenerateGrammar } from "@/services/grammar";
import React, { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useEventChanel } from "@/services/events-chanel";
import { Highlight, HighlightContent } from "@/components/shared/Highlight";

interface IProps {
  params: ParamsType;
}

export function GrammarPage({ params }: IProps) {
  /**
   * * Important: SetSearchParamProvider is used to set apps name to url search param
   *  value of it used in apps Header in  layout or form-section
   *  and everywhere that needs to know app name
   */
  const Grammar = useEventChanel({
    eventName: "grammar",
  });

  /**=================================
   * this state for get textarea Value*/
  const [text, setText] = useState("");

  /**==================
   * Handle submit form*/
  const { mutate: generateGrammar } = useGenerateGrammar();
  const handleGenerate = () => {
    if (text) {
      generateGrammar({
        text,
        model: "gpt-3.5-turbo-0125",
        temperature: 0.5,
        max_tokens: 64,
      });
    }
  };

  return (
    <SetSearchParamProvider appName="app" appSearchParamValue="Grammar">
      <Run>
        <Run.GrammarForm
          params={params}
          value={text}
          onTextAreaChange={setText}
          onSubmit={handleGenerate}
        />
        <Run.Editor
          value={Grammar}
          onChange={e => {
            setText(e);
          }}
        >
          <HistoryBox>
            <HistoryItems appName="Grammar" />
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
