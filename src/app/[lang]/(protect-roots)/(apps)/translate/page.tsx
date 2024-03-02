"use client";
import { Run, SetSearchParamProvider } from "@/components/shared";
import type { ParamsType } from "@/services/types";
interface IProps {
  params: ParamsType;
}
export default function Translate({ params }: IProps) {
  return (
    <SetSearchParamProvider appName="app" appSearchParamValue="Translate">
      <Run>
        <Run.TranslateForm params={params} />
        <Run.Editor />
      </Run>
    </SetSearchParamProvider>
  );
}
