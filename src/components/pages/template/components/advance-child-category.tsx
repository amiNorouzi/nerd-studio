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
import history from "@/services/history";

interface AdvancedParentCategoryProps {
  selectedParentCategoryId: number;
  setSelectedChildCategoryId: StateSetterType<number>;
  setSelectedChildItemName: StateSetterType<string>;
  selectedChildCategoryId: number;
  selectedChildItemName:string
}
import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";

export function AdvancedChildCategory({
  selectedParentCategoryId,
  setSelectedChildItemName,
  setSelectedChildCategoryId,
  selectedChildCategoryId,
                                        selectedChildItemName
}: AdvancedParentCategoryProps) {
  const {
    page: { template: dictionary },
  } = useGetDictionary();
  const categories = useTemplateParentCategories();
  const { childCategories, isLoading } = useChildCategories(
    selectedParentCategoryId,
  );
  const [openOptionsMenu, setOpenOptionsMenu] = useState(true);
  // console.log("childCategories", childCategories);
  function handleSelectChild(id: string) {
    setSelectedChildCategoryId(Number(id));
    setSelectedChildItemName(
      childCategories.find(i => i.id.toString() === id)?.name || "",
    );
  }

  useEffect(() => {
    setOpenOptionsMenu(true)
  }, [selectedParentCategoryId]);

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
            <div className='flex'>
              <span>

              <IoIosArrowForward/>
              </span>
            <Label>Child Category</Label>
            </div>
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
      {selectedParentCategoryId !== -1 && openOptionsMenu &&  (
        <div className={cn("col    w-full    ")}>
          <div className="col mx-[24px]   gap-[12px] text-[14px] font-[500]">
            <div className='flex gap-2'>
              <span className='rotate-90'>

              <IoIosArrowForward />
              </span>
              <Label>Child Category</Label>
            </div>
            <div className='w-full border rounded-xl h-[290px]'>
              <div className='w-full '>
                <div className='flex lg:mx-[24px]  gap-8 w-full flex-row'>
                  {childCategories.map(category => {
                    return (
                      <div onClick={() => {
                        handleSelectChild(category.id)
                        setOpenOptionsMenu(false)
                      }} key={category.id}
                           className='w-[262px] mt-[16px] h-[52px] flex flex-row mx-auto lg:mx-0 items-center justify-start border rounded-xl'>
                        <div className='ml-[16px] flex gap-2'>

                        <input type='checkbox' checked={selectedChildCategoryId === +category.id} />
                        <p>
                          {category.name}

                        </p>
                        </div>
                      </div>
                    )
                  })

                  }
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
      {
        !openOptionsMenu &&
        <div className='flex w-full mr-[36px]    '>
          <div className='flex  w-full flex-col gap-[12px]  '>
            <div className='mx-[16px] lg:mx-0 flex gap-2  '>
              <span onClick={()=>{setOpenOptionsMenu(true)
              setSelectedChildCategoryId(-1)}
              }>

              <IoIosArrowForward />
              </span>
              <Label>{selectedChildItemName} Category</Label>
            </div>
            <div className='flex  w-full   '>
              <div
                   className=' mx-[16px] lg:mx-0 w-full h-[44px] flex flex-row items-center justify-start border rounded-xl bg-[#D6BBFB]'>
                <div className='ml-[16px] flex gap-2' >

                  <input type='checkbox' checked={true} />
                  <p>
                    {selectedChildItemName}

                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      }
    </>
  );
}
