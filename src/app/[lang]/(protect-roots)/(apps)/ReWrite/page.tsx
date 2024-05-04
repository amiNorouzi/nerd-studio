"use client";
import type { SCRPropsType } from "@/services/types";
import ReWriteLoading from "@/app/[lang]/(protect-roots)/(apps)/ReWrite/loading";
import dynamic from "next/dynamic";

const WritePage = dynamic(() => import("@/components/pages/write"), {
  loading: () => <ReWriteLoading />,
});

export default function Write({ searchParams, params }: SCRPropsType) {
  return <WritePage searchParams={searchParams} params={params} />;
}
