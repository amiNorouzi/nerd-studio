"use client";
import TitleSection from "@/components/pages/Landing/common/TitleSection";
import { TbMessages } from "react-icons/tb";
import { Button } from "@/components/ui/button";

const Mobile = () => {
  return (
    <div className="padding-x padding-y flex flex-col">
      {/*Title section*/}
      <TitleSection
        customTrue={true}
        customize={
          <div className={`mb-6 flex flex-col xl:mb-12 `}>
            <h2 className="text-title mb-6 text-center font-medium leading-normal">
              Just ask
              <span className="px-1.5 text-primary">anything</span>
              you want
            </h2>
            <div className=" text-center">
              <span className=" sub-title sub-color-title">
                These are the stories of our customers who have joined us with
                great pleasure when using this crazy feature.
              </span>
            </div>
          </div>
        }
      />
      <div className="rounded-3xl bg-primary p-6 text-white">
        <div className="mb-3 flex w-full flex-row items-center justify-start">
          <div className="flex items-center justify-center rounded-sm bg-[#F2EEFD] p-2 text-primary ">
            <TbMessages className="size-6" />
          </div>
          <span className="texty-[#F2EEFD] ms-3 text-lg">Chat AI</span>
        </div>
        <div className="mb-3">
          <p className="text-xs font-normal leading-[18px] text-[#FCFCFD]">
            Lorem ipsum is placeholder text commonly used in the graphic, print,
            and publishing industries for previewing layouts and visual
            mockupsLorem ipsum is placeholder text commonly used in the graphic,
            print, and publishing industries for previewing layouts and visual
            mockupsLorem ipsum is placeholder text commonly used in the graphic,
            print, and publishing industries for previewing layouts and visual
            mockups
          </p>
        </div>
        <Button className="bg-[#F2EEFD] px-[115px] py-3.5 text-primary">
          Do It Now
        </Button>
      </div>
    </div>
  );
};

export default Mobile;
