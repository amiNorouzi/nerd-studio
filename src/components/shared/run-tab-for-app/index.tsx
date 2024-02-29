import React, { memo } from "react";
import { EditorSection } from "./editor-section";
import { FormSection } from "./form-section";
import { cn } from "@/lib/utils";
import type { TemplateState } from "@/stores/zustand/types";
import type { ParamsType } from "@/services/types";

const Form = memo(FormSection);
const Editor = memo(EditorSection);

interface IProps extends React.ComponentPropsWithoutRef<"div"> {
  params: ParamsType;
  template?: TemplateState["currentTemplate"];
}
export function Run({ params, template, className, ...divProps }: IProps) {
  return (
    <div
      className={cn(
        "grid h-fit max-h-full grid-cols-12 divide-y overflow-y-auto  lg:h-full lg:divide-x lg:overflow-hidden ",
        className,
      )}
      {...divProps}
    >
      <Form params={params} template={template} />
      <Editor />
    </div>
  );
}
