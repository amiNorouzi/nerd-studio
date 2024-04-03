"use client";
import { TemplateCard } from "./template-card";

import { useCustomSearchParams } from "@/hooks";
import { cn } from "@/lib/utils";

import { ALL_PROMPT_TITLE, TEMPLATE_TAB_PARAMS_KEY } from "../constants";

import { TemplateCategoryItem } from "@/services/types";
import { Show } from "@/components/shared";
import { useEffect, useState } from "react";

function TemplateByCategoryItem(item: TemplateCategoryItem) {
  return (
    <div className="mb-6 flex flex-col gap-2">
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
}: {
  templates: TemplateCategoryItem[];
  searchText: string;
}) {
  const [searchParams] = useCustomSearchParams();

  // selected template that read from search param that Categories component set it in url
  const selectedTemplate =
    searchParams.get(TEMPLATE_TAB_PARAMS_KEY) ?? ALL_PROMPT_TITLE;
  const isAllTab = selectedTemplate === ALL_PROMPT_TITLE;

  const allTabData = [...templates].filter(t =>
    t.category_name.toLowerCase().includes(searchText),
  );

  const selectedTabInitialData =
    templates.find(item => item.category_name === selectedTemplate)
      ?.templates || [];
  const [selectedTabData, setSelectedTabData] = useState(
    selectedTabInitialData,
  );

  useEffect(() => {
    if (!isAllTab) {
      setSelectedTabData(
        [...selectedTabInitialData].filter(
          t =>
            t.task.toLowerCase().includes(searchText) ||
            t.topic.toLowerCase().includes(searchText),
        ),
      );
    }
  }, [searchText, selectedTemplate]);

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
            {allTabData.map(item => (
              <TemplateByCategoryItem {...item} key={item.category_name} />
            ))}
          </>
        </Show.When>
        <Show.Else>
          <>
            {selectedTabData?.map(item => (
              <TemplateCard
                key={item.id}
                category={selectedTemplate}
                template={item}
              />
            ))}
          </>
        </Show.Else>
      </Show>
    </div>
  );
}
