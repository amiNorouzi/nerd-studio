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
import { useState } from "react";
import { useTemplateStore } from "@/stores/zustand/template-store";

const content = {
  Advance: AdvancedPrompt,
  "My Prompt": MyCustomPrompt,
  default: TemplateList,
} as const;
export function TemplatePage({ lang }: LangParams["params"]) {
  const [searchParams, setSearchParams] = useCustomSearchParams();
  const templateTab = useTemplateStore.use.templateTab();
  const setTemplatePageContent = useTemplateStore.use.setTemplatePageContent();
  const Content = content[templateTab];
  const isDefaultContent = templateTab === "default";
  function onChangeTabValue(v: string) {
    setTemplatePageContent("default");
  }

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
          className="col max-h-page h-[var(--main-height)]  w-full gap-4 overflow-y-auto bg-white p-2 md:p-4 lg:gap-6 lg:p-6"
        >
          {/*this section used for search in list*/}
          <RenderIf isTrue={isDefaultContent}>
            <BannerWithSearch name={"template-search"} />
          </RenderIf>
          <div
            className={cn(
              "flex items-center justify-between gap-2",
              !isDefaultContent && "border-b pb-4",
            )}
          >
            {/*this section show categories and set selected category in url search param*/}
            <Categories
              name={"select-template-category"}
              onChangeTabValue={onChangeTabValue}
              //TODO:this props must be replaced with data from api
              categories={categories}
              // className="w-fit max-w-fit"
            />

            {/* advance and my prompt button that change the content by set template-content in query param in url*/}
            <AdvancedAndCustomButtons />
          </div>
          {/**
           *this section show Content
           * TemplateList
           * AdvancedPrompt
           * MyCustomPrompt
           */}
          <Content />
        </div>
      </div>
    </SetSearchParamProvider>
  );
}
