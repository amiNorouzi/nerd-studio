import { ParamsType, SCRPropsType } from "@/services/types";
import { DynamicTemplatePage } from "@/components/pages/template/components";

export async function generateStaticParams() {
  return [
    { templateId: "1" },
    { templateId: "12" },
    { templateId: "13" },
    { templateId: "14" },
    { templateId: "15" },
    { templateId: "16" },
  ];
}

export default function Page({ params, searchParams }: SCRPropsType) {
  return <DynamicTemplatePage params={params} searchParams={searchParams} />;
}
