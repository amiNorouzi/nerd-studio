import { Suspense } from "react";
import { WritePage } from "@/components/pages/write";
import type { SCRPropsType } from "@/services/types";
import ReWriteLoading from "@/app/[lang]/(protect-roots)/(apps)/ReWrite/loading";

export default function Write({ searchParams, params }: SCRPropsType) {
  return (
    <Suspense fallback={<ReWriteLoading />}>
      <WritePage searchParams={searchParams} params={params} />
    </Suspense>
  );
}
