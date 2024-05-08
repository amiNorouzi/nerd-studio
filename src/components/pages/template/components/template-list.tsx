"use client";
import { TemplateCard } from "./template-card";

import { useCustomSearchParams } from "@/hooks";
import { cn } from "@/lib/utils";

import { ALL_PROMPT_TITLE, TEMPLATE_TAB_PARAMS_KEY } from "../constants";

import { TemplateCategoryItem, TemplateItem } from "@/services/types";
import { Show } from "@/components/shared";
import { useEffect, useState } from "react";

function TemplateByCategoryItem(item: TemplateCategoryItem) {
  return (
    <div className="mb-form-gap flex flex-col gap-2">
      <div className="flex justify-between">
        <h3 className="text-base font-semibold text-muted-foreground">
          {item.category_name}:
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {item.templates.map(template => (
          <TemplateCard
            key={template.id}
            template={template}
            category={item.category_name}
          />
        ))}
      </div>
    </div>
  );
}
/**
 * list of template cards
 * @constructor
 */

export function TemplateList({
  templates,
  searchText,
  selectedTab,
}: {
  templates: TemplateCategoryItem[];
  searchText: string;
  selectedTab: string;
}) {
  const [searchParams] = useCustomSearchParams();

  // selected template that read from search param that Categories component set it in url
  // const selectedTab =
  //   searchParams.get(TEMPLATE_TAB_PARAMS_KEY) ?? ALL_PROMPT_TITLE;
  const isAllTab = selectedTab === ALL_PROMPT_TITLE;

  const allTabData = [...templates].filter(t =>
    t.category_name.toLowerCase().includes(searchText),
  );

  // const selectedTabInitialData =
  //   templates.find(item => item.category_name === selectedTab)?.templates || [];
  const [selectedTabData, setSelectedTabData] = useState<TemplateItem[]>([]);

  useEffect(() => {
    if (!isAllTab) {
      const filteredPrompts = templates
        .filter(template => template.category_name === selectedTab)[0]
        .templates.filter(
          item =>
            item.task.toLowerCase().includes(searchText) ||
            item.topic.toLowerCase().includes(searchText),
        );
      setSelectedTabData(filteredPrompts);
    }
  }, [isAllTab, searchText, selectedTab, templates]);

  return (
    <div
      className={cn(
        !isAllTab &&
          "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      )}
    >
      <Show>
        <Show.When isTrue={isAllTab}>
          <>
            {allTabData.map((item, index) => (
              <TemplateByCategoryItem
                {...item}
                key={item.category_name + index}
              />
            ))}
          </>
        </Show.When>
        <Show.Else>
          <>
            {selectedTabData?.map((item, index) => (
              <TemplateCard
                key={index}
                category={selectedTab}
                template={item}
              />
            ))}
          </>
        </Show.Else>
      </Show>
    </div>
  );
}
