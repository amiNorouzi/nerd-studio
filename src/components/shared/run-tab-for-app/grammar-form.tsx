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
    <div
      className="form-gap form-padding col-span-12 flex h-fit flex-col
    overflow-y-auto bg-background lg:col-span-6 lg:h-full lg:max-h-full xl:col-span-4"
    >
      {/*text area and pdf upload and url input*/}
      <GrammarTextBox value={value} setValue={setValue} maxLength={4000} />
      {/*submit button and select engine with setting*/}
      <SubmitButtonSelectEngine
          onClick={() =>{}}
          buttonContent={"Improving"}
      />
    </div>
  );
}
