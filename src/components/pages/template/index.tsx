"use client";
import {
  BannerWithSearch,
  Categories,
  SetSearchParamProvider,
} from "@/components/shared";
import { AdvancedButton, TemplateList, AdvancedPrompt } from "./components";
import RenderIf from "@/components/shared/RenderIf";

import { useCustomSearchParams } from "@/hooks";

import { cn } from "@/lib/utils";

import { ALL_PROMPT_TITLE } from "./constants";
import type { TemplateCategoryItem } from "@/services/types";

const content = {
  advance: AdvancedPrompt,
  default: TemplateList,
} as const;
export async function TemplatePage({
  templates,
}: {
  templates: TemplateCategoryItem[];
}) {
  const [searchParams] = useCustomSearchParams();
  const selectedTemplate =
    searchParams.get("select-template-category") ?? ALL_PROMPT_TITLE;
  const templateTab = selectedTemplate == "advance" ? "advance" : "default";
  const Content = content[templateTab];
  const isDefaultContent = templateTab === "default";

  /**
   * * Important: SetSearchParamProvider is used to set apps name to url search param
   *  value of it used in apps Header in  layout or form-section
   *  and everywhere that needs to know app name
   */
  return (
    <SetSearchParamProvider
      appName={"app"}
      appSearchParamValue={"prompt_library"}
    >
      <div className="h-full w-full">
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
              name="select-template-category"
              categories={[
                ALL_PROMPT_TITLE,
                ...templates.map(t => t.category_name),
              ]}
            />

            {/* advance and my prompt button that change the content by set template-content in query param in url*/}
            <AdvancedButton />
          </div>
          {/**
           *this section show Content
           * TemplateList
           * AdvancedPrompt
           */}
          <Content templates={templates} />
        </div>
      </div>
    </SetSearchParamProvider>
  );
}
