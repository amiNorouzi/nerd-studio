import { memo } from "react";
import { SetSearchParamProvider, Run } from "@/components/shared";
import type { SCRPropsType } from "@/services/types";

export function WritePage({ params }: SCRPropsType) {
  /**
   * * Important: SetSearchParamProvider is used to set apps name to url search param
   *  value of it used in apps Header in  layout or form-section
   *  and everywhere that needs to know app name
   */
  return (
    <SetSearchParamProvider appName="app" appSearchParamValue="ReWrite">
      <Run>
        <Run.Form params={params} />
        <Run.Editor />
      </Run>
    </SetSearchParamProvider>
  );
}
