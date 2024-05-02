"use client";
import { SCRPropsType } from "@/services/types";
import dynamic from "next/dynamic";
import DynamicTemplateLoading from "./loading";

const DynamicTemplatePage = dynamic(
  () => import("@/components/pages/template/components/dynamic-template-page"),
  {
    loading: () => <DynamicTemplateLoading />,
  },
);

export default function Page({ params, searchParams }: SCRPropsType) {
  return <DynamicTemplatePage params={params} searchParams={searchParams} />;
}
