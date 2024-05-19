import type { ParamsType } from "@/services/types";
import dynamic from "next/dynamic";
import HomeLoading from "@/app/[lang]/loading";

const SignUpPage = dynamic(() => import("@/components/pages/signup"), {
  loading: () => <HomeLoading />,
});

interface IProps {
  params: ParamsType;
  searchParams:{token:string,email:string}
}
export default function SignUp({ params,searchParams }: IProps) {

  return <SignUpPage params={params} searchParams={searchParams} />;
}
