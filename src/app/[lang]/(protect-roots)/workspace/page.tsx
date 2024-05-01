import type { LangParams } from "@/services/types";
import WorkspaceLoading from "@/app/[lang]/(protect-roots)/workspace/loading";
import dynamic from "next/dynamic";

const WorkspacePage = dynamic(() => import("@/components/pages/workspace"), {
  loading: () => <WorkspaceLoading />,
});

export default function Workspace({ params: { lang } }: LangParams) {
  return <WorkspacePage lang={lang} />;
}
