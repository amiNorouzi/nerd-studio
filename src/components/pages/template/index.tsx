"use client";
import { useEffect, useState } from "react";

import {
  BannerWithSearch,
  Categories,
  SetSearchParamProvider,
  Show,
} from "@/components/shared";
import {
  AdvancedButton,
  TemplateList,
  AdvancedPrompt,
  TemplateListSkeleton,
} from "./components";
import RenderIf from "@/components/shared/RenderIf";

import { useCustomSearchParams } from "@/hooks";

import { cn } from "@/lib/utils";

import {
  ALL_PROMPT_TITLE,
  tabsType,
  TEMPLATE_TAB_PARAMS_KEY,
} from "./constants";
import type { TemplateCategoryItem } from "@/services/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxiosFetcher } from "@/hooks/useAxiosFetcher";
import { CategoryItem } from "@/components/pages/template/types";

const content = {
  advance: AdvancedPrompt,
  default: TemplateList,
} as const;
export function TemplatePage() {
  const [tab, setTab] = useState(ALL_PROMPT_TITLE);
  const { axiosFetch } = useAxiosFetcher();
  const queryClient = useQueryClient();
  const [searchParams] = useCustomSearchParams();
  const templateTab =
    tab == tabsType.advance ? tabsType.advance : tabsType.default;
  const Content = content[templateTab];
  const isDefaultContent = templateTab === tabsType.default;
  const [searchText, setSearchText] = useState("");

  const { data: templates = [], isLoading } = useQuery({
    queryKey: ["all-templates"],
    queryFn: () =>
      axiosFetch<TemplateCategoryItem[]>({
        url: "/templates/public/",
      }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 120000,
    refetchInterval: 120000,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["template-parent-categories"],
      queryFn: () =>
        axiosFetch<CategoryItem[]>({
          url: "/templates/parent_categories/",
        }),
    });
  }, []);

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
          className="col max-h-page h-[var(--main-height)]  w-full overflow-y-auto bg-background"
        >
          {/*this section used for search in list*/}
          <RenderIf isTrue={isDefaultContent}>
            <BannerWithSearch
              name={"template-search"}
              onChangeText={setSearchText}
              value={searchText}
            />
          </RenderIf>
          <div className="col h-fit w-full gap-4 p-2 md:p-4 lg:gap-6 lg:p-6">
            <Show>
              <Show.When isTrue={isLoading}>
                <TemplateListSkeleton />
              </Show.When>
              <Show.Else>
                <>
                  <div
                    className={cn(
                      "flex items-center justify-between gap-2",
                      !isDefaultContent && "border-b pb-4",
                    )}
                  >
                    {/*this section show categories and set selected category in url search param*/}
                    <Categories
                      value={tab}
                      onChangeTabValue={setTab}
                      name={TEMPLATE_TAB_PARAMS_KEY}
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
                  <Content
                    templates={templates}
                    searchText={searchText}
                    selectedTemplate={tab}
                  />
                </>
              </Show.Else>
            </Show>
          </div>
        </div>
      </div>
    </SetSearchParamProvider>
  );
}
