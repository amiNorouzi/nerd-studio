import type { ParamsType } from "@/services/types";
import SingUPLoading from "@/app/[lang]/(auth)/signup/loading";
import dynamic from "next/dynamic";

const SignUpPage = dynamic(() => import("@/components/pages/signup"), {
  loading: () => <SingUPLoading />,
});

interface IProps {
  params: ParamsType;
}
export default function SignUp({ params }: IProps) {
  return <SignUpPage params={params} />;
}
