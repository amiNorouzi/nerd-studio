"use client";
import { Generate } from "@/components/svg-icons";
import { useGetDictionary } from "@/hooks";

function EmptyResult() {
  const {
    page: { image: imageDictionary },
  } = useGetDictionary();
  return (
    <div className="centered-col h-full w-full gap-2 pb-32">
      <div className="centered-col h-20 w-20 rounded-full border border-primary-light bg-primary-light/60 shadow-card-hover">
        <Generate />
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
