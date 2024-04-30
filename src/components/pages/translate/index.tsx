"use client";
import {
  HistoryBox,
  HistoryInfo,
  HistoryItems,
  Run,
  SetSearchParamProvider,
} from "@/components/shared";

import { HistoryInfoContent } from "./history-info-content";
import type { ParamsType } from "@/services/types";
import { useEventChanel } from "@/services/events-chanel";
import { useGenerateTranslate } from "@/services/translate";
import { useSearchParams } from "next/navigation";
import { languages } from "@/components/shared/run-tab-for-app/form-section-components/contants";
import { getLangById } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Highlight, HighlightContent } from "@/components/shared/Highlight";
import { useHistoryStore } from "@/stores/zustand/history-store";
import { useHistoryUpdate } from "@/services/history";

interface IProps {
  params: ParamsType;
}

export default function TranslatePage({ params }: IProps) {
  const searchParams = useSearchParams();
  const { message: translation, reset } = useEventChanel({
    eventName: "translate",
  });
  const { mutate: generateTranslate, isPending } = useGenerateTranslate();
  const { mutate: updateHistoryMutate } = useHistoryUpdate();

  const [text, setText] = useState("");
  const selectedHistoryItem = useHistoryStore.use.selectedHistoryItem();
  const textInput = selectedHistoryItem
    ? selectedHistoryItem.answer_text + translation
    : translation;
  const handleGenerate = () => {
    if (text) {
      reset();
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
        workspace_id: 1,
        document_name: "New Document",
      });
    }
  };
  useEffect(() => {
    if (!isPending && selectedHistoryItem) {
      updateHistoryMutate({
        answer_text: textInput,
        answerUuid: selectedHistoryItem.uuid,
      });
    }
  }, [isPending]);
  useEffect(() => {
    reset();
  }, [selectedHistoryItem]);

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
        <Run.Editor value={textInput} onChange={() => {}}>
          <HistoryBox>
            <HistoryItems appName="translate" />
          </HistoryBox>
          {/* this is a sheet that when user select an item in history then this sheet open and show history information */}
          <HistoryInfo>
            <HistoryInfoContent />
          </HistoryInfo>

          <Highlight>
            <HighlightContent />
          </Highlight>
        </Run.Editor>
      </Run>
    </SetSearchParamProvider>
  );
}
