"use client";
import { useSearchParams } from "next/navigation";
import {
  OptionsSelectBoxes,
  SubmitButtonSelectEngine,
  TextBox,
  SelectTranslateLanguages,
  GrammarTextBox,
} from "./form-section-components";
import { RenderImageOrIcon } from "@/components/shared";

import { useGetDictionary } from "@/hooks";
import { apps } from "@/constants/side-panel";
import type { ParamsType } from "@/services/types";
import { useState } from "react";
import FormWrapper from "@/components/shared/run-tab-for-app/form-wrapper";
import { useHistoryStore } from "@/stores/zustand/history-store";
import { HistoryInfoContent } from "@/components/pages/grammar/history-info-content";

interface IProps {
  params: ParamsType;
  onTextAreaChange (value: string) :void;
  onSubmit () : void;
  value: string;
}

/**
 * grammar form section
 * @param params
 * @constructor
 */
export default function GrammarFormSection({
  params,
  value,
  onTextAreaChange,
  onSubmit,
}: IProps) {
  const {
    page: { translate },
  } = useGetDictionary();
  const selectedHistoryItem = useHistoryStore.use.selectedHistoryItem();

  const searchParams = useSearchParams();
  const appName = searchParams.get("app");
  // find app info from apps constant that we had set in search url params in SetSearchParamProvider
  const app = apps.find(
    app => app.title.toLowerCase() === appName?.toLowerCase(),
  );
  const open = useHistoryStore.use.isHistoryInfoOpen();

  return (
    <FormWrapper>
      {/*text area and pdf upload and url input*/}
      {!open && (
        <div className={`col form-gap  `}>
          <GrammarTextBox
            value={value}
            onTextAreaChange={onTextAreaChange}
            maxLength={4000}
          />
          {/*submit button and select engine with setting*/}
          <SubmitButtonSelectEngine
            onClick={onSubmit}
            buttonContent={"Rewrite"}
          />
        </div>
      )}
      {open && (
        <div className="col form-gap">
          <HistoryInfoContent onTextAreaChange={onTextAreaChange} />
          <SubmitButtonSelectEngine
            onClick={onSubmit}
            buttonContent={"Edit Prompt"}
          />
        </div>
      )}
    </FormWrapper>
  );
}
