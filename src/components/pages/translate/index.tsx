"use client";
import {
  HistoryBox,
  HistoryInfo,
  HistoryItems,
  Run,
  SetSearchParamProvider,
} from "@/components/shared";
import { ParamsType, SearchParamsType } from "@/services/types";
import useGenerateTranslate from "@/services/translate";
import { useSearchParams } from "next/navigation";
import { languages } from "@/components/shared/run-tab-for-app/form-section-components/contants";
import { getLangById } from "@/lib/utils";
import React from "react";
import { useHandleGeneratedData } from "@/hooks/generates-hook";
import Highlight from "@/components/shared/Highlight";

interface IProps {
  params: ParamsType;
  searchedParams: SearchParamsType
}

export default function TranslatePage({ params,searchedParams }: IProps) {
  const searchParams = useSearchParams();

  const {
    generateTranslate,
    isPending,
    message: translation,
    resetMessage,
  } = useGenerateTranslate();
  const { setUpdateText, text, setText, textInput } = useHandleGeneratedData({

    message: translation,
  });
  function handleGenerate() {
    if (text) {
      resetMessage();
      generateTranslate({
        text,
        trLang:
          getLangById(searchParams.get("trLang") ?? "")?.value ??
          languages[1].value,
        txLang:
          getLangById(searchParams.get("txLang") ?? "")?.value ??
          languages[0].value,
        model: "gpt-3.5-turbo-0125",
        temperature: 0.1,
        max_tokens: 100,
        top_p: 1.0,
        frequency_penalty: 0,
        presence_penalty: 0,
        document_name: "translate",
      });
    }
  }

  return (
    <SetSearchParamProvider appName="app" appSearchParamValue="Translate">
      <Run>
        <Run.TranslateForm
          params={params}
          onTextAreaChange={setText}
          value={text}
          isPending={isPending}
          onSubmit={handleGenerate}
        />
        <Run.Editor value={textInput} onChange={setUpdateText}>
          <HistoryBox>
            <HistoryItems appName="translate" selectedItemFromWorkSpace={  searchedParams.item} />
          </HistoryBox>
          {/* this is a sheet that when user select an item in history then this sheet open and show history information */}
          <HistoryInfo />
          <Highlight />
        </Run.Editor>
      </Run>
    </SetSearchParamProvider>
  );
}
