"use client";
import { SelectAndDrawer } from "@/components/shared";
import type { StateSetterType } from "@/services/types";
import { Label } from "@/components/ui/label";
import { useGetDictionary } from "@/hooks";
import {
  useChildCategories,
  useTemplateParentCategories,
} from "@/services/templates";

interface AdvancedParentCategoryProps {
  selectedParentCategoryId: number;
  setSelectedParentCategoryId: StateSetterType<number>;
  setSelectedChildCategoryId: StateSetterType<number>;
}

export function AdvancedCategory({
  selectedParentCategoryId,
  setSelectedParentCategoryId,
  setSelectedChildCategoryId,
}: AdvancedParentCategoryProps) {
  const {
    page: { template: dictionary },
  } = useGetDictionary();
  const categories = useTemplateParentCategories();

  function handleSelect(id: string) {
    setSelectedParentCategoryId(Number(id));
    setSelectedChildCategoryId(-1);
  }

  const getValue = (isChild: boolean = false) => {
    return (
      categories.find(item => item.id === String(selectedParentCategoryId)) ?? {
        id: "-1",
        title: "",
        value: "",
      }
    );
  };

  return (
    <div className="col  lg:mx-[24px] w-full items-start rounded-xl ">
      <div className="col w-full px-[16px] lg:px-0 lg:max-w-2xl  text-[14px] font-[500]">
        <div className='flex flex-col w-full    gap-[12px]'>

        <Label>{dictionary.parent_category}</Label>
        <SelectAndDrawer
          value={getValue()}
          setValue={handleSelect}
          items={categories}
          isSelect={false}
          buttonStyle="w-full  h-[44px] lg:max-w-2xl mb-10"
        />
        </div>

      </div>
    </div>
  );
}
