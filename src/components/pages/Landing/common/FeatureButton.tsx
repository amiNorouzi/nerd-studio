'use client'

import { btnFeature } from "@/constants/Landing";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { TbWriting } from "react-icons/tb";
import Image from "next/image";

export default function  FeatureButton  (){
  const [selectedFeature, setSelectedFeature] = useState(0);
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
    <>
      <div className="relative">
      <div  ref={sectionRef} className="mb-6 flex rounded-xl snap-start justify-between gap-x-4  overflow-x-hidden xl:flex-row ">
        <div className="flex w-full gap-x-[13px]">
        {btnFeature.map((name, index) => (
          <div
            key={name.name}
            ref={index === selectedFeature ? selectedButtonRef : null}
            className={cn(" flex rounded-xl  z-[0] items-center  relative h-[36px] lg:h-[80px] w-full  gap-x-2 bg-muted-dark px-1 lg:px-3 lg:py-[25px] text-sm  font-medium leading-[18px] " +
              "text-muted-foreground xl:text-base")}>

            <Button
              variant="secondary"
              className={cn("relative border h-[95%] lg:h-[99%] z-[10] w-full  gap-x-2 bg-muted-dark lg:px-3 lg:py-[32px] text-sm  font-medium leading-[18px] " +
                "text-muted-foreground xl:text-base", selectedFeature === index && "bg-secondary")}
              onClick={() => setSelectedFeature(index)}
            >
              <name.Icon width={36} height={36} />
              {name.name}
            </Button>
            {
              selectedFeature === index &&
            <div className="absolute rounded-xl lg:rounded-l-xl lg:rounded-r-sm z-[0] top-0 left-0 h-[36px] lg:h-[80px] bg-blue-300 animate-loading"></div>
            }

          </div>
        ))}
        </div>
      </div>
      <div
        className="flex grid-cols-2 flex-col gap-x-6 rounded-3xl bg-primary-light px-3 py-6 md:flex-row md:p-9 lg:grid min-[1920px]:gap-[85px] ">
        {/*Title And Sub*/}
        <div className="order-2 flex flex-col items-center justify-center md:order-1 md:items-start ">
          <div className="mb-3 flex justify-center lg:mb-6">
            <h3
              className="flex items-center gap-x-3 text-center text-lg text-[#181818] lg:text-2xl lg:font-bold min-[1920px]:text-4xl">
              <div className="w-fit rounded-xl bg-secondary   p-2 text-primary xl:p-3.5 xl:text-4xl xl:text-[#551FFF]">
                <TbWriting />
              </div>
              <span>{btnFeature[selectedFeature].name}</span>
            </h3>
          </div>
          <div className="mb-3 lg:mb-6">
              <span className="sub-title-color text-justify text-xs leading-[18px]  lg:text-sm lg:leading-[18px] 2xl:text-lg ">
                {/*<span className="inline-block lg:hidden">*/}
                {/*  Lorem ipsum is placeholder text commonly used in the graphic,*/}
                {/*  print, and publishing industries for previewing layouts and*/}
                {/*  visual mockupsLorem ipsum is placeholder .*/}
                {/*</span>*/}
                <span className=" text-justify inline-block">
                 {btnFeature[selectedFeature].description}
                </span>
              </span>
          </div>
          <Button className=" px-[120px] py-3 max-[320px]:px-[100px] lg:px-[60px] lg:py-4.5">
            Do it now
          </Button>
        </div>
        {/*Image*/}
        <div className="order-1 mb-6 w-full rounded-lg  md:order-2">
          <Image
            src={"/images/landing/Desktop-8.png"}
            alt="Desktop"
            width={300}
            height={400}
            className="inline-block h-[194px] w-full lg:hidden"
          />
          <Image
            src={"/images/landing/Desktop-xl.png"}
            alt="Desktop"
            width={500}
            height={400}
            className="hidden h-[194px] w-full lg:inline-block lg:h-max"
          />
        </div>
      </div>
      </div>
    </>
  )

}