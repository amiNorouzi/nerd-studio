import { memo } from "react";
import { SetSearchParamProvider, Run } from "@/components/shared";
import type { SCRPropsType } from "@/services/types";
import { getDictionary } from "@/lib/dictionary";

export async function WritePage({ params }: SCRPropsType) {
  const {
    page: { ReWrite },
  } = await getDictionary(params.lang);
  /**
   * * Important: SetSearchParamProvider is used to set apps name to url search param
   *  value of it used in apps Header in  layout or form-section
   *  and everywhere that needs to know app name
   */
  return (
    <SetSearchParamProvider appName="app" appSearchParamValue="ReWrite">
      <Run>
        <Run.Form
          params={params}
          buttonContent={ReWrite.form_rewrite_button}
          mainTextAreaPlaceholder={ReWrite.text_input_placeholder}
        />
        <Run.Editor />
      </Run>
    </SetSearchParamProvider>
  );
}
