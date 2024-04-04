"use client";
import { useSearchParams } from "next/navigation";
import {
  OptionsSelectBoxes,
  SubmitButtonSelectEngine,
  TextBox,
  SelectTranslateLanguages,
  Upload,
} from "./form-section-components";
import { RenderImageOrIcon } from "@/components/shared";

import { useGetDictionary } from "@/hooks";
import { apps } from "@/constants/side-panel";
import type { ParamsType } from "@/services/types";
import { useState } from "react";

interface IProps {
  params: ParamsType;
}

/**
 * translate form section
 * @param params
 * @constructor
 */
export function TranslateFormSection({ params }: IProps) {
  const {
    page: { translate },
  } = useGetDictionary();
  const [files, setFiles] = useState<File[]>([]);
  const [url, setUrl] = useState<string>("");
  const searchParams = useSearchParams();
  const appName = searchParams.get("app");
  // find app info from apps constant that we had set in search url params in SetSearchParamProvider
  const app = apps.find(
    app => app.title.toLowerCase() === appName?.toLowerCase(),
  );

  return (
    <div className="form-gap form-padding col-span-12 flex h-fit flex-col overflow-y-auto bg-background lg:col-span-6 lg:h-full lg:max-h-full xl:col-span-4">
      {/*select language from/to for translate*/}
      <SelectTranslateLanguages />
      {/*text area and pdf upload and url input*/}
      <TextBox mainTextAreaPlaceholder={translate.text_input_placeholder} />
      {/*upload pdf and url input*/}
      <Upload
        setFiles={setFiles}
        setUserUrl={setUrl}
        files={files}
        userUrl={url}
      />

      {/*option section like response lang or creativity,...*/}
      <OptionsSelectBoxes hiddenSelectResponseLang />
      {/*submit button and select engine with setting*/}
      <SubmitButtonSelectEngine buttonContent={translate.submit_button_label} />
    </div>
  );
}
