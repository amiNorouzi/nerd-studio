"use client";
import { btnFeature } from "@/constants/Landing";
import { Button } from "@/components/ui/button";
import TitleSection from "@/components/pages/Landing/common/TitleSection";
import Image from "next/image";
import { Icons } from "@/components/icons";

import { useEffect, useState } from "react";

const PromptsSection = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + 0.2;
        if (newProgress > 100) {
          clearInterval(interval);
          return 100; // Cap the progress at 100%
        }
        return newProgress;
      });
    }, 20); // Update progress every 1 second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="padding-x pb-32">
      {/*Title section*/}
      <TitleSection
        title={"1000+ Pre-built AI Apps for"}
        titlePrimary={"Any Use Case"}
        br={true}
        classNames="leading-normal"
        subTitle={
          "These are the stories of our customers who have joined us with great pleasure when using."
        }
      />
      {/* this component for drawing RectangleProgressBar with canvas*/}
      {/*<RectangleProgressBar*/}
      {/*  borderRadius={12}*/}
      {/*  label={"click"}*/}
      {/*  progress={progress}*/}
      {/*  width={100}*/}
      {/*  height={50}*/}
      {/*/>*/}
      {/*Buttons*/}
      <div className="mb-6 flex snap-start justify-between gap-x-4  overflow-x-scroll xl:flex-row ">
        {btnFeature.map(name => (
          <Button
            variant="secondary"
            className=" h-[80px] w-full  gap-x-2 bg-[#F8F8F8] px-3 py-1.5 text-sm font-medium leading-[18px]  text-[#747474] xl:px-3 xl:py-[25px] xl:text-base"
            key={name.id}
          >
            <name.icon width={36} height={36} />
            {name.name}
          </Button>
        ))}
      </div>

      <div className="flex grid-cols-3 flex-col gap-6 rounded-3xl bg-transparent p-0 md:grid lg:grid-cols-4 lg:justify-around lg:gap-y-6  lg:bg-[#F9F6FF] lg:p-6 2xl:grid-cols-4 min-[1920px]:p-[50px]">
        {/*Cards*/}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
          <div
            key={num}
            className="mx-0 flex w-full flex-col rounded-xl border-[0.5px] border-[#EFEFEF] bg-white p-4 md:w-fit lg:max-w-[260px] 2xl:mx-auto"
          >
            {/*image & title & Icons*/}
            <div className="mb-0 flex flex-row items-start gap-y-0 md:mb-2 md:flex-col md:justify-center md:gap-y-6">
              {/*image Card*/}
              <div className="flex w-[60px] items-center justify-center rounded-lg bg-[#F9F6FF] p-1 md:w-fit md:px-16 md:py-6 lg:w-full ">
                <Image
                  src={"/images/landing/Music.svg"}
                  alt={"Music"}
                  height={40}
                  width={40}
                  className="inline-block size-10 md:size-[100px]  min-[1920px]:hidden "
                />
                <Image
                  src={"/images/landing/Music.svg"}
                  alt={"Music"}
                  height={40}
                  width={40}
                  className="ml-10 mr-[60px] hidden size-10 md:size-[100px] min-[1920px]:inline-block min-[1920px]:h-[150px] min-[1920px]:w-[190px] "
                />
              </div>
              <div className=" flex w-full md:flex-row md:justify-between">
                {/*title & subTitle Card*/}
                <div className="ml-3 mr-1 flex w-full  flex-col items-start">
                  <span className="mb-1 text-sm font-normal leading-[18px] md:text-base md:font-bold">
                    Write a Song
                  </span>
                  <span className="text-xs font-medium leading-normal text-primary md:text-sm md:font-bold">
                    Design
                  </span>
                </div>
                {/*star & info icon*/}
                <div className="flex  h-full items-start gap-2.5 p-1">
                  <Icons.info className="flex size-4.5 text-[#747474] md:hidden md:size-6" />
                  <Icons.star className="size-4.5 text-yellow-500" />
                </div>
              </div>
            </div>

            {/*paragraph & btn */}
            <div className="flex flex-col px-2 ">
              <div className="mb-1 w-full md:mb-2 lg:mb-4.5">
                <p className="sub-title-color text-[10px] lg:text-xs">
                  Empower your songwriting skills and create master pieces with
                  Write a Song.
                </p>
              </div>
              <div className="flex flex-row items-center justify-end md:justify-between">
                <Button className="w-fit self-end px-[39px] py-2">
                  Use App
                </Button>
                <Icons.info className="hidden size-6 text-[#747474] md:flex" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromptsSection;
