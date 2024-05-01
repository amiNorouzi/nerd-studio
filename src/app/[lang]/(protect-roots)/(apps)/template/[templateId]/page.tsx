import { SCRPropsType } from "@/services/types";
import { DynamicTemplatePage } from "@/components/pages/template/components";
import dynamic from "next/dynamic";
import DynamicTemplateLoading from "@/app/[lang]/(protect-roots)/(apps)/template/[templateId]/loading";

const DynamicTemplatePage = dynamic(
  () => import("@/components/pages/template/components/dynamic-template-page"),
  {
    loading: () => <DynamicTemplateLoading />,
  },
);

export default function Page({ params, searchParams }: SCRPropsType) {
  return <DynamicTemplatePage params={params} searchParams={searchParams} />;
}
