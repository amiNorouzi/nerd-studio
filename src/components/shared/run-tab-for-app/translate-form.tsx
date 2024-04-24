"use client";
import { useSearchParams } from "next/navigation";
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
import { useEffect, useState } from "react";
import FormWrapper from "@/components/shared/run-tab-for-app/form-wrapper";
import { useUploadPdf } from "@/services/upload";

interface IProps {
  params: ParamsType;
  value: string;
  onTextAreaChange: (value: string) => void;
  onSubmit: () => void;
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
    mutateAsync: covertPDF,
    data,
    uploadProgress,
    successfulUploads,
    setSuccessfulUploads,
    setIndex: setUploadIndex,
    index: uploadIndex,
  } = useUploadPdf();

  //set states of the upload hook
  useEffect(() => {
    if (uploadIndex === files.length) {
      setSuccessfulUploads(0);
      setUploadIndex(null);
    }
  }, [
    successfulUploads,
    files,
    setSuccessfulUploads,
    uploadIndex,
    setUploadIndex,
  ]);
  const covertToText = async (files: File[]) => {
    let index = 0;
    for (const file of files) {
      const text = await covertPDF(file);

      index++;
    }
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
      {/*upload pdf and url input*/}
      <Upload
        setFiles={onSelectFiles}
        setUserUrl={setUrl}
        files={files}
        userUrl={url}
        successfulUploads={successfulUploads}
        uploadIndex={uploadIndex}
        uploadProgress={uploadProgress}
      />

      {/*option section like response lang or creativity,...*/}
      <OptionsSelectBoxes hiddenSelectResponseLang />
      {/*submit button and select engine with setting*/}
      <SubmitButtonSelectEngine
        onClick={onSubmit}
        buttonContent={translate.submit_button_label}
      />
    </FormWrapper>
  );
}
