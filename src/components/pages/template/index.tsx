"use client";
import {
  BannerWithSearch,
  Categories,
  SetSearchParamProvider,
} from "@/components/shared";
import {
  AdvancedAndCustomButtons,
  TemplateList,
  AdvancedPrompt,
  MyCustomPrompt,
} from "./components";
import RenderIf from "@/components/shared/RenderIf";

import { useCustomSearchParams } from "@/hooks";
import { categories } from "./components/constant";
import { cn } from "@/lib/utils";
import type { LangParams } from "@/services/types";

const content = {
  ADVANCE: AdvancedPrompt,
  "MY PROMPT": MyCustomPrompt,
  default: TemplateList,
} as const;
export function TemplatePage({ lang }: LangParams["params"]) {
  const [searchParams] = useCustomSearchParams();
  const isTemplateContentHasValue = !!searchParams.get("template-content");
  const Content =
    content[
      (searchParams.get("template-content") as keyof typeof content) ??
        "default"
    ];

  /**
   * * Important: SetSearchParamProvider is used to set apps name to url search param
   *  value of it used in apps Header in  layout or form-section
   *  and everywhere that needs to know app name
   */
  return (
    <SetSearchParamProvider appName={"app"} appSearchParamValue={"template"}>
      <div className="h-full w-full">
        {/*<SpacesHeader>*/}
        {/*  <h1 className="ms-2 text-[15px] font-semibold">Template</h1>*/}
        {/*</SpacesHeader>*/}

        <div
          id="app-store-main"
          className="col max-h-page h-[var(--main-height)] w-full gap-4 overflow-y-auto bg-white p-2 md:p-4 lg:gap-6 lg:p-6"
        >
          {/*this section used for search in list*/}
          <RenderIf isTrue={!isTemplateContentHasValue}>
            <BannerWithSearch name={"template-search"} />
          </RenderIf>
          <div
            className={cn(
              "flex items-center justify-between",
              isTemplateContentHasValue && "border-b pb-4",
            )}
          >
            {/*this section show categories and set selected category in url search param*/}
            <Categories
              name={"select-template-category"}
              //TODO:this props must be replaced with data from api
              categories={categories}
            />

            <AdvancedAndCustomButtons />
          </div>
          {/*this section show Content*/}
          <Content />
        </div>
      </div>
    </SetSearchParamProvider>
  );
}
