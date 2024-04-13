import { Suspense } from "react";
import { WritePage } from "@/components/pages/write";
import type { SCRPropsType } from "@/services/types";

export default function Write({ searchParams, params }: SCRPropsType) {
  return <WritePage searchParams={searchParams} params={params} />;
}
