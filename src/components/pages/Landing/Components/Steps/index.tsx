import Image from "next/image";
import { steps } from "@/constants/Landing";
import TitleSection from "@/components/pages/Landing/common/TitleSection";
import Absolute from "@/components/pages/Landing/common/Absolute";

export default function Steps() {
  return (
    <section className="padding-x padding-y relative flex flex-col">
      <TitleSection
        title="Starting In 3 Easy"
        titlePrimary="Steps"
        subTitle="These are the stories of our customers who have joined us with great
            pleasure when using this crazy feature."
      />
      <Absolute
        className={"absolute left-4 top-3 z-20 lg:left-12 lg:top-[38px]"}
      >
        <Image
          src={"/images/landing/step-absolute-1.svg"}
          alt={"absolute"}
          width={55.198}
          height={108.425}
          className="h-[53.58px] w-[27.27px] lg:h-[108.425px] lg:w-[55.198px]"
        />
      </Absolute>
      <Absolute
        className={"absolute bottom-0 right-3.5 z-20 hidden lg:inline-block"}
      >
        <Image
          src={"/images/landing/step-absolute-2.svg"}
          alt={"absolute"}
          width={55.198}
          height={108.425}
          className=""
        />
      </Absolute>
      <div className="flex flex-col justify-between  gap-6  lg:flex-row lg:justify-between xl:gap-x-6 ">
        {steps.map(item => (
          <div
            key={item.id}
            className="z-30 flex  flex-col gap-y-4 rounded-[21px]  bg-[#F8F8F8] p-4 xl:max-w-[444px] xl:gap-x-0 xl:px-9 xl:py-6 min-[1920px]:p-9"
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
                  <span className="whitespace-nowrap text-base font-bold text-[#181818] xl:text-lg 2xl:text-2xl ">
                    {item.title}
                  </span>
                </div>

                <Image
                  src={`images/landing/${item.number}`}
                  alt={item.number}
                  width={110}
                  height={110}
                  className="size-[90px] self-end opacity-20 max-[372px]:size-[80px] xl:size-[110px] 2xl:size-[120px]"
                />
              </div>
            </div>

            <div>
              <p className="sub-title-color text-sm xl:text-base min-[1920px]:text-lg ">
                {item.sub}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

