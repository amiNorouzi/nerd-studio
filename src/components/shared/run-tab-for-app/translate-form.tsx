"use client";
import { SelectBoxes, SubmitButton, TextBox } from "./form-section-components";

import { RenderImageOrIcon, SelectAndDrawer } from "@/components/shared";
import { useSearchParams } from "next/navigation";
import { apps } from "@/constants/side-panel";
import type { ParamsType } from "@/services/types";
import { useState } from "react";

interface IProps {
  params: ParamsType;
}

export function SelectLanguage() {
  const [value, setValue] = useState({
    fromLang: languages[0],
    toLang: languages[0],
  });
  const setLanguage = (lang: string, name: string) => {
    setValue(prev => ({ ...prev, [name]: lang }));
  };
  return (
    <div className="grid grid-cols-1 items-start gap-x-5 gap-y-9  sm:grid-cols-2">
      <div className="flex flex-col gap-3">
        <span className="m-0 flex items-baseline gap-2 text-sm font-normal">
          Text language
        </span>

        <SelectAndDrawer
          value={value.fromLang}
          setValue={v => setLanguage(v, "fromLang")}
          items={languages}
        />
      </div>
      <div className="flex flex-col gap-3">
        <span className="m-0 flex items-baseline gap-2 text-sm font-normal">
          Translation language
        </span>

        <SelectAndDrawer
          value={value.toLang}
          setValue={v => setLanguage(v, "toLang")}
          items={languages}
        />
      </div>
    </div>
  );
}

export function TranslateFormSection({ params }: IProps) {
  /** these states used when user select a template
   * these states are for favorite icon and open modal to show message for add or remove from favorites
   * */
  const searchParams = useSearchParams();
  const appName = searchParams.get("app");
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

      <SelectLanguage />
      <TextBox />
      <SelectBoxes hiddenSelectResponseLang />
      <SubmitButton />
    </div>
  );
}

const languages = [
  "English",
  "Persian",
  "Arabic",
  "French",
  "German",
  "Italian",
  "Japanese",
  "Korean",
  "Russian",
  "Spanish",
  "Turkish",
];
