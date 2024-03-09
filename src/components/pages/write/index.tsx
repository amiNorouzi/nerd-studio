import {
  SetSearchParamProvider,
  Run,
  HistoryBox,
  HistoryItems,
  HistoryInfo,
} from "@/components/shared";
import { getDictionary } from "@/lib/dictionary";
import { HistoryInfoContent } from "./history-info-content";
import type { SCRPropsType } from "@/services/types";

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
        <Run.Editor>
          <HistoryBox>
            <HistoryItems appName="ReWrite" />
          </HistoryBox>
          {/* this is a sheet that when user select an item in history then this sheet open and show history information */}
          <HistoryInfo>
            <HistoryInfoContent />
          </HistoryInfo>
        </Run.Editor>
      </Run>
    </SetSearchParamProvider>
  );
}
