"use client";
import {
  OptionsSelectBoxes,
  SelectTranslateLanguages,
  SubmitButtonSelectEngine,
  TextBox,
} from "./form-section-components";

import { useCustomSearchParams, useGetDictionary } from "@/hooks";
import { apps } from "@/constants/side-panel";
import type { ParamsType } from "@/services/types";
import { useState } from "react";
import { usePDFConvertor } from "@/services/translate";
import FormWrapper from "@/components/shared/run-tab-for-app/form-wrapper";

interface IProps {
  params: ParamsType;
  value: string;
  onTextAreaChange: (value: string) => void;
  onSubmit: () => void;
  isPending: boolean;
}

/**
 * translate form section
 * @param params
 * @param onUpload
 * @constructor
 */
export default function TranslateFormSection({
  params,
  value,
  onTextAreaChange,
  onSubmit,
  isPending,
}: IProps) {
  const {
    page: { translate },
  } = useGetDictionary();
  const [files, setFiles] = useState<File[]>([]);
  const [url, setUrl] = useState<string>("");
  const [searchParams] = useCustomSearchParams();
  const appName = searchParams.get("app");
  // find app info from apps constant that we had set in search url params in SetSearchParamProvider
  const app = apps.find(
    app => app.title.toLowerCase() === appName?.toLowerCase(),
  );
  const { mutateAsync: covertPDF } = usePDFConvertor();
  const covertToText = async (files: File[]) => {
    const text = await covertPDF(files[0]);
    onTextAreaChange?.(text);
  };
  const onSelectFiles = (files: File[]) => {
    setFiles(files);
    covertToText(files);
  };

  return (
    <FormWrapper>
      {/*select language from/to for translate*/}
      <SelectTranslateLanguages />
      {/*text area and pdf upload and url input*/}
      <TextBox
        mainTextAreaPlaceholder={translate.text_input_placeholder}
        value={value}
        onChange={onTextAreaChange}
      />

      {/*option section like response lang or creativity,...*/}
      <OptionsSelectBoxes hiddenSelectResponseLang />
      {/*submit button and select engine with setting*/}
      <SubmitButtonSelectEngine
        isDisabledSubmit={!value}
        isPending={isPending}
        onClick={onSubmit}
        buttonContent={translate.submit_button_label}
      />
    </FormWrapper>
  );
}
