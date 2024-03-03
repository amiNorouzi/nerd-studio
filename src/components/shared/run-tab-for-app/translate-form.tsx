"use client";
import { useSearchParams } from "next/navigation";
import {
  OptionsSelectBoxes,
  SubmitButtonSelectEngine,
  TextBox,
  SelectTranslateLanguages,
} from "./form-section-components";
import { RenderImageOrIcon } from "@/components/shared";

import { useGetDictionary } from "@/hooks";
import { apps } from "@/constants/side-panel";
import type { ParamsType } from "@/services/types";

interface IProps {
  params: ParamsType;
}

export function TranslateFormSection({ params }: IProps) {
  const {
    page: { translate },
  } = useGetDictionary();

  const searchParams = useSearchParams();
  const appName = searchParams.get("app");
  // find app info from apps constant that we had set in search url params in SetSearchParamProvider
  const app = apps.find(
    app => app.title.toLowerCase() === appName?.toLowerCase(),
  );

  return (
    <div className="col-span-12 flex h-fit flex-col gap-9 overflow-y-auto bg-card p-4  lg:col-span-6 lg:h-full  lg:max-h-full xl:col-span-4">
      <div className="flex justify-between">
        <div className="flex items-center justify-start gap-3">
          {app?.icon && <RenderImageOrIcon icon={app.icon} />}
          <h3 className="text-base font-semibold">{app?.title}</h3>
        </div>
      </div>
      {/*select language from/to for translate*/}
      <SelectTranslateLanguages />
      {/*text area and pdf upload and url input*/}
      <TextBox mainTextAreaPlaceholder={translate.text_input_placeholder} />
      {/*option section like response lang or creativity,...*/}
      <OptionsSelectBoxes hiddenSelectResponseLang />
      {/*submit button and select engine with setting*/}
      <SubmitButtonSelectEngine buttonContent={translate.submit_button_label} />
    </div>
  );
}
