import React from "react";
import EditorSection from "./editor-section";
import FormSection from "./form-section";
import TranslateFormSection from "./translate-form";
import GrammarFormSection from "./grammar-form";
import { cn } from "@/lib/utils";

interface IProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
}
export function Run({
  children,

  className,
  ...divProps
}: IProps) {
  return (
    <div
      className={cn(
        "grid h-fit max-h-full grid-cols-12 divide-y overflow-y-auto  lg:h-full lg:divide-x lg:overflow-hidden ",
        className,
      )}
      {...divProps}
    >
      {children}
    </div>
  );
}
Run.Editor = EditorSection;
Run.Form = FormSection;
Run.TranslateForm = TranslateFormSection;
Run.GrammarForm = GrammarFormSection;
