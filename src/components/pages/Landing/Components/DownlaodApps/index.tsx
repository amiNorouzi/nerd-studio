//TODO:fixed here
import { Button } from "@/components/ui/button";
import { brandsArray, starsArray } from "@/constants/Landing";
import React from "react";
import { Star } from "lucide-react";

const DownloadApp = () => {
  return (
    <div className="padding-y padding-x">
      <div className="bg-downloads mx-0 flex w-full flex-col justify-center rounded-3xl px-6 py-9 lg:mx-auto lg:py-16">
        <div className="mb-[51px] flex flex-col items-center justify-center gap-y-6 text-white">
          <span className="text-lg font-normal leading-normal lg:text-4xl lg:font-medium">
            Start your AI Nerd Studio Now
          </span>
          <span className="text-center text-xs lg:text-base">
            These are the stories of our customers who have joined us with great
            pleasure when using this crazy feature.
          </span>
        </div>
        <div className="flex  w-full flex-col items-center justify-center ">
          <div className="mb-6 flex flex-col gap-6  md:flex-row">
            <Button
              variant={"secondary"}
              className="sub-title-color w-fit px-[89px] py-3 text-sm"
            >
              Extension
            </Button>
            <Button className=" w-fit px-[89px] py-3 text-sm">Download</Button>
          </div>
          <div className=" hidden flex-row items-center text-base  md:flex ">
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
    </div>
  );
};

export default DownloadApp;
