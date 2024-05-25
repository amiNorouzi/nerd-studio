import type { ParamsType, SCRPropsType } from "@/services/types";
import GrammarLoading from "@/app/[lang]/(protect-roots)/(apps)/grammar/loading";
import dynamic from "next/dynamic";

const GrammarPage = dynamic(() => import("@/components/pages/grammar"), {
  loading: () => <GrammarLoading />,
});

interface IProps {
  params: ParamsType;
}
export default function Page({ searchParams, params }: SCRPropsType) {
  return <GrammarPage params={params} searchParams={searchParams} />;
}
