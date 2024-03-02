import { SignUpPage } from "@/components/pages/signup";
import type { ParamsType } from "@/services/types";

interface IProps {
  params: ParamsType;
}
export default function SignUp({ params }: IProps) {
  return <SignUpPage params={params} />;
}
