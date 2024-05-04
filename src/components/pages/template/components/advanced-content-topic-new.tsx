"use client";

import { useTemplatesByChildAndParentCategory } from "@/services/templates";
import { TemplateCard } from "@/components/pages/template/components/template-card";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { SelectAndDrawer } from "@/components/shared";

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
    <>
      {selectedChildCategoryId === -1 &&  (
        <div
          className={cn(
            "col   pointer-events-none mx-[24px] w-full items-start rounded-xl opacity-55",
          )}
        >
          <div className="col w-full max-w-2xl gap-1.5 text-[14px] font-[500]">
            <Label>Child Category</Label>
            <SelectAndDrawer
              value={''}
              setValue={()=>{}}
              items={[]}
              isSelect={false}
              buttonStyle="w-[90%] lg:max-w-2xl mb-10"
            />
          </div>
        </div>
      )}
      {selectedParentCategoryId !== -1 && selectedChildCategoryId !== -1 && templates && templates?.length > 0 &&
        <div className='flex w-full'>
        <div
          className={cn(
            "mx-[16px] lg:mx-[24px] flex w-full  overflow-auto rounded-xl border py-2 ",

          )}
        >
          <div
            className="grid w-full grid-cols-1 items-center justify-center gap-x-8 gap-y-3   p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {templates?.map(item => (
              <TemplateCard
                key={item.id}
                template={item}
                category={selectedChildItemName}
              />
            ))}
          </div>
        </div>
        </div>

      }


    </>
  );
}
