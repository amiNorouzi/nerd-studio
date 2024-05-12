"use client";
import { btnFeature } from "@/constants/Landing";
import { Button } from "@/components/ui/button";
import TitleSection from "@/components/pages/Landing/common/TitleSection";
import Image from "next/image";
import { Icons } from "@/components/icons";

import { useEffect, useRef, useState } from "react";
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
  const selectedButtonRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const [isSectionInView, setIsSectionInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Update state based on whether the section is in view
        setIsSectionInView(entries[0].isIntersecting);
      },
      { threshold: 0.5 } // Considered in view when 50% of the section is visible
    );

    // Observe the section
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      // Disconnect observer when component unmounts
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Scroll to the selected button only when the section is in view
    if (isSectionInView && selectedButtonRef.current) {
      selectedButtonRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest', // Scroll to the nearest edge of the viewport
        inline: 'center', // Center the selected button horizontally
      });
    }
  }, [isSectionInView, selectedFeature])
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
      <div className="relative">
      <div ref={sectionRef} className="mb-6 flex rounded-xl snap-start justify-between gap-x-4  overflow-x-hidden xl:flex-row ">
        <div className="flex w-full gap-x-[13px]">
          {prompts.map((prompt, index) => (
          <>

            {index < 6 &&

              <div
                key={prompt.category_name}
                ref={index === selectedFeature ? selectedButtonRef : null}
                className={cn(" flex rounded-xl  z-[0] items-center  relative h-[36px] lg:h-[80px] w-full  gap-x-2 bg-muted-dark px-1 lg:px-3 lg:py-[25px] text-sm  font-medium leading-[18px] " +
                  "text-muted-foreground xl:text-base")}>

                <Button
                  variant="secondary"
                  className={cn("relative border h-[95%] lg:h-[99%] z-[10] w-full  gap-x-2 bg-muted-dark lg:px-3 lg:py-[32px] text-sm  font-medium leading-[18px] " +
                    "text-muted-foreground xl:text-base", selectedFeature === index && "bg-secondary")}
                  onClick={() => setSelectedFeature(index)}
                >
                  {prompt.category_name}
                </Button>
                {
                  selectedFeature === index &&
                  <div
                    className="absolute rounded-xl lg:rounded-l-xl lg:rounded-r-sm z-[0] top-0 left-0 h-[36px] lg:h-[80px] bg-blue-300 animate-loading"></div>
                }

              </div>
            }
          </>
        ))}</div>
      </div>
      </div>
      <Cards selectedPrompt={prompts[selectedFeature]} />
    </div>
  );
};

export default PromptsSection;
