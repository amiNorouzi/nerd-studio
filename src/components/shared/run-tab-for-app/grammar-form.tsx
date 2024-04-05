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

interface IProps {
  params: ParamsType;
}

/**
 * grammar form section
 * @param params
 * @constructor
 */
export default function GrammarFormSection({ params }: IProps) {
  const {
    page: { translate },
  } = useGetDictionary();

  const searchParams = useSearchParams();
  const appName = searchParams.get("app");
  // find app info from apps constant that we had set in search url params in SetSearchParamProvider
  const app = apps.find(
    app => app.title.toLowerCase() === appName?.toLowerCase(),
  );

  const [value, setValue] = useState("");
  return (
    <FormWrapper>
      {/*text area and pdf upload and url input*/}
      <GrammarTextBox value={value} setValue={setValue} maxLength={4000} />
      {/*submit button and select engine with setting*/}
      <SubmitButtonSelectEngine
        onClick={() => {}}
        buttonContent={"Improving"}
      />
    </FormWrapper>
  );
}
