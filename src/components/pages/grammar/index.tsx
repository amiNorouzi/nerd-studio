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
import { useEventChanel } from "@/services/events-chanel";
import { useGenerateGrammar } from "@/services/grammar";
import { useEffect, useState } from "react";
import { useHistories } from "@/services/history";

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
  const { mutate: generateGrammar } = useGenerateGrammar();
  const [text, setText] = useState("");
  const { data } = useHistories({ pageNumber: 1 });
  console.log("text send to server", text);

  const handleGenerate = () => {
    if (text) {
      generateGrammar({
        text,
        model: "gpt-3.5-turbo-0125",
        temperature: 0.1,
        max_tokens: 100,
        top_p: 1,
      });
    }
  };

  return (
    <SetSearchParamProvider appName="app" appSearchParamValue="Grammar">
      <Run>
        <Run.GrammarForm
          params={params}
          onTextAreaChange={setText}
          value={text}
          onSubmit={handleGenerate}
        />
        <Run.Editor value={grammar ? grammar : ""} onChange={() => {}}>
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
