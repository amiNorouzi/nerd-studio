import { SetSearchParamProvider } from "@/components/shared";
import {
  CodeFeaturesSection,
  MainSection,
} from "@/components/pages/code/components";

/**
 * generate code by AI page
 * @constructor
 */
export default function CodePage() {
  return (
    <SetSearchParamProvider appName="app" appSearchParamValue="code">
      <div className="grid h-fit max-h-full grid-cols-12 divide-x overflow-y-auto bg-transparent lg:h-full lg:overflow-hidden">
        <CodeFeaturesSection />
        <MainSection />
      </div>
    </SetSearchParamProvider>
  );
}
