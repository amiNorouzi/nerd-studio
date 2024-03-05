import { GrammarPage } from "@/components/pages/grammar";
import type { ParamsType } from "@/services/types";

interface IProps {
  params: ParamsType;
}
export default function Page({ params }: IProps) {
  return <GrammarPage params={params} />;
}
