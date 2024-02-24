import { memo, Suspense } from "react";
import { EditorSection } from "./editor-section";
import { FormSection } from "./form-section";
import type { TemplateState } from "@/stores/zustand/types";
import type { ParamsType } from "@/services/types";

const Form = memo(FormSection);
const Editor = memo(EditorSection);

interface IProps {
  params: ParamsType;
  template?: TemplateState["currentTemplate"];
}
export function Run({ params, template }: IProps) {
  return (
    <>
      <Suspense>
        <Form params={params} template={template} />
      </Suspense>
      <Editor />
    </>
  );
}
