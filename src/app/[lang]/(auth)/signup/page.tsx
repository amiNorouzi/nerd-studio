import type { ParamsType } from "@/services/types";
import dynamic from "next/dynamic";
import HomeLoading from "@/app/[lang]/loading";

const SignUpPage = dynamic(() => import("@/components/pages/signup"), {
  loading: () => <HomeLoading />,
});

interface IProps {
  params: ParamsType;
}
export default function SignUp({ params }: IProps) {
  return <SignUpPage params={params} />;
}
