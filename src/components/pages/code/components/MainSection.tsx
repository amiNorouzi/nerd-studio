"use client";

import { features } from "@/constants/code";
import CodeGenerator from "./CodeGenerator";
import CodeConvertor from "./CodeConvertor";
import CodeExplainer from "./CodeExplainer";
import Result from "./Result";

import { useCustomSearchParams, useGetDictionary } from "@/hooks";

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

  const [searchParams] = useCustomSearchParams();
  //get the feature from the url search params or use the default feature "code-convertor"
  const currentFeature = searchParams.get("feature") ?? "code-convertor";

  //get the title key of the feature from the features array
  //and get the title from the dictionary by key
  const titleKey = features.find(
    item => item.key === currentFeature,
  )?.titleI18Key;

  return (
    <section className="max-h-apps-page col-span-12 h-full overflow-hidden p-3 lg:col-span-9 lg:p-5">
      <div
        className="col h-full max-h-[calc(var(--apps-main-height)-24px)] overflow-y-auto overflow-x-hidden
        rounded-xl border bg-background shadow-2xl lg:max-h-[calc(var(--apps-main-height)-40px)]"
      >
        {/*feature title*/}
        <div className="flex w-full">
          <h1 className="text-gradiant mx-auto p-5 text-center text-4xl font-bold">
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
