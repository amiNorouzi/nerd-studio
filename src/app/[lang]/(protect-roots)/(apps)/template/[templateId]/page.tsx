import { SCRPropsType } from "@/services/types";
import { DynamicTemplatePage } from "@/components/pages/template/components";

export default async function Page({ params, searchParams }: SCRPropsType) {
  return <DynamicTemplatePage params={params} searchParams={searchParams} />;
}
