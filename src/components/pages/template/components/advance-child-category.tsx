"use client";
import { SelectAndDrawer } from "@/components/shared";
import type { StateSetterType } from "@/services/types";
import { Label } from "@/components/ui/label";
import { useGetDictionary } from "@/hooks";
import {
  useChildCategories,
  useTemplateParentCategories,
} from "@/services/templates";
import { cn } from "@/lib/utils";

interface AdvancedParentCategoryProps {
  selectedParentCategoryId: number;
  setSelectedChildCategoryId: StateSetterType<number>;
  setSelectedChildItemName: StateSetterType<string>;
  selectedChildCategoryId: number;
}

export function AdvancedChildCategory({
  selectedParentCategoryId,
  setSelectedChildItemName,
  setSelectedChildCategoryId,
  selectedChildCategoryId,
}: AdvancedParentCategoryProps) {
  const {
    page: { template: dictionary },
  } = useGetDictionary();
  const categories = useTemplateParentCategories();
  const { childCategories, isLoading } = useChildCategories(
    selectedParentCategoryId,
  );
  console.log("childCategories", childCategories);
  function handleSelectChild(id: string) {
    setSelectedChildCategoryId(Number(id));
    setSelectedChildItemName(
      childCategories.find(i => i.id.toString() === id)?.name || "",
    );
  }

  const getValue = () => {
    return (
      childCategories.find(
        item => item.id === String(selectedChildCategoryId),
      ) ?? { id: "-1", title: "", value: "" }
    );
  };

  return (
    <>
      {selectedParentCategoryId === -1 && (
        <div
          className={cn(
            "col   pointer-events-none mx-[24px] w-full items-start rounded-xl opacity-55",
          )}
        >
          <div className="col w-full max-w-2xl gap-1.5 text-[14px] font-[500]">
            <Label>Child Category</Label>
            <SelectAndDrawer
              value={getValue()}
              setValue={handleSelectChild}
              items={childCategories}
              isSelect={false}
              buttonStyle="w-[90%] lg:max-w-2xl mb-10"
            />
          </div>
        </div>
      )}
      {selectedParentCategoryId !== -1 && (
        <div className={cn("col   mx-[24px] w-full items-start rounded-xl ")}>
          <div className="col w-full max-w-2xl gap-1.5 text-[14px] font-[500]">
            <Label>Child Category</Label>
            <SelectAndDrawer
              value={getValue()}
              setValue={handleSelectChild}
              items={childCategories}
              isSelect={false}
              buttonStyle="w-[90%] lg:max-w-2xl mb-10"
            />
          </div>
        </div>
      )}
    </>
  );
}
