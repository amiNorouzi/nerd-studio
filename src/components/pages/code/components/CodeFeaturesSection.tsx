"use client";
import { useState } from "react";

import { useMediaQuery } from "usehooks-ts";
import { TbCode } from "react-icons/tb";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useGetDictionary } from "@/hooks";
import useCodeFeatures from "../hooks/useCodeFeatures";

import { features } from "@/constants/code";
import { cn } from "@/lib/utils";

/**
 * list of AI code page feature
 * based on this list, the feature section will be rendered
 * @type {Array<{id: number, key: string, titleI18Key: string, descriptionI18Key: string}>} feature item
 * by clicking on each item, the page will be redirected to the selected feature by setting the search params
 * @constructor
 */
export function CodeFeaturesSection() {
  const [isOpenAccordion, setIsOpenAccordion] = useState(false);
  const {
    page: { code: codeDictionary },
  } = useGetDictionary();

  // get the current feature from the search params
  const { currentFeature, setFeature } = useCodeFeatures();
  const isDesktop = useMediaQuery("(min-width: 768px)"); // check if the device is desktop

  const renderForDesktop = () => (
    <div className="col h-fit gap-4 p-4 xl:p-7">
      {features.map(item => (
        <div
          className={cn(
            "col cursor-pointer rounded-lg border bg-muted px-3 py-2 transition-all duration-300 hover:bg-muted-dark xl:px-4",
            currentFeature === item.key &&
              "border-primary shadow-xl shadow-primary-light", // highlight the selected feature
          )}
          key={item.id}
          onClick={() => setFeature(item.key)}
        >
          <h2 className="text-base lg:text-lg">
            {codeDictionary[item.titleI18Key]}
          </h2>
          <p className="text-xs font-normal text-muted-foreground lg:text-xsm">
            {codeDictionary[item.descriptionI18Key]}
          </p>
        </div>
      ))}
    </div>
  );

  const renderForMobile = () => (
    <Accordion
      type="single"
      collapsible
      className="border-gradiant relative border-y-2 bg-background after:!rounded-none after:!border-x-0 md:hidden"
      value={isOpenAccordion ? "item-1" : undefined}
      onValueChange={value => setIsOpenAccordion(value === "item-1")}
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className=" z-10 px-7 py-3">
          <span className="text-gradiant">
            {features.find(f => f.key === currentFeature)?.title}
          </span>
        </AccordionTrigger>
        <AccordionContent className="col gap-2 px-7 py-3">
          {features.map(feature => (
            <div
              key={feature.id}
              className={cn(
                "z-10 cursor-pointer rounded-lg border bg-muted p-2.5 font-normal text-muted-foreground hover:bg-muted-dark",
                currentFeature === feature.key && "hidden", // hidden the selected feature
              )}
              onClick={() => {
                setFeature(feature.key);
                setIsOpenAccordion(false);
              }}
            >
              {codeDictionary[feature.titleI18Key]}
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );

  return (
    <section className="relative col-span-12 h-fit overflow-y-auto bg-background md:col-span-3 md:h-full md:max-h-full">
      {/*features list*/}
      {isDesktop ? renderForDesktop() : renderForMobile()}
    </section>
  );
}
