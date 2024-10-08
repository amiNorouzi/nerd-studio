"use client";
import {
  HistoryBox,
  HistoryItems,
  Run,
  SetSearchParamProvider,
} from "@/components/shared";
import type { ParamsType, SCRPropsType } from "@/services/types";
import { useGenerateGrammar } from "@/services/grammar";
import React from "react";
import Highlight from "@/components/shared/Highlight";
import { useHandleGeneratedData } from "@/hooks/generates-hook";



export default function GrammarPage({ params,searchParams }: SCRPropsType) {
  /**
   * * Important: SetSearchParamProvider is used to set apps name to url search param
   *  value of it used in apps Header in  layout or form-section
   *  and everywhere that needs to know app name
   */

  const {
    generateGrammar,
    isPending,
    message,
    resetMessage,
    cancelStream
  } = useGenerateGrammar();
  const { setUpdateText, text, setText, textInput } = useHandleGeneratedData({

    message,
  });
  function handleGenerate() {
    if(isPending){
      cancelStream()
    }else{


    if (text) {
      resetMessage();
      generateGrammar({
        text,
        model: "gpt-3.5-turbo-0125",
        temperature: 0.1,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        document_name: "grammar",

      });
    }
    }
  }

  return (
    <SetSearchParamProvider appName="app" appSearchParamValue="Grammar">
      <Run>
        <Run.GrammarForm
          isPending={isPending}
          params={params}
          onTextAreaChange={setText}
          value={text}
          onSubmit={handleGenerate}
          cancelStream={cancelStream}
        />

        <Run.Editor value={textInput} onChange={setUpdateText}>
            <Highlight/>
          <HistoryBox>
            <HistoryItems appName="grammar"  selectedItemFromWorkSpace={searchParams.item}/>
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
