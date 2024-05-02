import Header from "./header";
import Form from "./form";
import type { ParamsType } from "@/services/types";

interface IProps {
  params: ParamsType;
}

export default function SignUpPage({ params }: IProps) {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <Header params={params} />
      <Form />
    </div>
  );
}
