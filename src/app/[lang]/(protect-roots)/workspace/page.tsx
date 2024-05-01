import { WorkspacePage } from "@/components/pages/workspace";

import type { LangParams } from "@/services/types";
import { Suspense } from "react";
import WorkspaceLoading from "@/app/[lang]/(protect-roots)/workspace/loading";

export default function Workspace({ params: { lang } }: LangParams) {
  return (
    <Suspense fallback={<WorkspaceLoading />}>
      <WorkspacePage lang={lang} />
    </Suspense>
  );
}
