import { WorkspacePage } from "@/components/pages/workspace";

import type { LangParams } from "@/services/types";

export default function Workspace({ params: { lang } }: LangParams) {
  return <WorkspacePage lang={lang} />;
}
