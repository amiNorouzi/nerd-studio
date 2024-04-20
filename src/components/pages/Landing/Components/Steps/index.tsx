"use client";
import Image from "next/image";
import { steps } from "@/constants/Landing";
import TitleSection from "@/components/pages/Landing/common/TitleSection";

const Steps = () => {
  return (
    <div className="padding-x padding-y flex flex-col">
      <TitleSection
        title="Starting In 3 Easy"
        titlePrimary="Steps"
        subTitle="These are the stories of our customers who have joined us with great
            pleasure when using this crazy feature."
      />
      <div className="flex flex-col justify-between  gap-6  lg:flex-row lg:justify-between xl:gap-x-6">
        {steps.map(item => (
          <div
            key={item.id}
            className="flex  flex-col gap-y-4 rounded-[21px]  bg-[#F8F8F8] p-4 xl:max-w-[444px] xl:gap-x-0 xl:px-9 xl:py-6"
          >
            {/*Card Steps*/}
            <div className="relative flex   flex-row gap-x-3">
              <div className="flex w-full flex-row justify-between ">
                <div className="flex items-center ">
                  <Image
                    src={`/images/landing/${item.img}`}
                    width={120}
                    height={120}
                    alt={item.img}
                    className="size-[80px] max-[372px]:size-[60px] xl:size-[120px]"
                  />
                  <span className="whitespace-nowrap text-base font-bold text-[#181818] xl:text-[18px] ">
                    {item.title}
                  </span>
                </div>

                <Image
                  src={`images/landing/${item.number}`}
                  alt={item.number}
                  width={90}
                  height={90}
                  className="opacity-20"
                />
              </div>
            </div>

            <div>
              <p className="sub-title-color text-sm xl:text-base">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;
