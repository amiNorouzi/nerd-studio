import type { LangParams } from "@/services/types";
import CustomTemplateLoading from "@/app/[lang]/(protect-roots)/(apps)/template/custom-template/create/loading";
import dynamic from "next/dynamic";

const CustomTemplatePage = dynamic(
  () => import("@/components/pages/custom-template"),
  {
    loading: () => <CustomTemplateLoading />,
  },
);

export default function Page({ params: { lang } }: LangParams) {
  return <CustomTemplatePage lang={lang} />;
};
