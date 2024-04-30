"use client";
import { useState } from "react";
import {
  GrammarTextBox,
  SubmitButtonSelectEngine,
} from "./form-section-components";
import { FaRegStar, FaStar } from "react-icons/fa6";
import type { ParamsType, TemplateItem } from "@/services/types";
import FormWrapper from "@/components/shared/run-tab-for-app/form-wrapper";
import { HistoryInfoContent } from "@/components/pages/grammar/history-info-content";
import { useHistoryStore } from "@/stores/zustand/history-store";
import { useCovertPdfToText } from "@/services/covert-pdf-to-text";

interface IProps {
  params: ParamsType;
  template?: TemplateItem;
  buttonContent: string;
  mainTextAreaPlaceholder: string;
  onTextAreaChange(value: string): void;
  value: string;
  isPending: boolean;
  onSubmit(): void;
}

const startIcon = {
  fav: FaStar,
  notFav: FaRegStar,
} as const;

/**
 * form section for Rewrite and template
 * @param template
 * @param buttonContent
 * @param mainTextAreaPlaceholder
 * @constructor
 */
export default function FormSection({
  template,
  buttonContent,
  mainTextAreaPlaceholder,
  isPending,
  onTextAreaChange,
  onSubmit,
  value,
}: IProps) {
  /** these states used when user select a template
   * these states are for favorite icon and open modal to show message for add or remove from favorites
   * */
  const [favTemp, setFavTemp] = useState(false);
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [url, setUrl] = useState<string>("");

  const { mutateAsync: covertPDF } = useCovertPdfToText();
  const covertToText = async (files: File[]) => {
    const text = await covertPDF(files[0]);
    text && onTextAreaChange(text);
  };

  const onSelectFiles = (files: File[]) => {
    setFiles(files);
    covertToText(files);
  };
  // const icon = template?.icon ?? app?.icon;
  const icon = "/images/gpt.jpeg";

  // here we select favorite icon if we select a template
  const cardIcon = favTemp ? "fav" : "notFav";
  const ButtonIcon = startIcon[cardIcon];
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
