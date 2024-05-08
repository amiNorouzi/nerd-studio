"use client";
import { btnFeature } from "@/constants/Landing";
import { Button } from "@/components/ui/button";
import TitleSection from "@/components/pages/Landing/common/TitleSection";
import Image from "next/image";
import { Icons } from "@/components/icons";

import { useEffect, useState } from "react";
import { Cards } from "@/components/pages/Landing/common/Cards";

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
            className=" h-[80px] w-full  gap-x-2 bg-muted-dark px-3 py-1.5 text-sm font-medium leading-[18px]  text-muted-foreground xl:px-3 xl:py-[25px] xl:text-base"
            key={name.id}
          >
            <name.icon width={36} height={36} />
            {name.name}
          </Button>
        ))}
      </div>

     <Cards/>
    </div>
  );
};

export default PromptsSection;
