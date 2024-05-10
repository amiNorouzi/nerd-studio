"use client";
import { btnFeature } from "@/constants/Landing";
import { Button } from "@/components/ui/button";
import TitleSection from "@/components/pages/Landing/common/TitleSection";
import Image from "next/image";
import { Icons } from "@/components/icons";

import { useEffect, useState } from "react";
import { Cards } from "@/components/pages/Landing/common/Cards";
import { LandingApp } from "@/services/landing";
import { cn } from "@/lib/utils";

interface Props{
  prompts:LandingApp[]
}

const PromptsSection = ({prompts}:Props) => {


const [selectedPrompt, setSelectedPrompt] = useState<string>(prompts[0].category_name);
  const [selectedFeature, setSelectedFeature] = useState(0)
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoading(prevLoading => !prevLoading);
      if(selectedFeature ===btnFeature.length-1 ){
        setSelectedFeature(0)
      }else{
        setSelectedFeature(prev=>prev+1)
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedFeature]);

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
      {/*<div className="mb-6 flex snap-start justify-between gap-x-4  overflow-x-scroll xl:flex-row ">*/}
      {/*  {prompts.map((prompt, index) => (*/}
      {/*    <>*/}
      {/*      {index < 5 &&*/}
      {/*        <Button*/}
      {/*          variant="secondary"*/}
      {/*          className={cn(" h-[80px] w-full min-w-[200px]  gap-x-2 bg-muted-dark px-3 py-1.5 text-sm font-medium leading-[18px]  text-muted-foreground xl:px-3 xl:py-[25px] xl:text-base", selectedPrompt === prompt.category_name && 'bg-secondary')}*/}
      {/*          key={prompt.category_name}*/}
      {/*          onClick={() => setSelectedPrompt(prompt.category_name)}*/}
      {/*        >*/}
      {/*          /!*<name.Icon width={36} height={36} />*!/*/}
      {/*          {prompt.category_name}*/}
      {/*        </Button>*/}
      {/*      }*/}

      {/*    </>*/}
      {/*  ))}*/}
      {/*</div>*/}
      <div className="mb-6 flex rounded-xl snap-start justify-between gap-x-4  overflow-x-scroll xl:flex-row ">
        {prompts.map((prompt, index) => (
          <>
            {index<6 &&

          <div
            key={prompt.category_name}

            className={cn(" flex rounded-xl  z-[0] items-center  relative h-[80px] w-full  gap-x-2 bg-muted-dark px-3 py-[25px] text-sm  font-medium leading-[18px] " +
              "text-muted-foreground xl:text-base")}>

            <Button
              variant="secondary"
              className={cn("relative border h-[99%] z-[10] w-full  gap-x-2 bg-muted-dark px-3 py-[32px] text-sm  font-medium leading-[18px] " +
                "text-muted-foreground xl:text-base", selectedFeature === index && "bg-secondary")}
              onClick={() => setSelectedFeature(index)}
            >
              {prompt.category_name}
            </Button>
            {
              selectedFeature === index &&
              <div
                className="absolute rounded-l-xl rounded-r-sm z-[0] top-0 left-0 h-[80px] bg-blue-300 animate-loading"></div>
            }

          </div>
            }
          </>
        ))}
      </div>

      <Cards selectedPrompt={prompts[selectedFeature]} />
    </div>
  );
};

export default PromptsSection;
