import { TemplateCard } from "./template-card";

import { useAxiosFetcher } from "@/hooks/useAxiosFetcher";
import { useTemplatesByChildAndParentCategory } from "@/services/templates";

interface IProps {
  selectedParentCategoryId: number;
  selectedChildCategoryId: number;
  selectedChildItemName: string;
}

export function AdvancedContentTopic({
  selectedChildCategoryId,
  selectedChildItemName,
  selectedParentCategoryId,
}: IProps) {
  const templates = useTemplatesByChildAndParentCategory({
    selectedParentCategoryId,
    selectedChildCategoryId,
  });

  return (
    <div className="mx-[24px] grid w-full grid-cols-1 items-center justify-center gap-x-8 gap-y-3 rounded-xl border p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {templates?.map(item => (
        <TemplateCard
          key={item.id}
          template={item}
          category={selectedChildItemName}
        />
      ))}
    </div>
  );
}
