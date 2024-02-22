import { Suspense } from "react";
import { WritePage } from "@/components/pages/write";
import type { ParamsType, SearchParamsType } from "@/services/types";

interface IProps {
  searchParams: SearchParamsType;
  params: ParamsType;
}
export default function Write({ searchParams, params }: IProps) {
  return (
    <Suspense>
      <WritePage searchParamsAppSTab={searchParams} params={params} />
    </Suspense>
  );
}
