"use client";
import { Generate } from "@/components/svg-icons";
import { useGetDictionary } from "@/hooks";

/**
 * show a message in result section when no image generated and history is empty too
 * @constructor
 */
function EmptyResult() {
  const {
    page: { image: imageDictionary },
  } = useGetDictionary();
  return (
    <div className="centered-col h-full w-full gap-2 pb-32">
      {/*icon*/}
      <div className="centered-col h-20 w-20 rounded-full border border-primary-light bg-primary-light/60 shadow-card-hover">
        <Generate classname="h-8 w-8 fill-muted-foreground-light" />
      </div>
      <h2 className="text-3xl text-muted-foreground">
        {imageDictionary.empty_result_message}
      </h2>
      <p className="text-xs font-normal text-muted-foreground-light">
        {imageDictionary.empty_result_subtitle}
      </p>
    </div>
  );
}

export default EmptyResult;
