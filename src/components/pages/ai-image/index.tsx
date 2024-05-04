import { SetSearchParamProvider } from "@/components/shared";
import React from "react";
import HomeLoading from "@/app/[lang]/loading";
import dynamic from "next/dynamic";

const AIImageForm = dynamic(() => import("./components/AIImageForm"), {
  loading: () => <HomeLoading />,
});
const ResultSection = dynamic(() => import("./components/ResultSection"), {
  loading: () => <HomeLoading />,
});

/**
 * generate image by AI page
 * @constructor
 */
export default function AiImagePage() {
  return (
    <SetSearchParamProvider appName="app" appSearchParamValue="image">
      <div className="grid h-fit max-h-full grid-cols-12 divide-x overflow-y-auto bg-transparent lg:h-full lg:overflow-hidden">
        <AIImageForm />
        <ResultSection />
      </div>
    </SetSearchParamProvider>
  );
}
