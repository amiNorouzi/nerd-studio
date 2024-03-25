import CustomTemplatePage from "@/components/pages/custom-template";

import type { LangParams } from "@/services/types";

const Page = ({ params: { lang } }: LangParams) => {
  return <CustomTemplatePage lang={lang} />;
};

export default Page;
