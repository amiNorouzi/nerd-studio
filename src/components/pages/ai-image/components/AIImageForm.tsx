"use client";

import { useGetDictionary } from "@/hooks";
import { MdOutlineCameraAlt } from "react-icons/md";
import ImageFromTabs from "@/components/pages/ai-image/components/ImageFromTabs";

export function AIImageForm() {
  const {
    page: { image: imageDictionary },
  } = useGetDictionary();

  return (
    <section className="col-span-12 flex h-fit flex-col overflow-y-auto bg-background lg:col-span-6 lg:h-full lg:max-h-full xl:col-span-4">
      <h1 className="row gap-1.5 border-b px-4 py-2.5 text-xl">
        <MdOutlineCameraAlt size="1.5rem" />
        {imageDictionary.page_title}
      </h1>
      <ImageFromTabs />
      <div className="gap-5 p-4"></div>
    </section>
  );
}
