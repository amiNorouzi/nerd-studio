"use client";
import {
  OptionsSelectBoxes,
  SelectTranslateLanguages,
  SubmitButtonSelectEngine,
  TextBox,
  Upload,
} from "./form-section-components";

import { useCustomSearchParams, useGetDictionary } from "@/hooks";
import { apps } from "@/constants/side-panel";
import type { ParamsType } from "@/services/types";
import React, { useEffect, useState } from "react";
import FormWrapper from "@/components/shared/run-tab-for-app/form-wrapper";
import { useUploadPdf } from "@/services/upload";
import useSuccessToast from "@/hooks/useSuccessToast";
import useErrorToast from "@/hooks/useErrorToast";
import GrammarInputDiv from "@/components/pages/grammar/InputDiv";
import { useUploadData } from "@/components/shared/run-tab-for-app/upload-section";

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

  const {
    setExtractedText,
    extractedText,
    startConverting,
    uploadStatus,
    setUploadStatus,
    uploadProgress,
    uploadIndex,
  } = useUploadData({ files: files });

  const onSelectFiles = (files: File[]) => {
    setFiles(files);
  };

  return (
    <FormWrapper>
      {/*select language from/to for translate*/}
      <SelectTranslateLanguages />
      {/*text area and pdf upload and url input*/}
      {/*<TextBox*/}
      {/*  mainTextAreaPlaceholder={translate.text_input_placeholder}*/}
      {/*  value={value}*/}
      {/*  onChange={onTextAreaChange}*/}
      {/*/>*/}
      <div className="relative">
        <GrammarInputDiv
          onTextChange={onTextAreaChange}
          value={value}
          setFiles={onSelectFiles}
          setUserUrl={setUrl}
          files={files}
          userUrl={url}
          extractedText={extractedText}
        />
        {/*upload pdf and url input*/}

        <div className=" absolute -bottom-3   flex h-[28px] w-[103px] items-center gap-[10px] rounded-[10px]  p-[10px] text-muted-foreground">
          <Upload
            setFiles={onSelectFiles}
            setUserUrl={setUrl}
            files={files}
            userUrl={url}
            uploadStatus={uploadStatus}
            uploadIndex={uploadIndex}
            uploadProgress={uploadProgress}
            startConverting={startConverting}
            setExtractedText={setExtractedText}
          />
        </div>
      </div>
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
