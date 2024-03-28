import { TemplatePage } from "@/components/pages/template";

import { getTemplatesApi } from "@/services/server-services";

export default async function Template() {
  const templates = (await getTemplatesApi()) || [];

  return <TemplatePage templates={templates} />;
}
