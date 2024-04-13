"use client";
import { useQuery } from "@tanstack/react-query";

import { SelectAndDrawer, Show } from "@/components/shared";

import { useAxiosFetcher } from "@/hooks/useAxiosFetcher";
import type { StateSetterType } from "@/services/types";
import type { CategoryItem } from "@/components/pages/template/types";
import RenderIf from "@/components/shared/RenderIf";
import { Label } from "@/components/ui/label";
import { useGetDictionary } from "@/hooks";
import AdvanceCategorySkeleton from "@/components/pages/template/components/advance-category-skeleton";

interface AdvancedParentCategoryProps {
  selectedParentCategoryId: number;
  setSelectedParentCategoryId: StateSetterType<number>;
  setSelectedChildCategoryId: StateSetterType<number>;
  setSelectedChildItemName: StateSetterType<string>;
  selectedChildCategoryId: number;
}

function getData(data: CategoryItem[]) {
  return data.map(item => ({
    ...item,
    value: item.name,
    id: String(item.id),
  }));
}

export function AdvancedCategory({
  selectedParentCategoryId,
  setSelectedParentCategoryId,
  setSelectedChildItemName,
  setSelectedChildCategoryId,
  selectedChildCategoryId,
}: AdvancedParentCategoryProps) {
  const {
    page: { template: dictionary },
  } = useGetDictionary();
  const { axiosFetch } = useAxiosFetcher();

  const { data } = useQuery({
    queryKey: ["template-parent-categories"],
    queryFn: () =>
      axiosFetch<CategoryItem[]>({
        url: "/templates/parent_categories/",
      }),
  });

  const { data: childCategoriesData, isLoading } = useQuery({
    queryKey: ["template-child-categories", selectedParentCategoryId],
    queryFn: () =>
      axiosFetch<CategoryItem[]>({
        url: `/templates/child_categories/${selectedParentCategoryId}/child/`,
      }),
    enabled: !!selectedParentCategoryId,
  });

  const categories = !!data ? getData(data) : [];
  const childCategories = !!childCategoriesData
    ? getData(childCategoriesData)
    : [];

  function handleSelect(id: string) {
    setSelectedChildCategoryId(-1);
    setSelectedParentCategoryId(Number(id));
  }

  function handleSelectChild(id: string) {
    setSelectedChildCategoryId(Number(id));
    setSelectedChildItemName(
      childCategories.find(i => i.id.toString() === id)?.name || "",
    );
  }

  const getValue = (isChild: boolean = false) => {
    const list = isChild ? childCategories : categories;
    return (
      list.find(
        item =>
          item.id ===
          String(isChild ? selectedChildCategoryId : selectedParentCategoryId),
      ) ?? { id: "-1", title: "", value: "" }
    );
  };

  return (
    <div className="col size-full items-center rounded-xl border p-6">
      <div className="col w-full max-w-2xl gap-1.5">
        <Label>{dictionary.parent_category}</Label>
        <SelectAndDrawer
          value={getValue()}
          setValue={handleSelect}
          items={categories}
          isSelect={false}
          buttonStyle="max-w-2xl mb-10"
        />
        <Show>
          <Show.When isTrue={isLoading && !!selectedParentCategoryId}>
            <AdvanceCategorySkeleton />
          </Show.When>
          <Show.When isTrue={!isLoading && !!childCategoriesData}>
            <>
              <Label>{dictionary.child_category}</Label>
              <SelectAndDrawer
                value={getValue(true)}
                setValue={handleSelectChild}
                items={childCategories}
                isSelect={false}
                buttonStyle="max-w-2xl"
              />
            </>
          </Show.When>
        </Show>
      </div>
    </div>
  );
}
