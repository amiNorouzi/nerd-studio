import {
  SelectBoxes,
  SelectResponseLang,
  SubmitButton,
  TextBox,
} from "./form-section-components";
import { getDictionary } from "@/lib/dictionary";
import type { ParamsType } from "@/services/types";

interface IProps {
  params: ParamsType;
}
export async function FormSection({ params }: IProps) {
  const {
    page: { writing },
  } = await getDictionary(params.lang);
  return (
    <div className="col-span-12 flex h-full flex-col gap-5   bg-card p-4  lg:col-span-6 xl:col-span-4">
      <p className="text-xsm">{writing.form_description}</p>
      <SelectResponseLang />
      <TextBox />
      <SelectBoxes />
      <SubmitButton />
    </div>
  );
}
