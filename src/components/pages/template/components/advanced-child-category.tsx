import { useQuery } from "@tanstack/react-query";

import { Checkbox } from "@/components/ui/checkbox";

import { useAxiosFetcher } from "@/hooks/useAxiosFetcher";
import { cn } from "@/lib/utils";

import type { StateSetterType } from "@/services/types";
import type { CategoryItem } from "../types";

interface ChildCategoryItemProps {
  id: number;
  name: string;
  selectedItem: number;
  handleSelectItem: (v: CategoryItem) => void;
}
function ChildCategoryItems({
  name,
  id,
  selectedItem,
  handleSelectItem,
}: ChildCategoryItemProps) {
  const isItemSelected = selectedItem === id;
  return (
    <div
      onClick={() => handleSelectItem({ id, name })}
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-all hover:scale-110",
        isItemSelected && "border-primary bg-primary-light text-primary",
      )}
    >
      <Checkbox
        checked={isItemSelected}
        className="border-muted-foreground data-[state=checked]:border-primary-dark data-[state=checked]:bg-transparent data-[state=checked]:text-primary-dark "
      />
      <div className="col">
        <h4
          className={cn(
            "text-base font-medium",
            isItemSelected && "text-primary-dark",
          )}
        >
          {name}
        </h4>
        {/*<p className="line-clamp-2 text-muted-foreground">{description}</p>*/}
      </div>
    </div>
  );
}
interface ListOfChildCategoryProps {
  selectedChildCategoryId: number;
  setSelectedChildCategoryId: StateSetterType<number>;
  selectedParentCategoryId: number;
  setSelectedChildItemName: StateSetterType<string>;
}
export function AdvancedChildCategory({
  selectedChildCategoryId,
  setSelectedChildCategoryId,
  selectedParentCategoryId,
  setSelectedChildItemName,
}: ListOfChildCategoryProps) {
  const { axiosFetch } = useAxiosFetcher();

  const { data } = useQuery({
    queryKey: ["template-child-categories", selectedParentCategoryId],
    queryFn: () =>
      axiosFetch<CategoryItem[]>({
        url: `/templates/child_categories/${selectedParentCategoryId}/child/`,
      }),
  });

  const handleSelect = (item: CategoryItem) => {
    setSelectedChildItemName(item.name);
    setSelectedChildCategoryId(item.id);
  };

  return (
    <div className="grid grid-cols-1 items-center justify-center gap-x-8 gap-y-3 rounded-xl border p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {data?.map(item => (
        <ChildCategoryItems
          key={item.id}
          {...item}
          selectedItem={selectedChildCategoryId}
          handleSelectItem={handleSelect}
        />
      ))}
    </div>
  );
}
