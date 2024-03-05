"use client";

import { features } from "@/constants/code";
import CodeGenerator from "./CodeGenerator";
import CodeConvertor from "./CodeConvertor";
import CodeExplainer from "./CodeExplainer";

import { useGetDictionary } from "@/hooks";
import useCodeFeatures from "../hooks/useCodeFeatures";

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

  //get the title key of the feature from the features array
  //and get the title from the dictionary by key
  const titleKey = features.find(
    item => item.key === currentFeature,
  )?.titleI18Key;

  return (
    <section className="md:max-h-apps-page col-span-12 h-full overflow-hidden md:col-span-8 md:p-3 lg:col-span-9 lg:p-5">
      <div
        className="col h-fit overflow-hidden bg-background md:h-full md:max-h-[calc(var(--apps-main-height)-24px)]
        md:overflow-y-auto md:rounded-xl md:border md:shadow-2xl lg:max-h-[calc(var(--apps-main-height)-40px)]"
      >
        {/*feature title*/}
        <div className="hidden w-full md:flex">
          <h1 className="text-gradiant mx-auto p-5 text-center text-2xl font-bold xl:text-4xl">
            {codeDictionary[titleKey!]}
          </h1>
        </div>
        {/*
          feature content
          switch component to change the content based on the feature
        */}
        <div className="px-4 py-7 md:px-8 xl:px-24">
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
    </section>
  );
}
