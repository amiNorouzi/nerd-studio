import { GrammarPage } from "@/components/pages/grammar";
import type { ParamsType } from "@/services/types";
import { Suspense } from "react";
import GrammarLoading from "@/app/[lang]/(protect-roots)/(apps)/grammar/loading";

interface IProps {
  params: ParamsType;
}
export default function Page({ params }: IProps) {
  return (
    <Suspense fallback={<GrammarLoading />}>
      <GrammarPage params={params} />
    </Suspense>
  );
}
