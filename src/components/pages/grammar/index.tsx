"use client";
import {HistoryBox, HistoryItems, Run, SetSearchParamProvider} from '@/components/shared';
import type {ParamsType} from '@/services/types';
import useEventChanel from '@/services/events-chanel';
import {useGenerateGrammar} from '@/services/grammar';
import React from 'react';
import Highlight from '@/components/shared/Highlight';
import {useHandleGeneratedData} from '@/hooks/generates-hook';
import useGenerateTranslate from "@/services/translate";

interface IProps {
  params: ParamsType;
}

export default function GrammarPage({ params }: IProps) {
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
  } = useGenerateGrammar();
  const { setUpdateText, text, setText, textInput } = useHandleGeneratedData({
    generateFn: handleGenerate,
    message,
  });
  function handleGenerate() {
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

        <Run.Editor value={textInput} onChange={setUpdateText}>
            <Highlight/>
          <HistoryBox>
            <HistoryItems appName="grammar" />
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
