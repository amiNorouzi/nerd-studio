import {
  HistoryBox,
  HistoryInfo,
  HistoryItems,
  Run,
  SetSearchParamProvider,
} from "@/components/shared";

import { HistoryInfoContent } from "./history-info-content";
import type { ParamsType } from "@/services/types";
interface IProps {
  params: ParamsType;
}
export default async function TranslatePage({ params }: IProps) {
  return (
    <SetSearchParamProvider appName="app" appSearchParamValue="Translate">
      <Run>
        <Run.TranslateForm params={params} />
        <Run.Editor>
          <HistoryBox>
            <HistoryItems appName="Translate" />
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
