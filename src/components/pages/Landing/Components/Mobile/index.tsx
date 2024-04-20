"use client";
import TitleSection from "@/components/pages/Landing/common/TitleSection";
import { TbMessages } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Mobile = () => {
  return (
    <div className=" padding-y flex flex-col max-sm:px-3  md:ps-[30px] lg:ps-[40px] xl:ps-[80px] 2xl:ps-[100px]">
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
            <div className=" text-center  ">
              <span className=" sub-title sub-color-title">
                These are the stories of our customers who have joined us with
                great pleasure when using this crazy feature.
              </span>
            </div>
          </div>
        }
      />

      <div className=" w-full grid-cols-3 flex-col  md:mt-[200px] md:grid   md:h-full">
        <div className="col-span-2  w-full rounded-3xl  bg-primary p-6 pb-[100px] text-white md:flex-row md:rounded-l-3xl md:rounded-r-none md:px-6 md:pb-6 md:pt-6 lg:p-[86px]">
          <div className="mb-3 flex w-full flex-row items-center justify-start">
            <div className="flex items-center justify-center rounded-sm bg-[#F2EEFD] p-2 text-primary ">
              <TbMessages className="size-6" />
            </div>
            <span className="texty-[#F2EEFD] ms-3 text-lg lg:text-4xl">
              Chat AI
            </span>
          </div>
          <div className="mb-3 ">
            <p className="text-#FCFCFD] text-xs font-normal leading-[18px] xl:text-lg">
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockupsLorem ipsum is placeholder text commonly used in the
              graphic, print, and publishing industries for previewing layouts
              and visual mockupsLorem ipsum is placeholder text commonly used in
              the graphic, print, and publishing industries for previewing
              layouts and visual mockups
            </p>
          </div>
          <Button className="w-full bg-[#F2EEFD] py-3.5 text-primary md:w-fit md:px-[60px] md:py-4.5">
            Do It Now
          </Button>
        </div>
        <div className=" relative col-span-1  flex justify-center   md:bg-primary">
          <Image
            src="/images/landing/Phone.png"
            alt="Phone"
            width={312}
            height={565}
            className="md:-right-0/4 -mt-12 inline-block max-sm:max-w-[260px] md:absolute md:w-[312px] lg:-mt-28  xl:-mt-24 xl:h-[600px] xl:w-[320px]  "
          />
        </div>
      </div>
    </div>
  );
};

export default Mobile;
