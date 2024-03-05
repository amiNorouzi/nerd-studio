import {
  HistoryBox,
  HistoryItems,
  Run,
  SetSearchParamProvider,
} from "@/components/shared";

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
        </Run.Editor>
      </Run>
    </SetSearchParamProvider>
  );
}
