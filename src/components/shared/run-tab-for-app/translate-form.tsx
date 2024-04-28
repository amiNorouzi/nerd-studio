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
import { useEffect, useState } from "react";
import FormWrapper from "@/components/shared/run-tab-for-app/form-wrapper";
import { useCovertPdfToText } from "@/services/covert-pdf-to-text";
import useSuccessToast from "@/hooks/useSuccessToast";
import useErrorToast from "@/hooks/useErrorToast";

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
  const [uploadStatus, setUploadStatus] = useState<boolean[]>([]);

  //returned text from pdfConvertor
  const [extractedText, setExtractedText] = useState("");
  const {
    mutateAsync: covertPDF,
    data,
    uploadProgress,

    setIndex: setUploadIndex,
    index: uploadIndex,
  } = useCovertPdfToText();

  //
  const { showSuccess } = useSuccessToast();
  const { showError } = useErrorToast();
  //set states of the upload hook
  useEffect(() => {
    if (uploadIndex === files.length) {
      setUploadIndex(null);
      setUploadStatus([]);
    }
  }, [files, uploadIndex, setUploadIndex]);
  const covertToText = async (files: File[]) => {
    let index = 0;
    for (const file of files) {
      const text = await covertPDF(file);
      if (text) {
        setExtractedText(prev => prev + text);
        setUploadStatus(prev => [...prev, true]);
        showSuccess(` file ${file.name} uploaded`);
      } else {
        showError(` file ${file.name} failed upload`);
        setUploadStatus(prev => [...prev, false]);
      }
      index++;
    }
  };
  const onSelectFiles = (files: File[]) => {
    setFiles(files);
  };

  const startConverting = (files: File[]) => {
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
      {/*upload pdf and url input*/}

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
