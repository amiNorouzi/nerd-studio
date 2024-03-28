"use client";
import { useQuery } from "@tanstack/react-query";

import { SelectAndDrawer } from "@/components/shared";

import { useAxiosFetcher } from "@/hooks/useAxiosFetcher";
import type { StateSetterType } from "@/services/types";
import type { CategoryItem } from "@/components/pages/template/types";

interface AdvancedParentCategoryProps {
  selectedParentCategoryId: number;
  setSelectedParentCategoryId: StateSetterType<number>;
}

function getData(data: CategoryItem[]) {
  return data.map(item => ({
    ...item,
    value: item.name,
    id: String(item.id),
  }));
}

export function AdvancedParentCategory({
  selectedParentCategoryId,
  setSelectedParentCategoryId,
}: AdvancedParentCategoryProps) {
  const { axiosFetch } = useAxiosFetcher();

  const { data } = useQuery({
    queryKey: ["template-parent-categories"],
    queryFn: () =>
      axiosFetch<CategoryItem[]>({
        url: "/templates/parent_categories/",
      }),
  });

  const categories = !!data ? getData(data) : [];

  function handleSelect(id: string) {
    setSelectedParentCategoryId(Number(id));
  }

  const value = categories.find(
    item => item.id === String(selectedParentCategoryId),
  ) ?? { id: "-1", title: "", description: "", value: "" };

  return (
    <div className="flex size-full  items-start justify-center rounded-xl border p-6">
      <SelectAndDrawer
        value={value}
        setValue={handleSelect}
        items={categories}
        isSelect={false}
        buttonStyle="max-w-2xl"
      />
    </div>
  );
}
