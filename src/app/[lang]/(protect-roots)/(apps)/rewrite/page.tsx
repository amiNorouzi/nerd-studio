import type { SCRPropsType } from "@/services/types";
import RewriteLoading from "@/app/[lang]/(protect-roots)/(apps)/rewrite/loading";
import dynamic from "next/dynamic";

const WritePage = dynamic(() => import("@/components/pages/write"), {
  loading: () => <RewriteLoading />,
});

export default function Write({ searchParams, params }: SCRPropsType) {
  return <WritePage searchParams={searchParams} params={params} />;
}
