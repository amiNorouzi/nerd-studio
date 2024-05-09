import React from "react";
import Absolute from "@/components/pages/Landing/common/Absolute";
import { Button } from "@/components/ui/button";
import { brandsArray, rewards, starsArray } from "@/constants/Landing";
import { Star } from "lucide-react";

export default function Hero() {

  return (
    <header className=" relative  w-full overflow-hidden bg-secondary">
      {/*Absolute Ellipses in Hero header*/}
      <Absolute className="hero-absolute-left absolute left-0 top-0 z-10  size-[308px] rounded-full" />
      <Absolute className="hero-absolute-right absolute right-0 top-16 z-10  hidden size-[250px] rounded-full lg:inline-block" />
      <Absolute className="hero-absolute-bottom absolute bottom-0 left-[40%] z-10  hidden size-[250px] rounded-full lg:inline-block" />

      <div className="padding-x z-20 flex grid-cols-2 flex-col  justify-around gap-x-14 pb-12 md:grid md:items-start  lg:items-center lg:pb-[60px]  xl:gap-x-[90px] ">
        {/*COL LEFT*/}
        <div className="z-30 flex  w-full flex-col items-center justify-center  pt-[84px] md:items-start lg:pt-[100px] 2xl:pt-[120px]">
          {/*Title*/}
          <h1 className=" mb-4 text-xl font-bold leading-[36px] min-[375px]:text-2xl min-[375px]:leading-[45px] lg:mb-[25px] lg:text-3xl  lg:leading-[45px]  xl:mb-9 2xl:text-4xl 2xl:leading-[55px] ">
            <span className="">
              Lorem Ipsum is simply and
              <br />
            </span>
            <div className="z-30 flex gap-x-1 lg:gap-x-2">
              <div className=" -rotate-[1.5deg] bg-primary px-2    text-white ">
                typesetting
              </div>
              <div>
                <span>industry</span>
              </div>
            </div>
          </h1>

          {/*Sub Title A*/}
          <div className=" z-30 mb-9 mt-3 sm:mx-auto sm:w-5/6 md:mx-0 lg:mb-[20px] xl:w-full">
            <span
              className={
                "text-center text-xs leading-7  md:text-start lg:text-sm lg:leading-normal xl:text-[18px] "
              }
            >
              <span className="sub-title-color flex xl:hidden">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry text of the printing and typesetting industryLorem
                Ipsum is simply dummy
              </span>
              <span className="sub-title-color hidden xl:flex">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry Lorem Ipsum is simply dummy text of the printing and
                typesetting industryLorem Ipsum is simply dummy text of the
                printing and typesetting industryLorem Ipsum is simply dummy
                text of the printing and typesetting
              </span>
            </span>
          </div>

          {/*Rewards B*/}
          <div className="z-30  mb-9 flex  flex-row justify-center gap-4 min-[375px]:gap-[18px] md:max-w-[645px] lg:mb-[85px]  lg:justify-between xl:gap-x-12">
            {rewards.map(item => (
              <div
                key={item.id}
                className="flex size-[100px] flex-col  items-center justify-center rounded-full bg-muted shadow-md max-[375px]:size-[90px]  xl:size-[155px]"
              >
                {/*<Image*/}
                {/*  src={`/images/hero/${item.img}`}*/}
                {/*  width={60}*/}
                {/*  height={60}*/}
                {/*  alt={item.img}*/}
                {/*  className="size-[36px] xl:size-[55px]"*/}
                {/*/>*/}
                <span className="text-[10px] font-medium xl:text-base">
                  {item.title}
                </span>
                <p className="text-[10px] font-normal text-[#747474] xl:text-sm">
                  {item.sub}
                </p>
              </div>
            ))}
          </div>

          {/*Buttons A*/}
          <div className=" mb-9 flex flex-col">
            <div className="mb-5 flex flex-col  gap-y-4 md:flex-row md:gap-x-6">
              <Button className=" px-[86px] py-[21px] text-sm md:px-[48px] lg:px-[52px] lg:py-6 lg:text-base">
                Download
              </Button>
              <Button className="bg-muted px-[86px]  py-[21px]  text-sm text-primary hover:text-white md:px-[48px] lg:px-[52px] lg:py-6 lg:text-base">
                Start Chat
              </Button>
            </div>
            <div className=" sub-title-color hidden flex-row items-center text-base lg:flex ">
              <div className="flex flex-row">
                {starsArray.map(index => (
                  <Star key={index} className={"size-[24px]"} />
                ))}
              </div>
              <span className="mx-2">+400k followers</span>
              <div className="flex flex-row gap-x-2">
                {brandsArray.map((IconComponent, index) => (
                  <IconComponent key={index} className={"size-4.5"} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/*COL RIGHT*/}
        <div className="md:items-enter flex w-full items-center  justify-end md:pt-[140px]  lg:h-screen lg:pt-0  ">
          <div className="relative z-30 h-[234px] w-full rounded-2xl shadow-md lg:h-[307px] lg:w-[571px]">
            {/*bg*/}
            <div className="bg-hero absolute h-full w-full rounded-2xl blur-[3px]"></div>
            {/*Filter bg*/}
            <div className="bg-hero-filter absolute flex h-full w-full items-center justify-center rounded-2xl">
              <div className="  rounded-full bg-primary p-6 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                >
                  <path
                    d="M9 6.00001V30C8.99992 30.2669 9.07106 30.529 9.20607 30.7592C9.34108 30.9894 9.53508 31.1795 9.76804 31.3097C10.001 31.44 10.2645 31.5057 10.5313 31.5001C10.7982 31.4945 11.0587 31.4179 11.286 31.278L30.786 19.278C31.0044 19.1438 31.1848 18.9559 31.3099 18.7321C31.435 18.5084 31.5007 18.2563 31.5007 18C31.5007 17.7437 31.435 17.4916 31.3099 17.2679C31.1848 17.0441 31.0044 16.8562 30.786 16.722L11.286 4.72201C11.0587 4.58216 10.7982 4.50549 10.5313 4.49992C10.2645 4.49434 10.001 4.56006 9.76804 4.6903C9.53508 4.82054 9.34108 5.01058 9.20607 5.24081C9.07106 5.47103 8.99992 5.73312 9 6.00001Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
            {/*Play Icon*/}
          </div>
        </div>
      </div>
    </header>
  );
};
