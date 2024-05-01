import { TemplatePage } from "@/components/pages/template";
import { Suspense } from "react";
import TemplateLoading from "@/app/[lang]/(protect-roots)/(apps)/template/loading";

export default function Template() {
  return (
    <Suspense fallback={<TemplateLoading />}>
      <TemplatePage />
    </Suspense>
  );
}
