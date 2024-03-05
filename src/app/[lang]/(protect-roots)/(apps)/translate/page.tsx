import TranslatePage from "@/components/pages/translate";
import type { ParamsType } from "@/services/types";
interface IProps {
  params: ParamsType;
}
export default function Translate({ params }: IProps) {
  return <TranslatePage params={params} />;
}
