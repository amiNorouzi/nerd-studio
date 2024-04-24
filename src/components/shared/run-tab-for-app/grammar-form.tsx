"use client";
import { useSearchParams } from "next/navigation";
import {
  GrammarTextBox,
  SubmitButtonSelectEngine,
} from "./form-section-components";

import { useGetDictionary } from "@/hooks";
import { apps } from "@/constants/side-panel";
import type { ParamsType } from "@/services/types";
import FormWrapper from "@/components/shared/run-tab-for-app/form-wrapper";
import { useHistoryStore } from "@/stores/zustand/history-store";
import { HistoryInfoContent } from "@/components/pages/grammar/history-info-content";

interface IProps {
  params: ParamsType;
  onTextAreaChange(value: string): void;
  onSubmit(): void;
  value: string;
  isPending: boolean;
}

/**
 * grammar form section
 * @param params
 * @param value
 * @param onTextAreaChange
 * @param onSubmit
 * @param isPending
 * @constructor
 */
export default function GrammarFormSection({
  params,
  value,
  onTextAreaChange,
  onSubmit,
  isPending,
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
  // const open = useHistoryStore.use.isHistoryInfoOpen();
  const isGrammarHistoryOpen = useHistoryStore.use.isGrammarHistoryOpen();
  return (
    <FormWrapper>
      {/*text area and pdf upload and url input*/}
      {!isGrammarHistoryOpen && (
        <div className={`col form-gap  `}>
          <GrammarTextBox
            value={value}
            onTextAreaChange={onTextAreaChange}
            maxLength={4000}
          />
          {/*submit button and select engine with setting*/}
          <SubmitButtonSelectEngine
            isDisabledSubmit={!value}
            isPending={isPending}
            onClick={onSubmit}
            buttonContent={"Rewrite"}
          />
        </div>
      )}
      {isGrammarHistoryOpen && (
        <div className="col form-gap">
          <HistoryInfoContent onTextAreaChange={onTextAreaChange} />
          <SubmitButtonSelectEngine
            isDisabledSubmit={!value}
            isPending={isPending}
            onClick={onSubmit}
            buttonContent={"Edit Prompt"}
          />
        </div>
      )}
    </FormWrapper>
  );
}
