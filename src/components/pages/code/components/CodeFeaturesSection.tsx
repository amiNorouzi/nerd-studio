"use client";

import { IoCodeSlashOutline } from "react-icons/io5";

import { useCustomSearchParams, useGetDictionary } from "@/hooks";

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
  // get search params and set search params
  const [searchParams, setSearchParams] = useCustomSearchParams();
  const {
    page: { code: codeDictionary },
  } = useGetDictionary();

  // get the current feature from the search params
  const currentFeature = searchParams.get("feature") ?? "code-convertor";

  return (
    <section className="relative col-span-12 h-fit overflow-y-auto bg-background lg:col-span-3 lg:h-full lg:max-h-full">
      {/*page header*/}
      <h1 className="row gap-2 border-b px-4 py-2.5 text-xl">
        <IoCodeSlashOutline size="1.5rem" />
        {codeDictionary.page_title}
      </h1>

      {/*features list*/}
      <div className="col h-fit gap-4 p-7">
        {features.map(item => (
          <div
            className={cn(
              "col cursor-pointer rounded-lg border bg-muted px-4 py-2 transition-all duration-300 hover:bg-muted-dark",
              currentFeature === item.key &&
                "border-primary shadow-xl shadow-primary-light", // highlight the selected feature
            )}
            key={item.id}
            onClick={() => setSearchParams("feature", item.key)}
          >
            <h2 className="text-lg">{codeDictionary[item.titleI18Key]}</h2>
            <p className="font-normal text-muted-foreground ">
              {codeDictionary[item.descriptionI18Key]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
