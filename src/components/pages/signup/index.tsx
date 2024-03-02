import { Header } from "./header";
import { Form } from "./form";
import { Footer } from "./footer";
import type { ParamsType } from "@/services/types";

interface IProps {
  params: ParamsType;
}
export function SignUpPage({ params }: IProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-between">
      <Header params={params} />
      <Form />
      <Footer params={params} />
    </div>
  );
}
