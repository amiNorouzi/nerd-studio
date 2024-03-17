import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { mockData } from "./constant";
import type { StateSetterType } from "@/services/types";
import { SelectAndDrawer } from "@/components/shared";

interface ChildCategoryItemProps {
  id: number;
  title: string;
  description: string;
  selectedItem: number;
  handleSelectItem: (v: number) => void;
}
function ParentCategoryItems({
  title,
  id,
  description,
  selectedItem,
  handleSelectItem,
}: ChildCategoryItemProps) {
  const isItemSelected = selectedItem === id;
  return (
    <div
      onClick={() => handleSelectItem(id)}
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
          {title}
        </h4>
        <p className="line-clamp-2 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
interface AdvancedParentCategoryProps {
  selectedCategoryParentItemId: number;
  setSelectedCategoryParentItemId: StateSetterType<number>;
}
function getData<
  T extends { id: number; title: string; description: string }[],
>(data: T) {
  return data.map(item => ({
    ...item,
    value: item.title,
    id: String(item.id),
  }));
}
export function AdvancedParentCategory({
  selectedCategoryParentItemId,
  setSelectedCategoryParentItemId,
}: AdvancedParentCategoryProps) {
  const data = getData(mockData);
  function handleSelect(id: string) {
    setSelectedCategoryParentItemId(Number(id));
  }
  const value = data.find(
    item => item.id === String(selectedCategoryParentItemId),
  ) ?? { id: "-1", title: "", description: "", value: "" };
  return (
    <div className="flex size-full  items-start justify-center rounded-xl border p-6">
      <SelectAndDrawer
        value={value}
        setValue={handleSelect}
        items={data}
        isSelect={false}
        buttonStyle="max-w-2xl"
      />
    </div>
  );
}
