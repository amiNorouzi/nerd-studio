import { TemplatePage } from "@/components/pages/template";
import type { LangParams } from "@/services/types";

export default function Template({ params: { lang } }: LangParams) {
  return <TemplatePage lang={lang} />;
}
