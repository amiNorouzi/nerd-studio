"use client";
import type { LangParams } from "@/services/types";
import CustomTemplateLoading from "@/app/[lang]/(protect-roots)/(apps)/template/custom-template/create/loading";
import dynamic from "next/dynamic";

const CustomTemplatePage = dynamic(
  () => import("@/components/pages/custom-template"),
  {
    loading: () => <CustomTemplateLoading />,
  },
);

const Page = ({ params: { lang } }: LangParams) => {
  return <CustomTemplatePage lang={lang} />;
};

export default Page;
