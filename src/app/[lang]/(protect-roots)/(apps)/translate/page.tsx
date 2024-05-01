import TranslatePage from "@/components/pages/translate";
import type { ParamsType } from "@/services/types";
import { Suspense } from "react";
import TranslateLoading from "@/app/[lang]/(protect-roots)/(apps)/translate/loading";

interface IProps {
  params: ParamsType;
}
export default function Translate({ params }: IProps) {
  return (
    <Suspense fallback={<TranslateLoading />}>
      <TranslatePage params={params} />
    </Suspense>
  );
}
