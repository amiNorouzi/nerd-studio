import { useQuery } from "@tanstack/react-query";

import { TemplateCard } from "./template-card";

import { useAxiosFetcher } from "@/hooks/useAxiosFetcher";
import type { TemplateItem } from "@/services/types";

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
  const { axiosFetch } = useAxiosFetcher();

  const { data } = useQuery({
    queryKey: [
      "template-child-categories",
      selectedParentCategoryId,
      selectedChildCategoryId,
    ],
    queryFn: () =>
      axiosFetch<TemplateItem[]>({
        url: `/templates/child_categories/${selectedParentCategoryId}/child/${selectedChildCategoryId}/templates/`,
      }),
  });

  console.log({ data });

  return (
    <div className="grid w-full grid-cols-1 items-center justify-center gap-x-8 gap-y-3 rounded-xl border p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {/*{data?.map(item => (*/}
      {/*  <TemplateCard*/}
      {/*    key={item.id}*/}
      {/*    template={item}*/}
      {/*    category={selectedChildItemName}*/}
      {/*  />*/}
      {/*))}*/}
    </div>
  );
}
