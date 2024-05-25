import { ParamsType, SearchParamsType } from "@/services/types";
import TranslateLoading from "@/app/[lang]/(protect-roots)/(apps)/translate/loading";
import dynamic from "next/dynamic";

const TranslatePage = dynamic(() => import("@/components/pages/translate"), {
  loading: () => <TranslateLoading />,
});

interface IProps {
  params: ParamsType;
  searchParams:SearchParamsType
}
export default function Translate({ params , searchParams }: IProps) {
  return <TranslatePage params={params} searchedParams={searchParams} />;
}
