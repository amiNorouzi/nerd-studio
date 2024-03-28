"use client";
import { TemplateCard } from "./template-card";

import { useCustomSearchParams } from "@/hooks";
import { cn } from "@/lib/utils";

import { ALL_PROMPT_TITLE } from "../constants";

import { TemplateCategoryItem } from "@/services/types";
import { Show } from "@/components/shared";

function TemplateByCategoryItem(item: TemplateCategoryItem) {
  return (
    <div className="mb-10 flex flex-col gap-2">
      <div className="flex justify-between">
        <h3 className="text-base font-semibold text-muted-foreground">
          {item.category_name}:
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
}: {
  templates: TemplateCategoryItem[];
}) {
  const [searchParams] = useCustomSearchParams();

  // selected template that read from search param that Categories component set it in url
  const selectedTemplate =
    searchParams.get("select-template-category") ?? ALL_PROMPT_TITLE;
  const isAllTab = selectedTemplate === ALL_PROMPT_TITLE;

  return (
    <div
      className={cn(
        !isAllTab &&
          "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
      )}
    >
      <Show>
        <Show.When isTrue={isAllTab}>
          <>
            {templates.map(item => (
              <TemplateByCategoryItem {...item} key={item.category_name} />
            ))}
          </>
        </Show.When>
        <Show.Else>
          <>
            {templates
              .find(item => item.category_name === selectedTemplate)
              ?.templates.map(item => (
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
