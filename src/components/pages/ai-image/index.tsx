import { SetSearchParamProvider } from "@/components/shared";
import { AIImageForm, ResultSection } from "./components";

function AiImagePage({}) {
  return (
    <SetSearchParamProvider appName="app" appSearchParamValue="image">
      <div className="grid h-fit max-h-full grid-cols-12 divide-x overflow-y-auto bg-transparent lg:h-full lg:overflow-hidden">
        <AIImageForm />
        <ResultSection />
      </div>
    </SetSearchParamProvider>
  );
}

export default AiImagePage;
