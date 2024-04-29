"use client";

import { features } from "@/constants/code";
import CodeGenerator from "./CodeGenerator";
import CodeConvertor from "./CodeConvertor";
import CodeExplainer from "./CodeExplainer";

import { useGetDictionary } from "@/hooks";
import useCodeFeatures from "../hooks/useCodeFeatures";
import { HistoryBox } from "@/components/shared";
import CodeHistoryItems from "@/components/pages/code/components/CodeHistoryItems";
import { useHistoryStore } from "@/stores/zustand/history-store";
import { cn } from "@/lib/utils";
import Highlight from "@/components/shared/Highlight";
import React from "react";

/**
 * section for inputs and results
 * content will be changed based on the feature get from the url search params
 * contain the main title(change by feature) and the feature content
 * @constructor
 */
export function MainSection() {
  const {
    page: { code: codeDictionary },
  } = useGetDictionary();

  //get the feature from the url search params or use the default feature "code-convertor"
  const { currentFeature } = useCodeFeatures();
  const isHistoryOpen = useHistoryStore.use.isHistoryOpen();

  //get the title key of the feature from the features array
  //and get the title from the dictionary by key
  const titleKey = features.find(
    item => item.key === currentFeature,
  )?.titleI18Key;

  return (
    <section className="md:max-h-apps-page col-span-12 flex h-full overflow-hidden md:col-span-9 md:p-3 xl:p-5">
      <div
        className="flex h-fit overflow-hidden bg-background md:h-full md:max-h-[calc(var(--apps-main-height)-24px)]
       md:rounded-xl md:border md:shadow-2xl lg:max-h-[calc(var(--apps-main-height)-40px)]"
      >
        <div className="col h-full w-full md:min-w-[380px] md:overflow-y-auto lg:min-w-[500px]">
          {/*feature title*/}
          <div className="hidden w-full lg:flex">
            <h1 className="text-gradiant mx-auto px-3 pt-3 text-center text-2xl font-bold xl:text-3xl">
              {codeDictionary[titleKey!]}
            </h1>
          </div>
          {/*
          feature content
          switch component to change the content based on the feature
        */}
          <div
            className={cn(
              "px-4 py-form-padding",
              isHistoryOpen ? " md:px-6 xl:px-9" : " md:px-8 xl:px-24",
            )}
          >
            {
              {
                "code-convertor": <CodeConvertor />,
                "code-generator": <CodeGenerator />,
                "code-explainer": <CodeExplainer />,
              }[currentFeature]
            }

            {/*<Result />*/}
          </div>
        </div>

        <Highlight />
        <HistoryBox>
          <CodeHistoryItems appName={codeDictionary.page_title} />
        </HistoryBox>
      </div>
    </section>
  );
}
