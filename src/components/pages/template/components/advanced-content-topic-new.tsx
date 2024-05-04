"use client";

import { useTemplatesByChildAndParentCategory } from "@/services/templates";
import { TemplateCard } from "@/components/pages/template/components/template-card";
import { cn } from "@/lib/utils";

interface IProps {
  selectedParentCategoryId: number;
  selectedChildCategoryId: number;
  selectedChildItemName: string;
}

export function AdvancedContentTopicNew({
  selectedChildCategoryId,
  selectedChildItemName,
  selectedParentCategoryId,
}: IProps) {
  const templates = useTemplatesByChildAndParentCategory({
    selectedParentCategoryId,
    selectedChildCategoryId,
  });

  return (
    <div
      className={cn(
        " mx-[24px] flex w-[90%]  overflow-auto rounded-xl border py-2 ",
        (selectedParentCategoryId === -1 ||
          selectedChildCategoryId === -1 ||
          !templates ||
          templates.length === 0) &&
          "hidden",
      )}
    >
      <div className="grid w-full grid-cols-1 items-center justify-center gap-x-8 gap-y-3   p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {templates?.map(item => (
          <TemplateCard
            key={item.id}
            template={item}
            category={selectedChildItemName}
          />
        ))}
      </div>
    </div>
  );
}
