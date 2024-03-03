import { Run, SetSearchParamProvider } from "@/components/shared";
import type { ParamsType } from "@/services/types";

interface IProps {
  params: ParamsType;
}
export function GrammarPage({ params }: IProps) {
  /**
   * * Important: SetSearchParamProvider is used to set apps name to url search param
   *  value of it used in apps Header in  layout or form-section
   *  and everywhere that needs to know app name
   */
  return (
    <SetSearchParamProvider appName="app" appSearchParamValue="Grammar">
      <Run>
        <Run.GrammarForm params={params} />
        <Run.Editor />
      </Run>
    </SetSearchParamProvider>
  );
}
