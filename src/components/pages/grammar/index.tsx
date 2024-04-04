"use client";
import {
  HistoryBox,
  HistoryItems,
  Run,
  SetSearchParamProvider,
  HistoryInfo,
} from "@/components/shared";
import { HistoryInfoContent } from "./history-info-content";
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
        <Run.Editor value="" onChange={() => {}}>
          <HistoryBox>
            <HistoryItems appName="Grammar" />
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
