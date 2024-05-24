import Header from "./header";
import type { ParamsType } from "@/services/types";
import dynamic from "next/dynamic";
import HomeLoading from "@/app/[lang]/loading";

const Form = dynamic(() => import("./form"), {
  loading: () => <HomeLoading />,
});

interface IProps {
  params: ParamsType;
  searchParams: { token: string; email: string };
}

export default function SignUpPage({ params ,searchParams}: IProps) {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <Header params={params} />
      <Form searchParams={searchParams} />
    </div>
  );
}
